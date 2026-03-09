# OpenShift AI Architecture Patterns

## Multi-Tenant Topology

OpenShift AI supports multi-tenant deployment for teams and business units:

- **Namespaces**: Each tenant (team, project, BU) gets dedicated namespaces. Isolate resources, network policies, and quotas.
- **Projects**: OpenShift projects map to namespaces; use for logical grouping (e.g., dev, staging, prod).
- **Resource quotas**: Set CPU, memory, and GPU limits per namespace to prevent resource contention.
- **Network policies**: Restrict pod-to-pod and external access as needed for compliance.

## GPU Operator

The NVIDIA GPU Operator manages GPU infrastructure on OpenShift:

- **Components**: NVIDIA driver, container toolkit, device plugin, DCGM exporter, GPU Feature Discovery.
- **MIG support**: Multi-Instance GPU partitioning for sharing GPUs across smaller workloads.
- **Upgrades**: Operator-managed driver and toolkit updates; align with OpenShift upgrade cycles.
- **Scheduling**: GPU resources exposed as schedulable; pods request `nvidia.com/gpu` for allocation.

## Node Feature Discovery (NFD)

NFD labels nodes with hardware capabilities:

- **Labels**: GPU type (e.g., nvidia.com/gpu.product=A100-SXM4-40GB), memory, CPU features.
- **Scheduling**: Use node selectors or affinity to place workloads on appropriate hardware.
- **Heterogeneous clusters**: Support mixed GPU types (A100, H100, L40S) with correct placement.

## Namespace Isolation

- **Data isolation**: Each tenant's data (datasets, models) stored in namespace-scoped PVCs or object storage with prefixing.
- **RBAC**: RoleBindings per namespace; data scientists get access only to their project resources.
- **Secrets**: Tenant-specific credentials and API keys stored in namespace secrets.

## RBAC for Data Scientists

- **Viewer**: Read-only access to experiments, models, and dashboards.
- **Editor**: Create and modify notebooks, runs, and deployments within their namespace.
- **Admin**: Manage namespace resources, quotas, and user access.
- **Custom roles**: Extend for specific needs (e.g., model approver, pipeline operator).
