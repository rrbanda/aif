---
name: ai-factory-methodology
description: AI Factory program methodology, definitions, phases, and value gates. Use when explaining what an AI Factory is, how the program works, or how phases and organizational elements fit together.
---

# AI Factory Methodology

Apply AI Factory methodology knowledge when agents explain the program, its phases, organizational elements, or value gates.

## When to Apply

Use this skill when the user asks about:
- What an AI Factory is and how it differs from ad-hoc AI
- Program phases and what each phase produces
- Value gates and how to pass them
- How organizational elements map to phases
- Industry definitions of AI Factory (NVIDIA, HBS, Deloitte)

## What Is an AI Factory

An AI Factory is a systematic, scalable architecture for building, deploying, and operating AI at scale through automated, repeatable processes.

### NVIDIA Definition
Purpose-built compute infrastructure — a "token factory" — combining accelerated computing (GPUs), networking (InfiniBand/RoCE), and AI software (NIM, NeMo) into an integrated platform. Emphasis on infrastructure as the foundation of AI at scale.

### Harvard Business School Definition
An organizational model with four components: data pipeline, algorithm development, experimentation platform, and software infrastructure. The "factory" metaphor emphasizes repeatable, scalable production — not one-off models. Key insight: "learn from experience and improve over time" (feedback loops).

### Red Hat AI Factory
Red Hat's methodology and technology platform for enterprise AI. Combines Red Hat AI Enterprise (OpenShift, OpenShift AI) with a curated partner ecosystem (NVIDIA, Intel, AMD, Dell, HPE, Lenovo, Cisco). Designed for on-premises, hybrid cloud, and edge. Key differentiators: proven seven-stage methodology, partner-neutral architecture, intelligent GPU orchestration, enterprise security.

## Program Phases

| Phase | Name | Duration | Key Deliverables |
|-------|------|----------|-----------------|
| 0 | Discovery & Assessment | 2-4 weeks | Readiness assessment, use case inventory, stakeholder map |
| 1 | Data Strategy | 4-6 weeks | Data pipeline design, governance framework, feature store plan |
| 2 | Platform Foundation | 6-8 weeks | OpenShift AI deployment, GPU configuration, multi-tenant setup |
| 3 | Model Development & Pilot | 8-12 weeks | First model in production, MLOps pipeline, monitoring setup |
| 4 | Operationalize | 6-8 weeks | MLOps maturity, governance automation, model registry operations |
| 5 | Scale & Optimize | Ongoing | Multi-model serving, advanced inference (llm-d), cost optimization |
| 6 | AI-Driven Organization | Ongoing | AI COE at scale, self-service ML platform, innovation flywheel |

## Value Gates

Each phase ends with a value gate — a checkpoint that validates readiness to proceed:
- Evidence-based: specific deliverables and metrics must be demonstrated
- Stakeholder sign-off: business and technical sponsors must agree
- Risk review: identified risks must have mitigations in place
- No gate-skipping: each gate must be passed sequentially

## Organizational Elements

| Element | Starts At | Purpose |
|---------|-----------|---------|
| AI Steering Committee | Phase 0 | Executive governance and strategic direction |
| AI Center of Excellence (COE) | Phase 1 | Central expertise, standards, and best practices |
| AI Community of Practice (COP) | Phase 2 | Cross-team knowledge sharing and collaboration |
| AI Evangelism | Phase 0 | Internal advocacy and adoption acceleration |
| AI Bootcamps | Phase 2 | Hands-on technical training for practitioners |
| AI Workshops | Phase 1 | Use case discovery and design thinking sessions |
| Change Management | Phase 0 | Organizational readiness and cultural transformation |

## Response Guidelines

- When explaining AI Factory, cite at least two industry definitions to show breadth
- Always connect phases to concrete deliverables, not abstract concepts
- Emphasize that the "factory" means repeatable production, not one-off projects
- Value gates are mandatory — never suggest skipping them
