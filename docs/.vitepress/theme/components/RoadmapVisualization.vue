<template>
  <div id="techmy-roadmap-container" class="techmy-roadmap">
    <!-- Header with Malaysian Tech Focus -->
    <div class="roadmap-header">
      <div class="header-badge">
        <span class="flag-icon">🇲🇾</span>
        <span>Malaysian Tech Ecosystem 2026</span>
      </div>
      <h2 class="roadmap-title">Interactive Career & Learning Roadmaps</h2>
      <p class="roadmap-subtitle">
        Structured milestone paths crafted specifically for Malaysian industry standards, covering Bank Negara RMiT, local cloud regions, digital banks, and National AI initiatives.
      </p>
    </div>

    <!-- Role Selection Tabs -->
    <div class="track-tabs" role="tablist" aria-label="Role Tracks">
      <div
        v-for="track in tracks"
        :key="track.id"
        :id="`tab-card-${track.id}`"
        class="track-tab-card"
        :class="[{ active: activeTrackId === track.id, [track.accentClass]: true }]"
      >
        <button
          :id="`tab-${track.id}`"
          role="tab"
          :aria-selected="activeTrackId === track.id"
          class="track-tab-main-btn"
          @click="selectTrack(track.id)"
        >
          <span class="tab-icon">{{ track.icon }}</span>
          <div class="tab-meta">
            <div class="tab-title-line">
              <span class="tab-name">{{ track.name }}</span>
              <span v-if="getTrackProgress(track.id) > 0" class="tab-progress-pill">
                {{ getTrackProgress(track.id) }}%
              </span>
            </div>
            <span class="tab-sublabel">{{ track.shortTag }}</span>
          </div>
        </button>

        <!-- Salary Quick Pill & Tooltip Popover Trigger -->
        <div class="tab-salary-bar">
          <button
            type="button"
            class="salary-info-trigger"
            :class="{ 'tooltip-open': isSalaryTooltipVisible(track.id) }"
            :aria-label="`View ${track.name} Malaysia salary insights`"
            :aria-expanded="isSalaryTooltipVisible(track.id)"
            @click.stop="toggleSalaryTooltip(track.id)"
            @mouseenter="handleSalaryMouseEnter(track.id)"
            @mouseleave="handleSalaryMouseLeave"
          >
            <div class="salary-trigger-left">
              <span class="salary-flag-icon">🇲🇾</span>
              <span class="salary-trigger-val">Avg {{ track.salaryData.medianMonthly }}/mo</span>
            </div>
            <span class="salary-trigger-badge" title="View Malaysia market salary breakdown">
              <svg class="info-svg" viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
                <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" />
                <path d="M6.5 7.75A.75.75 0 017.25 7h1a.75.75 0 01.75.75v2.75h.25a.75.75 0 010 1.5h-2.5a.75.75 0 010-1.5h.25v-2h-.5a.75.75 0 01-.75-.75zM8 6a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
              Salary Guide
            </span>
          </button>

          <!-- Interactive Floating Tooltip Popover -->
          <Transition name="salary-popover-anim">
            <div
              v-if="isSalaryTooltipVisible(track.id)"
              class="salary-popover"
              :class="'popover-align-' + track.id"
              role="tooltip"
              @click.stop
              @mouseenter="handlePopoverMouseEnter"
              @mouseleave="handlePopoverMouseLeave"
            >
              <!-- Popover Header -->
              <div class="popover-header">
                <div class="popover-header-title">
                  <span class="popover-flag">🇲🇾</span>
                  <div>
                    <h5 class="popover-role-name">{{ track.name }}</h5>
                    <span class="popover-subtext">Malaysia Market Salary Benchmark • {{ track.salaryData.lastUpdated }}</span>
                  </div>
                </div>
                <button
                  type="button"
                  class="popover-close-btn"
                  aria-label="Close salary tooltip"
                  title="Close (Esc)"
                  @click.stop="closeSalaryTooltip"
                >
                  ✕
                </button>
              </div>

              <!-- Key Metrics Grid -->
              <div class="popover-kpi-grid">
                <div class="kpi-item highlight">
                  <span class="kpi-label">Median Monthly</span>
                  <span class="kpi-val">{{ track.salaryData.medianMonthly }}</span>
                </div>
                <div class="kpi-item">
                  <span class="kpi-label">Overall Monthly Range</span>
                  <span class="kpi-val">{{ track.salaryData.overallMonthlyRange }}</span>
                </div>
                <div class="kpi-item">
                  <span class="kpi-label">Annual Package</span>
                  <span class="kpi-val">{{ track.salaryData.annualRange }}</span>
                </div>
              </div>

              <!-- Seniority Breakdown -->
              <div class="popover-seniority-section">
                <div class="section-sub-title">Monthly Compensation by Seniority Level:</div>
                <div class="seniority-tiers-list">
                  <div
                    v-for="tier in track.salaryData.experienceTiers"
                    :key="tier.level"
                    class="tier-row"
                  >
                    <div class="tier-top-row">
                      <span class="tier-level-badge">{{ tier.level }}</span>
                      <span class="tier-salary-badge">{{ tier.monthlyRange }}</span>
                    </div>
                    <div class="tier-role-focus">{{ tier.focusRole }} (Est. {{ tier.annualEstimate }}/yr)</div>
                    <div class="tier-details-text">{{ tier.typicalSkills }}</div>
                  </div>
                </div>
              </div>

              <!-- Regional Insights & Key Sectors -->
              <div class="popover-insights-box">
                <div class="insight-entry">
                  <span class="insight-tag">Regional Hubs</span>
                  <p class="insight-p">{{ track.salaryData.geographicPremium }}</p>
                </div>
                <div class="insight-entry">
                  <span class="insight-tag">Key Hiring Sectors</span>
                  <p class="insight-p">{{ track.salaryData.topSectors.join(' • ') }}</p>
                </div>
              </div>

              <!-- Grounded Sources Footer -->
              <div class="popover-sources-footer">
                <div class="sources-label">Grounded Market Benchmarks (via Google Search):</div>
                <div class="sources-chips">
                  <span
                    v-for="src in track.salaryData.sources"
                    :key="src.name"
                    class="source-chip"
                    :title="src.note"
                  >
                    <strong>{{ src.name }}</strong>: {{ src.note }}
                  </span>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>

    <!-- Active Track Overview Card -->
    <Transition name="track-hero-fade" mode="out-in">
      <div :key="activeTrack.id" class="active-track-hero" :class="activeTrack.accentClass">
        <div class="track-hero-content">
          <div class="hero-left">
            <div class="role-badge">
              <span>{{ activeTrack.badgeText }}</span>
            </div>
            <h3 class="role-name">{{ activeTrack.name }}</h3>
            <p class="role-desc">{{ activeTrack.description }}</p>

            <!-- Malaysian Market Snapshot -->
            <div class="market-snapshot-grid">
              <div class="snapshot-item">
                <span class="snap-label">Market Demand</span>
                <span class="snap-value demand-high">{{ activeTrack.marketDemand }}</span>
              </div>
              <div
                class="snapshot-item salary-snapshot-interactive"
                role="button"
                tabindex="0"
                :title="`Click to open ${activeTrack.name} salary guide`"
                @click="toggleSalaryTooltip(activeTrack.id)"
                @keydown.enter="toggleSalaryTooltip(activeTrack.id)"
              >
                <div class="snap-title-with-pill">
                  <span class="snap-label">Est. Salary Range (MYR)</span>
                  <span class="snap-info-icon" title="View Malaysian salary insights">
                    <svg viewBox="0 0 16 16" width="11" height="11" fill="currentColor">
                      <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" />
                      <path d="M6.5 7.75A.75.75 0 017.25 7h1a.75.75 0 01.75.75v2.75h.25a.75.75 0 010 1.5h-2.5a.75.75 0 010-1.5h.25v-2h-.5a.75.75 0 01-.75-.75zM8 6a1 1 0 100-2 1 1 0 000 2z" />
                    </svg>
                    Guide
                  </span>
                </div>
                <span class="snap-value salary-clickable-val">{{ activeTrack.salaryRangeMYR }}</span>
              </div>
              <div class="snapshot-item">
                <span class="snap-label">Key Local Employers</span>
                <span class="snap-value employers-text">{{ activeTrack.topEmployers.join(', ') }}</span>
              </div>
            </div>
          </div>

          <div class="hero-right">
            <!-- Overall Progress Card with Local Storage Persistence -->
            <div class="progress-box">
              <div class="progress-box-header">
                <span class="progress-title">Track Progress</span>
                <span class="progress-count">{{ completedCount }} / {{ activeTrack.stages.length }} Completed</span>
              </div>
              <div class="progress-bar-bg">
                <div
                  class="progress-bar-fill"
                  :style="{ width: `${currentProgressPercent}%` }"
                ></div>
              </div>
              <div class="progress-footer">
                <span class="progress-percent-text">
                  <span class="storage-status-dot" :class="{ active: saveFeedback }"></span>
                  <span v-if="saveFeedback" class="save-feedback-msg">Saved to browser!</span>
                  <span v-else>{{ currentProgressPercent }}% Completed</span>
                </span>
                <div class="progress-actions">
                  <button
                    v-if="completedCount < activeTrack.stages.length"
                    class="track-action-btn"
                    title="Mark all steps in this track as completed"
                    @click="markAllTrackCompleted(activeTrack.id)"
                  >
                    Mark All Done
                  </button>
                  <button
                    v-if="completedCount > 0"
                    class="reset-progress-btn"
                    title="Reset track progress in local storage"
                    @click="resetTrackProgress(activeTrack.id)"
                  >
                    Reset
                  </button>
                </div>
              </div>
              <div class="storage-indicator-bar">
                <span class="storage-icon">💾</span>
                <span>Saved locally in your browser</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Filters and Search Toolbar -->
    <div class="roadmap-toolbar">
      <div class="toolbar-search">
        <span class="search-icon">🔍</span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Filter skills (e.g., Docker, RMiT, PyTorch, PayNet, OWASP)..."
          class="roadmap-search-input"
        />
        <button
          v-if="searchQuery"
          class="clear-search-btn"
          @click="searchQuery = ''"
        >
          ✕
        </button>
      </div>

      <!-- Difficulty Level Filter (Beginner, Intermediate, Advanced) -->
      <div class="toolbar-filters difficulty-toolbar-group">
        <span class="filter-label">Difficulty:</span>
        <div class="filter-pills">
          <button
            :class="['filter-pill', { active: areAllDifficultiesSelected() }]"
            title="Show all difficulty levels"
            @click="selectAllDifficulties"
          >
            All ({{ activeTrack.stages.length }})
          </button>
          <button
            v-for="diff in difficultyLevels"
            :key="diff.id"
            :class="[
              'filter-pill',
              'diff-pill-' + diff.id,
              { active: isDifficultySelected(diff.id) }
            ]"
            :title="(isDifficultySelected(diff.id) ? 'Click to hide or isolate ' : 'Click to show ') + diff.label + ' steps'"
            @click="toggleDifficulty(diff.id)"
          >
            <span class="difficulty-indicator-dot" :class="diff.id"></span>
            <span>{{ diff.label }}</span>
            <span class="diff-count-pill">{{ getDifficultyCount(diff.id) }}</span>
          </button>
        </div>
      </div>

      <div class="toolbar-filters">
        <span class="filter-label">Status:</span>
        <div class="filter-pills">
          <button
            :class="['filter-pill', { active: statusFilter === 'all' }]"
            @click="statusFilter = 'all'"
          >
            All ({{ activeTrack.stages.length }})
          </button>
          <button
            :class="['filter-pill', { active: statusFilter === 'incomplete' }]"
            @click="statusFilter = 'incomplete'"
          >
            To-Do ({{ activeTrack.stages.length - completedCount }})
          </button>
          <button
            :class="['filter-pill', { active: statusFilter === 'completed' }]"
            @click="statusFilter = 'completed'"
          >
            Done ({{ completedCount }})
          </button>
        </div>
      </div>
    </div>

    <!-- Stages Roadmap Timeline with Cascading Entrance Animations -->
    <div class="roadmap-timeline-wrapper">
      <TransitionGroup
        name="stage-cascade"
        tag="div"
        class="roadmap-timeline"
      >
        <div
          v-for="(stage, index) in filteredStages"
          :key="stage.id"
          :style="{ '--stage-index': index }"
          :class="[
            'timeline-stage-card',
            {
              'is-completed': isStageCompleted(stage.id),
              'is-selected': selectedStage?.id === stage.id,
              [activeTrack.accentClass]: true
            }
          ]"
        >
          <!-- Stage Number & Progress Indicator Checkbox -->
          <div class="stage-marker-col">
            <button
              class="stage-checkbox"
              :class="{ 'is-checked': isStageCompleted(stage.id) }"
              :title="isStageCompleted(stage.id) ? 'Click to mark as incomplete' : 'Click to mark as completed'"
              :aria-label="isStageCompleted(stage.id) ? 'Mark step as incomplete' : 'Mark step as completed'"
              @click.stop="toggleStageCompletion(stage.id)"
            >
              <span v-if="isStageCompleted(stage.id)">✓</span>
              <span v-else class="stage-step-num">{{ index + 1 }}</span>
            </button>
            <div v-if="index < filteredStages.length - 1" class="stage-connecting-line"></div>
          </div>

          <!-- Stage Card Content -->
          <div class="stage-main-card" @click="selectStage(stage)">
            <div class="stage-card-header">
              <div class="stage-title-wrap">
                <span class="stage-difficulty-tag" :class="'diff-' + stage.difficulty">
                  <span class="diff-dot"></span>
                  {{ stage.difficultyLabel }}
                </span>
                <span class="stage-level-tag" :class="stage.levelClass">{{ stage.levelLabel }}</span>
                <h4 class="stage-title">{{ stage.title }}</h4>
              </div>

              <div class="stage-header-actions">
                <span class="stage-timeframe">{{ stage.estimatedTime }}</span>
                <button
                  class="step-toggle-btn"
                  :class="{ 'is-completed': isStageCompleted(stage.id) }"
                  :title="isStageCompleted(stage.id) ? 'Click to mark step as incomplete' : 'Click to mark step as completed'"
                  @click.stop="toggleStageCompletion(stage.id)"
                >
                  <span class="step-toggle-icon">{{ isStageCompleted(stage.id) ? '✓ Completed' : '○ Mark as Completed' }}</span>
                </button>
              </div>
            </div>

            <p class="stage-description">{{ stage.summary }}</p>

            <!-- Key Skills & Tech Pills -->
            <div class="stage-skills-list">
              <span
                v-for="skill in stage.skills"
                :key="skill"
                class="skill-chip"
                :class="{ highlighted: matchesSearch(skill) }"
              >
                {{ skill }}
              </span>
            </div>

            <!-- Malaysian Industry Context Callout -->
            <div class="malaysia-context-box">
              <div class="context-label">
                <span class="my-flag">🇲🇾</span>
                <strong>Malaysian Industry Relevance:</strong>
              </div>
              <p class="context-text">{{ stage.malaysiaRelevance }}</p>
            </div>

            <!-- Stage Footer with Quick Docs Link & Toggle Details -->
            <div class="stage-card-footer">
              <div class="footer-left-actions">
                <a
                  v-if="stage.docsLink"
                  :href="stage.docsLink"
                  class="docs-reference-btn"
                  @click.stop
                >
                  <span>Explore TechMY Guide</span>
                  <span class="arrow-icon">→</span>
                </a>

                <button
                  class="expand-details-btn"
                  @click.stop="toggleStageExpand(stage.id)"
                >
                  <span>{{ expandedStages.includes(stage.id) ? 'Hide Deep Dive' : 'View Deep Dive & Certs' }}</span>
                  <span class="chevron" :class="{ rotated: expandedStages.includes(stage.id) }">▾</span>
                </button>
              </div>

              <div class="footer-completion-status" :class="{ 'is-done': isStageCompleted(stage.id) }">
                <span v-if="isStageCompleted(stage.id)">✓ Step Completed</span>
                <span v-else class="status-todo">Not Completed</span>
              </div>
            </div>

            <!-- Collapsible Deep Dive Section -->
            <div v-if="expandedStages.includes(stage.id)" class="stage-expanded-drawer">
              <div class="expanded-grid">
                <div class="expanded-col">
                  <h5>Key Competencies & Milestones</h5>
                  <ul class="milestone-bullets">
                    <li v-for="(item, i) in stage.detailedMilestones" :key="i">
                      {{ item }}
                    </li>
                  </ul>
                </div>

                <div class="expanded-col">
                  <h5>Malaysian Standards & Certifications</h5>
                  <div class="cert-chips">
                    <span
                      v-for="cert in stage.recognizedCerts"
                      :key="cert"
                      class="cert-badge"
                    >
                      🏅 {{ cert }}
                    </span>
                  </div>

                  <h5 class="mt-3">Target Malaysian Roles</h5>
                  <p class="target-roles-text">{{ stage.targetJobTitles.join(' • ') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>

      <!-- Empty State if filters match nothing -->
      <div v-if="filteredStages.length === 0" class="empty-roadmap-state">
        <p v-if="searchQuery">No roadmap milestones matched your search "<strong>{{ searchQuery }}</strong>".</p>
        <p v-else>No roadmap steps matched your selected difficulty or status filters.</p>
        <button class="reset-filter-link" @click="resetFilters">
          Reset All Filters
        </button>
      </div>
    </div>

    <!-- Career Advice & Ecosystem Footer -->
    <div class="roadmap-advice-banner">
      <div class="advice-content">
        <h4>🚀 Launching or Growing Your Tech Career in Malaysia</h4>
        <p>
          The Malaysian tech industry values practical portfolio implementations, clear code hygiene, and understanding of regional enterprise constraints over passive certification hoarding. Connect with local communities in Cyberjaya, Bangsar South, and Penang through our curated Malaysian Hub.
        </p>
      </div>
      <div class="advice-actions">
        <a href="/local-resources/" class="hub-link-btn">
          Visit Local Tech Hub
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

interface Stage {
  id: string;
  title: string;
  level: 'entry' | 'mid' | 'senior';
  levelLabel: string;
  levelClass: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  difficultyLabel: string;
  estimatedTime: string;
  summary: string;
  skills: string[];
  malaysiaRelevance: string;
  docsLink?: string;
  detailedMilestones: string[];
  recognizedCerts: string[];
  targetJobTitles: string[];
}

interface SalaryExperienceTier {
  level: string;
  monthlyRange: string;
  annualEstimate: string;
  focusRole: string;
  typicalSkills: string;
}

interface SalarySource {
  name: string;
  note: string;
}

interface SalaryInsight {
  medianMonthly: string;
  overallMonthlyRange: string;
  annualRange: string;
  experienceTiers: SalaryExperienceTier[];
  geographicPremium: string;
  topSectors: string[];
  sources: SalarySource[];
  lastUpdated: string;
}

interface Track {
  id: string;
  name: string;
  shortTag: string;
  icon: string;
  badgeText: string;
  accentClass: string;
  description: string;
  marketDemand: string;
  salaryRangeMYR: string;
  topEmployers: string[];
  salaryData: SalaryInsight;
  stages: Stage[];
}

type Difficulty = 'beginner' | 'intermediate' | 'advanced';

const activeTrackId = ref<string>('swe');
const searchQuery = ref<string>('');
const statusFilter = ref<'all' | 'incomplete' | 'completed'>('all');
const selectedStage = ref<Stage | null>(null);
const expandedStages = ref<string[]>([]);
const completedStages = ref<Record<string, boolean>>({});
const saveFeedback = ref(false);

const difficultyLevels: { id: Difficulty; label: string; dotColor: string }[] = [
  { id: 'beginner', label: 'Beginner', dotColor: '#3fb950' },
  { id: 'intermediate', label: 'Intermediate', dotColor: '#d29922' },
  { id: 'advanced', label: 'Advanced', dotColor: '#f85149' }
];

const selectedDifficulties = ref<Difficulty[]>(['beginner', 'intermediate', 'advanced']);

function isDifficultySelected(diff: Difficulty): boolean {
  return selectedDifficulties.value.includes(diff);
}

function areAllDifficultiesSelected(): boolean {
  return selectedDifficulties.value.length === 3;
}

function toggleDifficulty(diff: Difficulty) {
  if (areAllDifficultiesSelected()) {
    // If all are currently active and user clicks one, isolate that difficulty
    selectedDifficulties.value = [diff];
  } else if (selectedDifficulties.value.includes(diff)) {
    // If clicking an already active difficulty
    if (selectedDifficulties.value.length === 1) {
      // If it's the only one active, reset to all
      selectedDifficulties.value = ['beginner', 'intermediate', 'advanced'];
    } else {
      selectedDifficulties.value = selectedDifficulties.value.filter(d => d !== diff);
    }
  } else {
    selectedDifficulties.value = [...selectedDifficulties.value, diff];
  }
}

function selectAllDifficulties() {
  selectedDifficulties.value = ['beginner', 'intermediate', 'advanced'];
}

function getDifficultyCount(diff: Difficulty): number {
  return activeTrack.value.stages.filter(s => s.difficulty === diff).length;
}

const tracks: Track[] = [
  {
    id: 'swe',
    name: 'Software Engineering',
    shortTag: 'Digital Banking, FinTech & GCCs',
    icon: '💻',
    badgeText: 'High Demand • FinTech & Enterprise',
    accentClass: 'track-blue',
    description:
      'From foundational algorithms and clean code to distributed microservices, DuitNow/PayNet integration, and high-resiliency architectures in Malaysian digital banks and multinational tech hubs.',
    marketDemand: 'Very High (Crucial shortage in Mid & Senior levels)',
    salaryRangeMYR: 'RM 3,800 (Junior) — RM 22,000+ (Principal/Staff)',
    topEmployers: ['GXBank', 'Grab Malaysia', 'PayNet', 'Touch n Go Digital', 'Standard Chartered GBS', 'Carsome', 'Maybank'],
    salaryData: {
      medianMonthly: 'RM 5,350',
      overallMonthlyRange: 'RM 3,800 – RM 15,000+',
      annualRange: 'RM 51,400 – RM 180,000+ / yr',
      experienceTiers: [
        {
          level: 'Junior / Fresh Grad (0–2 yrs)',
          monthlyRange: 'RM 3,400 – RM 4,500/mo',
          annualEstimate: 'RM 40,800 – RM 54,000',
          focusRole: 'Junior Software Engineer / Frontend / Backend Dev',
          typicalSkills: 'TypeScript, Go, Clean Architecture basics, Git PR reviews'
        },
        {
          level: 'Mid-Level Core (3–5 yrs)',
          monthlyRange: 'RM 4,500 – RM 8,500/mo',
          annualEstimate: 'RM 54,000 – RM 102,000',
          focusRole: 'Full Stack Engineer / Microservices Specialist',
          typicalSkills: 'PostgreSQL indexing, Redis caching, Kafka queues, DuitNow / FPX APIs'
        },
        {
          level: 'Senior / Staff (5+ yrs)',
          monthlyRange: 'RM 9,000 – RM 16,000+/mo',
          annualEstimate: 'RM 108,000 – RM 192,000',
          focusRole: 'Senior SWE / Tech Lead / Solutions Specialist',
          typicalSkills: 'Distributed fault tolerance, Kubernetes, RMiT disaster recovery, zero-downtime CI/CD'
        },
        {
          level: 'Principal / Architect (8+ yrs)',
          monthlyRange: 'RM 18,000 – RM 25,000+/mo',
          annualEstimate: 'RM 216,000 – RM 300,000+',
          focusRole: 'Principal Architect / Engineering Manager / VP',
          typicalSkills: 'Enterprise system architecture, cross-squad scaling, multi-cloud governance'
        }
      ],
      geographicPremium: 'Kuala Lumpur & Bangsar South offer 20%–30% higher compensation than national median; remote roles for Singapore/US tech firms offer 2x–3x local benchmarks.',
      topSectors: ['Digital Banks (GXBank, Boost Bank)', 'FinTech & Payments (PayNet, TNGD)', 'Multinational GCCs (Kuala Lumpur & Penang)'],
      sources: [
        { name: 'Jobstreet Malaysia 2026', note: 'Median RM 4,200 – RM 6,000; Full Stack RM 5,050 – RM 7,550' },
        { name: 'Indeed Malaysia 2026', note: 'Average RM 5,359/mo; Senior RM 7,988/mo; Principal RM 11,683/mo' },
        { name: 'Seekers.my Tech Report', note: 'Junior RM 3.4k–4.5k, Mid RM 3.8k–6k, Senior RM 5.5k–10k+' },
        { name: 'Michael Page Salary Guide', note: 'Lead / Architect up to RM 180,000 – RM 240,000/yr' }
      ],
      lastUpdated: '2026 Market Benchmark'
    },
    stages: [
      {
        id: 'swe-1',
        title: 'Foundations, Clean Code & Computer Science Core',
        level: 'entry',
        levelLabel: 'Junior Foundation',
        levelClass: 'level-entry',
        difficulty: 'beginner',
        difficultyLabel: 'Beginner',
        estimatedTime: '2 - 4 Months',
        summary: 'Establish rigorous coding habits, algorithmic efficiency, Git workflows, and idiomatic type systems.',
        skills: ['TypeScript / Node.js', 'Go or Java 21', 'Algorithms & Data Structures', 'Git & GitHub Workflows', 'Clean Architecture basics', 'Linux / Shell scripting'],
        malaysiaRelevance: 'Screening tests for fresh grads at Grab, Shopee MY, and multinational Global Capability Centers in Cyberjaya emphasize clean code and problem-solving over framework trivia.',
        docsLink: '/software-engineering/clean-code',
        detailedMilestones: [
          'Master SOLID principles, DRY, and clean refactoring workflows',
          'Implement data structures (Trees, HashMaps, Graphs) and analyze Big-O complexity',
          'Build idiomatic CLI utilities and unit-tested libraries in TypeScript or Go',
          'Adopt Git hygiene: semantic commit conventions, pull request reviews, and interactive rebasing'
        ],
        recognizedCerts: ['AWS Certified Cloud Practitioner', 'HackerRank Problem Solving Intermediate'],
        targetJobTitles: ['Junior Software Engineer', 'Graduate Developer', 'Associate Backend Engineer']
      },
      {
        id: 'swe-2',
        title: 'Backend Systems, APIs & Malaysian Payment Integrations',
        level: 'mid',
        levelLabel: 'Mid-Level Core',
        levelClass: 'level-mid',
        difficulty: 'intermediate',
        difficultyLabel: 'Intermediate',
        estimatedTime: '3 - 6 Months',
        summary: 'Construct robust REST/GraphQL APIs, relational database schemas, message queues, and financial transaction lifecycles.',
        skills: ['PostgreSQL & Indexing', 'Redis Caching', 'Kafka / RabbitMQ', 'RESTful & gRPC APIs', 'PayNet / FPX / DuitNow concepts', 'OAuth2 / JWT Security'],
        malaysiaRelevance: 'Malaysia has a vibrant FinTech ecosystem driven by PayNet, Touch n Go, and e-wallets. Handling idempotency, transactional ACID guarantees, and DuitNow QR webhook reliability is highly prized.',
        docsLink: '/software-engineering/languages/',
        detailedMilestones: [
          'Design normalized PostgreSQL schemas with EXPLAIN ANALYZE query tuning',
          'Implement distributed caching strategies with Redis (cache-aside, invalidation, TTLs)',
          'Build asynchronous event-driven pipelines using message brokers',
          'Design resilient payment webhook receivers with signature verification and retry mechanisms'
        ],
        recognizedCerts: ['AWS Certified Developer Associate', 'CKAD (Certified Kubernetes App Developer)'],
        targetJobTitles: ['Software Engineer', 'Backend Developer', 'Full Stack Engineer']
      },
      {
        id: 'swe-3',
        title: 'Cloud Infrastructure, Containers & Microservices',
        level: 'mid',
        levelLabel: 'Mid to Senior',
        levelClass: 'level-mid',
        difficulty: 'intermediate',
        difficultyLabel: 'Intermediate',
        estimatedTime: '3 - 5 Months',
        summary: 'Package applications into OCI containers, orchestrate with Kubernetes, and automate multi-environment deployments.',
        skills: ['Docker & Multi-Stage Builds', 'Kubernetes Deployment', 'GitHub Actions CI/CD', 'AWS Singapore / Malaysia Regions', 'Google Cloud Malaysia', 'Terraform (IaC)'],
        malaysiaRelevance: 'With AWS and Google Cloud launching dedicated Malaysia cloud regions, Malaysian banks and enterprises are migrating workloads locally while strictly observing Bank Negara data residency standards.',
        docsLink: '/devops-infrastructure/container-docker',
        detailedMilestones: [
          'Build lightweight, hardened Docker images with non-root security contexts',
          'Author end-to-end CI/CD pipelines deploying to staging and production clusters',
          'Configure Kubernetes Ingress, ConfigMaps, Secrets, and Horizontal Pod Autoscaling (HPA)',
          'Provision cloud infrastructure deterministically using Infrastructure as Code (Terraform)'
        ],
        recognizedCerts: ['AWS Solutions Architect Associate', 'Terraform Associate'],
        targetJobTitles: ['Senior Backend Engineer', 'DevOps / Platform Engineer', 'Cloud Software Engineer']
      },
      {
        id: 'swe-4',
        title: 'Distributed Systems, FinTech Resiliency & Technical Leadership',
        level: 'senior',
        levelLabel: 'Senior & Staff',
        levelClass: 'level-senior',
        difficulty: 'advanced',
        difficultyLabel: 'Advanced',
        estimatedTime: 'Ongoing Mastery',
        summary: 'Design fault-tolerant high-throughput architectures, lead cross-functional code reviews, and guarantee 99.99% system availability.',
        skills: ['System Design & High Concurrency', 'Distributed Tracing & OpenTelemetry', 'Zero-Downtime Blue/Green Deployments', 'Bank Negara RMiT Resiliency', 'PDPA 2010 Compliance', 'Mentorship & Tech Specs'],
        malaysiaRelevance: 'Licensed Digital Banks (GXBank, Boost Bank, AEON Bank) and major financial institutions must conform to Bank Negara Malaysia RMiT requirements for disaster recovery, RTO/RPO limits, and auditing.',
        docsLink: '/software-engineering/interview-prep',
        detailedMilestones: [
          'Architect distributed transactional workflows using Saga and Outbox patterns',
          'Implement full-stack observability with Prometheus, Grafana, and distributed tracing',
          'Conduct architectural review boards (ARBs) and RFC design documents',
          'Design active-active failover topologies meeting Bank Negara RMiT disaster recovery criteria'
        ],
        recognizedCerts: ['AWS Solutions Architect Professional', 'Google Cloud Professional Cloud Architect'],
        targetJobTitles: ['Tech Lead', 'Staff Software Engineer', 'Solutions Architect', 'Engineering Manager']
      }
    ]
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence & ML',
    shortTag: 'GenAI, RAG & National AI Strategy',
    icon: '🤖',
    badgeText: 'High Growth • National AI Focus',
    accentClass: 'track-green',
    description:
      'Aligned with the Malaysia National AI Roadmap (NAIO) and regional GPU compute hubs. Focuses on applied machine learning, localized Malay/Manglish NLP, enterprise RAG, and production MLOps.',
    marketDemand: 'Accelerating Rapidly (Enterprise GenAI adoption & local data centers)',
    salaryRangeMYR: 'RM 4,200 (Junior) — RM 25,000+ (Staff AI / Lead Scientist)',
    topEmployers: ['YTL AI Cloud (Johor)', 'CelcomDigi AI Labs', 'Maxis', 'MDEC / GovTech', 'Aerodyne Group (Drone AI)', 'Carsome AI', 'Banking AI Units'],
    salaryData: {
      medianMonthly: 'RM 9,500',
      overallMonthlyRange: 'RM 4,200 – RM 25,000+',
      annualRange: 'RM 72,000 – RM 240,000+ / yr',
      experienceTiers: [
        {
          level: 'Junior / Associate (0–2 yrs)',
          monthlyRange: 'RM 4,000 – RM 7,000/mo',
          annualEstimate: 'RM 48,000 – RM 84,000',
          focusRole: 'Associate Data Scientist / Junior ML Engineer',
          typicalSkills: 'Python 3.11+, Pandas, Scikit-learn, SQL & exploratory data modeling'
        },
        {
          level: 'Mid-Level Core (3–5 yrs)',
          monthlyRange: 'RM 7,000 – RM 15,000/mo',
          annualEstimate: 'RM 84,000 – RM 180,000',
          focusRole: 'Machine Learning Engineer / NLP Specialist',
          typicalSkills: 'PyTorch, Hugging Face, localized Malay/Manglish NLP, enterprise RAG pipelines'
        },
        {
          level: 'Senior / Staff (5+ yrs)',
          monthlyRange: 'RM 15,000 – RM 28,000+/mo',
          annualEstimate: 'RM 180,000 – RM 336,000',
          focusRole: 'Senior ML Engineer / GenAI Architect / MLOps Lead',
          typicalSkills: 'vLLM continuous batching, TensorRT-LLM, vector databases, GPU cluster orchestration'
        },
        {
          level: 'Lead / Head of AI (8+ yrs)',
          monthlyRange: 'RM 25,000 – RM 55,000+/mo',
          annualEstimate: 'RM 300,000 – RM 660,000+',
          focusRole: 'Head of AI / Principal AI Scientist / AI Director',
          typicalSkills: 'National AI Roadmap governance, enterprise LLM strategy, multi-GPU supercomputing'
        }
      ],
      geographicPremium: 'Kuala Lumpur, Cyberjaya, and the Johor-Singapore AI compute corridor (YTL AI Cloud / NVIDIA superclusters) command highest salary premiums.',
      topSectors: ['AI Data Centers & Cloud Infrastructure (Johor & Cyberjaya)', 'Banking GenAI & Credit Scoring', 'Telecom & GovTech (CelcomDigi, MDEC)'],
      sources: [
        { name: 'Michael Page Malaysia 2026', note: 'GenAI/LLM Engineers RM 168,000 – RM 240,000/yr' },
        { name: 'Second Talent Market Report', note: 'Average annual range RM 96,000 – RM 240,000' },
        { name: 'Indeed Malaysia 2026', note: 'AI/ML average RM 106,577/yr; KL ML Engineers RM 9,398/mo' },
        { name: 'Jobstreet Malaysia 2026', note: 'Specialist AI / Data Scientist openings RM 6k – RM 22k/mo' }
      ],
      lastUpdated: '2026 Market Benchmark'
    },
    stages: [
      {
        id: 'ai-1',
        title: 'Applied Math, Statistics & Python Foundations',
        level: 'entry',
        levelLabel: 'Junior Foundation',
        levelClass: 'level-entry',
        difficulty: 'beginner',
        difficultyLabel: 'Beginner',
        estimatedTime: '2 - 3 Months',
        summary: 'Master the linear algebra, probability, and exploratory data analysis foundational to deep modeling.',
        skills: ['Python 3.11+', 'NumPy & Pandas', 'Linear Algebra & Calculus', 'Exploratory Data Analysis (EDA)', 'Scikit-learn', 'SQL & Relational Querying'],
        malaysiaRelevance: 'Essential baseline for local talent development programs (MDEC Digital Talent initiatives, 42KL, university AI research labs).',
        docsLink: '/data-engineering/',
        detailedMilestones: [
          'Manipulate tabular and time-series datasets cleanly with Pandas and Polars',
          'Understand gradient descent, loss functions, and matrix transformations geometrically',
          'Train classical ML models (Random Forests, Gradient Boosting, Logistic Regression)',
          'Evaluate model performance using Precision, Recall, ROC-AUC, and Cross-Validation'
        ],
        recognizedCerts: ['Google Data Analytics Certificate', 'DeepLearning.AI Mathematics for ML'],
        targetJobTitles: ['Associate Data Scientist', 'Junior ML Engineer', 'Data Analyst']
      },
      {
        id: 'ai-2',
        title: 'Deep Learning & Localized NLP (Malay / Multilingual)',
        level: 'mid',
        levelLabel: 'Mid-Level Core',
        levelClass: 'level-mid',
        difficulty: 'intermediate',
        difficultyLabel: 'Intermediate',
        estimatedTime: '3 - 5 Months',
        summary: 'Construct deep neural architectures, fine-tune transformer models, and solve regional language nuances.',
        skills: ['PyTorch', 'Hugging Face Ecosystem', 'Transformer Architectures', 'Bahasa Melayu / Manglish NLP', 'Tokenization & Embeddings', 'Computer Vision (YOLO/OpenCV)'],
        malaysiaRelevance: 'Malaysian enterprises demand conversational models capable of parsing rojak language (code-switching between BM, English, and Chinese dialects), drawing on open models like Malaya/Mesolitica.',
        docsLink: '/ai-ml/',
        detailedMilestones: [
          'Build and train neural networks using PyTorch with custom datasets and data loaders',
          'Fine-tune pre-trained multilingual language models (mBERT, Llama, Gemma) on localized corpora',
          'Handle informal Malaysian text: slang normalization, dialect detection, and sentiment analysis',
          'Implement object detection pipelines for industrial use cases (AgriTech palm oil inspection, retail)'
        ],
        recognizedCerts: ['DeepLearning.AI Deep Learning Specialization', 'TensorFlow Developer Certificate'],
        targetJobTitles: ['Machine Learning Engineer', 'NLP Engineer', 'Computer Vision Engineer']
      },
      {
        id: 'ai-3',
        title: 'Generative AI, Production RAG & Vector Systems',
        level: 'mid',
        levelLabel: 'Mid to Senior',
        levelClass: 'level-mid',
        difficulty: 'intermediate',
        difficultyLabel: 'Intermediate',
        estimatedTime: '3 - 4 Months',
        summary: 'Architect Retrieval-Augmented Generation (RAG) pipelines, manage vector databases, and build autonomous agents.',
        skills: ['Gemini API & Claude SDK', 'Vector DBs (Chroma / Qdrant / pgvector)', 'LangChain & LlamaIndex', 'Hybrid Search (BM25 + Semantic)', 'Reranking & Chunking Strategy', 'Evaluation (Ragas, TruLens)'],
        malaysiaRelevance: 'Malaysian banks, legal firms, and government departments are deploying private internal RAG assistants while maintaining data confidentiality and auditability under local PDPA rules.',
        docsLink: '/ai-ml/',
        detailedMilestones: [
          'Build scalable document ingestion pipelines with dynamic chunking and metadata filtering',
          'Deploy hybrid retrieval systems combining reciprocal rank fusion (RRF) and cross-encoders',
          'Implement guardrails against prompt injection and hallucination verification using Ragas',
          'Connect LLM agents to operational internal APIs through structured function calling'
        ],
        recognizedCerts: ['Google Cloud Generative AI Engineer', 'LangChain Certified Developer'],
        targetJobTitles: ['GenAI Engineer', 'AI Solutions Architect', 'Senior ML Engineer']
      },
      {
        id: 'ai-4',
        title: 'Production MLOps, Model Serving & National AI Governance',
        level: 'senior',
        levelLabel: 'Senior & Staff',
        levelClass: 'level-senior',
        difficulty: 'advanced',
        difficultyLabel: 'Advanced',
        estimatedTime: 'Ongoing Mastery',
        summary: 'Serve low-latency inference on high-throughput clusters, monitor model degradation, and enforce ethical AI governance.',
        skills: ['vLLM & TensorRT-LLM', 'Triton Inference Server', 'MLflow / Weights & Biases', 'Quantization (AWQ / GGUF)', 'Malaysia AI Ethics Guidelines', 'GPU Optimization (CUDA)'],
        malaysiaRelevance: 'With Johor emerging as ASEAN’s largest AI computing center (YTL & Nvidia), engineers capable of orchestrating multi-GPU inference and complying with the National AI Office guidelines are at a massive premium.',
        docsLink: '/devops-infrastructure/ai-operations',
        detailedMilestones: [
          'Deploy high-concurrency LLM inference endpoints utilizing vLLM, PagedAttention, and continuous batching',
          'Implement automated model performance tracking, drift detection, and automated retraining triggers',
          'Optimize model memory footprints using 4-bit and 8-bit quantization for on-premise execution',
          'Audit AI systems against the National Guidelines on AI Governance and Ethics (MDeC/NAIO)'
        ],
        recognizedCerts: ['AWS Certified Machine Learning Specialty', 'NVIDIA Deep Learning Institute Certificate'],
        targetJobTitles: ['Staff MLOps Engineer', 'Head of AI', 'Lead AI Scientist']
      }
    ]
  },
  {
    id: 'cyber',
    name: 'Cybersecurity',
    shortTag: 'BNM RMiT, Act 854 & National Defense',
    icon: '🛡️',
    badgeText: 'Critical Shortage • Regulatory Mandate',
    accentClass: 'track-amber',
    description:
      'Driven by the Cyber Security Act 2024 (Act 854), Bank Negara Malaysia RMiT, and critical national infrastructure protection. Covers offensive security, SOC analysis, DevSecOps, and regulatory compliance.',
    marketDemand: 'Critical Shortage (Enforced by national laws and regulatory fines)',
    salaryRangeMYR: 'RM 4,000 (Junior SOC) — RM 24,000+ (Principal Consultant / CISO)',
    topEmployers: ['Bank Negara Malaysia (BNM)', 'CyberSecurity Malaysia', 'National Cyber Security Agency (NACSA)', 'LGMS Berhad', 'Maybank / CIMB Cyber Defense', 'Ensign InfoSecurity', 'Big 4 Cybersecurity'],
    salaryData: {
      medianMonthly: 'RM 6,800',
      overallMonthlyRange: 'RM 4,000 – RM 18,000+',
      annualRange: 'RM 60,000 – RM 204,000+ / yr',
      experienceTiers: [
        {
          level: 'Junior / Associate (0–2 yrs)',
          monthlyRange: 'RM 3,500 – RM 5,500/mo',
          annualEstimate: 'RM 42,000 – RM 66,000',
          focusRole: 'Junior SOC Analyst / Security Operations Associate',
          typicalSkills: 'Wireshark packet inspection, Linux sysadmin, SIEM triage, NIST basics'
        },
        {
          level: 'Mid-Level Specialist (3–5 yrs)',
          monthlyRange: 'RM 5,800 – RM 9,000/mo',
          annualEstimate: 'RM 69,600 – RM 108,000',
          focusRole: 'Cybersecurity Analyst / Penetration Tester / DevSecOps',
          typicalSkills: 'OWASP Top 10, Burp Suite Pro, Splunk/Wazuh alerts, incident containment'
        },
        {
          level: 'Senior / Lead Specialist (5+ yrs)',
          monthlyRange: 'RM 9,500 – RM 16,500+/mo',
          annualEstimate: 'RM 114,000 – RM 198,000',
          focusRole: 'Senior Security Engineer / Red Team Lead / DFIR Specialist',
          typicalSkills: 'Active Directory exploitation, Volatility memory forensics, cloud security posture (CSPM)'
        },
        {
          level: 'Principal / CISO (8+ yrs)',
          monthlyRange: 'RM 18,000 – RM 32,000+/mo',
          annualEstimate: 'RM 216,000 – RM 384,000+',
          focusRole: 'Chief Information Security Officer / Principal Auditor',
          typicalSkills: 'Act 854 statutory compliance, Bank Negara RMiT audit governance, executive risk leadership'
        }
      ],
      geographicPremium: 'Financial services in Klang Valley and National Critical Information Infrastructure (NCII) organizations pay highest premiums driven by mandatory Act 854 penalties.',
      topSectors: ['Banking & Digital Finance (BNM, Tier 1 Banks)', 'National Defense & GovTech (NACSA, CSM)', 'Cybersecurity Advisory (Big 4, LGMS)'],
      sources: [
        { name: 'Jobstreet Malaysia 2026', note: 'Security Analyst RM 5,400 – RM 7,000; Security Engineer RM 5,850 – RM 8,350' },
        { name: 'PayScale Malaysia 2026', note: 'Cybersecurity median RM 55k–90k; Senior up to RM 203k' },
        { name: 'Seekers.my Salary Report', note: 'Median RM 6,800/mo; Management roles median RM 11,000/mo' },
        { name: 'Michael Page Malaysia', note: 'Senior & CISO leadership roles RM 150,000 – RM 300,000+/yr' }
      ],
      lastUpdated: '2026 Market Benchmark'
    },
    stages: [
      {
        id: 'cyber-1',
        title: 'Networking Internals, OS Hardening & Security Foundations',
        level: 'entry',
        levelLabel: 'Junior Foundation',
        levelClass: 'level-entry',
        difficulty: 'beginner',
        difficultyLabel: 'Beginner',
        estimatedTime: '2 - 4 Months',
        summary: 'Grasp packet-level network protocols, operating system internals, access controls, and basic scripting.',
        skills: ['TCP/IP & Packet Analysis (Wireshark)', 'Linux System Administration', 'Windows Active Directory Basics', 'Bash & Python for Security', 'Cryptography & PKI', 'NIST Cybersecurity Framework'],
        malaysiaRelevance: 'Core prerequisite for junior security operations center (SOC) analysts in MSC Cyberjaya security operations centers monitoring regional enterprise traffic.',
        docsLink: '/cybersecurity/fundamentals',
        detailedMilestones: [
          'Analyze malicious traffic pcaps using Wireshark and identify reconnaissance scans',
          'Harden Linux and Windows servers following CIS Benchmarks and least-privilege principles',
          'Understand symmetric/asymmetric encryption, TLS handshakes, and digital signatures',
          'Write automated scripts for log parsing and automated vulnerability scanning'
        ],
        recognizedCerts: ['CompTIA Security+', 'CompTIA Network+'],
        targetJobTitles: ['Junior SOC Analyst', 'Information Security Associate', 'Security Operations Engineer']
      },
      {
        id: 'cyber-2',
        title: 'Web Application Security, OWASP & Threat Hunting',
        level: 'mid',
        levelLabel: 'Mid-Level Core',
        levelClass: 'level-mid',
        difficulty: 'intermediate',
        difficultyLabel: 'Intermediate',
        estimatedTime: '3 - 5 Months',
        summary: 'Audit web applications for injection and business logic flaws, analyze SIEM telemetry, and perform threat triage.',
        skills: ['OWASP Top 10 Exploitation & Defense', 'Burp Suite Professional', 'SIEM Operations (Splunk / Wazuh)', 'MITRE ATT&CK Framework', 'DevSecOps & SAST/DAST', 'Incident Triage & Containment'],
        malaysiaRelevance: 'Mandatory for protecting Malaysian public sector web portals and fintech APIs against credential stuffing, defacement, and data breaches.',
        docsLink: '/cybersecurity/secure-coding',
        detailedMilestones: [
          'Perform manual penetration testing on web applications identifying IDOR, SQLi, and SSRF flaws',
          'Integrate static analysis (SAST) and secret scanning into GitHub Actions pipelines',
          'Correlate multi-source telemetry in SIEM tools to detect advanced persistent threats (APTs)',
          'Execute structured incident response playbooks for ransomware containment and eradication'
        ],
        recognizedCerts: ['eJPT (Junior Penetration Tester)', 'BTL1 (Blue Team Level 1)', 'Certified Ethical Hacker (CEH)'],
        targetJobTitles: ['Penetration Tester', 'Application Security Engineer', 'SOC Analyst L2']
      },
      {
        id: 'cyber-3',
        title: 'Malaysian Regulatory Compliance: BNM RMiT & Cyber Security Act 2024',
        level: 'mid',
        levelLabel: 'Mid to Senior',
        levelClass: 'level-mid',
        difficulty: 'intermediate',
        difficultyLabel: 'Intermediate',
        estimatedTime: '3 - 4 Months',
        summary: 'Translate statutory regulations into actionable technical security controls, audits, and cloud boundaries.',
        skills: ['Bank Negara Malaysia RMiT Framework', 'Cyber Security Act 2024 (Act 854)', 'Personal Data Protection Act (PDPA 2010)', 'ISO 27001 Lead Implementation', 'Cloud Security Posture (CSPM)', 'Third-Party Vendor Risk Assessment'],
        malaysiaRelevance: 'Act 854 mandates strict risk assessments across 11 Critical National Information Infrastructure (NCII) sectors. BNM RMiT compliance is legally required for all licensed financial services and digital banks in Malaysia.',
        docsLink: '/cybersecurity/',
        detailedMilestones: [
          'Design and audit network segmentation schemas compliant with BNM RMiT mandates',
          'Conduct comprehensive data protection impact assessments (DPIA) under Malaysian PDPA',
          'Implement continuous Cloud Security Posture Management (CSPM) across AWS and Azure',
          'Prepare technical documentation and evidence collections for regulatory Bank Negara inspections'
        ],
        recognizedCerts: ['CRISC (Certified in Risk and Information Systems Control)', 'ISO/IEC 27001 Lead Auditor', 'CCSP (Certified Cloud Security Professional)'],
        targetJobTitles: ['GRC Specialist', 'Cybersecurity Compliance Lead', 'Security Architect']
      },
      {
        id: 'cyber-4',
        title: 'Red Teaming, Advanced DFIR & Strategic Cyber Leadership',
        level: 'senior',
        levelLabel: 'Senior & Staff',
        levelClass: 'level-senior',
        difficulty: 'advanced',
        difficultyLabel: 'Advanced',
        estimatedTime: 'Ongoing Mastery',
        summary: 'Simulate sophisticated adversary attacks, conduct memory forensics, and lead enterprise security strategy.',
        skills: ['Offensive Red Teaming & Active Directory Exploitation', 'Digital Forensics & Incident Response (DFIR)', 'Zero Trust Architecture (ZTA)', 'Memory Forensics (Volatility)', 'Executive Risk Communication & Crisis Management'],
        malaysiaRelevance: 'Senior consultants at top firms (LGMS, Ensign, Big 4) lead adversarial simulations and advise C-suites of major Malaysian GLCs (Tenaga, Petronas, Maybank) on national security resilience.',
        docsLink: '/cybersecurity/',
        detailedMilestones: [
          'Execute adversarial simulations mimicking real-world nation-state threat actors',
          'Extract forensic artifacts from volatile RAM and file system journals to trace initial compromise vectors',
          'Architect enterprise Zero Trust network perimeters with microsegmentation and continuous authentication',
          'Lead incident command centers during active nation-state or ransomware security crises'
        ],
        recognizedCerts: ['OSCP (Offensive Security Certified Professional)', 'CISSP (Certified Information Systems Security Professional)', 'GIAC (GCIH / GCFA)'],
        targetJobTitles: ['Lead Penetration Tester', 'Principal Security Architect', 'CISO / Head of Information Security']
      }
    ]
  },
  {
    id: 'devops',
    name: 'DevOps & Cloud SRE',
    shortTag: 'Kubernetes, IaC & RMiT Resilience',
    icon: '⚡',
    badgeText: 'High Demand • Cloud & SRE',
    accentClass: 'track-purple',
    description:
      'Master the lifecycle of high-availability cloud systems: from container runtimes and GitHub Actions automation to multi-cluster Kubernetes, Terraform IaC, and BNM RMiT disaster recovery architectures across AWS/GCP Malaysia regions.',
    marketDemand: 'Very High (Accelerated by AWS & Google Cloud Malaysia regions)',
    salaryRangeMYR: 'RM 4,200 (Associate) — RM 24,000+ (Principal SRE / Cloud Architect)',
    topEmployers: ['Grab Malaysia', 'Petronas Digital', 'GXBank', 'PayNet', 'Tenaga Nasional Berhad (TNB)', 'AirAsia MOVE', 'Maybank Shared Services'],
    salaryData: {
      medianMonthly: 'RM 7,200',
      overallMonthlyRange: 'RM 4,200 – RM 18,500+',
      annualRange: 'RM 55,000 – RM 220,000+ / yr',
      experienceTiers: [
        {
          level: 'Junior / Associate (0–2 yrs)',
          monthlyRange: 'RM 4,000 – RM 5,800/mo',
          annualEstimate: 'RM 48,000 – RM 69,600',
          focusRole: 'Junior DevOps Engineer / Cloud Ops Associate',
          typicalSkills: 'Docker multi-stage builds, Linux sysadmin, GitHub Actions CI, basic bash automation'
        },
        {
          level: 'Mid-Level Specialist (3–5 yrs)',
          monthlyRange: 'RM 6,500 – RM 10,500/mo',
          annualEstimate: 'RM 78,000 – RM 126,000',
          focusRole: 'DevOps Engineer / SRE / Cloud Platform Engineer',
          typicalSkills: 'Kubernetes Helm charts, Terraform IaC, Prometheus/Grafana alerts, zero-downtime blue/green'
        },
        {
          level: 'Senior / Lead SRE (5+ yrs)',
          monthlyRange: 'RM 10,500 – RM 18,000+/mo',
          annualEstimate: 'RM 126,000 – RM 216,000',
          focusRole: 'Senior SRE / Staff Infrastructure Engineer',
          typicalSkills: 'Multi-region disaster recovery (RMiT), service mesh (Istio), cost optimization (FinOps), chaos engineering'
        },
        {
          level: 'Principal / Cloud Architect (8+ yrs)',
          monthlyRange: 'RM 18,500 – RM 30,000+/mo',
          annualEstimate: 'RM 222,000 – RM 360,000+',
          focusRole: 'Head of Infrastructure / Principal Cloud Architect',
          typicalSkills: 'Hybrid-cloud sovereign architectures, national critical infrastructure resilience, executive FinOps'
        }
      ],
      geographicPremium: 'Kuala Lumpur and Cyberjaya command highest salaries; engineers certified in multi-cloud architecture (AWS/GCP/Azure) with local FinTech experience receive substantial premiums.',
      topSectors: ['Digital Banking & FinTech (RMiT Compliance)', 'Telecom & SuperApps (Grab, CelcomDigi)', 'Enterprise Cloud Transformation (Petronas, TNB)'],
      sources: [
        { name: 'Jobstreet Malaysia 2026', note: 'DevOps / SRE median RM 6,800 – RM 11,500/mo' },
        { name: 'Indeed Malaysia 2026', note: 'SRE average RM 7,420/mo; Senior SRE RM 12,500/mo' },
        { name: 'Michael Page Malaysia', note: 'Cloud & Infrastructure Leads RM 180k – RM 280k/yr' },
        { name: 'Randstad Malaysia Tech Report', note: 'Cloud Architects & SRE among top 3 most sought-after talent' }
      ],
      lastUpdated: '2026 Market Benchmark'
    },
    stages: [
      {
        id: 'devops-1',
        title: 'Linux Systems, Networking & Container Runtimes',
        level: 'entry',
        levelLabel: 'Junior Foundation',
        levelClass: 'level-entry',
        difficulty: 'beginner',
        difficultyLabel: 'Beginner',
        estimatedTime: '2 - 3 Months',
        summary: 'Master the POSIX command line, socket networking, container namespaces, and lightweight image design.',
        skills: ['Linux Kernel & Bash', 'TCP/IP & DNS Troubleshooting', 'Docker & OCI Runtimes', 'Multi-Stage Image Layering', 'Docker Compose'],
        malaysiaRelevance: 'Foundation for every enterprise cloud transformation project across local banks and GLC digital squads.',
        docsLink: '/devops-infrastructure/container-docker',
        detailedMilestones: [
          'Inspect system resources, network sockets, and process trees with htop, ss, and strace',
          'Write optimized Dockerfiles utilizing multi-stage builds and scratch base images',
          'Configure bridge and overlay networks with isolated container namespaces',
          'Automate local development environments using Docker Compose and volume binds'
        ],
        recognizedCerts: ['Linux Foundation Certified System Administrator (LFCS)', 'Docker Certified Associate (DCA)'],
        targetJobTitles: ['Junior DevOps Engineer', 'Linux Systems Administrator', 'Cloud Operations Associate']
      },
      {
        id: 'devops-2',
        title: 'CI/CD Automation, Security Scanning & GitOps',
        level: 'mid',
        levelLabel: 'Mid-Level Core',
        levelClass: 'level-mid',
        difficulty: 'intermediate',
        difficultyLabel: 'Intermediate',
        estimatedTime: '3 - 4 Months',
        summary: 'Build robust continuous delivery pipelines with automated testing, vulnerability scanning, and declarative deployments.',
        skills: ['GitHub Actions Workflows', 'ArgoCD / Flux (GitOps)', 'Trivy / SonarQube Scanning', 'Semantic Versioning & Artifacts', 'Matrix Builds'],
        malaysiaRelevance: 'Enables rapid release velocity while maintaining compliance with local internal audit standards and zero manual production touches.',
        docsLink: '/devops-infrastructure/cicd-workflows',
        detailedMilestones: [
          'Construct multi-job GitHub Actions pipelines with caching and secret management',
          'Integrate static code analysis (SAST) and container vulnerability scanning into pull requests',
          'Implement GitOps continuous deployment using declarative repository state with ArgoCD',
          'Configure zero-downtime rolling and canary release deployments'
        ],
        recognizedCerts: ['GitHub Actions Certified Specialist', 'GitLab Certified Associate'],
        targetJobTitles: ['DevOps Engineer', 'Release Engineer', 'CI/CD Specialist']
      },
      {
        id: 'devops-3',
        title: 'Kubernetes Orchestration & Infrastructure as Code (Terraform)',
        level: 'mid',
        levelLabel: 'Mid to Senior',
        levelClass: 'level-mid',
        difficulty: 'intermediate',
        difficultyLabel: 'Intermediate',
        estimatedTime: '4 - 6 Months',
        summary: 'Orchestrate production container clusters, manage declarative cloud infrastructure, and deploy across AWS/GCP Malaysia regions.',
        skills: ['Kubernetes (k8s) & Helm', 'Terraform (HCL) & State Mgmt', 'AWS Malaysia Region (ap-southeast-5)', 'Ingress & Network Policies', 'Horizontal Pod Autoscaling'],
        malaysiaRelevance: 'With AWS launching its Malaysia cloud region (ap-southeast-5) and Google Cloud expanding Cyberjaya facilities, certified Terraform and Kubernetes engineers are in unprecedented demand.',
        docsLink: '/devops-infrastructure/infrastructure-sre',
        detailedMilestones: [
          'Provision multi-tier cloud infrastructure with Terraform modules and remote S3 state locks',
          'Deploy high-availability Kubernetes workloads with Ingress controllers, ConfigMaps, and Secrets',
          'Configure Horizontal Pod Autoscaling (HPA) and cluster autoscalers for unpredictable traffic spikes',
          'Enforce network segmentation using Kubernetes NetworkPolicies and RBAC rules'
        ],
        recognizedCerts: ['Certified Kubernetes Administrator (CKA)', 'HashiCorp Certified: Terraform Associate'],
        targetJobTitles: ['Senior DevOps Engineer', 'Cloud Infrastructure Engineer', 'Kubernetes Administrator']
      },
      {
        id: 'devops-4',
        title: 'Production SRE, Observability & BNM RMiT Disaster Recovery',
        level: 'senior',
        levelLabel: 'Senior & Staff',
        levelClass: 'level-senior',
        difficulty: 'advanced',
        difficultyLabel: 'Advanced',
        estimatedTime: 'Ongoing Mastery',
        summary: 'Architect four-nines (99.99%) availability, manage SLOs/error budgets, and enforce Bank Negara Malaysia RMiT disaster recovery standards.',
        skills: ['Prometheus & Grafana Mimir', 'OpenTelemetry Tracing', 'BNM RMiT RPO/RTO Mandates', 'Chaos Engineering', 'FinOps Cloud Economics'],
        malaysiaRelevance: 'Bank Negara Malaysia RMiT mandates strict Recovery Time Objectives (RTO < 4 hours) and Recovery Point Objectives (RPO < 120 seconds). SREs capable of proving active-active cross-zone failovers command premium salaries.',
        docsLink: '/devops-infrastructure/',
        detailedMilestones: [
          'Design full-stack observability with OpenTelemetry distributed traces and Prometheus metrics',
          'Define Service Level Objectives (SLOs), error budgets, and actionable paging alerts',
          'Conduct automated chaos engineering experiments to test network partitions and zone failures',
          'Execute annual simulated disaster recovery switchovers compliant with BNM RMiT requirements'
        ],
        recognizedCerts: ['Certified Kubernetes Security Specialist (CKS)', 'AWS Certified Solutions Architect - Professional'],
        targetJobTitles: ['Lead Site Reliability Engineer (SRE)', 'Principal Cloud Architect', 'Head of Platform Engineering']
      }
    ]
  }
];

const activeTrack = computed(() => {
  return tracks.find(t => t.id === activeTrackId.value) || tracks[0];
});

const filteredStages = computed(() => {
  return activeTrack.value.stages.filter(stage => {
    // Filter by Difficulty Level (Beginner, Intermediate, Advanced)
    if (!selectedDifficulties.value.includes(stage.difficulty)) {
      return false;
    }

    // Filter by Completion Status
    if (statusFilter.value === 'completed' && !isStageCompleted(stage.id)) {
      return false;
    }
    if (statusFilter.value === 'incomplete' && isStageCompleted(stage.id)) {
      return false;
    }

    // Filter by Search Query
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase().trim();
      const titleMatch = stage.title.toLowerCase().includes(q);
      const summaryMatch = stage.summary.toLowerCase().includes(q);
      const relevanceMatch = stage.malaysiaRelevance.toLowerCase().includes(q);
      const skillsMatch = stage.skills.some(s => s.toLowerCase().includes(q));
      const certsMatch = stage.recognizedCerts.some(c => c.toLowerCase().includes(q));
      const milestonesMatch = stage.detailedMilestones.some(m => m.toLowerCase().includes(q));
      return titleMatch || summaryMatch || relevanceMatch || skillsMatch || certsMatch || milestonesMatch;
    }

    return true;
  });
});

const completedCount = computed(() => {
  return activeTrack.value.stages.filter(stage => isStageCompleted(stage.id)).length;
});

const currentProgressPercent = computed(() => {
  if (!activeTrack.value.stages.length) return 0;
  return Math.round((completedCount.value / activeTrack.value.stages.length) * 100);
});

function getTrackProgress(trackId: string): number {
  const track = tracks.find(t => t.id === trackId);
  if (!track || !track.stages.length) return 0;
  const count = track.stages.filter(stage => isStageCompleted(stage.id)).length;
  return Math.round((count / track.stages.length) * 100);
}

function selectTrack(trackId: string) {
  activeTrackId.value = trackId;
  selectedStage.value = null;
  expandedStages.value = [];
}

function selectStage(stage: Stage) {
  selectedStage.value = stage;
  if (!expandedStages.value.includes(stage.id)) {
    expandedStages.value.push(stage.id);
  }
}

function toggleStageExpand(stageId: string) {
  const idx = expandedStages.value.indexOf(stageId);
  if (idx >= 0) {
    expandedStages.value.splice(idx, 1);
  } else {
    expandedStages.value.push(stageId);
  }
}

function isStageCompleted(stageId: string): boolean {
  return Boolean(completedStages.value[stageId]);
}

function toggleStageCompletion(stageId: string) {
  const isCompleted = Boolean(completedStages.value[stageId]);
  const updated = { ...completedStages.value };
  if (isCompleted) {
    delete updated[stageId];
  } else {
    updated[stageId] = true;
  }
  completedStages.value = updated;
  saveProgress();
}

function markAllTrackCompleted(trackId: string) {
  const track = tracks.find(t => t.id === trackId);
  if (!track) return;
  const updated = { ...completedStages.value };
  track.stages.forEach(stage => {
    updated[stage.id] = true;
  });
  completedStages.value = updated;
  saveProgress();
}

function resetTrackProgress(trackId: string) {
  const track = tracks.find(t => t.id === trackId);
  if (!track) return;
  const updated = { ...completedStages.value };
  track.stages.forEach(stage => {
    delete updated[stage.id];
  });
  completedStages.value = updated;
  saveProgress();
}

function resetFilters() {
  searchQuery.value = '';
  statusFilter.value = 'all';
  selectedDifficulties.value = ['beginner', 'intermediate', 'advanced'];
}

function matchesSearch(skill: string): boolean {
  if (!searchQuery.value.trim()) return false;
  return skill.toLowerCase().includes(searchQuery.value.toLowerCase().trim());
}

const STORAGE_KEY = 'techmy_career_roadmap_progress_v1';

function saveProgress() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completedStages.value));
      saveFeedback.value = true;
      setTimeout(() => {
        saveFeedback.value = false;
      }, 1600);
    }
  } catch (err) {
    console.warn('LocalStorage is unavailable in current environment:', err);
  }
}

