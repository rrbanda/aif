# Model Monitoring

## Drift Detection Strategies

Detect when production behavior diverges from expectations:

- **Data drift**: Input feature distributions change (e.g., new customer segments, seasonal shifts). Use statistical tests (KS, PSI) or ML-based drift detectors.
- **Concept drift**: Relationship between inputs and target changes. Monitor model performance over time; compare recent vs. historical accuracy.
- **Action drift**: Distribution of model outputs changes. May indicate upstream data issues or model degradation.

Implement: Compute drift metrics on a schedule (e.g., daily); alert when thresholds exceeded. Consider sliding windows for recent vs. baseline comparison.

## Performance Dashboards

Dashboards should surface:

- **Latency**: P50, P95, P99 inference latency. Track by model, endpoint, and time.
- **Throughput**: Requests per second; utilization of serving resources.
- **Error rates**: 4xx/5xx, timeouts, and model-specific errors.
- **Business metrics**: Accuracy, conversion, revenue—where measurable in production.

Use Prometheus/Grafana, OpenShift monitoring, or dedicated ML monitoring tools. Set baselines and track trends.

## Alerting on Model Degradation

Define alerting rules for:

- **Accuracy drop**: When A/B test or shadow mode shows new model underperforming.
- **Latency spike**: Sudden increase in inference time; may indicate resource contention or bugs.
- **Error rate increase**: More failures or timeouts than baseline.
- **Drift alerts**: Data or concept drift beyond threshold.

Escalation: Route alerts to on-call, model owners, or incident response. Include context (model version, time range, metric values) in alerts.

## Integration with OpenShift AI

- **Prometheus**: Scrape metrics from inference endpoints and custom exporters.
- **Grafana**: Dashboards for latency, throughput, and business metrics.
- **Alertmanager**: Route alerts to PagerDuty, Slack, or email.
- **Custom exporters**: Export model-specific metrics (e.g., prediction distribution, fairness metrics) for monitoring.
