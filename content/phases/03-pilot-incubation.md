# Phase 3: Pilot & Incubation

**Duration:** 8–12 weeks

Pilots prove the end-to-end value of the AI Factory before scaling. Select 2–3 use cases, deliver them fully, and measure against defined KPIs.

## What Happens in This Phase

**Pilot use case execution** runs selected workloads (e.g., fraud detection, regulatory document analysis, credit risk scoring) from data ingestion through production inference. Each pilot must complete the full lifecycle—data pipeline, model training or fine-tuning, evaluation, deployment, and integration with business workflows.

**Fine-tuning pipelines** support domain adaptation of foundation models. Implement supervised fine-tuning (SFT) and open-source fine-tuning (OSFT) using NeMo or InstructLab. Automate the pipeline: data prep, training, evaluation, and model promotion. Document hyperparameters and data requirements for reproducibility.

**Model evaluation framework** establishes reusable benchmarks for fairness, robustness, and safety. For financial services, bias detection (e.g., across demographic segments) and adversarial robustness matter. Define pass/fail thresholds before deployment.

**Process redesign documentation** captures how business workflows change with AI integrated. Create before/after process maps showing handoffs, decision points, and human-in-the-loop steps. This supports change management and identifies where training is needed.

**KPI measurement** tracks each pilot against baselines. Metrics might include accuracy, precision/recall, latency, false positive rate, cost savings, or time-to-decision. Define KPIs upfront; retrofitting measurement is unreliable.

<!-- audience: internal -->
AI Incubator engagement. Value gate: 2–3 use cases proved end-to-end with measurable business KPIs met or exceeded. Risk: pilots chosen for visibility rather than feasibility—push back if use cases lack clear data or business owner commitment. Document lessons learned for scale readiness assessment; this informs the operationalize phase.
<!-- /audience -->