function loadProgress() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          completedStages.value = parsed;
        }
      }
    }
  } catch (err) {
    console.warn('Unable to load progress from LocalStorage:', err);
  }
}

// Salary Tooltip Popover state & handlers
const activeSalaryTooltipId = ref<string | null>(null);
const hoveredSalaryTrackId = ref<string | null>(null);
let hoverLeaveTimeout: ReturnType<typeof setTimeout> | null = null;

function isSalaryTooltipVisible(trackId: string): boolean {
  return activeSalaryTooltipId.value === trackId || hoveredSalaryTrackId.value === trackId;
}

function toggleSalaryTooltip(trackId: string) {
  if (activeSalaryTooltipId.value === trackId) {
    activeSalaryTooltipId.value = null;
  } else {
    activeSalaryTooltipId.value = trackId;
  }
}

function closeSalaryTooltip() {
  activeSalaryTooltipId.value = null;
  hoveredSalaryTrackId.value = null;
}

function handleSalaryMouseEnter(trackId: string) {
  if (hoverLeaveTimeout) {
    clearTimeout(hoverLeaveTimeout);
    hoverLeaveTimeout = null;
  }
  hoveredSalaryTrackId.value = trackId;
}

function handleSalaryMouseLeave() {
  hoverLeaveTimeout = setTimeout(() => {
    hoveredSalaryTrackId.value = null;
  }, 220);
}

