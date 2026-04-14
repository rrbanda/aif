"""Competitive battlecard generation tools.

Provides tools for generating dynamic competitive analysis battlecards
tailored to specific customer scenarios and competitor comparisons.
"""

from __future__ import annotations

import logging
from datetime import datetime

logger = logging.getLogger(__name__)

COMPETITORS = {
    "databricks": {
        "name": "Databricks",
        "strengths": [
            "Unified analytics and AI platform",
            "Strong data lakehouse story",
            "Large community and ecosystem",
            "Unity Catalog for governance",
        ],
        "weaknesses": [
            "Cloud-only, no on-prem option",
            "Vendor lock-in to Databricks runtime",
            "Expensive at scale",
            "Limited GPU orchestration",
            "No hardware-level integration",
        ],
    },
    "aws-sagemaker": {
        "name": "AWS SageMaker + Bedrock",
        "strengths": [
            "Deep AWS ecosystem integration",
            "Managed infrastructure",
            "Bedrock for foundation model access",
            "SageMaker JumpStart for quick starts",
        ],
        "weaknesses": [
            "AWS lock-in",
            "Complex pricing",
            "Limited on-prem/hybrid support",
            "No Red Hat platform integration",
            "Difficult multi-cloud",
        ],
    },
    "azure-ai": {
        "name": "Azure AI Studio + OpenAI",
        "strengths": [
            "OpenAI partnership (GPT-4, DALL-E)",
            "Enterprise Azure integration",
            "Azure ML for custom models",
            "Copilot ecosystem",
        ],
        "weaknesses": [
            "Azure lock-in",
            "OpenAI dependency for GenAI",
            "Limited on-prem model hosting",
            "No GPU-level infrastructure optimization",
            "Weaker for custom model training",
        ],
    },
    "google-vertex": {
        "name": "Google Vertex AI",
        "strengths": [
            "Gemini model family",
            "Strong MLOps tooling",
            "AutoML capabilities",
            "BigQuery integration",
        ],
        "weaknesses": [
            "GCP lock-in",
            "Smaller enterprise footprint",
            "Limited on-prem options",
            "Less banking/FS focus",
        ],
    },
}

RED_HAT_DIFFERENTIATORS = [
    "On-prem, hybrid, and multi-cloud deployment flexibility",
    "Red Hat AI Factory methodology -- proven seven-stage framework with value gates",
    "Curated partner ecosystem -- NVIDIA, Intel, AMD, Dell, HPE, Lenovo, Cisco",
    "Enterprise Kubernetes (OpenShift) as the universal platform",
    "Open-source foundation -- no model or platform lock-in",
    "Built-in security and compliance (FIPS, FedRAMP-ready, SOC2)",
    "Model portability across environments and hardware vendors",
    "Integrated MLOps with OpenShift AI (KServe, Kubeflow, model registry)",
    "InstructLab for open-source model fine-tuning",
    "Data sovereignty for regulated industries",
]


async def generate_battlecard(
    competitor: str,
    customer_context: str = "",
    use_case: str = "",
) -> dict:
    """Generate a competitive battlecard for a specific competitor.

    Args:
        competitor: Competitor identifier (databricks, aws-sagemaker, azure-ai, google-vertex).
        customer_context: Optional customer-specific context for tailoring.
        use_case: Optional specific use case for focused comparison.

    Returns:
        Structured battlecard data.
    """
    comp_data = COMPETITORS.get(competitor)
    if comp_data is None:
        return {
            "error": f"Unknown competitor '{competitor}'",
            "available": list(COMPETITORS.keys()),
        }

    battlecard = {
        "competitor": comp_data["name"],
        "generated": datetime.utcnow().isoformat(),
        "red_hat_differentiators": RED_HAT_DIFFERENTIATORS,
        "competitor_strengths": comp_data["strengths"],
        "competitor_weaknesses": comp_data["weaknesses"],
        "key_questions_to_ask_customer": [
            "Do you require on-premise or hybrid deployment?",
            "Is data sovereignty a regulatory requirement?",
            "Do you need GPU-level infrastructure control?",
            "Are you planning multi-cloud or avoiding lock-in?",
            "Do you need open-source model fine-tuning capabilities?",
        ],
        "customer_context": customer_context,
        "use_case": use_case,
    }

    if competitor == "databricks" and "on-prem" in customer_context.lower():
        battlecard["knockout_factor"] = "Databricks has no on-premises deployment option. Red Hat AI Factory runs on-prem natively."

    if competitor in ("aws-sagemaker", "azure-ai", "google-vertex"):
        battlecard["hybrid_advantage"] = "Red Hat provides identical platform experience across on-prem, private cloud, and public cloud -- avoiding lock-in to any single cloud provider."

    return battlecard


async def list_competitors() -> dict:
    """List available competitors for battlecard generation.

    Returns:
        List of competitor IDs and names.
    """
    return {
        "competitors": [
            {"id": k, "name": v["name"]}
            for k, v in COMPETITORS.items()
        ]
    }
