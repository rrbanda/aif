# Technical Architecture Overview

The AI Factory runs on **Red Hat AI Factory with NVIDIA** — a co-engineered, enterprise-grade AI solution that combines Red Hat AI Enterprise with NVIDIA's accelerated computing, networking, and AI Enterprise software. It deploys on existing OpenShift clusters, extending current investments with GPU acceleration, model lifecycle tooling, and multi-tenant workspaces for data science teams.

## Red Hat AI Factory with NVIDIA

This is not a generic integration. Red Hat and NVIDIA continuously co-engineer the stack with:

- **Day 0 integration** — New hardware and software releases are validated from day one through continuous co-engineering
- **Modular design** — Prescriptive foundation bringing Red Hat and NVIDIA technologies together as a unified, validated stack
- **Co-developed reference workflows** — Pre-defined blueprints and best practice AI workflow patterns for common use cases
- **Intelligent GPU orchestration** — On-demand access to GPU resources with scheduling, MIG profiles, and multi-tenant isolation
- **Enterprise security** — Advanced security and compliance built on Red Hat Enterprise Linux, with NVIDIA DOCA microservices for zero-trust architecture

For the five-layer AI Factory architecture and how each layer maps to specific technologies, see the [AI Factory Architecture Layers](ai-factory-architecture-layers.md) reference.

**OpenShift AI on OpenShift.** The OpenShift AI Operator installs on the customer's OpenShift cluster. It provides workbenches (Jupyter, VS Code) for development, AI Hub for model catalog and deployment, and pipeline orchestration for training and inference. All components run on-premises; no data leaves the environment. Integration with existing identity providers (LDAP, OIDC) and RBAC ensures access control aligns with enterprise policies.

**NVIDIA GPU stack.** The NVIDIA GPU Operator and Network Operator enable GPU scheduling. GPU nodes run drivers, device plugins, and container runtime extensions; workloads request GPUs via standard Kubernetes resource limits. Network Operator configures RDMA and high-bandwidth networking for distributed training. AI Enterprise provides optimized containers and support for training and inference workloads.

**Model lifecycle flow.** Data pipelines ingest from source systems (data lakes, transactional DBs) into the platform. Data scientists develop and train models in workbenches; fine-tuning pipelines automate continued pre-training or SFT. Models are registered, versioned, and promoted through governance gates (bias checks, security scans, performance thresholds). Approved models deploy to inference endpoints—Model-as-a-Service—with rate limiting, quotas, and SLA policies.

**Inference serving.** Production inference runs on GPU or CPU nodes depending on latency and throughput requirements. Triton, vLLM, or OpenVINO serve models with batching and optimization for sub-200ms use cases. API gateways handle authentication, rate limiting, and request routing. Observability tracks latency, throughput, error rates, and model drift.

**Security boundaries.** Data remains in designated zones; no egress to public cloud for training or inference. Network segmentation isolates development, staging, and production. Encryption at rest and in transit; secrets management via OpenShift or HashiCorp Vault. Audit logging for model promotions, data access, and inference requests.

<!-- audience: internal -->
Architecture diagram should show: OpenShift cluster, GPU nodes, data pipeline flow, model registry, inference endpoints, security boundaries. Reference customer's existing OpenShift version and GPU hardware for compatibility. Document any required network/firewall rules for distributed training.
<!-- /audience -->
