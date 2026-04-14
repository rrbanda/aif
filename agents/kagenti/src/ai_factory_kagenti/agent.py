"""A2A server entry point for the AI Factory Kagenti agent.

Bridges the A2A protocol to the ADK agent tree via InMemoryRunner,
following the Kagenti demo-finos-ca pattern exactly.
"""

import logging
import os
from textwrap import dedent

import uvicorn
from starlette.requests import Request
from starlette.responses import JSONResponse
from starlette.routing import Route

from a2a.server.agent_execution import AgentExecutor, RequestContext
from a2a.server.apps import A2AStarletteApplication
from a2a.server.events.event_queue import EventQueue
from a2a.server.request_handlers import DefaultRequestHandler
from a2a.server.tasks import InMemoryTaskStore, TaskUpdater
from a2a.types import AgentCapabilities, AgentCard, AgentSkill, TaskState, TextPart
from a2a.utils import new_agent_text_message, new_task
from google.genai import types

from .configuration import Configuration
from .orchestrator import APP_NAME, get_runner

_log_level = os.getenv("LOG_LEVEL", "INFO").upper()
logging.basicConfig(level=getattr(logging, _log_level, logging.INFO))
logger = logging.getLogger(__name__)
logging.getLogger("google.adk").setLevel(getattr(logging, _log_level, logging.INFO))

_runner = None
_sessions: dict[str, str] = {}


def _get_runner():
    global _runner
    if _runner is None:
        os.environ.setdefault("OPENAI_API_KEY", "not-needed")
        _runner = get_runner()
    return _runner


def get_agent_card(host: str, port: int) -> AgentCard:
    capabilities = AgentCapabilities(streaming=True)

    advisor_skill = AgentSkill(
        id="ai_factory_advisor",
        name="AI Factory Advisor",
        description=(
            "**AI Factory Advisor** -- A multi-agent system that provides strategic guidance "
            "on Red Hat's AI Factory methodology, including program planning, phase execution, "
            "architecture design, use case qualification, and ROI analysis."
        ),
        tags=["ai-factory", "strategy", "advisory", "red-hat", "openshift-ai"],
        examples=[
            "Help me plan an AI Factory program for a financial services customer",
            "What are the phases of the AI Factory methodology?",
            "Generate an executive summary of our AI Factory program",
        ],
    )

    customer_skill = AgentSkill(
        id="customer_management",
        name="Customer Management",
        description=(
            "**Customer Management** -- Manages customer accounts, tracks program phases, "
            "use case portfolios, model lifecycles, and generates deliverables like "
            "assessment reports and program charters."
        ),
        tags=["customer", "account", "portfolio", "model-lifecycle", "deliverables"],
        examples=[
            "List all customer accounts and their current phases",
            "Create a readiness assessment for customer acme-corp",
            "Show the model lifecycle status for all deployed models",
        ],
    )

    architecture_skill = AgentSkill(
        id="architecture_design",
        name="Architecture Design",
        description=(
            "**Architecture Design** -- Provides infrastructure insights, architecture "
            "diagram descriptions, ML pipeline designs, and competitive battlecards "
            "for positioning the AI Factory against Databricks, AWS, Azure, and GCP."
        ),
        tags=["architecture", "infrastructure", "battlecard", "competitive", "mlops"],
        examples=[
            "Generate an architecture diagram for the platform foundation",
            "Create a battlecard comparing Red Hat vs Databricks",
            "What's the GPU utilization across our cluster?",
        ],
    )

    return AgentCard(
        name="AI Factory Agent (Kagenti)",
        description=dedent("""\
            The Red Hat AI Factory multi-agent system, powered by Google ADK and
            deployed as a Kagenti A2A agent.

            ## Skills
            - **AI Factory Advisor**: Strategic guidance on the seven-stage AI Factory methodology
            - **Customer Management**: Account tracking, use case portfolios, model lifecycles
            - **Architecture Design**: Infrastructure insights, pipeline design, competitive analysis

            ## Architecture
            - **Coordinator** routes requests to 21 specialist sub-agents
            - **53 tools** for content, config, customer, infrastructure, and analysis operations
            - **Skills** loaded from content/skills/ for domain expertise

            ## Powered by
            - Google Agent Development Kit (ADK)
            - LlamaStack via LiteLLM (OpenAI-compatible API)
            - RHDH Git-backed content for program data
        """),
        url=os.getenv("AGENT_ENDPOINT", f"http://{host}:{port}").rstrip("/") + "/",
        version="0.1.0",
        default_input_modes=["text"],
        default_output_modes=["text"],
        capabilities=capabilities,
        skills=[advisor_skill, customer_skill, architecture_skill],
    )


