"""Tests for metrics ingestion and feedback tools."""

import pytest
from unittest.mock import patch


@pytest.fixture
def metrics_tools(patch_content_dir):
    from ai_factory_agent.tools import metrics_tools

    with patch.object(metrics_tools, "_CUSTOMERS_DIR", patch_content_dir / "customers"):
        (patch_content_dir / "customers" / "test-bank").mkdir(parents=True, exist_ok=True)
        yield metrics_tools


@pytest.mark.asyncio
async def test_ingest_metrics(metrics_tools):
    result = await metrics_tools.ingest_model_metrics(
        customer_id="test-bank", model_id="fraud-v1",
        accuracy=0.95, latency_p95_ms=42, drift_score=0.1,
    )
    assert result["success"] is True
    assert result["total_records"] == 1


@pytest.mark.asyncio
async def test_metrics_history(metrics_tools):
    for i in range(5):
        await metrics_tools.ingest_model_metrics(
            customer_id="test-bank", model_id="hist-model",
            accuracy=0.95 - i * 0.02, drift_score=0.05 + i * 0.05,
        )
    result = await metrics_tools.get_metrics_history("test-bank", "hist-model", last_n=3)
    assert len(result["history"]) == 3
    assert result["total_records"] == 5


@pytest.mark.asyncio
async def test_detect_no_anomalies(metrics_tools):
    await metrics_tools.ingest_model_metrics(
        customer_id="test-bank", model_id="healthy-model",
        accuracy=0.97, drift_score=0.05, latency_p95_ms=30, error_rate_pct=0.01,
    )
    result = await metrics_tools.detect_anomalies("test-bank", "healthy-model")
    assert result["status"] == "healthy"
    assert len(result["anomalies"]) == 0


@pytest.mark.asyncio
async def test_detect_drift_anomaly(metrics_tools):
    await metrics_tools.ingest_model_metrics(
        customer_id="test-bank", model_id="drift-model",
        accuracy=0.90, drift_score=0.6,
    )
    result = await metrics_tools.detect_anomalies("test-bank", "drift-model")
    assert result["status"] in ("degraded", "critical")
    assert any(a["type"] == "data_drift" for a in result["anomalies"])


@pytest.mark.asyncio
async def test_detect_accuracy_anomaly(metrics_tools):
    await metrics_tools.ingest_model_metrics(
        customer_id="test-bank", model_id="acc-model",
        accuracy=0.65,
    )
    result = await metrics_tools.detect_anomalies("test-bank", "acc-model")
    assert any(a["type"] == "accuracy_degradation" for a in result["anomalies"])


@pytest.mark.asyncio
async def test_detect_error_rate_anomaly(metrics_tools):
    await metrics_tools.ingest_model_metrics(
        customer_id="test-bank", model_id="err-model",
        error_rate_pct=6.0,
    )
    result = await metrics_tools.detect_anomalies("test-bank", "err-model")
    assert any(a["type"] == "high_error_rate" for a in result["anomalies"])
    critical = [a for a in result["anomalies"] if a["severity"] == "critical"]
    assert len(critical) == 1


@pytest.mark.asyncio
async def test_feedback_report(metrics_tools):
    await metrics_tools.ingest_model_metrics(
        customer_id="test-bank", model_id="rpt-model1",
        accuracy=0.95, drift_score=0.05,
    )
    await metrics_tools.ingest_model_metrics(
        customer_id="test-bank", model_id="rpt-model2",
        accuracy=0.60, drift_score=0.7,
    )
    result = await metrics_tools.generate_feedback_report("test-bank")
    assert result["model_count"] == 2
    assert result["overall_status"] in ("degraded", "critical")
