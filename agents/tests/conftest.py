"""Shared fixtures for AI Factory agent tests."""

import os
import shutil
import tempfile
from pathlib import Path
from unittest.mock import patch

import pytest

os.environ.setdefault("GOOGLE_API_KEY", "test-key-not-real")


@pytest.fixture
def tmp_content_dir(tmp_path):
    """Provide a temporary content directory with required structure."""
    content = tmp_path / "content"
    content.mkdir()
    (content / "customers").mkdir()
    (content / "config").mkdir()
    (content / "prompts").mkdir()
    (content / "skills").mkdir()
    return content


@pytest.fixture
def sample_customer(tmp_content_dir):
    """Create a sample customer account for testing."""
    import yaml

    customer_dir = tmp_content_dir / "customers" / "test-bank"
    customer_dir.mkdir(parents=True)

    account = {
        "account": {
            "id": "test-bank",
            "name": "Test Bank Corp",
            "industry": "financial-services",
            "tier": "tier-1",
            "region": "north-america",
            "openshift_version": "4.16",
            "created": "2026-01-15",
            "updated": "2026-03-01",
        },
        "contacts": [],
        "red_hat_team": {"ae": "Jane Doe", "account_sa": "John Smith"},
        "program_state": {
            "current_phase": "00-discovery",
            "phases_completed": [],
            "phases_in_progress": [],
        },
        "assessment": {
            "overall_readiness": "Level 1",
            "data_readiness": "Level 1",
            "assessment_date": "2026-02-01",
        },
        "use_cases": [
            {
                "id": "fraud-detection",
                "name": "Fraud Detection",
                "status": "proposed",
                "priority": 1,
                "qualified": False,
            }
        ],
        "models": [],
        "engagement": {},
    }

    (customer_dir / "account.yaml").write_text(
        yaml.dump(account, default_flow_style=False)
    )
    return "test-bank"


@pytest.fixture
def patch_content_dir(tmp_content_dir):
    """Patch the content directory to use tmp_path."""
    with patch(
        "ai_factory_agent.config_loader.get_content_dir",
        return_value=tmp_content_dir,
    ):
        yield tmp_content_dir
