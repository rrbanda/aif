# AI Center of Excellence

The AI Center of Excellence (CoE) is the central expert team that defines standards, reference architectures, and evaluation criteria for the AI Factory. It does not build every use case—it enables teams to build consistently, safely, and efficiently by providing reusable assets and consulting.

## Standards and Reference Architectures

The CoE publishes and maintains platform standards: approved tooling, patterns for model serving (e.g., vLLM, TensorRT-LLM), pipeline templates, and integration approaches. Reference architectures document how to deploy models on OpenShift AI, connect to data sources, and implement observability. These reduce reinvention and accelerate delivery.

## Model Catalog and Evaluation Criteria

The CoE curates the approved model catalog—which foundation models are sanctioned for use, with performance benchmarks and deployment guidance. It defines evaluation criteria: accuracy thresholds, hallucination checks, grounding requirements, and fairness considerations. Teams consult the catalog before selecting models; new models require CoE review.

## Consulting and Enablement

CoE members consult with delivery teams on architecture, model selection, pipeline design, and troubleshooting. This is not a bottleneck—it is lightweight review and guidance. Office hours and async channels (Slack, Teams) keep access friction low. The CoE also manages reusable assets: templates, evaluation frameworks, and shared pipelines.

## Coordination with Security and Compliance

The CoE works with security and compliance teams to translate policy into technical requirements. PII handling, model explainability, audit logging, and access controls must be baked into standards. In financial services, this coordination is non-negotiable.


<!-- audience: internal -->

## Internal: Delivery Methodology

**Red Hat Services alignment:** The CoE is typically established during the Platform Foundation phase (weeks 5-12). Red Hat Consulting helps define charter, governance model, and initial standards. Ongoing advisory via TAM supports CoE maturation.

**Effort estimation:**
- CoE charter and governance model: 2 weeks
- Initial standards and patterns documentation: 3-4 weeks
- Ongoing advisory: TAM engagement (bi-weekly)

**Common pitfalls:**
- CoE as bottleneck — the CoE should enable, not gatekeep. Standards should be guardrails, not approval queues
- Understaffed CoE — a 2-person CoE cannot support 50 data scientists. Plan for growth
- No executive authority — CoE recommendations without enforcement power are ignored
- Disconnected from business — a purely technical CoE misses business alignment. Include business liaisons

**Competitive positioning:** Databricks and cloud providers don't typically help establish organizational structures. Red Hat Consulting's CoE guidance is a differentiator — technology + organizational change as one engagement.

<!-- /audience -->
