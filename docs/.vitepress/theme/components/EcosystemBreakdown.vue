<script setup lang="ts">
import { ref, computed } from "vue";
import { withBase } from "vitepress";

interface CompanyProfile {
  name: string;
  role: string;
  badge: string;
  description: string;
}

interface DisciplineItem {
  id: string;
  letter: string;
  title: string;
  shortTitle: string;
  icon: string;
  accentColor: string;
  accentClass: string;
  tag: string;
  curriculumLink: string;
  curriculumLabel: string;
  summary: string;
  keyCompanies: CompanyProfile[];
  engineeringChallenges: {
    label: string;
    description: string;
  }[];
  techStack: string[];
  regulations: {
    name: string;
    badge: string;
    note: string;
  }[];
  caseStudy: {
    title: string;
    metrics: string;
    content: string;
  };
}

const activeDisciplineId = ref<string>("swe");
const viewMode = ref<"tabs" | "bento">("tabs");

const disciplines: DisciplineItem[] = [
  {
    id: "swe",
    letter: "A",
    title: "Software Engineering & Product Scale-Ups",
    shortTitle: "Software Eng",
    icon: "💻",
    accentColor: "#3fb950",
    accentClass: "disc-swe",
    tag: "SWE",
    curriculumLink: "/software-engineering/",
    curriculumLabel: "Explore SWE Curriculum",
    summary: "Homegrown scale-ups and global engineering centers building high-velocity consumer apps, B2B SaaS marketplaces, and autonomous IoT systems.",
    keyCompanies: [
      {
        name: "Carsome",
        role: "Regional Unicorn",
        badge: "E-Commerce",
        description: "Southeast Asia's largest car e-commerce platform using microservices, real-time vehicle inspection pipelines, and dynamic pricing models."
      },
      {
        name: "Aerodyne Group",
        role: "Global DaaS Leader",
        badge: "Drone & AI",
        description: "Operating in 35+ countries from Cyberjaya, processing millions of infrastructure sensor images with autonomous computer vision pipelines."
      },
      {
        name: "StoreHub",
        role: "B2B SaaS Scale-Up",
        badge: "Cloud POS",
        description: "Cloud retail POS, automated inventory sync, and QR ordering engines powering tens of thousands of Malaysian F&B and retail SMEs."
      },
      {
        name: "SEEK (JobStreet)",
        role: "Global Engineering Hub",
        badge: "Talent Tech",
        description: "Massive search indexation, candidate matching algorithms, and modern frontend design systems built out of Kuala Lumpur."
      }
    ],
    engineeringChallenges: [
      {
        label: "Distributed Microservices Architecture",
        description: "Decoupling monolithic platforms into domain-driven microservices with gRPC and event-driven async communication."
      },
      {
        label: "Mobile-First Offline-Ready Apps",
        description: "Designing Flutter and React Native architectures with SQLite local caching and idempotent background data synchronization."
      },
      {
        label: "Cross-Border Internationalization",
        description: "Multi-currency, multi-lingual (BM, English, Mandarin), and localized tax handling across ASEAN markets."
      }
    ],
    techStack: ["TypeScript", "Go", "Python", "React", "Next.js", "Flutter", "PostgreSQL", "Docker"],
    regulations: [
      { name: "Clean Architecture", badge: "Standards", note: "Test-driven development, modular boundaries, and automated CI/CD gating." },
      { name: "OWASP Top 10", badge: "Security", note: "Mandatory SAST/DAST static analysis on every pull request." }
    ],
    caseStudy: {
      title: "Real-World Spotlight: Carsome Pricing Algorithm Engine",
      metrics: "Sub-second car valuation across 50,000+ data points",
      content: "Carsome integrates machine learning valuation microservices with distributed inspection databases, processing live auction bids across Malaysia, Indonesia, and Thailand with optimistic concurrency control."
    }
  },
  {
    id: "sys",
    letter: "B",
    title: "System Design, High Availability & FinTech Architecture",
    shortTitle: "System Design",
    icon: "📐",
    accentColor: "#388bfd",
    accentClass: "disc-sys",
    tag: "SYS",
    curriculumLink: "/system-design/",
    curriculumLabel: "Explore System Design",
    summary: "World-class national payment switches and licensed digital banks demanding extreme ACID consistency, sub-second latency, and zero tolerance for data loss.",
    keyCompanies: [
      {
        name: "PayNet (DuitNow)",
        role: "National Financial Switch",
        badge: "Payment Switch",
        description: "Routes instant peer-to-peer and QR payments across 40+ Malaysian banks and e-wallets utilizing ISO 20022 financial messaging."
      },
      {
        name: "GXBank",
        role: "First Licensed Digital Bank",
        badge: "Grab & Singtel",
        description: "Built ground-up on cloud-native banking cores, multi-region database replication, and automated KYC verification."
      },
      {
        name: "Boost Bank",
        role: "Axiata & RHB Consortium",
        badge: "Digital Banking",
        description: "Embedded digital financial services engineered for micro-SMEs, low-bandwidth mobile devices, and unbanked communities."
      },
      {
        name: "Touch 'n Go Digital",
        role: "National e-Wallet",
        badge: "Super-App",
        description: "Handles massive peak transaction concurrency during toll payments, public transit taps, and nationwide retail promotions."
      }
    ],
    engineeringChallenges: [
      {
        label: "Strict ACID & Exactly-Once Semantics",
        description: "Preventing double-spends using distributed database locks, idempotency keys, and the transactional outbox pattern."
      },
      {
        label: "Festival Flash-Traffic Surges",
        description: "Absorbing 10x traffic spikes during Hari Raya, 11.11, and payday flash sales using Redis caching and message queues."
      },
      {
        label: "Synchronous Multi-Zone Replication (RPO = 0)",
        description: "Zero data loss replication across local availability zones to comply with national banking mandates."
      }
    ],
    techStack: ["Apache Kafka", "Redis", "PostgreSQL HA", "gRPC", "Java / Spring Boot", "Go", "ISO 20022"],
    regulations: [
      { name: "BNM RMiT", badge: "Central Bank", note: "99.9% uptime, max 4h cumulative unplanned downtime/year, and RTO <= 2h." },
      { name: "PCI-DSS Level 1", badge: "Cards", note: "Strict tokenization of primary account numbers (PAN) and hardware HSM encryption." }
    ],
    caseStudy: {
      title: "Real-World Spotlight: PayNet DuitNow Real-Time Switch",
      metrics: "Millions of daily instant transfers under 300ms SLA",
      content: "PayNet's switch routes DuitNow QR and instant transfers between banks using high-throughput event buses, continuous distributed health checking, and active-active data center topologies across Malaysia."
    }
  },
  {
    id: "ai",
    letter: "C",
    title: "Artificial Intelligence, Supercomputing & Local NLP",
    shortTitle: "AI & ML",
    icon: "🤖",
    accentColor: "#bc8cff",
    accentClass: "disc-ai",
    tag: "AI",
    curriculumLink: "/ai-ml/",
    curriculumLabel: "Explore AI Curriculum",
    summary: "Hyperscale AI infrastructure in Johor, national governance under the National AI Office (NAIO), and open-source Bahasa Melayu LLM models.",
    keyCompanies: [
      {
        name: "YTL Power & NVIDIA",
        role: "500MW AI Supercomputing",
        badge: "Kulai, Johor",
        description: "Deploying NVIDIA Grace Blackwell GB200 supercomputers powered by renewable solar energy for regional AI cloud workloads."
      },
      {
        name: "National AI Office (NAIO)",
        role: "Sovereign AI Governance",
        badge: "Public Sector",
        description: "Drives the national AI roadmap, safe AI procurement standards, and ethical AI deployment frameworks across ministries."
      },
      {
        name: "Mesolitica (Malaya)",
        role: "Open Source AI Leader",
        badge: "Bahasa Melayu NLP",
        description: "Pioneering tokenizer, translation, and open-weights LLMs specifically fine-tuned for Bahasa Melayu and Malaysian slang."
      },
      {
        name: "MIMOS Berhad",
        role: "National Applied R&D",
        badge: "Deep Tech",
        description: "Government research arm developing indigenous computer vision, speech analytics, and semiconductor technologies."
      }
    ],
    engineeringChallenges: [
      {
        label: "Bahasa Melayu & Manglish Code-Switching",
        description: "Training tokenizers to efficiently handle multi-dialect Malaysian phrases and colloquial slang without high token inflation."
      },
      {
        label: "High-Throughput Low-Latency LLM Serving",
        description: "Deploying vLLM with PagedAttention, continuous batching, and prefix caching on local GPU clusters."
      },
      {
        label: "Sovereign Data Residency & Governance",
        description: "Ensuring sensitive citizen and healthcare data is processed within Malaysian jurisdiction."
      }
    ],
    techStack: ["PyTorch", "vLLM", "Hugging Face", "LangChain", "Qdrant", "pgvector", "NVIDIA CUDA"],
    regulations: [
      { name: "NAIO Ethical AI Code", badge: "Governance", note: "Fairness, transparency, explainability, and bias auditing for public AI systems." },
      { name: "PDPA 2024 AI Clauses", badge: "Privacy", note: "Consent mechanisms for automated decision-making and model training datasets." }
    ],
    caseStudy: {
      title: "Real-World Spotlight: Mesolitica Open-Source Bahasa Melayu LLMs",
      metrics: "Over 20M+ HuggingFace downloads for local models",
      content: "Mesolitica's Malaya suite provides pretrained transformers fine-tuned on Malaysian parliament transcripts, local news, and social media, drastically outperforming generic models on localized understanding."
    }
  },
  {
    id: "data",
    letter: "D",
    title: "Data Engineering & Open Government Data",
    shortTitle: "Data Eng",
    icon: "📊",
    accentColor: "#58a6ff",
    accentClass: "disc-data",
    tag: "DATA",
    curriculumLink: "/data-engineering/",
    curriculumLabel: "Explore Data Curriculum",
    summary: "Pioneering public open-data platforms (OpenDOSM), high-throughput telco CDR stream processing, and modern enterprise lakehouse architectures.",
    keyCompanies: [
      {
        name: "OpenDOSM & data.gov.my",
        role: "National Data Democratization",
        badge: "GovTech",
        description: "Modern public data platform offering open REST APIs for inflation, GDP, labor stats, and healthcare using modern web stacks."
      },
      {
        name: "CelcomDigi & Maxis",
        role: "Telco-Scale Data Pipelines",
        badge: "Streaming CDRs",
        description: "Processes billions of daily network event records and subscriber telemetrics using distributed Apache Kafka and Spark clusters."
      },
      {
        name: "Petronas Digital",
        role: "Energy Enterprise Lakehouse",
        badge: "Industrial Data",
        description: "Petabyte-scale sensor telemetry from offshore platforms powering digital twins and predictive maintenance models."
      },
      {
        name: "Databricks Malaysia",
        role: "Lakehouse Platform",
        badge: "Enterprise AI",
        description: "Powers unified analytics, dbt transformations, and ML model feature stores across Malaysian banks and conglomerates."
      }
    ],
    engineeringChallenges: [
      {
        label: "High-Volume Real-Time Ingestion",
        description: "Handling millions of streaming events per second with schema registries and partitioning strategies."
      },
      {
        label: "Public Open Data API Reliability",
        description: "Serving high-concurrency analytical queries with edge caching (Cloudflare/Fastly) and pre-aggregated parquet files."
      },
      {
        label: "Data Quality & Contract Testing",
        description: "Implementing automated dbt tests, Great Expectations, and lineage tracking across enterprise pipelines."
      }
    ],
    techStack: ["Apache Kafka", "Apache Spark", "dbt", "Snowflake", "BigQuery", "PostgreSQL", "Airflow"],
    regulations: [
      { name: "Public Sector Data Policy", badge: "Open Data", note: "Standardized machine-readable CSV/JSON formats with Creative Commons licensing." },
      { name: "Data Lineage Mandate", badge: "Audit", note: "Complete audit trails and lineage tracking for financial reporting data." }
    ],
    caseStudy: {
      title: "Real-World Spotlight: OpenDOSM API Infrastructure",
      metrics: "100% open-source government statistics with live REST endpoints",
      content: "The Ministry of Economy and DOSM re-architected Malaysian statistical access with Next.js, Python FastAPI, and PostgreSQL, providing instant charts and free programmatic API access to the public."
    }
  },
  {
    id: "ops",
    letter: "E",
    title: "DevOps, SRE & Sovereign Cloud Infrastructure",
    shortTitle: "DevOps & Cloud",
    icon: "⚡",
    accentColor: "#d29922",
    accentClass: "disc-ops",
    tag: "OPS",
    curriculumLink: "/devops-infrastructure/",
    curriculumLabel: "Explore DevOps Curriculum",
    summary: "The arrival of dedicated Malaysian hyperscale cloud regions (AWS ap-southeast-5), green data center corridors, and Kubernetes platform engineering.",
    keyCompanies: [
      {
        name: "AWS Malaysia (ap-southeast-5)",
        role: "Tier-1 Cloud Region",
        badge: "3 Availability Zones",
        description: "Billion-dollar local cloud region delivering single-digit millisecond latency and sovereign Malaysian data storage."
      },
      {
        name: "Google Cloud Malaysia",
        role: "Hyperscale Cloud",
        badge: "Enterprise & Gov",
        description: "Powering enterprise modernization, Vertex AI workloads, and government agency digital migrations."
      },
      {
        name: "AIMS & Cyberjaya DCs",
        role: "Carrier-Neutral Hubs",
        badge: "Interconnect",
        description: "Hosting the Malaysia Internet Exchange (MyIX) and direct fiber interconnects across Southeast Asia."
      },
      {
        name: "Sedenak & Nusajaya DC Parks",
        role: "Johor Green Tech Corridors",
        badge: "Renewable Power",
        description: "Rapidly expanding hyperscale data center parks equipped with high-efficiency liquid cooling and solar energy."
      }
    ],
    engineeringChallenges: [
      {
        label: "Low-Latency Regional Migration",
        description: "Migrating legacy Singapore (ap-southeast-1) workloads to Malaysia (ap-southeast-5) with zero downtime."
      },
      {
        label: "GitOps & Infrastructure as Code",
        description: "Enforcing immutable cloud infrastructure using Terraform, Terragrunt, and ArgoCD Kubernetes reconcilers."
      },
      {
        label: "Tier-IV Resilience & Power Efficiency (PUE)",
        description: "Optimizing green data center cooling in tropical Malaysian climates with Power Usage Effectiveness < 1.3."
      }
    ],
    techStack: ["Kubernetes", "Terraform", "Docker", "GitHub Actions", "ArgoCD", "Prometheus", "Grafana", "AWS"],
    regulations: [
      { name: "Government Cloud First Policy", badge: "Public Cloud", note: "Accelerating agency migration to certified sovereign cloud providers." },
      { name: "Green DC PUE Guidelines", badge: "Sustainability", note: "Mandatory energy efficiency targets for all new Malaysian data centers." }
    ],
    caseStudy: {
      title: "Real-World Spotlight: Migration to AWS ap-southeast-5",
      metrics: "<5ms round-trip latency for Malaysian domestic users",
      content: "Malaysian enterprises and public institutions are migrating critical banking and health services to the local AWS region, eliminating cross-border data transfer concerns while slashing latency by over 60%."
    }
  },
  {
    id: "sec",
    letter: "F",
    title: "Cybersecurity, National Resilience & Regulations",
    shortTitle: "Cybersecurity",
    icon: "🛡️",
    accentColor: "#f0883e",
    accentClass: "disc-sec",
    tag: "SEC",
    curriculumLink: "/cybersecurity/",
    curriculumLabel: "Explore Cyber Curriculum",
    summary: "National cyber defense across 11 critical infrastructure sectors, mandatory 6-hour incident disclosures, and strict anti-phishing banking standards.",
    keyCompanies: [
      {
        name: "NACSA (National Cyber Security Agency)",
        role: "National Cyber Command",
        badge: "NC4 Command Centre",
        description: "Enforces the Cyber Security Act 2024 and coordinates national cyber crisis response across public and private sectors."
      },
      {
        name: "CyberSecurity Malaysia",
        role: "Technical Cyber Agency",
        badge: "MyCERT / Forensics",
        description: "Provides digital forensics, malware evaluation, vulnerability disclosures, and specialized cybersecurity certifications."
      },
      {
        name: "LGMS Berhad",
        role: "Public Listed Cyber Firm",
        badge: "Offensive Security",
        description: "Leading independent cyber testing firm conducting deep penetration testing, red teaming, and regulatory audits."
      },
      {
        name: "Warga Siber Malaysia & RawSec",
        role: "Cyber Community & CTF",
        badge: "Grassroots",
        description: "Community-driven initiatives educating the public on scams, running CTF tournaments, and sharing threat intelligence."
      }
    ],
    engineeringChallenges: [
      {
        label: "Mandatory 6-Hour Incident Notification",
        description: "Engineering automated SIEM detection and runbooks to identify and report critical security breaches to NACSA within 6 hours."
      },
      {
        label: "Elimination of SMS OTPs in FinTech",
        description: "Replacing vulnerable SMS one-time passwords with cryptographically bound hardware tokens (Secure2u / SecureTAC)."
      },
      {
        label: "Software Supply Chain Security (SBOM)",
        description: "Generating Software Bill of Materials and conducting dependency audits to prevent third-party supply chain compromises."
      }
    ],
    techStack: ["Wazuh", "Splunk", "CrowdStrike", "Burp Suite", "Trivy", "Snort", "Suricata", "YARA"],
    regulations: [
      { name: "Cyber Security Act 2024 (Act 854)", badge: "National Law", note: "Applies across 11 NCII sectors with mandatory audits and 6h incident reporting." },
      { name: "PDPA 2024 Amendments", badge: "Data Privacy", note: "Mandatory DPO appointments, 72h breach notifications, and severe financial penalties." }
    ],
    caseStudy: {
      title: "Real-World Spotlight: Hardware-Bound Mobile Banking Authorization",
      metrics: ">90% reduction in SMS-intercept banking fraud",
      content: "Following Bank Negara Malaysia directives, Malaysian financial institutions transitioned all high-value transactions to asymmetric public-key cryptography stored in the mobile device's Secure Enclave, neutralizing SIM-swap attacks."
    }
  }
];