function handlePopoverMouseEnter() {
  if (hoverLeaveTimeout) {
    clearTimeout(hoverLeaveTimeout);
    hoverLeaveTimeout = null;
  }
}

function handlePopoverMouseLeave() {
  hoverLeaveTimeout = setTimeout(() => {
    hoveredSalaryTrackId.value = null;
  }, 220);
}

function handleGlobalClick(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (!target.closest('.tab-salary-bar') && !target.closest('.salary-snapshot-interactive')) {
    activeSalaryTooltipId.value = null;
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    closeSalaryTooltip();
  }
}

onMounted(() => {
  loadProgress();
  if (typeof window !== 'undefined') {
    document.addEventListener('click', handleGlobalClick);
    document.addEventListener('keydown', handleKeydown);
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    document.removeEventListener('click', handleGlobalClick);
    document.removeEventListener('keydown', handleKeydown);
  }
});
</script>

<style scoped>
.techmy-roadmap {
  width: 100%;
  margin: 32px 0;
  font-family: var(--vp-font-family-base, 'Plus Jakarta Sans', sans-serif);
  color: #c9d1d9;
}

/* Header */
.roadmap-header {
  text-align: center;
  margin-bottom: 28px;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(46, 160, 67, 0.15);
  border: 1px solid rgba(46, 160, 67, 0.4);
  color: #3fb950;
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 12px;
}

