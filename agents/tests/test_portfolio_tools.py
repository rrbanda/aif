"""Tests for use case portfolio management tools."""

import pytest
from unittest.mock import patch


@pytest.fixture
def portfolio_tools(patch_content_dir):
    from ai_factory_agent.tools import portfolio_tools

    with patch.object(portfolio_tools, "_CUSTOMERS_DIR", patch_content_dir / "customers"):
        (patch_content_dir / "customers" / "test-bank").mkdir(parents=True, exist_ok=True)
        yield portfolio_tools


@pytest.mark.asyncio
async def test_create_use_case(portfolio_tools):
    result = await portfolio_tools.create_use_case(
        customer_id="test-bank",
        use_case_id="fraud-rt",
        name="Real-time Fraud Detection",
        business_impact_score=4.5,
        complexity_score=3.0,
        data_readiness_score=4.0,
        estimated_value_usd=5000000,
    )
    assert result["success"] is True
    assert result["use_case"]["status"] == "proposed"
    assert result["use_case"]["scores"]["composite"] > 0


@pytest.mark.asyncio
async def test_create_duplicate_use_case(portfolio_tools):
    await portfolio_tools.create_use_case(
        customer_id="test-bank", use_case_id="dup-uc", name="Dup",
    )
    result = await portfolio_tools.create_use_case(
        customer_id="test-bank", use_case_id="dup-uc", name="Dup2",
    )
    assert "error" in result


@pytest.mark.asyncio
async def test_valid_use_case_transition(portfolio_tools):
    await portfolio_tools.create_use_case(
        customer_id="test-bank", use_case_id="trans-uc", name="Trans UC",
    )
    result = await portfolio_tools.transition_use_case(
        customer_id="test-bank", use_case_id="trans-uc",
        target_stage="qualified", notes="Passed qualification",
    )
    assert result["success"] is True
    assert result["new_stage"] == "qualified"


@pytest.mark.asyncio
async def test_invalid_use_case_transition(portfolio_tools):
    await portfolio_tools.create_use_case(
        customer_id="test-bank", use_case_id="bad-uc", name="Bad",
    )
    result = await portfolio_tools.transition_use_case(
        customer_id="test-bank", use_case_id="bad-uc",
        target_stage="production",
    )
    assert "error" in result
    assert "Invalid transition" in result["error"]


@pytest.mark.asyncio
async def test_dependency_blocks_piloting(portfolio_tools):
    await portfolio_tools.create_use_case(
        customer_id="test-bank", use_case_id="dep-parent", name="Parent",
    )
    await portfolio_tools.create_use_case(
        customer_id="test-bank", use_case_id="dep-child", name="Child",
        dependencies="dep-parent",
    )
    await portfolio_tools.transition_use_case(
        customer_id="test-bank", use_case_id="dep-child", target_stage="qualified",
    )
    result = await portfolio_tools.transition_use_case(
        customer_id="test-bank", use_case_id="dep-child", target_stage="piloting",
    )
    assert "error" in result
    assert "blocked_by" in result


@pytest.mark.asyncio
async def test_portfolio_summary(portfolio_tools):
    await portfolio_tools.create_use_case(
        customer_id="test-bank", use_case_id="s1", name="UC1",
        priority=1, estimated_value_usd=1000000,
    )
    await portfolio_tools.create_use_case(
        customer_id="test-bank", use_case_id="s2", name="UC2",
        priority=2, estimated_value_usd=2000000,
    )
    result = await portfolio_tools.get_portfolio_summary("test-bank")
    assert result["total_use_cases"] == 2
    assert result["total_estimated_value_usd"] == 3000000
    assert result["stage_distribution"]["proposed"] == 2


@pytest.mark.asyncio
async def test_update_kpis(portfolio_tools):
    await portfolio_tools.create_use_case(
        customer_id="test-bank", use_case_id="kpi-uc", name="KPI UC",
    )
    result = await portfolio_tools.update_use_case_kpis(
        customer_id="test-bank", use_case_id="kpi-uc",
        kpi_name="false_positive_rate", kpi_value="2.1%", kpi_target="<1%",
    )
    assert result["success"] is True
    assert "false_positive_rate" in result["kpis"]
