# Banking Compliance: SR 11-7, Explainability, Fair Lending

## SR 11-7 Model Risk Management

Federal Reserve SR 11-7 / OCC 2011-12 establishes model risk management (MRM) expectations for banks. Key elements:

- **Development**: Rigorous development process, sound theoretical basis, appropriate data quality, and documentation.
- **Validation**: Independent validation before use. Validators assess conceptual soundness, ongoing monitoring, and outcomes analysis.
- **Governance**: Board and senior management oversight; policies and procedures; roles and responsibilities.
- **Ongoing monitoring**: Track model performance over time; trigger re-validation when performance degrades or conditions change.

For AI/ML models, SR 11-7 applies with added emphasis on:
- Explainability and interpretability where decisions affect customers or capital
- Robustness testing (adversarial, edge cases)
- Bias and fairness assessment

## Model Explainability Requirements

Regulators expect banks to understand and explain model behavior:

- **Interpretable models**: Prefer simpler, interpretable models (e.g., linear, rule-based) when they achieve acceptable performance.
- **Post-hoc explanations**: For black-box models (e.g., deep learning, complex ensembles), use SHAP, LIME, or similar to explain individual predictions.
- **Global interpretability**: Document overall model logic, key drivers, and limitations.
- **Documentation**: Maintain model cards and explanation documentation for auditors and regulators.

## Audit Trail Needs

Banks require comprehensive audit trails for models:

- **Lineage**: Data sources → feature engineering → training → deployment. Immutable, timestamped records.
- **Versioning**: Model versions, configs, and code under version control.
- **Access logs**: Who accessed data, who ran training, who approved deployment.
- **Inference logs**: For high-stakes decisions, log inputs, model version, and outputs for audit and dispute resolution.

## Fair Lending (ECOA/HMDA)

Equal Credit Opportunity Act (ECOA) and Home Mortgage Disclosure Act (HMDA) govern fair lending:

- **Disparate impact**: Models must not produce unjustified disparities across protected groups (race, sex, age, etc.). Use disparate impact analysis.
- **Bias testing**: Test for proxy discrimination and ensure protected attributes (or strong proxies) are not improperly used.
- **Documentation**: Document fairness testing, mitigation steps, and ongoing monitoring.
- **HMDA reporting**: Mortgage models may affect HMDA-reported outcomes; ensure compliance with reporting and fair lending requirements.