.roadmap-title {
  font-size: 2rem;
  font-weight: 800;
  color: #f0f6fc;
  margin: 0 0 10px 0;
  letter-spacing: -0.02em;
}

.roadmap-subtitle {
  max-width: 720px;
  margin: 0 auto;
  font-size: 1rem;
  color: #8b949e;
  line-height: 1.6;
}

/* Track Tabs */
.track-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

.track-tab-card {
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 12px;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;
}

.track-tab-card:hover {
  background: #1c2128;
  border-color: #484f58;
  transform: translateY(-2px);
}

.track-tab-card.active {
  background: #1f242c;
}

.track-tab-card.track-blue.active {
  border-color: #58a6ff;
  box-shadow: 0 4px 16px rgba(88, 166, 255, 0.15);
}

.track-tab-card.track-green.active {
  border-color: #3fb950;
  box-shadow: 0 4px 16px rgba(63, 185, 80, 0.15);
}

.track-tab-card.track-amber.active {
  border-color: #d29922;
  box-shadow: 0 4px 16px rgba(210, 153, 34, 0.15);
}

.track-tab-card.track-purple.active {
  border-color: #bc8cff;
  box-shadow: 0 4px 16px rgba(188, 140, 255, 0.15);
}

.track-tab-main-btn {
  background: transparent;
  border: none;
  padding: 16px 18px 8px 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  text-align: left;
  width: 100%;
  color: #8b949e;
  border-radius: 12px 12px 0 0;
  transition: color 0.15s ease;
}

