from __future__ import annotations

import logging
import pathlib
from typing import Optional

import yaml
from pydantic import BaseModel, Field

logger = logging.getLogger(__name__)

# Resolve paths relative to the monorepo root
_AGENTS_DIR = pathlib.Path(__file__).parent.parent
_PROJECT_ROOT = _AGENTS_DIR.parent
_CONTENT_DIR = _PROJECT_ROOT / "content"
_CONFIG_DIR = _CONTENT_DIR / "config"


# --- Pydantic Models for agents.yaml ---

class WorkflowConfig(BaseModel):
    max_iterations: int = 5
    state_keys: list[str] = Field(default_factory=list)
    conditional_logic: bool = False


class AgentConfig(BaseModel):
    id: str
    type: str = "llm"
    name: str
    description: str
    model: str = "gemini-2.5-pro"
    temperature: float = 0.4
    prompt_file: Optional[str] = None
    persona: Optional[str] = None
    output_key: Optional[str] = None
    tools: list[str] = Field(default_factory=list)
    skills: list[str] = Field(default_factory=list)
    sub_agents: list[str] = Field(default_factory=list)
    workflow_config: Optional[WorkflowConfig] = None


class AgentsFileConfig(BaseModel):
    agents: list[AgentConfig]


# --- Pydantic Models for personas.yaml ---

class PersonaConfig(BaseModel):
    id: str
    title: str
    short_title: str
    icon: str
    organization: str
    description: str
    greeting: str
    suggested_prompts: list[str] = Field(default_factory=list)


class PersonasFileConfig(BaseModel):
    personas: list[PersonaConfig]


# --- Pydantic Models for agent-tools.yaml ---

class ToolParameter(BaseModel):
    name: str
    type: str = "string"
    required: bool = True
    enum: Optional[list[str]] = None


class ToolConfig(BaseModel):
    id: str
    name: str
    description: str
    endpoint: Optional[str] = None
    method: Optional[str] = None
    type: Optional[str] = None
    parameters: list[ToolParameter] = Field(default_factory=list)


class ExpressAuthConfig(BaseModel):
    username: str = "admin"
    password: str = "admin"


class ExpressApiConfig(BaseModel):
    base_url: str = "http://localhost:3001"
    auth: ExpressAuthConfig = Field(default_factory=ExpressAuthConfig)


class ToolsFileConfig(BaseModel):
    tools: list[ToolConfig]
    express_api: ExpressApiConfig = Field(default_factory=ExpressApiConfig)


# --- Pydantic Models for agent-settings.yaml ---

class SessionSettings(BaseModel):
    timeout_minutes: int = 60
    max_sessions_per_user: int = 5


class MemorySettings(BaseModel):
    type: str = "in-memory"
    cross_session_recall: bool = True


class StreamingSettings(BaseModel):
    enabled: bool = True
    token_level: bool = True


class LoggingSettings(BaseModel):
    level: str = "INFO"
    format: str = "structured"


class GuardrailSettings(BaseModel):
    max_tool_calls_per_turn: int = 10
    max_tokens_per_response: int = 4096
    require_tool_confirmation: bool = False
    blocked_operations: list[str] = Field(default_factory=list)


class SettingsConfig(BaseModel):
    default_model: str = "gemini-2.5-pro"
    api_server_port: int = 8000
    session: SessionSettings = Field(default_factory=SessionSettings)
    memory: MemorySettings = Field(default_factory=MemorySettings)
    streaming: StreamingSettings = Field(default_factory=StreamingSettings)
    logging: LoggingSettings = Field(default_factory=LoggingSettings)
    guardrails: GuardrailSettings = Field(default_factory=GuardrailSettings)


class SettingsFileConfig(BaseModel):
    settings: SettingsConfig


# --- Loader Functions ---

def _load_yaml(filename: str) -> dict:
    path = _CONFIG_DIR / filename
    if not path.exists():
        raise FileNotFoundError(f"Config file not found: {path}")
    with open(path) as f:
        data = yaml.safe_load(f)
    logger.info("Loaded config: %s", path)
    return data


def load_agents_config() -> AgentsFileConfig:
    return AgentsFileConfig(**_load_yaml("agents.yaml"))


def load_personas_config() -> PersonasFileConfig:
    return PersonasFileConfig(**_load_yaml("personas.yaml"))


def load_tools_config() -> ToolsFileConfig:
    return ToolsFileConfig(**_load_yaml("agent-tools.yaml"))


def load_settings_config() -> SettingsFileConfig:
    return SettingsFileConfig(**_load_yaml("agent-settings.yaml"))


def load_prompt(prompt_file: str) -> str:
    path = _CONTENT_DIR / prompt_file
    if not path.exists():
        logger.warning("Prompt file not found: %s, using empty prompt", path)
        return ""
    return path.read_text(encoding="utf-8")


def get_content_dir() -> pathlib.Path:
    return _CONTENT_DIR


def get_express_api_url() -> str:
    tools_config = load_tools_config()
    return tools_config.express_api.base_url
