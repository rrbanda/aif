# OpenAI Responses API and Agent Architecture

## 1. The Responses API — Core Primitives

The Responses API (`POST /v1/responses`) is OpenAI's successor to Chat Completions, designed from the ground up for agentic workloads. It launched in March 2025 alongside the Agents SDK.

### 1.1 Design Philosophy

OpenAI's API evolution follows how models themselves work:

| Era | API | Model Capability |
|-----|-----|-----------------|
| Completions | `POST /v1/completions` | Text completion (GPT-3) |
| Chat Completions | `POST /v1/chat/completions` | Conversational (ChatGPT, RLHF) |
| Assistants (beta) | `POST /v1/assistants` | Agentic with hosted tools (deprecated Aug 2026) |
| **Responses** | `POST /v1/responses` | **Agentic loop with reasoning preservation** |

The Responses API was built because Chat Completions was a text-first API with tool use bolted on, while Assistants was too complex. Responses combines the simplicity of Chat Completions with the power of Assistants.

### 1.2 Basic Request/Response Model

**Input** takes three top-level fields:
- `model` — which model to use
- `instructions` — system-level prompt (replaces the `system` role message)
- `input` — user content: a plain string, or a list of structured input items

**Output** is a `Response` object containing polymorphic `output` items — not a single message, but an ordered list of messages, tool calls, tool outputs, and reasoning items.

```python
from openai import OpenAI
client = OpenAI()

response = client.responses.create(
    model="gpt-4o",
    instructions="You are a helpful assistant.",
    input="What is the capital of France?",
)
print(response.output_text)  # convenience accessor
```

Key difference from Chat Completions: instead of `choices[0].message.content`, you get `response.output_text` or can inspect `response.output` for the full list of items.

### 1.3 Polymorphic Output Items

Each response contains an **ordered list of typed items**:

| Item Type | Description |
|-----------|-------------|
| `message` | Assistant text output |
| `function_call` | Model requesting a client-side function |
| `function_call_output` | Result of a function call |
| `web_search_call` | Server-side web search execution |
| `file_search_call` | Server-side file/vector search |
| `code_interpreter_call` | Server-side code execution |
| `reasoning` | Internal reasoning (encrypted, not exposed) |

This is fundamentally different from Chat Completions, where a single `message` object contains both text content and tool calls, making the ordering ambiguous. With Responses, the sequence of actions is explicit.

### 1.4 Server-Side State with `previous_response_id`

Chat Completions requires resending the full conversation history with every request. Responses manages state server-side:

```python
# Turn 1
res1 = client.responses.create(
    model="gpt-4o",
    input="What is the capital of France?",
    store=True,
)

# Turn 2 — chains to Turn 1 without resending history
res2 = client.responses.create(
    model="gpt-4o",
    input="And what about Germany?",
    previous_response_id=res1.id,
)
```

This also preserves the model's **reasoning state** across turns (critical for o-series/reasoning models). In Chat Completions, reasoning is dropped between calls — like a detective forgetting clues every time they leave the room.

You can also **fork** conversations by referencing any prior response ID, creating branching conversation trees.

For stateless/ZDR compliance, encrypted reasoning items can be returned to the client and passed back, never persisted on OpenAI's servers.

### 1.5 Built-in (Hosted) Tools

The Responses API natively supports tools that OpenAI runs server-side:

| Tool | Type String | Description |
|------|-------------|-------------|
| Web Search | `web_search_preview` | Live web search with citations |
| File Search | `file_search` | RAG over uploaded files (vector stores) |
| Code Interpreter | `code_interpreter` | Sandboxed Python execution |
| Computer Use | `computer_use_preview` | Desktop/browser automation |
| Image Generation | `image_generation` | DALL-E image creation |
| Remote MCP | `mcp` | Connect to external MCP tool servers |
| Shell | `shell` | Run commands in hosted containers |

```python
response = client.responses.create(
    model="gpt-4o",
    input="What happened in the news today?",
    tools=[{"type": "web_search_preview"}],
)
```

With hosted tools, the model can call multiple tools within a **single API request** — no client-side round-trips needed. A single call can: analyze an image, perform web search, and summarize results.

### 1.6 Function Calling (Client-Side Tools)

