<div align="center">

# 🇲🇾 TechMY

**An open-source digital library and technical curriculum for software engineering, AI, DevOps, data, and cybersecurity, built with VitePress.**

[Live Demo](https://mhdhamka.github.io/TechMY/) · [Report Bug](https://github.com/mhdhamka/TechMY/issues) · [Request Feature](https://github.com/mhdhamka/TechMY/issues)

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![VitePress](https://img.shields.io/badge/VitePress-1.6.4-52b0ff?logo=vitepress)
![Vue 3](https://img.shields.io/badge/Vue-3.x-42b883?logo=vuedotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)
![Platform](https://img.shields.io/badge/Tech-Malaysia-3fb950)

</div>

---

## Quick Navigation
> Jump straight to what you are looking for:
> 
> [Overview](#overview) · [Features](#key-features) · [Architecture](#project-structure) · [Getting Started](#getting-started) · [Tech Stack](#️technology-stack) · [Contributing](#contributing)

---

## Overview

**TechMY** is a community-driven, open-source tech curriculum and career resource tailored specifically for the Malaysian tech ecosystem. Born from curating a personal technical literature collection and inspired by structural learning philosophies like *The Odin Project*, TechMY bridges the gap between global technical standards and regional industry requirements.

---

## Key Features

<details>
<summary><b>1. Curated Learning Paths (Click to expand)</b></summary>

* **Software Engineering**: Clean code paradigms, SOLID principles, testing strategies, design patterns, and coding interview preparation.
* **System Design & Tooling**: Distributed systems fundamentals, CAP theorem, L4/L7 load balancing, consistent hashing rings, Redis caching patterns, Kafka event streams, modern CLI tooling, and k6 load testing.
* **Artificial Intelligence & ML**: Core mathematics, PyTorch computational graphs, deep neural architectures, production RAG pipelines, hybrid vector search, and Malaysian NAIO AI governance.
* **DevOps & Cloud SRE**: Containerization (Docker), GitHub Actions CI/CD workflows, Kubernetes orchestration, Terraform IaC, and SRE.
* **Cybersecurity**: Defensive fundamentals, OWASP Top 10 web vulnerabilities, secure coding checklists, and Bank Negara Malaysia (BNM) RMiT compliance standards.
* **Data Engineering**: Scalable data pipelines, modern data warehousing, and high-performance SQL recipes.
* **🇲🇾 Malaysian Tech Ecosystem**: Grounded local guides covering regional scale-ups (Carsome, Aerodyne, PolicyStreet), high-concurrency payment switches (PayNet DuitNow, GXBank), AI supercomputing corridors, active developer communities, 2026 salary benchmarks, and regulatory frameworks (BNM RMiT, Cyber Security Act 2024, PDPA).
</details>

<details>
<summary><b> 2. Persistent Bookmarking System</b></summary>

* **One-Click Article Bookmarking**: Bookmark any article instantly with the dynamic floating action button.
* **Browser `localStorage`**: Saved articles remain safely stored with automatic cross-tab synchronization.
* **Slide-Over Quick Drawer**: Access your favorited articles from anywhere using the `B` keyboard shortcut.
* **Dedicated Hub (`/bookmarks.html`)**: Complete view featuring grid layouts, instant search, and JSON/Markdown export.
</details>

<details>
<summary><b> 3. Instant Category Filtering & Curriculum Browser</b></summary>

* **Interactive Category Pills**: Filter articles by major domain tracks like AI, DevOps, Cybersecurity, Software Engineering, and Data Engineering.
* **Real-Time Search**: Instantly query titles and descriptions with zero server latency.
</details>

<details>
<summary><b> 4. Interactive Malaysian Tech Career Roadmap (`/roadmap.html`)</b></summary>

* **Role Tracks**: Dedicated progression visualizers for Software Engineering, AI/ML, DevOps, and Cybersecurity.
* **Grounded Local Salaries**: Up-to-date compensation tiers benchmarked against Jobstreet, Indeed, and Randstad Malaysia.
* **Local Employers & Rules**: Regional targets (Petronas Digital, Grab, GXBank, PayNet) and regulatory compliance.
* **Progress Tracking**: Check off mastered milestones saved directly to browser storage.
</details>

---

## Getting Started

### Prerequisites

* Node.js (`v18.0.0` or higher recommended)
* `pnpm` (or `npm` / `yarn`)

### Quick Setup

```bash
# 1. Clone the repository
git clone [https://github.com/mhdhamka/TechMY.git](https://github.com/mhdhamka/TechMY.git)

# 2. Navigate to the workspace
cd TechMY

# 3. Install dependencies
pnpm install

# 4. Start local development server
pnpm docs:dev

```

*The app will be accessible at `http://localhost:3000` or `http://localhost:5173`.*

### Production Build

```bash
# Build static assets
pnpm docs:build

# Preview production build locally
pnpm docs:preview

```

---

## Technology Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| **Framework** | [VitePress](https://vitepress.dev/) 1.6+ | Fast, Vue-powered static site generator |
| **UI Components** | [Vue 3](https://vuejs.org/) (Composition API) | Reactive components for bookmarks and filters |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Strict type safety and data models |
| **Styling** | Custom CSS Variables | GitHub Dark aesthetic with Loki Green (`#3fb950`) accents |
| **Persistence** | Browser `localStorage` | Client-side, privacy-first user storage |

---


## Project Structure

<details>
<summary><b>View Project Directory Tree</b></summary>

```text
docs/
├── .vitepress/                  # VitePress configuration, theme, and components
│   ├── config.ts                # Site navigation, sidebar routes, and metadata
│   └── theme/                   # Custom Vue components, composables, and styles
├── ai-ml/                       # AI, Machine Learning, and LLM engineering guides
├── cybersecurity/               # Security fundamentals, secure coding, and RMiT
├── data-engineering/            # Pipelines, data warehousing, and SQL recipes
├── devops-infrastructure/       # Docker, CI/CD, k8s, and SRE best practices
├── software-engineering/        # Clean code, design patterns, and code construction
├── system-design/               # Distributed systems architecture and scalability guides
├── tooling/                     # Modern developer CLI, terminal workflows, and API testing
├── local-resources/             # Malaysian tech communities, meetups, and job hubs
├── bookmarks.md                 # Standalone bookmarks management page
├── roadmap.md                   # Interactive career progression roadmap page
└── index.md                     # Homepage with curriculum browser
```
</details>


---

## Contributing

Contributions, corrections, book recommendations, and local Malaysian resource updates are welcome!

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/NewGuide`).
3. Commit your Changes (`git commit -m 'feat: add guide for cloud security'`).
4. Push to the Branch (`git push origin feature/NewGuide`).
5. Open a Pull Request.

If you find this resource helpful for the Malaysian tech community, consider giving it a ⭐ star!

---

Developed by [mhdhamka](https://github.com/mhdhamka) for personal growth and the Malaysian Tech Community.



