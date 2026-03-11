# Stage 1: Data Strategy & Readiness

**Duration:** 6–8 weeks

Data is the primary constraint for AI at scale. This stage establishes governance, pipelines, and feature infrastructure so the platform can consume data safely and reliably.

## What Happens in This Stage

**Data governance framework** defines policies for classification, access control, retention, and lineage. For regulated industries, this must align with applicable frameworks (PCI DSS for cardholder data, HIPAA for patient data, GDPR for personal data, SOX for financial reporting). Document who can access what, under which conditions, and how data flows through the system. Lineage tracking is non-negotiable for regulatory audits.

**Data quality assessment** profiles the datasets required by pilot use cases. Identify completeness, consistency, and accuracy issues. Poor data quality is the leading cause of model failure — address gaps before training begins.

**Data pipeline architecture** designs ingestion, transformation, and serving pipelines that connect source systems (data lakes, transactional databases, document repositories) to the AI platform. Consider batch vs. streaming, scheduling, and failure handling. On-premises environments often have limited connectivity to cloud; design for data gravity.

**PII handling and data residency** map sensitive fields and their movement. Decide on masking, tokenization, or synthetic data generation for training. Document where data resides and whether cross-border transfer is permitted. Feature store design defines reusable ML features, storage, and serving patterns to avoid duplicate pipelines per use case.

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
