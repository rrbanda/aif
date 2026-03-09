from __future__ import annotations

import logging
import pathlib

from dotenv import load_dotenv
from google.adk.agents import Agent, SequentialAgent, ParallelAgent, LoopAgent, BaseAgent

from .config_loader import (
    load_agents_config,
    load_settings_config,
    load_prompt,
    get_content_dir,
    AgentConfig,
)
from .tool_registry import build_tool_registry
from .workflow_agents import exit_loop

# Load .env from agents/ directory
_agents_dir = pathlib.Path(__file__).parent.parent
load_dotenv(_agents_dir / ".env")

logger = logging.getLogger(__name__)

# Configure logging
settings_cfg = load_settings_config().settings
logging.basicConfig(
    level=getattr(logging, settings_cfg.logging.level, logging.INFO),
    format="%(asctime)s %(name)s %(levelname)s %(message)s",
)

# Tools that are built into the workflow system (not from agent-tools.yaml)
_BUILTIN_TOOLS = {
    "exit_loop": exit_loop,
}


def _load_skills_for_agent(skill_ids: list[str]) -> list:
    """Load ADK Skills from content/skills/ directory."""
    from google.adk.skills import load_skill_from_dir
    from google.adk.tools.skill_toolset import SkillToolset

    content_dir = get_content_dir()
    skills_dir = content_dir / "skills"
    loaded_skills = []

    for skill_id in skill_ids:
        skill_path = skills_dir / skill_id
        if skill_path.exists() and (skill_path / "SKILL.md").exists():
            try:
                skill = load_skill_from_dir(skill_path)
                loaded_skills.append(skill)
                logger.info("Loaded skill: %s", skill_id)
            except Exception:
                logger.exception("Failed to load skill: %s", skill_id)
        else:
            logger.warning("Skill directory not found: %s", skill_path)

    if loaded_skills:
        return [SkillToolset(skills=loaded_skills)]
    return []


def _build_llm_agent(
    agent_cfg: AgentConfig,
    tool_registry: dict,
    agents_by_id: dict[str, AgentConfig],
    built_agents: dict[str, BaseAgent],
) -> Agent:
    """Build an LLM-powered agent (the original agent type)."""
    instruction = load_prompt(agent_cfg.prompt_file) if agent_cfg.prompt_file else ""

    agent_tools = []
    for tool_id in agent_cfg.tools:
        if tool_id in tool_registry:
            agent_tools.append(tool_registry[tool_id])
        elif tool_id in _BUILTIN_TOOLS:
            agent_tools.append(_BUILTIN_TOOLS[tool_id])
        else:
            logger.warning(
                "Tool '%s' referenced by agent '%s' not found in registry",
                tool_id, agent_cfg.id,
            )

    skill_toolsets = _load_skills_for_agent(agent_cfg.skills)
    all_tools = agent_tools + skill_toolsets

    sub_agents = _build_sub_agents(agent_cfg, tool_registry, agents_by_id, built_agents)

    kwargs: dict = {
        "name": agent_cfg.id.replace("-", "_"),
        "model": agent_cfg.model,
        "description": agent_cfg.description,
        "instruction": instruction,
        "tools": all_tools if all_tools else [],
        "sub_agents": sub_agents,
    }
    if agent_cfg.output_key:
        kwargs["output_key"] = agent_cfg.output_key

    return Agent(**kwargs)


def _build_sequential_agent(
    agent_cfg: AgentConfig,
    tool_registry: dict,
    agents_by_id: dict[str, AgentConfig],
    built_agents: dict[str, BaseAgent],
) -> SequentialAgent:
    """Build a SequentialAgent that runs sub-agents in order."""
    sub_agents = _build_sub_agents(agent_cfg, tool_registry, agents_by_id, built_agents)
    return SequentialAgent(
        name=agent_cfg.id.replace("-", "_"),
        description=agent_cfg.description,
        sub_agents=sub_agents,
    )


