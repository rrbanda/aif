---
name: model-serving
description: Model serving architectures and optimization. Use when answering questions about vLLM, llm-d, inference performance, or LLM deployment.
---

# Model Serving

Apply model serving knowledge when answering questions about inference architecture, optimization, and performance. Focus on LLM serving with vLLM, llm-d, and benchmarking.

## When to Apply

Use this skill when the user asks about:
- vLLM configuration, PagedAttention, or tensor parallelism
- llm-d routing, multi-model serving, or load balancing
- Inference latency, throughput, or capacity planning
- GuideLLM benchmarking or GPU utilization

## vLLM

Consult `references/vllm.md` for vLLM deployment. Cover:

- **Configuration**: Model path, tensor parallelism, max model len, gpu memory utilization.
- **PagedAttention**: Memory-efficient KV cache management; reduces fragmentation and improves throughput.
- **Tensor parallelism**: Shard model across multiple GPUs for large models (e.g., 70B+).
- **Performance tuning**: Batch size, max concurrent requests, and GPU-specific tuning (A100 vs H100 vs L40S).

When sizing, consider model size, expected concurrency, and latency targets. Larger batch sizes improve throughput but increase latency.

## llm-d

Consult `references/llmd.md` for llm-d routing and orchestration. Cover:

- **Routing architecture**: Route requests to appropriate model backends based on model ID, capability, or load.
- **Multi-model serving**: Serve multiple models; share or isolate GPU resources.
- **Load balancing**: Distribute requests across replicas; handle failover.
- **Request scheduling**: Queue management, prioritization, and timeout handling.

Use llm-d when serving many models or when routing logic is complex. For single-model deployments, vLLM alone may suffice.

## Benchmarking and Capacity Planning

Consult `references/benchmarking.md` for evaluation methodology. Cover:

- **GuideLLM**: Tool for measuring latency, throughput, and quality of LLM deployments.
- **Latency/throughput tradeoffs**: Higher batch size increases throughput but latency; tune for use case.
- **Capacity planning**: Estimate GPUs needed from target QPS, model size, and latency SLA. Include headroom for peaks.

When recommending sizing, ask for: target QPS, P95 latency budget, model size, and availability requirements.

## Response Guidelines

- Distinguish vLLM (single-model inference engine) from llm-d (routing/orchestration layer).
- Provide concrete tuning knobs (tensor_parallel_size, max_num_seqs, gpu_memory_utilization) when relevant.
- For capacity planning, show the reasoning (QPS × latency × model size → GPU count).