const activeDiscipline = computed(() => {
  return disciplines.find((d) => d.id === activeDisciplineId.value) || disciplines[0];
});

function selectDiscipline(id: string) {
  activeDisciplineId.value = id;
}
</script>

<template>
  <div id="malaysian-ecosystem-breakdown" class="ecosystem-breakdown-wrapper">
    <!-- Component Header -->
    <div class="breakdown-header">
      <div class="header-left">
        <div class="section-badge">
          <span class="badge-flag">🇲🇾</span>
          <span>Technical Domain Deep-Dive</span>
        </div>
        <h3 class="breakdown-title">Cross-Discipline Ecosystem Breakdown</h3>
        <p class="breakdown-desc">
          How each core software engineering pillar translates directly into Malaysian tech companies, regulatory mandates, and distributed architectures.
        </p>
      </div>

      <!-- View Switcher Tabs -->
      <div class="view-mode-bar">
        <button
          type="button"
          class="mode-btn"
          :class="{ active: viewMode === 'tabs' }"
          @click="viewMode = 'tabs'"
        >
          <span>Interactive Tabs</span>
        </button>
        <button
          type="button"
          class="mode-btn"
          :class="{ active: viewMode === 'bento' }"
          @click="viewMode = 'bento'"
        >
          <span>All Disciplines View</span>
        </button>
      </div>
    </div>

    <!-- TABBED INTERACTIVE MODE -->
    <div v-if="viewMode === 'tabs'" class="tabs-interactive-mode">
      <!-- Discipline Selector Navigation Bar -->
      <div class="discipline-nav-tabs" role="tablist" aria-label="Ecosystem Disciplines">
        <button
          v-for="disc in disciplines"
          :key="disc.id"
          :id="`disc-tab-${disc.id}`"
          type="button"
          class="disc-nav-btn"
          :class="[{ active: activeDisciplineId === disc.id }, disc.accentClass]"
          @click="selectDiscipline(disc.id)"
        >
          <span class="disc-letter-badge">{{ disc.letter }}</span>
          <span class="disc-icon">{{ disc.icon }}</span>
          <span class="disc-label">{{ disc.shortTitle }}</span>
        </button>
      </div>

      <!-- Active Discipline Presentation Canvas -->
      <div class="active-discipline-canvas" :class="activeDiscipline.accentClass">
        <!-- Banner / Hero of Selected Discipline -->
        <div class="discipline-hero-card">
          <div class="hero-meta-row">
            <div class="hero-tag-box">
              <span class="discipline-letter-pill">Section {{ activeDiscipline.letter }}</span>
              <span class="discipline-tag-pill" :style="{ color: activeDiscipline.accentColor, borderColor: activeDiscipline.accentColor + '50' }">
                {{ activeDiscipline.tag }}
              </span>
            </div>
            <a :href="withBase(activeDiscipline.curriculumLink)" class="curriculum-jump-link">
              <span>{{ activeDiscipline.curriculumLabel }}</span>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>

          <h3 class="discipline-title">
            <span class="title-icon">{{ activeDiscipline.icon }}</span>
            <span>{{ activeDiscipline.title }}</span>
          </h3>
          <p class="discipline-summary">{{ activeDiscipline.summary }}</p>
        </div>

        <!-- 2-Column Content Grid: Companies & Challenges -->
        <div class="discipline-details-grid">
          <!-- Left Column: Key Players & Case Studies -->
          <div class="detail-block companies-block">
            <div class="block-header">
              <h4 class="block-title">Key Malaysian Scale-Ups & Players</h4>
              <span class="block-counter">{{ activeDiscipline.keyCompanies.length }} Flagship Organizations</span>
            </div>

            <div class="companies-grid">
              <div
                v-for="company in activeDiscipline.keyCompanies"
                :key="company.name"
                class="company-item-card"
              >
                <div class="company-card-top">
                  <span class="company-name">{{ company.name }}</span>
                  <span class="company-badge">{{ company.badge }}</span>
                </div>
                <div class="company-role">{{ company.role }}</div>
                <p class="company-desc">{{ company.description }}</p>
              </div>
            </div>
          </div>

          <!-- Right Column: Engineering Challenges & Local Reality -->
          <div class="detail-block challenges-block">
            <div class="block-header">
              <h4 class="block-title">Engineering Challenges & Local Scale</h4>
              <span class="block-counter">Architecture Context</span>
            </div>

            <div class="challenges-list">
              <div
                v-for="(ch, idx) in activeDiscipline.engineeringChallenges"
                :key="idx"
                class="challenge-item"
              >
                <div class="challenge-num">0{{ idx + 1 }}</div>
                <div class="challenge-content">
                  <span class="challenge-label">{{ ch.label }}</span>
                  <p class="challenge-desc">{{ ch.description }}</p>
                </div>
              </div>
            </div>

            <!-- Tech Stacks -->
            <div class="sub-block tech-stacks-sub">
              <h5 class="sub-title">Flagship Local Tech Stacks</h5>
              <div class="stack-pills-row">
                <span v-for="tech in activeDiscipline.techStack" :key="tech" class="stack-pill">
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Regulatory Standards -->
            <div class="sub-block regulations-sub">
              <h5 class="sub-title">Applicable Malaysian Regulations</h5>
              <div class="regs-list">
                <div v-for="reg in activeDiscipline.regulations" :key="reg.name" class="reg-card">
                  <div class="reg-top">
                    <span class="reg-name">{{ reg.name }}</span>
                    <span class="reg-badge">{{ reg.badge }}</span>
                  </div>
                  <span class="reg-note">{{ reg.note }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Real-World Case Study Highlight Footer Card -->
        <div class="case-study-banner">
          <div class="case-study-left">
            <span class="case-study-tag">LOCAL ARCHITECTURE CASE STUDY</span>
            <h4 class="case-study-title">{{ activeDiscipline.caseStudy.title }}</h4>
            <p class="case-study-text">{{ activeDiscipline.caseStudy.content }}</p>
          </div>
          <div class="case-study-right">
            <div class="metrics-badge">
              <span class="metric-label">Key Metric</span>
              <span class="metric-value">{{ activeDiscipline.caseStudy.metrics }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- BENTO GRID ALL DISCIPLINES MODE -->
    <div v-else class="bento-all-disciplines-grid">
      <div
        v-for="disc in disciplines"
        :key="disc.id"
        class="bento-discipline-card"
        :class="disc.accentClass"
      >
        <div class="bento-header">
          <div class="bento-top-meta">
            <span class="bento-letter-pill">Section {{ disc.letter }}</span>
            <span class="bento-tag" :style="{ color: disc.accentColor }">{{ disc.tag }}</span>
          </div>
          <h4 class="bento-title">
            <span class="bento-icon">{{ disc.icon }}</span>
            <span>{{ disc.title }}</span>
          </h4>
          <p class="bento-summary">{{ disc.summary }}</p>
        </div>

        <!-- Key Companies List -->
        <div class="bento-section">
          <span class="bento-sec-label">Key Scale-Ups:</span>
          <div class="bento-companies-chips">
            <span v-for="c in disc.keyCompanies" :key="c.name" class="bento-company-chip">
              <strong>{{ c.name }}</strong> ({{ c.badge }})
            </span>
          </div>
        </div>

        <!-- Tech Stack -->
        <div class="bento-section">
          <span class="bento-sec-label">Tech Stack:</span>
          <div class="bento-tech-pills">
            <span v-for="t in disc.techStack.slice(0, 5)" :key="t" class="bento-tech-pill">
              {{ t }}
            </span>
          </div>
        </div>

        <!-- Footer -->
        <div class="bento-footer">
          <span class="bento-reg-pill">⚖️ {{ disc.regulations[0]?.name }}</span>
          <button
            type="button"
            class="bento-switch-tab-btn"
            @click="activeDisciplineId = disc.id; viewMode = 'tabs'"
          >
            Deep Dive →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ecosystem-breakdown-wrapper {
  margin: 28px 0 40px 0;
  background-color: #0d1117;
  border: 1px solid #30363d;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.35);
  font-family: var(--vp-font-family-base, 'Plus Jakarta Sans', sans-serif);
}

/* Header Area */
.breakdown-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px 28px 20px 28px;
  background: linear-gradient(180deg, #161b22 0%, #0d1117 100%);
  border-bottom: 1px solid #30363d;
  flex-wrap: wrap;
  gap: 20px;
}

.header-left {
  max-width: 680px;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: rgba(56, 139, 253, 0.12);
  border: 1px solid rgba(56, 139, 253, 0.3);
  color: #58a6ff;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.7px;
  padding: 4px 10px;
  border-radius: 20px;
  margin-bottom: 10px;
}

.breakdown-title {
  color: #f0f6fc !important;
  font-size: 1.5rem !important;
  font-weight: 800 !important;
  line-height: 1.25 !important;
  margin: 0 0 6px 0 !important;
  border-bottom: none !important;
}

.breakdown-desc {
  color: #8b949e;
  font-size: 0.9rem;
  line-height: 1.55;
  margin: 0;
}

/* View Mode Bar */
.view-mode-bar {
  display: flex;
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 8px;
  overflow: hidden;
  align-self: center;
}

.mode-btn {
  padding: 8px 16px;
  background: transparent;
  border: none;
  color: #8b949e;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mode-btn.active {
  background-color: #21262d;
  color: #3fb950;
}

/* Discipline Navigation Tabs */
.discipline-nav-tabs {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  background-color: #161b22;
  border-bottom: 1px solid #30363d;
}

.disc-nav-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 14px 8px;
  background: transparent;
  border: none;
  border-right: 1px solid #21262d;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.disc-nav-btn:last-child {
  border-right: none;
}

.disc-nav-btn:hover {
  background-color: #21262d;
}

.disc-letter-badge {
  font-size: 0.68rem;
  font-weight: 800;
  color: #8b949e;
  background-color: #0d1117;
  padding: 1px 6px;
  border-radius: 4px;
  margin-bottom: 4px;
}

.disc-icon {
  font-size: 1.25rem;
  margin-bottom: 4px;
}

.disc-label {
  font-size: 0.78rem;
  font-weight: 700;
  color: #8b949e;
  text-align: center;
  white-space: nowrap;
}

/* Active tab styles by discipline */
.disc-nav-btn.active {
  background-color: #0d1117;
}

.disc-nav-btn.active.disc-swe { border-bottom-color: #3fb950; }
.disc-nav-btn.active.disc-swe .disc-label { color: #3fb950; }
.disc-nav-btn.active.disc-swe .disc-letter-badge { background-color: #3fb95020; color: #3fb950; }

.disc-nav-btn.active.disc-sys { border-bottom-color: #388bfd; }
.disc-nav-btn.active.disc-sys .disc-label { color: #58a6ff; }
.disc-nav-btn.active.disc-sys .disc-letter-badge { background-color: #388bfd20; color: #58a6ff; }

.disc-nav-btn.active.disc-ai { border-bottom-color: #bc8cff; }
.disc-nav-btn.active.disc-ai .disc-label { color: #bc8cff; }
.disc-nav-btn.active.disc-ai .disc-letter-badge { background-color: #bc8cff20; color: #bc8cff; }

.disc-nav-btn.active.disc-data { border-bottom-color: #58a6ff; }
.disc-nav-btn.active.disc-data .disc-label { color: #58a6ff; }
.disc-nav-btn.active.disc-data .disc-letter-badge { background-color: #58a6ff20; color: #58a6ff; }

.disc-nav-btn.active.disc-ops { border-bottom-color: #d29922; }
.disc-nav-btn.active.disc-ops .disc-label { color: #d29922; }
.disc-nav-btn.active.disc-ops .disc-letter-badge { background-color: #d2992220; color: #d29922; }

.disc-nav-btn.active.disc-sec { border-bottom-color: #f0883e; }
.disc-nav-btn.active.disc-sec .disc-label { color: #f0883e; }
.disc-nav-btn.active.disc-sec .disc-letter-badge { background-color: #f0883e20; color: #f0883e; }

/* Active Canvas */
.active-discipline-canvas {
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: #0d1117;
}

.discipline-hero-card {
  background: linear-gradient(135deg, #161b22 0%, #1a222d 100%);
  border: 1px solid #30363d;
  border-radius: 12px;
  padding: 24px;
}

.hero-meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 12px;
}

.hero-tag-box {
  display: flex;
  align-items: center;
  gap: 8px;
}

.discipline-letter-pill {
  font-size: 0.72rem;
  font-weight: 800;
  color: #f0f6fc;
  background-color: #21262d;
  padding: 3px 10px;
  border-radius: 6px;
  text-transform: uppercase;
}

.discipline-tag-pill {
  font-size: 0.75rem;
  font-weight: 800;
  border: 1px solid transparent;
  padding: 3px 10px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.05);
}

.curriculum-jump-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #58a6ff !important;
  font-size: 0.82rem;
  font-weight: 600;
  text-decoration: none !important;
  transition: all 0.2s ease;
}

.curriculum-jump-link:hover {
  color: #79c0ff !important;
  transform: translateX(3px);
}

.discipline-title {
  color: #f0f6fc !important;
  font-size: 1.45rem !important;
  font-weight: 800 !important;
  margin: 0 0 10px 0 !important;
  line-height: 1.3 !important;
  border-bottom: none !important;
  display: flex;
  align-items: center;
  gap: 10px;
}

.discipline-summary {
  color: #c9d1d9;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
  max-width: 820px;
}

/* 2-Column Details Grid */
.discipline-details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.detail-block {
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.block-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #21262d;
  padding-bottom: 12px;
}

.block-title {
  font-size: 0.95rem !important;
  font-weight: 700 !important;
  color: #f0f6fc !important;
  margin: 0 !important;
  border-bottom: none !important;
}

.block-counter {
  font-size: 0.74rem;
  color: #8b949e;
  font-weight: 600;
}

/* Companies Grid */
.companies-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.company-item-card {
  background-color: #0d1117;
  border: 1px solid #21262d;
  border-radius: 8px;
  padding: 14px;
  transition: all 0.2s ease;
}

.company-item-card:hover {
  border-color: #388bfd;
  transform: translateY(-2px);
}

.company-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.company-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: #f0f6fc;
}

.company-badge {
  font-size: 0.7rem;
  font-weight: 700;
  color: #58a6ff;
  background-color: #388bfd15;
  border: 1px solid #388bfd30;
  padding: 2px 8px;
  border-radius: 4px;
}

.company-role {
  font-size: 0.75rem;
  color: #3fb950;
  font-weight: 600;
  margin-bottom: 6px;
}

.company-desc {
  font-size: 0.82rem;
  color: #8b949e;
  line-height: 1.5;
  margin: 0;
}

/* Challenges List */
.challenges-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.challenge-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  background-color: #0d1117;
  border: 1px solid #21262d;
  border-radius: 8px;
  padding: 12px;
}

.challenge-num {
  font-size: 0.78rem;
  font-weight: 800;
  color: #58a6ff;
  background-color: #161b22;
  border: 1px solid #30363d;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
}

.challenge-content {
  flex: 1;
}

.challenge-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: #f0f6fc;
  display: block;
  margin-bottom: 4px;
}

.challenge-desc {
  font-size: 0.8rem;
  color: #8b949e;
  line-height: 1.5;
  margin: 0;
}

.sub-block {
  border-top: 1px solid #21262d;
  padding-top: 14px;
}

.sub-title {
  font-size: 0.76rem !important;
  font-weight: 700 !important;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: #8b949e;
  margin: 0 0 10px 0 !important;
  border-bottom: none !important;
}

.stack-pills-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.stack-pill {
  font-size: 0.76rem;
  font-weight: 600;
  color: #58a6ff;
  background-color: #0d1117;
  border: 1px solid #30363d;
  padding: 3px 8px;
  border-radius: 6px;
}

.regs-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.reg-card {
  background-color: #0d1117;
  border: 1px solid #21262d;
  border-radius: 6px;
  padding: 8px 12px;
}

.reg-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.reg-name {
  font-size: 0.8rem;
  font-weight: 700;
  color: #f0f6fc;
}

.reg-badge {
  font-size: 0.68rem;
  font-weight: 700;
  color: #d29922;
  background-color: #d2992215;
  padding: 1px 6px;
  border-radius: 4px;
}

.reg-note {
  font-size: 0.76rem;
  color: #8b949e;
  line-height: 1.4;
  display: block;
}

/* Case Study Banner */
.case-study-banner {
  background: linear-gradient(135deg, #161b22 0%, #1f2833 100%);
  border: 1px solid #30363d;
  border-left: 4px solid #3fb950;
  border-radius: 10px;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.case-study-left {
  max-width: 650px;
}

.case-study-tag {
  font-size: 0.7rem;
  font-weight: 800;
  color: #3fb950;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  display: block;
  margin-bottom: 6px;
}

.case-study-title {
  color: #f0f6fc !important;
  font-size: 1.15rem !important;
  font-weight: 750 !important;
  margin: 0 0 6px 0 !important;
  border-bottom: none !important;
}

.case-study-text {
  color: #8b949e;
  font-size: 0.86rem;
  line-height: 1.55;
  margin: 0;
}

.case-study-right {
  display: flex;
  align-items: center;
}

.metrics-badge {
  background-color: #0d1117;
  border: 1px solid #30363d;
  border-radius: 10px;
  padding: 12px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 170px;
}

.metric-label {
  font-size: 0.68rem;
  font-weight: 700;
  color: #8b949e;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.metric-value {
  font-size: 0.85rem;
  font-weight: 800;
  color: #3fb950;
  line-height: 1.3;
}

/* BENTO GRID ALL DISCIPLINES MODE */
.bento-all-disciplines-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  padding: 28px;
  background-color: #0d1117;
}

.bento-discipline-card {
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 12px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.bento-discipline-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.4);
}

.bento-discipline-card.disc-swe:hover { border-color: #3fb950; }
.bento-discipline-card.disc-sys:hover { border-color: #388bfd; }
.bento-discipline-card.disc-ai:hover { border-color: #bc8cff; }
.bento-discipline-card.disc-data:hover { border-color: #58a6ff; }
.bento-discipline-card.disc-ops:hover { border-color: #d29922; }
.bento-discipline-card.disc-sec:hover { border-color: #f0883e; }

.bento-top-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.bento-letter-pill {
  font-size: 0.7rem;
  font-weight: 800;
  color: #8b949e;
  background-color: #0d1117;
  padding: 2px 8px;
  border-radius: 4px;
}

.bento-tag {
  font-size: 0.72rem;
  font-weight: 800;
}

.bento-title {
  color: #f0f6fc !important;
  font-size: 1.15rem !important;
  font-weight: 750 !important;
  margin: 0 0 6px 0 !important;
  border-bottom: none !important;
  display: flex;
  align-items: center;
  gap: 8px;
}

.bento-summary {
  color: #8b949e;
  font-size: 0.84rem;
  line-height: 1.5;
  margin: 0;
}

.bento-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.bento-sec-label {
  font-size: 0.72rem;
  font-weight: 700;
  color: #8b949e;
  text-transform: uppercase;
}

.bento-companies-chips {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.bento-company-chip {
  font-size: 0.78rem;
  color: #c9d1d9;
  background-color: #0d1117;
  border: 1px solid #21262d;
  padding: 4px 8px;
  border-radius: 6px;
}

.bento-company-chip strong {
  color: #f0f6fc;
}

.bento-tech-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.bento-tech-pill {
  font-size: 0.72rem;
  color: #58a6ff;
  background-color: #0d1117;
  border: 1px solid #30363d;
  padding: 2px 6px;
  border-radius: 4px;
}

.bento-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #21262d;
  padding-top: 12px;
  margin-top: auto;
}

.bento-reg-pill {
  font-size: 0.72rem;
  color: #d29922;
  font-weight: 600;
}

.bento-switch-tab-btn {
  background: transparent;
  border: none;
  color: #3fb950;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.bento-switch-tab-btn:hover {
  color: #58a6ff;
  transform: translateX(3px);
}

/* RESPONSIVE DESIGN */
@media (max-width: 960px) {
  .discipline-details-grid {
    grid-template-columns: 1fr;
  }
  .discipline-nav-tabs {
    grid-template-columns: repeat(3, 1fr);
  }
  .case-study-banner {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 640px) {
  .breakdown-header {
    padding: 20px 16px;
  }
  .active-discipline-canvas {
    padding: 16px;
  }
  .discipline-nav-tabs {
    grid-template-columns: repeat(2, 1fr);
  }
  .disc-nav-btn {
    padding: 10px 4px;
  }
  .bento-all-disciplines-grid {
    padding: 16px;
    grid-template-columns: 1fr;
  }
}
</style>
