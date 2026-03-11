# AI Factory Program Charter

## Program Overview

| Field | Detail |
|-------|--------|
| **Program Name** | Example Bank Corp AI Factory Program |
| **Sponsor** | Jane Smith, Chief AI Officer |
| **Program Lead** | Tom Chen, VP ML Engineering |
| **Platform Lead** | Rachel Torres, Director AI Platform Engineering |
| **Red Hat Field CTO** | David Kim |
| **Start Date** | January 15, 2026 |
| **Target Duration** | 9 months (3 phases remaining) |

## Vision

Establish a systematic, scalable AI Factory powered by **Red Hat AI Factory with NVIDIA** that enables Example Bank to build, deploy, and operate AI models at enterprise scale — reducing time-to-production from 12 months to 4 weeks while maintaining full regulatory compliance with SR 11-7, PCI DSS, and internal model risk policies.

## Strategic Context

Example Bank processes 8.2 million transactions daily across retail, commercial, and wealth management divisions. The current AI capability is concentrated in a single ML team of 8 engineers operating at Google MLOps Level 0 (manual processes). Three critical business problems require AI solutions:

1. **Fraud detection** — Current rules-based system generates 12% false positive rate, costing $18M annually in analyst review time and $42M in undetected fraud losses
2. **AML compliance** — 15,000 alerts per month, each requiring 45 minutes of analyst review. 60% are false positives.
3. **Credit risk** — Existing scorecards have not been updated with ML augmentation. Competitors are 18 months ahead.

## Objectives

1. Deploy a production-grade AI/ML platform on OpenShift with automated MLOps pipelines
2. Deliver 3 qualified AI use cases through the full lifecycle from experiment to production
3. Build internal AI competency through structured enablement (CoE, bootcamps, workshops)
4. Establish model governance framework compliant with SR 11-7 and internal risk policies
5. Achieve measurable business value from at least 1 production AI use case within 6 months
6. Reduce model deployment time from 12 months to <4 weeks

## Scope

### In Scope

- Red Hat AI Enterprise platform deployment and optimization on existing OpenShift 4.16 cluster
- NVIDIA GPU Operator and AI Enterprise integration for 12x A100 80GB GPUs
- Model lifecycle management (experiment to production to monitoring)
- 3 priority use cases: Fraud Detection, AML Alert Triage, Credit Risk Augmentation
- Team enablement: OpenShift AI bootcamp, MLOps workshop, data science onboarding
- Governance framework: model risk management, bias testing, security scanning, audit trails
- AI Center of Excellence establishment with cross-functional membership
- Community of Practice launch for knowledge sharing

### Out of Scope

- Cloud migration (platform remains on-premise in Newark DC)
- Non-AI/ML workloads on OpenShift
- Third-party SaaS AI tools procurement (Databricks, Azure ML)
- Wholesale replacement of existing credit risk scorecards (augmentation only)
- Real-time data pipeline construction (existing ETL will be extended, not rebuilt)

## Success Criteria

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| Model deployment time | < 4 weeks | Pipeline timestamp tracking |
| Models in production | >= 2 | Model registry status |
| Team members trained | >= 20 | Training completion records |
| Use cases qualified | >= 3 | Use case portfolio scoring |
| False positive reduction (fraud) | >= 60% | A/B test vs. rules-based system |
| GPU utilization | >= 70% | Prometheus metrics |
| Governance gate automation | 100% of deployments | Pipeline enforcement logs |
| Platform uptime | 99.5% | OpenShift monitoring |

## Governance

- **AI Steering Committee**: Quarterly reviews with Jane Smith (sponsor), David Lawson (compliance), Tom Chen (technical), David Kim (Red Hat Field CTO)
- **Program Reviews**: Bi-weekly with Red Hat and internal leads — alternating technical deep-dives and business progress reviews
- **Value Gates**: Phase completion requires documented gate review with measurable criteria met
- **Model Risk Committee**: Monthly review of model governance status — bias testing, security scans, performance validation
- **Escalation Path**: Program Lead → Sponsor → Steering Committee (for budget/scope changes exceeding 10%)

## Phases and Timeline

| Phase | Timeline | Status | Value Gate |
|-------|----------|--------|------------|
| **Discovery & Assessment** | Jan 15 - Feb 1, 2026 | Completed | Use case portfolio scored; charter signed |
| **Data Strategy & Readiness** | Feb 1 - Feb 28, 2026 | Completed | Data pipelines operational; governance framework approved |
| **Platform Foundation** | Mar 1 - May 15, 2026 | In Progress (35%) | OpenShift AI operational with GPU nodes; teams onboarded |
| **Pilot & Incubation** | May 15 - Aug 1, 2026 | Not Started | 2-3 use cases proved with KPIs met |
| **Operationalize** | Aug 1 - Sep 30, 2026 | Not Started | MLOps pipeline operational; governance gates enforcing |
| **Scale & Adopt** | Q4 2026 | Planned | Multi-team onboarding; developer self-service operational |

## Investment

| Component | Annual Cost | Notes |
|-----------|------------|-------|
| Red Hat AI Enterprise (12 GPU nodes) | Subscription | Node-based pricing |
| NVIDIA AI Enterprise (12 GPU nodes) | Subscription | Bundled with Red Hat AI Factory |
| Red Hat Consulting (Services Starter Package) | One-time | Weeks 1-12 |
| Red Hat Training (AI501 + Learning Subscription) | Annual | 20 seats |
| Red Hat Technical Account Management | Annual | Production support advisory |

## Risk Register

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| GPU procurement delay | Medium | High | GPUs already on-site; risk is for expansion |
| Key person dependency (Tom Chen) | Low | High | Platform Lead (Rachel Torres) as backup |
| Data quality insufficient for fraud model | Medium | Medium | Addressed in Data Strategy phase — quality profiling complete |
| Regulatory review delay for model deployment | Medium | High | Early engagement with David Lawson (CCO); governance gates designed upfront |
| Budget pressure reducing AI investment | Low | Medium | Quarterly value reviews with ROI documentation |

## Approvals

| Role | Name | Date | Status |
|------|------|------|--------|
| Executive Sponsor | Jane Smith, CAIO | 2026-01-15 | Approved |
| Compliance Sponsor | David Lawson, CCO | 2026-01-18 | Approved |
| Technical Lead | Tom Chen, VP ML Engineering | 2026-01-15 | Approved |
| Red Hat Field CTO | David Kim | 2026-01-15 | Approved |
