from pydantic_settings import BaseSettings, SettingsConfigDict


class Configuration(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="", env_file=".env", extra="ignore")

    llm_model: str = "openai/gemini/models/gemini-2.5-flash"
    llm_api_base: str = "http://localhost:8000/v1"
    llm_api_key: str = "not-needed"

    agent_endpoint: str = "http://localhost:8000/"

    # RHDH backend URL for content/config/data tools.
    # Tools that previously called the Express server now call this instead.
    content_api_url: str = "http://localhost:7007/api/aifactory"

    # Fallback local content directory (baked into the image or mounted via PVC).
    # If blank, tools rely exclusively on content_api_url.
    content_dir: str = ""