Custom functions are defined with internally-tagged polymorphism (different from Chat Completions' externally-tagged format). Key differences:
- Functions are **strict by default** in Responses (non-strict in Chat Completions)
- Tool calls and outputs are **distinct Item types** correlated by `call_id`

### 1.7 Structured Outputs

Moved from `response_format` (Chat Completions) to `text.format` (Responses):

```python
response = client.responses.create(
    model="gpt-4o",
    input="Jane, 54 years old",
    text={
        "format": {
            "type": "json_schema",
            "name": "person",
            "strict": True,
            "schema": {
                "type": "object",
                "properties": {
                    "name": {"type": "string"},
                    "age": {"type": "number"}
                },
                "required": ["name", "age"],
                "additionalProperties": False
            }
        }
    }
)
```

---

## 2. The Agentic Loop

The Responses API is fundamentally an **agentic loop** — a structured cycle of reasoning, acting, and observing.

### 2.1 Core Loop Pattern

```
User Input
    └──> Call Responses API
            └──> Response contains tool calls?
                    ├── YES: Execute tools → Send results via previous_response_id → Loop
                    └── NO: Return final output to user
```

Key architectural properties:

1. **Polymorphic output items**: Each response contains an ordered list of items (text, tool_call, tool_output, reasoning)
2. **Multi-tool execution**: The model can call multiple tools in a single turn
3. **Incremental state**: `previous_response_id` avoids resending history and preserves reasoning context
4. **WebSocket mode**: For tool-heavy workflows (20+ tool calls), persistent connections yield ~40% faster end-to-end execution

### 2.2 Four Memory Strategies

| Strategy | State Location | Best For | Next Turn Input |
|----------|---------------|----------|-----------------|
| `result.to_input_list()` | Client memory | Small chat loops, full control | Prior items + new user message |
| `session` | Client storage + SDK | Persistent chat, resumable runs | Same session instance |
| `conversation_id` | OpenAI Conversations API | Server-side named conversations | Same conversation_id + new turn |
| `previous_response_id` | OpenAI Responses API | Lightweight continuation | `result.last_response_id` + new turn |

Pick one per conversation. Mixing client-managed and server-managed state duplicates context.

---

## 3. The OpenAI Agents SDK

The Agents SDK is an open-source Python/JS library that sits on top of the Responses API and provides higher-level abstractions for building single- and multi-agent systems. It evolved from the experimental Swarm project.

### 3.1 Core Primitives

The SDK has deliberately few abstractions:

| Primitive | Description |
|-----------|-------------|
| **Agent** | An LLM configured with `name`, `instructions`, `tools`, `handoffs`, `guardrails`, and `output_type` |
| **Runner** | Executes the agent loop: calls the Responses API, inspects output items, executes tools, handles handoffs, checks guardrails, loops until final output |
| **Handoffs** | Allow one agent to transfer conversation control to another specialist agent |
| **Guardrails** | Input/output/tool validation checks that run in parallel or blocking mode |
| **Tools** | Six categories: hosted, built-in execution, function, agents-as-tools, MCP, Codex |
| **Sessions** | Persistent memory layer for maintaining context across agent turns |

### 3.2 Agent Definition

```python
from agents import Agent, ModelSettings, function_tool

@function_tool
def get_weather(city: str) -> str:
    """Returns weather info for the specified city."""
    return f"The weather in {city} is sunny"

agent = Agent(
    name="Weather Agent",
    instructions="Always respond in haiku form",
    model="gpt-4o",
    tools=[get_weather],
)
```

Key configuration:
- `instructions` — static string or dynamic function receiving context
- `output_type` — Pydantic model for structured outputs
- `tool_use_behavior` — `"run_llm_again"` (default) or `"stop_on_first_tool"`
- `handoff_description` — short text exposed when this agent is a handoff target

### 3.3 The Runner

Three execution modes:
- `Runner.run()` — async, returns `RunResult`
- `Runner.run_sync()` — sync wrapper
- `Runner.run_streamed()` — async streaming, returns `RunResultStreaming`

The Runner loop:
1. Call LLM with agent's instructions, tools, and input
2. If LLM produces **tool calls**: execute them, append results, re-run the loop
3. If LLM does a **handoff**: update current agent and input, re-run the loop
4. If LLM returns **final output** (text with no tool calls): end and return result

### 3.4 Tool Categories

| Category | Description | Execution |
|----------|-------------|-----------|
| Hosted OpenAI tools | `WebSearchTool`, `FileSearchTool`, `CodeInterpreterTool`, `ImageGenerationTool` | Server-side |
| Built-in execution | `ShellTool`, `ComputerTool`, `ApplyPatchTool` | Local or hosted container |
| Function tools | Any Python function decorated with `@function_tool` | Client-side |
| Agents as tools | `agent.as_tool()` — runs sub-agent, returns result, control stays with caller | Client-side |
| MCP servers | Connect to Model Context Protocol tool providers | External |
| Codex tool | Workspace-scoped Codex tasks | Experimental |

### 3.5 Multi-Agent Orchestration

Two primary patterns:

**Pattern 1: Handoffs (decentralized)**
- A triage agent routes to specialist agents
- The specialist **takes over** the conversation
- Handoffs are exposed as tool calls (e.g., `transfer_to_refund_agent`)
- Conversation history is preserved (optionally filtered)

```python
triage_agent = Agent(
    name="Triage agent",
    instructions="Route the user to the correct agent.",
    handoffs=[booking_agent, refund_agent],
)
```

**Pattern 2: Agents as Tools (centralized manager)**
- A manager agent keeps control and calls specialists as tools
- Specialists don't take over the conversation
- Manager synthesizes all results

```python
customer_facing_agent = Agent(
    name="Customer-facing agent",
    tools=[
        booking_agent.as_tool(tool_name="booking_expert", tool_description="..."),
        refund_agent.as_tool(tool_name="refund_expert", tool_description="..."),
    ],
)
```

**When to use which:**
- Handoffs: specialist should respond directly, swap instructions, focused prompts
- Agents as tools: one agent owns the final answer, combines outputs, shared guardrails

### 3.6 Guardrails

Safety/validation checks at three workflow boundaries:

| Type | Runs When | Scope |
|------|-----------|-------|
| Input guardrails | First agent's input only | User input validation |
| Output guardrails | Final agent's output only | Response validation |
| Tool guardrails | Every custom function-tool invocation | Per-tool validation |

Execution modes:
- **Parallel** (default): guardrail runs concurrently with agent for lower latency
- **Blocking**: guardrail completes before agent starts, preventing token consumption if tripped

```python
@input_guardrail
async def math_guardrail(ctx, agent, input):
    result = await Runner.run(guardrail_agent, input, context=ctx.context)
    return GuardrailFunctionOutput(
        output_info=result.final_output,
        tripwire_triggered=result.final_output.is_math_homework,
    )
```

### 3.7 Context and Dependency Injection

The Agent is generic on a `context` type — any Python object passed to `Runner.run()` that flows through every agent, tool, handoff, and guardrail:

```python
@dataclass
class UserContext:
    name: str
    uid: str
    is_pro_user: bool

agent = Agent[UserContext](name="Support", instructions=dynamic_instructions)
result = await Runner.run(agent, "Help me", context=UserContext(...))
```

### 3.8 Human-in-the-Loop

Tools can require approval. When approval is needed:
1. The run pauses with pending items in `result.interruptions`
2. Call `result.to_state()` to get a resumable `RunState`
3. Approve or reject pending items
4. Resume with `Runner.run(agent, state)`

### 3.9 Observability and Tracing

Built-in tracing for visualizing and debugging agent workflows:
- Trace spans for every LLM call, tool invocation, handoff
- Integration with OpenAI's evaluation and fine-tuning tools
- Configurable via `RunConfig` with `workflow_name`, `trace_id`, `group_id`

---

## 4. Responses API vs Chat Completions — Summary

| Dimension | Chat Completions | Responses API |
|-----------|-----------------|---------------|
| State management | Client-side (resend full history) | Server-side (`previous_response_id`) |
| Output format | Single message with mixed concerns | Polymorphic items with clear ordering |
| Built-in tools | None (function calling only) | Web search, file search, code interpreter, computer use, image gen, MCP, shell |
| Reasoning preservation | Dropped between turns | Preserved across turns |
| Cache utilization | Baseline | 40-80% better |
| Structured outputs | `response_format` | `text.format` |
| Functions default | Non-strict | Strict |
| Future features | Maintained, no new capabilities | All new features land here first |
| Assistants API | Separate complex API | Supersedes (sunset Aug 2026) |

---

## 5. Key References

1. [Why we built the Responses API](https://developers.openai.com/blog/responses-api)
2. [Migrate to the Responses API](https://developers.openai.com/api/docs/guides/migrate-to-responses)
3. [New tools for building agents](https://openai.com/index/new-tools-for-building-agents)
4. [OpenAI Agents SDK (Python)](https://openai.github.io/openai-agents-python/)
5. [Agents Cookbook](https://developers.openai.com/cookbook/topic/agents)
6. [A Practical Guide to Building Agents (PDF)](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf)
7. [Responses vs Chat Completions — Simon Willison](https://simonwillison.net/2025/Mar/11/responses-vs-chat-completions)
