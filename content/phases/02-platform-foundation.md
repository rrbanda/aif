# Phase 2: Platform Foundation

**Duration:** 8–12 weeks

This phase deploys and configures OpenShift AI on your existing OpenShift cluster, enabling GPU-accelerated workloads and multi-tenant workspaces for data science teams.

## What Happens in This Phase

**OpenShift AI deployment** installs the OpenShift AI Operator on your cluster. Configuration includes project structure, resource quotas, and integration with existing identity providers. The platform runs on-premises; no data leaves your environment.

**NVIDIA GPU Operator and Network Operator** enable GPU scheduling. Deploy GPU nodes, configure drivers and device plugins, and validate that workloads can request and consume GPU resources. Network Operator handles RDMA and high-bandwidth networking for distributed training. GPU procurement can be a critical path item—start early.

**AI Hub** provides a central model catalog with approved foundation models, performance insights, and deployment guidance. Curate the initial catalog based on pilot use cases; avoid over-provisioning.

**Multi-tenant workspace setup** creates isolated namespaces for each team (e.g., risk, fraud, NLP, quant) with RBAC policies. Balance isolation with resource efficiency—shared GPU pools with quotas often work better than fully dedicated nodes per team.

**Developer onboarding** gets data scientists and ML engineers onto workbenches with access to compute, data, and tools. Include hands-on sessions; documentation alone is insufficient.

**GitOps pipeline** manages platform configuration as code. Use Argo CD or similar for declarative deployment and drift detection. This enables reproducible environments and faster recovery.

## Five-Layer Architecture

The platform foundation phase deploys Layer 1 (Compute) and Layer 3 (Model Development) of the AI Factory architecture. For a complete view of how all five layers work together and map to specific Red Hat and NVIDIA technologies, see the [AI Factory Architecture Layers](../reference/ai-factory-architecture-layers.md) reference.

The platform is built on **Red Hat AI Factory with NVIDIA** — a co-engineered stack with Day 0 integration, validated reference workflows, and intelligent GPU orchestration. This is not a generic OpenShift deployment; it is a prescriptive, jointly validated architecture purpose-built for AI workloads.

<!-- audience: internal -->
AI Platform Foundation is the primary engagement. Key decision points: which foundation models in the catalog, shared vs. dedicated GPU allocation, and single vs. multi-cluster topology. Document GPU sizing and cost allocation model for internal planning. Watch for GPU procurement delays and security team approval timelines—both frequently slip.
<!-- /audience -->
