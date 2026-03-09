"""Workflow tools for AI Factory process automation.

All workflow agents use pure ADK agent types (SequentialAgent, ParallelAgent,
LoopAgent, Agent). No custom BaseAgent subclasses.
"""

from __future__ import annotations

import logging

from google.adk.tools.tool_context import ToolContext

logger = logging.getLogger(__name__)


def exit_loop(tool_context: ToolContext) -> dict:
    """Signal that the review loop should terminate because quality criteria are met.

    Call this tool ONLY when content review indicates no further changes are needed.
    """
    logger.info("[exit_loop] Triggered by %s — exiting loop", tool_context.agent_name)
    tool_context.actions.escalate = True
    return {"status": "loop_exited"}
