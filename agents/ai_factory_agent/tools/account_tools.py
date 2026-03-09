"""Customer account state management tools.

Provides persistent per-customer state that agents can load and update
across sessions. Account data lives in content/customers/<id>/account.yaml.
"""

from __future__ import annotations

import logging
from datetime import date
from pathlib import Path

import yaml

from ..config_loader import get_content_dir

logger = logging.getLogger(__name__)

_CUSTOMERS_DIR = get_content_dir() / "customers"


def _account_path(customer_id: str) -> Path:
    return _CUSTOMERS_DIR / customer_id / "account.yaml"


def _load_account(customer_id: str) -> dict:
    path = _account_path(customer_id)
    if not path.exists():
        raise FileNotFoundError(f"No account found for customer '{customer_id}'")
    with open(path) as f:
        return yaml.safe_load(f)


def _save_account(customer_id: str, data: dict) -> None:
    path = _account_path(customer_id)
    path.parent.mkdir(parents=True, exist_ok=True)
    data.setdefault("account", {})["updated"] = str(date.today())
    with open(path, "w") as f:
        yaml.dump(data, f, default_flow_style=False, sort_keys=False, allow_unicode=True)


async def list_customers() -> dict:
    """List all customer accounts in the system.

    Returns:
        Dictionary with customer IDs and basic info.
    """
    customers = []
    if _CUSTOMERS_DIR.exists():
        for d in sorted(_CUSTOMERS_DIR.iterdir()):
            if d.is_dir() and not d.name.startswith("."):
                acct_file = d / "account.yaml"
                if acct_file.exists():
                    try:
                        data = yaml.safe_load(acct_file.read_text())
                        acct = data.get("account", {})
                        prog = data.get("program_state", {})
                        customers.append({
                            "id": acct.get("id", d.name),
                            "name": acct.get("name", d.name),
                            "current_phase": prog.get("current_phase", "unknown"),
                            "industry": acct.get("industry", ""),
                        })
                    except Exception:
                        logger.exception("Failed to read account: %s", d.name)
    return {"customers": customers, "count": len(customers)}


async def load_customer_context(customer_id: str) -> dict:
    """Load full customer account context for agent use.

    Args:
        customer_id: The customer identifier (directory name).

    Returns:
        Complete customer account data including program state,
        assessments, use cases, models, and engagement info.
    """
    try:
        data = _load_account(customer_id)
        return {"customer": data, "customer_id": customer_id}
    except FileNotFoundError:
        return {"error": f"Customer '{customer_id}' not found", "customer_id": customer_id}
    except Exception as e:
        logger.exception("Error loading customer '%s'", customer_id)
        return {"error": str(e), "customer_id": customer_id}


async def update_customer_phase(
    customer_id: str,
    phase_id: str,
    status: str,
    completion_pct: int = 0,
) -> dict:
    """Update a customer's program phase status.

    Args:
        customer_id: The customer identifier.
        phase_id: Phase ID (e.g., '02-platform-foundation').
        status: One of 'not_started', 'in_progress', 'completed'.
        completion_pct: Completion percentage (0-100) for in_progress phases.

    Returns:
        Updated program state.
    """
    try:
        data = _load_account(customer_id)
        prog = data.setdefault("program_state", {})

        if status == "completed":
            completed = prog.setdefault("phases_completed", [])
            in_progress = prog.get("phases_in_progress", [])
            prog["phases_in_progress"] = [p for p in in_progress if p.get("id") != phase_id]
            if not any(p.get("id") == phase_id for p in completed):
                completed.append({
                    "id": phase_id,
                    "completed_date": str(date.today()),
                    "value_gate_passed": True,
                    "deliverables": [],
                })
        elif status == "in_progress":
            in_progress = prog.setdefault("phases_in_progress", [])
            existing = next((p for p in in_progress if p.get("id") == phase_id), None)
            if existing:
                existing["completion_pct"] = completion_pct
            else:
                in_progress.append({
                    "id": phase_id,
                    "started_date": str(date.today()),
                    "completion_pct": completion_pct,
                })
            prog["current_phase"] = phase_id

        _save_account(customer_id, data)
        return {"success": True, "program_state": prog}
    except Exception as e:
        logger.exception("Error updating phase for '%s'", customer_id)
        return {"error": str(e)}


