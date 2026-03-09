# Regulatory Frameworks for Banking AI

## PCI DSS and AI Systems

Payment Card Industry Data Security Standard (PCI DSS) applies when AI systems process, store, or transmit cardholder data (CHD) or sensitive authentication data (SAD). Key implications:

- **Scope**: Any system component that processes CHD is in scope. AI models trained on or inferring from payment data require PCI assessment.
- **Requirements**: Encryption at rest (AES-256) and in transit (TLS 1.2+), access controls, logging and monitoring, regular vulnerability scanning.
- **Tokenization**: Prefer tokenization so AI systems never see raw PAN. Tokenization reduces PCI scope significantly.
- **Segmentation**: Isolate AI workloads from cardholder data environments where possible; document segmentation controls.

## SOX Compliance for Model-Generated Reports

Sarbanes-Oxley (SOX) governs internal controls over financial reporting. When AI models produce outputs used in financial reports or control processes:

- **Auditability**: Model outputs must be traceable. Document data inputs, model version, and transformation logic.
- **Validation**: Models affecting financial reporting require validation by qualified personnel and periodic re-validation.
- **Change management**: Model updates must follow change control; unauthorized changes can compromise SOX compliance.
- **Segregation of duties**: Development, validation, and deployment roles should be separated.

## GDPR and Privacy Implications

For EU customers or data subjects:

- **Lawful basis**: Processing must have a lawful basis (consent, contract, legitimate interest, etc.). Document it.
- **Purpose limitation**: Use data only for stated purposes. Retraining for new use cases may require new consent.
- **Data minimization**: Collect and retain only what is necessary. Avoid training on full PII when anonymized or synthetic data suffices.
- **Right to explanation**: Article 22 and Recital 71 suggest explainability for automated decisions with legal or similarly significant effects. Provide interpretable models or post-hoc explanations.
- **Data subject rights**: Support access, rectification, erasure, portability. Design pipelines to enable these.

## Basel III/IV Risk Model Requirements

Basel frameworks govern capital adequacy and risk management. AI/ML models used for credit risk, market risk, or operational risk:

- **Validation**: Models require independent validation before use and periodic re-validation.
- **Documentation**: Model development, assumptions, limitations, and performance must be documented.
- **Monitoring**: Ongoing monitoring for model drift, performance degradation, and changing conditions.
- **Governance**: Clear ownership, roles, and escalation. Board-level awareness for material models.
