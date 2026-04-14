FROM python:3.12-slim-bookworm

WORKDIR /app

RUN pip install --no-cache-dir uv

COPY pyproject.toml ./
COPY src/ src/

RUN uv pip install --system --no-cache .

ENV PRODUCTION_MODE=True \
    OPENAI_API_KEY=not-needed \
    CONTENT_DIR=""

RUN useradd -u 1001 -m appuser && chown -R 1001:1001 /app
USER 1001

EXPOSE 8000
CMD ["python", "-m", "ai_factory_kagenti.agent"]
