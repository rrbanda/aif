"""Tests for competitive battlecard tools."""

import pytest
from ai_factory_agent.tools import battlecard_tools


@pytest.mark.asyncio
async def test_list_competitors():
    result = await battlecard_tools.list_competitors()
    ids = [c["id"] for c in result["competitors"]]
    assert "databricks" in ids
    assert "aws-sagemaker" in ids
    assert "azure-ai" in ids
    assert "google-vertex" in ids


@pytest.mark.asyncio
async def test_generate_battlecard():
    result = await battlecard_tools.generate_battlecard(
        competitor="databricks",
        customer_context="Tier-1 bank with on-prem OpenShift",
    )
    assert result["competitor"] == "Databricks"
    assert len(result["red_hat_differentiators"]) > 0
    assert len(result["competitor_strengths"]) > 0
    assert "knockout_factor" in result


@pytest.mark.asyncio
async def test_generate_battlecard_unknown():
    result = await battlecard_tools.generate_battlecard(competitor="unknown-vendor")
    assert "error" in result
    assert "available" in result


@pytest.mark.asyncio
async def test_battlecard_hybrid_advantage():
    result = await battlecard_tools.generate_battlecard(competitor="aws-sagemaker")
    assert "hybrid_advantage" in result
