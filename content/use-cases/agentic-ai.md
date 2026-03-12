# Agentic AI

Agentic AI represents the next inflection point in enterprise AI. Where traditional models respond to prompts, agents **reason, plan, and act** — autonomously executing multi-step workflows using enterprise tools and data. Industry leaders describe this as a multi-trillion-dollar opportunity — agents as "virtual co-workers that materially change the output of companies." The AI Factory is where enterprises build, govern, and operate these agents.

## What Makes an Agent Different

A model takes input and produces output. An agent takes a goal and figures out how to achieve it — deciding which tools to use, what information to retrieve, and what actions to take. Agents combine foundation model reasoning with tool access (via MCP — Model Context Protocol), memory, and planning capabilities.

In the AI Factory, agents access enterprise tools: risk calculators, transaction databases, document repositories, market data feeds, clinical systems, maintenance management platforms. They operate within governance guardrails that define what actions are permitted, what requires human approval, and what is prohibited.

## Enterprise Use Cases

**Financial Services** — Agents that orchestrate fraud investigation workflows: retrieving transaction histories, running risk models, cross-referencing against known patterns, and drafting investigation reports. Regulatory reporting agents that pull data from multiple systems, check compliance rules, and prepare draft submissions for human review.

**Healthcare** — Clinical documentation agents that listen to patient encounters, extract structured data, update medical records, and flag potential quality or safety issues. Prior authorization agents that gather clinical evidence, check payer rules, and submit authorization requests.

**Operations** — Incident response agents that detect anomalies, correlate across systems, identify root causes, and execute remediation runbooks. Capacity planning agents that analyze usage trends, model scenarios, and recommend infrastructure changes.

## Governance for Autonomous AI

Agentic AI introduces unique governance requirements that the AI Factory addresses through its governance gates framework:

- **Tool permissions** — Which systems can the agent access? Read-only vs. read-write? What data classifications are permitted?
- **Action boundaries** — Which actions can the agent take autonomously? Which require human-in-the-loop approval? Which are prohibited?
- **Audit trails** — Every agent action logged with reasoning chain, tool calls, and outcomes. Essential for regulated industries.
- **Safety levels** — Graduated autonomy based on risk: fully autonomous for low-risk actions, human approval for medium-risk, human-only for high-risk decisions.

This aligns with responsible AI frameworks that advocate for structured safety levels — graduated risk tiers with increasing safeguards as agent autonomy grows.

## The AI Factory Advantage

Building agents requires the full AI Factory stack: foundation models for reasoning, fine-tuned models for domain expertise, inference infrastructure for low-latency responses, tool integration for enterprise actions, and governance for safety. Organizations that have built the factory — with production pipelines, model governance, and observability — are positioned to deploy agents. Organizations still running AI experiments are not.

The AI Factory Agent in this platform demonstrates the concept: an agent built on the factory's own knowledge base, using retrieval and tool access to answer questions, run assessments, and guide users through the program. It is itself a product of the factory it describes.

<!-- audience: customer -->

## Expected Business Outcomes

| Metric | Typical Improvement | How It Is Measured |
|--------|--------------------|--------------------|
| Task completion rate | 70-90% autonomous | Percentage of agent-initiated tasks completed without human intervention |
| Human-in-the-loop rate | 10-30% of actions | Percentage of agent actions requiring human approval (should decrease over time as trust builds) |
| Workflow time reduction | 40-70% | End-to-end time for multi-step workflows (investigation, reporting, remediation) |
| Governance compliance | 100% | All agent actions logged, within defined boundaries, with audit trails |

## Is This Right for Your Organization?

This use case is a strong fit if your organization:
- Has multi-step workflows that involve querying multiple systems, applying business rules, and producing structured outputs
- Has already deployed foundation models or fine-tuned models on the AI Factory platform (agents require the full stack)
- Can define clear action boundaries — which tasks agents can perform autonomously vs. which require human approval
- Has governance and compliance teams prepared to define and enforce agent safety levels
- Understands that agentic AI is the most advanced factory capability and requires Platform Maturity stages 0-4 as prerequisites

## Prerequisites

Agentic AI is not a starting point — it requires the full AI Factory stack already operational:
- **Foundation models** deployed and serving (for agent reasoning)
- **Fine-tuned domain models** available (for domain expertise)
- **Inference infrastructure** with low-latency serving (for interactive agent responses)
- **Governance gates** enforcing (for agent action boundaries and audit trails)
- **Tool integration** via MCP (for agent access to enterprise systems)

## Your Governance Requirements

Before deploying agents, your organization must define:
- **Tool permissions**: Which enterprise systems can agents access? Read-only vs. read-write?
- **Action boundaries**: Which actions are autonomous, which require approval, which are prohibited?
- **Safety levels**: Graduated autonomy tiers aligned with risk (e.g., Level 1: read-only; Level 2: suggest actions; Level 3: execute with approval; Level 4: fully autonomous for low-risk actions)
- **Audit and accountability**: Who is responsible when an agent takes an action? How are agent decisions reviewed?

<!-- /audience -->

<!-- audience: internal -->

## Internal: Deal Positioning

**Why AI Factory wins here:** Agentic AI requires the full stack — foundation models, fine-tuned domain models, inference infrastructure, MCP tool integration, governance gates. No other on-premises platform provides this end-to-end. This is the strongest differentiation story.

**Competitive differentiation:**
- AWS Bedrock Agents: Cloud-only, limited tool integration, no on-premises option
- Azure AI Agents: Strong integration with Azure services but cloud-only and tied to Azure identity
- LangChain/LangGraph: Framework, not platform. No governance, no model serving, no GPU orchestration
- CrewAI/AutoGen: Open-source frameworks without enterprise governance, production serving, or support
- Red Hat AI Factory: Full enterprise agent platform — on-prem models, MCP tools, governance gates, production infrastructure, enterprise support

**Positioning Gartner data:** Over 40% of agentic AI projects may be canceled by 2027 due to escalating costs, unclear business value, and inadequate risk controls. AI Factory governance framework directly addresses these failure modes — tool permissions, action boundaries, audit trails, and safety levels.

**Agent deployment requirements:**
- Foundation model for reasoning: 1-2 GPU nodes (Granite 34B or partner models via production inference server)
- Fine-tuned models for domain expertise: Additional GPU allocation
- MCP server infrastructure: CPU-based, runs on existing OpenShift
- Governance middleware: Built into OpenShift AI model serving

**Key talk track:** "Every company will have AI agents within 3 years. The question is whether you deploy them with enterprise governance on infrastructure you control — or hope a cloud provider's guardrails are sufficient for your regulated workloads."

<!-- /audience -->
