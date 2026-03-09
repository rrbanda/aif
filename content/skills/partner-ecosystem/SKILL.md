---
name: partner-ecosystem
description: Partner ecosystem for AI Factory. Use when answering questions about NVIDIA, Intel, AMD, or partner integrations for AI Factory.
---

# Partner Ecosystem

Apply partner ecosystem knowledge when answering questions about NVIDIA, Intel, AMD, and other AI Factory partners. Focus on licensing, integrations, and go-to-market alignment.

## When to Apply

Use this skill when the user asks about:
- NVIDIA AI Enterprise, NIM, NeMo, or NeMo Guardrails
- Intel Gaudi or AMD MI300X with OpenShift AI
- Partner licensing, support matrix, or joint solutions

## NVIDIA

Consult `references/nvidia.md` for NVIDIA partnership details. Cover:

- **NVIDIA AI Enterprise (NVAIE)**: Licensing for enterprise AI on VMware and Red Hat. Includes support, security updates, and certified software stack.
- **NIM (NVIDIA Inference Microservices)**: Pre-built containers for model serving. Simplifies deployment of popular models.
- **NeMo Framework**: Training and customization of LLMs. NeMo Guardrails for safety and compliance.
- **Joint go-to-market**: Red Hat and NVIDIA collaborate on OpenShift AI; NVIDIA GPUs and software are primary accelerator stack.

When discussing NVIDIA, emphasize certified compatibility, enterprise support, and ecosystem breadth.

## Intel and AMD

Consult `references/intel_amd.md` for alternative accelerators. Cover:

- **Intel Gaudi**: AI accelerators for training and inference. Alternative to NVIDIA for cost or supply diversity.
- **AMD MI300X**: High-memory accelerator; competitive for large model inference.
- **OpenShift AI support**: Check support matrix for GPU Operator and workload compatibility. NVIDIA is primary; Intel/AMD support varies by version.

When customers ask about non-NVIDIA options, provide accurate support status and direct to compatibility documentation.

## Response Guidelines

- Lead with NVIDIA as primary partner; Intel/AMD as alternatives when relevant.
- Avoid overstating support for Intel/AMD; verify current OpenShift AI compatibility.
- For licensing questions, direct to partner or Red Hat sales; avoid specific pricing.
