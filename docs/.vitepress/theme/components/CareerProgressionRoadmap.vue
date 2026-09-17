<template>
  <div id="career-progression-roadmap-root" class="career-roadmap-container">
    <!-- Header Badge & Intro -->
    <div id="career-roadmap-header" class="roadmap-header">
      <div class="header-pill">
        <span class="pill-flag">🇲🇾</span>
        <span class="pill-text">Malaysia Tech Industry Progression 2026</span>
      </div>
      <h2 id="career-roadmap-heading" class="roadmap-title">
        Tech Career Progression Roadmap
      </h2>
      <p class="roadmap-desc">
        Visual leveling criteria, responsibilities, technical stacks, and verified Malaysian Ringgit (MYR) salary benchmarks across Junior to Staff engineering tiers.
      </p>
    </div>

    <!-- Role Track Selector Tabs -->
    <div id="career-role-selector" class="role-selector-bar" role="tablist" aria-label="Career Roles">
      <button
        v-for="role in roles"
        :key="role.id"
        :id="`role-tab-${role.id}`"
        role="tab"
        :aria-selected="activeRoleId === role.id"
        class="role-tab-btn"
        :class="{ active: activeRoleId === role.id }"
        @click="selectRole(role.id)"
      >
        <span class="role-tab-icon">{{ role.icon }}</span>
        <div class="role-tab-info">
          <span class="role-tab-name">{{ role.name }}</span>
          <span class="role-tab-salary">Avg RM {{ role.avgSeniorSalary }} (Senior)</span>
        </div>
      </button>
    </div>

    <!-- View Mode Toggle: Interactive Stepper vs Full Matrix -->
    <div id="career-view-controls" class="view-controls-bar">
      <div class="view-toggle-group" role="group" aria-label="Roadmap View Options">
        <button
          id="btn-view-stepper"
          class="view-toggle-btn"
          :class="{ active: viewMode === 'stepper' }"
          @click="viewMode = 'stepper'"
        >
          <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" class="view-btn-svg">
            <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
          </svg>
          Interactive Stage Stepper
        </button>
        <button
          id="btn-view-matrix"
          class="view-toggle-btn"
          :class="{ active: viewMode === 'matrix' }"
          @click="viewMode = 'matrix'"
        >
          <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" class="view-btn-svg">
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
          </svg>
          Side-by-Side Comparison Matrix
        </button>
      </div>

      <div class="role-stat-chip">
        <span class="chip-dot"></span>
        <span class="chip-text">{{ currentRole.marketTrend }}</span>
      </div>
    </div>

    <!-- ============================================== -->
    <!-- VIEW 1: INTERACTIVE STEPPER & STAGE DETAIL     -->
    <!-- ============================================== -->
    <div v-if="viewMode === 'stepper'" id="career-stepper-view" class="stepper-view-container">
      <!-- Progression Progress Nodes / Stepper Bar -->
      <div id="progression-nodes-track" class="progression-track-wrap">
        <div class="track-line-bg"></div>
        <div
          class="track-line-fill"
          :style="{ width: `${(activeStageIndex / (currentRole.stages.length - 1)) * 100}%` }"
        ></div>

        <div class="stages-nodes-row">
          <button
            v-for="(stage, idx) in currentRole.stages"
            :key="stage.id"
            :id="`stage-node-${stage.id}`"
            class="stage-node-btn"
            :class="{
              active: activeStageIndex === idx,
              completed: activeStageIndex > idx,
              future: activeStageIndex < idx
            }"
            @click="activeStageIndex = idx"
            :aria-label="`Stage ${idx + 1}: ${stage.title}`"
          >
            <div class="node-circle">
              <span v-if="activeStageIndex > idx" class="node-check">✓</span>
              <span v-else class="node-number">{{ idx + 1 }}</span>
            </div>
            <div class="node-label-group">
              <span class="node-title">{{ stage.shortTitle }}</span>
              <span class="node-years">{{ stage.experience }}</span>
              <span class="node-salary-tag">RM {{ stage.salaryMin }}k–{{ stage.salaryMax }}k</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Active Stage Detailed Card -->
      <div
        :id="`stage-card-${currentStage.id}`"
        class="stage-detail-card"
      >
        <!-- Stage Card Header -->
        <div class="stage-card-topbar">
          <div class="stage-card-title-block">
            <div class="stage-tier-badge" :class="`tier-${currentStage.tier}`">
              <span>{{ currentStage.tierLabel }}</span>
              <span class="tier-separator">•</span>
              <span>{{ currentStage.experience }}</span>
            </div>
            <h3 class="stage-role-title">{{ currentStage.title }}</h3>
            <p class="stage-role-summary">{{ currentStage.summary }}</p>
          </div>

          <!-- Salary Benchmark Box -->
          <div id="stage-salary-box" class="stage-salary-box">
            <div class="salary-box-label">
              <span class="myr-icon">🇲🇾</span>
              <span>Malaysian Salary Benchmark</span>
            </div>
            <div class="salary-box-range">
              RM {{ formatNumber(currentStage.salaryMonthlyMin) }} – {{ formatNumber(currentStage.salaryMonthlyMax) }}
              <span class="salary-period">/ month</span>
            </div>
            <div class="salary-box-annual">
              Est. RM {{ formatNumber(currentStage.salaryMonthlyMin * 12) }} – {{ formatNumber(currentStage.salaryMonthlyMax * 12) }} / year
            </div>
            <div class="salary-box-benefits">
              <span class="benefit-tag">EPF +{{ currentStage.epfPercentage }}%</span>
              <span class="benefit-tag">{{ currentStage.typicalEquity }}</span>
            </div>
          </div>
        </div>

        <!-- Stage Card Content Grid -->
        <div class="stage-content-grid">
          <!-- Column 1: Key Responsibilities in Malaysia -->
          <div id="col-responsibilities" class="stage-info-col">
            <div class="col-header">
              <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor" class="col-icon icon-tasks">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
              </svg>
              <h4>Typical Daily Scope & Deliverables</h4>
            </div>
            <ul class="responsibilities-list">
              <li v-for="(item, i) in currentStage.responsibilities" :key="i" class="resp-item">
                <span class="resp-bullet"></span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <!-- Column 2: Core Tech Stack & Tools -->
          <div id="col-tech-stack" class="stage-info-col">
            <div class="col-header">
              <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor" class="col-icon icon-stack">
                <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L2.414 11l3.293 3.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L17.586 11l-3.293-3.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
              <h4>Key Tech Stack & Competencies</h4>
            </div>
            <div class="skills-wrap">
              <span
                v-for="(skill, sIdx) in currentStage.skills"
                :key="sIdx"
                class="skill-chip"
              >
                {{ skill }}
              </span>
            </div>

            <!-- Focus Ratio Progress Bars -->
            <div class="work-balance-box">
              <span class="balance-title">Effort Allocation Breakdown</span>
              <div class="balance-bar-row">
                <div class="balance-bar-item">
                  <div class="bar-labels">
                    <span>Direct Coding & Tasks</span>
                    <span>{{ currentStage.timeAllocation.coding }}%</span>
                  </div>
                  <div class="bar-track">
                    <div class="bar-fill fill-blue" :style="{ width: `${currentStage.timeAllocation.coding}%` }"></div>
                  </div>
                </div>
                <div class="balance-bar-item">
                  <div class="bar-labels">
                    <span>Architecture & System Design</span>
                    <span>{{ currentStage.timeAllocation.architecture }}%</span>
                  </div>
                  <div class="bar-track">
                    <div class="bar-fill fill-purple" :style="{ width: `${currentStage.timeAllocation.architecture}%` }"></div>
                  </div>
                </div>
                <div class="balance-bar-item">
                  <div class="bar-labels">
                    <span>Mentorship, Review & Alignment</span>
                    <span>{{ currentStage.timeAllocation.leadership }}%</span>
                  </div>
                  <div class="bar-track">
                    <div class="bar-fill fill-green" :style="{ width: `${currentStage.timeAllocation.leadership}%` }"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Level-Up Milestone / Promotion Gate Box -->
        <div id="stage-promotion-gate" class="promotion-gate-card">
          <div class="gate-left">
            <div class="gate-text-wrap">
              <h4 class="gate-title">The Malaysian Level-Up Test: How to Advance</h4>
              <p class="gate-desc">{{ currentStage.promotionGate }}</p>
            </div>
          </div>
          <div class="gate-employers">
            <span class="gate-employers-label">Typical Malaysian Employers at this Tier:</span>
            <span class="gate-employers-names">{{ currentStage.employers }}</span>
          </div>
        </div>

        <!-- Stepper Navigation Buttons -->
        <div class="stage-nav-buttons">
          <button
            id="btn-prev-stage"
            class="step-nav-btn prev"
            :disabled="activeStageIndex === 0"
            @click="activeStageIndex--"
          >
            ← Previous: {{ activeStageIndex > 0 ? currentRole.stages[activeStageIndex - 1].shortTitle : 'None' }}
          </button>
          <div class="step-indicator-text">
            Stage {{ activeStageIndex + 1 }} of {{ currentRole.stages.length }}
          </div>
          <button
            id="btn-next-stage"
            class="step-nav-btn next"
            :disabled="activeStageIndex === currentRole.stages.length - 1"
            @click="activeStageIndex++"
          >
            Next: {{ activeStageIndex < currentRole.stages.length - 1 ? currentRole.stages[activeStageIndex + 1].shortTitle : 'Max Tier' }} →
          </button>
        </div>
      </div>
    </div>

    <!-- ============================================== -->
    <!-- VIEW 2: SIDE-BY-SIDE MATRIX VIEW               -->
    <!-- ============================================== -->
    <div v-else id="career-matrix-view" class="matrix-view-container">
      <div class="matrix-table-wrap">
        <table id="table-progression-matrix" class="matrix-table">
          <thead>
            <tr>
              <th class="col-metric">Progression Dimension</th>
              <th
                v-for="stg in currentRole.stages"
                :key="stg.id"
                class="col-stage"
                :class="`tier-head-${stg.tier}`"
              >
                <div class="th-title">{{ stg.shortTitle }}</div>
                <div class="th-sub">{{ stg.experience }}</div>
                <div class="th-salary">RM {{ stg.salaryMin }}k–{{ stg.salaryMax }}k/mo</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="metric-name">Scope of Impact</td>
              <td v-for="stg in currentRole.stages" :key="`scope-${stg.id}`" class="metric-val">
                {{ stg.matrix.scope }}
              </td>
            </tr>
            <tr>
              <td class="metric-name">Autonomy & Supervision</td>
              <td v-for="stg in currentRole.stages" :key="`auto-${stg.id}`" class="metric-val">
                {{ stg.matrix.autonomy }}
              </td>
            </tr>
            <tr>
              <td class="metric-name">Malaysian Regulatory & Scale</td>
              <td v-for="stg in currentRole.stages" :key="`reg-${stg.id}`" class="metric-val">
                {{ stg.matrix.regulatory }}
              </td>
            </tr>
            <tr>
              <td class="metric-name">Promotion Milestone</td>
              <td v-for="stg in currentRole.stages" :key="`gate-${stg.id}`" class="metric-val highlight-cell">
                {{ stg.promotionGate }}
              </td>
            </tr>
            <tr>
              <td class="metric-name">Typical Employers</td>
              <td v-for="stg in currentRole.stages" :key="`emp-${stg.id}`" class="metric-val text-muted">
                {{ stg.employers }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Self-Assessment Quick Tool -->
    <div id="career-assessment-card" class="assessment-card">
      <div class="assessment-header">
        <div class="assessment-title-wrap">
          <h4 class="assessment-title">Self-Evaluation: Where Do You Stand in the Malaysian Market?</h4>
          <p class="assessment-sub">
            Answer 3 quick checkpoints to evaluate your current tier and identify high-leverage learning steps.
          </p>
        </div>
      </div>

      <div class="assessment-questions-grid">
        <div class="quiz-item">
          <label class="quiz-label" for="select-autonomy">1. How do you handle production incidents?</label>
          <select id="select-autonomy" v-model="assessment.autonomy" class="quiz-select">
            <option value="junior">I escalate to senior engineers and learn from their post-mortems</option>
            <option value="mid">I troubleshoot within my service boundaries and ship hotfixes</option>
            <option value="senior">I lead incident triage, run root cause analyses, and patch system holes</option>
            <option value="staff">I design fault-tolerant failovers and cross-system DR runbooks beforehand</option>
          </select>
        </div>

        <div class="quiz-item">
          <label class="quiz-label" for="select-scope">2. What is your primary design focus?</label>
          <select id="select-scope" v-model="assessment.scope" class="quiz-select">
            <option value="junior">Writing clean, bug-free functions matching Jira specs</option>
            <option value="mid">Designing reliable DB schemas and REST/gRPC API contracts</option>
            <option value="senior">Evaluating distributed latency, caching, and Malaysian compliance</option>
            <option value="staff">Multi-year architecture strategy, cloud budget, and tech talent bar</option>
          </select>
        </div>

        <div class="quiz-item">
          <label class="quiz-label" for="select-culture">3. How do you interact with other engineers?</label>
          <select id="select-culture" v-model="assessment.culture" class="quiz-select">
            <option value="junior">Active learner, receiving PR feedback, pair-programming</option>
            <option value="mid">Conducting standard PR reviews, delivering features reliably</option>
            <option value="senior">Mentoring juniors, defining team code review guidelines</option>
            <option value="staff">Setting engineering principles across multiple squads & orgs</option>
          </select>
        </div>
      </div>

      <div id="assessment-result-box" class="assessment-result-box">
        <div class="result-badge">
          <span>Target Tier Assessment:</span>
          <strong class="result-tier">{{ computedAssessmentTier.name }}</strong>
        </div>
        <p class="result-advice">{{ computedAssessmentTier.advice }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface Stage {
  id: string;
  tier: "junior" | "mid" | "senior" | "staff";
  tierLabel: string;
  shortTitle: string;
  title: string;
  experience: string;
  salaryMin: number;
  salaryMax: number;
  salaryMonthlyMin: number;
  salaryMonthlyMax: number;
  epfPercentage: number;
  typicalEquity: string;
  summary: string;
  responsibilities: string[];
  skills: string[];
  timeAllocation: {
    coding: number;
    architecture: number;
    leadership: number;
  };
  promotionGate: string;
  employers: string;
  matrix: {
    scope: string;
    autonomy: string;
    regulatory: string;
  };
}

interface RoleTrack {
  id: string;
  name: string;
  icon: string;
  avgSeniorSalary: string;
  marketTrend: string;
  stages: Stage[];
}

const roles: RoleTrack[] = [
  {
    id: "ai-ml",
    name: "AI & ML Engineer",
    icon: "🤖",
    avgSeniorSalary: "18,000",
    marketTrend: "High Demand — Sovereign BM LLMs, Edge AI, & GPU Clusters",
    stages: [
      {
        id: "ai-junior",
        tier: "junior",
        tierLabel: "Tier 1: Associate / Junior",
        shortTitle: "Junior AI",
        title: "Junior AI & Machine Learning Engineer",
        experience: "0 – 2 Years Experience",
        salaryMin: 4,
        salaryMax: 6.5,
        salaryMonthlyMin: 4000,
        salaryMonthlyMax: 6500,
        epfPercentage: 12,
        typicalEquity: "Standard Bonus / Contract",
        summary: "Focuses on data ingestion, dataset cleansing, prompt tuning, basic API integration with Gemini / OpenAI, and fine-tuning off-the-shelf open-source models.",
        responsibilities: [
          "Scraping, sanitizing, and tokenizing local Malaysian text and tabular datasets (Malay/Manglish handling).",
          "Building prompt engineering pipelines and prototype agents with Gemini 1.5/2.0 and Claude SDKs.",
          "Implementing basic RAG (Retrieval-Augmented Generation) with LangChain, LlamaIndex, and ChromaDB/PGvector.",
          "Writing unit tests and tracking training experiments with Weights & Biases or MLflow.",
          "Assisting in containerizing model inference endpoints using FastAPI and Docker."
        ],
        skills: [
          "Python 3.11+",
          "PyTorch basics",
          "FastAPI",
          "Gemini API",
          "Hugging Face Transformers",
          "LangChain / LlamaIndex",
          "Vector Databases (Chroma/Qdrant)",
          "Pandas & NumPy",
          "Docker"
        ],
        timeAllocation: {
          coding: 75,
          architecture: 15,
          leadership: 10
        },
        promotionGate: "Consistently ship production-ready inference endpoints without supervision; independently debug GPU out-of-memory (OOM) errors and optimize prompt latencies under 500ms.",
        employers: "GovTech (OpenDOSM/MAMPU), Malaysian startups, AI consultancies, Mesolitica, Aerodyne Group.",
        matrix: {
          scope: "Individual tasks, prompt scripts, data preprocessing notebooks.",
          autonomy: "Guided by Senior/Lead; requires code reviews on all model deployments.",
          regulatory: "Awareness of basic PDPA requirements for anonymizing training sets."
        }
      },
      {
        id: "ai-mid",
        tier: "mid",
        tierLabel: "Tier 2: Intermediate / Mid-Level",
        shortTitle: "Mid-Level AI",
        title: "Machine Learning & AI Engineer",
        experience: "2 – 5 Years Experience",
        salaryMin: 7,
        salaryMax: 13,
        salaryMonthlyMin: 7000,
        salaryMonthlyMax: 13000,
        epfPercentage: 13,
        typicalEquity: "1–2 Month Performance Bonus",
        summary: "Designs end-to-end ML training and serving pipelines, quantization (GGUF/AWQ), semantic hybrid search, and production deployment on AWS/GCP Malaysian regions.",
        responsibilities: [
          "Developing scalable high-throughput inference services with vLLM, TensorRT-LLM, and Triton Inference Server.",
          "Fine-tuning domain-specific models with LoRA/QLoRA on Bahasa Melayu and local enterprise datasets.",
          "Designing enterprise RAG systems with hybrid BM25 + dense embedding rerankers (Cohere/BGE).",
          "Setting up CI/CD model deployment pipelines, automated drift detection, and evaluation benchmarks.",
          "Managing compute budgets and GPU cost optimization across cloud instances."
        ],
        skills: [
          "vLLM & Ollama",
          "LoRA / QLoRA Tuning",
          "Triton / TorchServe",
          "Milvus / Qdrant",
          "MLOps (Kubeflow / MLflow)",
          "Kubernetes & GPU Operator",
          "AWS ap-southeast-5 / GCP Malaysia",
          "Model Quantization (AWQ/GGUF)",
          "Evaluation (Ragas / TruLens)"
        ],
        timeAllocation: {
          coding: 55,
          architecture: 30,
          leadership: 15
        },
        promotionGate: "Architect and deliver an enterprise AI feature in production serving >50 requests/sec with 99.5% uptime while driving measurable business or accuracy metrics.",
        employers: "Carsome, PayNet, GXBank, Mindvalley, Aerodyne, Axiata Digital Labs, StoreHub.",
        matrix: {
          scope: "Full ML features, RAG architectures, model monitoring pipelines.",
          autonomy: "High autonomy on technical implementation; plans training runs independently.",
          regulatory: "Enforces Malaysian PDPA data residency and AI ethics safeguards."
        }
      },
      {
        id: "ai-senior",
        tier: "senior",
        tierLabel: "Tier 3: Senior AI Specialist",
        shortTitle: "Senior AI",
        title: "Senior AI / Machine Learning Engineer",
        experience: "5 – 8 Years Experience",
        salaryMin: 14,
        salaryMax: 22,
        salaryMonthlyMin: 14000,
        salaryMonthlyMax: 22000,
        epfPercentage: 14,
        typicalEquity: "Stock Options / ESOP + 2-3 mo Bonus",
        summary: "Spearheads sovereign AI architectures, distributed multi-node GPU training, agentic multi-tool systems, and tight integration with core transactional platforms.",
        responsibilities: [
          "Leading distributed pre-training and fine-tuning across GPU clusters (NVIDIA H100/A100) using Ray or SLURM.",
          "Architecting autonomous agentic frameworks using MCP (Model Context Protocol) and multi-step tool execution.",
          "Defining the company-wide MLOps standard, model governance, safety guardrails, and hallucination containment.",
          "Collaborating with security leads to ensure compliance with BNM RMiT and the Cyber Security Act 2024.",
          "Mentoring junior/mid ML engineers and evaluating cutting-edge research for commercial viability."
        ],
        skills: [
          "Distributed Training (Ray / DeepSpeed)",
          "Agentic Systems (MCP, ReAct)",
          "SLURM & NVIDIA NeMo",
          "Kubernetes Multi-Cluster",
          "Custom Kernels (Triton / CUDA basics)",
          "AI Red Teaming & Guardrails",
          "BNM RMiT AI Compliance",
          "FinOps & Cloud GPU Pricing",
          "System Architecture"
        ],
        timeAllocation: {
          coding: 35,
          architecture: 45,
          leadership: 20
        },
        promotionGate: "Demonstrate cross-department impact: unify fragmented AI projects into a cohesive platform, reduce GPU infrastructure costs by 30%+, or develop a proprietary AI capability.",
        employers: "YTL Power & NVIDIA AI Cloud, PayNet, Boost Bank, Mesolitica, Standard Chartered GBS, Micron, Intel.",
        matrix: {
          scope: "Organization-wide AI systems, foundational model platforms, compute budget.",
          autonomy: "Sets roadmap priorities with VP of Eng / Head of AI; self-directed.",
          regulatory: "Direct accountability for BNM RMiT, Cyber Security Act 2024, and audit readiness."
        }
      },
      {
        id: "ai-staff",
        tier: "staff",
        tierLabel: "Tier 4: Staff / Principal / AI Director",
        shortTitle: "Staff / Principal AI",
        title: "Principal AI Architect / Head of AI",
        experience: "8+ Years Experience",
        salaryMin: 23,
        salaryMax: 38,
        salaryMonthlyMin: 23000,
        salaryMonthlyMax: 38000,
        epfPercentage: 16,
        typicalEquity: "Substantial Equity / Executive Incentive",
        summary: "Shapes the national or multinational enterprise AI vision, sovereign data center strategy, regulatory liaison with MDEC/BNM, and executive technology roadmap.",
        responsibilities: [
          "Setting 3-year AI technology strategies aligned with the Malaysia National AI Blueprint and Digital Economy goals.",
          "Architecting hybrid sovereign clouds (on-prem GPU clusters + hyperscaler public clouds).",
          "Representing the organization in technical audit committees, regulatory consultations, and keynote forums.",
          "Hiring, structuring, and cultivating high-caliber ML research and engineering divisions.",
          "Driving strategic partnerships with cloud vendors (Google Cloud, AWS, Microsoft, NVIDIA)."
        ],
        skills: [
          "Enterprise Architecture Strategy",
          "National AI Policy & Governance",
          "Data Center & Sovereign Cloud",
          "Executive Leadership & Board Comms",
          "Patents & Research Leadership",
          "Multi-Million RM Budgeting",
          "Cross-Organization Alignment"
        ],
        timeAllocation: {
          coding: 15,
          architecture: 45,
          leadership: 40
        },
        promotionGate: "Proven track record of steering multi-million Ringgit technology initiatives, creating proprietary IP, and establishing the company as a regional tech benchmark in Southeast Asia.",
        employers: "Digital Banks (GXBank, Boost Bank, AEON Bank), YTL AI Cloud, MNC Regional HQ, Khazanah Tech Portfolio.",
        matrix: {
          scope: "Entire engineering division, board-level strategy, multi-year technological Moat.",
          autonomy: "Executive autonomy; reports to CTO or Chief Executive Officer.",
          regulatory: "Engages directly with Bank Negara, NACSA, and Ministry of Digital committees."
        }
      }
    ]
  },
  {
    id: "software-engineering",
    name: "Software Engineer (Full-Stack / Backend)",
    icon: "💻",
    avgSeniorSalary: "16,500",
    marketTrend: "High Demand — Modernization to Go / TypeScript / Distributed Systems",
    stages: [
      {
        id: "se-junior",
        tier: "junior",
        tierLabel: "Tier 1: Junior Engineer",
        shortTitle: "Junior SE",
        title: "Junior Software Engineer",
        experience: "0 – 2 Years Experience",
        salaryMin: 3.5,
        salaryMax: 5.5,
        salaryMonthlyMin: 3500,
        salaryMonthlyMax: 5500,
        epfPercentage: 12,
        typicalEquity: "Standard Benefits",
        summary: "Builds UI components and API endpoints under senior supervision. Focuses on clean coding, defensive programming, and test coverage.",
        responsibilities: [
          "Developing clean, responsive UI components using React, Vue, or Next.js.",
          "Implementing RESTful CRUD APIs with Node.js, Go, or Python FastAPI.",
          "Writing unit and integration tests with Jest, Vitest, or Go test.",
          "Reviewing bug reports, resolving minor production defects, and debugging logs.",
          "Participating in daily standups and sprint planning."
        ],
        skills: ["TypeScript", "React/Next.js", "Node.js / Go", "PostgreSQL", "Git & GitHub", "REST APIs", "Unit Testing"],
        timeAllocation: { coding: 80, architecture: 10, leadership: 10 },
        promotionGate: "Consistently ship features without regressions; proactively suggest code quality improvements during PRs.",
        employers: "Deriv, Carsome, InNature, MoneyLion, local digital agencies, StoreHub.",
        matrix: {
          scope: "Individual Jira tickets, isolated module features.",
          autonomy: "Guided by Senior; PRs thoroughly reviewed.",
          regulatory: "Adheres to basic coding and OWASP Top 10 standards."
        }
      },
      {
        id: "se-mid",
        tier: "mid",
        tierLabel: "Tier 2: Mid-Level Engineer",
        shortTitle: "Mid-Level SE",
        title: "Software Engineer",
        experience: "2 – 5 Years Experience",
        salaryMin: 6,
        salaryMax: 11,
        salaryMonthlyMin: 6000,
        salaryMonthlyMax: 11000,
        epfPercentage: 13,
        typicalEquity: "Performance Bonus (1–2 months)",
        summary: "Owns end-to-end features, writes database migrations, defines API contracts, and optimizes service performance.",
        responsibilities: [
          "Designing robust relational and NoSQL database schemas with indexes and foreign keys.",
          "Implementing gRPC, WebSocket, and asynchronous message queue handlers (RabbitMQ/Kafka).",
          "Building CI/CD pipelines via GitHub Actions, GitLab, or ArgoCD.",
          "Profiling query latency, debugging memory leaks, and eliminating N+1 bottlenecks.",
          "Conducting rigorous code reviews for junior teammates."
        ],
        skills: ["TypeScript / Go / Java", "PostgreSQL & Redis", "Kafka / RabbitMQ", "Docker & K8s basics", "GraphQL / gRPC", "System Design Basics"],
        timeAllocation: { coding: 60, architecture: 25, leadership: 15 },
        promotionGate: "Lead a complete multi-week feature from design doc to zero-downtime deployment; mentor at least one junior engineer.",
        employers: "PayNet, Grab Malaysia, Touch 'n Go Digital, AirAsia MOVE, PolicyStreet.",
        matrix: {
          scope: "Full subsystem features, service APIs, data migrations.",
          autonomy: "Works independently on sprint commitments; flags blockers early.",
          regulatory: "Complies with PDPA storage policies and secure authentication flows."
        }
      },
      {
        id: "se-senior",
        tier: "senior",
        tierLabel: "Tier 3: Senior Engineer",
        shortTitle: "Senior SE",
        title: "Senior Software Engineer / Tech Lead",
        experience: "5 – 8 Years Experience",
        salaryMin: 12,
        salaryMax: 19,
        salaryMonthlyMin: 12000,
        salaryMonthlyMax: 19000,
        epfPercentage: 14,
        typicalEquity: "ESOP Options + Annual Bonus",
        summary: "Drives domain architecture, zero-downtime migrations, cross-service contracts, and reliability standards for high-traffic platforms.",
        responsibilities: [
          "Authoring comprehensive Architecture Decision Records (ADRs) and RFCs.",
          "Architecting event-driven microservices handling thousands of transactions per minute.",
          "Establishing resilient design patterns (circuit breakers, saga orchestration, idempotent webhooks).",
          "Driving team code quality, test automation frameworks, and CI/CD best practices.",
          "Partnering with Product Managers to break down ambiguous business requirements into phased roadmaps."
        ],
        skills: ["Go / Java / Node.js", "Distributed Systems", "Kafka & Event-Driven Arch", "Kubernetes & Istio", "Database Sharding & Caching", "Security & RMiT"],
        timeAllocation: { coding: 40, architecture: 40, leadership: 20 },
        promotionGate: "Successfully design and execute a mission-critical migration or architectural evolution without customer-facing outages.",
        employers: "GXBank, Boost Bank, PayNet, Standard Chartered GBS, Carsome, StoreHub.",
        matrix: {
          scope: "Cross-squad platform components, core business services.",
          autonomy: "High autonomy; trusted technical partner to engineering management.",
          regulatory: "Enforces BNM RMiT standards and automated vulnerability scanning."
        }
      },
      {
        id: "se-staff",
        tier: "staff",
        tierLabel: "Tier 4: Staff / Principal Engineer",
        shortTitle: "Staff SE",
        title: "Staff / Principal Software Engineer",
        experience: "8+ Years Experience",
        salaryMin: 20,
        salaryMax: 32,
        salaryMonthlyMin: 20000,
        salaryMonthlyMax: 32000,
        epfPercentage: 15,
        typicalEquity: "Substantial Equity / Profit Share",
        summary: "Multiplies organization-wide technical velocity, resolves hardest systemic architectural challenges, and mentors leads.",
        responsibilities: [
          "Setting organization-wide technical standards, language paradigms, and platform architecture.",
          "Solving the deepest technical bottlenecks (database locking, distributed consistency, disaster recovery).",
          "Vetting major third-party software licenses, cloud contracts, and tech partnerships.",
          "Championing developer productivity, internal developer platform (IDP) tooling, and engineering health.",
          "Advising C-level executives on technological trade-offs and multi-year investments."
        ],
        skills: ["Enterprise Systems Architecture", "Distributed Consensus (Raft/Paxos)", "Disaster Recovery & Multi-Region", "Engineering Culture & Hiring", "Tech Strategy"],
        timeAllocation: { coding: 20, architecture: 50, leadership: 30 },
        promotionGate: "Demonstrate transformative leverage: single architectural decisions that save millions in infrastructure or prevent critical vulnerabilities across the organization.",
        employers: "Digital Banks, Fintech Unicorns, Global MNC Technology Hubs.",
        matrix: {
          scope: "Entire engineering organization and multi-service platforms.",
          autonomy: "Self-driven strategic focus; defines own initiatives based on highest business leverage.",
          regulatory: "Direct accountability for architecture compliance in Bank Negara audits."
        }
      }
    ]
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity & AppSec Specialist",
    icon: "🛡️",
    avgSeniorSalary: "17,500",
    marketTrend: "Surging Demand — Cyber Security Act 2024 & BNM RMiT Compliance",
    stages: [
      {
        id: "sec-junior",
        tier: "junior",
        tierLabel: "Tier 1: Associate Analyst",
        shortTitle: "Junior SOC/Sec",
        title: "Junior Security Analyst / Associate AppSec",
        experience: "0 – 2 Years Experience",
        salaryMin: 3.8,
        salaryMax: 6,
        salaryMonthlyMin: 3800,
        salaryMonthlyMax: 6000,
        epfPercentage: 12,
        typicalEquity: "Standard Benefits",
        summary: "Triages SIEM security alerts, assists with vulnerability scans, runs static code analysis (SAST), and documents incident tickets.",
        responsibilities: [
          "Monitoring SIEM alerts (Wazuh, Splunk, Microsoft Sentinel) and filtering false positives.",
          "Running SAST/DAST tools (SonarQube, Snyk, OWASP ZAP) against CI/CD pull requests.",
          "Cataloging third-party open source vulnerabilities (Software Bill of Materials / SBOM).",
          "Drafting initial security incident reports according to standard operating procedures.",
          "Conducting basic phishing simulation and internal security awareness campaigns."
        ],
        skills: ["Linux Fundamentals", "Networking (TCP/IP, DNS)", "OWASP Top 10", "Python/Bash Scripting", "SIEM Tools", "Vulnerability Scanners"],
        timeAllocation: { coding: 40, architecture: 20, leadership: 40 },
        promotionGate: "Identify genuine zero-day or high-severity vulnerabilities before production deployment; demonstrate proficiency in investigating complex log anomalies.",
        employers: "LGMS, PayNet, CyberSecurity Malaysia, Axiata, BAE Systems GDC Malaysia.",
        matrix: {
          scope: "Vulnerability ticket triage, standard scanner operations.",
          autonomy: "Guided by Incident Response and AppSec Leads.",
          regulatory: "Familiarity with the Cyber Security Act 2024 principles."
        }
      },
      {
        id: "sec-mid",
        tier: "mid",
        tierLabel: "Tier 2: Security Engineer",
        shortTitle: "Security Eng",
        title: "Cybersecurity & DevSecOps Engineer",
        experience: "2 – 5 Years Experience",
        salaryMin: 7,
        salaryMax: 12.5,
        salaryMonthlyMin: 7000,
        salaryMonthlyMax: 12500,
        epfPercentage: 13,
        typicalEquity: "1–2 mo Performance Bonus",
        summary: "Embeds automated security guardrails in CI/CD, performs threat modeling, implements Cloud Security Posture Management (CSPM), and manages penetration testing.",
        responsibilities: [
          "Integrating automated secret scanning, container image scanning (Trivy), and SAST into GitLab/GitHub pipelines.",
          "Performing threat modeling (STRIDE) during architecture reviews for new services.",
          "Configuring cloud security guardrails across AWS/GCP (IAM least privilege, VPC peering, KMS encryption).",
          "Leading penetration testing remediations and managing external ethical hacker bug bounties.",
          "Building automated incident response playbooks using SOAR and webhook integrations."
        ],
        skills: ["DevSecOps (Trivy, Snyk)", "Cloud Security (AWS/GCP)", "IAM & OAuth2 / mTLS", "Threat Modeling (STRIDE)", "Burp Suite / AppSec", "Terraform Security"],
        timeAllocation: { coding: 50, architecture: 35, leadership: 15 },
        promotionGate: "Successfully secure a major release that passes external CREST penetration testing with zero critical findings; automate 80%+ of recurring security checks in CI/CD.",
        employers: "GXBank, Boost Bank, PayNet, Standard Chartered GBS, Deriv, Mindvalley.",
        matrix: {
          scope: "Application security posture, cloud security policies, pipeline guardrails.",
          autonomy: "Owns security automation independently; blocks unsafe deployments.",
          regulatory: "Directly enforces BNM RMiT security baseline controls."
        }
      },
      {
        id: "sec-senior",
        tier: "senior",
        tierLabel: "Tier 3: Senior Specialist",
        shortTitle: "Senior Sec",
        title: "Senior Cybersecurity Specialist / RMiT Lead",
        experience: "5 – 8 Years Experience",
        salaryMin: 13.5,
        salaryMax: 21,
        salaryMonthlyMin: 13500,
        salaryMonthlyMax: 21000,
        epfPercentage: 14,
        typicalEquity: "Annual Bonus + Long-term Incentive",
        summary: "Leads red/blue team simulations, designs Zero Trust network architectures, and ensures strict compliance with Bank Negara Malaysia and NACSA NCSP frameworks.",
        responsibilities: [
          "Leading incident response for critical severity incidents; coordinating forensics and executive containment.",
          "Architecting Zero Trust networks, service-mesh mTLS, and hardware security module (HSM) key management.",
          "Conducting comprehensive gap analyses for BNM RMiT, PCI-DSS Level 1, and ISO 27001 certifications.",
          "Interfacing directly with BNM audit examiners and NACSA Cyber Security Act National Critical Information Infrastructure (NCII) auditors.",
          "Mentoring DevSecOps teams and fostering a proactive, blameless security culture across engineering."
        ],
        skills: ["Zero Trust Architecture", "BNM RMiT & Act 854 Compliance", "Digital Forensics & Incident Response", "HSM & Cryptography", "Red/Purple Teaming", "CISSP / CISM"],
        timeAllocation: { coding: 30, architecture: 45, leadership: 25 },
        promotionGate: "Steer an organization through a successful BNM RMiT audit or major cyber incident without regulatory sanction, data leakage, or service downtime.",
        employers: "Digital Banks, PayNet, Maybank, CIMB, Global FinTech Hubs, LGMS.",
        matrix: {
          scope: "Entire corporate & cloud defense architecture, audit defense.",
          autonomy: "Exercises unilateral authority to halt vulnerable production releases.",
          regulatory: "Direct point of contact for regulatory compliance and audit defense."
        }
      },
      {
        id: "sec-staff",
        tier: "staff",
        tierLabel: "Tier 4: CISO / Head of Security",
        shortTitle: "Head of Security / CISO",
        title: "Head of Information Security / CISO",
        experience: "8+ Years Experience",
        salaryMin: 22,
        salaryMax: 36,
        salaryMonthlyMin: 22000,
        salaryMonthlyMax: 36000,
        epfPercentage: 16,
        typicalEquity: "Executive Equity + Board Level Perks",
        summary: "Steers enterprise cyber risk, board reporting, national cyber coordination with NACSA, multi-million Ringgit defense budgets, and cyber insurance strategies.",
        responsibilities: [
          "Reporting directly to the Board of Directors and Board Risk Committee on threat posture and risk appetite.",
          "Overseeing NCII compliance under the Malaysian Cyber Security Act 2024.",
          "Negotiating enterprise cyber insurance policies and managing multi-vendor MSSP contracts.",
          "Directing cyber crisis management and business continuity management (BCM) simulations.",
          "Building and inspiring a high-performing security organization of analysts, engineers, and risk managers."
        ],
        skills: ["Board Risk Reporting", "Enterprise Cyber Governance", "Regulatory Diplomacy (BNM/NACSA)", "Crisis Management", "Executive Leadership", "Budgeting"],
        timeAllocation: { coding: 5, architecture: 40, leadership: 55 },
        promotionGate: "Executive track record of zero material breaches, exemplary regulatory audit standing, and cultivating an award-winning security organization.",
        employers: "Tier-1 Malaysian Financial Institutions, Digital Banks, Telecommunications.",
        matrix: {
          scope: "Enterprise-wide risk, brand reputation, legal regulatory liability.",
          autonomy: "Reports directly to CEO/Board; highest authority on cyber risk.",
          regulatory: "Legal signatory for regulatory submissions under Malaysian Acts."
        }
      }
    ]
  },
  {
    id: "devops-cloud",
    name: "DevOps, Cloud & Platform SRE",
    icon: "☁️",
    avgSeniorSalary: "17,000",
    marketTrend: "High Demand — AWS Malaysia Region (ap-southeast-5) & FinOps",
    stages: [
      {
        id: "devops-junior",
        tier: "junior",
        tierLabel: "Tier 1: Associate Cloud",
        shortTitle: "Junior DevOps",
        title: "Junior Cloud & DevOps Associate",
        experience: "0 – 2 Years Experience",
        salaryMin: 3.5,
        salaryMax: 6,
        salaryMonthlyMin: 3500,
        salaryMonthlyMax: 6000,
        epfPercentage: 12,
        typicalEquity: "Standard Benefits",
        summary: "Maintains CI/CD build agents, writes Dockerfiles, handles monitoring alerts, and assists in basic Infrastructure as Code (IaC) scripting.",
        responsibilities: [
          "Building and optimizing Docker container images for microservices.",
          "Writing Terraform or OpenTofu scripts for standard VPCs, S3 buckets, and EC2 instances.",
          "Configuring Prometheus and Grafana dashboards for CPU, memory, and HTTP 5xx tracking.",
          "Assisting in on-call rotation shifts under the guidance of senior SREs.",
          "Troubleshooting failed deployment pipelines and staging environment discrepancies."
        ],
        skills: ["Linux & Bash", "Docker", "Git & CI/CD", "Terraform Basics", "Prometheus & Grafana", "AWS / GCP Basics"],
        timeAllocation: { coding: 70, architecture: 15, leadership: 15 },
        promotionGate: "Independently provision an environment using IaC and resolve recurring staging deployment failures without senior intervention.",
        employers: "Local MSPs, Cloud consultancies, StoreHub, InNature, Carsome.",
        matrix: {
          scope: "Staging environments, container builds, alert triage.",
          autonomy: "Supervised by Senior DevOps/SRE.",
          regulatory: "Ensures no unencrypted storage buckets or open 0.0.0.0 security groups."
        }
      },
      {
        id: "devops-mid",
        tier: "mid",
        tierLabel: "Tier 2: DevOps Engineer",
        shortTitle: "DevOps Eng",
        title: "Cloud & DevOps Engineer",
        experience: "2 – 5 Years Experience",
        salaryMin: 6.5,
        salaryMax: 12,
        salaryMonthlyMin: 6500,
        salaryMonthlyMax: 12000,
        epfPercentage: 13,
        typicalEquity: "1–2 mo Performance Bonus",
        summary: "Operates production Kubernetes clusters, automates GitOps deployments with ArgoCD, enforces zero-downtime rollouts, and manages cloud costs.",
        responsibilities: [
          "Managing multi-node production EKS / GKE clusters with Helm, ArgoCD, and Karpenter autoscaling.",
          "Designing GitOps deployment workflows with automated canary releases (Argo Rollouts / Flagger).",
          "Setting up centralized logging (ELK / Loki) and distributed tracing (OpenTelemetry / Jaeger).",
          "Implementing FinOps practices to eliminate zombie cloud resources and utilize spot instances.",
          "Building automated database backup, snapshot verification, and point-in-time recovery tests."
        ],
        skills: ["Kubernetes (EKS/GKE)", "Terraform / OpenTofu", "GitOps (ArgoCD)", "Helm", "OpenTelemetry & Loki", "AWS ap-southeast-5", "FinOps"],
        timeAllocation: { coding: 55, architecture: 30, leadership: 15 },
        promotionGate: "Deliver automated zero-downtime canary deployment pipeline for core services and reduce cloud bill by at least 15% through smart autoscaling.",
        employers: "PayNet, GXBank, Boost Bank, AirAsia MOVE, Mindvalley, Standard Chartered GBS.",
        matrix: {
          scope: "Production clusters, observability stack, deployment velocity.",
          autonomy: "Owns cluster lifecycle and infrastructure releases autonomously.",
          regulatory: "Ensures data residency constraints are met within Malaysian cloud regions."
        }
      },
      {
        id: "devops-senior",
        tier: "senior",
        tierLabel: "Tier 3: Senior SRE",
        shortTitle: "Senior SRE",
        title: "Senior Site Reliability Engineer / Cloud Architect",
        experience: "5 – 8 Years Experience",
        salaryMin: 13,
        salaryMax: 20,
        salaryMonthlyMin: 13000,
        salaryMonthlyMax: 20000,
        epfPercentage: 14,
        typicalEquity: "ESOP + Annual Performance Bonus",
        summary: "Architects multi-region failover, disaster recovery runbooks meeting BNM 2-hour RTO, Service Level Objectives (SLOs), and internal platform engineering.",
        responsibilities: [
          "Designing disaster recovery architectures satisfying BNM RMiT mandates (RTO < 2 hours, RPO < 15 minutes).",
          "Engineering Internal Developer Platforms (IDP) enabling developers to self-service environments safely.",
          "Managing Service Level Objectives (SLOs), Error Budgets, and blameless post-mortem cultures.",
          "Directing migration to the local AWS Malaysia region (ap-southeast-5) or Google Cloud Malaysia.",
          "Architecting hybrid interconnects with local Malaysian telecommunication leased lines (TM, TIME)."
        ],
        skills: ["Disaster Recovery & Multi-AZ", "Service Mesh (Istio / Cilium)", "eBPF Monitoring", "BNM RMiT DR Mandates", "Chaos Engineering", "Cross-Account IAM"],
        timeAllocation: { coding: 35, architecture: 45, leadership: 20 },
        promotionGate: "Conduct a live chaos test or disaster recovery simulation proving recovery within strict SLA/RMiT parameters without customer disruption.",
        employers: "Digital Banks, PayNet, Top Tier Telcos (CelcomDigi, Maxis), MNC Technology Centres.",
        matrix: {
          scope: "High availability, uptime SLAs, infrastructure budget, DR strategy.",
          autonomy: "High autonomy; partners with Head of Eng on infrastructure vision.",
          regulatory: "Directly accountable for BNM RMiT DR drills and regulatory audit logs."
        }
      },
      {
        id: "devops-staff",
        tier: "staff",
        tierLabel: "Tier 4: Head of Platform",
        shortTitle: "Head of Infra / Staff",
        title: "Head of Infrastructure / Principal SRE",
        experience: "8+ Years Experience",
        salaryMin: 21,
        salaryMax: 35,
        salaryMonthlyMin: 21000,
        salaryMonthlyMax: 35000,
        epfPercentage: 16,
        typicalEquity: "Executive Equity Package",
        summary: "Leads enterprise platform strategy, multi-million cloud contract negotiations, data center infrastructure, and global site reliability teams.",
        responsibilities: [
          "Leading enterprise infrastructure strategy across multiple cloud providers and on-prem data centers.",
          "Negotiating multi-year Enterprise Discount Programs (EDP) with AWS, Google Cloud, and Microsoft.",
          "Establishing company-wide resilience engineering standards and executive risk matrices.",
          "Leading, recruiting, and structuring high-performing cloud infrastructure and SRE organizations.",
          "Presenting infrastructure health, resilience, and capacity forecasts to C-suite and regulators."
        ],
        skills: ["Enterprise Cloud Strategy", "Multi-Million Cloud Contracting", "Data Center Co-location (Cyberjaya/Sedenak)", "Executive Leadership", "Disaster Resilience"],
        timeAllocation: { coding: 10, architecture: 45, leadership: 45 },
        promotionGate: "Proven track record of steering enterprise-scale migrations, achieving 99.99% critical platform availability, and optimizing multi-million cloud investments.",
        employers: "Tier-1 Banks, Digital Banks, Regional Superapps.",
        matrix: {
          scope: "All corporate infrastructure, cloud expenditure, operational availability.",
          autonomy: "Reports directly to CTO; drives organization-wide infrastructure roadmap.",
          regulatory: "Primary technical authority for infrastructure audits and regulator reviews."
        }
      }
    ]
  }
];

const activeRoleId = ref("ai-ml");
const activeStageIndex = ref(0);
const viewMode = ref<"stepper" | "matrix">("stepper");

const assessment = ref({
  autonomy: "mid",
  scope: "mid",
  culture: "mid"
});

const currentRole = computed(() => {
  return roles.find((r) => r.id === activeRoleId.value) || roles[0];
});

const currentStage = computed(() => {
  const stages = currentRole.value.stages;
  return stages[activeStageIndex.value] || stages[0];
});

function selectRole(roleId: string) {
  activeRoleId.value = roleId;
  // Keep activeStageIndex within valid range
  if (activeStageIndex.value >= currentRole.value.stages.length) {
    activeStageIndex.value = 0;
  }
}

function formatNumber(val: number): string {
  return val.toLocaleString("en-US");
}

const computedAssessmentTier = computed(() => {
  const values = [assessment.value.autonomy, assessment.value.scope, assessment.value.culture];
  const scores: Record<string, number> = { junior: 1, mid: 2, senior: 3, staff: 4 };
  const total = values.reduce((sum, v) => sum + (scores[v] || 2), 0);
  const avg = total / 3;

  if (avg <= 1.4) {
    return {
      name: "Associate / Junior Tier (RM 3.5k – RM 6k)",
      advice: "Focus on deepening core fundamentals: master test-driven development, git workflows, and clean code principles. Deliver assigned tickets cleanly without regressions."
    };
  } else if (avg <= 2.4) {
    return {
      name: "Mid-Level Professional (RM 6.5k – RM 13k)",
      advice: "You have strong independent execution. To break into Senior, expand beyond coding: write Architecture Decision Records (ADRs), master system trade-offs, and mentor juniors."
    };
  } else if (avg <= 3.4) {
    return {
      name: "Senior Specialist / Tech Lead (RM 13k – RM 22k)",
      advice: "You lead architectural initiatives and own reliability. To reach Staff/Principal, focus on organizational leverage: solve multi-squad bottlenecks, optimize high-impact cloud costs, and steer tech culture."
    };
  } else {
    return {
      name: "Staff / Principal / Director (RM 22k – RM 35k+)",
      advice: "You operate at organizational scope. Continue refining multi-year technical vision, regulatory relations (BNM/NACSA), and multiplying senior leadership talent across squads."
    };
  }
});
</script>

<style scoped>
.career-roadmap-container {
  margin: 36px 0;
  font-family: inherit;
  color: var(--vp-c-text-1, #e2e8f0);
}

/* Header */
.roadmap-header {
  margin-bottom: 24px;
}

.header-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  background: rgba(59, 130, 246, 0.12);
  border: 1px solid rgba(59, 130, 246, 0.28);
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  color: #60a5fa;
  margin-bottom: 12px;
}

.roadmap-title {
  margin: 0 0 8px;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1, #f8fafc);
}

.roadmap-desc {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: var(--vp-c-text-2, #94a3b8);
  max-width: 780px;
}

/* Role Selector Tabs */
.role-selector-bar {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
}

.role-tab-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background: var(--vp-c-bg-soft, #1e293b);
  border: 1px solid var(--vp-c-divider, #334155);
  border-radius: 12px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  color: inherit;
}

.role-tab-btn:hover {
  background: var(--vp-c-bg-mute, #243248);
  border-color: #3b82f6;
  transform: translateY(-1px);
}

.role-tab-btn.active {
  background: rgba(59, 130, 246, 0.14);
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6, 0 4px 16px rgba(59, 130, 246, 0.15);
}

.role-tab-icon {
  font-size: 22px;
  flex-shrink: 0;
}

.role-tab-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.role-tab-name {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--vp-c-text-1, #f1f5f9);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.role-tab-salary {
  font-size: 11.5px;
  color: #10b981;
  font-weight: 500;
  margin-top: 2px;
}

/* View Controls Bar */
.view-controls-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  background: var(--vp-c-bg-alt, #0f172a);
  border: 1px solid var(--vp-c-divider, #334155);
  border-radius: 12px;
  margin-bottom: 24px;
}

.view-toggle-group {
  display: flex;
  background: var(--vp-c-bg-soft, #1e293b);
  border-radius: 8px;
  padding: 3px;
  gap: 4px;
}

.view-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-2, #94a3b8);
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.15s ease;
}

.view-toggle-btn.active {
  background: #2563eb;
  color: #ffffff;
  font-weight: 600;
}

.role-stat-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  color: var(--vp-c-text-2, #94a3b8);
}

.chip-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 6px rgba(16, 185, 129, 0.6);
}

/* Progression Stepper Bar */
.progression-track-wrap {
  position: relative;
  margin: 16px 0 28px;
  padding: 0 20px;
}

.track-line-bg {
  position: absolute;
  top: 20px;
  left: 36px;
  right: 36px;
  height: 4px;
  background: var(--vp-c-divider, #334155);
  z-index: 1;
  border-radius: 2px;
}

.track-line-fill {
  position: absolute;
  top: 20px;
  left: 36px;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  z-index: 2;
  border-radius: 2px;
  transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.stages-nodes-row {
  position: relative;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.stage-node-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  max-width: 140px;
  text-align: center;
  transition: all 0.2s ease;
}

.node-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--vp-c-bg-soft, #1e293b);
  border: 3px solid var(--vp-c-divider, #475569);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  color: var(--vp-c-text-2, #94a3b8);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  margin-bottom: 8px;
}

.stage-node-btn:hover .node-circle {
  border-color: #3b82f6;
  transform: scale(1.08);
}

.stage-node-btn.active .node-circle {
  background: #2563eb;
  border-color: #93c5fd;
  color: #ffffff;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.25);
  transform: scale(1.12);
}

.stage-node-btn.completed .node-circle {
  background: #10b981;
  border-color: #6ee7b7;
  color: #ffffff;
}

.node-label-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.node-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1, #f1f5f9);
}

.node-years {
  font-size: 11px;
  color: var(--vp-c-text-3, #64748b);
  margin-top: 1px;
}

.node-salary-tag {
  font-size: 11px;
  font-weight: 600;
  color: #10b981;
  margin-top: 3px;
}

/* Active Stage Detail Card */
.stage-detail-card {
  background: var(--vp-c-bg-soft, #1e293b);
  border: 1px solid var(--vp-c-divider, #334155);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.stage-card-topbar {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;
  align-items: flex-start;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--vp-c-divider, #334155);
  margin-bottom: 24px;
}

@media (max-width: 768px) {
  .stage-card-topbar {
    grid-template-columns: 1fr;
  }
}

.stage-tier-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11.5px;
  font-weight: 600;
  margin-bottom: 8px;
}

.stage-tier-badge.tier-junior {
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #34d399;
}

.stage-tier-badge.tier-mid {
  background: rgba(59, 130, 246, 0.12);
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #60a5fa;
}

.stage-tier-badge.tier-senior {
  background: rgba(139, 92, 246, 0.12);
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: #a78bfa;
}

.stage-tier-badge.tier-staff {
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.3);
  color: #fbbf24;
}

.tier-separator {
  opacity: 0.6;
}

.stage-role-title {
  margin: 0 0 8px;
  font-size: 22px;
  font-weight: 700;
  color: var(--vp-c-text-1, #f8fafc);
}

.stage-role-summary {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2, #94a3b8);
  max-width: 650px;
}

/* Salary Box */
.stage-salary-box {
  background: var(--vp-c-bg-alt, #0f172a);
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: 12px;
  padding: 14px 18px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.salary-box-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #94a3b8;
}

.salary-box-range {
  font-size: 20px;
  font-weight: 800;
  color: #10b981;
  letter-spacing: -0.01em;
}

.salary-period {
  font-size: 12px;
  font-weight: 400;
  color: #94a3b8;
}

.salary-box-annual {
  font-size: 11.5px;
  color: var(--vp-c-text-3, #64748b);
}

.salary-box-benefits {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
}

.benefit-tag {
  font-size: 10.5px;
  font-weight: 600;
  padding: 2px 7px;
  background: rgba(16, 185, 129, 0.12);
  border-radius: 4px;
  color: #34d399;
}

/* Stage Content Grid */
.stage-content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

@media (max-width: 768px) {
  .stage-content-grid {
    grid-template-columns: 1fr;
  }
}

.stage-info-col {
  background: var(--vp-c-bg-alt, #0f172a);
  border: 1px solid var(--vp-c-divider, #334155);
  border-radius: 12px;
  padding: 18px;
  display: flex;
  flex-direction: column;
}

.col-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}

.col-header h4 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1, #f8fafc);
}

.col-icon {
  color: #3b82f6;
}

.responsibilities-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.resp-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--vp-c-text-2, #cbd5e1);
}

.resp-bullet {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #3b82f6;
  margin-top: 7px;
  flex-shrink: 0;
}

.skills-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 18px;
}

.skill-chip {
  font-size: 12px;
  font-weight: 500;
  padding: 3px 8px;
  background: var(--vp-c-bg-soft, #1e293b);
  border: 1px solid var(--vp-c-divider, #475569);
  border-radius: 6px;
  color: var(--vp-c-text-1, #e2e8f0);
}

/* Effort Allocation Breakdown */
.work-balance-box {
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid var(--vp-c-divider, #334155);
}

.balance-title {
  display: block;
  font-size: 11.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-3, #64748b);
  margin-bottom: 10px;
}

.balance-bar-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.bar-labels {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--vp-c-text-2, #94a3b8);
  margin-bottom: 3px;
}

.bar-track {
  height: 6px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 3px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.fill-blue { background: #3b82f6; }
.fill-purple { background: #a855f7; }
.fill-green { background: #10b981; }

/* Promotion Gate Box */
.promotion-gate-card {
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.25);
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.gate-left {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.gate-icon-wrap {
  font-size: 24px;
  flex-shrink: 0;
}

.gate-title {
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 700;
  color: #93c5fd;
}

.gate-desc {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.55;
  color: var(--vp-c-text-2, #cbd5e1);
}

.gate-employers {
  padding-top: 8px;
  border-top: 1px dashed rgba(59, 130, 246, 0.2);
  font-size: 12.5px;
  color: var(--vp-c-text-2, #94a3b8);
}

.gate-employers-label {
  font-weight: 600;
  color: #60a5fa;
  margin-right: 6px;
}

.gate-employers-names {
  color: var(--vp-c-text-1, #e2e8f0);
}

/* Stepper Navigation Buttons */
.stage-nav-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.step-nav-btn {
  padding: 8px 16px;
  background: var(--vp-c-bg-alt, #0f172a);
  border: 1px solid var(--vp-c-divider, #334155);
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1, #f1f5f9);
  cursor: pointer;
  transition: all 0.15s ease;
}

.step-nav-btn:hover:not(:disabled) {
  background: var(--vp-c-bg-mute, #243248);
  border-color: #3b82f6;
}

.step-nav-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.step-indicator-text {
  font-size: 12.5px;
  font-weight: 500;
  color: var(--vp-c-text-3, #64748b);
}

/* Matrix Table */
.matrix-view-container {
  margin-bottom: 24px;
}

.matrix-table-wrap {
  overflow-x: auto;
  border: 1px solid var(--vp-c-divider, #334155);
  border-radius: 12px;
  background: var(--vp-c-bg-soft, #1e293b);
}

.matrix-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
  text-align: left;
}

.matrix-table th,
.matrix-table td {
  padding: 14px 16px;
  border-bottom: 1px solid var(--vp-c-divider, #334155);
  border-right: 1px solid var(--vp-c-divider, #334155);
  vertical-align: top;
}

.matrix-table th:last-child,
.matrix-table td:last-child {
  border-right: none;
}

.matrix-table tr:last-child td {
  border-bottom: none;
}

.col-metric {
  width: 20%;
  min-width: 160px;
  background: var(--vp-c-bg-alt, #0f172a);
  font-weight: 700;
  color: var(--vp-c-text-1, #f8fafc);
}

.col-stage {
  width: 20%;
  min-width: 180px;
}

.th-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--vp-c-text-1, #f8fafc);
}

.th-sub {
  font-size: 12px;
  color: var(--vp-c-text-3, #64748b);
  margin-top: 2px;
}

.th-salary {
  font-size: 12px;
  font-weight: 600;
  color: #10b981;
  margin-top: 4px;
}

.metric-name {
  font-weight: 600;
  background: var(--vp-c-bg-alt, #0f172a);
  color: var(--vp-c-text-1, #cbd5e1);
}

.metric-val {
  line-height: 1.5;
  color: var(--vp-c-text-2, #94a3b8);
}

.highlight-cell {
  background: rgba(59, 130, 246, 0.05);
  color: #93c5fd;
}

/* Assessment Card */
.assessment-card {
  margin-top: 28px;
  background: var(--vp-c-bg-soft, #1e293b);
  border: 1px solid var(--vp-c-divider, #334155);
  border-radius: 14px;
  padding: 20px 24px;
}

.assessment-header {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 20px;
}

.assessment-icon {
  font-size: 26px;
  flex-shrink: 0;
}

.assessment-title {
  margin: 0 0 4px;
  font-size: 17px;
  font-weight: 700;
  color: var(--vp-c-text-1, #f8fafc);
}

.assessment-sub {
  margin: 0;
  font-size: 13.5px;
  color: var(--vp-c-text-2, #94a3b8);
}

.assessment-questions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.quiz-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.quiz-label {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--vp-c-text-1, #cbd5e1);
}

.quiz-select {
  padding: 8px 12px;
  background: var(--vp-c-bg-alt, #0f172a);
  border: 1px solid var(--vp-c-divider, #475569);
  border-radius: 8px;
  color: var(--vp-c-text-1, #f1f5f9);
  font-size: 13px;
  outline: none;
  cursor: pointer;
}

.quiz-select:focus {
  border-color: #3b82f6;
}

.assessment-result-box {
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: 10px;
  padding: 14px 18px;
}

.result-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--vp-c-text-2, #94a3b8);
  margin-bottom: 6px;
}

.result-tier {
  font-size: 14.5px;
  font-weight: 700;
  color: #10b981;
}

.result-advice {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--vp-c-text-1, #e2e8f0);
}
</style>
