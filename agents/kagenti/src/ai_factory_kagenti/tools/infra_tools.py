"""OpenShift / RHOAI infrastructure integration tools.

Read-only tools for querying cluster status, model registry, and inference
endpoints. All data is read from customer-provided YAML files stored at
content/customers/<id>/infrastructure.yaml.
"""

from __future__ import annotations

import logging
from pathlib import Path

import yaml

from ..config_loader import get_content_dir

logger = logging.getLogger(__name__)

_CUSTOMERS_DIR = get_content_dir() / "customers"


def _load_infra_config(customer_id: str) -> dict:
    path = _CUSTOMERS_DIR / customer_id / "infrastructure.yaml"
    if not path.exists():
        return _default_infra()
    return yaml.safe_load(path.read_text(encoding="utf-8"))


def _default_infra() -> dict:
    return {
        "cluster": {
            "name": "ai-factory-cluster",
            "openshift_version": "4.16",
            "status": "healthy",
            "nodes": {
                "control_plane": 3,
                "worker": 6,
                "gpu_worker": 4,
            },
            "namespaces": [
                {"name": "ai-factory-dev", "status": "active", "gpu_quota": 4},
                {"name": "ai-factory-staging", "status": "active", "gpu_quota": 2},
                {"name": "ai-factory-prod", "status": "active", "gpu_quota": 8},
            ],
        },
        "gpu": {
            "total_gpus": 16,
            "allocated_gpus": 10,
            "available_gpus": 6,
            "gpu_type": "NVIDIA A100 80GB",
            "driver_version": "550.54.15",
            "cuda_version": "12.4",
            "utilization_pct": 62.5,
            "by_namespace": {
                "ai-factory-dev": {"allocated": 3, "utilization_pct": 45},
                "ai-factory-staging": {"allocated": 1, "utilization_pct": 30},
                "ai-factory-prod": {"allocated": 6, "utilization_pct": 85},
            },
        },
        "model_registry": {
            "endpoint": "https://model-registry.ai-factory.svc:8080",
            "models_registered": 12,
            "models": [
                {"name": "fraud-scorer-v1", "version": "1.2.0", "status": "serving", "format": "onnx"},
                {"name": "aml-classifier-v1", "version": "0.9.1", "status": "registered", "format": "pytorch"},
                {"name": "credit-risk-v2", "version": "2.0.0", "status": "validating", "format": "xgboost"},
            ],
        },
        "inference_endpoints": [
            {
                "name": "fraud-scorer",
                "model": "fraud-scorer-v1",
                "runtime": "kserve",
                "replicas": 3,
                "status": "serving",
                "latency_p95_ms": 42,
                "throughput_rps": 1250,
                "error_rate_pct": 0.02,
            },
            {
                "name": "document-qa",
                "model": "document-qa-llm",
                "runtime": "vllm",
                "replicas": 2,
                "status": "serving",
                "latency_p95_ms": 890,
                "throughput_rps": 45,
                "error_rate_pct": 0.1,
            },
        ],
        "pipelines": {
            "total": 8,
            "running": 2,
            "succeeded_24h": 5,
            "failed_24h": 1,
            "recent_runs": [
                {"name": "fraud-retrain", "status": "succeeded", "duration_min": 45, "completed": "2026-03-08T14:30:00Z"},
                {"name": "aml-feature-eng", "status": "running", "started": "2026-03-08T16:00:00Z"},
                {"name": "credit-risk-eval", "status": "failed", "error": "OOM on GPU node", "completed": "2026-03-08T12:00:00Z"},
            ],
        },
    }


async def get_cluster_status(customer_id: str) -> dict:
    """Get OpenShift cluster health status including node counts and namespace status.

    Args:
        customer_id: Customer identifier.

    Returns:
        Cluster health data including nodes, namespaces, and overall status.
    """
    infra = _load_infra_config(customer_id)
    return {"customer_id": customer_id, "cluster": infra.get("cluster", {})}


async def get_gpu_status(customer_id: str) -> dict:
    """Get GPU utilization status across the cluster.

    Args:
        customer_id: Customer identifier.

    Returns:
        GPU allocation, utilization, and per-namespace breakdown.
    """
    infra = _load_infra_config(customer_id)
    return {"customer_id": customer_id, "gpu": infra.get("gpu", {})}


async def get_model_registry_status(customer_id: str) -> dict:
    """Get model registry status showing registered models and their states.

    Args:
        customer_id: Customer identifier.

    Returns:
        Model registry data with registered models and versions.
    """
    infra = _load_infra_config(customer_id)
    return {"customer_id": customer_id, "model_registry": infra.get("model_registry", {})}


async def get_inference_endpoints(customer_id: str) -> dict:
    """Get inference endpoint status including latency and throughput metrics.

    Args:
        customer_id: Customer identifier.

    Returns:
        List of inference endpoints with health and performance data.
    """
    infra = _load_infra_config(customer_id)
    return {"customer_id": customer_id, "endpoints": infra.get("inference_endpoints", [])}


async def get_pipeline_status(customer_id: str) -> dict:
    """Get ML pipeline execution status including recent runs and failures.

    Args:
        customer_id: Customer identifier.

    Returns:
        Pipeline summary with running, succeeded, and failed counts plus recent runs.
    """
    infra = _load_infra_config(customer_id)
    return {"customer_id": customer_id, "pipelines": infra.get("pipelines", {})}


async def get_infrastructure_summary(customer_id: str) -> dict:
    """Get a complete infrastructure summary combining cluster, GPU, and service status.

    Args:
        customer_id: Customer identifier.

    Returns:
        Complete infrastructure overview.
    """
    infra = _load_infra_config(customer_id)
    return {"customer_id": customer_id, "infrastructure": infra}
