---
title: AI & DevOps Workflows (MLOps & Model Serving)
description: Production MLOps pipelines, high-throughput LLM serving with vLLM, PagedAttention, quantization with AWQ/GGUF, LoRA fine-tuning, and AI observability
---

<div class="se-hero">
  <div class="se-hero-badge">AI & Machine Learning Curriculum</div>
  <h1>AI & DevOps Workflows (MLOps & Model Serving)</h1>
  <p class="se-hero-subtitle">Bridge machine learning models and high-availability cloud infrastructure. Master vLLM PagedAttention inference, AWQ/GGUF quantization, LoRA fine-tuning, and GPU cluster orchestration.</p>
</div>

---

## 1. The Production GenAIOps Lifecycle

Deploying large language models introduces unique infrastructure challenges distinct from traditional microservices: high GPU memory constraints, non-deterministic token streams, and substantial compute costs.

```
[Curated Data] ──> [LoRA / QLoRA Fine-Tuning] ──> [Model Quantization (AWQ/GGUF)]
                                                              │
                                                              ▼
[Prometheus / OpenTelemetry] ◄── [vLLM Serving Cluster (PagedAttention)]
             │                                                │
             ▼                                                ▼
[Latency & Drift Alerts]                           [Fast Streaming API (< 15ms TTFT)]
```

---

## 2. High-Throughput Serving: vLLM & PagedAttention

Traditional transformer inference allocates a contiguous block of static VRAM for each request's **KV-Cache** (Key-Value cache). Because generation lengths are unknown in advance, up to 60–80% of GPU memory is wasted on reserved or fragmented memory allocations.

### PagedAttention Solution:
**vLLM** borrows the virtual memory paging paradigm from operating systems. It divides the KV-Cache into non-contiguous physical memory blocks, enabling:
1. **Zero Memory Waste:** Dynamic block allocation on-demand as new tokens generate.
2. **Continuous Batching:** Requests join and leave the batch at each token iteration rather than waiting for the entire batch to finish.
3. **Prefix Caching:** Identical system prompts (e.g. enterprise context or few-shot examples) are cached once and shared across concurrent requests.

```bash
# Launch a production vLLM server with tensor parallelism across 2 GPUs
python3 -m vllm.entrypoints.openai.api_server \
    --model meta-llama/Meta-Llama-3.1-8B-Instruct \
    --tensor-parallel-size 2 \
    --gpu-memory-utilization 0.90 \
    --max-model-len 8192 \
    --enable-prefix-caching \
    --port 8000
```

---

## 3. Quantization: Balancing Latency, VRAM & Accuracy

To run multi-billion parameter models on affordable enterprise hardware without degrading reasoning capabilities, models are compressed via **Quantization**:

| Precision | Bits / Weight | VRAM (7B Model) | Throughput | Best Used For |
| :--- | :--- | :--- | :--- | :--- |
| **FP16 / BF16** | 16 bits | ~14–16 GB | Baseline | Initial model training & high-precision fine-tuning |
| **INT8** | 8 bits | ~7–8 GB | 1.4x | Enterprise cloud GPUs with zero accuracy loss |
| **AWQ (4-bit)** | 4 bits | ~4.5–5 GB | 2.5x–3x | **Production GPU inference** (preserves salient outlier weights) |
| **GGUF (Q4_K_M)**| 4 bits | ~4.5 GB | Fast on CPU/Metal | Local edge inference, Mac Apple Silicon (Ollama, llama.cpp) |

---

## 4. Parameter-Efficient Fine-Tuning (PEFT & LoRA)

Full fine-tuning of a 70-billion parameter model requires updating all weights, demanding thousands of gigabytes of VRAM across dozens of GPUs.

**LoRA (Low-Rank Adaptation)** freezes the pretrained weight matrix $W_0 \in \mathbb{R}^{d \times k}$ and injects trainable rank decomposition matrices:

$$W = W_0 + \Delta W = W_0 + B \cdot A$$

Where $B \in \mathbb{R}^{d \times r}$, $A \in \mathbb{R}^{r \times k}$, and the rank $r \ll \min(d, k)$ (typically $r \in [8, 64]$).

```
   Original Weights W_0 (Frozen, e.g. 14 GB)
   ┌───────────────────────────┐
   │                           │
x ─┼───────────────────────────┼─> (W_0 * x)
   └───────────────────────────┘       +   ───> Output y
                                       ▲
   LoRA Matrices (Trainable, ~50 MB)  │
   ┌────────────┐   ┌────────────┐     │
x ─┤ Matrix A   ├──>│ Matrix B   ├─────┘
   │ (d x r)    │   │ (r x k)    │
   └────────────┘   └────────────┘
```

- **QLoRA:** Quantizes the base model down to 4-bit NormalFloat (NF4) during training, allowing an 8B parameter model to be fine-tuned on a single consumer GPU (such as an NVIDIA RTX 4090 with 24GB VRAM).

---

## 5. AI Observability: The Golden LLM Metrics

Monitoring LLM systems requires tracking specialized latency and operational metrics:

<div class="testing-stack">
  <div class="testing-card se-card-blue">
    <div class="card-header">
      <h3>Time to First Token (TTFT)</h3>
      <span class="tagline">Prompt Processing Latency</span>
    </div>
    <div class="card-body">
      <p>The time taken from when a user dispatches a prompt until the model outputs the very first generated token. Driven by prompt token length and KV-cache prefill speed. Target: <strong>&lt; 250ms</strong>.</p>
    </div>
  </div>

  <div class="testing-card se-card-green">
    <div class="card-header">
      <h3>Inter-Token Latency (ITL)</h3>
      <span class="tagline">Streaming Smoothness</span>
    </div>
    <div class="card-body">
      <p>The duration between each subsequent token during streaming generation. Human reading speed is approximately 5–8 tokens per second. An ITL of <strong>&lt; 30ms per token</strong> creates a fluid streaming experience.</p>
    </div>
  </div>
</div>

---

## 6. Malaysian Sovereign AI & Governance Compliance

When deploying AI applications in Malaysia, engineers must adhere to national regulatory standards:

1. **National AI Office (NAIO) Ethical Guidelines:** Ensures AI systems deployed in public-facing applications provide algorithmic fairness, transparency, and accessible dispute mechanisms.
2. **PDPA (Personal Data Protection Act) Compliance:** Customer identifying data (NRIC numbers, phone numbers, banking account credentials) must be sanitized and redacted before being passed to cloud LLM APIs or stored in embedding vector stores.
3. **Data Residency:** Critical financial, healthcare, and government datasets must be processed within accredited local data centers (such as AWS Malaysia `ap-southeast-5`, Google Cloud Malaysia, or local sovereign cloud providers).
