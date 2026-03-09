# Domain-Specific Models

Generic foundation models—trained on broad internet and book corpora—underperform on specialized financial tasks. Credit risk assessment, equities research, AML pattern detection, and regulatory interpretation require domain vocabulary, numerical reasoning, and institutional context that base models lack. **Fine-tuned foundation models** address this gap: continued pre-training or supervised fine-tuning on proprietary data produces models that the organization owns and that competitors cannot replicate.

**Credit risk** models benefit from fine-tuning on internal default histories, credit policy documents, and underwriting guidelines. The model learns institution-specific risk factors, segment definitions, and decision logic. **Equities research** models ingest earnings transcripts, analyst reports, and market commentary to generate summaries, sentiment analysis, and thematic insights aligned with the research team's methodology.

**AML pattern detection** combines traditional rule-based systems with neural models trained on confirmed SAR (Suspicious Activity Report) cases and typology descriptions. The model learns to flag transaction patterns that resemble known money laundering typologies while reducing false positives from rule-only systems. **Regulatory interpretation** models are fine-tuned on internal compliance memos, regulatory FAQs, and enforcement actions to answer "how does this rule apply to our situation?" with citations to authoritative sources.

**Competitive advantage** comes from proprietary data. The more unique the training corpus—internal policies, historical decisions, proprietary research—the more differentiated the model. These assets cannot leave the organization; fine-tuning must run on-premises.

**Model reuse** across teams amplifies ROI. A credit risk model fine-tuned for underwriting may serve collections, portfolio management, and stress testing. An AML model may support sanctions screening and KYC automation. Design fine-tuning pipelines for modularity and reuse.

<!-- audience: internal -->
Domain models typically emerge in Scale & Adopt phase after platform and pilots are proven. Fine-tuning costs (GPU hours, data prep) are significant—prioritize use cases with clear ROI. Track model reuse metrics: how many teams consume each fine-tuned model? Reuse drives down cost per query and justifies continued investment.
<!-- /audience -->
