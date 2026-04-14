"""Metrics ingestion and analysis tools for feedback loops.

Provides tools for ingesting production model metrics, detecting drift,
and generating improvement recommendations that feed back into the
AI Factory program planning.
"""

from __future__ import annotations

import logging
from datetime import datetime
from pathlib import Path

import yaml

from ..config_loader import get_content_dir

logger = logging.getLogger(__name__)

_CUSTOMERS_DIR = get_content_dir() / "customers"


def _metrics_dir(customer_id: str) -> Path:
    d = _CUSTOMERS_DIR / customer_id / "metrics"
    d.mkdir(parents=True, exist_ok=True)
    return d


async def ingest_model_metrics(
    customer_id: str,
    model_id: str,
    accuracy: float = 0,
    precision: float = 0,
    recall: float = 0,
    f1_score: float = 0,
    latency_p95_ms: float = 0,
    throughput_rps: float = 0,
    drift_score: float = 0,
    error_rate_pct: float = 0,
    data_quality_score: float = 0,
) -> dict:
    """Ingest production metrics for a deployed model.

    Args:
        customer_id: Customer identifier.
        model_id: Model identifier.
        accuracy: Current accuracy.
        precision: Current precision.
        recall: Current recall.
        f1_score: Current F1 score.
        latency_p95_ms: P95 latency in ms.
        throughput_rps: Throughput in RPS.
        drift_score: Data/concept drift score (0-1).
        error_rate_pct: Error rate percentage.
        data_quality_score: Input data quality score (0-1).

    Returns:
        Ingested metrics with timestamp.
    """
    metrics_file = _metrics_dir(customer_id) / f"{model_id}-history.yaml"

    history = []
    if metrics_file.exists():
        data = yaml.safe_load(metrics_file.read_text(encoding="utf-8"))
        history = data.get("history", [])

    entry = {
        "timestamp": datetime.utcnow().isoformat(),
        "accuracy": accuracy,
        "precision": precision,
        "recall": recall,
        "f1_score": f1_score,
        "latency_p95_ms": latency_p95_ms,
        "throughput_rps": throughput_rps,
        "drift_score": drift_score,
        "error_rate_pct": error_rate_pct,
        "data_quality_score": data_quality_score,
    }
    history.append(entry)

    data = {"model_id": model_id, "customer_id": customer_id, "history": history}
    metrics_file.write_text(
        yaml.dump(data, default_flow_style=False, allow_unicode=True),
        encoding="utf-8",
    )

    return {"success": True, "model_id": model_id, "entry": entry, "total_records": len(history)}


async def get_metrics_history(
    customer_id: str,
    model_id: str,
    last_n: int = 10,
) -> dict:
    """Retrieve metrics history for a model.

    Args:
        customer_id: Customer identifier.
        model_id: Model identifier.
        last_n: Number of most recent entries to return.

    Returns:
        Metrics history with trend indicators.
    """
    metrics_file = _metrics_dir(customer_id) / f"{model_id}-history.yaml"
    if not metrics_file.exists():
        return {"error": f"No metrics history for model '{model_id}'", "model_id": model_id}

    data = yaml.safe_load(metrics_file.read_text(encoding="utf-8"))
    history = data.get("history", [])
    recent = history[-last_n:]

    trends = {}
    if len(recent) >= 2:
        first, last = recent[0], recent[-1]
        for key in ["accuracy", "drift_score", "latency_p95_ms", "error_rate_pct"]:
            v1, v2 = first.get(key, 0), last.get(key, 0)
            if v1 and v2:
                change_pct = ((v2 - v1) / v1) * 100 if v1 != 0 else 0
                if key in ("drift_score", "latency_p95_ms", "error_rate_pct"):
                    trend = "degrading" if change_pct > 5 else "stable" if abs(change_pct) <= 5 else "improving"
                else:
                    trend = "improving" if change_pct > 5 else "stable" if abs(change_pct) >= -5 else "degrading"
                trends[key] = {"change_pct": round(change_pct, 2), "trend": trend}

    return {
        "model_id": model_id,
        "history": recent,
        "total_records": len(history),
        "trends": trends,
    }


