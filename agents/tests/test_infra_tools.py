"""Tests for infrastructure integration tools."""

import pytest
import yaml
from unittest.mock import patch


@pytest.fixture
def infra_tools(patch_content_dir):
    from ai_factory_agent.tools import infra_tools

    with patch.object(infra_tools, "_CUSTOMERS_DIR", patch_content_dir / "customers"):
        (patch_content_dir / "customers" / "test-bank").mkdir(parents=True, exist_ok=True)
        yield infra_tools


@pytest.mark.asyncio
async def test_default_cluster_status(infra_tools):
    result = await infra_tools.get_cluster_status("test-bank")
    assert result["cluster"]["status"] == "healthy"
    assert result["cluster"]["nodes"]["gpu_worker"] == 4


@pytest.mark.asyncio
async def test_default_gpu_status(infra_tools):
    result = await infra_tools.get_gpu_status("test-bank")
    assert result["gpu"]["total_gpus"] == 16
    assert result["gpu"]["gpu_type"] == "NVIDIA A100 80GB"


@pytest.mark.asyncio
async def test_custom_infra_config(infra_tools, patch_content_dir):
    custom_infra = {
        "cluster": {"status": "degraded", "nodes": {"gpu_worker": 8}},
        "gpu": {"total_gpus": 32, "gpu_type": "NVIDIA H100"},
    }
    infra_file = patch_content_dir / "customers" / "test-bank" / "infrastructure.yaml"
    infra_file.write_text(yaml.dump(custom_infra))

    result = await infra_tools.get_cluster_status("test-bank")
    assert result["cluster"]["status"] == "degraded"

    gpu_result = await infra_tools.get_gpu_status("test-bank")
    assert gpu_result["gpu"]["total_gpus"] == 32


@pytest.mark.asyncio
async def test_inference_endpoints(infra_tools):
    result = await infra_tools.get_inference_endpoints("test-bank")
    assert len(result["endpoints"]) == 2
    assert any(e["name"] == "fraud-scorer" for e in result["endpoints"])


@pytest.mark.asyncio
async def test_pipeline_status(infra_tools):
    result = await infra_tools.get_pipeline_status("test-bank")
    assert result["pipelines"]["total"] == 8
    assert result["pipelines"]["failed_24h"] == 1


@pytest.mark.asyncio
async def test_infrastructure_summary(infra_tools):
    result = await infra_tools.get_infrastructure_summary("test-bank")
    assert "cluster" in result["infrastructure"]
    assert "gpu" in result["infrastructure"]
    assert "model_registry" in result["infrastructure"]
