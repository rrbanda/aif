"""Use case portfolio management tools.

Manages use cases through their lifecycle with state machine validation,
priority scoring, resource allocation, and dependency tracking.

Use case lifecycle: proposed → qualified → piloting → production → scaled → retired
"""

from __future__ import annotations

import logging
from datetime import datetime
from pathlib import Path

import yaml

from ..config_loader import get_content_dir

logger = logging.getLogger(__name__)

_CUSTOMERS_DIR = get_content_dir() / "customers"

USE_CASE_STAGES = [
    "proposed",
    "qualified",
    "piloting",
    "production",
    "scaled",
    "retired",
]

VALID_UC_TRANSITIONS = {
    "proposed": ["qualified", "retired"],
    "qualified": ["piloting", "retired"],
    "piloting": ["production", "qualified", "retired"],
    "production": ["scaled", "retired"],
    "scaled": ["retired"],
    "retired": [],
}


def _portfolio_dir(customer_id: str) -> Path:
    d = _CUSTOMERS_DIR / customer_id / "portfolio"
    d.mkdir(parents=True, exist_ok=True)
    return d


def _load_use_case(customer_id: str, use_case_id: str) -> dict | None:
    path = _portfolio_dir(customer_id) / f"{use_case_id}.yaml"
    if not path.exists():
        return None
    return yaml.safe_load(path.read_text(encoding="utf-8"))


def _save_use_case(customer_id: str, use_case_id: str, data: dict) -> None:
    path = _portfolio_dir(customer_id) / f"{use_case_id}.yaml"
    data["updated"] = datetime.utcnow().isoformat()
    path.write_text(
        yaml.dump(data, default_flow_style=False, allow_unicode=True),
        encoding="utf-8",
    )


async def create_use_case(
    customer_id: str,
    use_case_id: str,
    name: str,
    description: str = "",
    business_unit: str = "",
    sponsor: str = "",
    priority: int = 0,
    business_impact_score: float = 0,
    complexity_score: float = 0,
    data_readiness_score: float = 0,
    estimated_value_usd: float = 0,
    dependencies: str = "",
) -> dict:
    """Create a new use case in the portfolio.

    Args:
        customer_id: Customer identifier.
        use_case_id: Unique use case identifier.
        name: Human-readable name.
        description: Use case description.
        business_unit: Owning business unit.
        sponsor: Executive sponsor name.
        priority: Priority ranking (1 = highest).
        business_impact_score: Business impact (1-5).
        complexity_score: Technical complexity (1-5).
        data_readiness_score: Data readiness (1-5).
        estimated_value_usd: Estimated annual value in USD.
        dependencies: Comma-separated list of dependent use case IDs.

    Returns:
        Created use case record.
    """
    existing = _load_use_case(customer_id, use_case_id)
    if existing:
        return {"error": f"Use case '{use_case_id}' already exists"}

    dep_list = [d.strip() for d in dependencies.split(",") if d.strip()] if dependencies else []

    uc = {
        "id": use_case_id,
        "name": name,
        "description": description,
        "status": "proposed",
        "business_unit": business_unit,
        "sponsor": sponsor,
        "priority": priority,
        "scores": {
            "business_impact": business_impact_score,
            "complexity": complexity_score,
            "data_readiness": data_readiness_score,
            "composite": round(
                (business_impact_score * 0.4 + data_readiness_score * 0.3 + (5 - complexity_score) * 0.3), 2
            ) if all([business_impact_score, complexity_score, data_readiness_score]) else 0,
        },
        "estimated_value_usd": estimated_value_usd,
        "dependencies": dep_list,
        "models": [],
        "created": datetime.utcnow().isoformat(),
        "updated": datetime.utcnow().isoformat(),
        "lifecycle_history": [
            {"stage": "proposed", "timestamp": datetime.utcnow().isoformat(), "notes": "Use case created"}
        ],
        "kpis": {},
        "resources": {},
    }

    _save_use_case(customer_id, use_case_id, uc)
    return {"success": True, "use_case": uc}


