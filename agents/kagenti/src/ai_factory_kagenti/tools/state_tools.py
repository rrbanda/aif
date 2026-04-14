"""Cross-session state persistence tools.

Stores and retrieves structured workflow outputs so that results from one
agent session (e.g., readiness assessment) are available in later sessions
(e.g., program planning, deliverable generation).

State is stored per-customer in content/customers/<id>/state/<key>.yaml.
"""

from __future__ import annotations

import logging
from datetime import datetime
from pathlib import Path

import yaml

from ..config_loader import get_content_dir

logger = logging.getLogger(__name__)

_CUSTOMERS_DIR = get_content_dir() / "customers"


def _state_dir(customer_id: str) -> Path:
    d = _CUSTOMERS_DIR / customer_id / "state"
    d.mkdir(parents=True, exist_ok=True)
    return d


async def save_workflow_state(
    customer_id: str,
    state_key: str,
    data: str,
    workflow_name: str = "",
) -> dict:
    """Persist a workflow output so it can be retrieved in future sessions.

    Args:
        customer_id: Customer identifier.
        state_key: Unique key for this state (e.g. 'readiness_assessment',
            'program_plan', 'architecture_design', 'use_case_qualification').
        data: The structured output to persist (text/markdown).
        workflow_name: Name of the workflow that produced this output.

    Returns:
        Confirmation with the storage path.
    """
    path = _state_dir(customer_id) / f"{state_key}.yaml"
    state = {
        "key": state_key,
        "customer_id": customer_id,
        "workflow": workflow_name,
        "created": datetime.utcnow().isoformat(),
        "data": data,
    }
    path.write_text(
        yaml.dump(state, default_flow_style=False, allow_unicode=True),
        encoding="utf-8",
    )
    logger.info("Saved state '%s' for customer '%s'", state_key, customer_id)
    return {"success": True, "state_key": state_key, "path": str(path)}


async def load_workflow_state(customer_id: str, state_key: str) -> dict:
    """Load a previously persisted workflow output.

    Args:
        customer_id: Customer identifier.
        state_key: The key that was used when saving (e.g. 'readiness_assessment').

    Returns:
        The stored data and metadata, or an error if not found.
    """
    path = _state_dir(customer_id) / f"{state_key}.yaml"
    if not path.exists():
        return {
            "error": f"No state found for key '{state_key}' (customer: {customer_id})",
            "state_key": state_key,
        }
    try:
        state = yaml.safe_load(path.read_text(encoding="utf-8"))
        return {"state_key": state_key, "customer_id": customer_id, **state}
    except Exception as e:
        logger.exception("Error loading state '%s' for '%s'", state_key, customer_id)
        return {"error": str(e), "state_key": state_key}


async def list_workflow_states(customer_id: str) -> dict:
    """List all persisted workflow states for a customer.

    Args:
        customer_id: Customer identifier.

    Returns:
        List of state keys with their metadata.
    """
    state_dir = _CUSTOMERS_DIR / customer_id / "state"
    states = []
    if state_dir.exists():
        for f in sorted(state_dir.glob("*.yaml")):
            try:
                data = yaml.safe_load(f.read_text(encoding="utf-8"))
                states.append({
                    "key": data.get("key", f.stem),
                    "workflow": data.get("workflow", ""),
                    "created": data.get("created", ""),
                })
            except Exception:
                states.append({"key": f.stem, "error": "parse_failed"})

    return {"customer_id": customer_id, "states": states, "count": len(states)}
