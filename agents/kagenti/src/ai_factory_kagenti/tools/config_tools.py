from __future__ import annotations

import logging

import httpx

from ..config_loader import get_content_api_url

logger = logging.getLogger(__name__)


async def read_config(config_type: str) -> dict:
    """Read a YAML configuration file from the AI Factory.

    Args:
        config_type: Type of config to read. One of: program, phases,
            organization, use-cases, tech-stack, roles, metrics, agents,
            personas, agent-tools, agent-settings.

    Returns:
        The parsed YAML configuration as a dictionary.
    """
    base_url = get_content_api_url()
    try:
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.get(f"{base_url}/config/{config_type}")
            resp.raise_for_status()
            return resp.json()
    except httpx.HTTPError as e:
        logger.error("Failed to read config '%s': %s", config_type, e)
        return {"error": f"Failed to read config '{config_type}': {str(e)}"}
