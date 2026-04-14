"""Build the full ADK agent tree from YAML config, using LiteLLM for all LLM calls.

This is the Kagenti adaptation of the original agents/ai_factory_agent/agent.py.
Key change: every Agent(model=...) now uses LiteLlm instead of a raw Gemini string.
"""

from __future__ import annotations

import logging
import pathlib

from google.adk.agents import Agent, SequentialAgent, ParallelAgent, LoopAgent, BaseAgent
from google.adk.models.lite_llm import LiteLlm

from .config_loader import (
    load_agents_config,
    load_prompt,
    get_content_dir,
    AgentConfig,
)
from .configuration import Configuration
from .tool_registry import build_tool_registry
from .workflow_agents import exit_loop

logger = logging.getLogger(__name__)

_BUILTIN_TOOLS = {
    "exit_loop": exit_loop,
}


def _build_model(config: Configuration) -> LiteLlm:
    return LiteLlm(
        model=config.llm_model,
        api_base=config.llm_api_base,
        api_key=config.llm_api_key,
    )


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
    model: LiteLlm,
) -> Agent:
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

    sub_agents = _build_sub_agents(agent_cfg, tool_registry, agents_by_id, built_agents, model)

    kwargs: dict = {
        "name": agent_cfg.id.replace("-", "_"),
        "model": model,
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
    model: LiteLlm,
) -> SequentialAgent:
    sub_agents = _build_sub_agents(agent_cfg, tool_registry, agents_by_id, built_agents, model)
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
    model: LiteLlm,
) -> ParallelAgent:
    sub_agents = _build_sub_agents(agent_cfg, tool_registry, agents_by_id, built_agents, model)
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
    model: LiteLlm,
) -> LoopAgent:
    sub_agents = _build_sub_agents(agent_cfg, tool_registry, agents_by_id, built_agents, model)
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
    model: LiteLlm,
) -> list[BaseAgent]:
    sub_agents = []
    for sub_id in agent_cfg.sub_agents:
        sub_cfg = agents_by_id.get(sub_id)
        if sub_cfg is None:
            logger.warning(
                "Sub-agent '%s' referenced by '%s' not found in agents.yaml",
                sub_id, agent_cfg.id,
            )
            continue
        sub_agent = _build_agent(sub_cfg, tool_registry, agents_by_id, built_agents, model)
        sub_agents.append(sub_agent)
    return sub_agents


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
    model: LiteLlm,
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

    agent = builder(agent_cfg, tool_registry, agents_by_id, built_agents, model)
    built_agents[agent_cfg.id] = agent

    logger.info(
        "Built agent: %s (type=%s, sub_agents=%d)",
        agent_cfg.id,
        agent_cfg.type,
        len(agent_cfg.sub_agents),
    )
    return agent


def build_root_agent(config: Configuration | None = None) -> BaseAgent:
    """Build the full agent tree from YAML configuration with LiteLLM model."""
    if config is None:
        config = Configuration()

    model = _build_model(config)
    agents_cfg = load_agents_config()
    tool_registry = build_tool_registry()

    agents_by_id = {a.id: a for a in agents_cfg.agents}

    coordinator_cfg = agents_by_id.get("coordinator")
    if coordinator_cfg is None:
        raise ValueError("No agent with id='coordinator' found in agents.yaml")

    built_agents: dict[str, BaseAgent] = {}
    root = _build_agent(coordinator_cfg, tool_registry, agents_by_id, built_agents, model)

    logger.info("Agent tree built: %d agents total", len(built_agents))
    return root
