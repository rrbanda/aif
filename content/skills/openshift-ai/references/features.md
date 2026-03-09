# OpenShift AI Platform Features

## AI Hub

AI Hub provides a curated catalog to accelerate AI adoption:

- **Models**: Pre-validated foundation models (e.g., Llama, Mistral) with metadata, licenses, and usage guidelines.
- **Datasets**: Sample datasets for experimentation and benchmarking.
- **Notebooks**: Jupyter notebooks and code samples for common workflows (fine-tuning, RAG, evaluation).
- **Quick start**: Reduces time-to-value by providing ready-to-use assets instead of manual setup.

## Model-as-a-Service (MaaS)

MaaS enables deployment and serving of models as API endpoints:

- **Multiple backends**: Supports vLLM, TGI (Text Generation Inference), and custom serving runtimes.
- **API compatibility**: OpenAI-compatible endpoints for easy integration with existing tooling.
- **Scaling**: Horizontal scaling based on demand; integration with OpenShift HPA.
- **Multi-model**: Deploy multiple models; route requests by model ID or endpoint.

## Gen AI Studio

Gen AI Studio offers a low-code interface for generative AI:

- **RAG pipelines**: Build retrieval-augmented generation flows with document ingestion, embedding, and retrieval.
- **Prompt engineering**: Experiment with prompts and model parameters in a UI.
- **Application templates**: Pre-built patterns for chatbots, summarization, and Q&A.
- **Integration**: Connects to MaaS endpoints and data sources.

## Feature Store

Centralized feature management for production ML:

- **Consistency**: Same features for training and inference; avoids training-serving skew.
- **Reuse**: Share features across teams and projects.
- **Lineage**: Track feature provenance and usage.
- **Integration**: Works with MLflow and training pipelines.

## Model Registry and MLflow

- **Model Registry**: Version models, attach metadata, and manage lifecycle (staging, production).
- **MLflow**: Experiment tracking, metric logging, and artifact storage. Native integration with OpenShift AI.
- **Governance**: Approval workflows, model cards, and audit trails.

## llm-d, LLM Compressor, GuideLLM

- **llm-d**: Routing and load-balancing for LLM serving; multi-model orchestration and request scheduling.
- **LLM Compressor**: Model compression (quantization, pruning) for efficient deployment.
- **GuideLLM**: Benchmarking and evaluation tool for LLM performance (latency, throughput, quality).
