# Banking AI Programs: Industry Landscape

## Tier-1 Bank AI Program Patterns

### JPMorgan Chase
- Invested $17B+ in technology annually, with AI as a strategic priority across all lines of business
- Operates a centralized AI/ML platform team that serves trading, risk, fraud, and consumer banking
- Deployed LLMs internally (LLM Suite) for employee productivity, document analysis, and code generation
- Publicly committed to responsible AI principles with a dedicated AI ethics board
- Has stated that AI will not replace humans for critical decisions — human-in-the-loop is mandatory

### Goldman Sachs
- Runs a centralized engineering organization that builds shared AI/ML platform capabilities
- Focused on AI for trading strategies, risk management, and internal developer productivity
- Deployed internal coding assistants and document processing AI
- Invests heavily in talent — recruits ML engineers and data scientists at scale
- Emphasizes that AI augments human expertise rather than replacing judgment

### HSBC
- Runs AI at scale for anti-money laundering (AML), fraud detection, and customer service
- Operates a global AI Center of Excellence that sets standards and governance
- Strong emphasis on responsible AI and regulatory compliance across multiple jurisdictions
- Uses AI for transaction monitoring, processing millions of alerts with reduced false positives
- Committed to on-prem and hybrid cloud for data sovereignty across regulated markets

### Bank of America
- Erica (AI assistant) serves 35M+ users with 2B+ interactions
- Invests $12B+ annually in technology, with significant AI allocation
- Runs internal AI/ML platform for risk scoring, fraud detection, and personalization
- Strong focus on customer-facing AI applications alongside internal automation

## Common Patterns Across Tier-1 Banks

### Organizational Structure
- **Centralized COE + Federated Teams**: Most large banks operate a central AI platform team that provides shared infrastructure, tooling, and governance, with business-embedded data science teams that build domain-specific models
- **Executive Sponsorship**: AI programs report to CTO or CAIO with direct board visibility
- **Governance Board**: Cross-functional body (technology, risk, compliance, business) that approves model deployment
- **Responsible AI Team**: Dedicated team for fairness, explainability, and ethical AI review

### Infrastructure Patterns
- **On-Premises First**: Regulated data (PII, transaction, risk) stays on-prem. Cloud used selectively for non-sensitive workloads or burst compute
- **Hybrid Compute**: Training on cloud GPU clusters for burst capacity; inference on-prem for latency and compliance
- **Platform Approach**: Shared ML platform (similar to AI Factory concept) serving multiple business lines
- **GPU Investment**: Significant investment in GPU infrastructure for training and inference

### Common Use Cases by Maturity
**Early Stage (Pilot):**
- Document processing and extraction
- Internal coding assistants
- Customer service chatbots (non-financial advice)

**Mid Stage (Production):**
- Fraud detection and AML alert triage
- Credit risk scoring augmentation
- Trading signal generation
- Regulatory document analysis

**Advanced (Scale):**
- Real-time transaction monitoring at millions of TPS
- Personalized financial recommendations
- Automated regulatory reporting
- Multi-model inference pipelines

## Regulatory Drivers for Sovereign AI

### SR 11-7 (Model Risk Management)
- Federal Reserve / OCC guidance requiring banks to manage model risk
- Mandates model validation, ongoing monitoring, and documentation
- Applies to all models used for decision-making, including AI/ML
- Requires independent model validation separate from development team
- Drives need for model registry, governance gates, and audit trail

### DORA (Digital Operational Resilience Act)
- EU regulation effective January 2025
- Requires banks to manage ICT risk including AI systems
- Mandates incident reporting, resilience testing, and third-party risk management
- Drives need for on-prem or sovereign cloud deployment

### PCI DSS
- Payment Card Industry Data Security Standard
- Restricts where cardholder data can be processed and stored
- Drives need for on-prem AI infrastructure for any use case involving payment data

### SOX (Sarbanes-Oxley)
- Requires internal controls over financial reporting
- AI models that influence financial reporting must have documented controls
- Drives need for model lineage, approval workflows, and audit trail

### Data Sovereignty Requirements
- Many jurisdictions require data to remain within national borders
- Banking data often subject to multiple overlapping jurisdictions
- Drives need for on-prem or sovereign cloud, not public cloud
- Red Hat AI Factory with NVIDIA specifically addresses this with on-prem deployment

## Why This Matters for AI Factory Positioning

1. **Every major bank is building some version of an AI Factory** — the question is not "if" but "how well"
2. **The gap between leaders and laggards is widening** — banks that invest in platform capabilities now will have a 2-3 year advantage
3. **Regulatory pressure makes governance non-negotiable** — the AI Factory's governance gates directly address SR 11-7, DORA, and SOX
4. **On-prem is not optional for regulated workloads** — Red Hat's hybrid cloud approach with NVIDIA is structurally advantaged for banking
5. **Organizational transformation is harder than technology** — the AI Factory's organizational track (COE, Steering Committee, Bootcamps) addresses the real bottleneck
