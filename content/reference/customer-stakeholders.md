# Customer-Side Stakeholder Map

The AI Factory program engages multiple customer stakeholders across business, technology, compliance, and operations. Understanding who to engage at each phase — and what they care about — is critical for program success.

## Executive Sponsors

### Chief AI Officer (CAIO) / Chief Data Officer (CDO)

**What they care about:** AI strategy, competitive positioning, talent, organizational structure, ROI
**Engagement phases:** All phases — primary executive sponsor for the program
**Key questions they ask:**
- How does this compare to what peer banks are doing?
- What organizational structure do we need to scale AI?
- How do we measure return on AI investment?
- When will we see production AI delivering business value?

### Chief Technology Officer (CTO)

**What they care about:** Platform architecture, infrastructure investment, technology risk, vendor strategy
**Engagement phases:** Phase 0 (assessment), Phase 2 (platform), Phase 4 (operationalize)
**Key questions they ask:**
- How does this fit with our existing OpenShift investment?
- What's the total infrastructure cost (GPU, storage, networking)?
- Build vs buy vs partner for the AI platform?
- How do we avoid vendor lock-in?

### Chief Risk Officer (CRO) / Chief Compliance Officer

**What they care about:** Model risk (SR 11-7), regulatory compliance, audit trail, explainability
**Engagement phases:** Phase 0 (governance design), Phase 4 (governance gates), Phase 6 (ongoing compliance)
**Key questions they ask:**
- How does this satisfy SR 11-7 model risk management requirements?
- What's the audit trail from data to prediction?
- How do we detect and remediate bias in production models?
- Who approves models for production deployment?

## Technical Leadership

### VP/Head of AI/ML Engineering

**What they care about:** Platform capabilities, developer experience, MLOps maturity, team productivity
**Engagement phases:** Phase 2 (platform), Phase 3 (pilot), Phase 4 (MLOps)
**Key questions they ask:**
- How does the platform support our existing ML workflow?
- What's the training-to-deployment cycle time?
- How do we handle model versioning and rollback?
- Can we support both traditional ML and LLM workloads?

### ML Platform Lead

**What they care about:** Day-to-day platform operations, GPU management, user support, reliability
**Engagement phases:** Phase 2 through Phase 6 — becomes the primary operator
**Key questions they ask:**
- How do we manage GPU allocation across teams?
- What's the onboarding process for new data science teams?
- How do we handle platform upgrades without disrupting users?
- What observability do we have into platform health?

### Data Engineering Lead

**What they care about:** Data pipeline architecture, data quality, feature engineering, data governance
**Engagement phases:** Phase 1 (data strategy), Phase 2 (platform integration), Phase 4 (pipeline automation)
**Key questions they ask:**
- How does the AI platform integrate with our data lake/warehouse?
- What's the data pipeline architecture for training vs. inference?
- How do we manage feature stores at scale?
- What governance controls exist for data access?

## Governance & Risk

### Model Risk Manager

**What they care about:** Model validation, performance monitoring, regulatory compliance, documentation
**Engagement phases:** Phase 3 (pilot validation), Phase 4 (governance gates), Phase 6 (ongoing monitoring)
**Key questions they ask:**
- What model validation framework does the platform support?
- How do we implement challenger models and champion/challenger testing?
- What documentation is auto-generated for regulatory review?
- How do we monitor model drift and trigger revalidation?

### AI Ethics / Responsible AI Lead

**What they care about:** Fairness, transparency, explainability, societal impact
**Engagement phases:** Phase 0 (principles), Phase 3 (pilot evaluation), Phase 4 (governance gates)
**Key questions they ask:**
- What bias detection and mitigation tools are available?
- How do we implement explainability for different model types?
- What's our process for handling ethical edge cases?
- How do we communicate AI decisions to affected customers?

## Mapping: Customer Stakeholders to Red Hat Personas

| Customer Stakeholder | Primary Red Hat Persona | Supporting Red Hat Persona |
|---|---|---|
| CAIO / CDO | Field CTO | Account Executive |
| CTO | Account SA | Field CTO |
| CRO / Compliance | Field CTO | AI Specialist SA |
| VP AI/ML Engineering | AI Specialist SA | Account SA |
| ML Platform Lead | Account SA | AI Specialist SA |
| Data Engineering Lead | AI Specialist SA | Account SA |
| Model Risk Manager | AI Specialist SA | AI Specialist Sales |
| AI Ethics Lead | AI Specialist SA | Field CTO |
