# AI Factory Readiness Assessment Framework

An AI Factory program must start with an honest assessment of where the organization stands today. 88% of AI pilots fail to reach production (IDC/Lenovo 2024), and the primary causes are organizational and data readiness gaps, not technology limitations.

This framework evaluates readiness across five dimensions and maps the results to a recommended starting phase and priority actions.

## Dimension 1: Data Infrastructure Readiness

**What to assess:**
- Do functioning data pipelines exist, or is data access ad-hoc?
- Is data governance in place (quality controls, lineage, access policies)?
- Are datasets for AI use cases identified, accessible, and of sufficient quality?
- Is there a feature store or equivalent for reusable feature engineering?
- Can data be accessed from the AI platform without manual ETL for each project?

**Maturity levels:**
- **Level 0 (Ad-hoc)**: Data exists in silos. Each project requires custom extraction. No governance.
- **Level 1 (Emerging)**: Some centralized data assets. Basic quality controls. Manual pipeline management.
- **Level 2 (Established)**: Governed data pipelines. Feature store or equivalent. Automated quality checks.
- **Level 3 (Optimized)**: Unified data fabric. Real-time and batch pipelines. Full lineage and governance.

**If Level 0**: The AI Factory program should start with Phase 1 (Data Strategy) before any platform work. Building a platform without data readiness creates expensive infrastructure nobody can use.

## Dimension 2: Organizational Maturity

**What to assess:**
- How is AI work currently organized? (ad-hoc projects, pods, centralized team, or factory model)
- Is there executive sponsorship with budget authority for a multi-phase program?
- Does a cross-functional governance structure exist (business + technology + compliance)?
- Are there defined processes for model approval, risk assessment, and compliance review?
- Is there a culture of experimentation, or is failure penalized?

**Maturity levels:**
- **Ad-hoc Projects**: Individual data scientists build models independently. No shared infrastructure or standards.
- **Pod Model**: Small cross-functional teams with some process consistency. Limited knowledge sharing.
- **AI Division**: Centralized AI capability with emerging standards and shared platform. Some governance.
- **AI Factory**: Platform-centric, fully standardized, continuous improvement built in. Cross-functional governance operational.

**Key signal**: If three different teams are building the same data pipeline, or nobody knows what models are in production, the organization has outgrown ad-hoc and needs at least division-level structure.

## Dimension 3: Team Composition

**What to assess:**
- How many data scientists, ML engineers, and data engineers are available?
- Are there dedicated MLOps/platform engineering roles?
- Is there AI governance/responsible AI expertise?
- What is the current skill level in Kubernetes, OpenShift, GPU workloads?
- What is the AI training gap? (61% of enterprise workers have spent less than 5 hours learning about AI — HBR Nov 2025)

**Minimum viable team for AI Factory launch:**
- 2+ Data Scientists (model development)
- 1+ ML Engineer (pipeline automation, model deployment)
- 1+ Data Engineer (data pipeline construction and maintenance)
- 1 Platform Engineer (OpenShift AI administration)
- 1 AI Governance lead (compliance, bias monitoring, audit trail)
- Executive sponsor with budget authority

**If understaffed**: The program should include AI Bootcamps and Workshops (Operating Model elements) and may need to start with a smaller scope (1-2 use cases) while building team capacity.

## Dimension 4: Infrastructure Readiness

**What to assess:**
- Is OpenShift deployed and operational?
- What GPU hardware is available or procurable? (A100, H100, L40S)
- Is the network capable of supporting distributed training? (RDMA, high-bandwidth)
- What storage capacity and throughput is available for datasets and model artifacts?
- Are there air-gap or network segmentation constraints?
- What is the GPU procurement timeline? (Often 3-6 months for enterprise)

**Maturity levels:**
- **Level 0**: No GPU infrastructure. OpenShift may or may not exist.
- **Level 1**: Some GPU nodes available. Basic OpenShift deployment. No AI-specific configuration.
- **Level 2**: GPU Operator deployed. OpenShift AI installed. Basic workbench access.
- **Level 3**: Full AI Factory infrastructure. Multi-tenant GPU pools. Distributed training capable. Observability operational.

**Critical path**: GPU procurement and security team approval for network changes are the two most common timeline risks. Start both in Phase 0.

## Dimension 5: Use Case Pipeline

**What to assess:**
- How many AI/ML use cases have been identified?
- Are any in production today? If so, how were they deployed and are they monitored?
- Is there a scoring framework for prioritization (business value, data availability, technical feasibility, regulatory risk)?
- Are there use cases with measurable business KPIs (not just technical metrics)?
- Is there stakeholder commitment (business owner, data owner, compliance contact) for priority use cases?

