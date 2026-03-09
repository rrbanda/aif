from __future__ import annotations

import logging

import httpx

from ..config_loader import get_express_api_url

logger = logging.getLogger(__name__)


async def git_commit(file_path: str, message: str) -> dict:
    """Commit a content file change to the git repository.

    Args:
        file_path: Path to the file to commit, relative to content directory.
        message: Git commit message describing the change.

    Returns:
        Dictionary with commit result including hash and status.
    """
    base_url = get_express_api_url()
    try:
        async with httpx.AsyncClient() as client:
            resp = await client.post(
                f"{base_url}/api/git/commit",
                json={"filePath": file_path, "message": message},
            )
            resp.raise_for_status()
            return resp.json()
    except httpx.HTTPError as e:
        logger.error("Failed to commit '%s': %s", file_path, e)
        return {"error": f"Failed to commit '{file_path}': {str(e)}"}
