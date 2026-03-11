# Fraud Detection

On-premises fraud detection represents one of the highest-value and most constrained AI use cases in financial services. Transaction data — card present/not present, velocity patterns, merchant categories, geolocation — is both highly sensitive and subject to strict regulatory controls. PCI DSS requirements prohibit transmission of cardholder data outside designated environments; GDPR and similar frameworks impose additional constraints on PII. For these reasons, fraud models must be trained and served entirely within the organization's data perimeter.

**Real-time inference** is non-negotiable. Authorization decisions typically require sub-200ms end-to-end latency; the model must score each transaction before the authorization response is returned. This demands optimized inference pipelines — model quantization, batching strategies, and GPU or high-performance CPU serving — deployed close to the transaction processing systems. Batch scoring for retrospective analysis is a separate workload with different latency tolerances.

**Proprietary model training** on historical fraud labels creates competitive advantage. Generic third-party models lack the institution's specific fraud patterns, customer segments, and product mix. Fine-tuning or training from scratch on internal data yields models that adapt to evolving attack vectors and reduce dependence on external vendors. The training pipeline must handle class imbalance (fraud is rare), temporal leakage prevention, and regular retraining as fraud patterns shift.

**False positive reduction** directly impacts operational cost and customer experience. Every false positive triggers manual review, customer outreach, or card block — expensive at scale. Metrics matter: precision-recall trade-offs, analyst time saved per investigation, and detection accuracy at fixed false positive rates. A/B testing and champion-challenger deployments enable continuous improvement without disrupting production.

<!-- audience: internal -->

## Internal: Deal Positioning

**Why AI Factory wins here:** Fraud detection is the strongest entry use case for financial services. Transaction data is PCI DSS-controlled — customers cannot send it to cloud APIs. On-premises model training and real-time inference within the data perimeter is non-negotiable. This is the AI Factory's core value proposition.

**Competitive differentiation:**
- AWS Fraud Detector: Managed service, but data must go to AWS. PCI DSS compliance in cloud adds audit complexity. No proprietary model training — limited to AWS's model.
- Azure Anomaly Detector: Similar cloud constraint. Azure ML can train custom models but requires Azure data residency.
- Databricks: Good for model training, weak on real-time inference serving. No native sub-200ms serving pipeline.
- Red Hat AI Factory: Train on-prem, serve on-prem, sub-200ms latency, full governance pipeline, NIM for optimized inference.

**Sizing guidance:**
- Inference: 1-2 GPU nodes for real-time scoring (latency-optimized, MIG slices sufficient)
- Training: 2 GPU nodes minimum for periodic retraining on historical data
- Storage: 5-10TB for transaction feature store and model artifacts

**Typical ROI metrics to present:**
- False positive reduction: 40-60% (each false positive costs $20-50 in analyst time)
- Fraud detection improvement: 20-35% catch rate increase
- Annual fraud loss prevention: $5M-$15M for Tier-1 banks
- Analyst productivity: 2-3 hours saved per investigation

**Key stakeholders:** Chief Risk Officer (sponsor), Head of Fraud Operations (process owner), ML Engineering Lead (technical lead), Model Risk Manager (governance approval)

<!-- /audience -->