.track-tab-card.active .track-tab-main-btn {
  color: #f0f6fc;
}

.track-tab-main-btn:hover {
  color: #f0f6fc;
}

.tab-icon {
  font-size: 1.8rem;
  line-height: 1;
}

.tab-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.tab-title-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.tab-name {
  font-size: 1rem;
  font-weight: 700;
  color: inherit;
}

.tab-sublabel {
  font-size: 0.75rem;
  color: #8b949e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tab-progress-pill {
  font-size: 0.75rem;
  font-weight: 700;
  background: #21262d;
  border: 1px solid #30363d;
  padding: 2px 8px;
  border-radius: 12px;
  color: #3fb950;
}

/* Salary Bar & Quick Tooltip Trigger on Tab */
.tab-salary-bar {
  padding: 0 16px 12px 16px;
  position: relative;
}

.salary-info-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  background: rgba(13, 17, 23, 0.75);
  border: 1px solid #30363d;
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 0.73rem;
  color: #8b949e;
  cursor: pointer;
  transition: all 0.2s ease;
}

.salary-info-trigger:hover,
.salary-info-trigger.tooltip-open {
  background: #21262d;
  color: #f0f6fc;
  border-color: #58a6ff;
}

.track-blue .salary-info-trigger.tooltip-open,
.track-blue .salary-info-trigger:hover {
  border-color: #58a6ff;
  color: #79c0ff;
}

