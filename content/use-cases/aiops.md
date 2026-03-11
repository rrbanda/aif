# AIOps — AI-Driven Operations

AIOps plays a **dual role** in the AI Factory: it is both a product the factory produces and a capability that keeps the factory itself running efficiently.

**As a product**, AIOps delivers AI models for IT operations. Anomaly detection on platform metrics — latency spikes, error rate deviations, throughput drops — surfaces incidents before they impact users. Predictive capacity planning forecasts GPU, storage, and network utilization to avoid surprise shortages. Automated incident classification routes alerts to the right team and suggests runbook steps. Root cause analysis correlates symptoms across systems to identify the underlying failure. These models serve the broader organization's infrastructure, not just the AI platform.

**As a capability for the factory**, AIOps monitors the AI Factory itself. Model drift detection identifies when production model performance degrades due to data distribution shift. Pipeline health prediction flags failing data ingestion or training jobs before they cascade. GPU utilization optimization recommends right-sizing and scheduling to reduce idle capacity. Automated retraining triggers fire when drift thresholds are exceeded. This "factory observing factory" loop reduces operational toil and accelerates incident response.

The same platform — OpenShift AI, GPU infrastructure, MLOps pipelines — supports both roles. AIOps models for infrastructure monitoring consume metrics from Prometheus, OpenTelemetry, and application logs. AIOps models for the factory consume model registry metadata, pipeline run history, and inference latency metrics. Shared tooling and patterns reduce duplication.