class KagentiExecutor(AgentExecutor):
    """Bridges A2A protocol to the ADK agent tree."""

    async def execute(self, context: RequestContext, event_queue: EventQueue):
        task = context.current_task
        if not task:
            task = new_task(context.message)
            await event_queue.enqueue_event(task)
        task_updater = TaskUpdater(event_queue, task.id, task.context_id)

        user_input = context.get_user_input()
        logger.info("AI Factory agent received: %s (context=%s)", user_input, task.context_id)

        await task_updater.update_status(
            TaskState.working,
            new_agent_text_message(
                "Routing your request to the appropriate specialist agent...",
                task_updater.context_id,
                task_updater.task_id,
            ),
        )

        try:
            runner = _get_runner()
            context_id = task.context_id

            if context_id not in _sessions:
                session = await runner.session_service.create_session(
                    app_name=APP_NAME, user_id=context_id
                )
                _sessions[context_id] = session.id
            session_id = _sessions[context_id]

            content = types.Content(role="user", parts=[types.Part(text=user_input)])

            final_text = None
            async for event in runner.run_async(
                user_id=context_id, session_id=session_id, new_message=content
            ):
                if hasattr(event, "author") and event.author:
                    logger.info("ADK event from agent: %s", event.author)
                if hasattr(event, "content") and event.content and event.content.parts:
                    for part in event.content.parts:
                        if hasattr(part, "function_call") and part.function_call:
                            logger.info(
                                "TOOL CALL: %s(%s)",
                                part.function_call.name,
                                part.function_call.args,
                            )
                        if hasattr(part, "function_response") and part.function_response:
                            logger.info(
                                "TOOL RESPONSE: %s -> %s",
                                part.function_response.name,
                                str(part.function_response.response)[:200],
                            )
                        if hasattr(part, "text") and part.text:
                            final_text = part.text

            if not final_text:
                final_text = "The agent completed processing but produced no text output. Please try again with a different prompt."

            parts = [TextPart(text=final_text)]
            await task_updater.add_artifact(parts)
            await task_updater.complete()

        except Exception as e:
            logger.exception("AI Factory agent error: %s", e)
            parts = [TextPart(text=f"Error running agent pipeline: {e}")]
            await task_updater.add_artifact(parts)
            await task_updater.failed()

    async def cancel(self, context: RequestContext, event_queue: EventQueue) -> None:
        raise Exception("cancel not supported")


async def health(request: Request) -> JSONResponse:
    return JSONResponse({"status": "ok"})


async def agent_card_compat(request: Request) -> JSONResponse:
    card = get_agent_card(host="0.0.0.0", port=8000)
    return JSONResponse(card.model_dump(mode="json", exclude_none=True))


def run():
    config = Configuration()
    agent_card = get_agent_card(host="0.0.0.0", port=8000)

    request_handler = DefaultRequestHandler(
        agent_executor=KagentiExecutor(),
        task_store=InMemoryTaskStore(),
    )

    server = A2AStarletteApplication(
        agent_card=agent_card,
        http_handler=request_handler,
    )

    app = server.build()

    app.routes.insert(0, Route("/health", health, methods=["GET"]))
    app.routes.insert(
        0, Route("/.well-known/agent-card.json", agent_card_compat, methods=["GET"])
    )

    uvicorn.run(app, host="0.0.0.0", port=8000)


if __name__ == "__main__":
    run()
