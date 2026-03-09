"""Tests for multi-customer orchestration tools."""

import pytest
import yaml
from unittest.mock import patch


@pytest.fixture
def multi_tools(patch_content_dir):
    from ai_factory_agent.tools import multi_customer_tools

    with patch.object(multi_customer_tools, "_CUSTOMERS_DIR", patch_content_dir / "customers"):
        for cid, phase in [("bank-a", "02-platform-foundation"), ("bank-b", "00-discovery")]:
            cdir = patch_content_dir / "customers" / cid
            cdir.mkdir(parents=True, exist_ok=True)
            (cdir / "account.yaml").write_text(yaml.dump({
                "account": {"id": cid, "name": f"{cid} Corp", "industry": "financial-services", "tier": "tier-1"},
                "program_state": {"current_phase": phase, "phases_completed": []},
                "red_hat_team": {"ae": "Jane Doe"},
                "use_cases": [{"id": "uc1"}],
                "models": [],
                "engagement": {},
            }))
        yield multi_customer_tools


@pytest.mark.asyncio
async def test_portfolio_view(multi_tools):
    result = await multi_tools.get_customer_portfolio_view()
    assert result["summary"]["total_customers"] == 2
    assert result["summary"]["total_use_cases"] == 2


@pytest.mark.asyncio
async def test_cross_customer_patterns(multi_tools):
    result = await multi_tools.get_cross_customer_patterns()
    assert "common_phases" in result
    assert sum(result["common_phases"].values()) == 2


@pytest.mark.asyncio
async def test_resource_allocation(multi_tools):
    result = await multi_tools.get_resource_allocation_view()
    assert result["total_engagements"] == 2
    assert "Jane Doe" in result["team_utilization"]
