---
title: Large Language Models (LLMs) & Production RAG Architectures
description: Transformer self-attention mechanics, dense vector embeddings, vector databases, hybrid search with BM25, and enterprise RAG evaluation
---

<div class="se-hero">
  <div class="se-hero-badge">AI & Machine Learning Curriculum</div>
  <h1>Large Language Models (LLMs) & Production RAG</h1>
  <p class="se-hero-subtitle">Architect hallucination-resistant enterprise knowledge retrieval systems. Master Transformer self-attention, chunking strategies, pgvector search, hybrid BM25 fusion, and RAG evaluation frameworks.</p>
</div>

---

## 1. The Transformer Self-Attention Engine (*Building LLMs for Production, Chapter 2*)

The foundation of modern generative AI is the **Transformer** (Vaswani et al., 2017). Rather than processing words sequentially with recurrent loops, transformers evaluate all tokens simultaneously using **Multi-Head Self-Attention**.

For every token embedding, the model computes three vectors: **Query ($Q$)**, **Key ($K$)**, and **Value ($V$)**:

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

```
Token: "Bank Negara Malaysia issued new cybersecurity guidelines"
           │         │
           ▼         ▼
  Attention weights calculate contextual affinity:
  "guidelines" ───(0.92 Attention weight)───> "cybersecurity"
  "issued"     ───(0.87 Attention weight)───> "Bank Negara Malaysia"
```

- **Scaled Factor $\frac{1}{\sqrt{d_k}}$:** Prevents the dot products from growing excessively large for high dimensions, which would push softmax into regions with vanishing gradients.
- **Causal Masking (Decoder-only models like LLaMA / GPT):** Upper-triangular mask ensures that token predictions at position $t$ can only attend to previous tokens $< t$.

---

## 2. The Retrieval-Augmented Generation (RAG) Pipeline

While LLMs possess vast parametric memory, they suffer from **knowledge cutoffs**, **hallucinations**, and lack of access to private enterprise data. RAG augments prompts at runtime with verified factual context:

```
[User Query] ───────────────┬────────────────────────┐
                            │ (Dense Embedding)       │ (Sparse BM25 Keyword)
                            ▼                         ▼
                    [Dense Vector Index]      [Inverted Text Index]
                            │                         │
                            └───────────┬─────────────┘
                                        ▼
                            [Reciprocal Rank Fusion (RRF)]
                                        │
                                        ▼
                            [Top-K Document Chunks]
                                        │
                                        ▼ (Cross-Encoder Re-Ranking)
                            [Top-3 Relevant Chunks]
                                        │
                                        ▼
                        [Augmented Prompt with Ground Truth]
                                        │
                                        ▼
                        [LLM Generates Verified Answer]
```

---

## 3. Document Chunking Strategies

The quality of retrieval depends heavily on chunking granularity:

| Strategy | Mechanism | Best Used For | Pitfalls |
| :--- | :--- | :--- | :--- |
| **Fixed-Size Chunking** | Exact character or token splits (e.g. 512 tokens with 50-token overlap) | Quick prototypes, uniform text | Cuts sentences and tables in half |
| **Recursive Character Splitting** | Splits hierarchically by `\n\n`, then `\n`, then spaces, preserving semantic paragraphs | Markdown documentation, general reports | Variable chunk lengths |
| **Document-Structure Aware** | Parses HTML/Markdown headers (`#`, `##`, `###`) to preserve logical section hierarchy | Technical documentation, API specs | Requires clean source formatting |
| **Semantic Chunking** | Measures embedding distance between consecutive sentences to detect topic shifts | Research papers, narrative transcripts | High computational overhead during ingestion |

---

## 4. Vector Databases & Hybrid Search

Storing vector embeddings requires specialized indexing algorithms (HNSW – Hierarchical Navigable Small World, or IVFFlat):

### Popular Vector Stores:
- **`pgvector` (PostgreSQL):** Ideal when you already run PostgreSQL. Keeps relational data and vectors in one ACID-compliant database with zero sync lag.
- **Qdrant / Milvus:** High-performance, dedicated vector databases written in Rust/Go for 100M+ vector scale.
- **Chroma:** Lightweight embedded vector database for fast local Python development.

### Hybrid Search with Reciprocal Rank Fusion (RRF):
Pure vector search excels at conceptual similarity ("how to fix network timeout"), but struggles with exact alphanumeric identifiers (e.g. `ERR_RMIT_2026_09` or Malaysian NRIC numbers).

Hybrid search executes **Dense Semantic Search** + **Sparse BM25 Keyword Search** in parallel and merges rankings using RRF:

$$\text{RRF Score}(d) = \sum_{m \in M} \frac{1}{k + r_m(d)}$$

Where $k \approx 60$, and $r_m(d)$ is the document's rank in system $m$.

---

## 5. Malaysian NLP & Multilingual Context

In Malaysia, production language systems must handle **Bahasa Melayu**, **English**, and frequent **code-switching (Bahasa Rojak / Manglish)**:

```
"Bro, can you check if the DuitNow transfer sudah masuk account Maybank semalam?"
```

- Standard western LLMs often fragment Malay words into inefficiently small byte tokens (increasing latency and cost).
- **Mesolitica (Malaya Toolkit):** Open-source Malaysian NLP suite providing specialized tokenizers, sentiment models, and Malay-centric LLM checkpoints (such as Malaysian LLaMA / Mistral fine-tunes).
- When chunking Malaysian documents, ensure tokenizers support Malay morphological affixes (prefixes like *meng-*, *mem-*, and suffixes like *-kan*, *-nya*).

---

## 6. The RAG Triad Evaluation Framework

To prevent silent hallucinations, evaluate pipelines across three orthogonal dimensions (using tools like **Ragas** or **TruLens**):

<div class="testing-stack">
  <div class="testing-card se-card-blue">
    <div class="card-header">
      <h3>1. Context Relevance</h3>
      <span class="tagline">Retrieval Precision</span>
    </div>
    <div class="card-body">
      <p>Does the retrieved text chunk actually contain the precise information required to answer the user's question, without irrelevant noise?</p>
    </div>
  </div>

  <div class="testing-card se-card-green">
    <div class="card-header">
      <h3>2. Groundedness (Faithfulness)</h3>
      <span class="tagline">Zero Hallucination</span>
    </div>
    <div class="card-body">
      <p>Can every factual claim in the LLM's final response be directly substantiated by the retrieved context chunks? (If the context does not state a fact, the model must refuse to answer).</p>
    </div>
  </div>

  <div class="testing-card se-card-blue">
    <div class="card-header">
      <h3>3. Answer Relevance</h3>
      <span class="tagline">Query Alignment</span>
    </div>
    <div class="card-body">
      <p>Does the generated response directly answer what the user asked, maintaining appropriate conciseness and tone?</p>
    </div>
  </div>
</div>
