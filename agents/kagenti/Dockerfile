FROM ghcr.io/astral-sh/uv:python3.12-bookworm-slim
ARG RELEASE_VERSION="main"

WORKDIR /app

COPY pyproject.toml uv.lock ./
COPY src/ src/

RUN uv sync --no-cache --locked --link-mode copy

ENV PRODUCTION_MODE=True \
    RELEASE_VERSION=${RELEASE_VERSION} \
    OPENAI_API_KEY=not-needed \
    CONTENT_DIR=""

RUN chown -R 1001:1001 /app
USER 1001

CMD ["uv", "run", "--no-sync", "server", "--host", "0.0.0.0", "--port", "8000"]
