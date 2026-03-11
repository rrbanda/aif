# Stage 2: Platform Foundation

**Duration:** 8–12 weeks

This stage deploys and configures OpenShift AI on your existing OpenShift cluster, enabling GPU-accelerated workloads and multi-tenant workspaces for data science teams. This is where you build the factory floor.

## What Happens in This Stage

**OpenShift AI deployment** installs the OpenShift AI Operator on your cluster. Configuration includes project structure, resource quotas, and integration with existing identity providers. The platform runs on-premises; no data leaves your environment.

**NVIDIA GPU Operator and Network Operator** enable GPU scheduling. Deploy GPU nodes, configure drivers and device plugins, and validate that workloads can request and consume GPU resources. Network Operator handles RDMA and high-bandwidth networking for distributed training. GPU procurement can be a critical path item — start early.

**AI Hub** provides a central model catalog with approved foundation models, performance insights, and deployment guidance. Curate the initial catalog based on pilot use cases; avoid over-provisioning.

**Multi-tenant workspace setup** creates isolated namespaces for each team (e.g., risk, fraud, clinical, operations) with RBAC policies. Balance isolation with resource efficiency — shared GPU pools with quotas often work better than fully dedicated nodes per team.

**Developer onboarding** gets data scientists and ML engineers onto workbenches with access to compute, data, and tools. Include hands-on sessions; documentation alone is insufficient.

**GitOps pipeline** manages platform configuration as code. Use Argo CD or similar for declarative deployment and drift detection. This enables reproducible environments and faster recovery.

## Five-Layer Architecture

The platform foundation stage deploys Layer 1 (Infrastructure) and Layer 3 (AI Platform) of the AI Factory architecture. For a complete view of how all five layers work together and map to specific Red Hat and NVIDIA technologies, see the [AI Factory Architecture Layers](../reference/ai-factory-architecture-layers.md) reference.

The platform is built on **Red Hat AI Factory with NVIDIA** — a co-engineered stack with Day 0 integration, validated reference workflows, and intelligent GPU orchestration. This is not a generic OpenShift deployment; it is a prescriptive, jointly validated architecture purpose-built for AI workloads.

<!-- audience: internal -->

## Internal: Delivery Methodology

**Red Hat Services alignment:** Platform foundation is weeks 5-12 of the Services Starter Package. This is the most hands-on consulting phase — Red Hat Consulting deploys and configures the platform, accesses NVIDIA expertise for GPU stack validation.

**Resource estimation:**
- Red Hat Consulting: 2-3 consultants (OpenShift AI specialist + infrastructure specialist), 8-12 weeks
- NVIDIA engagement: GPU Operator validation, NIM deployment, driver certification
- Customer commitment: Platform engineering team, security/networking approvals, GPU procurement

**GPU Sizing Guidance:**

| Workload Type | Minimum GPUs | Recommended | Notes |
|---------------|-------------|-------------|-------|
| Development (workbenches) | 2x A100/H100 | 4x | MIG slices for multi-tenant |
| Fine-tuning (SFT/OSFT) | 2x A100/H100 | 4-8x | Full GPU memory needed |
| Inference (real-time) | 1x per model | 2-3x per model | HA + canary |
| Inference (batch) | Shared pool | Shared pool | Time-sliced |
| Starter factory total | 3 GPU nodes | 8-12 GPU nodes | Growth headroom |

**Common objections and responses:**
- *"We already have OpenShift, why do we need consulting?"* — OpenShift AI configuration for GPU workloads, multi-tenant isolation, and model serving requires specialized expertise. Generic OpenShift does not equal AI-ready OpenShift.
- *"Can we use our existing GPUs?"* — Yes, if they are NVIDIA A100 or newer. Older GPUs may lack NIM support. GPU Operator validates compatibility.
- *"Why not just use Kubernetes without OpenShift?"* — OpenShift AI provides the full AI lifecycle (AI Hub, Model Registry, Gen AI Studio, pipelines). Vanilla Kubernetes requires assembling this from disparate tools.

**Competitive architecture comparison:**
- AWS SageMaker: Managed service, no on-prem option, vendor lock-in to AWS compute
- Azure ML: AKS-based, similar pattern but tied to Azure networking and identity
- Google Vertex AI: Cloud-only, no hybrid deployment
- Databricks: Strong MLOps but weak on inference serving and GPU orchestration

**Key milestone:** Platform foundation value gate (OpenShift AI operational with GPU nodes, teams onboarded) is the strongest proof point for expanding the engagement.

<!-- /audience -->