.track-green .salary-info-trigger.tooltip-open,
.track-green .salary-info-trigger:hover {
  border-color: #3fb950;
  color: #56d364;
}

.track-amber .salary-info-trigger.tooltip-open,
.track-amber .salary-info-trigger:hover {
  border-color: #d29922;
  color: #e3b341;
}

.track-purple .salary-info-trigger.tooltip-open,
.track-purple .salary-info-trigger:hover {
  border-color: #bc8cff;
  color: #d2a8ff;
}

.salary-trigger-left {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.salary-flag-icon {
  font-size: 0.85rem;
}

.salary-trigger-val {
  font-weight: 600;
  white-space: nowrap;
}

.salary-trigger-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.68rem;
  background: rgba(255, 255, 255, 0.06);
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
}

/* Tooltip Popover */
.salary-popover {
  position: absolute;
  top: calc(100% + 8px);
  z-index: 1000;
  width: 440px;
  max-width: calc(100vw - 32px);
  background: #161b22;
  border: 1px solid #484f58;
  border-radius: 12px;
  box-shadow: 0 16px 40px rgba(1, 4, 9, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.08);
  padding: 18px;
  color: #c9d1d9;
  text-align: left;
}

.salary-popover.popover-align-swe {
  left: 0;
  right: auto;
}

