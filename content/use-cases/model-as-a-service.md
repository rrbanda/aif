# Model as a Service

Model as a Service (MaaS) centralizes AI model hosting, serving multiple teams and applications from shared, governed API endpoints. Instead of each team deploying and managing their own model infrastructure, MaaS provides a central platform where approved models are served with enterprise-grade management: rate limiting, quota management, authentication, monitoring, and cost tracking.

## Why Centralize Model Serving

**GPU efficiency** — Dedicated model deployments per team waste GPU resources. Models sit idle between requests. Centralized serving enables GPU sharing, intelligent batching, and dynamic scaling based on actual demand.

**Governance consistency** — Centralized serving ensures every model consumer goes through the same governance pipeline: authentication, authorization, rate limiting, request logging, and bias monitoring. No shadow deployments.

**Cost visibility** — Per-team and per-application usage tracking enables chargeback/showback. Teams understand the cost of their AI consumption, driving optimization and right-sizing.

**Operational simplicity** — One platform team manages model infrastructure instead of each team maintaining their own serving stack. Updates, security patches, and capacity planning happen once.

## Architecture

MaaS on the AI Factory platform uses:

- **AI Hub** — Central catalog of approved models with metadata, performance characteristics, and deployment guidance
- **NIM microservices** — Pre-optimized inference containers for each model
- **llm-d** — Kubernetes-native distributed inference routing that selects the optimal model instance based on latency, cost, and SLA requirements
- **API gateway** — Authentication, rate limiting, and request routing
- **Observability** — Per-model and per-consumer metrics: latency, throughput, error rates, token usage, cost

## Multi-Tenancy Patterns

**Namespace isolation** — Each consuming team has a dedicated namespace with resource quotas and RBAC. Models are served from a shared inference pool but access is controlled per namespace.

**Tiered SLAs** — Priority routing for latency-critical applications (e.g., real-time fraud scoring) vs. best-effort for batch workloads (e.g., document processing).

**Model routing** — llm-d routes requests to the appropriate model variant: cost-optimized (smaller model), accuracy-optimized (larger model), or domain-specialized (fine-tuned variant).

<!-- audience: internal -->

## Internal: Deal Positioning

**Strongest expansion use case.** Once MaaS is operational, every new team or application that wants AI becomes a consumer — not a separate platform project. This drives GPU node expansion, subscription growth, and stickiness.

**Competitive differentiation:**
- Cloud MaaS (Azure OpenAI Service, AWS Bedrock): Cloud-hosted, per-token pricing, no on-prem option. Costs scale unpredictably.
- Databricks Model Serving: Tied to Databricks platform. Limited serving optimization compared to NIM + llm-d.
- Red Hat AI Factory MaaS: On-prem, node-based pricing (predictable), NIM optimization, llm-d intelligent routing, full governance.

**Key metric for expansion:** Number of consuming teams/applications. Each new consumer validates the platform and justifies additional GPU capacity.

**Pricing advantage:** Node-based pricing is predictable. Cloud per-token pricing creates budget anxiety. Position AI Factory as "infrastructure you own with costs you control."

<!-- /audience -->
