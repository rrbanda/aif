# Workload Assessment Report

## Executive Summary

This report presents the findings from the AI workload assessment conducted for Example Bank Corp during the Discovery phase of the AI Factory program.

## Current State

- **Platform**: OpenShift 4.16 on-premise
- **GPU Resources**: 12x NVIDIA A100 80GB
- **Active Workloads**: 4 data science projects, 7 notebooks, 5 pipelines
- **Model Serving**: KServe with 2 active endpoints

## Assessment Findings

### Data Readiness: Level 2

The organization has established data pipelines for structured transactional data. Unstructured data (documents, communications) requires additional ETL development. Data governance policies are in place but enforcement is manual.

### Infrastructure Readiness: Level 1

OpenShift cluster is operational with GPU nodes provisioned. OpenShift AI is installed but underutilized. Service mesh and monitoring are configured. Gaps exist in automated model deployment pipelines and multi-tenant isolation.

### Organizational Maturity: AI Division Level

A dedicated AI/ML team exists within the technology division. Cross-functional collaboration with business units is emerging but not systematic. An AI Steering Committee has been proposed but not yet formalized.

### Team Readiness: Adequate with Gaps

Core ML engineering team of 8 is skilled in traditional ML. Gaps exist in LLM/GenAI, MLOps automation, and cloud-native ML patterns. Recommended: bootcamp on OpenShift AI and model serving.

### Use Case Pipeline: Ready for Pilot

Three use cases identified and scored. Fraud detection is ready for pilot with data and infrastructure in place. AML triage needs NLP model serving capability. Credit risk requires additional data integration.

## Recommendations

1. Formalize AI Steering Committee with quarterly reviews
2. Establish AI Center of Excellence with cross-functional membership
3. Conduct OpenShift AI bootcamp for ML engineering team
4. Implement automated CI/CD for model deployment
5. Begin fraud detection pilot as lighthouse use case

## Next Steps

Proceed to Platform Foundation phase with focus on automated model serving pipelines and team enablement.
