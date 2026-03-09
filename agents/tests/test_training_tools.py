"""Tests for training and learning path tools."""

import pytest
from unittest.mock import patch


@pytest.fixture
def training_tools(patch_content_dir):
    from ai_factory_agent.tools import training_tools

    with patch.object(training_tools, "_CUSTOMERS_DIR", patch_content_dir / "customers"):
        (patch_content_dir / "customers" / "test-bank").mkdir(parents=True, exist_ok=True)
        yield training_tools


@pytest.mark.asyncio
async def test_get_learning_paths():
    from ai_factory_agent.tools import training_tools
    result = await training_tools.get_learning_paths()
    assert "data-scientist" in result["learning_paths"]
    assert "ml-engineer" in result["learning_paths"]
    assert "ai-leader" in result["learning_paths"]


@pytest.mark.asyncio
async def test_recommend_learning_path():
    from ai_factory_agent.tools import training_tools
    result = await training_tools.recommend_learning_path(
        role="data-scientist", current_skills="", goals="model serving",
    )
    assert result["path"] == "AI Factory for Data Scientists"
    assert len(result["recommended_modules"]) == 7
    assert result["total_hours"] > 0


@pytest.mark.asyncio
async def test_recommend_with_existing_skills():
    from ai_factory_agent.tools import training_tools
    result = await training_tools.recommend_learning_path(
        role="data-scientist", current_skills="Model Serving, Pipeline",
    )
    assert result["skipped_modules"] > 0
    assert len(result["recommended_modules"]) < 7


@pytest.mark.asyncio
async def test_recommend_invalid_role():
    from ai_factory_agent.tools import training_tools
    result = await training_tools.recommend_learning_path(role="invalid")
    assert "error" in result


@pytest.mark.asyncio
async def test_track_progress(training_tools):
    result = await training_tools.track_training_progress(
        customer_id="test-bank", learner_name="Alice Smith",
        module_id="ds-01", status="completed", score=92,
    )
    assert result["success"] is True
    assert result["progress"]["completed_count"] == 1


@pytest.mark.asyncio
async def test_team_training_summary(training_tools):
    await training_tools.track_training_progress(
        customer_id="test-bank", learner_name="Alice",
        module_id="ds-01", status="completed",
    )
    await training_tools.track_training_progress(
        customer_id="test-bank", learner_name="Bob",
        module_id="mle-01", status="in_progress",
    )
    result = await training_tools.get_team_training_summary("test-bank")
    assert result["team_size"] == 2
