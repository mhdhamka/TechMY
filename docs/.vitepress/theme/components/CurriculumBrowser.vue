<script setup lang="ts">
import { ref, computed } from "vue";
import { withBase } from "vitepress";
import { useBookmarks } from "../composables/useBookmarks";

interface CurriculumArticle {
  id: string;
  title: string;
  path: string;
  category: "AI" | "DevOps" | "Cybersecurity" | "Software Engineering" | "Data" | "System Design" | "Local Hub";
  categoryLabel: string;
  accentColor: string;
  tagClass: string;
  readTime: string;
  description: string;
  skills: string[];
  featured?: boolean;
}

const { isBookmarked, toggleBookmark } = useBookmarks();

const activeCategory = ref<string>("All");
const searchQuery = ref<string>("");

const categories = [
  { id: "All", label: "All Curricula", icon: "📚" },
  { id: "System Design", label: "System Design", icon: "📐", color: "#388bfd" },
  { id: "AI", label: "AI & ML", icon: "🤖", color: "#bc8cff" },
  { id: "DevOps", label: "DevOps", icon: "⚡", color: "#d29922" },
  { id: "Cybersecurity", label: "Cybersecurity", icon: "🛡️", color: "#f0883e" },
  { id: "Software Engineering", label: "Software Eng", icon: "💻", color: "#3fb950" },
  { id: "Data", label: "Data Eng", icon: "📊", color: "#58a6ff" },
  { id: "Local Hub", label: "Malaysia Hub", icon: "🇲🇾", color: "#f778ba" }
];

