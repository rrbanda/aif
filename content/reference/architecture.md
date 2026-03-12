# Red Hat AI Factory Architecture

The Red Hat AI Factory architecture provides a production-grade foundation for building, deploying, and scaling enterprise AI. Red Hat technology forms the core platform, with a curated partner ecosystem providing hardware acceleration, networking, and specialized AI software.

## Architecture Overview

The AI Factory follows a five-layer reference architecture — from hardware infrastructure through intelligent applications.

| Layer | Components | Red Hat Technology | Partner Integrations |
|-------|-----------|-------------------|---------------------|
| **Infrastructure & Hardware** | Server platforms, GPU accelerators, networking | Red Hat Enterprise Linux | NVIDIA GPUs, Intel Gaudi, AMD Instinct, Dell/HPE/Lenovo servers |
| **Platform Availability** | Container orchestration, virtualization, MLOps, networking | Red Hat OpenShift | Partner-validated hardware configurations |
| **Develop & Deploy** | Model lifecycle, fine-tuning, inference, scheduling | Red Hat AI Enterprise | Partner AI software suites (NVIDIA AI Enterprise, Intel OpenVINO, AMD ROCm) |
| **Models & Quickstarts** | Optimized validated open models | Granite models, Red Hat AI quickstarts | Partner model libraries and blueprints |
| **Intelligent Applications** | APIs serving business outcomes | Predictive ML, Generative AI, Agentic AI, Physical AI | — |

For detailed technology mapping across all layers, see the [AI Factory Architecture Layers](ai-factory-architecture-layers.md) reference.

## Red Hat AI Enterprise

Integrated AI platform for deploying and running efficient and cost-effective AI models, agents, and applications in the hybrid cloud:

- **Unified AI lifecycle** — Manages the end-to-end process (develop, tune, infer) for predictive, generative, and agentic AI on a single, centralized platform
- **Intelligent scale & performance** — Optimizes AI inference at scale ensuring efficient GPU utilization and intelligent resource allocation
- **Enterprise governance & trust** — Comprehensive, layered security and safety across the entire AI lifecycle
- **Hybrid cloud agility** — Flexible deployment across the entire hybrid cloud, diverse hardware, and the edge

## Partner Ecosystem Integration

The AI Factory is designed to work with the customer's chosen hardware and software partners. Red Hat validates and certifies integrations across the ecosystem:

- **GPU/Accelerator vendors** — NVIDIA (Blackwell, H100), Intel (Gaudi 3), AMD (Instinct MI300X) — all supported through certified operators and drivers
- **Server OEMs** — Dell PowerEdge, HPE ProLiant, Lenovo ThinkSystem, Cisco UCS, Supermicro — validated server configurations for AI workloads
- **AI software suites** — Partner-provided inference runtimes, model frameworks, and optimization tools integrate with the Red Hat AI Enterprise platform
- **Networking** — High-bandwidth networking from partner ecosystems for distributed training and inference

The methodology and governance framework remain constant regardless of which partners are deployed. The seven-stage AI Factory program works the same whether the infrastructure runs on NVIDIA Blackwell, Intel Gaudi, or a mixed-vendor environment.

## Platform Components

**Red Hat AI Enterprise on OpenShift.** The platform installs on the customer's OpenShift cluster, providing workbenches (Jupyter, VS Code) for development, AI Hub for model catalog and deployment, Gen AI Studio for prompt experimentation with MCP tool integration, and pipeline orchestration for training and inference. All components run on-premises; no data leaves the environment.

**Hardware acceleration.** GPU/accelerator vendor operators enable hardware scheduling. Accelerator nodes run certified drivers, device plugins, and container runtime extensions. High-bandwidth networking configurations support distributed training. The platform abstracts hardware specifics so workloads can target different accelerator types.

**Model lifecycle flow.** Data pipelines ingest from source systems into the platform. Data scientists develop and train models in workbenches. Fine-tuning pipelines automate continued pre-training using InstructLab or partner frameworks. Models are registered, versioned, and promoted through governance gates. Approved models deploy to inference endpoints — Model-as-a-Service — with rate limiting, quotas, and SLA policies.

**Inference serving.** Production inference runs on GPU or CPU nodes via the Red Hat AI Inference Server (vLLM), partner inference runtimes, or optimized serving engines. llm-d provides Kubernetes-native distributed inference routing for multi-model serving. API gateways handle authentication, rate limiting, and request routing.

**Security boundaries.** Data remains in designated zones; no egress to public cloud for training or inference. Network segmentation isolates development, staging, and production. Encryption at rest and in transit. Audit logging for model promotions, data access, and inference requests.

<!-- audience: internal -->

## Internal: Architecture Decision Guidance

**GPU/Accelerator Selection by Workload:**
- **Real-time scoring (fraud, credit risk)**: Inference-optimized accelerators — MIG slices or smaller GPUs for latency-sensitive workloads
- **LLM fine-tuning**: Full-memory accelerators — need maximum GPU memory for SFT/OSFT
- **Distributed training**: Multi-node GPU clusters with RDMA networking — high-bandwidth interconnect required
- **Multi-model inference**: llm-d on GPU pool — route by cost/latency/SLA across multiple models

**Partner-Specific Guidance:**
- **If NVIDIA**: GPU Operator + Network Operator for driver management. NIM for optimized inference. NeMo for advanced fine-tuning. TensorRT-LLM for maximum throughput.
- **If Intel**: Intel Device Plugins Operator for Gaudi. OpenVINO for inference optimization. Intel Extension for PyTorch for training performance.
- **If AMD**: AMD GPU Operator for ROCm. vLLM has native ROCm support. Community-driven optimization.
- **If mixed vendor**: Use llm-d for routing across heterogeneous hardware. OpenShift scheduling with node selectors for workload placement.

**Sizing Rules of Thumb:**
- 1 GPU node per 2-3 concurrent inference models (depends on model size)
- 2 GPU nodes minimum for fine-tuning (distributed data parallel)
- Network: 25Gbps minimum between GPU nodes, 100Gbps for distributed training
- Storage: 10TB minimum for model artifacts, training data, and checkpoints

**Common Architecture Mistakes:**
- Undersizing network bandwidth between GPU nodes (causes training bottleneck)
- Running dev and prod inference on the same GPU pool without isolation
- Not planning storage for model checkpoints (fine-tuning generates many GB per run)
- Skipping llm-d and routing all traffic to a single model server

**Competitive Architecture Comparison:**
- AWS: SageMaker endpoints are per-model, no native multi-model routing. EKS + GPU is manual. Vendor lock-in to AWS networking.
- Azure: AKS with GPU integration is similar but tied to Azure networking and regions. No on-prem option.
- Databricks: Strong MLflow integration but inference serving is basic. No on-prem data sovereignty.
- Google Vertex AI: Strong managed platform but cloud-only. No hybrid deployment option.

<!-- /audience -->
