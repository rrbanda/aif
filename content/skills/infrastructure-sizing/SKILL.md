---
name: infrastructure-sizing
description: Infrastructure sizing for AI Factory deployments. Use when answering questions about GPU topologies, networking, storage, or capacity planning for AI workloads.
---

# Infrastructure Sizing

Apply infrastructure sizing knowledge when answering questions about AI Factory hardware, networking, and storage. Focus on GPU configurations, network requirements, and storage for datasets and models.

## When to Apply

Use this skill when the user asks about:
- GPU selection (A100, H100, L40S), MIG, or DGX vs. commodity servers
- RDMA, InfiniBand, GPUDirect, or networking for distributed training
- Object storage, PVCs, or storage throughput for AI workloads

## GPU Topologies

Consult `references/gpu_topologies.md` for GPU options. Cover:

- **A100, H100, L40S**: Use cases, memory, and typical model fit (7B, 70B, etc.).
- **MIG (Multi-Instance GPU)**: Partitioning A100 for multi-tenant; tradeoffs vs. full GPU.
- **DGX vs. commodity**: DGX for maximum performance and density; commodity for cost flexibility.

When sizing, match GPU type to model size, throughput target, and budget. Include headroom for growth.

## Networking

Consult `references/networking.md` for distributed training and inference. Cover:

- **RDMA**: Low-latency, high-bandwidth for distributed training. Reduces CPU overhead.
- **GPUDirect RDMA**: GPU-to-GPU communication without CPU; critical for multi-node training.
- **InfiniBand vs. RoCE v2**: InfiniBand for highest performance; RoCE v2 for Ethernet-based clusters.

For multi-node training (e.g., 8+ GPUs), emphasize RDMA/InfiniBand. For single-node or inference-only, standard Ethernet may suffice.

## Storage

Consult `references/storage.md` for data and model storage. Cover:

- **Object storage (S3/Ceph)**: Datasets, checkpoints, and artifacts. Scale-out; cost-effective for large data.
- **PVs for model artifacts**: Low-latency access for serving; smaller capacity than object.
- **Throughput requirements**: Training reads large datasets; ensure storage can feed GPUs. Benchmark if critical.

When designing, separate hot (serving, active training) from cold (archives, backups) storage.

## Response Guidelines

- Ask for workload type (training vs. inference), model sizes, and concurrency before sizing.
- Provide ranges and rationale; avoid over-precise numbers without context.
- Reference vendor docs for latest GPU specs; note that specs evolve.
