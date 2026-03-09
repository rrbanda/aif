from __future__ import annotations

import logging

from .config_tools import read_config
from .content_tools import read_content

logger = logging.getLogger(__name__)


async def generate_executive_summary(scope: str, target_id: str = "") -> dict:
    """Generate an executive-level summary of the AI Factory program or a specific phase.

    Args:
        scope: Scope of summary - 'program', 'phase', or 'use-case'.
        target_id: Optional ID of the specific phase or use-case to summarize.

    Returns:
        Dictionary with context data for the LLM to generate the summary.
    """
    context: dict = {"scope": scope, "target_id": target_id}
    try:
        if scope == "program":
            program = await read_config("program")
            metrics = await read_config("metrics")
            context["program"] = program
            context["metrics"] = metrics
        elif scope == "phase":
            phases = await read_config("phases")
            matching = [p for p in phases.get("phases", []) if p.get("id") == target_id]
            context["phase"] = matching[0] if matching else None
            if target_id:
                content = await read_content(f"phases/{target_id}.md")
                context["content"] = content
        elif scope == "use-case":
            use_cases = await read_config("use-cases")
            matching = [u for u in use_cases.get("use_cases", []) if u.get("id") == target_id]
            context["use_case"] = matching[0] if matching else None
    except Exception as e:
        logger.error("Error gathering context for executive summary: %s", e)
        context["error"] = str(e)

    return {
        "instruction": f"Generate an executive summary for {scope}" + (f" '{target_id}'" if target_id else ""),
        "context": context,
    }


async def calculate_roi_estimate(phase: str, use_case: str = "") -> dict:
    """Calculate estimated ROI based on program metrics and deployment phase.

    Args:
        phase: The phase ID to calculate ROI for.
        use_case: Optional specific use case to focus the ROI calculation on.

    Returns:
        Dictionary with metrics data and ROI calculation context.
    """
    context: dict = {"phase": phase, "use_case": use_case}
    try:
        metrics = await read_config("metrics")
        phases = await read_config("phases")
        context["metrics"] = metrics
        matching = [p for p in phases.get("phases", []) if p.get("id") == phase]
        context["phase_details"] = matching[0] if matching else None
        if use_case:
            use_cases = await read_config("use-cases")
            matching_uc = [u for u in use_cases.get("use_cases", []) if u.get("id") == use_case]
            context["use_case_details"] = matching_uc[0] if matching_uc else None
    except Exception as e:
        logger.error("Error gathering ROI context: %s", e)
        context["error"] = str(e)

    return {
        "instruction": f"Calculate ROI estimate for phase '{phase}'" + (f" use case '{use_case}'" if use_case else ""),
        "context": context,
    }


async def generate_architecture_diagram_description(scope: str) -> dict:
    """Generate a textual architecture diagram description for the AI Factory deployment.

    Args:
        scope: Scope of the architecture description, e.g. 'platform-foundation',
            'full-stack', 'gpu-topology', 'data-pipeline'.

    Returns:
        Dictionary with architecture context for the LLM to describe.
    """
    context: dict = {"scope": scope}
    try:
        tech_stack = await read_config("tech-stack")
        context["tech_stack"] = tech_stack
        arch_content = await read_content("reference/architecture.md")
        context["architecture"] = arch_content
    except Exception as e:
        logger.error("Error gathering architecture context: %s", e)
        context["error"] = str(e)

    return {
        "instruction": f"Generate an architecture diagram description for scope '{scope}'",
        "context": context,
    }


async def generate_pipeline_description(use_case: str) -> dict:
    """Generate a detailed ML pipeline description for a use case.

    Args:
        use_case: The use case ID or description to generate a pipeline for.

    Returns:
        Dictionary with pipeline context for the LLM to describe.
    """
    context: dict = {"use_case": use_case}
    try:
        tech_stack = await read_config("tech-stack")
        context["tech_stack"] = tech_stack
        use_cases = await read_config("use-cases")
        matching = [u for u in use_cases.get("use_cases", []) if u.get("id") == use_case]
        context["use_case_details"] = matching[0] if matching else None
    except Exception as e:
        logger.error("Error gathering pipeline context: %s", e)
        context["error"] = str(e)

    return {
        "instruction": f"Generate an ML pipeline description for use case '{use_case}'",
        "context": context,
    }


async def generate_use_case_qualification(use_case_description: str) -> dict:
    """Generate a qualification matrix for a potential AI use case.

    Args:
        use_case_description: Description of the use case to qualify.

    Returns:
        Dictionary with qualification context and scoring criteria.
    """
    context: dict = {"description": use_case_description}
    try:
        existing_cases = await read_config("use-cases")
        context["existing_use_cases"] = existing_cases
        program = await read_config("program")
        context["program"] = program
    except Exception as e:
        logger.error("Error gathering qualification context: %s", e)
        context["error"] = str(e)

    return {
        "instruction": f"Generate a use case qualification matrix for: {use_case_description}",
        "context": context,
    }