def _build_parallel_agent(
    agent_cfg: AgentConfig,
    tool_registry: dict,
    agents_by_id: dict[str, AgentConfig],
    built_agents: dict[str, BaseAgent],
) -> ParallelAgent:
    """Build a ParallelAgent that runs sub-agents concurrently."""
    sub_agents = _build_sub_agents(agent_cfg, tool_registry, agents_by_id, built_agents)
    return ParallelAgent(
        name=agent_cfg.id.replace("-", "_"),
        description=agent_cfg.description,
        sub_agents=sub_agents,
    )


def _build_loop_agent(
    agent_cfg: AgentConfig,
    tool_registry: dict,
    agents_by_id: dict[str, AgentConfig],
    built_agents: dict[str, BaseAgent],
) -> LoopAgent:
    """Build a LoopAgent that repeats sub-agents until escalation or max iterations."""
    sub_agents = _build_sub_agents(agent_cfg, tool_registry, agents_by_id, built_agents)
    max_iterations = 5
    if agent_cfg.workflow_config:
        max_iterations = agent_cfg.workflow_config.max_iterations
    return LoopAgent(
        name=agent_cfg.id.replace("-", "_"),
        description=agent_cfg.description,
        sub_agents=sub_agents,
        max_iterations=max_iterations,
    )


def _build_sub_agents(
    agent_cfg: AgentConfig,
    tool_registry: dict,
    agents_by_id: dict[str, AgentConfig],
    built_agents: dict[str, BaseAgent],
) -> list[BaseAgent]:
    """Build all sub-agents for a given agent config."""
    sub_agents = []
    for sub_id in agent_cfg.sub_agents:
        sub_cfg = agents_by_id.get(sub_id)
        if sub_cfg is None:
            logger.warning(
                "Sub-agent '%s' referenced by '%s' not found in agents.yaml",
                sub_id, agent_cfg.id,
            )
            continue
        sub_agent = _build_agent(sub_cfg, tool_registry, agents_by_id, built_agents)
        sub_agents.append(sub_agent)
    return sub_agents


# Agent type builder dispatch
_AGENT_BUILDERS = {
    "llm": _build_llm_agent,
    "sequential": _build_sequential_agent,
    "parallel": _build_parallel_agent,
    "loop": _build_loop_agent,
}


def _build_agent(
    agent_cfg: AgentConfig,
    tool_registry: dict,
    agents_by_id: dict[str, AgentConfig],
    built_agents: dict[str, BaseAgent],
) -> BaseAgent:
    """Recursively build an ADK Agent from YAML config, dispatching by type."""
    if agent_cfg.id in built_agents:
        return built_agents[agent_cfg.id]

    builder = _AGENT_BUILDERS.get(agent_cfg.type)
    if builder is None:
        raise ValueError(
            f"Unknown agent type '{agent_cfg.type}' for agent '{agent_cfg.id}'. "
            f"Valid types: {list(_AGENT_BUILDERS.keys())}"
        )

    agent = builder(agent_cfg, tool_registry, agents_by_id, built_agents)
    built_agents[agent_cfg.id] = agent

    logger.info(
        "Built agent: %s (type=%s, sub_agents=%d)",
        agent_cfg.id,
        agent_cfg.type,
        len(agent_cfg.sub_agents),
    )
    return agent


def _build_root_agent() -> BaseAgent:
    """Build the full agent tree from YAML configuration."""
    agents_cfg = load_agents_config()
    tool_registry = build_tool_registry()

    agents_by_id = {a.id: a for a in agents_cfg.agents}

    coordinator_cfg = agents_by_id.get("coordinator")
    if coordinator_cfg is None:
        raise ValueError("No agent with id='coordinator' found in agents.yaml")

    built_agents: dict[str, BaseAgent] = {}
    root = _build_agent(coordinator_cfg, tool_registry, agents_by_id, built_agents)

    logger.info("Agent tree built: %d agents total", len(built_agents))
    return root


# ADK discovers this module-level `root_agent` variable
root_agent = _build_root_agent()
