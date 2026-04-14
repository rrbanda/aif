"""Model lifecycle tracking tools.

Manages models through their lifecycle stages with state machine
validation: experiment -> registered -> validated -> deployed -> monitored -> retired.
"""

from __future__ import annotations

import logging
from datetime import datetime
from pathlib import Path

import yaml

from ..config_loader import get_content_dir

logger = logging.getLogger(__name__)

_CUSTOMERS_DIR = get_content_dir() / "customers"

LIFECYCLE_STAGES = [
    "experiment",
    "registered",
    "validated",
    "deployed",
    "monitored",
    "retired",
]

VALID_TRANSITIONS = {
    "experiment": ["registered", "retired"],
    "registered": ["validated", "retired"],
    "validated": ["deployed", "registered", "retired"],
    "deployed": ["monitored", "retired"],
    "monitored": ["deployed", "retired"],
    "retired": [],
}


def _models_dir(customer_id: str) -> Path:
    d = _CUSTOMERS_DIR / customer_id / "models"
    d.mkdir(parents=True, exist_ok=True)
    return d


def _load_model(customer_id: str, model_id: str) -> dict | None:
    path = _models_dir(customer_id) / f"{model_id}.yaml"
    if not path.exists():
        return None
    return yaml.safe_load(path.read_text(encoding="utf-8"))


def _save_model(customer_id: str, model_id: str, data: dict) -> None:
    path = _models_dir(customer_id) / f"{model_id}.yaml"
    data["updated"] = datetime.utcnow().isoformat()
    path.write_text(
        yaml.dump(data, default_flow_style=False, allow_unicode=True),
        encoding="utf-8",
    )


async def register_model(
    customer_id: str,
    model_id: str,
    name: str,
    use_case_id: str,
    model_type: str,
    framework: str = "",
    version: str = "1.0.0",
    description: str = "",
) -> dict:
    """Register a new model in the lifecycle tracker.

    Args:
        customer_id: Customer identifier.
        model_id: Unique model identifier (e.g. 'fraud-scorer-v1').
        name: Human-readable model name.
        use_case_id: Associated use case ID.
        model_type: Model type (xgboost, transformer, llm, etc.).
        framework: ML framework (sklearn, pytorch, tensorflow, etc.).
        version: Semantic version.
        description: Model description.

    Returns:
        Created model record.
    """
    existing = _load_model(customer_id, model_id)
    if existing:
        return {"error": f"Model '{model_id}' already exists", "model": existing}

    model = {
        "id": model_id,
        "name": name,
        "use_case_id": use_case_id,
        "model_type": model_type,
        "framework": framework,
        "version": version,
        "description": description,
        "status": "experiment",
        "created": datetime.utcnow().isoformat(),
        "updated": datetime.utcnow().isoformat(),
        "lifecycle_history": [
            {
                "stage": "experiment",
                "timestamp": datetime.utcnow().isoformat(),
                "actor": "system",
                "notes": "Model registered",
            }
        ],
        "metrics": {},
        "governance": {
            "bias_tested": False,
            "security_scanned": False,
            "performance_validated": False,
            "data_lineage_documented": False,
            "model_card_completed": False,
            "risk_classification": "",
            "approvals": [],
        },
        "deployment": {},
    }

    _save_model(customer_id, model_id, model)
    return {"success": True, "model": model}


async def transition_model(
    customer_id: str,
    model_id: str,
    target_stage: str,
    actor: str = "",
    notes: str = "",
) -> dict:
    """Transition a model to a new lifecycle stage with validation.

    Args:
        customer_id: Customer identifier.
        model_id: Model identifier.
        target_stage: Target lifecycle stage.
        actor: Person or system performing the transition.
        notes: Transition notes.

    Returns:
        Updated model with transition result, or error if transition is invalid.
    """
    model = _load_model(customer_id, model_id)
    if model is None:
        return {"error": f"Model '{model_id}' not found"}

    current = model.get("status", "experiment")
    valid_targets = VALID_TRANSITIONS.get(current, [])

    if target_stage not in valid_targets:
        return {
            "error": f"Invalid transition: {current} -> {target_stage}",
            "valid_transitions": valid_targets,
            "current_stage": current,
        }

    if target_stage == "deployed":
        gov = model.get("governance", {})
        blockers = []
        if not gov.get("bias_tested"):
            blockers.append("bias_tested")
        if not gov.get("security_scanned"):
            blockers.append("security_scanned")
        if not gov.get("performance_validated"):
            blockers.append("performance_validated")
        if not gov.get("model_card_completed"):
            blockers.append("model_card_completed")
        if blockers:
            return {
                "error": "Governance gates not cleared",
                "blockers": blockers,
                "model_id": model_id,
            }

    model["status"] = target_stage
    model.setdefault("lifecycle_history", []).append({
        "stage": target_stage,
        "timestamp": datetime.utcnow().isoformat(),
        "actor": actor or "system",
        "notes": notes,
    })

    _save_model(customer_id, model_id, model)
    return {"success": True, "model_id": model_id, "new_stage": target_stage, "model": model}