const articles: CurriculumArticle[] = [
  // System Design & Tooling
  {
    id: "sd-master",
    title: "System Design Architecture Master Guide",
    path: "/system-design/",
    category: "System Design",
    categoryLabel: "System Design",
    accentColor: "#388bfd",
    tagClass: "tag-sd",
    readTime: "16 min read",
    description: "Distributed systems foundations, CAP & PACELC theorems, latency hierarchy, and Malaysian real-time payment switch case study.",
    skills: ["DDIA", "CAP Theorem", "High Availability", "Latency Numbers", "FinTech Switch"],
    featured: true
  },
  {
    id: "sd-scalability",
    title: "Scalability, Load Balancing & Sharding",
    path: "/system-design/scalability-basics",
    category: "System Design",
    categoryLabel: "System Design",
    accentColor: "#388bfd",
    tagClass: "tag-sd",
    readTime: "15 min read",
    description: "Horizontal scaling, L4 vs L7 load balancing (NGINX/ALB), consistent hashing rings, read replicas, and database partitioning.",
    skills: ["Horizontal Scaling", "NGINX L7", "Consistent Hashing", "Database Sharding", "Replication Lag"]
  },
  {
    id: "sd-caching-messaging",
    title: "Caching & Messaging Systems Architecture",
    path: "/system-design/caching-messaging",
    category: "System Design",
    categoryLabel: "System Design",
    accentColor: "#388bfd",
    tagClass: "tag-sd",
    readTime: "14 min read",
    description: "Redis cache-aside patterns, cache stampede prevention, Bloom filters, Kafka event streaming, and idempotent consumers.",
    skills: ["Redis", "Apache Kafka", "Cache Stampede", "Idempotency", "Dead Letter Queues"]
  },
  {
    id: "tooling-terminal",
    title: "Developer Tooling, Shell & Terminal Mastery",
    path: "/tooling/terminal-shell",
    category: "System Design",
    categoryLabel: "Tooling & CLI",
    accentColor: "#388bfd",
    tagClass: "tag-sd",
    readTime: "11 min read",
    description: "Modern CLI utilities (ripgrep, fzf, bat), persistent tmux sessions, jq JSON pipelines, and multi-hop SSH configurations.",
    skills: ["tmux", "fzf", "ripgrep", "jq", "SSH Config"]
  },
  {
    id: "tooling-api-testing",
    title: "API Design, Contract Testing & Benchmarking",
    path: "/tooling/api-testing",
    category: "System Design",
    categoryLabel: "Tooling & APIs",
    accentColor: "#388bfd",
    tagClass: "tag-sd",
    readTime: "12 min read",
    description: "RESTful Richardson maturity levels, OpenAPI 3.1 contract-first specifications, gRPC comparison, and automated k6 load testing.",
    skills: ["OpenAPI 3.1", "REST vs gRPC", "k6 Load Testing", "Contract Testing", "HTTP Statuses"]
  },

  // AI & ML
  {
    id: "ai-master",
    title: "AI & Machine Learning Master Curriculum",
    path: "/ai-ml/",
    category: "AI",
    categoryLabel: "AI & ML",
    accentColor: "#bc8cff",
    tagClass: "tag-ai",
    readTime: "15 min read",
    description: "Deep dive into linear algebra foundations, neural network architectures, applied LLMs, and Malaysia's AI supercomputing ecosystem.",
    skills: ["PyTorch", "Transformers", "LLMs", "Vector Search", "NAIO Ethics"],
    featured: true
  },
  {
    id: "ai-deep-learning",
    title: "Deep Learning Foundations & PyTorch",
    path: "/ai-ml/deep-learning-basics",
    category: "AI",
    categoryLabel: "Deep Learning",
    accentColor: "#bc8cff",
    tagClass: "tag-ai",
    readTime: "14 min read",
    description: "Tensors, dynamic computational graphs, backpropagation calculus, activation functions, AdamW optimizer, and PyTorch training loops.",
    skills: ["PyTorch", "Autograd", "Backpropagation", "AdamW", "Loss Functions"]
  },
  {
    id: "ai-llm-rag",
    title: "Large Language Models & Production RAG",
    path: "/ai-ml/llm-and-rag",
    category: "AI",
    categoryLabel: "GenAI & RAG",
    accentColor: "#bc8cff",
    tagClass: "tag-ai",
    readTime: "16 min read",
    description: "Transformer multi-head self-attention, chunking strategies, pgvector search, hybrid BM25 + dense retrieval, and RAG triad evaluation.",
    skills: ["Self-Attention", "Vector DBs", "Hybrid Search (RRF)", "Mesolitica Malaya", "Ragas"]
  },
  {
    id: "ai-devops-mlops",
    title: "AI & DevOps Workflows (MLOps & vLLM)",
    path: "/ai-ml/ai-devops",
    category: "AI",
    categoryLabel: "MLOps",
    accentColor: "#bc8cff",
    tagClass: "tag-ai",
    readTime: "14 min read",
    description: "High-throughput vLLM PagedAttention serving, AWQ/GGUF quantization, LoRA parameter-efficient fine-tuning, and LLM telemetry.",
    skills: ["vLLM PagedAttention", "Quantization", "LoRA / QLoRA", "TTFT / ITL", "PDPA Privacy"]
  },
  {
    id: "ai-ops",
    title: "AI & Operations (AIOps)",
    path: "/devops-infrastructure/ai-operations",
    category: "AI",
    categoryLabel: "AI & Operations",
    accentColor: "#bc8cff",
    tagClass: "tag-ai",
    readTime: "10 min read",
    description: "Orchestrating automated AI telemetry, predictive incident alerts, LLM inference observability, and model serving in enterprise clouds.",
    skills: ["vLLM", "MLOps", "Model Monitoring", "Telemetry", "OpenTelemetry"]
  },
  {
    id: "ai-roadmap",
    title: "Malaysian AI Career Roadmap: GenAI & NAIO Ethics",
    path: "/roadmap",
    category: "AI",
    categoryLabel: "AI Roadmap",
    accentColor: "#bc8cff",
    tagClass: "tag-ai",
    readTime: "Interactive",
    description: "Career stages from Applied Math to MLOps, Johor AI supercomputing corridor insights, and National AI Office ethics compliance.",
    skills: ["RAG Systems", "Mesolitica / Malaya", "vLLM", "AI Ethics", "NVIDIA Superclusters"],
    featured: true
  },

  // DevOps & Infrastructure
  {
    id: "devops-master",
    title: "DevOps & Infrastructure Master Guide",
    path: "/devops-infrastructure/",
    category: "DevOps",
    categoryLabel: "DevOps & Cloud",
    accentColor: "#d29922",
    tagClass: "tag-devops",
    readTime: "18 min read",
    description: "Comprehensive blueprint spanning culture & flow, containerization, CI/CD automation, IaC, and SRE principles mapped to industry literature.",
    skills: ["The Three Ways", "Docker", "CI/CD", "Terraform", "SRE"],
    featured: true
  },
  {
    id: "devops-docker",
    title: "Container & Docker Fundamentals",
    path: "/devops-infrastructure/container-docker",
    category: "DevOps",
    categoryLabel: "DevOps & Cloud",
    accentColor: "#d29922",
    tagClass: "tag-devops",
    readTime: "14 min read",
    description: "Master container runtimes, multi-stage image builds, layer caching, isolated network bridges, and Docker Compose orchestration.",
    skills: ["Dockerfiles", "Multi-stage Builds", "Compose", "Networking", "Namespaces"]
  },
  {
    id: "devops-cicd",
    title: "CI/CD Workflows & GitHub Actions",
    path: "/devops-infrastructure/cicd-workflows",
    category: "DevOps",
    categoryLabel: "DevOps & Cloud",
    accentColor: "#d29922",
    tagClass: "tag-devops",
    readTime: "15 min read",
    description: "Automate test matrices, security linters, artifact builds, and zero-downtime deployment pipelines with GitHub Actions workflows.",
    skills: ["GitHub Actions", "Pipeline Optimization", "Artifact Cache", "Secrets Management"]
  },
  {
    id: "devops-sre",
    title: "Infrastructure as Code & SRE Practices",
    path: "/devops-infrastructure/infrastructure-sre",
    category: "DevOps",
    categoryLabel: "DevOps & Cloud",
    accentColor: "#d29922",
    tagClass: "tag-devops",
    readTime: "16 min read",
    description: "Service Level Objectives (SLOs), error budgets, incident post-mortems, and declarative Terraform configurations for resilient infrastructure.",
    skills: ["Terraform", "SLO / SLI", "Error Budgets", "Incident Response", "Chaos Engineering"]
  },
  {
    id: "devops-culture",
    title: "DevOps Culture & Flow Optimization",
    path: "/devops-infrastructure/culture-flow",
    category: "DevOps",
    categoryLabel: "DevOps & Cloud",
    accentColor: "#d29922",
    tagClass: "tag-devops",
    readTime: "9 min read",
    description: "The Three Ways, value stream mapping, reducing work in progress (WIP), and building blame-free engineering learning cultures.",
    skills: ["Value Stream Mapping", "Lead Time", "Blameless Post-mortems", "Flow"]
  },
  {
    id: "devops-cheatsheets",
    title: "DevOps & CLI Cheatsheets",
    path: "/devops-infrastructure/cheatsheets/",
    category: "DevOps",
    categoryLabel: "DevOps & Cloud",
    accentColor: "#d29922",
    tagClass: "tag-devops",
    readTime: "5 min reference",
    description: "Quick-reference syntax for Docker commands, Linux performance troubleshooting, networking commands, and container inspection.",
    skills: ["Docker CLI", "Linux Perf", "Netstat / ss", "cURL", "jq"]
  },

  // Cybersecurity
  {
    id: "cyber-master",
    title: "Cybersecurity Curriculum: BNM RMiT & National Defense",
    path: "/cybersecurity/",
    category: "Cybersecurity",
    categoryLabel: "Cybersecurity",
    accentColor: "#f0883e",
    tagClass: "tag-cyber",
    readTime: "14 min read",
    description: "Structured guide covering regulatory defense under Bank Negara Malaysia RMiT, Cyber Security Act 2024 (Act 854), and offensive hygiene.",
    skills: ["BNM RMiT", "Act 854", "Zero Trust", "Threat Modeling", "SIEM"],
    featured: true
  },
  {
    id: "cyber-secure-coding",
    title: "Secure Coding & OWASP Top 10 Mitigation",
    path: "/cybersecurity/secure-coding",
    category: "Cybersecurity",
    categoryLabel: "Cybersecurity",
    accentColor: "#f0883e",
    tagClass: "tag-cyber",
    readTime: "15 min read",
    description: "Practical defense patterns against SQL injection, Broken Object Level Authorization (BOLA), SSRF, and cross-site scripting in production.",
    skills: ["OWASP Top 10", "Input Validation", "BOLA / IDOR", "Parameterized Queries", "Secrets Handling"]
  },
  {
    id: "cyber-fundamentals",
    title: "Security Fundamentals & Network Defense",
    path: "/cybersecurity/fundamentals",
    category: "Cybersecurity",
    categoryLabel: "Cybersecurity",
    accentColor: "#f0883e",
    tagClass: "tag-cyber",
    readTime: "11 min read",
    description: "Network segmentation, cryptographic protocols (TLS 1.3), packet analysis with Wireshark, and defensive posture validation.",
    skills: ["TLS 1.3", "Packet Inspection", "Access Control Lists", "Public Key Infrastructure (PKI)"]
  },

  // Software Engineering
  {
    id: "swe-master",
    title: "Software Engineering Core Curriculum",
    path: "/software-engineering/",
    category: "Software Engineering",
    categoryLabel: "Software Engineering",
    accentColor: "#3fb950",
    tagClass: "tag-swe",
    readTime: "12 min read",
    description: "Foundational software craft inspired by industry bibles, architectural design principles, and enterprise code quality standards.",
    skills: ["Clean Code", "SOLID Principles", "Design Patterns", "Refactoring", "Code Reviews"],
    featured: true
  },
  {
    id: "swe-clean-code",
    title: "Foundations & Clean Code Hygiene",
    path: "/software-engineering/clean-code",
    category: "Software Engineering",
    categoryLabel: "Software Engineering",
    accentColor: "#3fb950",
    tagClass: "tag-swe",
    readTime: "10 min read",
    description: "Meaningful naming conventions, small single-responsibility functions, error handling practices, and clean abstractions.",
    skills: ["Single Responsibility", "Naming Conventions", "Function Scoping", "Unit Testing"]
  },
  {
    id: "swe-pragmatic",
    title: "The Pragmatic Programmer: Habits & Craftsmanship",
    path: "/software-engineering/pragmatic-habits",
    category: "Software Engineering",
    categoryLabel: "Software Engineering",
    accentColor: "#3fb950",
    tagClass: "tag-swe",
    readTime: "11 min read",
    description: "Orthogonality, DRY principles, tracer bullets, broken windows theory, and pragmatic engineering trade-offs.",
    skills: ["DRY Principle", "Orthogonality", "Prototyping", "Engineering Ethics"]
  },
  {
    id: "swe-construction",
    title: "Engineering Construction & Code Complete",
    path: "/software-engineering/code-construction",
    category: "Software Engineering",
    categoryLabel: "Software Engineering",
    accentColor: "#3fb950",
    tagClass: "tag-swe",
    readTime: "13 min read",
    description: "Defensive programming, routine design, data-driven code construction, and structural complexity management.",
    skills: ["Defensive Programming", "Complexity Analysis", "Modular Decomposition", "Code Quality"]
  },
  {
    id: "swe-interview",
    title: "Technical Interview & System Design Preparation",
    path: "/software-engineering/interview-prep",
    category: "Software Engineering",
    categoryLabel: "Software Engineering",
    accentColor: "#3fb950",
    tagClass: "tag-swe",
    readTime: "14 min read",
    description: "Data structures, algorithmic problem solving, Malaysian tech hiring expectations, and mock interview strategy.",
    skills: ["Algorithms", "Data Structures", "System Design", "Behavioral Frameworks"]
  },
  {
    id: "swe-languages",
    title: "Programming Language Mastery",
    path: "/software-engineering/languages/",
    category: "Software Engineering",
    categoryLabel: "Software Engineering",
    accentColor: "#3fb950",
    tagClass: "tag-swe",
    readTime: "8 min read",
    description: "Idiomatic paradigms and practical recipes for TypeScript, Go, Python, and Rust in enterprise backend systems.",
    skills: ["Go / Golang", "TypeScript", "Python", "Concurrency", "Type Systems"]
  },

  // Data Engineering
  {
    id: "data-master",
    title: "Data Architecture & Distributed Systems",
    path: "/data-engineering/",
    category: "Data",
    categoryLabel: "Data Engineering",
    accentColor: "#58a6ff",
    tagClass: "tag-data",
    readTime: "10 min read",
    description: "Overview of modern data engineering lifecycles, storage layers, compute orchestration, and enterprise analytical pipelines.",
    skills: ["Distributed Storage", "Data Lakehouse", "Compute Engines", "Data Modeling"]
  },
  {
    id: "data-pipelines",
    title: "ETL & Pipeline Orchestration",
    path: "/data-engineering/pipelines-etl",
    category: "Data",
    categoryLabel: "Data Engineering",
    accentColor: "#58a6ff",
    tagClass: "tag-data",
    readTime: "12 min read",
    description: "Building resilient batch and streaming pipelines, DAG scheduling, idempotent transformations, and data quality assertions.",
    skills: ["Airflow", "dbt", "Kafka Streams", "Data Quality", "Idempotence"]
  },
  {
    id: "data-warehousing",
    title: "Data Modeling & Cloud Warehousing",
    path: "/data-engineering/data-warehousing",
    category: "Data",
    categoryLabel: "Data Engineering",
    accentColor: "#58a6ff",
    tagClass: "tag-data",
    readTime: "11 min read",
    description: "Kimball dimensional modeling, star schemas, slowly changing dimensions (SCD), and query acceleration in BigQuery & Snowflake.",
    skills: ["Dimensional Modeling", "Star Schema", "BigQuery", "Snowflake", "Partitioning"]
  },
  {
    id: "data-sql",
    title: "High-Performance SQL Recipes",
    path: "/data-engineering/sql-recipes",
    category: "Data",
    categoryLabel: "Data Engineering",
    accentColor: "#58a6ff",
    tagClass: "tag-data",
    readTime: "9 min read",
    description: "Window functions, Common Table Expressions (CTEs), recursive queries, and query execution plan tuning.",
    skills: ["Window Functions", "CTEs", "EXPLAIN ANALYZE", "Query Optimization"]
  },

  // Local Hub / Malaysian Ecosystem
  {
    id: "local-hub-master",
    title: "Malaysian Tech Ecosystem Master Guide",
    path: "/local-resources/",
    category: "Local Hub",
    categoryLabel: "Malaysian Ecosystem",
    accentColor: "#f778ba",
    tagClass: "tag-local",
    readTime: "15 min read",
    description: "The definitive landscape of Malaysian tech: Software scale-ups, FinTech payment switches, AI supercomputing in Johor, and national cybersecurity.",
    skills: ["PayNet DuitNow", "AWS ap-southeast-5", "Johor AI Corridors", "Scale-ups", "Ministry of Digital"],
    featured: true
  },
  {
    id: "local-communities",
    title: "Malaysian Developer Communities & Meetups",
    path: "/local-resources/communities",
    category: "Local Hub",
    categoryLabel: "Communities & Hubs",
    accentColor: "#f778ba",
    tagClass: "tag-local",
    readTime: "10 min read",
    description: "Curated directory of active developer groups: GDG, ReactJS MY, PyCon MY, DevOps Malaysia, KCD, RawSec, and physical hubs like MRANTI & WORQ.",
    skills: ["GDG DevFest", "DevOps Malaysia", "PyCon MY", "RawSec", "MRANTI Park"]
  },
  {
    id: "local-careers",
    title: "Malaysian Tech Careers, Salaries & Hiring Guide",
    path: "/local-resources/careers-hiring",
    category: "Local Hub",
    categoryLabel: "Careers & Hiring",
    accentColor: "#f778ba",
    tagClass: "tag-local",
    readTime: "13 min read",
    description: "Grounded 2026 salary benchmarks across Junior to Staff levels, top engineering employers (PayNet, GXBank, Carsome), EPF/PCB taxes, and remote contracts.",
    skills: ["Salary Benchmarks", "Interview Loops", "EPF & PCB Taxes", "Top Employers", "Remote Work"]
  },
  {
    id: "local-compliance",
    title: "Malaysian Cyber Laws, BNM RMiT & Compliance",
    path: "/local-resources/compliance",
    category: "Local Hub",
    categoryLabel: "Law & Compliance",
    accentColor: "#f778ba",
    tagClass: "tag-local",
    readTime: "14 min read",
    description: "Technical compliance for Malaysian systems: Bank Negara Malaysia RMiT (99.9% uptime, RTO/RPO), Cyber Security Act 2024, and PDPA 2024 amendments.",
    skills: ["BNM RMiT", "Cyber Security Act 2024", "PDPA 2024", "MyInvois e-Invoice", "NACSA 6h Rule"]
  }
];

