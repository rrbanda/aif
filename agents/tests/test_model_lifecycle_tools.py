"""Tests for model lifecycle tracking tools."""

import pytest
from unittest.mock import patch


@pytest.fixture
def model_tools(patch_content_dir):
    from ai_factory_agent.tools import model_lifecycle_tools

    with patch.object(model_lifecycle_tools, "_CUSTOMERS_DIR", patch_content_dir / "customers"):
        (patch_content_dir / "customers" / "test-bank").mkdir(parents=True, exist_ok=True)
        yield model_lifecycle_tools


@pytest.mark.asyncio
async def test_register_model(model_tools):
    result = await model_tools.register_model(
        customer_id="test-bank",
        model_id="fraud-v1",
        name="Fraud Scorer V1",
        use_case_id="fraud-detection",
        model_type="xgboost",
        framework="sklearn",
    )
    assert result["success"] is True
    assert result["model"]["status"] == "experiment"
    assert result["model"]["governance"]["bias_tested"] is False


@pytest.mark.asyncio
async def test_register_duplicate_model(model_tools):
    await model_tools.register_model(
        customer_id="test-bank", model_id="dup-model",
        name="Dup", use_case_id="test", model_type="xgboost",
    )
    result = await model_tools.register_model(
        customer_id="test-bank", model_id="dup-model",
        name="Dup2", use_case_id="test", model_type="xgboost",
    )
    assert "error" in result


@pytest.mark.asyncio
async def test_valid_transition(model_tools):
    await model_tools.register_model(
        customer_id="test-bank", model_id="trans-model",
        name="Trans", use_case_id="test", model_type="xgboost",
    )
    result = await model_tools.transition_model(
        customer_id="test-bank", model_id="trans-model",
        target_stage="registered", actor="tester",
    )
    assert result["success"] is True
    assert result["new_stage"] == "registered"


@pytest.mark.asyncio
async def test_invalid_transition(model_tools):
    await model_tools.register_model(
        customer_id="test-bank", model_id="bad-trans",
        name="Bad", use_case_id="test", model_type="xgboost",
    )
    result = await model_tools.transition_model(
        customer_id="test-bank", model_id="bad-trans",
        target_stage="deployed",
    )
    assert "error" in result
    assert "Invalid transition" in result["error"]


@pytest.mark.asyncio
async def test_deploy_blocked_by_governance(model_tools):
    await model_tools.register_model(
        customer_id="test-bank", model_id="gov-model",
        name="Gov", use_case_id="test", model_type="xgboost",
    )
    await model_tools.transition_model(
        customer_id="test-bank", model_id="gov-model", target_stage="registered",
    )
    await model_tools.transition_model(
        customer_id="test-bank", model_id="gov-model", target_stage="validated",
    )
    result = await model_tools.transition_model(
        customer_id="test-bank", model_id="gov-model", target_stage="deployed",
    )
    assert "error" in result
    assert "Governance gates" in result["error"]
    assert "bias_tested" in result["blockers"]


@pytest.mark.asyncio
async def test_deploy_after_governance_cleared(model_tools):
    await model_tools.register_model(
        customer_id="test-bank", model_id="cleared-model",
        name="Cleared", use_case_id="test", model_type="xgboost",
    )
    await model_tools.transition_model(
        customer_id="test-bank", model_id="cleared-model", target_stage="registered",
    )
    await model_tools.transition_model(
        customer_id="test-bank", model_id="cleared-model", target_stage="validated",
    )
    await model_tools.update_model_governance(
        customer_id="test-bank", model_id="cleared-model",
        bias_tested=True, security_scanned=True,
        performance_validated=True, model_card_completed=True,
    )
    result = await model_tools.transition_model(
        customer_id="test-bank", model_id="cleared-model", target_stage="deployed",
    )
    assert result["success"] is True


@pytest.mark.asyncio
async def test_update_metrics(model_tools):
    await model_tools.register_model(
        customer_id="test-bank", model_id="metrics-model",
        name="Metrics", use_case_id="test", model_type="xgboost",
    )
    result = await model_tools.update_model_metrics(
        customer_id="test-bank", model_id="metrics-model",
        accuracy=0.95, latency_p95_ms=42,
    )
    assert result["success"] is True
    assert result["metrics"]["accuracy"] == 0.95


@pytest.mark.asyncio
async def test_list_models(model_tools):
    await model_tools.register_model(
        customer_id="test-bank", model_id="list-m1",
        name="M1", use_case_id="test", model_type="xgboost",
    )
    await model_tools.register_model(
        customer_id="test-bank", model_id="list-m2",
        name="M2", use_case_id="test", model_type="transformer",
    )
    result = await model_tools.list_models("test-bank")
    assert result["count"] == 2


@pytest.mark.asyncio
async def test_list_models_with_filter(model_tools):
    await model_tools.register_model(
        customer_id="test-bank", model_id="filter-m1",
        name="FM1", use_case_id="test", model_type="xgboost",
    )
    await model_tools.register_model(
        customer_id="test-bank", model_id="filter-m2",
        name="FM2", use_case_id="test", model_type="xgboost",
    )
    await model_tools.transition_model(
        customer_id="test-bank", model_id="filter-m2", target_stage="registered",
    )
    result = await model_tools.list_models("test-bank", status_filter="registered")
    assert result["count"] == 1
    assert result["models"][0]["id"] == "filter-m2"
