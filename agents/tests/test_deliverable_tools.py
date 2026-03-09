"""Tests for deliverable generation tools."""

import pytest
from unittest.mock import patch


@pytest.fixture
def deliverable_tools(patch_content_dir):
    from ai_factory_agent.tools import deliverable_tools

    with patch.object(deliverable_tools, "_CUSTOMERS_DIR", patch_content_dir / "customers"):
        with patch.object(deliverable_tools, "get_content_dir", return_value=patch_content_dir):
            (patch_content_dir / "customers" / "test-bank").mkdir(parents=True, exist_ok=True)
            yield deliverable_tools


@pytest.mark.asyncio
async def test_save_deliverable(deliverable_tools, patch_content_dir):
    result = await deliverable_tools.save_deliverable(
        customer_id="test-bank",
        deliverable_type="assessment-report",
        title="AI Factory Readiness Assessment",
        content="## Executive Summary\n\nThe customer is at Level 2...",
    )
    assert result["success"] is True
    assert "assessment-report" in result["filename"]
    assert (patch_content_dir / "customers" / "test-bank" / "deliverables").exists()


@pytest.mark.asyncio
async def test_list_deliverables_empty(deliverable_tools):
    result = await deliverable_tools.list_deliverables("test-bank")
    assert result["count"] == 0


@pytest.mark.asyncio
async def test_list_deliverables_after_save(deliverable_tools):
    await deliverable_tools.save_deliverable(
        customer_id="test-bank",
        deliverable_type="program-charter",
        title="Charter",
        content="Content here",
    )
    result = await deliverable_tools.list_deliverables("test-bank")
    assert result["count"] == 1
    assert "program-charter" in result["deliverables"][0]["filename"]
