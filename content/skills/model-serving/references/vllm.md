# vLLM Configuration and Tuning

## vLLM Overview

vLLM is a high-throughput inference engine for LLMs. Key differentiators:

- **PagedAttention**: Manages KV cache in non-contiguous "pages," reducing memory fragmentation and enabling larger batch sizes.
- **Continuous batching**: Dynamically batches requests; completes and returns results as they finish rather than waiting for full batch.
- **High throughput**: Optimized for throughput-critical workloads (e.g., batch inference, high-QPS APIs).

## Configuration Parameters

- **tensor_parallel_size**: Number of GPUs for tensor parallelism. Use for models that don't fit on a single GPU (e.g., 70B on 2–4 A100s).
- **max_model_len**: Maximum sequence length. Larger values increase memory; set based on use case.
- **gpu_memory_utilization**: Fraction of GPU memory for model and KV cache (default ~0.9). Lower if OOM; higher for smaller models.
- **max_num_seqs**: Max concurrent sequences per batch. Higher improves throughput; too high can cause OOM or latency spikes.

## PagedAttention

- **Problem**: Standard attention allocates contiguous KV cache per sequence; leads to fragmentation and underutilization.
- **Solution**: PagedAttention stores KV cache in blocks; sequences share physical memory more efficiently.
- **Benefit**: Higher throughput, support for longer sequences, better GPU utilization.

## Tensor Parallelism

- **When**: Models too large for single GPU (e.g., Llama 70B on A100 80GB).
- **How**: Shard model layers across GPUs; communication via NCCL.
- **Scaling**: 2–8 GPUs typical; beyond 8, consider pipeline parallelism or model parallelism.
- **Latency**: Tensor parallel adds communication overhead; minimize cross-GPU links (prefer NVLink).

## Performance Tuning by GPU Type

- **A100 80GB**: Workhorse for 7B–70B models. Use MIG for multi-tenant if needed.
- **H100**: Faster than A100; better for latency-sensitive or very large models. Support for FP8.
- **L40S**: Good for 7B–13B; cost-effective for smaller models. Lower memory bandwidth than A100.
- **A10G**: Smaller models (7B); budget option. Lower throughput.

Tune `gpu_memory_utilization` and `max_num_seqs` per GPU type; H100 can often sustain higher utilization.