async def detect_anomalies(customer_id: str, model_id: str) -> dict:
    """Analyze metrics for anomalies that require attention.

    Args:
        customer_id: Customer identifier.
        model_id: Model identifier.

    Returns:
        List of detected anomalies with severity and recommendations.
    """
    metrics_file = _metrics_dir(customer_id) / f"{model_id}-history.yaml"
    if not metrics_file.exists():
        return {"error": f"No metrics for model '{model_id}'", "model_id": model_id}

    data = yaml.safe_load(metrics_file.read_text(encoding="utf-8"))
    history = data.get("history", [])
    if not history:
        return {"model_id": model_id, "anomalies": [], "status": "no_data"}

    latest = history[-1]
    anomalies = []

    if latest.get("drift_score", 0) > 0.3:
        anomalies.append({
            "type": "data_drift",
            "severity": "high" if latest["drift_score"] > 0.5 else "medium",
            "value": latest["drift_score"],
            "threshold": 0.3,
            "recommendation": "Investigate data distribution changes; consider retraining with recent data",
        })

    if latest.get("accuracy", 1) < 0.85:
        anomalies.append({
            "type": "accuracy_degradation",
            "severity": "high" if latest["accuracy"] < 0.7 else "medium",
            "value": latest["accuracy"],
            "threshold": 0.85,
            "recommendation": "Model accuracy below threshold; trigger retraining pipeline or evaluate new features",
        })

    if latest.get("latency_p95_ms", 0) > 200:
        anomalies.append({
            "type": "latency_spike",
            "severity": "high" if latest["latency_p95_ms"] > 500 else "medium",
            "value": latest["latency_p95_ms"],
            "threshold": 200,
            "recommendation": "Investigate model serving infrastructure; consider model optimization or scaling",
        })

    if latest.get("error_rate_pct", 0) > 1.0:
        anomalies.append({
            "type": "high_error_rate",
            "severity": "critical" if latest["error_rate_pct"] > 5.0 else "high",
            "value": latest["error_rate_pct"],
            "threshold": 1.0,
            "recommendation": "Immediate investigation required; check input validation and model health",
        })

    if latest.get("data_quality_score", 0) and latest["data_quality_score"] < 0.8:
        anomalies.append({
            "type": "data_quality_degradation",
            "severity": "medium",
            "value": latest["data_quality_score"],
            "threshold": 0.8,
            "recommendation": "Input data quality declining; review upstream data pipelines and feature engineering",
        })

    status = "healthy"
    if any(a["severity"] == "critical" for a in anomalies):
        status = "critical"
    elif any(a["severity"] == "high" for a in anomalies):
        status = "degraded"
    elif anomalies:
        status = "warning"

    return {"model_id": model_id, "anomalies": anomalies, "status": status}


async def generate_feedback_report(customer_id: str) -> dict:
    """Generate a feedback report across all models for a customer.

    Args:
        customer_id: Customer identifier.

    Returns:
        Aggregated feedback report with per-model status and recommendations.
    """
    metrics_dir = _metrics_dir(customer_id)
    report = {"customer_id": customer_id, "models": [], "overall_status": "healthy", "generated": datetime.utcnow().isoformat()}

    critical_count = 0
    degraded_count = 0

    for f in sorted(metrics_dir.glob("*-history.yaml")):
        model_id = f.stem.replace("-history", "")
        anomaly_result = await detect_anomalies(customer_id, model_id)
        history_result = await get_metrics_history(customer_id, model_id, last_n=1)

        model_report = {
            "model_id": model_id,
            "status": anomaly_result.get("status", "unknown"),
            "anomalies": anomaly_result.get("anomalies", []),
            "latest_metrics": history_result.get("history", [{}])[-1] if history_result.get("history") else {},
        }
        report["models"].append(model_report)

        if anomaly_result.get("status") == "critical":
            critical_count += 1
        elif anomaly_result.get("status") == "degraded":
            degraded_count += 1

    if critical_count > 0:
        report["overall_status"] = "critical"
    elif degraded_count > 0:
        report["overall_status"] = "degraded"

    report["model_count"] = len(report["models"])
    return report
