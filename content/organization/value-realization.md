# Value Realization

Value realization is the formal tracking of KPIs that connect factory outputs to business outcomes. Without it, AI Factory programs become infrastructure projects that never prove impact. Deloitte and similar research shows that programs that gate progression on measurable value achieve better outcomes.

## Metric Categories

**Deployment velocity:** Time from idea to production, number of models in production, deployment frequency. Measures factory throughput.

**Infrastructure efficiency:** GPU utilization rate, inference throughput, cost per model served. Measures platform economics.

**Model quality:** Accuracy/F1 scores, hallucination rates, grounding accuracy, drift detection frequency. Measures technical performance.

**Business impact:** Time saved (hours), cost reduction ($), revenue impact ($), false positive reduction (%). Measures outcomes that matter to the business.

**Adoption:** Teams using the factory, API calls per month, developer satisfaction score. Measures uptake and engagement.

**Governance:** Models with active monitoring (%), compliance audit pass rate, mean time to remediate issues. Measures risk and control.

## Value Gates

Gate progression between phases on defined criteria:

**Pilot → Operationalize:** Pilot use cases meet defined business KPIs (e.g., accuracy threshold, user acceptance).

**Operationalize → Scale-Adopt:** Production models running with governance and SLAs met (e.g., monitoring in place, incident response defined).

**Scale-Adopt → Operate-Improve:** Multiple teams active; measurable business impact documented (e.g., ROI calculated, case studies written).

Gates prevent advancing without evidence. They also create natural review points for the steering committee.

## Reporting Cadence

Report value metrics quarterly to the steering committee and in executive briefings. Maintain a dashboard for practitioners and program leads. Use metrics to prioritize—double down on what works, deprioritize or fix what does not.


<!-- audience: customer -->

## What Your Organization Needs to Build

Value realization is the mechanism that justifies continued investment. Without it, the AI Factory becomes an infrastructure cost center rather than a business value driver.

**Your responsibilities:**
- Capture baseline metrics before AI deployment (you cannot demonstrate improvement without before-state data)
- Define KPIs for each use case at the start — not retrofitted after deployment
- Report metrics quarterly to the Steering Committee with clear business impact narrative
- Use value gates to govern stage progression: do not advance without evidence of measurable progress

**Metric categories you should track:**

| Category | Example Metrics | Why It Matters |
|----------|----------------|----------------|
| **Business impact** | Cost savings ($), revenue impact, hours saved, error reduction | Justifies investment to executive sponsors |
| **Deployment velocity** | Time from idea to production, deployment frequency | Measures factory throughput and repeatability |
| **Model quality** | Accuracy, F1 score, drift frequency, hallucination rate | Ensures AI outputs meet quality standards |
| **Adoption** | Teams active, API calls/month, developer satisfaction | Measures organizational uptake |
| **Infrastructure efficiency** | GPU utilization, cost per inference, throughput | Measures platform economics |
| **Governance** | Models monitored (%), audit pass rate, remediation time | Demonstrates risk control |

**Value gates (progression criteria):**
- **Pilot to Operationalize**: Pilot use cases meet defined business KPIs
- **Operationalize to Scale**: Production models running with governance and SLAs met
- **Scale to Operate**: Multiple teams active with measurable, documented business impact

**Maturity indicators:**
- Baselines captured before every AI deployment
- Quarterly value reports are presented to the Steering Committee with decisions resulting
- Value gates are enforced — advancement without evidence is not permitted
- Business impact metrics (not just technical metrics) are the primary decision inputs

<!-- /audience -->

<!-- audience: internal -->

## Internal: Delivery Methodology

**Red Hat Services alignment:** Value realization tracking begins at Discovery (baseline metrics) and continues through TAM engagement. QVR presentations to the Steering Committee are the primary delivery vehicle.

**Effort estimation:**
- Baseline metrics capture: 1-2 weeks during Discovery
- Value tracking framework setup: 1 week
- Quarterly value reports: 2-3 days per report

**Common pitfalls:**
- Not capturing baselines — you cannot demonstrate improvement without before-state data
- Vanity metrics — "models deployed" is not business value. Focus on cost savings, revenue impact, risk reduction
- Delayed measurement — start tracking from pilot, not post-production
- Single metric — use a balanced scorecard: financial impact, operational efficiency, risk reduction, adoption

**Key to renewal:** Documented value realization is the primary input to subscription renewal decisions. If the customer cannot articulate the value, renewal is at risk. TAM ensures value is tracked and communicated continuously.

<!-- /audience -->
