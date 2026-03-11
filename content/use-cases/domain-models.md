# Domain-Specific Models

Generic foundation models — trained on broad internet and book corpora — underperform on specialized tasks. Credit risk assessment, equities research, AML pattern detection, clinical NLP, and regulatory interpretation require domain vocabulary, numerical reasoning, and institutional context that base models lack. **Fine-tuned foundation models** address this gap: continued pre-training or supervised fine-tuning on proprietary data produces models that the organization owns and that competitors cannot replicate.

**Financial services** models benefit from fine-tuning on internal default histories, credit policy documents, underwriting guidelines, earnings transcripts, and analyst reports. The model learns institution-specific risk factors, segment definitions, and decision logic.

**Healthcare** models fine-tuned on clinical notes, pathology reports, and treatment protocols can extract structured data from unstructured records, support clinical decision-making, and automate documentation — while maintaining HIPAA compliance through on-premises training and serving.

**Industrial** models trained on equipment telemetry, maintenance logs, and failure records detect degradation patterns invisible to rule-based systems and predict failures before they cause downtime.

**Competitive advantage** comes from proprietary data. The more unique the training corpus — internal policies, historical decisions, proprietary research — the more differentiated the model. These assets cannot leave the organization; fine-tuning must run on-premises.

**Model reuse** across teams amplifies ROI. A credit risk model fine-tuned for underwriting may serve collections, portfolio management, and stress testing. A clinical NLP model may support documentation, coding, and quality reporting. Design fine-tuning pipelines for modularity and reuse.

<!-- audience: internal -->

## Internal: Deal Positioning

**Why AI Factory wins here:** Domain-specific models require proprietary data fine-tuning on-premises — the data cannot leave the organization. This is the strongest competitive moat argument: "Your data is your moat. Fine-tune on it, own the result."

**Competitive differentiation:**
- OpenAI fine-tuning: Data goes to OpenAI. Model is hosted by OpenAI. No data sovereignty.
- Azure OpenAI fine-tuning: Better data control than OpenAI but still Azure-hosted.
- Databricks Mosaic: Good fine-tuning tooling but inference serving is less mature.
- Red Hat AI Factory: Full pipeline — InstructLab or NeMo for fine-tuning, NIM for serving, model registry for governance, all on-premises.

**Fine-tuning infrastructure requirements:**
- SFT (Supervised Fine-Tuning): 2-4 GPUs (A100/H100) for 8B models, 8+ GPUs for 34B models
- OSFT (Open-Source Fine-Tuning via InstructLab): Lower GPU requirements, iterative alignment
- Training data: 1,000-50,000 examples per domain (quality > quantity)
- Training time: Hours to days depending on model size and data volume

**Expansion strategy:** Domain models are the land-and-expand engine. First model proves value; subsequent models for other teams/departments justify additional GPU nodes and subscriptions.

<!-- /audience -->
