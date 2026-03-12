# AI Factory: Five-Layer Architecture

The AI Factory architecture consists of five interdependent layers. Each layer has distinct responsibilities, and the stack only functions when all five are operational and integrated. Red Hat technology provides the core platform at every layer, with partner integrations providing hardware acceleration and specialized capabilities.

## Layer 1: Compute (GPU/HPC)

Raw processing power for training and inference. Unlike traditional data centers built for general-purpose computing, AI Factory compute infrastructure is purpose-built for sustained GPU throughput, parallel processing, and low-latency inference.

**Red Hat Technology:**
- **OpenShift** — Kubernetes orchestration for GPU workloads across on-prem, cloud, and edge
- **Red Hat Enterprise Linux** — Certified OS foundation with security hardening and compliance capabilities

**Partner Integrations (examples):**
- **NVIDIA**: GPU Operator for automated driver management, Network Operator for RDMA and GPUDirect Storage, AI Enterprise for optimized containers
- **Intel**: Device Plugins Operator for Gaudi accelerators, oneAPI for unified programming
- **AMD**: GPU Operator for ROCm, open-source driver stack
- **OEM servers**: Dell PowerEdge, HPE ProLiant, Lenovo ThinkSystem, Cisco UCS — validated configurations for AI workloads

**Key Metrics:** GPU utilization rate, TFLOPS per dollar, job queue wait time, power efficiency (PUE)

## Layer 2: Data Pipelines

Gathering, cleaning, integrating, and securing data to ensure it is sustainable and scalable for AI workloads. The quality of this layer determines the quality of everything above it.

**Red Hat Technology:**
- **OpenShift Data Foundation (Ceph)** — Scalable storage for datasets, model artifacts, and checkpoints
- **Apache Kafka on OpenShift** — Real-time data streaming and event-driven pipelines
- **Apache Spark on OpenShift** — Distributed data processing for feature engineering
- **Data governance tools** — Lineage tracking, quality controls, PII detection, access auditing

**Partner Integrations (examples):**
- **NVIDIA**: RAPIDS for GPU-accelerated data processing (cuDF, cuML), DALI for GPU-accelerated data loading
- **Intel**: oneAPI Data Analytics Library for optimized data processing on Intel hardware

**Key Metrics:** Data freshness, pipeline throughput, data quality score, lineage coverage percentage

## Layer 3: Model Development & Experimentation

Hypothesis validation, model training, fine-tuning, and evaluation. This layer is where data scientists and ML engineers iterate to create models that solve business problems.

**Red Hat Technology:**
- **OpenShift AI Workbenches** — Jupyter, VS Code Server environments with GPU access
- **OpenShift AI AI Hub** — Centralized model catalog with approved foundation models
- **InstructLab** — Open-source tool for synthetic data generation and model fine-tuning
- **Gen AI Studio** — Visual interface for prompt engineering and model comparison
- **Experiment tracking** — MLflow integration for hyperparameter logging, metric comparison, artifact versioning

**Partner Integrations (examples):**
- **NVIDIA**: NeMo for training and fine-tuning large language models, NIM for optimized inference microservices
- **Intel**: OpenVINO for inference optimization, Intel Extension for PyTorch for training acceleration
- **AMD**: ROCm-accelerated PyTorch for model training

**Key Metrics:** Experiment velocity, model accuracy/performance, training time, GPU hours per experiment

## Layer 4: MLOps / Orchestration

Model operationalization at factory scale. This layer transforms artisanal model-building into a repeatable factory process with CI/CD for ML, governance gates, and automated promotion workflows.

**Red Hat Technology:**
- **OpenShift AI Model Registry** — Versioning, lineage, approval workflows, artifact management
- **OpenShift Pipelines (Tekton)** — CI/CD for model training, evaluation, and deployment
- **OpenShift GitOps (Argo CD)** — Declarative model deployment, drift detection, environment promotion
- **TrustyAI** — Bias detection, fairness metrics, explainability for governance gates
- **Kubeflow Pipelines** — ML workflow orchestration for complex training pipelines
- **Governance gates** — Automated checks (bias, security, performance) before production promotion

**Key Metrics:** Deployment velocity (time from commit to production), rollback frequency, gate pass rate, model count in production

## Layer 5: Observability & Activation

Monitoring, serving predictions, and ensuring models continue to perform in production. This layer closes the feedback loop — production performance data feeds back into the experimentation layer.

**Red Hat Technology:**
- **Red Hat AI Inference Server (vLLM)** — High-throughput LLM inference serving with continuous batching and PagedAttention
- **llm-d** — Multi-model routing, load balancing, and smart scheduling for inference
- **OpenShift Service Mesh (Istio)** — Traffic management, canary deployments, A/B testing
- **TrustyAI Observability** — Model drift detection, fairness monitoring, prediction logging
- **OpenShift Monitoring (Prometheus/Grafana)** — Latency percentiles, throughput, error rates, GPU utilization dashboards
- **API gateways** — Authentication, rate limiting, request routing, usage tracking

**Partner Integrations (examples):**
- **NVIDIA**: Triton Inference Server for multi-framework serving, TensorRT-LLM for optimized throughput
- **Intel**: OpenVINO Model Server for Intel-optimized inference

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

## Internal: Architecture Layer Guidance

**Layer 1 (Compute/HPC) — Sizing conversations:**
- Start with 3 GPU nodes minimum (viable factory). Recommend 8-12 for production + development separation.
- Network: 25Gbps minimum between GPU nodes. 100Gbps for distributed training.
- Storage: 10TB minimum for model artifacts. 50TB+ for enterprise data pipelines.

**Layer 3 (Model Development) — Tooling decisions by partner:**
- **InstructLab vs NeMo**: InstructLab is Red Hat-led, simpler, community-driven. NeMo is NVIDIA-led, more advanced, requires deeper expertise. Recommend InstructLab as default, NeMo when customer has NVIDIA-specific investment.
- **vLLM vs TensorRT-LLM vs OpenVINO**: vLLM is open-source and hardware-flexible (default). TensorRT-LLM is NVIDIA-optimized for maximum throughput on NVIDIA GPUs. OpenVINO is Intel-optimized. Recommend starting with vLLM for flexibility.
- **ROCm**: AMD's open-source GPU computing platform. vLLM has native ROCm support. Growing ecosystem but smaller community than NVIDIA CUDA.

**Layer 4 (MLOps) — Maturity assessment:**
- Most customers are at Google MLOps Level 0 or early Level 1. Set expectations accordingly.
- Full MLOps automation (Level 2) typically takes 6-12 months from factory deployment.
- Focus on model registry and governance gates first; CI/CD for models second.

**Competitive comparison by layer:**
| Layer | Red Hat AI Factory | AWS SageMaker | Azure ML | Databricks |
|-------|-------------------|---------------|----------|------------|
| Compute | On-prem (any vendor) | EC2 GPU instances | Azure N-series | Cloud GPU clusters |
| Platform | OpenShift AI | SageMaker Studio | Azure ML Studio | Databricks Workspace |
| Model Serving | vLLM + llm-d | SageMaker Endpoints | Azure ML Endpoints | Mosaic AI Serving |
| Governance | Built-in gates | Manual | Manual | Unity Catalog |
| Data Residency | On-prem guaranteed | Cloud regions | Cloud regions | Cloud regions |
| Hardware Choice | Multi-vendor | AWS silicon only | Azure-only | Cloud-only |

<!-- /audience -->
