# Internal Playbook — Red Hat Field Team Guide

This document consolidates internal engagement guidance for the AI Factory program. It is intended for Red Hat field teams only and should not be shared with customers.

## Program Positioning

Position the AI Factory as a multi-year strategic engagement. The initial program (Stages 0-4) typically takes 9-15 months. Stage 5 and 6 become ongoing subscription and consulting revenue.

## Engagement Mapping by Stage

### Stage 0: Discovery & Assessment

**Red Hat AI Discovery + AI Assessment** is the standard engagement. Position it as a fixed-scope, time-boxed engagement. Deliverables: workload assessment report, infrastructure audit, AI maturity assessment, prioritized use case portfolio, stakeholder map, and program charter. Use the value gate — "use case portfolio scored and prioritized; program charter signed by executive sponsors" — as the exit criterion. Escalate early if executive sponsorship is weak or if data readiness appears significantly lower than expected.

### Stage 1: Data Strategy & Readiness

Connect to the **AI Platform Foundation** engagement's data integration component. Emphasize that data readiness is a gating factor — pilots cannot proceed until pipelines are operational and governance is approved. Common blockers: data silos across business units, data engineering capacity, and regulatory constraints limiting data movement. Recommend starting PII mapping early; it often uncovers surprises.

### Stage 2: Platform Foundation

**AI Platform Foundation** is the primary engagement. Key decision points: which foundation models in the catalog, shared vs. dedicated GPU allocation, and single vs. multi-cluster topology. Document GPU sizing and cost allocation model for internal planning. Watch for GPU procurement delays and security team approval timelines — both frequently slip.

### Stage 3: Pilot & Incubation

**AI Incubator** engagement. Value gate: 2-3 use cases proved end-to-end with measurable business KPIs met or exceeded. Risk: pilots chosen for visibility rather than feasibility — push back if use cases lack clear data or business owner commitment. Document lessons learned for scale readiness assessment; this informs the operationalize stage.

### Stage 4: Operationalize

Align with **OpenShift AI MLOps** capabilities. Model registry and governance gates are often custom-built or integrated with Kubeflow/MLflow — confirm customer's existing tooling. Bias detection tooling varies; recommend open-source options (e.g., Fairlearn, Aequitas) or vendor solutions depending on compliance requirements. Emphasize that governance gates are non-negotiable for financial services.

### Stage 5: Scale & Adopt

Gen AI Studio and llm-d are **Red Hat / OpenShift AI** components — verify current product names and capabilities. Position this stage as the "expansion" motion after operationalize proves the platform. Adoption dashboard is often built with OpenShift metrics, Prometheus, and Grafana; some customers want integration with FinOps tools. Agentic AI is early — ensure customers understand governance requirements for tool access.

### Stage 6: Operate & Improve

Typically covered by ongoing **TAM engagement and subscription renewals**. Position quarterly value reviews as a differentiator — many customers lack structured AI governance. Knowledge base can be a joint Red Hat-customer asset; consider contributing patterns to Red Hat documentation where appropriate. TAM should own the relationship cadence; ensure AI Factory success metrics are included in TAM deliverables.

## Deal Sizing

| Stages | Typical Scope | Notes |
|--------|---------------|-------|
| 0-2 | 15-25 consulting days | Discovery through platform foundation |
| 3-4 | 20-30 consulting days | Pilots through operationalization |
| 5 | Custom scoped | Expansion and adoption |
| 6 | TAM + Support subscription | Ongoing operations |

## Use Case Positioning

### Fraud Detection

Position as a flagship use case — high visibility, clear ROI, and strong data residency justification. Sub-200ms SLA is achievable with vLLM/OpenVINO or Triton serving; validate inference latency in the pilot stage. Watch for data access delays from card network or core banking teams; fraud data often sits in siloed systems.

### Regulatory Reporting

RAG use cases are ideal for Gen AI Studio and prompt experimentation — customers can iterate on retrieval strategies and prompt templates. Emphasize that audit trails are a governance requirement, not optional. Vector DB sizing depends on document corpus; typical regulatory knowledge bases are 10K-100K documents. Plan for embedding model updates and re-indexing cycles.

### Domain Models

Domain models typically emerge in Scale & Adopt stage after platform and pilots are proven. Fine-tuning costs (GPU hours, data prep) are significant — prioritize use cases with clear ROI. Track model reuse metrics: how many teams consume each fine-tuned model? Reuse drives down cost per query and justifies continued investment.

### AIOps

AIOps typically matures in Operate & Improve stage. Start with anomaly detection and incident classification — high value, moderate complexity. Model drift detection for the factory is a differentiator; many customers initially rely on manual monitoring. Position AIOps as a use case that pays for itself by reducing platform operational cost.
