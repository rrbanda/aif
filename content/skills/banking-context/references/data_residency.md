# Data Residency and Deployment Patterns for Banking

## On-Premises Requirements for Tier-1 Banks

Tier-1 (systemically important) banks often mandate on-premises deployment for core systems and sensitive data:

- **Regulatory expectation**: Regulators expect robust controls; on-prem can simplify audit and data sovereignty.
- **Data sensitivity**: Customer PII, transaction data, and proprietary models may be restricted to on-prem or sovereign cloud.
- **Vendor risk**: Reducing dependence on public cloud vendors is a common risk mitigation.
- **AI Factory fit**: OpenShift AI supports on-prem deployment; position this as an advantage for regulated banks.

## Data Classification

Banks typically use tiered classification:

- **Public**: Marketing materials, public filings. Can be processed anywhere.
- **Internal**: Internal reports, non-sensitive analytics. May be allowed in approved cloud regions.
- **Confidential**: Customer data, financial data. Often restricted to on-prem or sovereign cloud.
- **Restricted**: Highly sensitive (e.g., merger data, regulatory submissions). May require air-gapped or highest-security environments.

Classification drives where models train and infer. Always confirm classification before recommending cloud or hybrid patterns.

## Cross-Border Data Flow Restrictions

- **EU (GDPR)**: Personal data transfers outside the EU require adequacy decisions or appropriate safeguards (e.g., SCCs). Some banks prohibit transfers to certain jurisdictions.
- **Localization**: Some jurisdictions (e.g., Russia, China, India in certain sectors) require data to remain in-country.
- **AI implications**: Training on EU data in US clouds may require additional safeguards. Inference in-region may be required for latency and compliance.

## Air-Gapped Deployment Patterns

For highest-security or restricted environments:

- **Disconnected install**: OpenShift AI can be installed in air-gapped environments using disconnected registries and mirrored images.
- **No internet**: All dependencies (models, libraries, base images) must be pre-staged.
- **Updates**: Patches and updates delivered via secure transfer (e.g., portable media, approved network path).
- **Operational constraints**: Limited telemetry, manual update processes, and extended support cycles for disconnected deployments.
