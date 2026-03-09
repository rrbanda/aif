---
name: content-standards
description: Content standards for AI Factory program materials. Use when creating or validating phases, organization elements, use cases, tech stack entries, or markdown content for the AI Factory program.
---

# Content Standards

Apply content standards when creating, editing, or validating AI Factory program materials. Ensure consistency, completeness, and adherence to schemas and conventions.

## When to Apply

Use this skill when the user asks about:
- YAML schema for phases, organization elements, use cases, or tech stack
- Markdown frontmatter, audience tagging, or section structure
- Writing style, validation rules, or content quality for program materials

## YAML Schema

Consult `references/yaml_schema.md` for required fields and validation. Key elements:

- **Phases**: Required fields for phase definitions; ordering and dependencies.
- **Organization elements**: Structure for org charts, roles, and teams.
- **Use cases**: Required fields for use case descriptions; linkage to phases and tech stack.
- **Tech stack entries**: Components, versions, and relationships.

When creating or validating content, check that all required fields are present and conform to types (string, array, etc.). Run validation if tools are available.

## Markdown Conventions

Consult `references/markdown_conventions.md` for format and style. Cover:

- **Frontmatter**: Required YAML frontmatter (title, audience, tags, etc.).
- **Audience tagging**: customer vs. internal; role-specific (AE, SA, etc.).
- **Section structure**: Standard headings (Overview, Prerequisites, Steps, References).
- **Writing style**: Active voice, concise, scannable. Avoid jargon without definition.

When editing, ensure frontmatter is complete, audience is tagged, and structure follows conventions.

## Response Guidelines

- Reference the schema and conventions when answering "what goes in" or "how to format."
- For validation errors, point to the specific field or rule violated.
- Prefer linking to reference files for full detail; summarize key points in responses.
