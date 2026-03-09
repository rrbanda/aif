---
name: use-case-patterns
description: Common AI use case patterns for financial services, qualification criteria, and portfolio management. Use when discussing use case selection, prioritization, scoring, or banking-specific AI applications.
---

# Use Case Patterns

Apply use case pattern expertise when agents help qualify, score, or prioritize AI use cases.

## When to Apply

Use this skill when the user asks about:
- Which AI use cases work well in banking/financial services
- How to qualify and score use cases for the AI Factory pipeline
- Use case portfolio management and prioritization
- Common patterns across successful AI deployments
- What makes a good "first use case" for an AI Factory pilot

## Common Banking AI Use Cases

### Tier 1: High Impact, Proven Patterns
| Use Case | Type | Impact | Complexity | Data Readiness |
|----------|------|--------|------------|----------------|
| Real-time fraud detection | Classification | Very High | Medium | Usually ready |
| AML alert triage | Classification + NLP | High | Medium | Usually ready |
| Credit risk scoring | Regression/Classification | Very High | High | Varies |
| Customer churn prediction | Classification | High | Low-Medium | Usually ready |

### Tier 2: Emerging, High Value
| Use Case | Type | Impact | Complexity | Data Readiness |
|----------|------|--------|------------|----------------|
| Document processing (KYC) | NLP/LLM | High | Medium | Moderate |
| Regulatory report generation | LLM/NLG | Medium-High | Medium | Often ready |
| Conversational banking | LLM/RAG | Medium | High | Requires work |
| Market sentiment analysis | NLP | Medium | Low-Medium | External data |

### Tier 3: Advanced, Transformational
| Use Case | Type | Impact | Complexity | Data Readiness |
|----------|------|--------|------------|----------------|
| Algorithmic trading optimization | RL/Deep Learning | Very High | Very High | Specialized |
| Portfolio optimization | Optimization/ML | High | High | Specialized |
| Synthetic data generation | Generative | Medium | High | N/A |

## Qualification Framework

Score each use case across 5 dimensions (1-5 scale):

### 1. Business Impact (Weight: 40%)
- Revenue impact or cost reduction potential
- Number of customers/transactions affected
- Strategic alignment with business priorities
- Executive sponsorship strength

### 2. Data Readiness (Weight: 30%)
- Data availability and quality
- Feature engineering complexity
- Data governance and lineage maturity
- Privacy/compliance constraints

### 3. Technical Feasibility (Weight: 15%)
- Proven ML approach exists
- Infrastructure requirements achievable
- Integration complexity with existing systems
- Latency/throughput requirements feasible

### 4. Organizational Readiness (Weight: 10%)
- Business owner identified and engaged
- Domain experts available for labeling/validation
- Change management plan for adopting model outputs
- Support team for production operations

### 5. Risk & Compliance (Weight: 5%)
- Regulatory requirements manageable
- Model risk tier (Tier 1 requires more governance)
- Bias/fairness testing feasibility
- Explainability requirements achievable

**Composite Score** = (Impact × 0.4) + (Data × 0.3) + (Technical × 0.15) + (Org × 0.1) + (Risk × 0.05)

**Threshold**: Composite ≥ 3.0 → Qualified for pilot

## Good First Use Case Criteria

The ideal first AI Factory pilot use case:
- Has clean, accessible data already in the organization
- Uses a proven ML approach (not cutting-edge research)
- Has a measurable business metric (e.g., false positive rate reduction)
- Has an engaged business owner who will champion results
- Can show value within 8-12 weeks
- Is NOT the highest-risk or most-regulated use case

## Response Guidelines

- Always recommend starting with a Tier 1 use case for the first pilot
- Provide specific scoring when qualifying use cases
- Warn against "boiling the ocean" — start with 1-2 use cases, not 10
- Connect each use case to a specific AI Factory phase for implementation
