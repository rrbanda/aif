# Storage for AI Factory

## Object Storage (S3/Ceph) for Datasets

- **Use case**: Large datasets for training. Images, text corpora, embeddings, checkpoints.
- **Benefits**: Scale-out, cost-effective, durable. S3-compatible API (MinIO, Ceph RGW, AWS S3).
- **Throughput**: Training can be I/O bound. Ensure sufficient aggregate throughput (e.g., 1–10 GB/s for large jobs). Use multiple OSDs or nodes for Ceph; consider NVMe-backed object storage.
- **Integration**: OpenShift AI and MLflow can use object storage for artifacts. Mount via s3fs or native SDK.

## PVs for Model Artifacts

- **Use case**: Model binaries, configs, and metadata for serving. Lower latency than object for frequent reads.
- **Benefits**: Block or file storage; fast access for inference pods. Persistent across pod restarts.
- **Sizing**: Models range from hundreds of MB (7B) to hundreds of GB (70B+). Plan for multiple model versions and headroom.
- **Storage class**: Use SSD or NVMe for serving; HDD acceptable for archive.

## Storage Throughput Requirements

- **Training**: Data loading can bottleneck training. Rule of thumb: storage throughput should match or exceed GPU compute consumption of data. For large vision or NLP datasets, 5–20 GB/s aggregate is common for multi-GPU jobs.
- **Inference**: Model load is one-time or rare; inference is compute-bound. Throughput less critical than for training.
- **Checkpointing**: Periodic checkpoint writes during training. Ensure storage can absorb write bursts without blocking training.

## Recommendations

- **Datasets**: Object storage (Ceph, MinIO, or cloud S3). Replicate or erasure-code for durability.
- **Model registry**: Object storage for archive; fast PV or local SSD for active serving.
- **Throughput**: Benchmark with representative workload. Add storage nodes or NVMe if I/O bound.
- **Tiering**: Hot (SSD) for active data; cold (HDD, object) for archives and backups.
