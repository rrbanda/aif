# llm-d Routing Architecture

## llm-d Overview

llm-d is a routing and orchestration layer for LLM serving. It sits in front of model backends (e.g., vLLM, TGI) and provides:

- **Multi-model routing**: Route requests to the correct backend based on model ID or capability.
- **Load balancing**: Distribute traffic across replicas of the same model.
- **Request scheduling**: Queue management, prioritization, and timeout handling.
- **Unified API**: Single entry point for clients; backend complexity hidden.

## Routing Architecture

- **Model routing**: Incoming request specifies model (e.g., `llama-3-70b`); llm-d routes to the appropriate vLLM/TGI deployment.
- **Capability routing**: Route by capability (e.g., code vs. chat) if different models serve different use cases.
- **Fallback**: If primary backend unavailable, route to fallback or return error.

## Multi-Model Serving

- **Resource sharing**: Multiple models can share a cluster; llm-d routes to the right pods.
- **Isolation**: Use separate deployments per model for resource isolation and independent scaling.
- **Scaling**: Scale each model independently based on its traffic; llm-d adapts routing.

## Load Balancing

- **Replicas**: Multiple pods per model; llm-d load-balances across them.
- **Health checks**: Exclude unhealthy replicas from routing.
- **Sticky sessions**: Optional; useful if session state is cached per replica.

## Request Scheduling

- **Queue**: Requests queued when all replicas are busy; FIFO or priority.
- **Timeout**: Reject or fail requests that wait too long; prevent queue buildup.
- **Backpressure**: Return 503 or similar when overloaded; clients can retry with backoff.

## Integration with OpenShift AI

llm-d integrates with OpenShift AI Model-as-a-Service. Deploy llm-d as the ingress for MaaS; it routes to vLLM or other backends. Use OpenShift HPA for scaling llm-d and backends.