const categoryCounts = computed(() => {
  const counts: Record<string, number> = { All: articles.length };
  categories.forEach((cat) => {
    if (cat.id !== "All") {
      counts[cat.id] = articles.filter((a) => a.category === cat.id).length;
    }
  });
  return counts;
});

const filteredArticles = computed(() => {
  let list = [...articles];

  if (activeCategory.value !== "All") {
    list = list.filter((a) => a.category === activeCategory.value);
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase();
    list = list.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.skills.some((s) => s.toLowerCase().includes(q))
    );
  }

  return list;
});

function handleBookmarkToggle(article: CurriculumArticle) {
  toggleBookmark({
    path: article.path,
    title: article.title,
    description: article.description,
    category: article.categoryLabel
  });
}
</script>

<template>
  <div id="curriculum-browser-root" class="curriculum-browser-container">
    <!-- Header Section -->
    <div class="browser-header">
      <div class="header-titles">
        <div class="header-badge">
          <span class="badge-dot"></span>
          <span>Explore Curricula & Guides</span>
        </div>
        <h3 class="section-title">Browse Content by Technical Domain</h3>
        <p class="section-subtitle">
          Quickly filter across our open-source curriculum guides using dedicated category filters for <strong>AI</strong>, <strong>DevOps</strong>, <strong>Cybersecurity</strong>, and engineering foundations.
        </p>
      </div>

      <!-- Quick Search Bar -->
      <div class="browser-search-wrapper">
        <svg class="search-icon" viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
        </svg>
        <input
          id="curriculum-search-input"
          v-model="searchQuery"
          type="text"
          placeholder="Filter topics (e.g., Docker, RMiT, LLMs, Clean Code)..."
          class="browser-search-input"
          aria-label="Filter curriculum content by keyword"
        />
        <button
          v-if="searchQuery"
          type="button"
          class="clear-search-btn"
          aria-label="Clear search input"
          @click="searchQuery = ''"
        >
          ×
        </button>
      </div>
    </div>

    <!-- Category Filter Buttons -->
    <div class="category-filters-container" role="toolbar" aria-label="Curriculum category filters">
      <div class="category-buttons-group">
        <button
          v-for="cat in categories"
          :key="cat.id"
          :id="`btn-filter-${cat.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`"
          type="button"
          class="category-filter-btn"
          :class="[
            { active: activeCategory === cat.id },
            `cat-btn-${cat.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`
          ]"
          :style="activeCategory === cat.id && cat.color ? { borderColor: cat.color, color: cat.color } : {}"
          @click="activeCategory = cat.id"
        >
          <span class="cat-icon">{{ cat.icon }}</span>
          <span class="cat-name">{{ cat.label }}</span>
          <span class="cat-count-badge">{{ categoryCounts[cat.id] || 0 }}</span>
        </button>
      </div>
    </div>

    <!-- Active Filter Status Indicator -->
    <div class="results-meta-bar">
      <span class="results-count-text">
        Showing <strong>{{ filteredArticles.length }}</strong> {{ filteredArticles.length === 1 ? 'article guide' : 'article guides' }}
        <span v-if="activeCategory !== 'All'"> in <strong>{{ activeCategory }}</strong></span>
        <span v-if="searchQuery"> matching "<strong>{{ searchQuery }}</strong>"</span>
      </span>

      <button
        v-if="activeCategory !== 'All' || searchQuery"
        id="reset-all-filters-btn"
        type="button"
        class="reset-filters-link"
        @click="activeCategory = 'All'; searchQuery = ''"
      >
        Reset filters
      </button>
    </div>

    <!-- Articles Grid -->
    <div v-if="filteredArticles.length > 0" class="articles-cards-grid">
      <div
        v-for="(article, idx) in filteredArticles"
        :key="article.id"
        :id="`curriculum-card-${article.id}`"
        class="article-catalog-card"
        :class="{ 'is-featured': article.featured }"
      >
        <div class="card-top-bar">
          <span
            class="track-category-pill"
            :style="{
              borderColor: `${article.accentColor}50`,
              backgroundColor: `${article.accentColor}18`,
              color: article.accentColor
            }"
          >
            {{ article.categoryLabel }}
          </span>

          <div class="card-top-actions">
            <span class="read-time-pill">{{ article.readTime }}</span>
            <button
              :id="`card-bookmark-toggle-${idx}`"
              type="button"
              class="card-bookmark-btn"
              :class="{ 'is-active': isBookmarked(article.path) }"
              :title="isBookmarked(article.path) ? 'Remove from saved bookmarks' : 'Save article to bookmarks'"
              :aria-label="isBookmarked(article.path) ? `Remove ${article.title} from bookmarks` : `Bookmark ${article.title}`"
              @click="handleBookmarkToggle(article)"
            >
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                :fill="isBookmarked(article.path) ? '#3fb950' : 'none'"
                :stroke="isBookmarked(article.path) ? '#3fb950' : 'currentColor'"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
        </div>

        <a :href="withBase(article.path)" class="card-main-title">
          {{ article.title }}
        </a>

        <p class="card-main-desc">
          {{ article.description }}
        </p>

        <!-- Topic Badges -->
        <div class="card-skills-wrap">
          <span
            v-for="skill in article.skills"
            :key="skill"
            class="skill-chip"
          >
            {{ skill }}
          </span>
        </div>

        <!-- Footer Link -->
        <div class="card-footer-action">
          <a :href="withBase(article.path)" class="read-guide-link">
            <span>Read Curriculum Guide</span>
            <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor">
              <path fill-rule="evenodd" d="M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06l2.97-2.97H3.75a.75.75 0 0 1 0-1.5h7.44L8.22 4.03a.75.75 0 0 1 0-1.06z" clip-rule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="browser-empty-state">
      <div class="empty-icon-box">🔍</div>
      <h4>No Articles Match Your Filter</h4>
      <p>There are currently no curriculum articles matching "<strong>{{ searchQuery }}</strong>" under the <strong>{{ activeCategory }}</strong> category.</p>
      <button
        id="empty-reset-btn"
        type="button"
        class="empty-action-btn"
        @click="activeCategory = 'All'; searchQuery = ''"
      >
        View All Curriculum Guides
      </button>
    </div>
  </div>
