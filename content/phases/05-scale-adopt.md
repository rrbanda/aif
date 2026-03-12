# Stage 5: Scale & Adopt

**Duration:** 12–16 weeks

Scale & Adopt expands the factory beyond the initial pilot teams to become the organization's default AI platform. This stage focuses on self-service, domain specialization, agentic AI, and adoption tracking.

## What Happens in This Stage

**Multi-team onboarding** brings additional business units and data science teams onto the platform. Define onboarding runbooks: environment provisioning, access requests, training paths, and support channels. Standardize project templates and naming conventions to reduce operational overhead as team count grows.

**Developer self-service via Gen AI Studio** enables data scientists and developers to experiment with foundation models, fine-tune models, and deploy without waiting for platform team intervention. Provide guardrails: approved model catalogs, resource quotas, and governance policies baked into the UI. Balance autonomy with control.

**llm-d distributed inference routing** routes requests to the appropriate model based on workload type, latency requirements, or cost. Use routing for model selection across fine-tuned variants (e.g., credit risk vs. AML, clinical vs. operational) and for A/B testing new model versions. Configure fallbacks when primary models are unavailable.

**Domain-specific fine-tuned models** target high-value use cases across industries: credit risk scoring, clinical NLP, predictive maintenance, regulatory interpretation. Each domain may require different base models, training data, and evaluation criteria. Document the fine-tuning pipeline and retraining cadence per domain.

**Agentic AI deployment** introduces autonomous agents with MCP (Model Context Protocol) tool integration for retrieval, tool use, and orchestration. Deploy agents for document Q&A, workflow automation, operational decision support, or code generation. Define agent boundaries, tool permissions, and human-in-the-loop checkpoints for high-risk actions. This is the next inflection point in enterprise AI — agents that reason, plan, and act using enterprise tools and data.

**Adoption dashboard** tracks usage (inference calls, training jobs), compute consumption (GPU hours, memory), and cost per model or team. Use this data for capacity planning, chargeback/showback, and value realization reporting to the steering committee.

<!-- audience: customer -->

## Your Commitments

Scaling the factory is primarily an organizational challenge. Technology scales more easily than adoption, governance, and skills.

| Role | Time Commitment | Purpose |
|------|----------------|---------|
| **AI Center of Excellence** | Ongoing (permanent function) | Standards enforcement, model catalog curation, cross-team consulting |
| **Business unit champions** (per new team) | 4-6 weeks onboarding | Use case definition, team onboarding, adoption tracking |
| **Platform engineering team** | Ongoing | Capacity planning, new team provisioning, GPU scaling |
| **Change management lead** | Ongoing | Adoption tracking, resistance mitigation, executive communications |
| **Finance / FinOps** | Monthly | Chargeback/showback reporting, cost optimization |

## What You Receive

| Deliverable | What It Contains |
|-------------|-----------------|
| **Self-service AI platform** | Gen AI Studio and AI Hub access for all onboarded teams — experiment, fine-tune, and deploy within guardrails |
| **Onboarding runbook** | Standardized process for new teams: environment provisioning, training paths, first-use-case playbook |
| **Domain-specific fine-tuned models** | Models specialized for your industry and use cases, served via the factory's model-as-a-service infrastructure |
| **Agentic AI capabilities** | Autonomous AI agents with tool integration, governance guardrails, and human-in-the-loop controls |
| **Adoption dashboard** | Real-time tracking of usage, compute consumption, cost per team/model, and value realization metrics |
| **Capacity planning model** | GPU demand forecasting based on adoption trends and workload growth |

## Readiness Checklist

Before entering Scale & Adopt, confirm:

- [ ] MLOps pipeline is operational with governance gates enforcing for all production models
- [ ] AI Center of Excellence is established with standards, model catalog, and consulting capacity
- [ ] At least 2-3 use cases are in production with documented KPI results
- [ ] Onboarding process is defined and tested with the initial teams
- [ ] Budget model for GPU scaling is approved (per-node, chargeback, or centralized)
- [ ] Change management and communication plan covers all target business units
- [ ] Executive sponsor has communicated the factory mandate to the broader organization

## What to Expect

Scaling introduces organizational complexity: competing priorities across business units, shadow AI initiatives, budget debates over GPU allocation, and skills gaps in newly onboarded teams. Expect the Center of Excellence and Steering Committee to become critical governance mechanisms. The factory's value proposition at this stage is not just technical capability — it is the repeatability that allows new use cases to reach production in weeks rather than months.

<!-- /audience -->

<!-- audience: internal -->

## Internal: Delivery Methodology

**Red Hat Services alignment:** Scale stage is driven by TAM with periodic consulting engagements for new team onboarding or complex use cases. This is where the land-and-expand revenue model activates.

**Resource estimation:**
- Red Hat TAM: Ongoing (weekly/bi-weekly check-ins)
- Red Hat Consulting: On-demand for new team onboarding or agentic AI deployment (2-4 week engagements)
- Red Hat Training: AI501 course for new teams, Red Hat Learning Subscription for ongoing skills development

**Expansion signals (watch for these):**
- Customer requesting GPU capacity expansion → upsell GPU nodes + subscriptions
- New business units asking for platform access → onboarding consulting engagement
- Customer evaluating agentic AI or multi-model serving → advanced consulting + additional NIM subscriptions
- Customer benchmarking GPU alternatives → consultative engagement, ensure platform supports chosen hardware

**Common objections and responses:**
- *"Shadow AI teams are deploying outside the factory"* — This is a governance and adoption problem. Position the factory as enabling (self-service, Gen AI Studio) rather than controlling. Evangelism and COP activities are critical at this stage.
- *"GPU costs are scaling faster than business value"* — Implement chargeback/showback to create cost visibility. llm-d routing optimizes model selection by cost. Right-size GPU allocation per team.
- *"We need to evaluate other platforms"* — Competitive displacement risk. Demonstrate the switching cost (data pipelines, model registry, governance gates, team training all built on the factory). Position upgrade path (Blackwell → Rubin) as platform continuity advantage.

**Agentic AI positioning:** Agentic AI is the strongest differentiation at scale stage. Enterprise agents require the full factory stack — foundation models, fine-tuned domain models, inference infrastructure, MCP tool integration, and governance. No other platform provides this end-to-end on-premises.

<!-- /audience -->
