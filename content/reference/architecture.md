# Technical Architecture

The AI Factory runs on **Red Hat AI Factory with NVIDIA** — a co-engineered, enterprise-grade AI platform that combines Red Hat OpenShift AI with NVIDIA's accelerated computing, networking, and AI Enterprise software. It deploys on existing OpenShift clusters, extending current investments with GPU acceleration, model lifecycle tooling, and multi-tenant workspaces for data science teams.

## Five-Layer Architecture

The AI Factory follows a five-layer architecture — from physical infrastructure through intelligent applications. Each layer builds on the one below, and the full stack is co-engineered and continuously validated by Red Hat and NVIDIA.

| Layer | What It Does | Key Technologies |
|-------|-------------|-----------------|
| **1. Infrastructure** | Power, cooling, networking, and server hardware purpose-built for AI workloads | Dell PowerEdge XE, Lenovo ThinkSystem, Cisco UCS, high-bandwidth networking |
| **2. Accelerated Compute** | GPU-powered processing for training and inference at scale | NVIDIA H100, Blackwell B200, RTX PRO 6000, GPU Operator, Network Operator |
| **3. AI Platform** | The control plane — model lifecycle, governance, pipelines, workspaces | Red Hat OpenShift AI, NVIDIA AI Enterprise, AI Hub, Model Registry, Gen AI Studio |
| **4. Foundation Models** | Pre-trained and fine-tuned models serving as the intelligence layer | IBM Granite (Apache 2.0), NVIDIA Nemotron, domain fine-tuned models via InstructLab/NeMo |
| **5. Intelligent Applications** | Production AI capabilities the business consumes | Predictions, Pattern Recognition, Process Automation, Agentic AI workflows |

For detailed technology mapping across all five layers, see the [AI Factory Architecture Layers](ai-factory-architecture-layers.md) reference.

## Co-Engineered, Not Assembled

This is not a generic integration. Red Hat and NVIDIA continuously co-engineer the stack with:

- **Day 0 integration** — New hardware and software releases are validated from day one through continuous co-engineering
- **Modular design** — Prescriptive foundation bringing Red Hat and NVIDIA technologies together as a unified, validated stack
- **Co-developed reference workflows** — Pre-defined blueprints and best practice AI workflow patterns for common use cases
- **Intelligent GPU orchestration** — On-demand access to GPU resources with scheduling, MIG profiles, and multi-tenant isolation
- **Enterprise security** — Advanced security and compliance built on Red Hat Enterprise Linux, with NVIDIA DOCA microservices for zero-trust architecture

## Platform Components

**OpenShift AI on OpenShift.** The OpenShift AI Operator installs on the customer's OpenShift cluster. It provides workbenches (Jupyter, VS Code) for development, AI Hub for model catalog and deployment, and pipeline orchestration for training and inference. All components run on-premises; no data leaves the environment. Integration with existing identity providers (LDAP, OIDC) and RBAC ensures access control aligns with enterprise policies.

**NVIDIA GPU stack.** The NVIDIA GPU Operator and Network Operator enable GPU scheduling. GPU nodes run drivers, device plugins, and container runtime extensions; workloads request GPUs via standard Kubernetes resource limits. Network Operator configures RDMA and high-bandwidth networking for distributed training. AI Enterprise provides optimized containers and support for training and inference workloads.

**Model lifecycle flow.** Data pipelines ingest from source systems (data lakes, transactional DBs) into the platform. Data scientists develop and train models in workbenches; fine-tuning pipelines automate continued pre-training or SFT. Models are registered, versioned, and promoted through governance gates (bias checks, security scans, performance thresholds). Approved models deploy to inference endpoints — Model-as-a-Service — with rate limiting, quotas, and SLA policies.

**Inference serving.** Production inference runs on GPU or CPU nodes depending on latency and throughput requirements. vLLM, Triton, or OpenVINO serve models with batching and optimization for sub-200ms use cases. API gateways handle authentication, rate limiting, and request routing. Observability tracks latency, throughput, error rates, and model drift.

**Security boundaries.** Data remains in designated zones; no egress to public cloud for training or inference. Network segmentation isolates development, staging, and production. Encryption at rest and in transit; secrets management via OpenShift or HashiCorp Vault. Audit logging for model promotions, data access, and inference requests.