</template>

<style scoped>
.curriculum-browser-container {
  margin: 32px 0 24px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Header */
.browser-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 16px;
  border-bottom: 1px solid #21262d;
  padding-bottom: 16px;
}

.header-titles {
  max-width: 600px;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.74rem;
  font-weight: 700;
  color: #3fb950;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #3fb950;
  box-shadow: 0 0 8px rgba(63, 185, 80, 0.6);
}

.section-title {
  margin: 0 0 6px 0;
  font-size: 1.35rem;
  font-weight: 800;
  color: #f0f6fc;
  letter-spacing: -0.01em;
}

.section-subtitle {
  margin: 0;
  font-size: 0.88rem;
  color: #8b949e;
  line-height: 1.5;
}

.section-subtitle strong {
  color: #c9d1d9;
}

.browser-search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 380px;
}

.search-icon {
  position: absolute;
  left: 10px;
  color: #8b949e;
  pointer-events: none;
}

.browser-search-input {
  width: 100%;
  padding: 8px 32px 8px 34px;
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 8px;
  font-size: 0.84rem;
  color: #f0f6fc;
  transition: all 0.2s ease;
}

.browser-search-input:focus {
  outline: none;
  border-color: #3fb950;
  box-shadow: 0 0 0 2px rgba(63, 185, 80, 0.2);
}

