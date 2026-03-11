# Workload Assessment Report

## Executive Summary

This report presents findings from the AI workload assessment conducted for Example Bank Corp during the Discovery phase of the AI Factory program. The assessment evaluates readiness across five dimensions — data infrastructure, organizational maturity, team composition, infrastructure readiness, and use case pipeline — and provides recommendations for the Platform Foundation phase.

**Overall Readiness: Level 2** — The organization has foundational capabilities in place with identified gaps that the AI Factory program will address.

## Current State

| Dimension | Current State | Target |
|-----------|--------------|--------|
| **Platform** | OpenShift 4.16 on-premise, Newark DC | AI-enabled with OpenShift AI + NVIDIA GPU stack |
| **GPU Resources** | 12x NVIDIA A100 80GB (67% utilized) | Optimized allocation with MIG profiles |
| **Active Workloads** | 4 data science projects, 7 notebooks, 5 pipelines | Production AI Factory with governance gates |
| **Model Serving** | KServe with 2 active endpoints | Scaled MaaS with NIM + llm-d routing |
| **Team** | 8 ML engineers, manual MLOps | 20+ trained practitioners, automated pipelines |

## Assessment Findings

### Data Readiness: Level 2

The organization has established data pipelines for structured transactional data serving the primary fraud detection use case. Data quality profiling reveals 94% completeness and 97% consistency for transaction features.

**Strengths:**
- Centralized transaction data warehouse with 18 months of labeled fraud data (2.3M fraud events)
- Feature store prototype with 150+ engineered features for fraud scoring
- PCI DSS-compliant data handling processes in place

**Gaps:**
- Unstructured data (AML narratives, compliance documents) requires additional NLP preprocessing pipelines
- Data governance policies exist but enforcement is manual — no automated lineage tracking
- Cross-department data sharing agreements not formalized (Credit Risk team data requires separate access approval)
- No synthetic data generation capability for model development in data-scarce scenarios

**Recommendation:** Implement automated data lineage tracking via OpenShift AI. Formalize cross-department data sharing agreements during Data Strategy phase. Consider NeMo Data Curator for synthetic data generation.

### Infrastructure Readiness: Level 2

OpenShift cluster is operational with GPU nodes provisioned and NVIDIA GPU Operator deployed. Basic monitoring in place. Service mesh and certificate management configured.

**Strengths:**
- 24-node OpenShift 4.16 cluster with 3 GPU worker nodes (12x A100 80GB)
- NVIDIA GPU Operator 24.3.0 installed and operational
- Prometheus, Grafana, and Alertmanager configured
- Network segmentation between dev/staging/prod namespaces

**Gaps:**
- OpenShift AI installed but underutilized — only basic workbench access configured
- No MIG (Multi-Instance GPU) profiles configured — GPUs are all-or-nothing allocation
- Model serving via KServe is basic — no NIM microservices, no llm-d routing
- No automated CI/CD for model deployment — manual promotion process
- GPU network bandwidth (10Gbps) insufficient for distributed training — recommend 25Gbps upgrade

**Recommendation:** Configure MIG profiles for GPU sharing. Deploy NIM microservices for optimized inference. Upgrade GPU network to 25Gbps RoCEv2 for distributed training readiness. Implement GitOps-based model deployment pipeline.

### Organizational Maturity: AI Division Level

A dedicated AI/ML team exists within the technology division. Cross-functional collaboration with business units is emerging but not systematic. An AI Steering Committee has been proposed and staffed.

**Strengths:**
- Executive sponsor (Jane Smith, CAIO) is highly engaged — committed quarterly review cadence
- Dedicated ML engineering team with domain knowledge in financial services
- Compliance team (David Lawson) actively engaged in governance design
- Budget approved for 9-month program

**Gaps:**
- No formal AI Center of Excellence — knowledge is concentrated in the ML team
- No Community of Practice — cross-team knowledge sharing is ad-hoc
- Business unit engagement is sponsor-driven, not systematically managed
- Change management plan not yet developed for teams whose workflows will change

**Recommendation:** Establish AI CoE with cross-functional membership during Platform Foundation. Launch CoP during Pilot phase. Develop change management plan for fraud operations team (primary workflow impact).

### Team Readiness: Adequate with Gaps

Core ML engineering team of 8 is skilled in traditional ML (XGBoost, scikit-learn, PyTorch) and has production deployment experience. Gaps exist in specific areas required for AI Factory operations.

**Strengths:**
- Strong traditional ML skills — team has deployed models to KServe endpoints
- Financial services domain expertise — understand fraud patterns, credit risk modeling, regulatory requirements
- Familiarity with OpenShift basics — can navigate console, manage pods

**Gaps:**
- Limited LLM/GenAI experience — no fine-tuning or prompt engineering skills
- No MLOps automation experience — all deployments are manual CLI processes
- Limited OpenShift AI platform administration skills — need admin-level training
- No experience with NVIDIA-specific tools (NIM, NeMo, TensorRT-LLM)

**Recommendation:** Prioritize Red Hat Training AI501 (GenAIOps Enablement) for the full team. Conduct 3-day OpenShift AI platform bootcamp. Schedule NVIDIA NIM/NeMo workshop during Platform Foundation phase.

### Use Case Pipeline: Ready for Pilot

Three use cases identified, scored, and prioritized during Discovery workshops. Fraud detection is immediately ready for pilot with data and infrastructure in place.

| Use Case | Business Impact | Complexity | Data Readiness | Priority | Status |
|----------|---------------|------------|----------------|----------|--------|
| **Real-time Fraud Detection** | 4.5/5 | 3/5 | 4/5 | 1 | Ready for pilot |
| **AML Alert Triage** | 4.0/5 | 2/5 | 3/5 | 2 | Qualified — needs NLP serving |
| **Credit Risk Augmentation** | 3.5/5 | 4/5 | 2/5 | 3 | Proposed — needs data integration |

**Estimated portfolio value:** $25M annually across all three use cases.

## Recommendations Summary

1. **Immediate:** Configure MIG profiles and upgrade GPU network to 25Gbps
2. **Platform Foundation:** Deploy OpenShift AI with full NVIDIA integration, establish CoE
3. **Training:** AI501 + OpenShift AI bootcamp for full ML team (20 seats)
4. **Pilot:** Begin fraud detection pilot as lighthouse use case — data and model ready
5. **Governance:** Implement automated governance gates before first model promotion
6. **Organizational:** Establish Steering Committee (done), CoE, and CoP

## Next Steps

Proceed to Platform Foundation phase with focus on:
1. OpenShift AI full deployment with AI Hub and Model Registry
2. NVIDIA NIM microservice deployment for fraud scoring inference
3. MIG profile configuration for multi-tenant GPU sharing
4. Automated model deployment pipeline (GitOps)
5. Team bootcamp and AI501 training enrollment
