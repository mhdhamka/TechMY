---
title: Scalability, Load Balancing & Sharding
description: Principles of horizontal scaling, layer 4 vs layer 7 load balancing, consistent hashing algorithms, and database sharding architectures
---

<div class="se-hero">
  <div class="se-hero-badge">System Design Architecture</div>
  <h1>Scalability, Load Balancing & Sharding</h1>
  <p class="se-hero-subtitle">Scale distributed applications from thousands to millions of concurrent users. Master load balancer distribution algorithms, consistent hashing rings, read replicas, and database partitioning.</p>
</div>

---

## 1. Vertical vs. Horizontal Scaling (*System Design Interview, Vol 1, Chapter 1*)

Scaling a system generally follows two distinct paths:

<div class="testing-stack">
  <div class="testing-card se-card-blue">
    <div class="card-header">
      <h3>Vertical Scaling (Scale Up)</h3>
      <span class="tagline">Single-Node Muscle</span>
    </div>
    <div class="card-body">
      <p><strong>Mechanism:</strong> Add more CPU cores, RAM, and faster NVMe storage to a single server instance (e.g., upgrading an AWS EC2 instance from <code>t4g.medium</code> to <code>r6g.16xlarge</code>).</p>
      <p><strong>Pros:</strong> Zero application architecture changes; simple transactions without distributed locks.</p>
      <p><strong>Cons:</strong> Hard physical ceiling; exponentially expensive at high tiers; creates a catastrophic Single Point of Failure (SPOF).</p>
    </div>
  </div>

  <div class="testing-card se-card-green">
    <div class="card-header">
      <h3>Horizontal Scaling (Scale Out)</h3>
      <span class="tagline">Distributed Resilience</span>
    </div>
    <div class="card-body">
      <p><strong>Mechanism:</strong> Add multiple commodity server instances running stateless services behind a reverse proxy or load balancer.</p>
      <p><strong>Pros:</strong> Virtually limitless linear scalability; zero single-point-of-failure; independent rolling updates.</p>
      <p><strong>Cons:</strong> Requires stateless application servers; introduces distributed network latency, session management, and data synchronization overhead.</p>
    </div>
  </div>
</div>

---

## 2. Load Balancers: Layer 4 vs. Layer 7 (*Designing Distributed Systems, Chapter 3*)

Load balancers distribute inbound client traffic across a pool of healthy backend application instances to optimize resource utilization and prevent server saturation.

```
                  ┌────────────────────────┐
                  │   DNS / Anycast IP     │
                  └───────────┬────────────┘
                              │
                  ┌───────────▼────────────┐
                  │    Load Balancer       │
                  │ (NGINX / HAProxy / ALB)│
                  └─────┬───────┬───────┬──┘
                        │       │       │
             ┌──────────▼─┐ ┌───▼──────┐ ┌▼───────────┐
             │ Backend 1  │ │ Backend 2│ │ Backend 3  │
             │ (Web Pod)  │ │ (Web Pod)│ │ (Web Pod)  │
             └────────────┘ └──────────┘ └────────────┘
```

### Layer 4 (Transport Layer) vs. Layer 7 (Application Layer)

| Dimension | Layer 4 (L4) Load Balancing | Layer 7 (L7) Load Balancing |
| :--- | :--- | :--- |
| **Protocol** | TCP / UDP packets | HTTP / HTTPS / WebSockets / gRPC |
| **Inspection** | IP addresses and TCP port numbers only | HTTP headers, cookies, URL paths, and JSON payloads |
| **Routing Decisions** | Extremely fast packet forwarding (kernel space) | Content-based routing (e.g. `/api/v1/auth` to Auth service) |
| **SSL/TLS Termination** | Pass-through or simple offloading | Full TLS termination, certificate SNI, and header rewrite |
| **Technologies** | AWS NLB, HAProxy TCP mode, Linux LVS / IPVS | AWS ALB, NGINX, Envoy, Traefik |

### Balancing Algorithms:
1. **Round Robin:** Sequentially routes requests to each server in order. Ideal when all backend instances possess identical hardware and requests take uniform execution time.
2. **Least Connections:** Routes to the server with the fewest active TCP/HTTP connections. Best for long-lived sessions (e.g., WebSockets, chat applications).
3. **IP Hash:** Computes a hash of the client's IPv4/IPv6 address to deterministically route them to the same server (simple sticky sessions).
4. **Weighted Round Robin:** Assigns higher request shares to nodes with superior hardware specs.

### Production NGINX Layer 7 Load Balancing Configuration

