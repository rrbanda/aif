# CI/CD for ML Models

## GitOps for ML

GitOps applies declarative, Git-centric workflows to ML:

- **Source of truth**: Model code, training configs, feature definitions, and deployment manifests stored in Git.
- **Version control**: Every change tracked; rollback by reverting commits.
- **Audit trail**: Who changed what, when, and why—essential for regulated environments.
- **Automation**: Git push triggers pipelines; approved changes flow to staging and production.

Best practices: Use separate repos or branches for model code vs. deployment configs when access control differs. Tag releases for production promotions.

## Tekton Pipelines for Model Training

Tekton provides Kubernetes-native pipelines for ML:

- **Tasks**: Reusable steps (data prep, train, validate, deploy). Each task runs in a pod.
- **Pipelines**: Chain tasks into DAGs. Support parallel execution and conditional branches.
- **Triggers**: Webhooks or Git events start pipeline runs.
- **Integration**: Works with OpenShift AI, MLflow, and container registries.

Common pipeline: (1) Fetch data, (2) Preprocess, (3) Train model, (4) Evaluate, (5) If metrics pass, register in Model Registry and deploy. Use PipelineRuns for traceability.

## Argo Workflows

Argo Workflows orchestrates complex, DAG-based workflows:

- **DAGs**: Define dependencies between steps; parallel execution where possible.
- **Resource management**: Request GPUs, memory; use node selectors for GPU nodes.
- **Retries and timeouts**: Handle transient failures; avoid runaway jobs.
- **Integration**: Can call Tekton, Kubeflow, or custom containers.

Use for multi-model training, hyperparameter sweeps, or workflows spanning multiple clusters.

## Automated Retraining Triggers

Trigger retraining based on:

- **Schedule**: Cron-based (e.g., weekly) for models that need periodic refresh.
- **Data drift**: When input distribution shifts beyond threshold, trigger retraining pipeline.
- **Performance degradation**: When accuracy or business metrics drop, trigger evaluation and possible retrain.
- **New data volume**: When sufficient new labeled data accumulates.

Implement triggers as pipeline events or external schedulers (e.g., CronJob) that invoke the training pipeline. Validate new models before promoting.
