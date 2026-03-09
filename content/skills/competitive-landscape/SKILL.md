---
name: competitive-landscape
description: Competitive positioning for Red Hat AI Factory. Use when answering questions about Databricks, AWS, Azure, or competitive differentiation for AI Factory.
---

# Competitive Landscape

Apply competitive positioning knowledge when answering questions about Red Hat AI Factory vs. Databricks, AWS, or Azure. Focus on differentiation, strengths, and when to recommend AI Factory.

## When to Apply

Use this skill when the user asks about:
- Databricks vs. OpenShift AI, MLflow, or Unity Catalog
- AWS SageMaker or Bedrock vs. on-prem AI Factory
- Azure AI Studio or Azure ML vs. OpenShift AI
- Data sovereignty, vendor lock-in, or hybrid cloud for AI

## Databricks

Consult `references/databricks.md` for detailed comparison. Key positioning:

- **Strengths**: Databricks has strong data lakehouse, Unity Catalog, and Mosaic AI. Good for data-centric workflows.
- **Weaknesses**: Cloud-centric; limited on-prem. Vendor lock-in to Databricks ecosystem.
- **AI Factory angle**: Open source, Kubernetes-native, on-prem/hybrid. Position for customers who need data sovereignty, existing OpenShift investment, or multi-cloud flexibility.

## AWS

Consult `references/aws.md` for AWS comparison. Key positioning:

- **SageMaker/Bedrock**: Mature cloud AI services; broad model selection.
- **Data sovereignty**: Data in AWS stays in AWS regions; some customers require on-prem.
- **AI Factory angle**: On-prem deployment, no data leaving customer environment. Cost predictability; avoid cloud egress and per-request pricing. Avoid vendor lock-in.

## Azure

Consult `references/azure.md` for Azure comparison. Key positioning:

- **Azure AI Studio / Azure ML**: Integrated with Microsoft ecosystem; good for Azure-centric customers.
- **Hybrid**: Azure Arc supports hybrid; but AI workloads often remain cloud-centric.
- **AI Factory angle**: True hybrid—run AI anywhere (on-prem, Azure, other clouds). Multi-cloud advantage; not tied to single hyperscaler.

## Response Guidelines

- Be factual; avoid disparaging competitors. Focus on fit and differentiation.
- Lead with customer context: data residency, existing platforms, multi-cloud strategy.
- When AI Factory fits: on-prem, hybrid, OpenShift users, data sovereignty, open source preference, Kubernetes-native requirements.
