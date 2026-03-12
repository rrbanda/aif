# Stage 6: Operate & Improve

**Duration:** Ongoing

Operate & Improve is the steady-state stage. The factory runs continuously; this stage ensures it stays healthy, evolves with business needs, and delivers sustained value. The cost of AI inference falls roughly 10x every 12 months — organizations that own their factory infrastructure capture this cost curve directly.

## What Happens in This Stage

**AIOps for the factory itself** applies AI to platform operations: model drift detection, pipeline health prediction, and GPU utilization optimization. Use anomaly detection on metrics to surface issues before they impact users. Automate capacity recommendations based on usage trends.

**Continuous improvement** includes model retraining triggers (schedule, drift threshold, or performance degradation), data refresh cycles, and platform upgrades. Maintain a backlog of technical debt and platform evolution items. Prioritize based on risk and business impact.

**Quarterly value reviews** with the steering committee assess ROI, adoption metrics, and strategic alignment. Present case studies, cost savings, and lessons learned. Use these sessions to adjust roadmap and resource allocation. Document decisions and action items.

**Knowledge base and pattern library** capture reusable solutions: model architectures, pipeline templates, governance patterns, and troubleshooting guides. Encourage contributions from all teams. Reduces onboarding time and prevents repeated mistakes.

**Platform evolution roadmap** plans major upgrades: new model types, tooling changes, OpenShift version upgrades, and security patches. Communicate roadmap to consumers and coordinate maintenance windows. Avoid surprise breaking changes.

**Support and partnership model** defines how Red Hat Technical Account Management and Support interact with the platform team. Establish escalation paths, regular check-ins, and proactive health reviews. Align support level with production criticality.

<!-- audience: customer -->

## Your Commitments

Operate & Improve is the steady state. Your organization now owns and operates the factory; the focus shifts to sustained value delivery, continuous improvement, and strategic evolution.

| Role | Time Commitment | Purpose |
|------|----------------|---------|
| **ML platform engineering team** | Ongoing (permanent function) | Platform health, upgrades, capacity management, incident response |
| **AI Center of Excellence** | Ongoing | Standards evolution, model catalog maintenance, cross-team consulting |
| **Steering Committee** | Quarterly reviews | Strategic direction, budget allocation, value realization assessment |
| **FinOps / Finance** | Monthly | Cost tracking, GPU utilization optimization, chargeback reporting |
| **Executive sponsor** | Quarterly reviews | Strategic alignment, budget decisions, organizational mandate |

## What You Receive

| Deliverable | What It Contains |
|-------------|-----------------|
| **AIOps monitoring** | AI-driven monitoring of the factory itself — model drift detection, pipeline health prediction, GPU utilization optimization |
| **Quarterly value review package** | ROI analysis, adoption metrics, cost trends, and strategic recommendations presented to steering committee |
| **Knowledge base and pattern library** | Reusable solutions: model architectures, pipeline templates, governance patterns, troubleshooting guides |
| **Platform evolution roadmap** | Planned upgrades: new model types, tooling changes, hardware refresh cycles, security patches |
| **Support and escalation framework** | Defined support tiers, escalation paths, SLAs, and proactive health review schedule |

## Readiness Checklist

Before entering Operate & Improve, confirm:

- [ ] Multiple use cases are in production across multiple business units
- [ ] MLOps pipelines are handling automated retraining, evaluation, and promotion
- [ ] Governance gates are enforcing consistently across all production models
- [ ] Adoption dashboard shows sustained and growing usage
- [ ] Platform engineering team is self-sufficient for day-to-day operations
- [ ] Steering committee is meeting regularly and receiving value reports
- [ ] Support model (TAM, vendor support, internal SRE) is defined and operational

## What to Expect

The factory is now a core enterprise capability. Expect ongoing investment in platform evolution (hardware refresh cycles, new model architectures, OpenShift version upgrades) and organizational maturation (new team onboarding, skills development, governance refinement). The cost of AI inference falls roughly 10x every 12 months — organizations that own their factory infrastructure capture this cost curve directly rather than paying cloud markup. Quarterly value reviews are the mechanism for demonstrating sustained ROI and securing continued investment.

<!-- /audience -->

<!-- audience: internal -->

## Internal: Delivery Methodology

**Red Hat Services alignment:** Operate & Improve is the steady-state TAM engagement. Quarterly value reviews with the steering committee are led jointly by the AE, TAM, and Field CTO. This is where subscription renewals are justified and expansion opportunities surface.

**Resource estimation:**
- Red Hat TAM: Ongoing (bi-weekly check-ins, quarterly value reviews)
- Red Hat Consulting: On-demand for platform upgrades, new GPU hardware integration, or complex capacity planning
- Red Hat Support: Production-level support with defined SLAs

**Revenue protection and expansion:**
- Annual subscription renewal is the baseline — TAM ensures value realization is documented and communicated to executive sponsors
- Quarterly value reviews surface expansion opportunities (new use cases, new teams, GPU refresh)
- Platform upgrade cycles (OpenShift versions, GPU operator updates, new inference runtime releases) create consulting engagement opportunities
- Hardware refresh cycles (next-gen accelerators from any partner) are natural expansion triggers

**Common objections and responses:**
- *"We can operate this ourselves now"* — Validate that the customer has sufficient platform engineering depth. Most customers underestimate the ongoing effort for GPU driver updates, model serving optimization, security patching, and capacity planning. TAM provides insurance and expertise.
- *"Budget pressure is reducing AI investment"* — Focus QVR on measurable outcomes: cost savings, revenue impact, risk reduction, time saved. If KPIs were tracked from pilot stage, the data speaks for itself.
- *"We're evaluating cloud alternatives for cost reduction"* — Run TCO comparison showing on-prem AI Factory cost trajectory vs. cloud GPU hourly pricing at scale. The 10x annual inference cost reduction favors owned infrastructure.

**Key retention metric:** Customer NPS and executive sponsor engagement. If executive sponsor changes or disengages, immediate escalation via Field CTO to re-establish sponsorship.

<!-- /audience -->
