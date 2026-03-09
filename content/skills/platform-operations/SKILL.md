---
name: platform-operations
description: AI Factory platform operations including GPU management, cluster ops, pipeline troubleshooting, and capacity planning. Use when discussing infrastructure operations, troubleshooting, or capacity management.
---

# Platform Operations

Apply platform operations expertise when agents help with cluster management, GPU allocation, pipeline issues, or capacity planning.

## When to Apply

Use this skill when the user asks about:
- GPU utilization and allocation strategies
- Cluster health monitoring and troubleshooting
- Pipeline failures and debugging
- Capacity planning for AI workloads
- Multi-tenant resource management
- Inference endpoint scaling and optimization

## GPU Management

### Allocation Strategies
- **Namespace quotas**: Set GPU limits per namespace (dev: 2-4, staging: 2, prod: 8+)
- **Time-slicing**: Share GPUs for development workloads (NVIDIA MPS/MIG)
- **MIG (Multi-Instance GPU)**: Partition A100/H100 for isolated workloads
- **Dedicated**: Full GPU allocation for production inference

### GPU Selection Guide
| GPU | VRAM | Best For | Typical Use |
|-----|------|----------|-------------|
| NVIDIA L40S | 48GB | Inference, fine-tuning | Cost-effective inference |
| NVIDIA A100 80GB | 80GB | Training, large model inference | General-purpose AI |
| NVIDIA H100 | 80GB | Large model training, HPC | High-performance training |
| NVIDIA H200 | 141GB | Very large models, highest throughput | Frontier models |

### Monitoring Metrics
- `DCGM_FI_DEV_GPU_UTIL`: GPU core utilization (target: 70-90% for training)
- `DCGM_FI_DEV_FB_USED`: GPU memory used
- `DCGM_FI_DEV_POWER_USAGE`: Power consumption (thermal management)
- `nvidia_gpu_duty_cycle`: Duty cycle for scheduling decisions

## Pipeline Troubleshooting

### Common Failures
| Symptom | Likely Cause | Resolution |
|---------|-------------|------------|
| OOMKilled | Pod memory limit too low or model too large | Increase memory limit, use gradient checkpointing, or use larger GPU |
| CrashLoopBackOff | Dependency error or config issue | Check init container logs, verify PVC mounts, check secrets |
| ImagePullBackOff | Registry auth or network issue | Verify image pull secrets, check registry connectivity |
| GPU not scheduled | No GPU nodes available or quota exhausted | Check node GPU availability, review namespace quotas |
| Pipeline timeout | Long-running training or stuck step | Check step logs, verify data loading, check for deadlocks |

### Debugging Steps
1. `oc get pods -n <namespace>` — check pod status
2. `oc describe pod <pod>` — check events and conditions
3. `oc logs <pod> -c <container>` — check application logs
4. `oc get events -n <namespace>` — check cluster events
5. `nvidia-smi` (via debug pod) — check GPU health

## Capacity Planning

### Sizing Formula
- **Training**: GPU-hours = (dataset_size × epochs × model_params) / throughput_per_gpu
- **Inference**: GPUs = (target_RPS × latency_per_request) / (1000 × utilization_target)
- **Storage**: Raw data + processed features + model artifacts + checkpoints (2-3x raw)
- **Network**: 100Gbps+ for multi-node training (RDMA/GPUDirect preferred)

### Growth Projections
- Plan for 2-3x GPU capacity within 12 months of Phase 3
- Storage grows 30-50% per quarter as data pipelines mature
- Network bandwidth needs increase linearly with GPU count for distributed training

## Response Guidelines

- Always ask about the specific GPU type and count before sizing recommendations
- For troubleshooting, request pod status and logs before suggesting solutions
- Capacity planning should include a 30% headroom buffer
- Distinguish between development, staging, and production resource needs
