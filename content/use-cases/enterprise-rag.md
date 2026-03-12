# Enterprise RAG

Enterprise Retrieval-Augmented Generation (RAG) grounds AI responses in the organization's proprietary data — policies, procedures, research, regulatory guidance, and institutional knowledge. Unlike generic LLM responses, enterprise RAG produces answers that are grounded in verified, organization-specific documents with citation trails.

The RAG pipeline handles document ingestion, chunking, and embedding. Documents are converted into vector representations and stored in on-premises vector databases (pgvector, Milvus). Foundation models serve as the generation layer, producing responses that reference retrieved context.

Red Hat AI Factory provides the orchestration layer: document pipelines that ingest from SharePoint, Confluence, regulatory databases, and internal knowledge bases. Governance controls ensure that access policies are respected — a user can only retrieve documents they are authorized to see. Every query and response is logged for compliance.

## Why On-Premises

Enterprise documents contain confidential information: internal policies, unreleased research, legal opinions, competitive analysis, and customer data. Cloud-based RAG services introduce data residency risk and make audit compliance significantly more complex. For regulated industries — financial services, healthcare, government — on-premises RAG is non-negotiable.

## Architecture

The RAG pipeline consists of four components deployed entirely on the AI Factory platform:

1. **Document ingestion** — Retrieval framework processes documents from source systems, chunks them, and generates embeddings
2. **Vector store** — On-premises vector database stores embeddings with metadata for access control
3. **Retrieval** — Semantic search retrieves relevant document chunks for each query
4. **Generation** — Foundation model (served via Red Hat AI Inference Server or partner runtimes) generates responses grounded in retrieved context

## Use Cases by Industry

**Financial services** — Regulatory Q&A over internal policy libraries. Automated compliance checking against Basel III, Dodd-Frank, PCI DSS. Research synthesis from analyst reports and market data.

**Healthcare** — Clinical protocol lookup. Drug interaction checking against institutional formulary. Medical literature search grounded in institutional practice guidelines.

**Legal** — Contract analysis with reference to precedent. Regulatory filing preparation with citation to prior submissions. Policy interpretation with organizational context.

**Operations** — IT helpdesk with access to runbooks and knowledge base. HR policy Q&A. Procurement and vendor management documentation search.

<!-- audience: customer -->

## Expected Business Outcomes

| Metric | Typical Improvement | How It Is Measured |
|--------|--------------------|--------------------|
| Answer accuracy | 85-95% faithfulness score | Percentage of responses grounded in retrieved documents (vs. hallucinated) |
| Query response time | Sub-5 seconds for most queries | End-to-end latency from question to cited answer |
| Document coverage | 80-95% of knowledge base indexed | Percentage of target document corpus ingested and searchable |
| Time savings | 30-60% reduction in information search time | Self-reported or measured time for knowledge workers to find answers |

## Is This Right for Your Organization?

This use case is a strong fit if your organization:
- Has a significant document corpus (policies, procedures, research, regulatory guidance) that employees need to search and reference
- Currently relies on keyword search, email, or tribal knowledge to find information
- Cannot send internal documents to cloud-based AI services due to confidentiality, regulatory, or data residency requirements
- Wants a high-impact first AI use case that demonstrates the platform quickly (4-6 weeks to working prototype)
- Has identifiable user communities who will benefit immediately (compliance, legal, operations, HR, IT)

## Your Data Requirements

- **Document corpus**: PDF, Word, HTML, or plaintext documents from target knowledge bases (100GB-1TB typical for enterprise knowledge bases)
- **Source system access**: Permissions to ingest from document management systems (SharePoint, Confluence, file shares, regulatory databases)
- **Access control metadata**: Document-level permissions to ensure retrieval respects authorization policies (users only see documents they are authorized to access)
- **Evaluation data**: 50-100 question-answer pairs for measuring retrieval accuracy and answer quality

## Implementation Timeline

| Stage | Duration | What Happens |
|-------|----------|-------------|
| Document ingestion pipeline | 2-3 weeks | Source system connectors, chunking strategy, embedding model deployment |
| Vector store and retrieval setup | 1-2 weeks | On-premises vector database deployment, index optimization, access control integration |
| Generation layer | 1-2 weeks | Foundation model serving, prompt engineering, citation formatting |
| User testing and rollout | 1-2 weeks | User acceptance with target community, feedback iteration, production deployment |

Enterprise RAG is the fastest path to demonstrating AI Factory value — a working prototype in 4-6 weeks from platform readiness.

<!-- /audience -->

<!-- audience: internal -->

## Internal: Deal Positioning

**Red Hat AI Factory advantage:** On-prem RAG with full governance is the strongest entry point for enterprise GenAI. Every organization has documents they cannot send to cloud services. Position RAG as the "first GenAI win" that proves the platform.

**Competitive differentiation:**
- Azure OpenAI + AI Search: Cloud-hosted, data leaves the org. Azure Search indexing costs scale with document volume.
- AWS Bedrock Knowledge Bases: S3-based, no on-prem option. Limited vector store options.
- Google Vertex AI RAG: Cloud-only. Strong retrieval but tied to Google Cloud storage.
- Red Hat AI Factory: Full on-prem pipeline — document retrieval framework, on-prem vector store, production model serving, governance controls. Partner technology options: NVIDIA NeMo Retriever + NIM, or open-source alternatives (LangChain, LlamaIndex) with vLLM serving.

**Sizing:** 1-2 GPU nodes for embedding + generation. Storage scales with document corpus (typically 100GB-1TB for enterprise knowledge base).

**Quick win timeline:** 4-6 weeks from platform readiness to working RAG prototype. Fastest path to demonstrating AI Factory value.

<!-- /audience -->
