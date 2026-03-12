# Stage 2: Platform Foundation

**Duration:** 8–12 weeks

This stage deploys and configures OpenShift AI on your existing OpenShift cluster, enabling GPU-accelerated workloads and multi-tenant workspaces for data science teams. This is where you build the factory floor.

## What Happens in This Stage

**OpenShift AI deployment** installs the OpenShift AI Operator on your cluster. Configuration includes project structure, resource quotas, and integration with existing identity providers. The platform runs on-premises; no data leaves your environment.

**GPU/accelerator vendor operators** enable hardware scheduling. Deploy GPU nodes, configure drivers and device plugins, and validate that workloads can request and consume accelerator resources. Network operators handle RDMA and high-bandwidth networking for distributed training. Hardware procurement can be a critical path item — start early.

**AI Hub** provides a central model catalog with approved foundation models, performance insights, and deployment guidance. Curate the initial catalog based on pilot use cases; avoid over-provisioning.

**Multi-tenant workspace setup** creates isolated namespaces for each team (e.g., risk, fraud, clinical, operations) with RBAC policies. Balance isolation with resource efficiency — shared GPU pools with quotas often work better than fully dedicated nodes per team.

**Developer onboarding** gets data scientists and ML engineers onto workbenches with access to compute, data, and tools. Include hands-on sessions; documentation alone is insufficient.

**GitOps pipeline** manages platform configuration as code. Use Argo CD or similar for declarative deployment and drift detection. This enables reproducible environments and faster recovery.

## Five-Layer Architecture

The platform foundation stage deploys Layer 1 (Infrastructure) and Layer 3 (AI Platform) of the AI Factory architecture. For a complete view of how all five layers work together and map to Red Hat technologies and partner integrations, see the [AI Factory Architecture Layers](../reference/ai-factory-architecture-layers.md) reference.

The platform is built on **Red Hat AI Enterprise** on OpenShift — with validated reference architectures, intelligent GPU orchestration, and certified partner integrations. This is not a generic OpenShift deployment; it is a prescriptive architecture purpose-built for AI workloads.

<!-- audience: customer -->

## Your Commitments

Platform foundation is the most infrastructure-intensive stage. Your platform engineering and security teams are essential participants.

| Role | Time Commitment | Purpose |
|------|----------------|---------|
| **Platform engineering team** | Near full-time, 8-12 weeks | OpenShift AI deployment, operator configuration, GitOps setup |
| **Security/networking team** | 4-6 hours/week + approval gates | Network policies, RBAC configuration, GPU node access, firewall rules |
| **Procurement** | As needed, start early | GPU hardware ordering (lead times can be 8-16 weeks for enterprise GPUs) |
| **Data science team leads** | 2-3 onboarding sessions | Workspace provisioning, tool validation, initial workbench setup |
| **Executive sponsor** | 1-2 checkpoint meetings | Budget approval for hardware, scope confirmation |

## What You Receive

| Deliverable | What It Contains |
|-------------|-----------------|
| **Operational OpenShift AI platform** | Fully configured OpenShift AI with GPU-accelerated compute, multi-tenant workspaces, and identity provider integration |
| **AI Hub with model catalog** | Curated catalog of approved foundation models with deployment guidance and performance benchmarks |
| **Multi-tenant workspace configuration** | Isolated namespaces per team with RBAC policies, resource quotas, and shared GPU pool access |
| **GitOps pipeline** | Declarative platform configuration managed as code for reproducibility and drift detection |
| **Developer onboarding runbook** | Step-by-step guide for data scientists to access workbenches, request compute, and begin experimentation |
| **Architecture decision record** | Documented design decisions for GPU topology, networking, storage, and security posture |

## Readiness Checklist

Before entering Platform Foundation, confirm:

- [ ] OpenShift cluster is running (version 4.14+) with sufficient control plane capacity
- [ ] GPU hardware is ordered or available (minimum 2-3 GPU nodes for starter factory)
- [ ] Network team has approved GPU node network requirements (RDMA if needed for distributed training)
- [ ] Identity provider integration path is defined (LDAP, SSO, etc.)
- [ ] Storage backend can support large dataset I/O (object storage or high-throughput filesystem)
- [ ] Security team has reviewed and approved the OpenShift AI operator deployment
- [ ] Budget for GPU hardware and Red Hat AI subscriptions is approved

## What to Expect

Hardware procurement is frequently the longest lead-time item. GPU node delivery can take 8-16 weeks depending on vendor and configuration — start procurement in the Data Strategy stage if possible. The platform itself deploys in 2-4 weeks once hardware is available; the remaining time is spent on multi-tenant configuration, security hardening, and developer onboarding.

<!-- /audience -->

<!-- audience: internal -->

## Internal: Delivery Methodology

**Red Hat Services alignment:** Platform foundation is weeks 5-12 of the Services Starter Package. This is the most hands-on consulting phase — Red Hat Consulting deploys and configures the platform, coordinating with technology partners for hardware enablement and driver validation.

**Resource estimation:**
- Red Hat Consulting: 2-3 consultants (OpenShift AI specialist + infrastructure specialist), 8-12 weeks
- Partner engagement: Hardware vendor operator validation, inference runtime deployment, driver certification
- Customer commitment: Platform engineering team, security/networking approvals, hardware procurement

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
- *"Can we use our existing GPUs?"* — Yes, depending on the model. Red Hat AI Enterprise supports NVIDIA, Intel Gaudi, and AMD Instinct accelerators. The vendor operator validates compatibility with your specific hardware.
- *"Why not just use Kubernetes without OpenShift?"* — OpenShift AI provides the full AI lifecycle (AI Hub, Model Registry, Gen AI Studio, pipelines). Vanilla Kubernetes requires assembling this from disparate tools.

**Competitive architecture comparison:**
- AWS SageMaker: Managed service, no on-prem option, vendor lock-in to AWS compute
- Azure ML: AKS-based, similar pattern but tied to Azure networking and identity
- Google Vertex AI: Cloud-only, no hybrid deployment
- Databricks: Strong MLOps but weak on inference serving and GPU orchestration

**Key milestone:** Platform foundation value gate (OpenShift AI operational with GPU nodes, teams onboarded) is the strongest proof point for expanding the engagement.

<!-- /audience -->
