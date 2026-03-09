# Phase 1: Data Strategy & Readiness

**Duration:** 6–8 weeks

Data is the primary constraint for AI in financial services. This phase establishes governance, pipelines, and feature infrastructure so the platform can consume data safely and reliably.

## What Happens in This Phase

**Data governance framework** defines policies for classification, access control, retention, and lineage. For banking, this must align with PCI DSS (cardholder data), GDPR (personal data), and SOX (financial reporting). Document who can access what, under which conditions, and how data flows through the system. Lineage tracking is non-negotiable for regulatory audits.

**Data quality assessment** profiles the datasets required by pilot use cases. Identify completeness, consistency, and accuracy issues. Poor data quality is the leading cause of model failure—address gaps before training begins.

**Data pipeline architecture** designs ingestion, transformation, and serving pipelines that connect source systems (core banking, transaction logs, document repositories) to the AI platform. Consider batch vs. streaming, scheduling, and failure handling. On-premises environments often have limited connectivity to cloud; design for data gravity.

**PII handling and data residency** map sensitive fields and their movement. Decide on masking, tokenization, or synthetic data generation for training. Document where data resides and whether cross-border transfer is permitted. Feature store design defines reusable ML features, storage, and serving patterns to avoid duplicate pipelines per use case.

<!-- audience: internal -->
Connect this phase to the AI Platform Foundation engagement’s data integration component. Emphasize that data readiness is a gating factor—pilots cannot proceed until pipelines are operational and governance is approved. Common blockers: data silos across business units, data engineering capacity, and regulatory constraints limiting data movement. Recommend starting PII mapping early; it often uncovers surprises.
<!-- /audience -->
