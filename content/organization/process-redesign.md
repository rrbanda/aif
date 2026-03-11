# Process Redesign

Process redesign reimagines business processes around AI—not bolting AI onto existing workflows, but integrating it end-to-end with clear roles for humans and machines. Organizations that skip this step often see AI as a tool tacked on rather than a capability embedded in how work gets done.

## Approach

**Map the current process (as-is)** with business domain experts. Document steps, handoffs, decision points, and pain points. Identify where AI can change decisions, timing, or roles.

**Design the future process (to-be)** with AI integrated. Define what the model does (e.g., score, classify, extract) and what humans do (e.g., review, override, sign off). Specify human-in-the-loop checkpoints for regulated or high-stakes decisions.

**Pilot the new process** alongside the AI model. Run in parallel with the old process where possible; compare outcomes before full cutover. Measure before/after with process-level KPIs.

## Banking Examples

**Fraud investigation:** As-is—analyst manually reviews all flagged transactions from a rule-based system. To-be—AI model scores transactions; analyst reviews only high-confidence alerts with AI-provided context and explanation. Result: higher throughput, faster resolution, analyst focus on edge cases.

**Regulatory reporting:** As-is—manual document review, extraction, and compilation. To-be—AI extracts and classifies regulatory data; human reviews AI output for accuracy and signs off. Result: reduced manual effort, audit trail for AI-assisted decisions.

**Credit risk assessment:** As-is—standardized scorecard with manual overrides. To-be—AI model provides risk assessment with explainability; credit officer reviews with richer context. Result: more consistent decisions, better use of alternative data, preserved human judgment for exceptions.

## Human-in-the-Loop Checkpoints

In financial services, many decisions require human accountability. Define explicitly where humans must review, override, or approve. Document the rationale for each checkpoint—regulatory, risk, or operational—and design the UI and workflow to support it.


<!-- audience: internal -->

## Internal: Delivery Methodology

**Red Hat Services alignment:** Process redesign is a core Pilot phase activity (weeks 9-12+). Red Hat Consulting facilitates before/after workflow mapping alongside business process owners.

**Effort estimation:**
- Before/after process mapping per use case: 1-2 weeks
- Human-in-the-loop checkpoint design: 1 week per process
- Integration requirements documentation: 1 week

**Common pitfalls:**
- Redesigning process without business owner involvement — technology team alone cannot redesign business workflows
- Removing human oversight prematurely — regulated industries require human-in-the-loop for high-risk decisions
- Ignoring change management — new processes require training, communication, and incentive alignment
- Over-automating — not every step benefits from AI. Focus automation where human effort is high and AI accuracy is proven

<!-- /audience -->
