---
title: System Design Architecture Master Guide
description: Architectural principles, distributed systems fundamentals, high availability, and resilient enterprise system design for modern engineering
---

<div class="se-hero">
  <div class="se-hero-badge">System Design Curriculum 2026</div>
  <h1>System Design Architecture Master Guide</h1>
  <p class="se-hero-subtitle">Master distributed systems foundations, high availability, failure domains, and enterprise scalability. Grounded in industry classics by Martin Kleppmann, Alex Xu, and Brendan Burns with Malaysian FinTech scale context.</p>
</div>

---

## Core Literature Foundation

System design is the art of making deliberate trade-offs under constraints of cost, complexity, latency, and consistency. Our curriculum directly maps to core foundational literature:

- **"Designing Data-Intensive Applications" (DDIA)** by Martin Kleppmann (*Reliability, Scalability, Maintainability, Storage Engines, Replication, Partitioning, and Transactions*)
- **"System Design Interview – An Insider’s Guide" (Vols 1 & 2)** by Alex Xu and Sahn Lam (*Practical Step-by-Step Architectural Frameworks*)
- **"Designing Distributed Systems"** by Brendan Burns (*Patterns & Paradigms for Scalable Microservices*)
- **"Building Microservices"** by Sam Newman (*Service Decomposition, Event-Driven Integration, and Resilience Patterns*)

---

## 1. The Core Pillars: Reliability, Scalability & Maintainability (*DDIA, Chapter 1*)

Every software system must balance three fundamental requirements:

<div class="se-principles-grid">
  <div class="se-principle-card">
    <h3>1. Reliability (Fault Tolerance)</h3>
    <p>Systems must continue to function correctly even when faults occur (hardware failures, network partitions, software bugs, or human errors). A reliable system anticipates faults rather than assuming ideal conditions.</p>
  </div>
  <div class="se-principle-card">
    <h3>2. Scalability (Handling Growth)</h3>
    <p>As load increases (requests per second, data volume, write concurrency), the system provides practical engineering pathways to maintain performance without exponential cost spikes.</p>
  </div>
  <div class="se-principle-card">
    <h3>3. Maintainability (Developer Velocity)</h3>
    <p>The system must remain operable, simple, and evolvable. High maintainability prevents architectural rot and enables new engineers to ship features safely without fear of regression.</p>
  </div>
  <div class="se-principle-card">
    <h3>4. Observability & SLOs</h3>
    <p>Systems expose golden signals (latency, traffic, errors, saturation) with distributed tracing, enabling engineers to debug anomalies across microservice boundaries.</p>
  </div>
</div>

---

## 2. Latency Numbers Every Systems Engineer Should Know

System design decisions require an intuitive understanding of physical access latencies. In distributed computing, disk and network operations are orders of magnitude slower than CPU and RAM:

| Operation | Approximate Latency | Scaled Comparison (Human Intuition) |
| :--- | :--- | :--- |
| **L1 cache reference** | 0.5 ns | 1 heartbeat (1 second) |
| **L2 cache reference** | 7 ns | 14 seconds |
| **Main memory (RAM) reference** | 100 ns | 3.3 minutes |
| **Read 1 MB sequentially from memory** | 3,000 ns (3 µs) | 1.6 hours |
| **Read 1 MB sequentially from NVMe SSD** | 50,000 ns (50 µs) | 1.1 days |
| **Round-trip within same data center (Cyberjaya)** | 500,000 ns (0.5 ms) | 11.5 days |
| **Read 1 MB sequentially from spinning HDD** | 10,000,000 ns (10 ms) | ~8 months |
| **KL to Singapore packet round-trip** | 15,000,000 ns (15 ms) | 1 year |
| **KL to US West Coast packet round-trip** | 180,000,000 ns (180 ms) | 12 years |

> **Key Architectural Takeaway:** Caching hot data in memory (Redis/RAM) delivers responses thousands of times faster than querying relational disk databases or making cross-region network calls.

---

## 3. The CAP Theorem & PACELC Framework (*DDIA, Chapter 9*)

When designing distributed databases and storage layers, the CAP Theorem dictates that in the presence of a **Network Partition (P)**, a distributed system must choose between **Consistency (C)** and **Availability (A)**:

```
                  [Network Partition (P)]
                         /     \
                        /       \
      Consistency (CP)             Availability (AP)
   (Return error / block          (Always return latest available,
   until replica is in sync)       even if stale by milliseconds)
   
   Examples:                      Examples:
   • Bank Negara Malaysia RTGS    • Social media feeds, likes
   • DuitNow real-time transfers  • Product view counters
   • Spanner / ZooKeeper / etcd   • Cassandra / DynamoDB / Couchbase
```

