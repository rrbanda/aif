# Phase 0: Discovery & Assessment

**Duration:** 4–6 weeks

Discovery establishes the foundation for the entire AI Factory program. Without a clear picture of current state, use case feasibility, and organizational readiness, subsequent phases risk misalignment or rework.

## What Happens in This Phase

**AI workload assessment** inventories existing and planned AI/ML initiatives across the organization. Classify each workload by data sensitivity, latency requirements, and regulatory constraints. This surfaces dependencies and conflicts early—for example, workloads requiring real-time inference versus batch scoring have different platform needs.

**Infrastructure audit** evaluates your existing OpenShift clusters for AI readiness. Assess GPU capacity (current and planned), networking (bandwidth for distributed training, latency for inference), and storage (throughput for large datasets). On-premises financial services environments often have strict network segmentation; document these constraints now.

**AI maturity assessment** maps your current practices against industry benchmarks. Evaluate data science workflows, tooling, governance, and skills. Gaps here inform the change management and training plan.

**Use case identification and prioritization** produces a scored portfolio. Criteria typically include business value, data availability, technical feasibility, regulatory risk, and time-to-value. Resist the urge to pursue every idea—focus on 2–3 high-impact, feasible pilots for the first cycle.

**Stakeholder mapping and program charter** lock in executive sponsorship, technical leads, data owners, and compliance contacts. The charter defines scope, timeline, success criteria, governance, and resource commitments. Without signed sponsorship, programs stall when priorities shift.

## AI Factory Readiness Assessment

Discovery should include a structured readiness assessment across five dimensions: data infrastructure, organizational maturity, team composition, infrastructure readiness, and use case pipeline. See the [Readiness Assessment Framework](../reference/readiness-assessment.md) for the full assessment model, scoring criteria, and recommended starting phase based on results.

## Common Failure Modes to Watch For

88% of AI pilots fail to reach production (IDC/Lenovo 2024). Discovery is where you identify and mitigate the root causes early:

- **Data silos** — Fragmented data ownership prevents the unified data layer the AI Factory requires. If each department controls its own data with different governance standards, surface this now.
- **Governance as afterthought** — Organizations that defer compliance and ethics considerations discover they need to retrofit controls into architectures never designed for them. Embed governance in Phase 0 scoping.
- **Infrastructure underprovisioning** — GPU and compute capacity insufficient for training loads creates bottlenecks that cascade through the entire pipeline. Forecast based on growth, not current workloads.
- **Talent and skills gap** — 61% of enterprise workers have spent less than 5 hours learning about AI (HBR Nov 2025). The factory cannot run when the workforce has not been equipped to operate it. Plan bootcamps early.
- **Missing executive sponsorship** — Without signed-off program charter with budget authority, programs stall when priorities shift. Non-negotiable for Phase 0 exit.

<!-- audience: internal -->
**Red Hat AI Discovery + AI Assessment** is the standard engagement for this phase. Position it as a fixed-scope, time-boxed engagement. Deliverables: workload assessment report, infrastructure audit, AI maturity assessment, prioritized use case portfolio, stakeholder map, and program charter. Use the value gate—"use case portfolio scored and prioritized; program charter signed by executive sponsors"—as the exit criterion. Escalate early if executive sponsorship is weak or if data readiness appears significantly lower than expected.
<!-- /audience -->