.clear-search-btn {
  position: absolute;
  right: 8px;
  background: transparent;
  border: none;
  color: #8b949e;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0 4px;
}

/* Category Filter Buttons */
.category-filters-container {
  overflow-x: auto;
  padding-bottom: 4px;
}

.category-buttons-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.category-filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 8px;
  background-color: #161b22;
  border: 1px solid #30363d;
  color: #c9d1d9;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
  user-select: none;
}

.category-filter-btn:hover {
  background-color: #21262d;
  border-color: #8b949e;
  color: #f0f6fc;
  transform: translateY(-1px);
}

.category-filter-btn.active {
  background-color: #21262d;
  border-color: #3fb950;
  color: #3fb950;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}

.cat-icon {
  font-size: 0.95rem;
}

.cat-count-badge {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 10px;
  background-color: #0d1117;
  color: #8b949e;
  border: 1px solid #30363d;
}

.category-filter-btn.active .cat-count-badge {
  background-color: rgba(63, 185, 80, 0.15);
  border-color: rgba(63, 185, 80, 0.3);
  color: inherit;
}

/* Meta Bar */
.results-meta-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #8b949e;
  padding: 2px 4px;
}

.reset-filters-link {
  background: transparent;
  border: none;
  color: #3fb950;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
}

.reset-filters-link:hover {
  text-decoration: underline;
}

