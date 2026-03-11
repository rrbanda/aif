# Stage 0: Discovery & Assessment

**Duration:** 4–6 weeks

Discovery establishes the foundation for the entire AI Factory. Without a clear picture of current state, use case feasibility, and organizational readiness, subsequent stages risk misalignment or rework.

## Why This Stage Matters

88% of AI pilots fail to reach production (IDC/Lenovo 2024). Discovery is where you identify and mitigate the root causes before investing in platform and models. Organizations that skip or rush discovery typically discover the same problems later — at much higher cost.

## What Happens in This Stage

**AI workload assessment** inventories existing and planned AI/ML initiatives across the organization. Classify each workload by data sensitivity, latency requirements, and regulatory constraints. This surfaces dependencies and conflicts early — for example, workloads requiring real-time inference versus batch scoring have different platform needs.

**Infrastructure audit** evaluates your existing OpenShift clusters for AI readiness. Assess GPU capacity (current and planned), networking (bandwidth for distributed training, latency for inference), and storage (throughput for large datasets). On-premises environments often have strict network segmentation; document these constraints now.

**AI maturity assessment** maps your current practices against industry benchmarks. Evaluate data science workflows, tooling, governance, and skills. 61% of enterprise workers have spent less than 5 hours learning about AI (Harvard Business Review, Nov 2025). Gaps here inform the change management and training plan.

**Use case identification and prioritization** produces a scored portfolio. Criteria typically include business value, data availability, technical feasibility, regulatory risk, and time-to-value. Resist the urge to pursue every idea — focus on 2–3 high-impact, feasible pilots for the first cycle.

**Stakeholder mapping and program charter** lock in executive sponsorship, technical leads, data owners, and compliance contacts. The charter defines scope, timeline, success criteria, governance, and resource commitments. Without signed sponsorship, programs stall when priorities shift.

## AI Factory Readiness Assessment

Discovery should include a structured readiness assessment across five dimensions: data infrastructure, organizational maturity, team composition, infrastructure readiness, and use case pipeline. See the [Readiness Assessment Framework](../reference/readiness-assessment.md) for the full assessment model, scoring criteria, and recommended starting stage based on results.

## Common Failure Modes

- **Data silos** — Fragmented data ownership prevents the unified data layer the AI Factory requires. If each department controls its own data with different governance standards, surface this now.
- **Governance as afterthought** — Organizations that defer compliance and ethics considerations discover they need to retrofit controls into architectures never designed for them. Embed governance in Stage 0 scoping.
- **Infrastructure underprovisioning** — GPU and compute capacity insufficient for training loads creates bottlenecks that cascade through the entire pipeline. Forecast based on growth, not current workloads.
- **Talent and skills gap** — The factory cannot run when the workforce has not been equipped to operate it. Plan bootcamps early.
- **Missing executive sponsorship** — Without a signed program charter with budget authority, programs stall when priorities shift. Non-negotiable for Stage 0 exit.

<!-- audience: internal -->

## Internal: Delivery Methodology

**Red Hat Services alignment:** Discovery maps directly to weeks 1-4 of the Red Hat Services Starter Package. Red Hat Consulting leads the assessment workshops, with NVIDIA expertise accessed for GPU sizing and architecture validation.

**Resource estimation:**
- Red Hat Consulting: 2 consultants, 4 weeks (160 hours)
- Customer commitment: Technical lead + executive sponsor availability for workshops
- Typical deliverable set: Workload assessment, infrastructure audit, maturity assessment, use case portfolio, program charter

**Common objections and responses:**
- *"We already know our use cases"* — Discovery validates assumptions. Most customers discover 30-40% of initially proposed use cases are not feasible at scale. Better to learn now than in pilot.
- *"We don't need a full assessment"* — Abbreviated discovery leads to platform misfit. Infrastructure gaps surface during deployment, causing delays and rework.
- *"Can we skip to platform deployment?"* — Without discovery, platform architecture decisions lack data. GPU sizing, network topology, and storage design depend on workload analysis.

**Competitive context:**
- AWS/Azure skip discovery — they want you on cloud ASAP. This leads to oversized cloud spend and later migration pain.
- Databricks focuses narrowly on data/MLOps, missing organizational readiness entirely.
- Red Hat AI Factory discovery is holistic: technical + organizational + data + governance.

**Key deal stage:** Discovery is the entry point. Close consulting SOW for Services Starter Package. Position as low-risk, high-insight investment before major platform commitment.

<!-- /audience -->
