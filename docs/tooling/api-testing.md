---
title: API Design, Contract Testing & Performance Benchmarking
description: Principles of RESTful API design, OpenAPI specifications, gRPC vs GraphQL, contract testing, and automated load testing with k6
---

<div class="se-hero">
  <div class="se-hero-badge">Developer Tooling & Workflows</div>
  <h1>API Design, Contract Testing & Performance Benchmarking</h1>
  <p class="se-hero-subtitle">Design clean, evolvable application interfaces. Compare REST, gRPC, and GraphQL, enforce contract-first schema design with OpenAPI, and simulate production concurrency with k6.</p>
</div>

---

## 1. API Paradigms: REST vs. gRPC vs. GraphQL

Choosing the appropriate communication protocol determines client latency, payload size, and developer velocity:

| Dimension | REST (Representational State Transfer) | gRPC (Google RPC) | GraphQL |
| :--- | :--- | :--- | :--- |
| **Transport** | HTTP/1.1 or HTTP/2 | HTTP/2 (Multiplexed streams) | HTTP/1.1 or HTTP/2 |
| **Serialization** | JSON (Human-readable text) | Protocol Buffers (Compact binary) | JSON |
| **Schema** | Optional (OpenAPI/Swagger) | Strict `.proto` contract enforced | Strict GraphQL Schema Definition (SDL) |
| **Streaming** | Server-Sent Events (SSE) or WebSockets | Native Bi-directional streaming | Subscriptions (over WebSockets) |
| **Best Used For** | Public developer APIs, web mobile clients | Internal high-throughput microservices | Complex relational data querying, mobile apps |

---

## 2. Richardson Maturity Model for RESTful APIs

To ensure clean semantics and maintainable resource hierarchies, follow Leonard Richardson's 4-level maturity model:

```
[Level 3: Hypermedia Controls (HATEOAS)]
       ▲  (Responses provide hypermedia links to valid next actions)
       │
[Level 2: HTTP Verbs & Status Codes]
       ▲  (GET for reads, POST for creation, PUT/PATCH for mutations, DELETE)
       │
[Level 1: Dedicated Resources]
       ▲  (/api/v1/accounts, /api/v1/transactions instead of single endpoint)
       │
[Level 0: The Swamp of POX]
          (Single endpoint e.g. /endpoint.php using POST for all actions)
```

### Idempotency & HTTP Status Codes:
- **`200 OK`**: Successful read or immediate modification.
- **`201 Created`**: Resource successfully minted (include `Location` header).
- **`204 No Content`**: Successful execution with empty body (e.g. `DELETE`).
- **`400 Bad Request`**: Client validation failed (malformed JSON or invalid schema).
- **`401 Unauthorized`**: Authentication missing or token expired.
- **`403 Forbidden`**: Authenticated user lacks permission to access resource.
- **`404 Not Found`**: Resource does not exist.
- **`409 Conflict`**: State violation (e.g. unique email constraint or concurrent edit).
- **`429 Too Many Requests`**: Rate limit exceeded (include `Retry-After` header).
- **`500 Internal Server Error`**: Unhandled exception in backend code.

---

## 3. OpenAPI 3.1 Contract-First Architecture

In **Contract-First API Development**, frontend and backend teams agree upon a declarative OpenAPI YAML specification *before* writing application code. Both client SDKs and backend mock servers can be generated automatically.

```yaml
openapi: 3.1.0
info:
  title: TechMY Payment Switch API
  version: 1.0.0
  description: High-throughput payment routing compliant with BNM financial regulations
paths:
  /v1/transfers:
    post:
      summary: Initiate DuitNow real-time bank transfer
      operationId: initiateTransfer
      parameters:
        - name: X-Idempotency-Key
          in: header
          required: true
          schema:
            type: string
            format: uuid
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TransferRequest'
      responses:
        '201':
          description: Transfer queued successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TransferResponse'
        '400':
          description: Validation error
        '409':
          description: Duplicate idempotency transaction detected
components:
  schemas:
    TransferRequest:
      type: object
      required:
        - recipientAccount
        - recipientBank
        - amountMYR
      properties:
        recipientAccount:
          type: string
          example: "114012345678"
        recipientBank:
          type: string
          enum: [MAYBANK, CIMB, PUBLIC_BANK, RHB, GXBANK]
        amountMYR:
          type: number
          minimum: 1.00
          maximum: 50000.00
          example: 250.00
```

---

## 4. Automated Load Testing with k6

Simulating production traffic before deployment reveals memory leaks, slow database queries, and thread pool exhaustion under pressure.

**Grafana k6** is a developer-centric, scriptable load testing tool using modern JavaScript:

```javascript
// load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  // Define traffic ramping stages
  stages: [
    { duration: '30s', target: 50 },  // Ramp up to 50 concurrent virtual users
    { duration: '1m', target: 200 },  // Spike to 200 virtual users (stress test)
    { duration: '30s', target: 0 },   // Graceful cool down
  ],
  // Enforce Service Level Objectives (SLOs)
  thresholds: {
    http_req_failed: ['rate<0.01'],    // Error rate must be less than 1%
    http_req_duration: ['p(95)<300'], // 95% of requests must respond under 300ms
    http_req_duration: ['p(99)<600'], // 99% of requests must respond under 600ms
  },
};

export default function () {
  const url = 'https://api.techmy.dev/v1/products';
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer test-token-ey123',
    },
  };

  const res = http.get(url, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 250ms': (r) => r.timings.duration < 250,
  });

  sleep(1); // Think time between simulated user clicks
}
```

Run the load test directly from your terminal:
```bash
k6 run load-test.js
```

### Key Metrics to Monitor in Load Test Outputs:
- **`http_req_duration` (p95 & p99):** The 95th and 99th percentile response latencies. Averages can be misleading because a tiny percentage of slow queries can ruin user experience.
- **`http_req_failed`:** Percentage of non-2xx/3xx HTTP responses.
- **`vus` (Virtual Users):** Active concurrent simulated threads.
