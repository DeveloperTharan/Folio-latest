# Dharanitharan P — Portfolio

> **Backend Engineer · FinTech Infrastructure · Distributed Systems**
>
> Building the rails that move money.

---

## About Me

I'm a backend engineer specializing in high-throughput fintech infrastructure, based in Bengaluru, Karnataka, India. I build payment orchestration systems, payout engines, and resilient data flows designed to stay correct under failure and scale.

My focus is on the layers of fintech that operate behind the UI — orchestration systems, settlement pipelines, idempotent workflows, and distributed state management. I design systems assuming failure is inevitable, ensuring consistency, traceability, and recovery across every transaction lifecycle.

- 📧 dharanitharanps@gmail.com
- 📍 Bengaluru, Karnataka, India
- 🐙 [github.com/DeveloperTharan](https://github.com/DeveloperTharan)
- 💼 [linkedin.com/in/dharanitharan-p](https://linkedin.com/in/dharanitharan-p)
- 🟢 Open to high-impact backend and fintech engineering roles

---

## Key Metrics

| Metric | Value |
|---|---|
| Throughput scaling | **100×** — Optimized payout processing systems |
| API latency (p95) | **<1s** — Optimized internal services |
| Payment rails integrated | **4** — IMPS · NEFT · RTGS · UPI |
| Event throughput | **10K/s+** — Messaging & CPaaS systems |

---

## Experience

### Backend Engineer — Antique Network Solutions Pvt Ltd (PayFin / ChitChaat)
**Feb 2025 — Present · Bengaluru, IN**

**PayFin — Payout Infrastructure**
- Architected and owned a multi-bank payout orchestration system with cost-aware routing, automated failover, and retry pipelines, eliminating single points of failure.
- Designed liquidity and prefunding distribution engine, dynamically allocating capital across banks using real-time utilization, success rate, and cost signals.
- Scaled payout throughput from **10 → 1000 TPS** using horizontal scaling, async pipelines, and database/query optimizations.
- Built concurrency-safe wallet system using Redis distributed locking and PostgreSQL ledger to ensure consistent debit/credit operations.
- Implemented sliding-window rate limiting enforcing per-bank and per-merchant TPS contracts without upstream SLA violations.

**PayFin — Pay-in Systems**
- Scaled pay-in infrastructure to **200 TPS** by optimizing checkout orchestration, async processing, and webhook handling.
- Designed unified abstraction layer integrating multiple acquiring banks (CUB, Axis, Jio) across UPI, cards, and netbanking.
- Built intelligent payment routing and ranking engine improving transaction success rates across payment methods.

**ChitChaat — Messaging Infrastructure**
- Engineered high-throughput messaging backend handling **10K+ events/sec** using Kafka and gRPC across SMS, WhatsApp, and RCS channels.
- Implemented provider failover and credit-based routing ensuring reliable message delivery under provider instability.

`Go` `Gin` `Java` `Spring Boot` `Redis` `Kafka` `PostgreSQL` `gRPC`

---

### Software Engineer — Indusspay / Primeindus Fintech Solutions
**Jan 2024 — Jan 2025 · Bengaluru, IN**

- Developed UPI pay-in and payout APIs with idempotency guarantees, callback handling, and reconciliation hooks for reliable transaction processing.
- Designed webhook-driven event flows enabling real-time merchant synchronization with terminal transaction states.
- Implemented retry and failover mechanisms for payment callbacks with structured logging and observability.
- Optimized API performance and database access using indexing, connection reuse, and caching strategies.

`Go` `Java` `PostgreSQL` `Redis` `REST APIs`

---

## Projects

### PayFin — Payout Engine *(Production, 2025)*
Multi-bank orchestration engine with smart routing, failover, IFT cost optimization, and prefunding distribution. Sustains **1000 TPS** across 4 rails (IMPS / NEFT / RTGS / UPI) with zero single points of failure.

`Go` `Gin` `Redis` `Kafka` `PostgreSQL`

---

### PayFin — Pay-in Checkout *(Production, 2025)*
End-to-end checkout supporting UPI, Cards, Netbanking, Wallets with success-probability ranking. Parallelized bank calls across 3+ acquiring banks at **200 TPS** with a 14s end-to-end checkout.

`Go` `Next.js` `React` `PostgreSQL` `Redis`

---

### Wallet & Liquidity Engine *(Production, 2025)*
Centralized wallet with Redis distributed locking and continuous liquidity rebalancing across partner banks. Strict consistency under high concurrency with zero race conditions.

`Go` `Redis` `PostgreSQL`

---

### ChitChaat — CPaaS Backend *(Production, 2025)*
High-throughput messaging across SMS, WhatsApp, RCS using gRPC and Kafka with automated provider failover. Handles **10K messages/sec** across 3 channels.

`Go` `gRPC` `Kafka` `Redis`

---

### UPI Pay-in / Payout APIs *(Production, 2024)*
Production UPI APIs powering merchant transaction flows with idempotency, callbacks, and reconciliation. Duplicate-safe and fully automated reconciliation.

`Go` `Java` `PostgreSQL` `Redis`

---

### Transactional Messaging Backend *(Production, 2024)*
Event-driven SMS dispatcher tied to payment events with multi-provider failover, delivery tracking, and DLQ for failed sends.

`Go` `Kafka` `Redis`

---

## Skills

### Core Languages
- **Go (Golang)** — Primary
- **Java (JVM Ecosystem)** — Primary
- **TypeScript / JavaScript (ES6+)** — Proficient
- **SQL** — Proficient

### Backend & Distributed Systems
- Distributed Systems Design
- Event-Driven Architecture
- High-Throughput APIs (REST / gRPC)
- Concurrency & Parallelism (Go)
- Fault Tolerance & Resilient Systems

### Architecture Patterns
- Saga Pattern (Orchestration / Choreography)
- CQRS · Idempotent System Design
- Retry & Backoff · Circuit Breaker · Rate Limiting

### FinTech Infrastructure
- Payment Orchestration (Pay-in / Payout)
- Double-Entry Ledgering
- Reconciliation & Settlement Systems
- Liquidity & Prefunding Systems

### Data & Messaging
- PostgreSQL · Redis (caching & distributed locks)
- Kafka (event streaming) · gRPC · Webhooks

### Observability & Security
- Structured Logging · Metrics & Monitoring · Distributed Tracing
- API Security (Auth, JWT, OAuth) · Data Encryption · KYC/AML Awareness

### Engineering Environment
- Docker · Linux · Git

---

## Education

**Bachelor's in Mathematics** — The American College, Madurai *(2019 — 2023)*

Coursework: Real Analysis, Linear Algebra, Abstract Algebra, Differential Equations, Probability Theory, Mathematical Statistics.

---

## Engineering Principles

**Correctness over cleverness** — Idempotency, reconciliation, and failure handling are core system guarantees, not add-ons.

**Measure before you optimize** — Latency distributions and system metrics drive every performance decision.

**Design for failure** — Systems are built assuming downstream failures, retries, and partial success scenarios.

---

Open [https://tharandev.vercel.app/](https://tharandev.vercel.app/)

---

*Built with React · Vite · Tailwind CSS · Framer Motion*