async def transition_use_case(
    customer_id: str,
    use_case_id: str,
    target_stage: str,
    notes: str = "",
) -> dict:
    """Transition a use case to a new lifecycle stage with validation.

    Args:
        customer_id: Customer identifier.
        use_case_id: Use case identifier.
        target_stage: Target stage.
        notes: Transition notes.

    Returns:
        Updated use case or error.
    """
    uc = _load_use_case(customer_id, use_case_id)
    if uc is None:
        return {"error": f"Use case '{use_case_id}' not found"}

    current = uc.get("status", "proposed")
    valid_targets = VALID_UC_TRANSITIONS.get(current, [])

    if target_stage not in valid_targets:
        return {
            "error": f"Invalid transition: {current} → {target_stage}",
            "valid_transitions": valid_targets,
        }

    if target_stage == "piloting" and uc.get("dependencies"):
        for dep_id in uc["dependencies"]:
            dep = _load_use_case(customer_id, dep_id)
            if dep and dep.get("status") in ("proposed", "qualified"):
                return {
                    "error": f"Dependency '{dep_id}' is still in '{dep.get('status')}'; must be at least piloting",
                    "blocked_by": dep_id,
                }

    uc["status"] = target_stage
    uc.setdefault("lifecycle_history", []).append({
        "stage": target_stage,
        "timestamp": datetime.utcnow().isoformat(),
        "notes": notes,
    })

    _save_use_case(customer_id, use_case_id, uc)
    return {"success": True, "use_case_id": use_case_id, "new_stage": target_stage}


async def get_portfolio_summary(customer_id: str) -> dict:
    """Get a summary of the use case portfolio with status distribution and priorities.

    Args:
        customer_id: Customer identifier.

    Returns:
        Portfolio summary with stage counts, top priorities, and value estimates.
    """
    portfolio_dir = _portfolio_dir(customer_id)
    use_cases = []
    stage_counts = {s: 0 for s in USE_CASE_STAGES}
    total_value = 0

    for f in sorted(portfolio_dir.glob("*.yaml")):
        try:
            data = yaml.safe_load(f.read_text(encoding="utf-8"))
            status = data.get("status", "proposed")
            stage_counts[status] = stage_counts.get(status, 0) + 1
            total_value += data.get("estimated_value_usd", 0)
            use_cases.append({
                "id": data.get("id", f.stem),
                "name": data.get("name", ""),
                "status": status,
                "priority": data.get("priority", 999),
                "composite_score": data.get("scores", {}).get("composite", 0),
                "estimated_value_usd": data.get("estimated_value_usd", 0),
            })
        except Exception:
            logger.exception("Failed to read use case: %s", f.name)

    use_cases.sort(key=lambda x: x.get("priority", 999))

    return {
        "customer_id": customer_id,
        "total_use_cases": len(use_cases),
        "stage_distribution": stage_counts,
        "total_estimated_value_usd": total_value,
        "use_cases": use_cases,
        "top_priorities": use_cases[:5],
    }


async def update_use_case_kpis(
    customer_id: str,
    use_case_id: str,
    kpi_name: str,
    kpi_value: str,
    kpi_target: str = "",
) -> dict:
    """Update KPIs for a use case.

    Args:
        customer_id: Customer identifier.
        use_case_id: Use case identifier.
        kpi_name: KPI name (e.g. 'processing_time_reduction', 'false_positive_rate').
        kpi_value: Current KPI value.
        kpi_target: Target KPI value.

    Returns:
        Updated KPIs.
    """
    uc = _load_use_case(customer_id, use_case_id)
    if uc is None:
        return {"error": f"Use case '{use_case_id}' not found"}

    kpis = uc.setdefault("kpis", {})
    kpis[kpi_name] = {
        "value": kpi_value,
        "target": kpi_target,
        "updated": datetime.utcnow().isoformat(),
    }

    _save_use_case(customer_id, use_case_id, uc)
    return {"success": True, "kpis": kpis}


async def get_use_case_detail(customer_id: str, use_case_id: str) -> dict:
    """Get full details for a specific use case.

    Args:
        customer_id: Customer identifier.
        use_case_id: Use case identifier.

    Returns:
        Complete use case record.
    """
    uc = _load_use_case(customer_id, use_case_id)
    if uc is None:
        return {"error": f"Use case '{use_case_id}' not found"}
    return {"use_case": uc}
