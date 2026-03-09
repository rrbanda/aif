---
name: model-governance
description: AI model governance, validation, and compliance knowledge. Use when discussing governance gates, model risk management, bias testing, SR 11-7 compliance, or model approval workflows.
---

# Model Governance

Apply model governance expertise when agents handle governance gate checks, model validation, compliance reviews, or deployment approvals.

## When to Apply

Use this skill when the user asks about:
- Model governance gates and what must pass before production
- Bias testing, fairness metrics, and disparate impact analysis
- SR 11-7 model risk management requirements
- Model validation workflows and challenger/champion testing
- Compliance requirements for deploying AI models in financial services
- Model cards, documentation requirements, and audit trails

## Governance Gate Framework

Before a model can transition from **validated → deployed**, it must clear these gates:

### 1. Bias & Fairness Gate
- Disparate impact ratio must be between 0.8 and 1.25 across protected groups
- Demographic parity checked across all decision boundaries
- Equalized odds validation for classification models
- For credit/lending models: ECOA/HMDA fair lending compliance required
- Document: protected attributes tested, metrics achieved, any mitigations applied

### 2. Security Gate
- Dependency vulnerability scan: zero critical CVEs, zero high CVEs
- Container image scan: clean bill of health
- Model serialization safety: avoid pickle for untrusted sources, prefer ONNX/SafeTensors
- Input validation: adversarial robustness testing for production-critical models
- Data encryption: at rest (AES-256) and in transit (TLS 1.3)

### 3. Performance Gate
- Accuracy/F1 must meet use-case-specific SLA (typically ≥ 0.85 for production)
- P95 latency: ≤ 200ms for real-time inference, ≤ 5000ms for batch
- Throughput: must handle expected production load with headroom
- Error rate: ≤ 1% in staging environment
- Drift baseline: establish reference distributions for future monitoring

### 4. Documentation Gate
- Model card completed (purpose, training data, limitations, ethical considerations)
- Data lineage documented (source → transform → feature → model)
- Risk classification assigned (Tier 1: high impact, Tier 2: medium, Tier 3: low)
- Runbook for incident response and rollback procedures

### 5. Approval Gate
- Model Risk Committee sign-off for Tier 1 models
- Business owner sign-off confirming use case alignment
- Compliance review for regulated use cases
- All approvals timestamped and immutable in audit trail

## SR 11-7 Requirements

Federal Reserve SR 11-7 (Guidance on Model Risk Management) requires:
- **Model development**: Rigorous methodology, sound theory, appropriate data
- **Model validation**: Independent review, challenger testing, backtesting
- **Model governance**: Clear ownership, policy framework, inventory management
- **Ongoing monitoring**: Performance tracking, periodic revalidation, outcome analysis

## Model Risk Tiers

| Tier | Impact Level | Examples | Governance Level |
|------|-------------|----------|-----------------|
| Tier 1 | High | Credit decisioning, fraud scoring, AML | Full committee review, independent validation |
| Tier 2 | Medium | Customer segmentation, recommendation, pricing | Team lead review, automated validation |
| Tier 3 | Low | Internal reporting, data quality, operational | Automated checks, self-certification |

## Response Guidelines

- Always reference specific regulatory frameworks by name
- Never recommend bypassing or shortcutting governance gates
- For Tier 1 models, emphasize independent validation requirement
- When discussing timelines, note that governance adds 2-4 weeks for Tier 1 models
- Distinguish between "nice to have" and "regulatory requirement"
