---
name: banking-context
description: Banking and financial services industry context for AI Factory engagements. Use when answering questions about financial services, regulatory compliance, or AI deployments in banking.
---

# Banking Context

Apply banking-specific knowledge when answering questions about AI Factory engagements in financial services. Banking institutions operate under stringent regulatory and risk frameworks that materially affect AI adoption.

## When to Apply

Use this skill when the user asks about:
- Regulatory compliance for AI systems in banking
- Data sovereignty or residency requirements
- Risk management expectations for models
- Deployment patterns for Tier-1 or regulated banks

## Regulatory Frameworks

Banking AI systems must satisfy multiple overlapping regulations. Consult `references/regulatory.md` for specifics on PCI DSS, SOX, GDPR, and Basel requirements. When answering:

- **PCI DSS**: If cardholder data or payment flows are involved, emphasize tokenization, encryption at rest and in transit, and access controls. AI systems that process payment data require PCI scope assessment.
- **SOX**: Model-generated reports used for financial reporting or internal controls must have auditable lineage and validation.
- **GDPR/Privacy**: Customer PII in training data or inference requires consent, purpose limitation, and data minimization. Right to explanation may apply to automated decisions.
- **Basel III/IV**: Risk models (credit, market, operational) require regulatory validation and ongoing monitoring.

## Data Sovereignty and Residency

Consult `references/data_residency.md` for deployment constraints. Tier-1 banks often mandate:

- On-premises or sovereign cloud for sensitive data
- Data classification (public, internal, confidential, restricted) driving where models run
- Cross-border restrictions (e.g., EU data stays in EU)
- Air-gapped or disconnected patterns for highest classification tiers

When sizing or architecting, always ask about data classification and residency constraints first.

## Risk Management and Compliance

Consult `references/compliance.md` for SR 11-7, explainability, and fair lending. Key expectations:

- **SR 11-7**: Model risk management framework—development, validation, governance. Models require independent validation and ongoing monitoring.
- **Explainability**: Regulators expect interpretable models or post-hoc explanations for high-impact decisions.
- **Audit trails**: Full lineage from data to model to decision, with immutable logs.
- **Fair lending (ECOA/HMDA)**: Bias testing, disparate impact analysis, and documentation for models affecting credit decisions.

## Response Guidelines

- Lead with regulatory and risk context when relevant.
- Avoid generic cloud-first advice; banking often requires on-prem or hybrid.
- Reference specific frameworks (SR 11-7, PCI DSS) by name when applicable.
- For sizing or architecture, surface data residency and classification as first-order constraints.
