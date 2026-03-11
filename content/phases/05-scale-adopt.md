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
