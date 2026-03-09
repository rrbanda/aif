# Networking for AI Workloads

## RDMA (Remote Direct Memory Access)

- **Purpose**: Low-latency, high-bandwidth communication between nodes. CPU bypass; direct memory-to-memory transfer.
- **Benefit**: Critical for distributed training; reduces all-reduce and gradient sync time. Can 2–10x training speed vs. TCP/IP.
- **When**: Multi-node training (e.g., 4+ nodes, 8+ GPUs). Single-node training or inference-only may not need RDMA.

## GPUDirect RDMA

- **Purpose**: GPU-to-GPU communication across nodes without CPU involvement. Direct GPU memory access over network.
- **Benefit**: Further reduces latency and CPU overhead for distributed training. Essential for large-scale training (e.g., 64+ GPUs).
- **Requirements**: NVIDIA GPUs, RDMA-capable NICs, supported drivers and libraries (NCCL with RDMA).

## InfiniBand for Distributed Training

- **InfiniBand**: High-bandwidth, low-latency fabric. 200–400 Gb/s per port. Sub-microsecond latency.
- **Use cases**: Large clusters (8+ nodes), tightly coupled training. Standard for HPC and AI supercomputers.
- **Topology**: Fat-tree or similar; ensure non-blocking or oversubscription is acceptable.
- **Cost**: InfiniBand NICs and switches are premium; justify for large-scale training.

## RoCE v2 (RDMA over Converged Ethernet)

- **Purpose**: RDMA over standard Ethernet. No InfiniBand hardware.
- **Benefit**: Use existing Ethernet infrastructure; lower cost than InfiniBand. Good for mid-scale (e.g., 4–16 nodes).
- **Requirements**: Lossless Ethernet (DCB/PFC), low latency switches. RoCE v2 compatible NICs.
- **Tradeoff**: Typically lower bandwidth and higher latency than InfiniBand; acceptable for many workloads.

## Recommendations

- **Single node**: Standard Ethernet sufficient.
- **2–4 nodes**: RoCE v2 or InfiniBand; RoCE if Ethernet already in place.
- **8+ nodes**: InfiniBand preferred for best performance. GPUDirect RDMA recommended.
