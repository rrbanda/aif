# Domain-Specific Models

Generic foundation models — trained on broad internet and book corpora — underperform on specialized tasks. Credit risk assessment, equities research, AML pattern detection, clinical NLP, and regulatory interpretation require domain vocabulary, numerical reasoning, and institutional context that base models lack. **Fine-tuned foundation models** address this gap: continued pre-training or supervised fine-tuning on proprietary data produces models that the organization owns and that competitors cannot replicate.

**Financial services** models benefit from fine-tuning on internal default histories, credit policy documents, underwriting guidelines, earnings transcripts, and analyst reports. The model learns institution-specific risk factors, segment definitions, and decision logic.

**Healthcare** models fine-tuned on clinical notes, pathology reports, and treatment protocols can extract structured data from unstructured records, support clinical decision-making, and automate documentation — while maintaining HIPAA compliance through on-premises training and serving.

**Industrial** models trained on equipment telemetry, maintenance logs, and failure records detect degradation patterns invisible to rule-based systems and predict failures before they cause downtime.

**Competitive advantage** comes from proprietary data. The more unique the training corpus — internal policies, historical decisions, proprietary research — the more differentiated the model. These assets cannot leave the organization; fine-tuning must run on-premises.

**Model reuse** across teams amplifies ROI. A credit risk model fine-tuned for underwriting may serve collections, portfolio management, and stress testing. A clinical NLP model may support documentation, coding, and quality reporting. Design fine-tuning pipelines for modularity and reuse.

<!-- audience: customer -->

## Expected Business Outcomes

| Metric | Typical Improvement | How It Is Measured |
|--------|--------------------|--------------------|
| Domain task accuracy | 15-40% over generic models | Task-specific benchmarks (credit scoring AUC, NLP F1 score, classification accuracy) |
| Model reuse across teams | 3-5 consuming teams per model | Number of downstream applications using the fine-tuned model via MaaS |
| Time to deploy new domain capability | 4-6 weeks (vs. 3-6 months building from scratch) | Calendar time from fine-tuning start to production serving |
| Inference cost per query | 30-60% lower than large generic models | Cost comparison: fine-tuned 8B model vs. generic 70B+ model for equivalent accuracy |

## Is This Right for Your Organization?

This use case is a strong fit if your organization:
- Has domain-specific language, terminology, or reasoning that generic models handle poorly
- Possesses proprietary data that creates competitive advantage when embedded in models (credit histories, clinical records, equipment telemetry, regulatory interpretations)
- Needs AI accuracy that exceeds what off-the-shelf models deliver for your specific tasks
- Wants to own the model rather than depend on a third-party vendor's model and pricing
- Cannot send proprietary training data to external fine-tuning services

## Your Data Requirements

- **Training data**: 1,000-50,000 labeled examples per domain task (quality matters more than volume)
- **Domain documentation**: Policies, procedures, guidelines that encode institutional knowledge
- **Evaluation benchmarks**: Gold-standard test sets with human-validated labels for measuring improvement
- **Subject matter experts**: Available for training data curation, evaluation criteria definition, and output review

## Implementation Timeline

| Stage | Duration | What Happens |
|-------|----------|-------------|
| Training data curation | 2-4 weeks | SME-guided data selection, labeling, quality review |
| Fine-tuning | 1-2 weeks | Supervised fine-tuning or InstructLab alignment on your data |
| Evaluation and benchmarking | 1-2 weeks | Performance comparison against generic baseline, bias and safety checks |
| Production deployment | 1-2 weeks | Model registry promotion, governance gate approval, API endpoint provisioning |

<!-- /audience -->

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