.salary-popover.popover-align-ai {
  left: 50%;
  transform: translateX(-50%);
}

.salary-popover.popover-align-cyber {
  right: 0;
  left: auto;
}

.popover-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid #21262d;
}

.popover-header-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.popover-flag {
  font-size: 1.4rem;
  line-height: 1;
}

.popover-role-name {
  font-size: 1rem;
  font-weight: 700;
  color: #f0f6fc;
  margin: 0;
}

.popover-subtext {
  font-size: 0.72rem;
  color: #8b949e;
  display: block;
}

.popover-close-btn {
  background: #21262d;
  border: 1px solid #30363d;
  color: #8b949e;
  border-radius: 6px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.15s ease;
}

.popover-close-btn:hover {
  background: #30363d;
  color: #f0f6fc;
}

/* KPI Grid */
.popover-kpi-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 14px;
}

.kpi-item {
  background: #0d1117;
  border: 1px solid #21262d;
  border-radius: 8px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.kpi-item.highlight {
  border-color: rgba(56, 139, 253, 0.4);
  background: rgba(56, 139, 253, 0.08);
}

.kpi-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  color: #8b949e;
  font-weight: 600;
}

.kpi-val {
  font-size: 0.85rem;
  font-weight: 700;
  color: #f0f6fc;
}

.kpi-item.highlight .kpi-val {
  color: #58a6ff;
}

/* Seniority Section */
.popover-seniority-section {
  margin-bottom: 14px;
}

.section-sub-title {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #8b949e;
  letter-spacing: 0.03em;
  margin-bottom: 8px;
}

.seniority-tiers-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tier-row {
  background: #0d1117;
  border: 1px solid #21262d;
  border-radius: 8px;
  padding: 8px 10px;
}

.tier-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 2px;
}

.tier-level-badge {
  font-size: 0.72rem;
  font-weight: 700;
  color: #f0f6fc;
}

.tier-salary-badge {
  font-size: 0.72rem;
  font-weight: 700;
  color: #3fb950;
  background: rgba(63, 185, 80, 0.12);
  padding: 1px 6px;
  border-radius: 4px;
}

.tier-role-focus {
  font-size: 0.7rem;
  color: #8b949e;
  font-weight: 500;
  margin-bottom: 2px;
}

.tier-details-text {
  font-size: 0.68rem;
  color: #6e7681;
  line-height: 1.35;
}

/* Regional Insights */
.popover-insights-box {
  background: #0d1117;
  border: 1px solid #21262d;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.insight-entry {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.insight-tag {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #d29922;
}

.insight-p {
  font-size: 0.72rem;
  color: #c9d1d9;
  line-height: 1.4;
  margin: 0;
}

/* Sources Footer */
.popover-sources-footer {
  border-top: 1px solid #21262d;
  padding-top: 10px;
}

.sources-label {
  font-size: 0.65rem;
  font-weight: 600;
  color: #8b949e;
  margin-bottom: 6px;
}

.sources-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.source-chip {
  font-size: 0.64rem;
  color: #8b949e;
  background: #21262d;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid #30363d;
}

.source-chip strong {
  color: #c9d1d9;
}

/* Popover Transition Animations */
.salary-popover-anim-enter-active,
.salary-popover-anim-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.salary-popover-anim-enter-from,
.salary-popover-anim-leave-to {
  opacity: 0;
  transform: translateY(4px);
}

.popover-align-ai.salary-popover-anim-enter-from,
.popover-align-ai.salary-popover-anim-leave-to {
  opacity: 0;
  transform: translate(-50%, 4px);
}

/* Active Track Hero */
.active-track-hero {
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 14px;
  padding: 24px;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
}

.active-track-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
}

