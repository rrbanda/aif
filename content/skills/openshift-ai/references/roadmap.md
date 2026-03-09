# OpenShift AI Roadmap and Version Highlights

## Recent and Upcoming RHOAI Features

OpenShift AI evolves with each release. Key themes:

- **Generative AI**: Gen AI Studio, RAG pipelines, and LLM serving have received significant investment.
- **Model serving**: llm-d routing, vLLM integration, and Model-as-a-Service improvements for production inference.
- **Governance**: Enhanced model registry, approval workflows, and lineage tracking.
- **Developer experience**: AI Hub expansion, notebook improvements, and pipeline templates.

## Version Comparison Highlights

### RHOAI 2.x vs 1.x

- **Unified experience**: 2.x consolidates data science and AI workloads into a single platform experience.
- **Gen AI Studio**: Introduced in 2.x for low-code generative AI development.
- **Model-as-a-Service**: Evolved from earlier inference patterns; improved scaling and multi-model support.
- **Operator model**: RHOAI 2.x uses operators for installation and lifecycle; aligns with OpenShift Operator Hub.

### Feature Availability by Version

- **AI Hub**: Available in recent versions; catalog content expands over time.
- **llm-d**: Newer addition for advanced LLM routing and load balancing.
- **GuideLLM**: Benchmarking tool for LLM evaluation; check version for availability.
- **MLflow**: Long-standing integration; feature parity with upstream MLflow improves with releases.

## Positioning for Customers

- For customers on older versions: Highlight upgrade path and new capabilities (Gen AI Studio, llm-d, improved MaaS).
- For net-new: Emphasize full stack (notebooks, training, serving, governance) and Kubernetes-native deployment.
- Avoid committing to specific release dates; use "planned," "upcoming," or "recent" for roadmap items.
