# Technical Architecture

**Red Hat AI Factory with NVIDIA** — accelerate enterprise AI in production at scale on a unified foundation. The platform combines Red Hat AI Enterprise and NVIDIA AI Enterprise, co-engineered and continuously validated to deliver an end-to-end solution optimized for NVIDIA hardware environments.

## Architecture Overview

The AI Factory architecture follows the official Red Hat AI Factory with NVIDIA reference stack — from hardware infrastructure through intelligent applications.

| Layer | Components | Technologies |
|-------|-----------|-------------|
| **Infrastructure & Hardware** | Server and Rack Scale Platforms | DGX, HGX, RTX Pro, SpectrumX, BlueField |
| **Platform Availability** | Virtualization, Container Orchestration, MLOps, Networking, Bare Metal, Confidential Compute | Red Hat OpenShift, RHEL, Observability, Security Posture, DevOps Tooling |
| **Develop & Deploy** | Agents & Models, Data & Customization, Train & Fine-tune, Production Inference, Distributed Serving, Scheduling | Red Hat AI Enterprise, NVIDIA AI Enterprise, NIM, NeMo, MIG & vGPU |
| **Models & Quickstarts** | Optimized validated open models | Red Hat AI quickstarts, NVIDIA AI Blueprints, Granite, Nemotron |
| **Intelligent Applications** | APIs | Predictive ML, Generative AI, Agentic AI, Physical AI |

For detailed technology mapping across all layers, see the [AI Factory Architecture Layers](ai-factory-architecture-layers.md) reference.

## Red Hat AI Enterprise

Integrated AI platform for deploying and running efficient and cost-effective AI models, agents, and applications in the hybrid cloud:

- **Unified AI lifecycle** — Manages the end-to-end process (develop, tune, infer) for predictive, generative, and agentic AI on a single, centralized platform
- **Intelligent scale & performance** — Optimizes AI inference at scale ensuring efficient GPU utilization and intelligent resource allocation
- **Enterprise governance & trust** — Comprehensive, layered security and safety across the entire AI lifecycle
- **Hybrid cloud agility** — Flexible deployment across the entire hybrid cloud, diverse hardware, and the edge

## NVIDIA AI Enterprise

Accelerate and optimize production AI deployments:

- **Accelerated Time to Value** — Ready-to-deploy NIM microservices and blueprints
- **Run AI Workloads at Scale** — Maximize GPU utilization, increase AI workload throughput, centralize policy, governance and visibility for efficient, cost-controlled, and performant scaling
- **Build with Confidence** — Extended-lifetime production branches, secure supply chain, and STIG-hardened containers

## Co-Engineered, Not Assembled

This is not a generic integration. Red Hat and NVIDIA continuously co-engineer the stack with:

- **Day 0 integration** — New hardware and software releases (Blackwell now, Rubin H2 2026) are validated from day one through continuous co-engineering
- **Modular design** — Prescriptive foundation bringing Red Hat and NVIDIA technologies together as a unified, validated stack
- **Co-developed reference workflows** — Pre-defined blueprints and best practice AI workflow patterns for common use cases
- **Intelligent GPU orchestration** — On-demand access to GPU resources with scheduling, MIG profiles, and multi-tenant isolation
- **Enterprise security** — Advanced security and compliance built on Red Hat Enterprise Linux, with NVIDIA DOCA microservices for zero-trust architecture

## Platform Components

**Red Hat AI Enterprise on OpenShift.** The platform installs on the customer's OpenShift cluster, providing workbenches (Jupyter, VS Code) for development, AI Hub for model catalog and deployment, Gen AI Studio for prompt experimentation with MCP tool integration, and pipeline orchestration for training and inference. All components run on-premises; no data leaves the environment.

**NVIDIA GPU stack.** The NVIDIA GPU Operator and Network Operator enable GPU scheduling. GPU nodes run drivers, device plugins, and container runtime extensions. Network Operator configures RDMA and high-bandwidth networking (SpectrumX) for distributed training. BlueField DPUs provide programmable zero-trust networking. NVIDIA Dynamo optimizes inference workloads.

**Model lifecycle flow.** Data pipelines ingest from source systems into the platform. Data scientists develop and train models in workbenches. Fine-tuning pipelines automate continued pre-training using NeMo or InstructLab. Models are registered, versioned, and promoted through governance gates. Approved models deploy to inference endpoints — Model-as-a-Service — with rate limiting, quotas, and SLA policies.

**Inference serving.** Production inference runs on GPU or CPU nodes via NIM microservices, vLLM, or TensorRT-LLM with optimization for sub-200ms use cases. llm-d provides Kubernetes-native distributed inference routing for multi-model serving. API gateways handle authentication, rate limiting, and request routing.

**Security boundaries.** Data remains in designated zones; no egress to public cloud for training or inference. Network segmentation isolates development, staging, and production. Encryption at rest and in transit. Audit logging for model promotions, data access, and inference requests.

<!-- audience: internal -->

## Internal: Architecture Decision Guidance

**GPU Topology Recommendations:**
- **Fraud detection / real-time scoring**: RTX Pro or H100 MIG slices — latency-optimized, doesn't need full GPU
- **LLM fine-tuning**: H100 or Blackwell B200 — need full GPU memory for SFT/OSFT
- **Distributed training**: Multi-node Blackwell with SpectrumX networking — RDMA required
- **Multi-model inference**: llm-d on H100/Blackwell pool — route by cost/latency/SLA

**Sizing Rules of Thumb:**
- 1 GPU node per 2-3 concurrent inference models (depends on model size)
- 2 GPU nodes minimum for fine-tuning (distributed data parallel)
- Network: 25Gbps minimum between GPU nodes, 100Gbps for distributed training
- Storage: 10TB minimum for model artifacts, training data, and checkpoints

**Common Architecture Mistakes:**
- Undersizing network bandwidth between GPU nodes (causes training bottleneck)
- Running dev and prod inference on the same GPU pool without MIG isolation
- Not planning storage for model checkpoints (fine-tuning generates many GB per run)
- Skipping llm-d and routing all traffic to a single model server

**Competitive Architecture Comparison:**
- AWS: SageMaker endpoints are per-model, no native multi-model routing. EKS + GPU is manual.
- Azure: AKS with NVIDIA integration is similar but tied to Azure networking. No SpectrumX/BlueField.
- Databricks: Strong MLflow integration but inference serving is basic compared to NIM + llm-d.

<!-- /audience -->