async def update_customer_use_case(
    customer_id: str,
    use_case_id: str,
    name: str = "",
    status: str = "",
    priority: int = 0,
    qualified: bool = False,
    business_impact_score: float = 0,
    complexity_score: float = 0,
) -> dict:
    """Add or update a use case in the customer's portfolio.

    Args:
        customer_id: The customer identifier.
        use_case_id: Unique use case identifier.
        name: Human-readable name for the use case.
        status: One of 'proposed', 'qualified', 'piloting', 'production', 'scaled', 'retired'.
        priority: Priority ranking (1 = highest).
        qualified: Whether the use case passed qualification.
        business_impact_score: Impact score (1-5).
        complexity_score: Complexity score (1-5).

    Returns:
        Updated use case entry.
    """
    try:
        data = _load_account(customer_id)
        use_cases = data.setdefault("use_cases", [])
        existing = next((u for u in use_cases if u.get("id") == use_case_id), None)

        entry = existing or {"id": use_case_id}
        if name:
            entry["name"] = name
        if status:
            entry["status"] = status
        if priority:
            entry["priority"] = priority
        entry["qualified"] = qualified
        if business_impact_score:
            entry["business_impact_score"] = business_impact_score
        if complexity_score:
            entry["complexity_score"] = complexity_score

        if not existing:
            use_cases.append(entry)

        _save_account(customer_id, data)
        return {"success": True, "use_case": entry}
    except Exception as e:
        logger.exception("Error updating use case for '%s'", customer_id)
        return {"error": str(e)}


async def update_customer_model(
    customer_id: str,
    model_id: str,
    name: str = "",
    use_case: str = "",
    status: str = "",
    model_type: str = "",
) -> dict:
    """Add or update a model in the customer's model inventory.

    Args:
        customer_id: The customer identifier.
        model_id: Unique model identifier.
        name: Human-readable model name.
        use_case: Associated use case ID.
        status: One of 'experiment', 'registered', 'validated', 'deployed', 'monitored', 'retired'.
        model_type: Model type (e.g., 'xgboost', 'llm', 'transformer').

    Returns:
        Updated model entry.
    """
    try:
        data = _load_account(customer_id)
        models = data.setdefault("models", [])
        existing = next((m for m in models if m.get("id") == model_id), None)

        entry = existing or {"id": model_id}
        if name:
            entry["name"] = name
        if use_case:
            entry["use_case"] = use_case
        if status:
            entry["status"] = status
        if model_type:
            entry["type"] = model_type

        if not existing:
            models.append(entry)

        _save_account(customer_id, data)
        return {"success": True, "model": entry}
    except Exception as e:
        logger.exception("Error updating model for '%s'", customer_id)
        return {"error": str(e)}


async def save_assessment_results(
    customer_id: str,
    overall_readiness: str,
    data_readiness: str = "",
    org_maturity: str = "",
    team_readiness: str = "",
    infra_readiness: str = "",
    use_case_pipeline: str = "",
) -> dict:
    """Persist readiness assessment results to a customer account.

    Args:
        customer_id: The customer identifier.
        overall_readiness: Overall readiness level.
        data_readiness: Data infrastructure readiness level.
        org_maturity: Organizational maturity level.
        team_readiness: Team composition assessment.
        infra_readiness: Infrastructure readiness level.
        use_case_pipeline: Use case pipeline readiness.

    Returns:
        Updated assessment section.
    """
    try:
        data = _load_account(customer_id)
        assessment = data.setdefault("assessment", {})
        assessment["overall_readiness"] = overall_readiness
        assessment["assessment_date"] = str(date.today())
        if data_readiness:
            assessment["data_readiness"] = data_readiness
        if org_maturity:
            assessment["org_maturity"] = org_maturity
        if team_readiness:
            assessment["team_readiness"] = team_readiness
        if infra_readiness:
            assessment["infra_readiness"] = infra_readiness
        if use_case_pipeline:
            assessment["use_case_pipeline"] = use_case_pipeline

        _save_account(customer_id, data)
        return {"success": True, "assessment": assessment}
    except Exception as e:
        logger.exception("Error saving assessment for '%s'", customer_id)
        return {"error": str(e)}


async def create_customer_account(
    customer_id: str,
    name: str,
    industry: str = "financial-services",
    tier: str = "tier-1",
    region: str = "",
) -> dict:
    """Create a new customer account.

    Args:
        customer_id: Unique customer identifier (used as directory name).
        name: Customer organization name.
        industry: Industry vertical.
        tier: Customer tier (tier-1, tier-2, etc.).
        region: Geographic region.

    Returns:
        Newly created account data.
    """
    path = _account_path(customer_id)
    if path.exists():
        return {"error": f"Customer '{customer_id}' already exists"}

    data = {
        "account": {
            "id": customer_id,
            "name": name,
            "industry": industry,
            "tier": tier,
            "region": region,
            "created": str(date.today()),
            "updated": str(date.today()),
        },
        "contacts": [],
        "red_hat_team": {},
        "program_state": {
            "current_phase": "not-started",
            "phases_completed": [],
            "phases_in_progress": [],
        },
        "assessment": {},
        "use_cases": [],
        "models": [],
        "engagement": {},
    }

    try:
        _save_account(customer_id, data)
        return {"success": True, "customer": data}
    except Exception as e:
        logger.exception("Error creating customer '%s'", customer_id)
        return {"error": str(e)}
