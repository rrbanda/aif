# Model Governance

## Model Cards

Model cards document models for stakeholders and auditors:

- **Purpose**: Intended use case, target users, and scope.
- **Training data**: Sources, size, date range, and any known limitations or biases.
- **Performance**: Metrics (accuracy, precision, recall, etc.) on validation and test sets.
- **Limitations**: Known failure modes, edge cases, and out-of-scope uses.
- **Maintenance**: Retraining frequency, owner, and contact.

Maintain model cards in the Model Registry or alongside model artifacts. Update when models or use cases change.

## Approval Gates

Gates control promotion from development to production:

- **Automated gates**: Metric thresholds (e.g., accuracy > X, latency < Y). Pipeline fails if not met.
- **Human gates**: Manual approval by model owner, risk, or compliance. Use for high-impact models.
- **Staged promotion**: Dev → Staging → Prod with gates at each stage.
- **Rollback**: Define rollback procedure; keep previous model version available.

For regulated industries, document approval criteria and maintain approval records.

## Bias Testing Frameworks

Assess and mitigate bias in models:

- **Disparate impact**: Compare outcomes across protected groups (e.g., approval rates by demographic).
- **Fairness metrics**: Equalized odds, demographic parity, calibration by group.
- **Mitigation**: Pre-processing (rebalance data), in-processing (fairness constraints), post-processing (threshold adjustment).
- **Documentation**: Record fairness testing results and any mitigations in model cards.

Use tools like AI Fairness 360, Fairlearn, or custom analysis. Integrate into validation pipeline.

## Model Lineage Tracking

Track end-to-end lineage for audit and debugging:

- **Data lineage**: Which datasets and features fed into training.
- **Code lineage**: Git commit, branch, and pipeline run that produced the model.
- **Artifact lineage**: Model version, config, and dependencies.
- **Deployment lineage**: Which model version is deployed where and when.

Implement via MLflow, custom metadata stores, or data catalogs. Support querying by model, data, or time range.