```nginx
# /etc/nginx/conf.d/upstream.conf
upstream backend_cluster {
    # Distribute by least connections with active health checks
    least_conn;
    
    server app-node-01.internal:8080 weight=3 max_fails=3 fail_timeout=10s;
    server app-node-02.internal:8080 weight=3 max_fails=3 fail_timeout=10s;
    server app-node-03.internal:8080 weight=1 backup; # Standby fallback
    
    keepalive 64; # Reuse persistent TCP connections to backends
}

server {
    listen 443 ssl http2;
    server_name api.techmy.dev;

    ssl_certificate /etc/ssl/certs/techmy.crt;
    ssl_certificate_key /etc/ssl/private/techmy.key;

    # Content-based routing
    location /api/v1/payments {
        proxy_pass http://payment_service;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        proxy_pass http://backend_cluster;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
    }
}
```

---

## 3. Consistent Hashing (*System Design Interview, Vol 1, Chapter 5*)

In a distributed caching or database cluster with $N$ servers, a naive modular hash function `serverIndex = hash(key) % N` leads to catastrophic cache misses whenever a server is added or removed, because almost every key remaps to a new server index ($N \to N+1$).

**Consistent Hashing** solves this by mapping both keys and servers to a circular 360-degree hash ring (typically a 32-bit or 128-bit integer space):

```
                     0 / 2^32-1
                   . - ~ ~ ~ - .
               . '               ' .
             /                       \
        [Server A]                [Server B]
          (Hash: 15)                (Hash: 85)
         /                             \
     Key 1 (Hash: 22)                   Key 2 (Hash: 95)
        |                                 |
        |  Mapped to Server B             |  Mapped to Server C
        \                                 /
         [Server D]                   [Server C]
          (Hash: 240)                  (Hash: 160)
             \                       /
               . '               ' .
                   ' - ~ ~ ~ - '
```

### Key Properties:
1. **Clockwise Lookup:** To find which server stores a key, hash the key and walk clockwise along the ring until encountering the first server node.
2. **Minimal Reshuffle:** When a node joins or leaves, only $K/N$ keys need relocation on average (where $K$ is the total number of keys and $N$ is the number of servers).
3. **Virtual Nodes (Vnodes):** A physical server is mapped to multiple pseudo-random positions across the ring (e.g. `ServerA-1`, `ServerA-2`, `ServerA-100`). This ensures even key distribution and prevents "hot spots" where one server receives disproportionate traffic.

---

## 4. Database Scaling: Replication vs. Sharding (*DDIA, Chapters 5 & 6*)

When a single relational database exhausts capacity, two complementary scaling strategies exist:

```
[Write Traffic]                  [Read Traffic]
       │                                │
       ▼                                ▼
┌─────────────────┐             ┌─────────────────┐
│ Primary DB      │────────────>│ Read Replica 1  │
│ (PostgreSQL WR) │ (Streaming  ├─────────────────┤
└─────────────────┘ Replication)│ Read Replica 2  │
                                └─────────────────┘
```

### 1. Read Replicas (Master-Replica)
- **Architecture:** All writes (`INSERT`, `UPDATE`, `DELETE`) hit the primary database. The primary asynchronously streams WAL logs to read-only replicas.
- **Limitation:** Replicas suffer from **Replication Lag** (reading immediately after writing can return stale data). Solve this by directing critical read-after-write operations to the primary for 5–10 seconds.

### 2. Database Sharding (Horizontal Partitioning)
When write volume or data size exceeds the storage limits of a single machine (e.g., > 10 TB or > 50,000 writes/sec), split the dataset across multiple independent database instances.

| Partitioning Strategy | How It Works | Trade-offs |
| :--- | :--- | :--- |
| **Hash-Based Sharding** | `shard = hash(user_id) % num_shards` | Uniform distribution; difficult to add shards without resharding (requires consistent hashing). |
| **Range-Based Sharding** | Shard 1: `user_id 1..1,000,000`<br>Shard 2: `user_id 1,000,001..2,000,000` | Simple range queries; risks hot-spotting on newly registered active users. |
| **Directory-Based Sharding** | Central lookup table maps entities to shard IDs | Highly flexible; adds an extra network lookup hop and centralized SPOF. |

### Major Challenges of Sharding:
- **Cross-Shard Joins:** Joining tables stored on different physical servers requires costly application-level aggregation. Denormalize schemas to avoid this.
- **Distributed Transactions:** Enforcing ACID across multiple shards requires two-phase commits (2PC), which drastically degrade throughput and availability.
- **Resharding Complexity:** As the business grows, rebalancing data across new shards without downtime requires complex online migration tooling.
