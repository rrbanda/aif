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

<!-- audience: customer -->

## Expected Business Outcomes

| Metric | Typical Improvement | How It Is Measured |
|--------|--------------------|--------------------|
| GPU utilization | 60-80% (vs. 10-30% with dedicated deployments) | Average GPU utilization across shared model serving pool |
| API latency | p50: sub-100ms, p95: sub-500ms, p99: sub-1s | Inference latency percentiles across all consuming applications |
| Cost per inference | 30-60% reduction vs. per-team deployments | Total infrastructure cost divided by inference requests, compared to siloed deployments |
| Team onboarding time | Days (vs. weeks for standalone deployment) | Time from access request to first API call for new consuming teams |

## Is This Right for Your Organization?

This use case is a strong fit if your organization:
- Has multiple teams or applications that need access to AI models (or will as the factory scales)
- Experiences GPU waste from dedicated per-team model deployments with low utilization
- Wants consistent governance across all model consumption — authentication, rate limiting, audit logging
- Needs cost visibility and chargeback/showback for AI compute consumption
- Has a platform engineering team capable of operating shared infrastructure

## Your Requirements

- **Platform Foundation complete**: OpenShift AI operational with GPU nodes and model registry
- **Model catalog**: At least one approved model ready for shared serving
- **Consuming teams identified**: At least 2-3 teams or applications ready to consume models via API
- **Governance policies defined**: Authentication, authorization, rate limiting, and usage tracking requirements
- **Budget model decided**: Centralized cost pool vs. chargeback per consuming team

## Implementation Timeline

| Stage | Duration | What Happens |
|-------|----------|-------------|
| Inference infrastructure | 2-3 weeks | Model serving deployment, GPU pool configuration, routing setup |
| API gateway and governance | 1-2 weeks | Authentication, rate limiting, request logging, quota management |
| Consumer onboarding | 1-2 weeks per team | API key provisioning, SDK/documentation, first integration |
| Observability and chargeback | 1-2 weeks | Per-model and per-consumer dashboards, cost tracking, SLA monitoring |

<!-- /audience -->

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