async def update_model_governance(
    customer_id: str,
    model_id: str,
    bias_tested: bool = False,
    security_scanned: bool = False,
    performance_validated: bool = False,
    data_lineage_documented: bool = False,
    model_card_completed: bool = False,
    risk_classification: str = "",
    approval_by: str = "",
    approval_notes: str = "",
) -> dict:
    """Update governance gate status for a model.

    Args:
        customer_id: Customer identifier.
        model_id: Model identifier.
        bias_tested: Whether bias testing has passed.
        security_scanned: Whether security scan has passed.
        performance_validated: Whether performance validation has passed.
        data_lineage_documented: Whether data lineage is documented.
        model_card_completed: Whether model card is complete.
        risk_classification: Risk tier (tier-1, tier-2, tier-3).
        approval_by: Name of approver.
        approval_notes: Approval notes.

    Returns:
        Updated governance status.
    """
    model = _load_model(customer_id, model_id)
    if model is None:
        return {"error": f"Model '{model_id}' not found"}

    gov = model.setdefault("governance", {})
    if bias_tested:
        gov["bias_tested"] = True
    if security_scanned:
        gov["security_scanned"] = True
    if performance_validated:
        gov["performance_validated"] = True
    if data_lineage_documented:
        gov["data_lineage_documented"] = True
    if model_card_completed:
        gov["model_card_completed"] = True
    if risk_classification:
        gov["risk_classification"] = risk_classification
    if approval_by:
        gov.setdefault("approvals", []).append({
            "by": approval_by,
            "timestamp": datetime.utcnow().isoformat(),
            "notes": approval_notes,
        })

    _save_model(customer_id, model_id, model)
    return {"success": True, "governance": gov, "model_id": model_id}


async def update_model_metrics(
    customer_id: str,
    model_id: str,
    accuracy: float = 0,
    precision: float = 0,
    recall: float = 0,
    f1_score: float = 0,
    latency_p95_ms: float = 0,
    throughput_rps: float = 0,
    drift_score: float = 0,
) -> dict:
    """Update performance metrics for a model.

    Args:
        customer_id: Customer identifier.
        model_id: Model identifier.
        accuracy: Model accuracy.
        precision: Model precision.
        recall: Model recall.
        f1_score: F1 score.
        latency_p95_ms: P95 latency in milliseconds.
        throughput_rps: Throughput in requests per second.
        drift_score: Data or concept drift score (0-1, higher = more drift).

    Returns:
        Updated metrics.
    """
    model = _load_model(customer_id, model_id)
    if model is None:
        return {"error": f"Model '{model_id}' not found"}

    metrics = model.setdefault("metrics", {})
    if accuracy:
        metrics["accuracy"] = accuracy
    if precision:
        metrics["precision"] = precision
    if recall:
        metrics["recall"] = recall
    if f1_score:
        metrics["f1_score"] = f1_score
    if latency_p95_ms:
        metrics["latency_p95_ms"] = latency_p95_ms
    if throughput_rps:
        metrics["throughput_rps"] = throughput_rps
    if drift_score:
        metrics["drift_score"] = drift_score
    metrics["last_updated"] = datetime.utcnow().isoformat()

    _save_model(customer_id, model_id, model)
    return {"success": True, "metrics": metrics, "model_id": model_id}


async def get_model_status(customer_id: str, model_id: str) -> dict:
    """Get full model lifecycle status including governance and metrics.

    Args:
        customer_id: Customer identifier.
        model_id: Model identifier.

    Returns:
        Complete model record.
    """
    model = _load_model(customer_id, model_id)
    if model is None:
        return {"error": f"Model '{model_id}' not found"}
    return {"model": model}


async def list_models(customer_id: str, status_filter: str = "") -> dict:
    """List all models for a customer, optionally filtered by lifecycle stage.

    Args:
        customer_id: Customer identifier.
        status_filter: Optional lifecycle stage filter.

    Returns:
        List of models with summary info.
    """
    models_dir = _models_dir(customer_id)
    models = []

    for f in sorted(models_dir.glob("*.yaml")):
        try:
            data = yaml.safe_load(f.read_text(encoding="utf-8"))
            if status_filter and data.get("status") != status_filter:
                continue
            models.append({
                "id": data.get("id", f.stem),
                "name": data.get("name", ""),
                "status": data.get("status", ""),
                "use_case_id": data.get("use_case_id", ""),
                "model_type": data.get("model_type", ""),
                "version": data.get("version", ""),
                "updated": data.get("updated", ""),
            })
        except Exception:
            logger.exception("Failed to read model: %s", f.name)

    return {"customer_id": customer_id, "models": models, "count": len(models)}