### The PACELC Theorem
CAP only describes system behavior during an active network partition. **PACELC** extends this to normal operations:
- **If Partition (P):** Choose between **Availability (A)** and **Consistency (C)**.
- **Else (E):** Choose between **Latency (L)** and **Consistency (C)**.

*Example:* Amazon DynamoDB defaults to **PA/EL** (during partition, it prioritizes Availability; in normal conditions, it prioritizes low Latency over strict consistency using eventual consistency). Google Cloud Spanner prioritizes **PC/EC** (guaranteeing external linearizability via TrueTime atomic clocks).

---

## 4. ACID vs. BASE Consistency Models

<div class="testing-stack">
  <div class="testing-card se-card-blue">
    <div class="card-header">
      <h3>ACID (Pessimistic Strong Consistency)</h3>
      <span class="tagline">Relational & Financial Systems</span>
    </div>
    <div class="card-body">
      <p><strong>Atomicity:</strong> All modifications succeed, or the entire transaction rolls back cleanly.</p>
      <p><strong>Consistency:</strong> Data must strictly satisfy all schema invariants, unique constraints, and foreign keys.</p>
      <p><strong>Isolation:</strong> Concurrent transactions execute without dirty reads, non-repeatable reads, or phantom reads.</p>
      <p><strong>Durability:</strong> Once committed, transaction writes survive server crashes via write-ahead logging (WAL).</p>
      <p><em>Standard in: PostgreSQL, MySQL InnoDB, Oracle Financials.</em></p>
    </div>
  </div>

  <div class="testing-card se-card-green">
    <div class="card-header">
      <h3>BASE (Optimistic Eventual Consistency)</h3>
      <span class="tagline">High-Throughput Distributed NoSQL</span>
    </div>
    <div class="card-body">
      <p><strong>Basically Available:</strong> The distributed cluster guarantees availability according to CAP, possibly returning degraded responses.</p>
      <p><strong>Soft State:</strong> System state may mutate over time even without external user input due to asynchronous node synchronization.</p>
      <p><strong>Eventual Consistency:</strong> Given enough time without new updates, all node replicas converge to identical data.</p>
      <p><em>Standard in: Apache Cassandra, DynamoDB, MongoDB eventual reads.</em></p>
    </div>
  </div>
</div>

---

## 5. Architectural Case Study: Malaysian Real-Time Payment Switch (DuitNow)

When architecting high-throughput national payment systems (such as **PayNet DuitNow** handling millions of daily transfers across Maybank, CIMB, Touch 'n Go eWallet, and GXBank):

```
[Mobile App / Web] ──> [API Gateway (Rate Limit & Auth)]
                              │
                    [Load Balancer (L7)]
                              │
                    [Payment Orchestrator (Go/Java)]
                              ├──> [Idempotency Store (Redis)] (Check UUID to avoid double-charge)
                              ├──> [Core Ledger DB (PostgreSQL HA)] (Strict ACID write-ahead log)
                              └──> [Kafka Event Bus (Audit & Fraud)]
                                         ├──> [Real-time Fraud Detection Worker]
                                         └──> [BNM RMiT Compliance Reporting Sink]
```

### Critical Resiliency Patterns:
1. **Idempotency Keys:** Every payment request carries a client-generated UUID header `X-Idempotency-Key`. The orchestrator locks this key in Redis for 60 seconds before touching the ledger, preventing accidental double-deductions when users retry on slow cellular connections.
2. **Outbox Pattern:** Ledger database updates and message broker dispatches happen transactionally to guarantee that no financial event is published without being durably written to the relational database.
3. **Graceful Degradation:** If the non-critical fraud scoring microservice is overloaded, the core payment flow switches to a fast rule-based fallback rather than blocking consumer transfers.

---

## 6. Recommended System Design Learning Track

1. **[Scalability & Load Balancers](/system-design/scalability-basics)** — Horizontal scaling, NGINX, HAProxy, Consistent Hashing, and database partitioning.
2. **[Caching & Messaging Systems](/system-design/caching-messaging)** — Redis cache-aside strategies, cache stampede mitigation, Kafka event streaming, and dead-letter queues.
3. **[Developer Tooling & Shell](/tooling/terminal-shell)** — Modern command-line mastery with Zsh, tmux, jq, fzf, and SSH configuration.
4. **[API Design & Contract Testing](/tooling/api-testing)** — REST vs gRPC vs GraphQL, OpenAPI documentation, and automated load testing with k6.
