"""Tests for customer account management tools."""

import pytest
from unittest.mock import patch


@pytest.fixture
def account_tools(patch_content_dir):
    from ai_factory_agent.tools import account_tools

    with patch.object(account_tools, "_CUSTOMERS_DIR", patch_content_dir / "customers"):
        yield account_tools


@pytest.mark.asyncio
async def test_create_customer_account(account_tools, patch_content_dir):
    result = await account_tools.create_customer_account(
        customer_id="new-bank",
        name="New Bank Inc",
        industry="financial-services",
        tier="tier-2",
        region="europe",
    )
    assert result["success"] is True
    assert result["customer"]["account"]["name"] == "New Bank Inc"
    assert (patch_content_dir / "customers" / "new-bank" / "account.yaml").exists()


@pytest.mark.asyncio
async def test_create_duplicate_customer(account_tools, sample_customer):
    result = await account_tools.create_customer_account(
        customer_id="test-bank", name="Duplicate"
    )
    assert "error" in result
    assert "already exists" in result["error"]


@pytest.mark.asyncio
async def test_list_customers(account_tools, sample_customer):
    result = await account_tools.list_customers()
    assert result["count"] == 1
    assert result["customers"][0]["id"] == "test-bank"


@pytest.mark.asyncio
async def test_load_customer_context(account_tools, sample_customer):
    result = await account_tools.load_customer_context("test-bank")
    assert "customer" in result
    assert result["customer"]["account"]["name"] == "Test Bank Corp"


@pytest.mark.asyncio
async def test_load_nonexistent_customer(account_tools, patch_content_dir):
    result = await account_tools.load_customer_context("nonexistent")
    assert "error" in result


@pytest.mark.asyncio
async def test_update_customer_phase(account_tools, sample_customer):
    result = await account_tools.update_customer_phase(
        customer_id="test-bank",
        phase_id="00-discovery",
        status="completed",
    )
    assert result["success"] is True
    completed = result["program_state"]["phases_completed"]
    assert any(p["id"] == "00-discovery" for p in completed)


@pytest.mark.asyncio
async def test_update_customer_use_case(account_tools, sample_customer):
    result = await account_tools.update_customer_use_case(
        customer_id="test-bank",
        use_case_id="fraud-detection",
        status="qualified",
        qualified=True,
        business_impact_score=4.5,
    )
    assert result["success"] is True
    assert result["use_case"]["status"] == "qualified"


@pytest.mark.asyncio
async def test_save_assessment_results(account_tools, sample_customer):
    result = await account_tools.save_assessment_results(
        customer_id="test-bank",
        overall_readiness="Level 2",
        data_readiness="Level 2",
        org_maturity="AI Division",
    )
    assert result["success"] is True
    assert result["assessment"]["overall_readiness"] == "Level 2"
