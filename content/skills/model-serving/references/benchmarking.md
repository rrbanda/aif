# Benchmarking and Capacity Planning

## GuideLLM Usage

GuideLLM is a benchmarking tool for LLM deployments:

- **Latency**: Measure P50, P95, P99 latency under various load levels.
- **Throughput**: Requests per second (RPS) or tokens per second (TPS) at saturation.
- **Quality**: Optional; integrate with evaluation frameworks for output quality.
- **Scenarios**: Single-user, multi-user, burst, sustained load.

Use GuideLLM to validate deployments before production and to compare configurations (e.g., tensor_parallel_size, batch size).

## Latency and Throughput Measurement

- **Latency**: Time from request sent to first token (TTFT) and time to last token (TTLT). Report percentiles.
- **Throughput**: RPS or TPS. Measure at different concurrency levels to find saturation point.
- **Tradeoff**: Higher concurrency increases throughput but can increase latency (queueing). Tune for target SLA.

## Capacity Planning Methodology

1. **Gather requirements**:
   - Target QPS (queries per second) at peak
   - P95 latency budget (e.g., < 2 seconds)
   - Model size (e.g., Llama 70B)
   - Availability (e.g., 99.9%)

2. **Benchmark baseline**: Run GuideLLM or similar to get RPS per GPU for the model and latency target.

3. **Calculate GPUs**: `GPUs = (Peak QPS × Safety factor) / RPS per GPU`. Safety factor (e.g., 1.2–1.5) for headroom.

4. **Validate**: Run load test at target QPS; confirm latency and error rate meet SLA.

5. **Plan for growth**: Consider 6–12 month growth; scale cluster or add nodes accordingly.

## Example Sizing

- Llama 70B on A100 80GB: ~2–5 RPS per GPU at P95 < 2s depending on sequence length.
- Llama 7B on A100: ~20–50 RPS per GPU.
- Use vendor or community benchmarks as starting point; validate in your environment.