**Readiness signals:**
- **Not ready for factory**: Fewer than 3 identified use cases. No scoring framework. No business KPIs defined.
- **Ready for pilot**: 3-5 scored use cases with business owners. At least 1 with available data.
- **Ready for factory**: 5+ scored use cases. 1-2 already in production. Repeating deployment patterns across use cases.

## Overall Assessment: Where to Start

| Overall Readiness | Recommended Start | Timeline to Phase 4 |
|---|---|---|
| Most dimensions at Level 0 | Phase 0 (Discovery) with extended data strategy | 15-18 months |
| Data at Level 1+, others mixed | Phase 0 with concurrent Phase 1 | 12-15 months |
| Data and infra at Level 2+ | Phase 2 (Platform Foundation) | 9-12 months |
| All dimensions at Level 2+ | Phase 3 (Pilot) directly | 6-9 months |

## Google MLOps Maturity Model (Reference)

Google's MLOps maturity model provides a complementary lens:

- **Level 0 (Manual)**: Manual, script-driven processes. No automation. No CI/CD for models.
- **Level 1 (ML Pipeline Automation)**: Automated training pipelines. Repeatable experiments. Continuous training triggered by data changes.
- **Level 2 (CI/CD for ML)**: Full CI/CD. Automated testing. Automated deployment. Feature store. Model monitoring.

Most organizations attempting an AI Factory operate at Level 0 or early Level 1. The gap between ambition and operational maturity is where implementations stall.


<!-- audience: customer -->

## Self-Assessment Guide

Use this framework to evaluate your organization's readiness before engaging Red Hat for a formal Discovery & Assessment. Score each dimension honestly — optimistic self-assessments lead to misaligned timelines and expectations.

**How to score:**
- For each dimension above, identify your current maturity level (0-3)
- Be specific: "We think we're at Level 2 in data because we have governed pipelines but no feature store" is better than "Level 2"
- Note the specific gaps that lower your score — these become the priority actions

**Interpreting your results:**

| Your Score | What It Means | Recommended Action |
|-----------|---------------|-------------------|
| Mostly Level 0 | Significant foundational work needed | Start with Discovery + extended Data Strategy. Budget for 15-18 months to production AI |
| Mixed Level 0-1 | Some assets in place, gaps to address | Discovery will map gaps to a prioritized remediation plan |
| Mostly Level 1-2 | Good foundation, ready for structured program | Platform Foundation can start quickly after Discovery |
| Mostly Level 2-3 | Advanced readiness — focus on factory model and governance | May be ready for Pilot stage directly |

**Common self-assessment traps to avoid:**
- Confusing "we have data" with "we have AI-ready data" — data quality, labeling, and governance matter
- Overrating infrastructure because OpenShift is deployed — OpenShift is not the same as AI-ready OpenShift
- Underrating organizational readiness — this is typically the biggest gap and the hardest to fix
- Counting interest as commitment — "teams are interested in AI" is different from "teams have identified specific use cases with business owners and KPIs"

**Next step:** Bring your self-assessment results to the Red Hat Discovery engagement. Honest self-assessment accelerates the formal assessment and produces a more actionable program charter.

<!-- /audience -->

<!-- audience: internal -->

## Internal: Scoring Guidance

**How to use readiness assessment in deal qualification:**
- Level 0-1 across most dimensions → Start at Discovery. Longer engagement timeline (12+ months to production).
- Level 2 in Data + Infrastructure → Ready for Platform Foundation. Shorter path to pilot.
- Level 3+ across dimensions → Rare. These customers may be ready for Scale & Adopt directly.

**Competitive intelligence:**
- Customers who have already built on Databricks or SageMaker may score higher on data readiness but lower on infrastructure readiness for on-prem AI.
- Customers with strong cloud ML practice need the "data sovereignty" and "competitive differentiation" arguments to justify on-prem AI Factory investment.
- Readiness scores below Level 2 in organizational maturity are the strongest indicator of pilot failure. Prioritize Operating Model investment.

**Assessment delivery tips:**
- Run assessment as a structured workshop, not a checklist survey
- Include both technical and business stakeholders
- Use scoring to create urgency: "You are at Level 1 in infrastructure readiness — this means X months before production AI is possible"
- Assessment report becomes the foundation for the program charter and SOW

<!-- /audience -->
