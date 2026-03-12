# Stage 1: Data Strategy & Readiness

**Duration:** 6–8 weeks

Data is the primary constraint for AI at scale. This stage establishes governance, pipelines, and feature infrastructure so the platform can consume data safely and reliably.

## What Happens in This Stage

**Data governance framework** defines policies for classification, access control, retention, and lineage. For regulated industries, this must align with applicable frameworks (PCI DSS for cardholder data, HIPAA for patient data, GDPR for personal data, SOX for financial reporting). Document who can access what, under which conditions, and how data flows through the system. Lineage tracking is non-negotiable for regulatory audits.

**Data quality assessment** profiles the datasets required by pilot use cases. Identify completeness, consistency, and accuracy issues. Poor data quality is the leading cause of model failure — address gaps before training begins.

**Data pipeline architecture** designs ingestion, transformation, and serving pipelines that connect source systems (data lakes, transactional databases, document repositories) to the AI platform. Consider batch vs. streaming, scheduling, and failure handling. On-premises environments often have limited connectivity to cloud; design for data gravity.

**PII handling and data residency** map sensitive fields and their movement. Decide on masking, tokenization, or synthetic data generation for training. Document where data resides and whether cross-border transfer is permitted. Feature store design defines reusable ML features, storage, and serving patterns to avoid duplicate pipelines per use case.

<!-- audience: customer -->

## Your Commitments

Data strategy requires sustained engagement from your data engineering and governance teams — this cannot be delegated entirely to consultants because institutional knowledge of source systems, data semantics, and regulatory constraints resides with your organization.

| Role | Time Commitment | Purpose |
|------|----------------|---------|
| **Data engineering lead** | 8-10 hours/week for 6-8 weeks | Pipeline architecture, source system integration |
| **Data governance officer** | 4-6 hours/week | Policy definition, classification standards, lineage requirements |
| **Compliance representative** | 2-3 sessions + review cycles | Regulatory alignment (PCI DSS, HIPAA, GDPR, SOX as applicable) |
| **Business unit data owners** | 2-3 sessions per data domain | Data catalog validation, quality assessment, access approvals |

## What You Receive

| Deliverable | What It Contains |
|-------------|-----------------|
| **Data governance framework** | Classification policies, access control matrix, retention rules, and lineage tracking requirements tailored to your regulatory environment |
| **Data quality assessment** | Profiling results for pilot use case datasets — completeness, consistency, accuracy, and remediation recommendations |
| **Pipeline architecture design** | Ingestion, transformation, and serving pipeline blueprints connecting your source systems to the AI platform |
| **PII/sensitive data mapping** | Inventory of sensitive fields, data residency constraints, and recommended masking/tokenization approaches |
| **Feature store design** | Reusable ML feature definitions, storage patterns, and serving architecture to prevent duplicate pipelines across use cases |

## Readiness Checklist

Before entering Data Strategy, confirm:

- [ ] Data catalog or schema documentation exists for candidate use case data sources
- [ ] Data governance policy exists (or organization is committed to creating one)
- [ ] Source system owners are identified and available for integration discussions
- [ ] Data access approval process is understood (who grants read access to which systems)
- [ ] Regulatory requirements for data handling are documented (even at a high level)
- [ ] Data engineering team has capacity allocated for 6-8 weeks

## What to Expect

This stage frequently reveals that data is less ready than assumed. Common discoveries: siloed datasets with no shared identifiers, inconsistent data quality across business units, and PII in unexpected places. These are normal findings — addressing them now prevents model failure and audit risk in later stages.

<!-- /audience -->

<!-- audience: internal -->

## Internal: Delivery Methodology

**Red Hat Services alignment:** Data strategy typically spans weeks 3-8 of the Services Starter Package, overlapping with late discovery and early platform foundation. Red Hat Consulting works alongside the customer's data engineering team.

**Resource estimation:**
- Red Hat Consulting: 1-2 consultants, 6 weeks (120-240 hours)
- Customer commitment: Data engineering lead, data governance officer, compliance representative
- Key dependency: Access to source system documentation and data catalogs

**Common objections and responses:**
- *"Our data team handles this"* — The data strategy must be aligned with the AI Factory platform architecture. Isolated data pipelines create integration debt later.
- *"We already have a data lake"* — Having data is not the same as having AI-ready data. Quality profiling, feature engineering, and ML-specific governance are different from BI/analytics data management.
- *"Data governance will slow us down"* — In regulated industries, governance is non-negotiable. Building it in now is faster than retrofitting after an audit finding.

**Competitive context:**
- Databricks has strong data engineering tooling (Delta Lake, Unity Catalog) — position Red Hat's data strategy as platform-agnostic and on-premises first.
- Snowflake customers may push for Snowpark ML — emphasize data sovereignty and on-prem inference requirements.
- AWS Glue/SageMaker Feature Store locks data into AWS — position portability and hybrid flexibility.

**Risk indicators:**
- Customer has no data catalog or lineage tracking → add 2-4 weeks to timeline
- Multiple data warehouses across business units → data unification is a prerequisite
- Compliance team not yet engaged → governance approval will block pilot stage

<!-- /audience -->
