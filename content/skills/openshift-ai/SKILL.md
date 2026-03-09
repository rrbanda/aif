---
name: openshift-ai
description: OpenShift AI platform capabilities and architecture patterns. Use when answering questions about Red Hat OpenShift AI (RHOAI), AI Hub, Model-as-a-Service, or enterprise AI platform architecture.
---

# OpenShift AI

Apply OpenShift AI (RHOAI) platform knowledge when answering questions about Red Hat's enterprise AI platform. RHOAI extends OpenShift with AI/ML capabilities for model development, training, serving, and governance.

## When to Apply

Use this skill when the user asks about:
- OpenShift AI features, components, or capabilities
- Architecture patterns for multi-tenant AI workloads
- AI Hub, Model-as-a-Service, Gen AI Studio, or related services
- GPU Operator, Node Feature Discovery, or infrastructure for AI on OpenShift

## Platform Capabilities

Consult `references/features.md` for detailed capability coverage. Key components:

- **AI Hub**: Curated catalog of models, datasets, and notebooks for quick start.
- **Model-as-a-Service (MaaS)**: Deploy and serve models via API; supports multiple model backends.
- **Gen AI Studio**: Low-code interface for building generative AI applications and RAG pipelines.
- **Feature Store**: Centralized feature management for training and inference consistency.
- **Model Registry / MLflow**: Model versioning, metadata, and lifecycle management.
- **llm-d, LLM Compressor, GuideLLM**: Specialized serving and optimization tools.

When describing capabilities, match them to use cases (e.g., MaaS for inference, Gen AI Studio for RAG, Feature Store for production ML).

## Architecture Patterns

Consult `references/architecture.md` for topology and infrastructure. Cover:

- **Multi-tenant topology**: Namespace isolation, project-based resource quotas, RBAC for data scientists.
- **GPU Operator**: Manages NVIDIA GPU drivers, device plugin, and MIG partitioning on OpenShift nodes.
- **Node Feature Discovery (NFD)**: Labels nodes with hardware capabilities (GPU type, memory) for scheduling.
- **RBAC**: Role-based access for datasets, models, and inference endpoints; align with existing OpenShift RBAC.

For sizing or design questions, surface GPU topology, namespace strategy, and network/storage requirements.

## Roadmap and Versions

Consult `references/roadmap.md` for recent and upcoming features. When discussing versions:

- Note major version differences (e.g., RHOAI 2.x vs 1.x).
- Highlight recent additions (e.g., Gen AI Studio, llm-d) for customers on older versions.
- Avoid over-specific future dates; use "recent" or "upcoming" for roadmap items.

## Response Guidelines

- Use official product names (OpenShift AI, RHOAI) consistently.
- Link capabilities to customer outcomes (faster experimentation, governed production, hybrid deployment).
- For competitive questions, emphasize open source, Kubernetes-native, and on-prem/hybrid strengths.
