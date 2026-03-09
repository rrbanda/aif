# GPU Topologies for AI Factory

## A100 Configurations

- **A100 80GB SXM**: 80GB HBM2e, 2 TB/s memory bandwidth. Workhorse for 7B–70B models. SXM has NVLink for multi-GPU.
- **A100 80GB PCIe**: Same memory; PCIe form factor. Slightly lower bandwidth than SXM; fits standard servers.
- **A100 40GB**: Smaller memory; suitable for 7B–13B. Lower cost.
- **MIG**: A100 supports Multi-Instance GPU—partition into 1g.5gb, 2g.10gb, 3g.20gb, 4g.40gb, 7g.80gb. Use for multi-tenant or smaller models.

## H100 Configurations

- **H100 80GB SXM**: Next-gen; higher compute and memory bandwidth than A100. FP8 support for faster inference.
- **H100 80GB PCIe**: PCIe variant for standard servers.
- **Use cases**: Latency-sensitive inference, very large models, or when maximum throughput is critical. Premium pricing.

## L40S

- **L40S 48GB**: Ada Lovelace architecture. Good for 7B–13B inference; cost-effective.
- **Use cases**: Smaller models, batch inference, or budget-conscious deployments. Lower memory bandwidth than A100.

## MIG (Multi-Instance GPU) Partitioning

- **Purpose**: Share single GPU across multiple workloads. Useful for dev/staging or low-QPS production.
- **Partitions**: 1g.5gb (smallest) to 7g.80gb (full GPU). Choose based on model size and memory need.
- **Tradeoff**: MIG adds overhead; full GPU preferred for high-throughput production. MIG good for isolation and resource efficiency in multi-tenant.

## DGX vs. Commodity Servers

- **DGX**: NVIDIA-designed systems (e.g., DGX A100, DGX H100). Optimized NVLink/InfiniBand, pre-tuned. Premium price; fastest time-to-value.
- **Commodity**: Standard servers with GPU cards. More flexibility; lower cost. Requires more tuning (drivers, networking, cooling).
- **Recommendation**: DGX for customers who want turnkey; commodity for those with strong hardware teams or cost sensitivity.
