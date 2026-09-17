<div align="center">

# TechMY

**An open-source digital library and technical curriculum for software engineering, AI, DevOps, data, and cybersecurity, built with VitePress.**

[Live Demo](https://mhdhamka.github.io/TechMY/) · [Report Bug](https://github.com/mhdhamka/TechMY/issues) · [Request Feature](https://github.com/mhdhamka/TechMY/issues)

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![VitePress](https://img.shields.io/badge/VitePress-1.6.4-52b0ff?logo=vitepress)
![Vue 3](https://img.shields.io/badge/Vue-3.x-42b883?logo=vuedotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)
![Platform](https://img.shields.io/badge/Tech-Malaysia-3fb950)

</div>

---

## Overview

**TechMY** is a community-driven, open-source tech curriculum and career resource tailored specifically for the Malaysian tech ecosystem. Born from curating a personal technical literature collection and inspired by structural learning philosophies like *The Odin Project*, TechMY bridges the gap between global technical standards and regional industry requirements—taking learners from foundational fundamentals to production-grade engineering.

---

## Key Features

### 1. Curated Learning Paths
* **Software Engineering**: Clean code paradigms, SOLID principles, testing strategies, design patterns, and coding interview preparation.
* **System Design & Tooling**: Distributed systems fundamentals, CAP theorem, L4/L7 load balancing, consistent hashing rings, Redis caching patterns, Kafka event streams, modern CLI tooling (tmux, fzf, jq), and contract-first OpenAPI / k6 load testing.
* **Artificial Intelligence & ML**: Core mathematics, PyTorch computational graphs, deep neural architectures, production RAG pipelines, hybrid vector search (BM25 + dense), high-throughput vLLM serving, and Malaysian NAIO AI governance.
* **DevOps & Cloud SRE**: Containerization (Docker), GitHub Actions CI/CD workflows, Kubernetes orchestration, Terraform Infrastructure as Code (IaC), and site reliability engineering.
* **Cybersecurity**: Defensive fundamentals, OWASP Top 10 web vulnerabilities, secure coding checklists, and Bank Negara Malaysia (BNM) RMiT compliance standards.
* **Data Engineering**: Scalable data pipelines, modern data warehousing, and high-performance SQL recipes.
* **🇲🇾 Malaysian Tech Ecosystem**: Grounded local guides covering regional scale-ups (Carsome, Aerodyne, PolicyStreet), high-concurrency payment switches (PayNet DuitNow, GXBank), Johor & Cyberjaya AI supercomputing corridors, active developer communities (GDG, ReactJS MY, PyCon MY, DevOps Malaysia, RawSec), realistic 2026 salary benchmarks, and regulatory frameworks (BNM RMiT, Cyber Security Act 2024, PDPA 2024 amendments).

### 2. Persistent Bookmarking System
* **One-Click Article Bookmarking**: Bookmark any article instantly with the dynamic floating action button on each guide.
* **Browser `localStorage` Persistence**: Saved articles remain safely stored on your device with automatic cross-tab synchronization.
* **Slide-Over Quick Drawer**: Access your favorited articles from anywhere in the app with the navigation bar badge or the `B` keyboard shortcut.
* **Dedicated Bookmarks Hub (`/bookmarks.html`)**: Complete standalone view featuring grid and compact list layouts, instant keyword search, and one-click JSON / Markdown data export.

### 3. Instant Category Filtering & Curriculum Browser
* **Interactive Category Pills**: Filter articles by major domain tracks including **AI**, **DevOps**, **Cybersecurity**, **Software Engineering**, and **Data Engineering**.
* **Real-Time Article Search**: Instantly query titles, descriptions, and categories with zero server latency.
* **Curriculum Browser on Homepage**: Explore all curated modules directly from the homepage with category chips and visual tags.

### 4. Interactive Malaysian Tech Career Roadmap (`/roadmap.html`)
* **Role Tracks**: Dedicated career progression visualizers for Software Engineering, AI & Machine Learning, DevOps & Cloud SRE, and Cybersecurity.
* **Grounded Malaysian Salary Benchmarks**: Up-to-date monthly and annual compensation tiers (Junior, Mid, Senior, Lead/Architect) benchmarked against Jobstreet, Indeed, Michael Page, and Randstad Malaysia market reports.
* **Local Industry Context**: Regional employer targets (Petronas Digital, Grab Malaysia, GXBank, PayNet, TNB, Maybank) and local regulatory frameworks (BNM RMiT, PDPA).
* **Local Milestone Progress Tracking**: Check off mastered milestones with progress percentages saved to local browser storage.

---

## Content Structure

```
docs/
├── .vitepress/                  # VitePress configuration, custom theme, and components
│   ├── config.ts                # Site navigation, sidebar routes, and metadata
│   └── theme/
│       ├── components/
│       │   ├── BookmarkButton.vue       # Article-level bookmark toggle button
│       │   ├── BookmarksDrawer.vue      # Slide-over quick bookmarks drawer
│       │   ├── BookmarksPageView.vue    # Full-page bookmarks management hub
│       │   ├── CurriculumBrowser.vue    # Homepage searchable category browser
│       │   ├── NavBookmarksTrigger.vue  # Navbar bookmarks counter and trigger
│       │   └── RoadmapVisualization.vue # Interactive Malaysian career roadmap
│       ├── composables/
│       │   └── useBookmarks.ts          # Reactive localStorage bookmarks store
│       ├── custom.css                   # GitHub Dark & Loki Green theme styling
│       └── index.ts                     # Theme entry point and component registration
├── ai-ml/                       # AI, Machine Learning, and LLM engineering guides
├── cybersecurity/               # Security fundamentals, secure coding, and RMiT
├── data-engineering/           # Pipelines, data warehousing, and SQL recipes
├── devops-infrastructure/       # Docker, CI/CD, k8s, and SRE best practices
├── software-engineering/        # Clean code, design patterns, and code construction
├── system-design/               # Distributed systems architecture and scalability guides
├── tooling/                     # Modern developer CLI, terminal workflows, and API testing
├── local-resources/             # Malaysian tech communities, meetups, and job hubs
├── bookmarks.md                 # Standalone bookmarks management page
├── roadmap.md                   # Interactive career progression roadmap page
└── index.md                     # Homepage with curriculum browser
```

---

## Getting Started

### Prerequisites
* Node.js (v18.0.0 or higher recommended)
* `pnpm` (or `npm` / `yarn`)

### Installation
```bash
# Clone the repository
git clone https://github.com/mhdhamka/TechMY.git

# Navigate to the workspace
cd TechMY

# Install dependencies
pnpm install
```

### Local Development
```bash
# Start the VitePress dev server with hot reload
pnpm docs:dev
```
The application will be accessible at `http://localhost:3000` (or `http://localhost:5173`).

### Production Build & Preview
```bash
# Build static site assets to docs/.vitepress/dist
pnpm docs:build

# Preview the production build locally
pnpm docs:preview
```

---

## Architecture & Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [VitePress](https://vitepress.dev/) 1.6+ | Fast, Vue-powered static site generator with instant page loads |
| **UI Components** | [Vue 3](https://vuejs.org/) (Composition API) | Reactive components for bookmarks, roadmap, and filtering |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Strict type safety and data models |
| **Styling** | Custom CSS Variables | GitHub Dark aesthetic with vibrant Loki Green (`#3fb950`) accents |
| **Persistence** | Browser `localStorage` | Client-side, privacy-first storage for user bookmarks and progress |

---

## Contributing

Contributions, corrections, book recommendations, and local Malaysian resource updates are welcome!

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/NewGuide`).
3. Commit your Changes (`git commit -m 'feat: add guide for cloud security'`).
4. Push to the Branch (`git push origin feature/NewGuide`).
5. Open a Pull Request.

If you find this resource helpful for the Malaysian tech community, consider starring ⭐ the repository!

---

Developed by [mhdhamka](https://github.com/mhdhamka) for personal growth and the Malaysian Tech Community.