# Glossary

## Platform & Infrastructure

- **OpenShift** — Red Hat's enterprise Kubernetes platform. The foundation the AI Factory runs on.
- **OpenShift AI** — AI/ML lifecycle management platform built on OpenShift. Provides model serving, training orchestration, and experiment tracking.
- **GPU Operator** — Kubernetes operator that automates GPU driver deployment and health monitoring on cluster nodes. Available from NVIDIA, Intel, and AMD.
- **GitOps** — Infrastructure and application management approach where Git is the source of truth.

## AI & ML

- **AI Hub** — Centralized model catalog within OpenShift AI providing approved models, performance insights, and deployment guidance.
- **MaaS (Model-as-a-Service)** — Serving approved models via API endpoints with rate limiting, quotas, and SLA policies.
- **Gen AI Studio** — Prompt playground within OpenShift AI with MCP tool integration for model experimentation.
- **llm-d** — Kubernetes-native distributed inference routing for LLM workloads. Selects models by cost, latency, and SLA.
- **InstructLab** — Red Hat's open-source tool for model alignment and fine-tuning using synthetic data generation.
- **vLLM** — High-throughput LLM inference engine used by the Red Hat AI Inference Server.
- **MLOps** — Practices for managing the ML lifecycle from development through deployment to monitoring.
- **Feature Store** — Centralized repository of reusable ML features with consistent definitions across teams.

## Fine-Tuning

- **SFT (Supervised Fine-Tuning)** — Training a foundation model on labeled examples for a specific task.
- **OSFT (Online Supervised Fine-Tuning)** — Continuous fine-tuning with new data as it becomes available.
- **LLM Compressor** — Tool for reducing model size through quantization and pruning without significant accuracy loss.
- **GuideLLM** — Benchmarking tool for measuring LLM inference performance.

## Governance & Compliance

- **Model Registry** — Centralized catalog of trained models with versioning, lineage, and approval workflows.
- **Model Drift** — Degradation in model performance over time as real-world data diverges from training data.
- **Governance Gate** — Automated checkpoint that validates compliance, fairness, and performance before model deployment.

## Organizational

- **COE (Center of Excellence)** — Central expert team defining AI standards, architectures, and best practices.
- **COP (Community of Practice)** — Cross-functional group of practitioners sharing patterns and learnings.
- **Value Gate** — Measurable criteria that must be met before progressing to the next program phase.

## Financial Services

- **PCI DSS** — Payment Card Industry Data Security Standard. Mandatory for organizations processing payment card data.
- **GDPR** — General Data Protection Regulation. EU data privacy regulation.
- **SOX** — Sarbanes-Oxley Act. US financial reporting and auditing requirements.
- **AML** — Anti-Money Laundering. Regulations requiring detection and reporting of suspicious financial activity.
- **PII** — Personally Identifiable Information. Data that can identify an individual.

## Partner Technologies

- **NIM (NVIDIA Inference Microservices)** — Pre-optimized inference containers for running AI models at scale. NVIDIA partner technology.
- **NeMo** — NVIDIA's framework for building and customizing generative AI models.
- **OpenVINO** — Intel's cross-platform inference optimization toolkit.
- **ROCm** — AMD's open-source GPU computing platform.
- **Triton Inference Server** — NVIDIA's multi-framework model serving engine.


<!-- audience: internal -->

## Internal: Key Terms for Customer Conversations

- **Red Hat AI Enterprise** — The umbrella product name. Includes OpenShift AI and related AI platform capabilities. Use this name in customer-facing materials.
- **Red Hat AI Factory** — Red Hat's methodology and platform for helping enterprises build production AI. The framework is partner-neutral; partner technologies are configured per engagement.
- **Services Starter Package** — The consulting + training + TAM bundle. Always position as part of the initial engagement.
- **Node-based pricing** — Simplified pricing model. Per-GPU-node subscription for Red Hat AI Enterprise. Partner software subscriptions (e.g., NVIDIA AI Enterprise) priced separately per partner.
- **llm-d** — Kubernetes-native distributed inference routing. Red Hat contribution to intelligent multi-model serving.
- **Partner ecosystem** — NVIDIA, Intel, AMD, Dell, HPE, Lenovo, Cisco, Supermicro. Position based on customer's existing infrastructure and acquisition plans.

<!-- /audience -->
