from __future__ import annotations

import logging

import httpx

from ..config_loader import get_express_api_url

logger = logging.getLogger(__name__)


async def read_content(path: str) -> dict:
    """Read a markdown content file from the AI Factory.

    Args:
        path: Path to the content file relative to content directory,
            e.g. 'phases/00-discovery.md' or 'overview/program-overview.md'.

    Returns:
        Dictionary with 'content' key containing the markdown text.
    """
    base_url = get_express_api_url()
    try:
        async with httpx.AsyncClient() as client:
            resp = await client.get(f"{base_url}/api/content/{path}")
            resp.raise_for_status()
            return resp.json()
    except httpx.HTTPError as e:
        logger.error("Failed to read content '%s': %s", path, e)
        return {"error": f"Failed to read content '{path}': {str(e)}"}


async def write_content(path: str, content: str) -> dict:
    """Create or update a markdown content file in the AI Factory.

    Args:
        path: Path to the content file relative to content directory.
        content: The markdown content to write.

    Returns:
        Dictionary with 'success' key indicating the result.
    """
    base_url = get_express_api_url()
    try:
        async with httpx.AsyncClient() as client:
            resp = await client.put(
                f"{base_url}/api/content/{path}",
                json={"content": content},
            )
            resp.raise_for_status()
            return resp.json()
    except httpx.HTTPError as e:
        logger.error("Failed to write content '%s': %s", path, e)
        return {"error": f"Failed to write content '{path}': {str(e)}"}


async def search_content(query: str) -> dict:
    """Search across all content files for matching text.

    Args:
        query: The search query string.

    Returns:
        Dictionary with search results containing matching files and snippets.
    """
    base_url = get_express_api_url()
    try:
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                f"{base_url}/api/content/search",
                params={"q": query},
            )
            resp.raise_for_status()
            return resp.json()
    except httpx.HTTPError as e:
        logger.error("Failed to search content for '%s': %s", query, e)
        return {"error": f"Failed to search content: {str(e)}"}


async def list_content_tree() -> dict:
    """Get the full content directory tree structure.

    Returns:
        Dictionary representing the directory tree with files and folders.
    """
    base_url = get_express_api_url()
    try:
        async with httpx.AsyncClient() as client:
            resp = await client.get(f"{base_url}/api/content/tree")
            resp.raise_for_status()
            return resp.json()
    except httpx.HTTPError as e:
        logger.error("Failed to list content tree: %s", e)
        return {"error": f"Failed to list content tree: {str(e)}"}
