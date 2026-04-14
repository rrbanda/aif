from google.adk.runners import InMemoryRunner

from .agent_builder import build_root_agent
from .configuration import Configuration

APP_NAME = "ai_factory_kagenti"


def get_runner(config: Configuration | None = None) -> InMemoryRunner:
    agent = build_root_agent(config)
    return InMemoryRunner(agent=agent, app_name=APP_NAME)
