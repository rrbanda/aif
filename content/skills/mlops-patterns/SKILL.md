---
name: mlops-patterns
description: MLOps patterns and practices for enterprise AI. Use when answering questions about ML pipelines, model governance, monitoring, or production ML workflows.
---

# MLOps Patterns

Apply MLOps knowledge when answering questions about enterprise ML lifecycle, pipelines, governance, and monitoring. MLOps bridges ML development and production operations.

## When to Apply

Use this skill when the user asks about:
- CI/CD for ML models, GitOps, or automated pipelines
- Model governance, approval gates, or bias testing
- Drift detection, performance monitoring, or model degradation
- Tekton, Argo, or pipeline orchestration for ML

## CI/CD for Models

Consult `references/cicd_models.md` for pipeline patterns. Cover:

- **GitOps for ML**: Model code, configs, and artifacts in Git; declarative deployment; audit trail.
- **Tekton pipelines**: Build, train, validate, and deploy models. Integrate with OpenShift AI and MLflow.
- **Argo Workflows**: Orchestrate multi-step training and evaluation; DAG-based execution.
- **Automated retraining**: Triggers based on schedule, data drift, or performance degradation.

When designing pipelines, emphasize reproducibility (pinned dependencies, versioned data), validation gates, and rollback capability.

## Governance

Consult `references/governance.md` for model lifecycle governance. Key elements:

- **Model cards**: Document purpose, training data, limitations, and performance metrics.
- **Approval gates**: Human or automated approval before promotion to production.
- **Bias testing**: Fairness metrics, disparate impact analysis, and mitigation.
- **Lineage tracking**: End-to-end lineage from data to model to deployment.

For regulated industries (e.g., banking), stress SR 11-7 alignment, audit trails, and segregation of duties.

## Monitoring

Consult `references/monitoring.md` for production monitoring. Cover:

- **Drift detection**: Data drift (input distribution changes) and concept drift (target relationship changes).
- **Performance dashboards**: Latency, throughput, error rates, and business metrics.
- **Alerting**: Thresholds and anomaly detection for model degradation; escalation paths.

When recommending monitoring, include both technical (latency, errors) and business (accuracy, fairness) metrics.

## Response Guidelines

- Align patterns with OpenShift AI capabilities (Tekton, MLflow, Model Registry).
- For governance-heavy industries, lead with compliance and auditability.
- Prefer automated, repeatable patterns over manual processes.
