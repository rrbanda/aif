FROM ghcr.io/astral-sh/uv:python3.12-bookworm-slim
ARG RELEASE_VERSION="main"

WORKDIR /app
COPY agents/kagenti/pyproject.toml agents/kagenti/uv.lock ./
COPY agents/kagenti/src/ src/
RUN uv sync --frozen --no-cache --link-mode copy

COPY content/ /content/

ENV PRODUCTION_MODE=True \
    RELEASE_VERSION=${RELEASE_VERSION} \
    OPENAI_API_KEY=not-needed \
    CONTENT_DIR=/content

RUN chown -R 1001:1001 /app /content
USER 1001

CMD ["uv", "run", "--no-sync", "server", "--host", "0.0.0.0", "--port", "8000"]
