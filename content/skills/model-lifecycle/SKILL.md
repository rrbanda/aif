---
name: model-lifecycle
description: Model lifecycle management from experiment to retirement. Use when discussing model stages, transitions, deployment patterns, monitoring, and retraining triggers.
---

# Model Lifecycle

Apply model lifecycle expertise when agents handle model tracking, deployment decisions, monitoring, or retirement planning.

## When to Apply

Use this skill when the user asks about:
- Model lifecycle stages and what happens at each stage
- When and how to transition models between stages
- Model deployment patterns (blue/green, canary, A/B)
- Model monitoring, drift detection, and retraining triggers
- Model versioning and registry management
- Model retirement criteria and procedures

## Lifecycle Stages

### 1. Experiment
- Data scientists develop and iterate on model approaches
- Multiple experiments tracked with hyperparameters and metrics
- No production expectations; fast iteration is the goal
- Tools: Jupyter notebooks, experiment tracking (MLflow/W&B), GPU dev clusters
- **Exit criteria**: Model meets baseline performance thresholds

### 2. Registered
- Model artifact saved to model registry with metadata
- Version assigned (semantic versioning: major.minor.patch)
- Training data lineage recorded
- Model card draft initiated
- **Exit criteria**: Model card drafted, data lineage documented

### 3. Validated
- Independent validation against held-out test sets
- Challenger/champion comparison with current production model
- Backtesting with historical data for time-series models
- Stress testing with edge cases and adversarial inputs
- **Exit criteria**: Passes all governance gates (bias, security, performance)

### 4. Deployed
- Model serving infrastructure provisioned (KServe, vLLM, TensorRT-LLM)
- Deployment pattern applied (canary recommended for first deployment)
- Traffic routing configured (shadow mode → canary → full)
- Rollback procedure tested and documented
- **Exit criteria**: Serving at target throughput with acceptable error rate

### 5. Monitored
- Production performance tracked (accuracy, latency, throughput)
- Data drift detection active (PSI, KS test, KL divergence)
- Concept drift monitoring via ground truth comparison
- Alert thresholds configured for SLA violations
- Regular review cadence established (weekly for Tier 1)
- **Triggers for action**: Drift score > 0.3, accuracy drop > 5%, latency p95 > SLA

### 6. Retired
- Model removed from production serving
- Historical performance data archived
- Replacement model (if any) fully serving traffic
- Model registry entry marked as retired with reason
- Regulatory: retain model artifacts and audit trail per retention policy

## Deployment Patterns

| Pattern | When to Use | Risk Level |
|---------|-------------|-----------|
| Shadow mode | First deployment; compare outputs without serving live | Lowest |
| Canary | Gradual rollout; route 5% → 25% → 100% of traffic | Low |
| Blue/Green | Zero-downtime swap; instant rollback capability | Medium |
| A/B Testing | Compare model variants with statistical significance | Medium |
| Direct swap | Only for Tier 3 models with extensive staging validation | Higher |

## Retraining Triggers

- Scheduled: periodic retraining cadence (monthly, quarterly)
- Drift-triggered: automated retraining when drift score exceeds threshold
- Performance-triggered: accuracy/precision drops below SLA
- Data-triggered: new data sources available, feature engineering improvements
- Event-triggered: regulatory change, business rule change

## Response Guidelines

- Always specify which lifecycle stage a model is in when discussing it
- Recommend canary deployment for any model's first production deployment
- For retraining, emphasize that the retrained model goes through full validation again
- Never skip the "monitored" stage — production without monitoring is not acceptable
