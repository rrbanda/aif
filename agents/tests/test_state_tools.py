"""Tests for cross-session state persistence tools."""

import pytest
from unittest.mock import patch


@pytest.fixture
def state_tools(patch_content_dir):
    from ai_factory_agent.tools import state_tools

    with patch.object(state_tools, "_CUSTOMERS_DIR", patch_content_dir / "customers"):
        (patch_content_dir / "customers" / "test-bank").mkdir(parents=True, exist_ok=True)
        yield state_tools


@pytest.mark.asyncio
async def test_save_and_load_state(state_tools):
    save_result = await state_tools.save_workflow_state(
        customer_id="test-bank",
        state_key="readiness_assessment",
        data="Overall readiness: Level 2",
        workflow_name="readiness-assessment",
    )
    assert save_result["success"] is True

    load_result = await state_tools.load_workflow_state(
        customer_id="test-bank", state_key="readiness_assessment",
    )
    assert load_result["data"] == "Overall readiness: Level 2"
    assert load_result["workflow"] == "readiness-assessment"


@pytest.mark.asyncio
async def test_load_nonexistent_state(state_tools):
    result = await state_tools.load_workflow_state(
        customer_id="test-bank", state_key="nonexistent",
    )
    assert "error" in result


@pytest.mark.asyncio
async def test_list_workflow_states(state_tools):
    await state_tools.save_workflow_state(
        customer_id="test-bank", state_key="assessment", data="data1",
    )
    await state_tools.save_workflow_state(
        customer_id="test-bank", state_key="plan", data="data2",
    )
    result = await state_tools.list_workflow_states("test-bank")
    assert result["count"] == 2
    keys = [s["key"] for s in result["states"]]
    assert "assessment" in keys
    assert "plan" in keys
