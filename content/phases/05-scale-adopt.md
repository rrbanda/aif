# Phase 5: Scale & Adopt

**Duration:** 12–16 weeks

Scale & Adopt expands the factory beyond the initial pilot teams to become the organization’s default AI platform. This phase focuses on self-service, domain specialization, and adoption tracking.

## What Happens in This Phase

**Multi-team onboarding** brings additional business units and data science teams onto the platform. Define onboarding runbooks: environment provisioning, access requests, training paths, and support channels. Standardize project templates and naming conventions to reduce operational overhead as team count grows.

**Developer self-service via Gen AI Studio** enables data scientists and developers to experiment with foundation models, fine-tune models, and deploy without waiting for platform team intervention. Provide guardrails: approved model catalogs, resource quotas, and governance policies baked into the UI. Balance autonomy with control.

**llm-d distributed inference routing** routes requests to the appropriate model based on workload type, latency requirements, or cost. Use routing for model selection across fine-tuned variants (e.g., credit risk vs. AML) and for A/B testing new model versions. Configure fallbacks when primary models are unavailable.

**Domain-specific fine-tuned models** target high-value use cases: credit risk scoring, equities analysis, AML (anti-money laundering), and regulatory reporting. Each domain may require different base models, training data, and evaluation criteria. Document the fine-tuning pipeline and retraining cadence per domain.

**Agentic AI deployment** introduces agents with MCP (Model Context Protocol) tool integration for retrieval, tool use, and orchestration. Deploy agents for document Q&A, workflow automation, or code generation. Define agent boundaries, tool permissions, and human-in-the-loop checkpoints for high-risk actions.

**Adoption dashboard** tracks usage (inference calls, training jobs), compute consumption (GPU hours, memory), and cost per model or team. Use this data for capacity planning, chargeback/showback, and value realization reporting to the steering committee.

<!-- audience: internal -->
Gen AI Studio and llm-d are Red Hat / OpenShift AI components—verify current product names and capabilities. Position this phase as the “expansion” motion after operationalize proves the platform. Adoption dashboard is often built with OpenShift metrics, Prometheus, and Grafana; some customers want integration with FinOps tools. Agentic AI is early—ensure customers understand experimental nature and governance requirements for tool access.
<!-- /audience -->
