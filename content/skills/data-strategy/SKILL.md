---
name: data-strategy
description: Data strategy for AI Factory including data pipelines, feature stores, data quality, and lakehouse patterns. Use when discussing data architecture, data readiness, feature engineering, or data governance for AI.
---

# Data Strategy

Apply data strategy expertise when agents help with data pipeline design, feature engineering, data quality, or data governance for AI workloads.

## When to Apply

Use this skill when the user asks about:
- Data pipeline architecture for AI/ML workloads
- Feature store design and implementation
- Data quality frameworks and monitoring
- Data governance for model training data
- Lakehouse patterns for analytics and AI
- Data readiness assessment for specific use cases

## Data Architecture for AI Factory

### Data Pipeline Patterns

#### Batch Pipeline (Most common for training)
Source → Ingest (Kafka/NiFi) → Lake (S3/Ceph) → Transform (Spark/dbt) → Feature Store → Training

#### Streaming Pipeline (Real-time inference features)
Source → Stream (Kafka) → Process (Flink/Spark Streaming) → Feature Store → Online Serving

#### Hybrid (Production pattern)
- Batch for training data and historical features
- Streaming for real-time features at inference time
- Feature store bridges both: offline store for training, online store for serving

### Feature Store

A feature store is the bridge between data engineering and model development:

| Component | Purpose | Technology Options |
|-----------|---------|-------------------|
| Offline store | Historical features for training | Delta Lake, Hive, S3/Parquet |
| Online store | Low-latency features for inference | Redis, DynamoDB, Aerospike |
| Feature registry | Metadata, lineage, discovery | Feast, Tecton, internal catalog |
| Transformation engine | Feature computation | Spark, Flink, pandas on Ray |

### Data on OpenShift
- **Object storage**: MinIO or Ceph (S3-compatible) for data lake
- **Streaming**: AMQ Streams (Kafka) for event pipelines
- **Processing**: Spark on OpenShift or Ray clusters
- **Feature store**: Feast on OpenShift with Redis online store

## Data Quality Framework

### Dimensions
1. **Completeness**: % of non-null values in required fields
2. **Accuracy**: % of values matching ground truth
3. **Consistency**: Cross-source agreement for shared entities
4. **Timeliness**: Data freshness vs. SLA requirements
5. **Uniqueness**: Duplicate detection rate

### Monitoring
- Automated data quality checks in pipeline (Great Expectations, dbt tests)
- Quality score per dataset (0-1 composite), threshold ≥ 0.8 for training
- Alert on quality degradation (schema drift, null rate spike, distribution shift)
- Quality dashboards visible to both data engineering and data science teams

## Data Governance for AI

### Training Data Requirements
- **Lineage**: Full provenance from source to training dataset
- **Versioning**: Immutable snapshots of training data per model version
- **Consent**: For PII, documented consent or legitimate basis per GDPR
- **Bias audit**: Statistical tests for representation across protected groups
- **Retention**: Training data retained for model lifetime + regulatory retention period

### Data Classification
| Level | Description | AI Usage Constraints |
|-------|-------------|---------------------|
| Public | Externally available | No restrictions |
| Internal | Business-internal | On-prem or authorized cloud only |
| Confidential | Customer PII, financial data | On-prem, encrypted, access-controlled |
| Restricted | Regulatory-critical, trade secrets | Air-gapped, minimal access, full audit |

## Response Guidelines

- Always ask about data classification before suggesting architecture
- Feature store is not optional for production AI — recommend it from Phase 1
- Data quality must be automated, not manual spot-checks
- For banking: data lineage is a regulatory requirement, not optional
- Connect data strategy recommendations to specific AI Factory phases
