"""Multi-customer orchestration tools.

Provides portfolio-level views across multiple customer accounts,
cross-customer pattern recognition, and resource allocation insights.
"""

from __future__ import annotations

import logging
from pathlib import Path

import yaml

from ..config_loader import get_content_dir

logger = logging.getLogger(__name__)

_CUSTOMERS_DIR = get_content_dir() / "customers"


async def get_customer_portfolio_view() -> dict:
    """Get a portfolio view across all customer accounts.

    Returns:
        Aggregated view of all customers with phase distribution,
        use case counts, and model counts.
    """
    customers = []
    phase_distribution: dict[str, int] = {}
    total_use_cases = 0
    total_models = 0

    if not _CUSTOMERS_DIR.exists():
        return {"customers": [], "summary": {}}

    for d in sorted(_CUSTOMERS_DIR.iterdir()):
        if not d.is_dir() or d.name.startswith("."):
            continue

        acct_file = d / "account.yaml"
        if not acct_file.exists():
            continue

        try:
            data = yaml.safe_load(acct_file.read_text(encoding="utf-8"))
            acct = data.get("account", {})
            prog = data.get("program_state", {})
            use_cases = data.get("use_cases", [])
            models = data.get("models", [])

            current_phase = prog.get("current_phase", "not-started")
            phase_distribution[current_phase] = phase_distribution.get(current_phase, 0) + 1
            total_use_cases += len(use_cases)
            total_models += len(models)

            customers.append({
                "id": acct.get("id", d.name),
                "name": acct.get("name", d.name),
                "industry": acct.get("industry", ""),
                "tier": acct.get("tier", ""),
                "current_phase": current_phase,
                "use_case_count": len(use_cases),
                "model_count": len(models),
                "assessment_readiness": data.get("assessment", {}).get("overall_readiness", ""),
                "phases_completed": len(prog.get("phases_completed", [])),
            })
        except Exception:
            logger.exception("Failed to read account: %s", d.name)

    return {
        "customers": customers,
        "summary": {
            "total_customers": len(customers),
            "phase_distribution": phase_distribution,
            "total_use_cases": total_use_cases,
            "total_models": total_models,
        },
    }


async def get_cross_customer_patterns() -> dict:
    """Analyze patterns across customer accounts to identify common challenges and successes.

    Returns:
        Pattern analysis with common gaps, successful approaches, and recommendations.
    """
    portfolio = await get_customer_portfolio_view()
    customers = portfolio.get("customers", [])

    patterns = {
        "common_phases": {},
        "readiness_distribution": {},
        "tier_distribution": {},
        "industry_distribution": {},
        "insights": [],
    }

    for c in customers:
        phase = c.get("current_phase", "unknown")
        patterns["common_phases"][phase] = patterns["common_phases"].get(phase, 0) + 1

        readiness = c.get("assessment_readiness", "not-assessed")
        patterns["readiness_distribution"][readiness] = patterns["readiness_distribution"].get(readiness, 0) + 1

        tier = c.get("tier", "unknown")
        patterns["tier_distribution"][tier] = patterns["tier_distribution"].get(tier, 0) + 1

        industry = c.get("industry", "unknown")
        patterns["industry_distribution"][industry] = patterns["industry_distribution"].get(industry, 0) + 1

    stuck_in_early = sum(
        v for k, v in patterns["common_phases"].items()
        if k in ("not-started", "00-discovery", "01-data-strategy")
    )
    if stuck_in_early > len(customers) * 0.5 and len(customers) > 1:
        patterns["insights"].append({
            "type": "early_phase_concentration",
            "detail": f"{stuck_in_early}/{len(customers)} customers are in early phases. Consider accelerated onboarding programs.",
            "severity": "medium",
        })

    low_uc = [c for c in customers if c.get("use_case_count", 0) < 2]
    if low_uc:
        patterns["insights"].append({
            "type": "thin_use_case_pipeline",
            "detail": f"{len(low_uc)} customers have fewer than 2 use cases. Use case discovery workshops recommended.",
            "affected_customers": [c["id"] for c in low_uc],
            "severity": "medium",
        })

    return patterns


async def get_resource_allocation_view() -> dict:
    """Get resource allocation across customer engagements.

    Returns:
        View of Red Hat team allocation, engagement status, and capacity.
    """
    customers = []

    if not _CUSTOMERS_DIR.exists():
        return {"allocations": [], "summary": {}}

    for d in sorted(_CUSTOMERS_DIR.iterdir()):
        if not d.is_dir() or d.name.startswith("."):
            continue

        acct_file = d / "account.yaml"
        if not acct_file.exists():
            continue

        try:
            data = yaml.safe_load(acct_file.read_text(encoding="utf-8"))
            acct = data.get("account", {})
            team = data.get("red_hat_team", {})
            engagement = data.get("engagement", {})

            customers.append({
                "customer_id": acct.get("id", d.name),
                "customer_name": acct.get("name", d.name),
                "red_hat_team": team,
                "engagement_type": engagement.get("engagement_type", ""),
                "current_sow": engagement.get("current_sow", ""),
                "end_date": engagement.get("estimated_end", ""),
            })
        except Exception:
            logger.exception("Failed to read account: %s", d.name)

    team_members: dict[str, list] = {}
    for c in customers:
        for role, name in c.get("red_hat_team", {}).items():
            if name:
                team_members.setdefault(name, []).append({
                    "customer": c["customer_id"],
                    "role": role,
                })

    return {
        "allocations": customers,
        "team_utilization": team_members,
        "total_engagements": len(customers),
    }
