# Phase 4: Operationalize

**Duration:** 8–12 weeks

Operationalize moves models from development into production with repeatable pipelines, governance controls, and observability. This phase establishes the MLOps foundation that financial services require for auditability and risk management.

## What Happens in This Phase

**MLOps pipeline** implements CI/CD for models: automated testing (unit, integration, performance), canary deployment with traffic splitting, and rollback procedures. Pipeline triggers on model registry changes or scheduled retraining. Design for idempotency and failure recovery—pipeline failures must not leave production in an undefined state.

**Model registry** provides versioning, lineage, and approval workflows. Every model artifact links to training data, hyperparameters, and code commit. Approval gates enforce sign-off from model owners and compliance before promotion. Financial services auditors will ask for this traceability.

**Governance gates** run before deployment: bias detection (demographic parity, equalized odds), security scanning (dependency vulnerabilities, model extraction risk), and performance thresholds (accuracy, latency). Failed gates block promotion. Document gate criteria and override procedures for edge cases.

**Model-as-a-Service** exposes models via APIs with rate limiting, quotas, and SLA policies. Implement authentication, authorization, and request logging. Define capacity planning and scaling rules for inference workloads on OpenShift.

**Observability** tracks model drift (input distribution shifts, prediction drift), latency percentiles, throughput, error rates, and fairness metrics over time. Set alerts for degradation and schedule periodic fairness audits. Dashboards should support both operations and compliance reviews.

**Incident response playbooks** document procedures for model degradation (rollback, traffic shift, investigation) and pipeline failures (retry logic, manual intervention, escalation). Run tabletop exercises to validate playbooks before incidents occur.

## Common Failure Modes at This Phase

Operationalization is where the "pilot-to-production gap" becomes real. Over 40% of agentic AI projects may be canceled by 2027 due to escalating costs, unclear business value, and inadequate risk controls (Gartner).

- **Pod-based isolation persists** — Teams continue ad-hoc workflows within the factory shell, defeating the purpose. The factory exists in name but not in practice. Enforce standardized pipelines and shared model registry from day one.
- **Technical debt accumulation** — ML systems incur massive ongoing maintenance costs through boundary erosion, entanglement, hidden feedback loops, and undeclared consumers. These anti-patterns compound when factory scale amplifies their impact.
- **Governance gates skipped under pressure** — Business urgency pressures teams to bypass bias checks, security scans, or performance thresholds. Document override procedures but make gates the default — financial services auditors will ask for this.
- **Observability gaps** — Models deployed without drift detection or fairness monitoring degrade silently. By the time problems surface, they've affected customers or created regulatory risk.
- **Insufficient MLOps maturity** — Most organizations attempting factory-scale operationalization are at Google MLOps Level 0 or early Level 1. The gap between ambition and operational maturity is where implementations stall. Invest in pipeline automation before scaling model count.

<!-- audience: internal -->
Align with OpenShift AI MLOps capabilities and Red Hat OpenShift Service on AWS / on-prem equivalents. Model registry and governance gates are often custom-built or integrated with Kubeflow/MLflow—confirm customer’s existing tooling. Bias detection tooling varies; recommend open-source options (e.g., Fairlearn, Aequitas) or vendor solutions depending on compliance requirements. Emphasize that governance gates are non-negotiable for financial services; lightweight implementations can be expanded later.
<!-- /audience -->
