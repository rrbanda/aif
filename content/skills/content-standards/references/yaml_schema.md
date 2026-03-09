# YAML Schema for AI Factory Content

## Phases

Phases represent stages in the AI Factory engagement or program.

**Required fields:**
- `id`: Unique string identifier (e.g., `phase-discovery`)
- `name`: Human-readable name
- `description`: Brief description of phase objectives
- `order`: Integer for sequencing (1, 2, 3, ...)
- `deliverables`: Array of deliverable strings (optional but recommended)

**Validation rules:**
- `id` must be unique across all phases
- `order` must be positive integer; no gaps recommended
- `description` must be non-empty, max 500 characters

## Organization Elements

Organization elements describe roles, teams, or structures.

**Required fields:**
- `id`: Unique string identifier
- `name`: Display name
- `type`: One of `role`, `team`, `org_unit`
- `description`: Purpose and responsibilities

**Optional:**
- `parent`: Reference to parent org element id
- `members`: Array of role or person references

**Validation rules:**
- `type` must be from allowed enum
- `parent` must reference existing org element if present

## Use Cases

Use cases describe specific AI/ML scenarios or applications.

**Required fields:**
- `id`: Unique string identifier
- `name`: Short, descriptive name
- `description`: Problem statement and solution overview
- `phase_ids`: Array of phase ids this use case applies to
- `tech_stack_ids`: Array of tech stack component ids used

**Optional:**
- `industry`: Banking, healthcare, etc.
- `complexity`: low, medium, high
- `outcomes`: Array of measurable outcomes

**Validation rules:**
- `phase_ids` and `tech_stack_ids` must reference existing ids
- `description` min 100 characters for substance

## Tech Stack Entries

Tech stack entries describe components (software, platforms, services).

**Required fields:**
- `id`: Unique string identifier
- `name`: Component name
- `category`: One of `platform`, `framework`, `tool`, `service`, `infrastructure`
- `description`: What it does and why it's used

**Optional:**
- `version`: Version or version range
- `dependencies`: Array of tech stack ids this depends on
- `documentation_url`: Link to official docs

**Validation rules:**
- `category` must be from allowed enum
- `dependencies` must reference existing tech stack ids (no cycles)
