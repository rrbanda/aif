# Stage 3: Pilot & Incubation

**Duration:** 8–12 weeks

Pilots prove the end-to-end value of the AI Factory before scaling. Select 2–3 use cases, deliver them fully, and measure against defined KPIs. This is where the factory produces its first outputs.

## What Happens in This Stage

**Pilot use case execution** runs selected workloads (e.g., fraud detection, regulatory document analysis, clinical NLP, predictive maintenance) from data ingestion through production inference. Each pilot must complete the full lifecycle — data pipeline, model training or fine-tuning, evaluation, deployment, and integration with business workflows.

**Fine-tuning pipelines** support domain adaptation of foundation models. Implement supervised fine-tuning (SFT) and open-source fine-tuning (OSFT) using NeMo or InstructLab. Automate the pipeline: data prep, training, evaluation, and model promotion. Document hyperparameters and data requirements for reproducibility.

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