/* Cards Grid */
.articles-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

.article-catalog-card {
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 12px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}

.article-catalog-card:hover {
  border-color: rgba(63, 185, 80, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}

.card-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 10px;
}

.track-category-pill {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.card-top-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.read-time-pill {
  font-size: 0.72rem;
  color: #8b949e;
  background-color: #0d1117;
  border: 1px solid #21262d;
  padding: 2px 6px;
  border-radius: 4px;
}

.card-bookmark-btn {
  background-color: #21262d;
  border: 1px solid #30363d;
  border-radius: 6px;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b949e;
  cursor: pointer;
  transition: all 0.15s ease;
}

.card-bookmark-btn:hover {
  color: #3fb950;
  border-color: #3fb950;
  transform: scale(1.05);
}

.card-bookmark-btn.is-active {
  background-color: rgba(63, 185, 80, 0.15);
  border-color: #3fb950;
  color: #3fb950;
}

.card-main-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #f0f6fc;
  text-decoration: none;
  line-height: 1.35;
  margin-bottom: 8px;
  transition: color 0.15s ease;
}

.card-main-title:hover {
  color: #3fb950;
}

.card-main-desc {
  font-size: 0.82rem;
  color: #8b949e;
  line-height: 1.45;
  margin: 0 0 14px 0;
  flex: 1;
}

