# Enterprise RAG

Enterprise Retrieval-Augmented Generation (RAG) grounds AI responses in the organization's proprietary data — policies, procedures, research, regulatory guidance, and institutional knowledge. Unlike generic LLM responses, enterprise RAG produces answers that are grounded in verified, organization-specific documents with citation trails.

**NVIDIA NeMo Retriever** handles document ingestion, chunking, and embedding. Documents are converted into vector representations and stored in on-premises vector databases (pgvector, Milvus). **Nemotron** or other foundation models serve as the generation layer, producing responses that reference retrieved context.

Red Hat AI Factory provides the orchestration layer: document pipelines that ingest from SharePoint, Confluence, regulatory databases, and internal knowledge bases. Governance controls ensure that access policies are respected — a user can only retrieve documents they are authorized to see. Every query and response is logged for compliance.

## Why On-Premises

Enterprise documents contain confidential information: internal policies, unreleased research, legal opinions, competitive analysis, and customer data. Cloud-based RAG services introduce data residency risk and make audit compliance significantly more complex. For regulated industries — financial services, healthcare, government — on-premises RAG is non-negotiable.

## Architecture

The RAG pipeline consists of four components deployed entirely on the AI Factory platform:

1. **Document ingestion** — NeMo Retriever processes documents from source systems, chunks them, and generates embeddings
2. **Vector store** — On-premises vector database stores embeddings with metadata for access control
3. **Retrieval** — Semantic search retrieves relevant document chunks for each query
4. **Generation** — Foundation model (served via NIM) generates responses grounded in retrieved context

## Use Cases by Industry

**Financial services** — Regulatory Q&A over internal policy libraries. Automated compliance checking against Basel III, Dodd-Frank, PCI DSS. Research synthesis from analyst reports and market data.

**Healthcare** — Clinical protocol lookup. Drug interaction checking against institutional formulary. Medical literature search grounded in institutional practice guidelines.

**Legal** — Contract analysis with reference to precedent. Regulatory filing preparation with citation to prior submissions. Policy interpretation with organizational context.

**Operations** — IT helpdesk with access to runbooks and knowledge base. HR policy Q&A. Procurement and vendor management documentation search.

<!-- audience: internal -->

## Internal: Deal Positioning

**Red Hat AI Factory advantage:** On-prem RAG with full governance is the strongest entry point for enterprise GenAI. Every organization has documents they cannot send to cloud services. Position RAG as the "first GenAI win" that proves the platform.

**Competitive differentiation:**
- Azure OpenAI + AI Search: Cloud-hosted, data leaves the org. Azure Search indexing costs scale with document volume.
- AWS Bedrock Knowledge Bases: S3-based, no on-prem option. Limited vector store options.
- Google Vertex AI RAG: Cloud-only. Strong retrieval but tied to Google Cloud storage.
- Red Hat AI Factory: Full on-prem pipeline — NeMo Retriever, on-prem vector store, NIM serving, governance controls.

**Sizing:** 1-2 GPU nodes for embedding + generation. Storage scales with document corpus (typically 100GB-1TB for enterprise knowledge base).

**Quick win timeline:** 4-6 weeks from platform readiness to working RAG prototype. Fastest path to demonstrating AI Factory value.

<!-- /audience -->