.active-track-hero.track-blue::before { background: #58a6ff; }
.active-track-hero.track-green::before { background: #3fb950; }
.active-track-hero.track-amber::before { background: #d29922; }
.active-track-hero.track-purple::before { background: #bc8cff; }

.track-hero-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 28px;
  align-items: center;
}

.role-badge span {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 2px 10px;
  border-radius: 12px;
  background: #21262d;
  color: #8b949e;
  margin-bottom: 8px;
}

.track-blue .role-badge span { color: #58a6ff; }
.track-green .role-badge span { color: #3fb950; }
.track-amber .role-badge span { color: #d29922; }

.role-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: #f0f6fc;
  margin: 0 0 6px 0;
}

.role-desc {
  font-size: 0.95rem;
  color: #8b949e;
  line-height: 1.5;
  margin: 0 0 16px 0;
}

.market-snapshot-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 10px;
  padding: 12px 16px;
}

.snapshot-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.salary-snapshot-interactive {
  cursor: pointer;
  border-radius: 6px;
  padding: 4px 8px;
  margin: -4px -8px;
  transition: all 0.15s ease;
}

.salary-snapshot-interactive:hover {
  background: rgba(88, 166, 255, 0.08);
}

.snap-title-with-pill {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}

.snap-info-icon {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 0.65rem;
  color: #58a6ff;
  background: rgba(88, 166, 255, 0.12);
  padding: 1px 5px;
  border-radius: 4px;
  font-weight: 600;
}

.salary-clickable-val {
  color: #58a6ff !important;
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 3px;
}

.snap-label {
  font-size: 0.7rem;
  color: #8b949e;
  text-transform: uppercase;
  font-weight: 600;
}

.snap-value {
  font-size: 0.85rem;
  font-weight: 600;
  color: #f0f6fc;
}

.demand-high {
  color: #3fb950;
}

.employers-text {
  font-size: 0.78rem;
  color: #c9d1d9;
}

/* Progress Box */
.progress-box {
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 10px;
  padding: 16px;
}

.progress-box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  margin-bottom: 10px;
}

.progress-title {
  font-weight: 600;
  color: #f0f6fc;
}

.progress-count {
  color: #8b949e;
  font-size: 0.8rem;
}

.progress-bar-bg {
  width: 100%;
  height: 8px;
  background: #21262d;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-bar-fill {
  height: 100%;
  background: #3fb950;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: #8b949e;
  margin-bottom: 8px;
}

.progress-percent-text {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  color: #f0f6fc;
}

.storage-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #3fb950;
  display: inline-block;
  box-shadow: 0 0 6px rgba(63, 185, 80, 0.6);
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.storage-status-dot.active {
  transform: scale(1.5);
  background: #58a6ff;
}

.save-feedback-msg {
  color: #58a6ff;
  font-weight: 700;
}

.progress-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.track-action-btn {
  background: #21262d;
  border: 1px solid #30363d;
  color: #c9d1d9;
  cursor: pointer;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 4px;
  transition: all 0.15s ease;
}

.track-action-btn:hover {
  background: #30363d;
  color: #3fb950;
  border-color: #3fb950;
}

.reset-progress-btn {
  background: none;
  border: none;
  color: #f85149;
  cursor: pointer;
  font-size: 0.72rem;
  padding: 0;
  text-decoration: underline;
  transition: opacity 0.15s ease;
}

.reset-progress-btn:hover {
  opacity: 0.8;
}

.storage-indicator-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.7rem;
  color: #8b949e;
  padding-top: 8px;
  border-top: 1px solid #21262d;
}

.storage-icon {
  font-size: 0.8rem;
}

/* Toolbar */
.roadmap-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 10px;
  padding: 12px 18px;
  margin-bottom: 24px;
}

.toolbar-search {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  max-width: 450px;
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 8px;
  padding: 6px 12px;
}

.search-icon {
  font-size: 0.9rem;
  opacity: 0.7;
}

.roadmap-search-input {
  background: transparent;
  border: none;
  outline: none;
  color: #f0f6fc;
  font-size: 0.85rem;
  width: 100%;
}

.clear-search-btn {
  background: none;
  border: none;
  color: #8b949e;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0 4px;
}

.toolbar-filters {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-label {
  font-size: 0.8rem;
  color: #8b949e;
  font-weight: 600;
}

.filter-pills {
  display: flex;
  gap: 6px;
}

.filter-pill {
  background: #21262d;
  border: 1px solid #30363d;
  color: #8b949e;
  padding: 4px 10px;
  border-radius: 14px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.filter-pill:hover {
  color: #f0f6fc;
  border-color: #484f58;
}

.filter-pill.active {
  background: #30363d;
  color: #f0f6fc;
  border-color: #58a6ff;
}

/* Difficulty Indicator Dot & Pills */
.difficulty-indicator-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
  vertical-align: middle;
}

.difficulty-indicator-dot.beginner {
  background: #3fb950;
  box-shadow: 0 0 5px rgba(63, 185, 80, 0.6);
}

.difficulty-indicator-dot.intermediate {
  background: #d29922;
  box-shadow: 0 0 5px rgba(210, 153, 34, 0.6);
}

.difficulty-indicator-dot.advanced {
  background: #f85149;
  box-shadow: 0 0 5px rgba(248, 81, 73, 0.6);
}

.diff-count-pill {
  font-size: 0.68rem;
  opacity: 0.85;
  margin-left: 5px;
  padding: 1px 5px;
  background: rgba(255, 255, 255, 0.09);
  border-radius: 8px;
}

.diff-pill-beginner.active {
  border-color: #3fb950;
  background: rgba(46, 160, 67, 0.18);
  color: #3fb950;
}

.diff-pill-intermediate.active {
  border-color: #d29922;
  background: rgba(210, 153, 34, 0.18);
  color: #e3b341;
}

.diff-pill-advanced.active {
  border-color: #f85149;
  background: rgba(248, 81, 73, 0.18);
  color: #ff7b72;
}

/* Timeline Wrapper & Transition States */
.roadmap-timeline-wrapper {
  position: relative;
  min-height: 240px;
}

.roadmap-timeline {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
}

/* Cascading Entrance Animations for Learning Steps */
@keyframes stageEntrance {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.985);
  }
  60% {
    opacity: 0.9;
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes markerPop {
  0% {
    opacity: 0;
    transform: scale(0.65);
  }
  60% {
    transform: scale(1.15);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes lineDraw {
  0% {
    opacity: 0;
    transform: scaleY(0);
  }
  100% {
    opacity: 1;
    transform: scaleY(1);
  }
}

.timeline-stage-card {
  display: flex;
  gap: 20px;
  position: relative;
  animation: stageEntrance 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: calc(var(--stage-index, 0) * 85ms);
  will-change: transform, opacity;
}

/* Vue TransitionGroup Classes for Track Switching & Filter Updates */
.stage-cascade-enter-active {
  transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: calc(var(--stage-index, 0) * 75ms);
}

.stage-cascade-leave-active {
  transition: opacity 0.22s cubic-bezier(0.4, 0, 1, 1), transform 0.22s cubic-bezier(0.4, 0, 1, 1);
  position: absolute;
  width: 100%;
  pointer-events: none;
}

.stage-cascade-enter-from {
  opacity: 0;
  transform: translateY(24px) scale(0.98);
}

.stage-cascade-leave-to {
  opacity: 0;
  transform: translateY(-16px) scale(0.98);
}

.stage-cascade-move {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Track Hero Card Transition */
.track-hero-fade-enter-active,
.track-hero-fade-leave-active {
  transition: opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1), transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

.track-hero-fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.track-hero-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Marker Column */
.stage-marker-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 36px;
}

.stage-checkbox {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #161b22;
  border: 2px solid #30363d;
  color: #8b949e;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 2;
  animation: markerPop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  animation-delay: calc(var(--stage-index, 0) * 85ms + 40ms);
}

.stage-checkbox:hover {
  border-color: #58a6ff;
  color: #f0f6fc;
  transform: scale(1.08);
}

.timeline-stage-card.is-completed .stage-checkbox {
  background: #238636;
  border-color: #3fb950;
  color: #ffffff;
}

.stage-connecting-line {
  width: 2px;
  flex: 1;
  background: #30363d;
  margin: 6px 0;
  transform-origin: top;
  animation: lineDraw 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: calc(var(--stage-index, 0) * 85ms + 100ms);
}

.timeline-stage-card.is-completed .stage-connecting-line {
  background: #238636;
}

/* Stage Main Card */
.stage-main-card {
  flex: 1;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 12px;
  padding: 20px 24px;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
}

.stage-main-card:hover {
  border-color: #484f58;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.timeline-stage-card.is-completed .stage-main-card {
  border-color: rgba(63, 185, 80, 0.3);
}

.stage-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 8px;
}

.stage-title-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.stage-header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.step-toggle-btn {
  background: #21262d;
  border: 1px solid #30363d;
  color: #8b949e;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.step-toggle-btn:hover {
  border-color: #58a6ff;
  color: #f0f6fc;
  background: #30363d;
}

.step-toggle-btn.is-completed {
  background: rgba(35, 134, 54, 0.2);
  border-color: #3fb950;
  color: #3fb950;
}

.step-toggle-btn.is-completed:hover {
  background: rgba(248, 81, 73, 0.15);
  border-color: #f85149;
  color: #f85149;
}

.stage-difficulty-tag {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  padding: 2px 8px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.stage-difficulty-tag.diff-beginner {
  background: rgba(46, 160, 67, 0.15);
  border: 1px solid rgba(63, 185, 80, 0.35);
  color: #3fb950;
}

.stage-difficulty-tag.diff-intermediate {
  background: rgba(210, 153, 34, 0.15);
  border: 1px solid rgba(210, 153, 34, 0.35);
  color: #e3b341;
}

.stage-difficulty-tag.diff-advanced {
  background: rgba(248, 81, 73, 0.15);
  border: 1px solid rgba(248, 81, 73, 0.35);
  color: #ff7b72;
}

.diff-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
}

.diff-beginner .diff-dot {
  background: #3fb950;
  box-shadow: 0 0 5px rgba(63, 185, 80, 0.7);
}

.diff-intermediate .diff-dot {
  background: #d29922;
  box-shadow: 0 0 5px rgba(210, 153, 34, 0.7);
}

.diff-advanced .diff-dot {
  background: #f85149;
  box-shadow: 0 0 5px rgba(248, 81, 73, 0.7);
}

.stage-level-tag {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 2px 8px;
  border-radius: 6px;
}

.level-entry { background: rgba(88, 166, 255, 0.15); color: #58a6ff; }
.level-mid { background: rgba(63, 185, 80, 0.15); color: #3fb950; }
.level-senior { background: rgba(210, 153, 34, 0.15); color: #d29922; }

.stage-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #f0f6fc;
  margin: 0;
}

.stage-timeframe {
  font-size: 0.75rem;
  color: #8b949e;
  background: #21262d;
  padding: 2px 8px;
  border-radius: 10px;
  white-space: nowrap;
}

.stage-description {
  font-size: 0.9rem;
  color: #8b949e;
  line-height: 1.5;
  margin: 0 0 14px 0;
}

/* Skills Chips */
.stage-skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 14px;
}

.skill-chip {
  background: #21262d;
  border: 1px solid #30363d;
  color: #c9d1d9;
  font-size: 0.75rem;
  padding: 3px 8px;
  border-radius: 6px;
  transition: all 0.15s ease;
}

.skill-chip.highlighted {
  background: rgba(63, 185, 80, 0.25);
  border-color: #3fb950;
  color: #3fb950;
  font-weight: 600;
}

/* Malaysian Context Callout */
.malaysia-context-box {
  background: #0d1117;
  border: 1px solid #30363d;
  border-left: 3px solid #3fb950;
  border-radius: 6px;
  padding: 10px 14px;
  margin-bottom: 16px;
}

.context-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: #3fb950;
  margin-bottom: 4px;
}

.context-text {
  font-size: 0.85rem;
  color: #8b949e;
  line-height: 1.45;
  margin: 0;
}

/* Stage Card Footer */
.stage-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid #21262d;
  flex-wrap: wrap;
  gap: 10px;
}

.footer-left-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.footer-completion-status {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 6px;
  background: #21262d;
  color: #8b949e;
  border: 1px solid #30363d;
}

.footer-completion-status.is-done {
  background: rgba(35, 134, 54, 0.15);
  border-color: rgba(63, 185, 80, 0.4);
  color: #3fb950;
}

.docs-reference-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #58a6ff;
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  transition: gap 0.15s ease;
}

.docs-reference-btn:hover {
  text-decoration: underline;
  gap: 9px;
}

.expand-details-btn {
  background: none;
  border: none;
  color: #8b949e;
  font-size: 0.8rem;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.15s ease;
}

.expand-details-btn:hover {
  color: #f0f6fc;
  background: #21262d;
}

.chevron {
  transition: transform 0.2s ease;
  font-size: 0.8rem;
}

.chevron.rotated {
  transform: rotate(180deg);
}

/* Expanded Drawer */
.stage-expanded-drawer {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed #30363d;
}

.expanded-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.expanded-col h5 {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #f0f6fc;
  margin: 0 0 8px 0;
}

.milestone-bullets {
  list-style: disc;
  padding-left: 18px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.milestone-bullets li {
  font-size: 0.8rem;
  color: #8b949e;
  line-height: 1.4;
}

.cert-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}

.cert-badge {
  background: #21262d;
  border: 1px solid #30363d;
  color: #d29922;
  font-size: 0.75rem;
  padding: 3px 8px;
  border-radius: 6px;
  font-weight: 600;
}

.target-roles-text {
  font-size: 0.8rem;
  color: #8b949e;
  margin: 0;
}

.mt-3 {
  margin-top: 12px !important;
}

/* Empty State */
.empty-roadmap-state {
  text-align: center;
  padding: 40px 20px;
  background: #161b22;
  border: 1px dashed #30363d;
  border-radius: 12px;
  color: #8b949e;
}

.reset-filter-link {
  background: #238636;
  border: none;
  color: #ffffff;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-top: 8px;
  cursor: pointer;
}

/* Bottom Advice Banner */
.roadmap-advice-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  background: linear-gradient(135deg, #161b22 0%, #0d1a10 100%);
  border: 1px solid rgba(46, 160, 67, 0.3);
  border-radius: 12px;
  padding: 20px 24px;
  margin-top: 32px;
}

.advice-content h4 {
  font-size: 1.05rem;
  font-weight: 700;
  color: #f0f6fc;
  margin: 0 0 6px 0;
}

.advice-content p {
  font-size: 0.85rem;
  color: #8b949e;
  margin: 0;
  line-height: 1.5;
  max-width: 680px;
}

.hub-link-btn {
  background: #2ea043;
  color: #ffffff !important;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.hub-link-btn:hover {
  background: #238636;
  box-shadow: 0 4px 12px rgba(46, 160, 67, 0.3);
}

/* Responsive */
@media (max-width: 900px) {
  .track-tabs {
    grid-template-columns: 1fr;
  }
  .salary-popover {
    width: 100%;
    max-width: 100%;
    left: 0 !important;
    right: 0 !important;
    transform: none !important;
  }
  .track-hero-content {
    grid-template-columns: 1fr;
  }
  .market-snapshot-grid {
    grid-template-columns: 1fr;
  }
  .expanded-grid {
    grid-template-columns: 1fr;
  }
  .roadmap-toolbar {
    flex-direction: column;
    align-items: stretch;
  }
  .toolbar-search {
    max-width: none;
  }
  .roadmap-advice-banner {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (prefers-reduced-motion: reduce) {
  .timeline-stage-card,
  .stage-checkbox,
  .stage-connecting-line,
  .stage-cascade-enter-active,
  .stage-cascade-leave-active,
  .track-hero-fade-enter-active,
  .track-hero-fade-leave-active {
    animation: none !important;
    transition: none !important;
  }
}
</style>