.card-skills-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 14px;
}

.skill-chip {
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 4px;
  background-color: #21262d;
  color: #c9d1d9;
  border: 1px solid #30363d;
}

.card-footer-action {
  padding-top: 12px;
  border-top: 1px solid #21262d;
}

.read-guide-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.82rem;
  font-weight: 600;
  color: #3fb950;
  text-decoration: none;
  transition: gap 0.15s ease;
}

.read-guide-link:hover {
  gap: 9px;
  text-decoration: underline;
}

/* Empty State */
.browser-empty-state {
  text-align: center;
  padding: 40px 16px;
  background-color: #161b22;
  border: 1px dashed #30363d;
  border-radius: 12px;
}

.empty-icon-box {
  font-size: 2rem;
  margin-bottom: 10px;
}

.browser-empty-state h4 {
  margin: 0 0 6px 0;
  font-size: 1.1rem;
  color: #f0f6fc;
}

.browser-empty-state p {
  margin: 0 0 16px 0;
  font-size: 0.85rem;
  color: #8b949e;
}

.empty-action-btn {
  padding: 8px 16px;
  border-radius: 6px;
  background-color: #21262d;
  border: 1px solid #3fb950;
  color: #3fb950;
  font-size: 0.84rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.empty-action-btn:hover {
  background-color: rgba(63, 185, 80, 0.15);
}

@media (max-width: 768px) {
  .browser-header {
    flex-direction: column;
    align-items: stretch;
  }
  .browser-search-wrapper {
    max-width: 100%;
  }
  .category-buttons-group {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 6px;
  }
  .articles-cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
