# Markdown Conventions for AI Factory Content

## Frontmatter Format

All content files should include YAML frontmatter at the top:

```yaml
---
title: "Document Title"
audience: customer | internal
tags:
  - tag1
  - tag2
roles:
  - AE
  - SA
last_updated: YYYY-MM-DD
---
```

**Required fields:**
- `title`: Clear, descriptive title
- `audience`: `customer` (customer-facing) or `internal` (internal only)
- `tags`: Array of topic tags for discoverability

**Optional:**
- `roles`: Target roles (AE, SA, AI Sales, etc.) when content is role-specific
- `last_updated`: Date of last review

## Audience Tagging

- **customer**: Content suitable for customers (presentations, guides, case studies). No internal pricing, strategy, or confidential information.
- **internal**: Content for Red Hat internal use (competitive info, pricing, internal processes). Do not expose to customers.

When in doubt, tag as `internal` until reviewed.

## Section Structure

Use consistent heading hierarchy:

1. **Overview** (H2): Brief summary of the document's purpose and scope
2. **Prerequisites** (H2): What the reader needs before starting (optional)
3. **Steps / Instructions** (H2): Main content, numbered or bulleted
4. **References** (H2): Links to related docs, schemas, or external resources (optional)

Avoid deep nesting (H4+); prefer flattening or splitting into multiple documents.

## Writing Style Guide

- **Active voice**: "Configure the model" not "The model should be configured"
- **Concise**: Short sentences; one idea per paragraph. Avoid filler.
- **Scannable**: Use bullets and numbered lists for procedures. Bold key terms on first use.
- **Define jargon**: On first use, briefly define or link to definition. E.g., "PagedAttention (a memory optimization for LLM inference)"
- **Consistent terminology**: Use official product names (OpenShift AI, RHOAI). Avoid synonyms for the same concept (e.g., don't mix "model" and "artifact" inconsistently).
- **Audience-appropriate**: Match technical depth to audience. AE content: less technical, more business value. SA content: can include architecture and implementation detail.
