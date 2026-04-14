"""Training and learning path recommendation tools.

Provides learning path suggestions, skill assessments, and
training progress tracking for customer teams using the AI Factory.
"""

from __future__ import annotations

import logging
from datetime import datetime
from pathlib import Path

import yaml

from ..config_loader import get_content_dir

logger = logging.getLogger(__name__)

_CUSTOMERS_DIR = get_content_dir() / "customers"

LEARNING_PATHS = {
    "data-scientist": {
        "title": "AI Factory for Data Scientists",
        "description": "Hands-on skills for building and deploying models on the AI Factory platform",
        "modules": [
            {"id": "ds-01", "title": "OpenShift AI Notebooks & IDEs", "duration_hours": 4, "type": "workshop"},
            {"id": "ds-02", "title": "ML Pipeline Development with Kubeflow", "duration_hours": 8, "type": "bootcamp"},
            {"id": "ds-03", "title": "Model Training on GPU Clusters", "duration_hours": 4, "type": "workshop"},
            {"id": "ds-04", "title": "Experiment Tracking & Model Registry", "duration_hours": 4, "type": "workshop"},
            {"id": "ds-05", "title": "Model Serving with KServe & vLLM", "duration_hours": 8, "type": "bootcamp"},
            {"id": "ds-06", "title": "Fine-Tuning with InstructLab", "duration_hours": 8, "type": "bootcamp"},
            {"id": "ds-07", "title": "Model Monitoring & Drift Detection", "duration_hours": 4, "type": "workshop"},
        ],
    },
    "ml-engineer": {
        "title": "AI Factory for ML Engineers",
        "description": "Platform engineering skills for operating and scaling the AI Factory",
        "modules": [
            {"id": "mle-01", "title": "OpenShift for ML Workloads", "duration_hours": 8, "type": "bootcamp"},
            {"id": "mle-02", "title": "GPU Operator & Device Plugin Configuration", "duration_hours": 4, "type": "workshop"},
            {"id": "mle-03", "title": "Multi-Tenant AI Platform Design", "duration_hours": 4, "type": "workshop"},
            {"id": "mle-04", "title": "MLOps Pipeline Automation", "duration_hours": 8, "type": "bootcamp"},
            {"id": "mle-05", "title": "Model Serving at Scale", "duration_hours": 8, "type": "bootcamp"},
            {"id": "mle-06", "title": "Observability for AI Workloads", "duration_hours": 4, "type": "workshop"},
            {"id": "mle-07", "title": "Security & Compliance for AI", "duration_hours": 4, "type": "workshop"},
        ],
    },
    "ai-leader": {
        "title": "AI Factory for AI Leaders",
        "description": "Strategic skills for leading AI transformation programs",
        "modules": [
            {"id": "al-01", "title": "AI Factory Vision & Strategy", "duration_hours": 4, "type": "workshop"},
            {"id": "al-02", "title": "Building an AI COE", "duration_hours": 4, "type": "workshop"},
            {"id": "al-03", "title": "Use Case Prioritization & Portfolio Management", "duration_hours": 4, "type": "workshop"},
            {"id": "al-04", "title": "AI Governance & Risk Management", "duration_hours": 4, "type": "workshop"},
            {"id": "al-05", "title": "Change Management for AI Adoption", "duration_hours": 4, "type": "workshop"},
            {"id": "al-06", "title": "Measuring AI ROI", "duration_hours": 2, "type": "seminar"},
        ],
    },
}


async def get_learning_paths() -> dict:
    """Get all available learning paths.

    Returns:
        List of learning paths with module details.
    """
    return {"learning_paths": LEARNING_PATHS}


async def recommend_learning_path(
    role: str,
    current_skills: str = "",
    goals: str = "",
) -> dict:
    """Recommend a learning path based on role and skill gaps.

    Args:
        role: Role of the learner (data-scientist, ml-engineer, ai-leader).
        current_skills: Comma-separated list of skills the learner already has.
        goals: Learning goals.

    Returns:
        Recommended learning path with prioritized modules.
    """
    path = LEARNING_PATHS.get(role)
    if path is None:
        return {
            "error": f"Unknown role '{role}'",
            "available_roles": list(LEARNING_PATHS.keys()),
        }

    skill_list = [s.strip().lower() for s in current_skills.split(",") if s.strip()] if current_skills else []

    recommended = []
    for module in path["modules"]:
        skip = False
        for skill in skill_list:
            if skill in module["title"].lower():
                skip = True
                break
        if not skip:
            recommended.append(module)

    total_hours = sum(m["duration_hours"] for m in recommended)

    return {
        "path": path["title"],
        "role": role,
        "recommended_modules": recommended,
        "skipped_modules": len(path["modules"]) - len(recommended),
        "total_hours": total_hours,
        "estimated_weeks": max(1, total_hours // 8),
        "goals": goals,
    }


async def track_training_progress(
    customer_id: str,
    learner_name: str,
    module_id: str,
    status: str = "completed",
    score: float = 0,
) -> dict:
    """Track training progress for a customer team member.

    Args:
        customer_id: Customer identifier.
        learner_name: Name of the learner.
        module_id: Module identifier (e.g. 'ds-01').
        status: Status of the module (enrolled, in_progress, completed).
        score: Assessment score (0-100).

    Returns:
        Updated training progress.
    """
    training_dir = _CUSTOMERS_DIR / customer_id / "training"
    training_dir.mkdir(parents=True, exist_ok=True)

    safe_name = learner_name.lower().replace(" ", "-")
    progress_file = training_dir / f"{safe_name}.yaml"

    progress: dict = {}
    if progress_file.exists():
        progress = yaml.safe_load(progress_file.read_text(encoding="utf-8")) or {}

    progress.setdefault("learner", learner_name)
    progress.setdefault("customer_id", customer_id)
    modules = progress.setdefault("modules", {})

    modules[module_id] = {
        "status": status,
        "score": score,
        "updated": datetime.utcnow().isoformat(),
    }

    completed = sum(1 for m in modules.values() if m.get("status") == "completed")
    progress["completed_count"] = completed
    progress["total_tracked"] = len(modules)

    progress_file.write_text(
        yaml.dump(progress, default_flow_style=False, allow_unicode=True),
        encoding="utf-8",
    )

    return {"success": True, "learner": learner_name, "progress": progress}


async def get_team_training_summary(customer_id: str) -> dict:
    """Get training progress summary for the entire customer team.

    Args:
        customer_id: Customer identifier.

    Returns:
        Team-level training summary with completion rates.
    """
    training_dir = _CUSTOMERS_DIR / customer_id / "training"
    learners = []

    if training_dir.exists():
        for f in sorted(training_dir.glob("*.yaml")):
            try:
                data = yaml.safe_load(f.read_text(encoding="utf-8"))
                learners.append({
                    "learner": data.get("learner", f.stem),
                    "completed": data.get("completed_count", 0),
                    "total": data.get("total_tracked", 0),
                })
            except Exception:
                logger.exception("Failed to read training file: %s", f.name)

    return {
        "customer_id": customer_id,
        "learners": learners,
        "team_size": len(learners),
    }
