# AI Factory: Five-Layer Architecture

The AI Factory architecture consists of five interdependent layers. Each layer has distinct responsibilities, and the stack only functions when all five are operational and integrated. This reference maps the industry-standard five-layer model to Red Hat and NVIDIA technologies.

## Layer 1: Compute (GPU/HPC)

Raw processing power for training and inference. Unlike traditional data centers built for general-purpose computing, AI Factory compute infrastructure is purpose-built for sustained GPU throughput, parallel processing, and low-latency inference.

**Red Hat + NVIDIA Stack:**
- **OpenShift** — Kubernetes orchestration for GPU workloads across on-prem, cloud, and edge
- **NVIDIA GPU Operator** — Automated driver management, device plugins, container runtime extensions
- **NVIDIA Network Operator** — RDMA, GPUDirect Storage, high-bandwidth networking for distributed training
- **NVIDIA AI Enterprise** — Optimized containers, validated drivers, enterprise support
- **GPU Hardware** — A100 (training), H100 (training + inference), L40S (inference + fine-tuning), with MIG for multi-tenant isolation
- **Red Hat Enterprise Linux** — Certified OS with DOCA microservices for zero-trust architecture

**Key Metrics:** GPU utilization rate, TFLOPS per dollar, job queue wait time, power efficiency (PUE)

## Layer 2: Data Pipelines

Gathering, cleaning, integrating, and securing data to ensure it is sustainable and scalable for AI workloads. The quality of this layer determines the quality of everything above it.

**Red Hat + NVIDIA Stack:**
- **OpenShift Data Foundation (Ceph)** — Scalable storage for datasets, model artifacts, and checkpoints
- **Apache Kafka on OpenShift** — Real-time data streaming and event-driven pipelines
- **Apache Spark on OpenShift** — Distributed data processing for feature engineering
- **NVIDIA RAPIDS** — GPU-accelerated data processing (cuDF, cuML)
- **NVIDIA DALI** — GPU-accelerated data loading and augmentation for training pipelines
- **Data governance tools** — Lineage tracking, quality controls, PII detection, access auditing

**Key Metrics:** Data freshness, pipeline throughput, data quality score, lineage coverage percentage

## Layer 3: Model Development & Experimentation

Hypothesis validation, model training, fine-tuning, and evaluation. This layer is where data scientists and ML engineers iterate to create models that solve business problems.

**Red Hat + NVIDIA Stack:**
- **OpenShift AI Workbenches** — Jupyter, VS Code Server environments with GPU access
- **OpenShift AI AI Hub** — Centralized model catalog with approved foundation models
- **InstructLab** — Open-source tool for synthetic data generation and model fine-tuning
- **NVIDIA NeMo** — Framework for training and fine-tuning large language models
- **NVIDIA NIM** — Optimized inference microservices for foundation models
- **Gen AI Studio** — Visual interface for prompt engineering and model comparison
- **Experiment tracking** — MLflow integration for hyperparameter logging, metric comparison, artifact versioning

**Key Metrics:** Experiment velocity, model accuracy/performance, training time, GPU hours per experiment

## Layer 4: MLOps / Orchestration

Model operationalization at factory scale. This layer transforms artisanal model-building into a repeatable factory process with CI/CD for ML, governance gates, and automated promotion workflows.

**Red Hat + NVIDIA Stack:**
- **OpenShift AI Model Registry** — Versioning, lineage, approval workflows, artifact management
- **OpenShift Pipelines (Tekton)** — CI/CD for model training, evaluation, and deployment
- **OpenShift GitOps (Argo CD)** — Declarative model deployment, drift detection, environment promotion
- **TrustyAI** — Bias detection, fairness metrics, explainability for governance gates
- **Kubeflow Pipelines** — ML workflow orchestration for complex training pipelines
- **Governance gates** — Automated checks (bias, security, performance) before production promotion

**Key Metrics:** Deployment velocity (time from commit to production), rollback frequency, gate pass rate, model count in production

## Layer 5: Observability & Activation

Monitoring, serving predictions, and ensuring models continue to perform in production. This layer closes the feedback loop — production performance data feeds back into the experimentation layer.

**Red Hat + NVIDIA Stack:**
- **vLLM** — High-throughput LLM inference serving with continuous batching and PagedAttention
- **NVIDIA Triton Inference Server** — Multi-framework model serving with dynamic batching
- **llm-d** — Multi-model routing, load balancing, and smart scheduling for inference
- **OpenShift Service Mesh (Istio)** — Traffic management, canary deployments, A/B testing
- **TrustyAI Observability** — Model drift detection, fairness monitoring, prediction logging
- **OpenShift Monitoring (Prometheus/Grafana)** — Latency percentiles, throughput, error rates, GPU utilization dashboards
- **API gateways** — Authentication, rate limiting, request routing, usage tracking

**Key Metrics:** Inference latency (P50/P95/P99), token throughput, model drift score, fairness metric stability, uptime SLA

## How the Layers Connect

The five layers form a continuous loop, not a static stack:

1. **Data** flows into **Model Development** as training datasets
2. **Model Development** produces artifacts registered in **MLOps**
3. **MLOps** deploys approved models through **Observability** for serving
4. **Observability** detects drift and feeds signals back to **Data** and **Model Development**
5. **Compute** underpins all four layers, with capacity allocated dynamically based on workload priority

This feedback loop is what makes it a factory — not a one-time deployment, but a continuous system that improves over time.

## Mapping to AI Factory Program Phases

- **Phase 0 (Discovery)**: Assess readiness across all 5 layers
- **Phase 1 (Data Strategy)**: Establish Layer 2 (Data Pipelines)
- **Phase 2 (Platform Foundation)**: Deploy Layers 1 (Compute) and 3 (Model Development)
- **Phase 3 (Pilot)**: Validate Layers 3 and 4 (Development + MLOps) with real use cases
- **Phase 4 (Operationalize)**: Establish Layer 4 (MLOps) and Layer 5 (Observability)
- **Phase 5 (Scale)**: Expand all 5 layers to support additional teams and use cases
- **Phase 6 (Operate)**: Continuously optimize the full stack

<!-- audience: internal -->
Use this five-layer model when discussing architecture with Account SAs and AI Specialist SAs. Each layer maps to specific Red Hat and NVIDIA products — this is the technical foundation for the "Red Hat AI Factory with NVIDIA" joint offering. Reference the NVIDIA AI Factory definition (purpose-built data centers for manufacturing intelligence) and the HBS definition (data pipeline, algorithms, experimentation, infrastructure) to show how our stack addresses both.
<!-- /audience -->
