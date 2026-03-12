# Stage 3: Pilot & Incubation

**Duration:** 8–12 weeks

Pilots prove the end-to-end value of the AI Factory before scaling. Select 2–3 use cases, deliver them fully, and measure against defined KPIs. This is where the factory produces its first outputs.

## What Happens in This Stage

**Pilot use case execution** runs selected workloads (e.g., fraud detection, regulatory document analysis, clinical NLP, predictive maintenance) from data ingestion through production inference. Each pilot must complete the full lifecycle — data pipeline, model training or fine-tuning, evaluation, deployment, and integration with business workflows.

**Fine-tuning pipelines** support domain adaptation of foundation models. Implement supervised fine-tuning (SFT) and open-source fine-tuning (OSFT) using InstructLab or partner frameworks. Automate the pipeline: data prep, training, evaluation, and model promotion. Document hyperparameters and data requirements for reproducibility.

**Model evaluation framework** establishes reusable benchmarks for fairness, robustness, and safety. For regulated industries, bias detection (e.g., across demographic segments) and adversarial robustness matter. Define pass/fail thresholds before deployment.

**Process redesign documentation** captures how business workflows change with AI integrated. Create before/after process maps showing handoffs, decision points, and human-in-the-loop steps. This supports change management and identifies where training is needed.

**KPI measurement** tracks each pilot against baselines. Metrics might include accuracy, precision/recall, latency, false positive rate, cost savings, or time-to-decision. Define KPIs upfront; retrofitting measurement is unreliable.

## Why Pilots Fail

The most common pilot failure modes are not technical:

- **Use cases chosen for visibility rather than feasibility** — executive pet projects with poor data or unclear owners
- **KPIs not defined upfront** — making success measurement ambiguous
- **Business process owners resistant to workflow changes** — the model works but nobody changes how they work
- **Data quality issues discovered during training** — should have been caught in Stage 1

Over 40% of agentic AI projects may be canceled by 2027 due to escalating costs, unclear business value, and inadequate risk controls (Gartner). Pilots with clear KPIs and business owner commitment avoid this trap.

<!-- audience: customer -->

## Your Commitments

Pilots require deep engagement from business process owners — not just data science teams. A model that works technically but is not adopted by the business is a failed pilot.

| Role | Time Commitment | Purpose |
|------|----------------|---------|
| **Data science team** | Near full-time, 8-12 weeks | Model development, fine-tuning, evaluation, and pipeline implementation |
| **Business process owner** (per use case) | 4-6 hours/week | Requirements validation, process redesign, KPI definition, user acceptance |
| **Subject matter experts** | 2-4 hours/week per use case | Domain knowledge for training data curation, evaluation criteria, edge cases |
| **Model risk / compliance officer** | Review cycles | Bias assessment, governance gate approval, documentation review |
| **End users** (for integration testing) | 2-3 sessions | User acceptance testing, workflow integration validation |

## What You Receive

| Deliverable | What It Contains |
|-------------|-----------------|
| **Working pilot models** (2-3 use cases) | End-to-end operational models from data ingestion through inference, deployed on your AI Factory platform |
| **KPI measurement report** | Baseline vs. pilot performance for each use case — accuracy, latency, cost impact, time savings |
| **Fine-tuning pipeline** | Automated pipeline for domain adaptation of foundation models, documented for reproducibility and reuse |
| **Model evaluation framework** | Reusable benchmarks for fairness, robustness, safety, and domain accuracy — applicable to future use cases |
| **Process redesign documentation** | Before/after workflow maps showing how AI integrates into business operations, with handoff points and human-in-the-loop steps |
| **Scaling business case** | Data-driven justification for expanding the factory based on pilot results |

## Readiness Checklist

Before entering Pilot & Incubation, confirm:

- [ ] Platform Foundation is complete — OpenShift AI operational, GPU nodes available, workspaces provisioned
- [ ] 2-3 pilot use cases selected with clear business owners and defined KPIs
- [ ] Training data for pilot use cases is accessible, profiled, and quality-assessed
- [ ] Data science team has been onboarded to the platform and validated workbench access
- [ ] Business process owners have committed time for requirements, feedback, and acceptance testing
- [ ] Compliance/model risk team is aware of pilot scope and prepared to review outputs
- [ ] Success criteria defined and agreed before work begins (not retrofitted after)

## What to Expect

The first pilot takes longer than subsequent ones — it is proving the entire factory process, not just building one model. Expect 8-12 weeks for the first use case end-to-end. Subsequent use cases on the same platform typically complete in 4-6 weeks because the infrastructure, pipelines, and governance framework are already in place. This acceleration is the core value of the factory model.

<!-- /audience -->

<!-- audience: internal -->

## Internal: Delivery Methodology

**Red Hat Services alignment:** Pilot stage maps to weeks 9-12+ of the Services Starter Package ("One use case onboarding"). Red Hat Consulting guides the first pilot end-to-end, with knowledge transfer so the customer can execute subsequent pilots independently.

**Resource estimation:**
- Red Hat Consulting: 1-2 consultants, 8-12 weeks (overlaps with platform stabilization)
- Customer commitment: Data science team, business process owner, model risk officer
- Partner involvement: Inference runtime deployment, fine-tuning framework guidance (partner-specific)

**Pilot selection guidance (internal):**
- Prioritize use cases with: existing data, clear KPIs, engaged business owner, regulatory simplicity
- Avoid first pilots that require: real-time production integration, cross-department data sharing, novel model architectures
- Best first pilots by industry:
  - Financial services: Fraud detection (clear KPIs, existing data, regulatory motivation)
  - Healthcare: Clinical documentation (high time savings, contained scope)
  - Manufacturing: Predictive maintenance (sensor data available, clear ROI)
  - Energy: Demand forecasting (historical data, measurable accuracy)

**Common objections and responses:**
- *"Our data science team can handle this"* — The goal is not just building a model; it is proving the full factory lifecycle (data → train → evaluate → deploy → monitor). Most teams have model-building skills but lack MLOps and governance pipeline experience.
- *"One use case isn't enough to justify the investment"* — The pilot proves the platform and process. Once proven, subsequent use cases deploy 3-5x faster because the factory infrastructure is in place.
- *"Why can't we just use a pre-trained model?"* — Pre-trained models work for generic tasks. Enterprise use cases (fraud patterns, clinical terminology, equipment signatures) require domain fine-tuning on proprietary data. This is the competitive moat.

**Key deal stage:** Pilot success is the strongest expansion trigger. Document KPI results meticulously — these become the business case for scaling GPU nodes, adding teams, and expanding use cases.

<!-- /audience -->
