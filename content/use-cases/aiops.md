# AIOps — AI-Driven Operations

AIOps plays a **dual role** in the AI Factory: it is both a product the factory produces and a capability that keeps the factory itself running efficiently.

**As a product**, AIOps delivers AI models for IT operations. Anomaly detection on platform metrics — latency spikes, error rate deviations, throughput drops — surfaces incidents before they impact users. Predictive capacity planning forecasts GPU, storage, and network utilization to avoid surprise shortages. Automated incident classification routes alerts to the right team and suggests runbook steps. Root cause analysis correlates symptoms across systems to identify the underlying failure. These models serve the broader organization's infrastructure, not just the AI platform.

**As a capability for the factory**, AIOps monitors the AI Factory itself. Model drift detection identifies when production model performance degrades due to data distribution shift. Pipeline health prediction flags failing data ingestion or training jobs before they cascade. GPU utilization optimization recommends right-sizing and scheduling to reduce idle capacity. Automated retraining triggers fire when drift thresholds are exceeded. This "factory observing factory" loop reduces operational toil and accelerates incident response.

The same platform — OpenShift AI, GPU infrastructure, MLOps pipelines — supports both roles. AIOps models for infrastructure monitoring consume metrics from Prometheus, OpenTelemetry, and application logs. AIOps models for the factory consume model registry metadata, pipeline run history, and inference latency metrics. Shared tooling and patterns reduce duplication.

<!-- audience: customer -->

## Expected Business Outcomes

| Metric | Typical Improvement | How It Is Measured |
|--------|--------------------|--------------------|
| Mean time to detect | 50-70% reduction | Time from anomaly onset to alert, compared to static threshold-based monitoring |
| False alarm rate | 40-60% reduction | Percentage of alerts that are actionable vs. noise (alert fatigue reduction) |
| Incident classification accuracy | 85-95% | Percentage of alerts correctly routed to the right team with correct severity |
| Capacity forecast accuracy | Within 10% for 30-day horizon | Predicted vs. actual resource utilization (GPU, storage, network) |

## Is This Right for Your Organization?

This use case is a strong fit if your organization:
- Operates complex infrastructure (on-premises, hybrid, or multi-cluster) with significant monitoring data volume
- Experiences alert fatigue from static thresholds that generate excessive false positives
- Spends significant engineering time on manual incident triage, classification, and root cause analysis
- Wants to apply AI capabilities to the AI Factory platform itself (self-monitoring)
- Has Prometheus, OpenTelemetry, or similar observability data sources already generating metrics and logs

## Dual Role in the AI Factory

AIOps is unique among use cases because it serves two functions:

1. **As a product**: AI models that monitor your broader IT infrastructure — anomaly detection, capacity planning, incident classification for the entire organization
2. **As a factory capability**: Self-monitoring of the AI Factory itself — model drift detection, pipeline health prediction, GPU utilization optimization, automated retraining triggers

This dual role means AIOps can start as a platform team internal use case (monitoring the factory) and expand to serve the broader IT operations organization.

## Your Data Requirements

- **Infrastructure metrics**: Prometheus/OpenTelemetry time-series data — CPU, memory, GPU utilization, network throughput, disk I/O
- **Application logs**: Structured logs from applications running on the platform
- **Incident records**: Historical incident tickets with timestamps, severity, root cause, and resolution (for classification training)
- **Change records**: Deployment and configuration change history (for correlation with incidents)

<!-- /audience -->

<!-- audience: internal -->

## Internal: Deal Positioning

**Why AI Factory wins here:** AIOps is the "eat your own cooking" use case — the AI Factory monitors itself. This dual role makes it a low-risk, high-visibility pilot that demonstrates the platform's capabilities to IT operations teams, who are often skeptical of AI claims.

**Competitive differentiation:**
- Datadog/Splunk/Dynatrace: Observability platforms with AI features, but models are vendor-trained, not customizable. No proprietary anomaly detection on institutional data.
- ServiceNow AIOps: Tied to ServiceNow ITSM, limited model customization.
- Red Hat AI Factory: Train custom AIOps models on the organization's own infrastructure data. OpenShift observability (Prometheus, Grafana) is native. Models run on-prem alongside the workloads they monitor.

**Positioning strategy:**
- AIOps is a "Stage 6" use case but can start earlier as a platform team internal use case
- Low risk: Only affects operations team, not customer-facing
- Quick win: Anomaly detection on existing Prometheus metrics is straightforward
- Internal champion builder: Platform engineering team becomes the first AI Factory success story

**Typical ROI metrics to present:**
- Mean time to detect anomalies: 50-70% reduction
- False alarm rate: 40-60% reduction (vs. static thresholds)
- Incident classification accuracy: 85-95%
- Capacity forecast accuracy: Within 10% for 30-day horizon

<!-- /audience -->
