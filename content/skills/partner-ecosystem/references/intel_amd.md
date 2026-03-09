# Intel and AMD Accelerators for OpenShift AI

## Intel Gaudi Accelerators

- **Gaudi 2 / Gaudi 3**: Intel's AI accelerators for training and inference. Compete with NVIDIA A100/H100 for certain workloads.
- **Strengths**: Cost-effective alternative; good performance for training. Support for popular frameworks (PyTorch, etc.).
- **Use case**: Customers seeking supply diversity, cost optimization, or Intel ecosystem alignment.
- **OpenShift AI**: Support for Intel Gaudi is evolving. Check Red Hat and Intel documentation for current compatibility. GPU Operator is NVIDIA-focused; Gaudi may require Intel-specific operators or drivers.

## AMD MI300X Positioning

- **MI300X**: AMD Instinct accelerator with large memory (192GB HBM3). Suited for large model inference (70B+ on single device).
- **Strengths**: High memory capacity; can reduce need for tensor parallelism for very large models. Competitive pricing.
- **Use case**: Large model inference where memory is bottleneck; customers evaluating AMD for cost or supply.
- **OpenShift AI**: AMD GPU support in OpenShift AI and GPU Operator is developing. Verify current support matrix before recommending.

## OpenShift AI Support Matrix

- **Primary**: NVIDIA is the primary and most mature accelerator for OpenShift AI. GPU Operator, MIG, and workload support are NVIDIA-centric.
- **Intel/AMD**: Support varies by RHOAI version and accelerator generation. Consult Red Hat documentation and release notes.
- **Recommendation**: For production deployments, NVIDIA is the safest choice. For Intel/AMD, engage Red Hat and vendor for compatibility confirmation and reference architectures.
- **Future**: Red Hat and partners are expanding support; check latest docs for updates.
