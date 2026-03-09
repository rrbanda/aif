"""Deliverable generation tools.

Produces structured documents (assessment reports, program charters,
architecture documents) and saves them to the customer account directory.
"""

from __future__ import annotations

import logging
from datetime import date
from pathlib import Path

from ..config_loader import get_content_dir

logger = logging.getLogger(__name__)

_CUSTOMERS_DIR = get_content_dir() / "customers"


async def save_deliverable(
    customer_id: str,
    deliverable_type: str,
    title: str,
    content: str,
) -> dict:
    """Save a generated deliverable as a markdown file in the customer directory.

    Args:
        customer_id: Customer identifier.
        deliverable_type: Type of deliverable (e.g. 'assessment-report',
            'program-charter', 'architecture-document', 'mlops-runbook').
        title: Document title.
        content: Full markdown content of the deliverable.

    Returns:
        Dictionary with the file path and success status.
    """
    customer_dir = _CUSTOMERS_DIR / customer_id / "deliverables"
    customer_dir.mkdir(parents=True, exist_ok=True)

    filename = f"{deliverable_type}-{date.today().isoformat()}.md"
    filepath = customer_dir / filename

    header = f"# {title}\n\n"
    header += f"**Customer:** {customer_id}  \n"
    header += f"**Date:** {date.today().isoformat()}  \n"
    header += f"**Type:** {deliverable_type}  \n\n---\n\n"

    filepath.write_text(header + content, encoding="utf-8")

    logger.info("Saved deliverable: %s for %s", filename, customer_id)
    return {
        "success": True,
        "path": str(filepath.relative_to(get_content_dir())),
        "filename": filename,
        "deliverable_type": deliverable_type,
    }


async def list_deliverables(customer_id: str) -> dict:
    """List all deliverables for a customer.

    Args:
        customer_id: Customer identifier.

    Returns:
        List of deliverable files with metadata.
    """
    customer_dir = _CUSTOMERS_DIR / customer_id / "deliverables"
    deliverables = []

    if customer_dir.exists():
        for f in sorted(customer_dir.glob("*.md"), reverse=True):
            deliverables.append({
                "filename": f.name,
                "path": str(f.relative_to(get_content_dir())),
                "size_bytes": f.stat().st_size,
            })

    return {"customer_id": customer_id, "deliverables": deliverables, "count": len(deliverables)}
