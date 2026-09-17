<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { withBase } from "vitepress";
import { useBookmarks, detectArticleCategory } from "../composables/useBookmarks";
import type { BookmarkedArticle } from "../types/bookmark";

const { bookmarks, totalBookmarks, removeBookmark, clearAllBookmarks } = useBookmarks();

const activeFilter = ref("all");
const searchQuery = ref("");
const sortBy = ref<"newest" | "oldest" | "title" | "category">("newest");
const viewMode = ref<"grid" | "list">("grid");
const showClearConfirm = ref(false);
const copiedNotification = ref(false);

onMounted(() => {
  if (typeof window !== "undefined") {
    const savedMode = localStorage.getItem("techmy_bookmark_view_mode");
    if (savedMode === "list" || savedMode === "grid") {
      viewMode.value = savedMode;
    }
  }
});

function setViewMode(mode: "grid" | "list") {
  viewMode.value = mode;
  if (typeof window !== "undefined") {
    localStorage.setItem("techmy_bookmark_view_mode", mode);
  }
}

const majorCategories = [
  { id: "all", label: "All Saved", icon: "📚" },
  { id: "my", label: "Malaysia 🇲🇾", icon: "🇲🇾", match: ["local-resources", "malaysian", "malaysia", "compliance", "communities", "careers"] },
  { id: "system-design", label: "System Design", icon: "📐", match: ["system-design", "system design", "tooling", "architecture"] },
  { id: "ai", label: "AI", icon: "🤖", match: ["ai", "artificial intelligence", "ml"] },
  { id: "devops", label: "DevOps", icon: "⚡", match: ["devops", "infrastructure", "sre", "docker", "ops"] },
  { id: "cyber", label: "Cybersecurity", icon: "🛡️", match: ["cybersecurity", "security", "rmit", "owasp", "sec"] },
  { id: "swe", label: "Software Engineering", icon: "💻", match: ["software engineering", "swe", "clean code"] },
  { id: "data", label: "Data Engineering", icon: "📊", match: ["data engineering", "data", "sql", "etl"] }
];

function getMajorCategoryCount(catId: string): number {
  if (catId === "all") return bookmarks.value.length;
  const catObj = majorCategories.find(c => c.id === catId);
  if (!catObj || !catObj.match) return 0;
  return bookmarks.value.filter(item => {
    const text = ((item.category || "") + " " + (item.path || "")).toLowerCase();
    return catObj.match.some(m => text.includes(m));
  }).length;
}

const availableCategories = computed(() => {
  const counts: Record<string, number> = {};
  bookmarks.value.forEach((b) => {
    const cat = b.category || detectArticleCategory(b.path).name;
    counts[cat] = (counts[cat] || 0) + 1;
  });
  return Object.entries(counts).map(([name, count]) => ({ name, count }));
});

const filteredAndSortedBookmarks = computed(() => {
  let list = [...bookmarks.value];

  // Category filter
  if (activeFilter.value !== "all") {
    const catObj = majorCategories.find(c => c.id === activeFilter.value);
    if (catObj && catObj.match) {
      list = list.filter(item => {
        const text = ((item.category || "") + " " + (item.path || "")).toLowerCase();
        return catObj.match.some(m => text.includes(m));
      });
    } else {
      list = list.filter((b) => {
        const cat = b.category || detectArticleCategory(b.path).name;
        return cat === activeFilter.value;
      });
    }
  }

  // Text search filter
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase();
    list = list.filter((b) => {
      const cat = b.category || detectArticleCategory(b.path).name;
      return (
        b.title.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        cat.toLowerCase().includes(q) ||
        b.path.toLowerCase().includes(q)
      );
    });
  }

  // Sorting
  list.sort((a, b) => {
    if (sortBy.value === "newest") {
      return (b.bookmarkedAt || 0) - (a.bookmarkedAt || 0);
    }
    if (sortBy.value === "oldest") {
      return (a.bookmarkedAt || 0) - (b.bookmarkedAt || 0);
    }
    if (sortBy.value === "title") {
      return a.title.localeCompare(b.title);
    }
    if (sortBy.value === "category") {
      const catA = a.category || detectArticleCategory(a.path).name;
      const catB = b.category || detectArticleCategory(b.path).name;
      return catA.localeCompare(catB);
    }
    return 0;
  });

  return list;
});

function formatSavedDate(timestamp: number): string {
  if (!timestamp) return "Recently saved";
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString("en-MY", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function handleRemove(item: BookmarkedArticle) {
  removeBookmark(item.id || item.path);
}

function handleConfirmClear() {
  clearAllBookmarks();
  showClearConfirm.value = false;
}

function copyReadingList() {
  if (typeof navigator === "undefined" || !navigator.clipboard) return;
  const text = bookmarks.value
    .map((b, i) => `${i + 1}. [${b.category}] ${b.title} (${b.path})`)
    .join("\n");

  navigator.clipboard.writeText(text).then(() => {
    copiedNotification.value = true;
    setTimeout(() => {
      copiedNotification.value = false;
    }, 2200);
  });
}

function exportBookmarksJson() {
  if (typeof window === "undefined") return;
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bookmarks.value, null, 2));
  const dlAnchor = document.createElement("a");
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", `techmy-saved-articles-${new Date().toISOString().slice(0, 10)}.json`);
  dlAnchor.click();
}
</script>

<template>
  <div id="bookmarks-view-root" class="bookmarks-view-container">
    <!-- Top Stats & Storage Status Card -->
    <div class="view-header-banner">
      <div class="banner-stat-group">
        <div class="stat-pill">
          <span class="stat-value" id="bookmarks-count-display">{{ totalBookmarks }}</span>
          <span class="stat-title">{{ totalBookmarks === 1 ? 'Article Saved' : 'Articles Saved' }}</span>
        </div>

        <div class="stat-divider"></div>

        <div class="stat-pill">
          <span class="stat-value">{{ availableCategories.length }}</span>
          <span class="stat-title">Tracks</span>
        </div>

        <div class="stat-divider"></div>

        <div class="storage-indicator-box">
          <span class="storage-badge-dot"></span>
          <span class="storage-text">Stored in <code>localStorage</code></span>
        </div>
      </div>

      <div class="banner-actions">
        <button
          v-if="totalBookmarks > 0"
          id="export-reading-list-btn"
          type="button"
          class="banner-btn secondary"
          title="Copy markdown reading list to clipboard"
          aria-label="Copy markdown reading list"
          @click="copyReadingList"
        >
          <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
            <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25v-7.5z" />
            <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25v-7.5zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25h-7.5z" />
          </svg>
          <span>{{ copiedNotification ? "Copied to Clipboard!" : "Copy List" }}</span>
        </button>

        <button
          v-if="totalBookmarks > 0"
          id="export-json-btn"
          type="button"
          class="banner-btn secondary"
          title="Download saved articles backup as JSON"
          aria-label="Download backup JSON"
          @click="exportBookmarksJson"
        >
          <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
            <path d="M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14H2.75z" />
            <path d="M7.25 7.689V2a.75.75 0 0 1 1.5 0v5.689l1.97-1.969a.749.749 0 1 1 1.06 1.06l-3.25 3.25a.749.749 0 0 1-1.06 0L4.22 6.78a.749.749 0 1 1 1.06-1.06l1.97 1.969z" />
          </svg>
          <span>Backup JSON</span>
        </button>

        <button
          v-if="totalBookmarks > 0 && !showClearConfirm"
          id="trigger-clear-all-btn"
          type="button"
          class="banner-btn danger"
          aria-label="Clear all saved articles"
          @click="showClearConfirm = true"
        >
          Clear All
        </button>
      </div>
    </div>

    <!-- Confirm Clear Banner -->
    <div v-if="showClearConfirm" id="clear-confirm-dialog" class="clear-confirm-banner">
      <span class="confirm-message">
        Are you sure you want to remove all <strong>{{ totalBookmarks }}</strong> saved articles from your local storage?
      </span>
      <div class="confirm-btn-group">
        <button
          id="confirm-clear-action-btn"
          type="button"
          class="confirm-btn-primary danger"
          @click="handleConfirmClear"
        >
          Yes, Remove All
        </button>
        <button
          id="cancel-clear-action-btn"
          type="button"
          class="confirm-btn-secondary"
          @click="showClearConfirm = false"
        >
          Cancel
        </button>
      </div>
    </div>

    <!-- Controls Toolbar (Search, Filter, Sort, View Toggle) -->
    <div v-if="bookmarks.length > 0" class="view-controls-toolbar">
      <!-- Search Box -->
      <div class="toolbar-search-box">
        <svg class="search-icon" viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
        </svg>
        <input
          id="view-search-input"
          v-model="searchQuery"
          type="text"
          placeholder="Filter saved articles by title or keyword..."
          class="search-input"
          aria-label="Filter saved articles"
        />
        <button
          v-if="searchQuery"
          type="button"
          class="clear-search-btn"
          aria-label="Clear search"
          @click="searchQuery = ''"
        >
          ×
        </button>
      </div>

      <div class="toolbar-right-group">
        <!-- Sort Dropdown -->
        <div class="sort-selector-group">
          <label for="sort-bookmarks-select" class="sort-label">Sort:</label>
          <select
            id="sort-bookmarks-select"
            v-model="sortBy"
            class="sort-select"
            aria-label="Sort bookmarked articles"
          >
            <option value="newest">Recently Saved</option>
            <option value="oldest">Oldest Saved</option>
            <option value="title">Title (A-Z)</option>
            <option value="category">Track / Category</option>
          </select>
        </div>

        <!-- View Mode Switcher (Grid vs List) -->
        <div class="view-mode-toggle" role="group" aria-label="View layout toggle">
          <button
            id="view-mode-grid-btn"
            type="button"
            class="mode-btn"
            :class="{ active: viewMode === 'grid' }"
            title="Grid card view"
            aria-label="Switch to grid card view"
            @click="setViewMode('grid')"
          >
            <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
              <path d="M1.5 1.5A1.5 1.5 0 0 1 3 0h2A1.5 1.5 0 0 1 6.5 1.5v2A1.5 1.5 0 0 1 5 5H3A1.5 1.5 0 0 1 1.5 3.5v-2zM3 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2A.5.5 0 0 0 5 1H3zm8.5.5A1.5 1.5 0 0 1 13 0h2a1.5 1.5 0 0 1 1.5 1.5v2A1.5 1.5 0 0 1 15 5h-2a1.5 1.5 0 0 1-1.5-1.5v-2zm1.5-.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-2zM1.5 11.5A1.5 1.5 0 0 1 3 10h2a1.5 1.5 0 0 1 1.5 1.5v2A1.5 1.5 0 0 1 5 15H3a1.5 1.5 0 0 1-1.5-1.5v-2zm1.5-.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5H3zm8.5.5a1.5 1.5 0 0 1 1.5-1.5h2a1.5 1.5 0 0 1 1.5 1.5v2a1.5 1.5 0 0 1-1.5 1.5h-2a1.5 1.5 0 0 1-1.5-1.5v-2zm1.5-.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-2z"/>
            </svg>
            <span class="mode-label">Grid</span>
          </button>

          <button
            id="view-mode-list-btn"
            type="button"
            class="mode-btn"
            :class="{ active: viewMode === 'list' }"
            title="Compact list view"
            aria-label="Switch to compact list view"
            @click="setViewMode('list')"
          >
            <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
              <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
            <span class="mode-label">List</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Category Filter Tabs -->
    <div v-if="bookmarks.length > 0" class="category-filter-bar" role="toolbar" aria-label="Filter saved bookmarks by category">
      <button
        v-for="cat in majorCategories"
        :key="cat.id"
        :id="`filter-cat-${cat.id}`"
        type="button"
        class="cat-pill-btn"
        :class="{ active: activeFilter === cat.id }"
        @click="activeFilter = cat.id"
      >
        <span class="cat-pill-icon">{{ cat.icon }}</span>
        <span>{{ cat.label }}</span>
        <span class="cat-count-badge">{{ getMajorCategoryCount(cat.id) }}</span>
      </button>
    </div>

    <!-- Empty State: Zero Bookmarks in localStorage -->
    <div v-if="bookmarks.length === 0" id="bookmarks-view-empty" class="view-empty-state">
      <div class="empty-icon-shield">
        <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      </div>
      <h3 class="empty-title">No Bookmarked Articles Yet</h3>
      <p class="empty-description">
        Articles you bookmark while browsing TechMY will appear exclusively in this view, saved locally in your browser for fast offline reference.
      </p>

      <div class="how-it-works-box">
        <span class="step-badge">Quick Tip</span>
        <p class="step-text">
          Navigate to any article guide and click the <strong>Bookmark Article</strong> button at the top or bottom of the page to favorite it.
        </p>
      </div>

      <div class="empty-quick-tracks">
        <h4 class="tracks-title">Start Exploring Core Curriculum Guides:</h4>
        <div class="tracks-grid">
          <a :href="withBase('/software-engineering/clean-code')" class="track-explore-card">
            <div class="track-card-top">
              <span class="track-tag-pill swe">SWE</span>
              <span class="track-arrow">→</span>
            </div>
            <h5>Software Engineering: Clean Code</h5>
            <p>Foundations, function scopes, and Martin Fowler refactoring patterns.</p>
          </a>

          <a :href="withBase('/cybersecurity/secure-coding')" class="track-explore-card">
            <div class="track-card-top">
              <span class="track-tag-pill sec">SEC</span>
              <span class="track-arrow">→</span>
            </div>
            <h5>Cybersecurity: Secure Coding</h5>
            <p>OWASP Top 10 mitigation, Malaysian BNM RMiT standards, and defensive hygiene.</p>
          </a>

          <a :href="withBase('/data-engineering/pipelines-etl')" class="track-explore-card">
            <div class="track-card-top">
              <span class="track-tag-pill data">DATA</span>
              <span class="track-arrow">→</span>
            </div>
            <h5>Data Engineering: Pipelines & ETL</h5>
            <p>Batch processing, event streaming, data modeling, and modern ELT architectures.</p>
          </a>

          <a :href="withBase('/devops-infrastructure/container-docker')" class="track-explore-card">
            <div class="track-card-top">
              <span class="track-tag-pill ops">OPS</span>
              <span class="track-arrow">→</span>
            </div>
            <h5>DevOps: Docker & Containers</h5>
            <p>Multi-stage Docker builds, container security, and cloud deployment pipelines.</p>
          </a>
        </div>
      </div>
    </div>

    <!-- Empty Search Results State -->
    <div v-else-if="filteredAndSortedBookmarks.length === 0" id="bookmarks-view-no-match" class="no-results-state">
      <p class="no-results-text">No saved articles match "<strong>{{ searchQuery }}</strong>" in this category.</p>
      <button
        id="reset-search-filter-btn"
        type="button"
        class="reset-btn"
        @click="searchQuery = ''; activeFilter = 'all'"
      >
        Show All Saved Articles
      </button>
    </div>

    <!-- Active Bookmarks View: Grid Cards Mode -->
    <div
      v-else-if="viewMode === 'grid'"
      id="bookmarks-grid-view"
      class="bookmarks-cards-grid"
    >
      <div
        v-for="(item, idx) in filteredAndSortedBookmarks"
        :key="item.id || item.path"
        :id="`saved-card-${idx}`"
        class="article-saved-card"
      >
        <div class="card-header-row">
          <span
            class="article-track-chip"
            :style="{
              borderColor: `${detectArticleCategory(item.path).color}40`,
              color: detectArticleCategory(item.path).color,
              backgroundColor: `${detectArticleCategory(item.path).color}15`
            }"
          >
            {{ item.category || detectArticleCategory(item.path).name }}
          </span>

          <span class="saved-timestamp" :title="`Saved on ${new Date(item.bookmarkedAt).toLocaleString()}`">
            {{ formatSavedDate(item.bookmarkedAt) }}
          </span>
        </div>

        <a :href="withBase(item.path)" class="card-article-title">
          {{ item.title }}
        </a>

        <p v-if="item.description" class="card-article-desc">
          {{ item.description }}
        </p>

        <div class="card-footer-row">
          <a :href="withBase(item.path)" class="card-read-action" :id="`read-article-link-${idx}`">
            <span>Read Article</span>
            <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor">
              <path fill-rule="evenodd" d="M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06l2.97-2.97H3.75a.75.75 0 0 1 0-1.5h7.44L8.22 4.03a.75.75 0 0 1 0-1.06z" clip-rule="evenodd" />
            </svg>
          </a>

          <button
            :id="`delete-bookmark-card-btn-${idx}`"
            type="button"
            class="card-remove-btn"
            title="Remove from bookmarks"
            :aria-label="`Remove ${item.title} from bookmarks`"
            @click="handleRemove(item)"
          >
            <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor">
              <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06z" />
            </svg>
            <span class="remove-label">Remove</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Active Bookmarks View: Compact Table / List Mode -->
    <div
      v-else
      id="bookmarks-list-view"
      class="bookmarks-compact-list"
    >
      <div class="list-header-row">
        <span class="col-title">Saved Article</span>
        <span class="col-track">Track</span>
        <span class="col-date">Date Saved</span>
        <span class="col-actions">Actions</span>
      </div>

      <div
        v-for="(item, idx) in filteredAndSortedBookmarks"
        :key="item.id || item.path"
        :id="`saved-row-${idx}`"
        class="list-item-row"
      >
        <div class="col-title-body">
          <a :href="withBase(item.path)" class="list-article-link">
            {{ item.title }}
          </a>
          <p v-if="item.description" class="list-article-sub">
            {{ item.description }}
          </p>
        </div>

        <div class="col-track-body">
          <span
            class="article-track-chip compact"
            :style="{
              borderColor: `${detectArticleCategory(item.path).color}40`,
              color: detectArticleCategory(item.path).color,
              backgroundColor: `${detectArticleCategory(item.path).color}15`
            }"
          >
            {{ item.category || detectArticleCategory(item.path).name }}
          </span>
        </div>

        <div class="col-date-body">
          <span class="saved-timestamp">{{ formatSavedDate(item.bookmarkedAt) }}</span>
        </div>

        <div class="col-actions-body">
          <a :href="withBase(item.path)" class="table-read-btn" title="Open article">
            Read
            <svg viewBox="0 0 16 16" width="11" height="11" fill="currentColor">
              <path fill-rule="evenodd" d="M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06l2.97-2.97H3.75a.75.75 0 0 1 0-1.5h7.44L8.22 4.03a.75.75 0 0 1 0-1.06z" clip-rule="evenodd" />
            </svg>
          </a>

          <button
            :id="`delete-bookmark-row-btn-${idx}`"
            type="button"
            class="table-delete-btn"
            title="Remove from saved articles"
            :aria-label="`Remove ${item.title}`"
            @click="handleRemove(item)"
          >
            <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor">
              <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bookmarks-view-container {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Banner */
.view-header-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 12px;
  padding: 16px 20px;
}

.banner-stat-group {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}

.stat-pill {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: #3fb950;
  line-height: 1.1;
}

.stat-title {
  font-size: 0.74rem;
  color: #8b949e;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.stat-divider {
  width: 1px;
  height: 32px;
  background-color: #30363d;
}

.storage-indicator-box {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background-color: #0d1117;
  border: 1px solid #30363d;
  border-radius: 6px;
  font-size: 0.75rem;
  color: #8b949e;
}

.storage-badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #3fb950;
  box-shadow: 0 0 6px rgba(63, 185, 80, 0.6);
}

.storage-indicator-box code {
  font-size: 0.72rem;
  color: #c9d1d9;
  background: transparent;
  padding: 0;
}

.banner-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.banner-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  min-height: 34px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid #30363d;
  background-color: #21262d;
  color: #c9d1d9;
  transition: all 0.2s ease;
  user-select: none;
}

.banner-btn:hover {
  border-color: #3fb950;
  color: #3fb950;
}

.banner-btn.danger {
  color: #f85149;
}

.banner-btn.danger:hover {
  background-color: rgba(248, 81, 73, 0.15);
  border-color: #f85149;
}

/* Clear Confirmation */
.clear-confirm-banner {
  background-color: rgba(248, 81, 73, 0.12);
  border: 1px solid rgba(248, 81, 73, 0.35);
  border-radius: 8px;
  padding: 12px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.confirm-message {
  font-size: 0.85rem;
  color: #f85149;
}

.confirm-btn-group {
  display: flex;
  gap: 8px;
}

.confirm-btn-primary.danger {
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  background-color: #da3633;
  border: 1px solid #f85149;
  color: #ffffff;
}

.confirm-btn-secondary {
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  background-color: #21262d;
  border: 1px solid #30363d;
  color: #c9d1d9;
}

/* Controls Toolbar */
.view-controls-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.toolbar-search-box {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 240px;
  max-width: 480px;
}

.search-icon {
  position: absolute;
  left: 10px;
  color: #8b949e;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 7px 32px 7px 32px;
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 6px;
  color: #f0f6fc;
  font-size: 0.84rem;
  transition: border-color 0.2s ease;
}

.search-input:focus {
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
  padding: 2px 6px;
}

.toolbar-right-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sort-selector-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.sort-label {
  font-size: 0.78rem;
  color: #8b949e;
  font-weight: 500;
}

.sort-select {
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 6px;
  color: #c9d1d9;
  font-size: 0.8rem;
  padding: 6px 10px;
  cursor: pointer;
}

.sort-select:focus {
  outline: none;
  border-color: #3fb950;
}

.view-mode-toggle {
  display: inline-flex;
  align-items: center;
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 6px;
  padding: 2px;
}

.mode-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  border: none;
  background: transparent;
  color: #8b949e;
  font-size: 0.76rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.mode-btn:hover {
  color: #f0f6fc;
}

.mode-btn.active {
  background-color: #21262d;
  color: #3fb950;
}

/* Category Filter Bar */
.category-filter-bar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

.cat-pill-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 18px;
  background-color: #161b22;
  border: 1px solid #30363d;
  color: #8b949e;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.cat-pill-icon {
  font-size: 0.85rem;
}

.cat-count-badge {
  font-size: 0.7rem;
  padding: 1px 6px;
  border-radius: 10px;
  background-color: #0d1117;
  border: 1px solid #30363d;
  color: inherit;
}

.cat-pill-btn:hover {
  border-color: #8b949e;
  color: #f0f6fc;
}

.cat-pill-btn.active {
  background-color: rgba(46, 160, 67, 0.15);
  border-color: #3fb950;
  color: #3fb950;
}

.cat-pill-btn.active .cat-count-badge {
  background-color: rgba(63, 185, 80, 0.15);
  border-color: rgba(63, 185, 80, 0.3);
}

/* Empty State */
.view-empty-state {
  text-align: center;
  padding: 44px 20px;
  background-color: #161b22;
  border: 1px dashed #30363d;
  border-radius: 12px;
}

.empty-icon-shield {
  width: 68px;
  height: 68px;
  margin: 0 auto 16px;
  border-radius: 50%;
  background-color: #21262d;
  border: 1px solid #30363d;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b949e;
}

.empty-title {
  margin: 0 0 6px;
  font-size: 1.25rem;
  color: #f0f6fc;
  font-weight: 700;
}

.empty-description {
  max-width: 520px;
  margin: 0 auto 20px;
  font-size: 0.88rem;
  color: #8b949e;
  line-height: 1.5;
}

.how-it-works-box {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background-color: #0d1117;
  border: 1px solid #30363d;
  border-radius: 8px;
  padding: 8px 16px;
  margin-bottom: 32px;
  max-width: 550px;
  text-align: left;
}

.step-badge {
  background-color: rgba(46, 160, 67, 0.2);
  color: #3fb950;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  white-space: nowrap;
}

.step-text {
  margin: 0;
  font-size: 0.8rem;
  color: #c9d1d9;
  line-height: 1.4;
}

.empty-quick-tracks {
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
}

.tracks-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: #8b949e;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 12px;
}

.tracks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
}

.track-explore-card {
  background-color: #21262d;
  border: 1px solid #30363d;
  border-radius: 10px;
  padding: 14px 16px;
  text-decoration: none;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
}

.track-explore-card:hover {
  border-color: #3fb950;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(46, 160, 67, 0.12);
}

.track-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.track-tag-pill {
  font-size: 0.68rem;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 4px;
}

.track-tag-pill.swe {
  background-color: rgba(63, 185, 80, 0.2);
  color: #3fb950;
}

.track-tag-pill.sec {
  background-color: rgba(240, 136, 62, 0.2);
  color: #f0883e;
}

.track-tag-pill.data {
  background-color: rgba(88, 166, 255, 0.2);
  color: #58a6ff;
}

.track-tag-pill.ops {
  background-color: rgba(210, 153, 34, 0.2);
  color: #d29922;
}

.track-arrow {
  color: #8b949e;
  font-size: 0.9rem;
}

.track-explore-card h5 {
  margin: 0 0 4px;
  font-size: 0.92rem;
  color: #f0f6fc;
}

.track-explore-card p {
  margin: 0;
  font-size: 0.78rem;
  color: #8b949e;
  line-height: 1.4;
}

/* No Search Results */
.no-results-state {
  text-align: center;
  padding: 40px 10px;
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 10px;
}

.no-results-text {
  font-size: 0.9rem;
  color: #8b949e;
  margin-bottom: 12px;
}

.reset-btn {
  padding: 6px 14px;
  border-radius: 6px;
  background-color: #21262d;
  border: 1px solid #30363d;
  color: #3fb950;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
}

/* Grid Cards Mode */
.bookmarks-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

.article-saved-card {
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.article-saved-card:hover {
  border-color: rgba(63, 185, 80, 0.45);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

.card-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  gap: 8px;
}

.article-track-chip {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid;
  white-space: nowrap;
}

.article-track-chip.compact {
  font-size: 0.7rem;
  padding: 1px 6px;
}

.saved-timestamp {
  font-size: 0.72rem;
  color: #8b949e;
  white-space: nowrap;
}

.card-article-title {
  font-size: 1.02rem;
  font-weight: 700;
  color: #f0f6fc;
  text-decoration: none;
  line-height: 1.35;
  margin-bottom: 8px;
  transition: color 0.15s ease;
}

.card-article-title:hover {
  color: #3fb950;
}

.card-article-desc {
  font-size: 0.8rem;
  color: #8b949e;
  line-height: 1.45;
  margin: 0 0 16px;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid #21262d;
}

.card-read-action {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #3fb950;
  font-size: 0.82rem;
  font-weight: 600;
  text-decoration: none;
}

.card-read-action:hover {
  text-decoration: underline;
}

.card-remove-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  color: #8b949e;
  font-size: 0.76rem;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 4px;
  transition: all 0.15s ease;
}

.card-remove-btn:hover {
  color: #f85149;
  background-color: rgba(248, 81, 73, 0.12);
}

/* Compact Table / List Mode */
.bookmarks-compact-list {
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 10px;
  overflow: hidden;
}

.list-header-row {
  display: grid;
  grid-template-columns: 1fr 180px 110px 100px;
  gap: 12px;
  padding: 10px 16px;
  background-color: #0d1117;
  border-bottom: 1px solid #30363d;
  font-size: 0.75rem;
  font-weight: 700;
  color: #8b949e;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.list-item-row {
  display: grid;
  grid-template-columns: 1fr 180px 110px 100px;
  gap: 12px;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #21262d;
  transition: background-color 0.15s ease;
}

.list-item-row:last-child {
  border-bottom: none;
}

.list-item-row:hover {
  background-color: rgba(46, 160, 67, 0.04);
}

.col-title-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.list-article-link {
  font-size: 0.92rem;
  font-weight: 600;
  color: #f0f6fc;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.15s ease;
}

.list-article-link:hover {
  color: #3fb950;
}

.list-article-sub {
  margin: 0;
  font-size: 0.76rem;
  color: #8b949e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.col-actions-body {
  display: flex;
  align-items: center;
  gap: 6px;
}

.table-read-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 4px;
  background-color: #21262d;
  border: 1px solid #30363d;
  color: #3fb950;
  font-size: 0.75rem;
  font-weight: 600;
  text-decoration: none;
}

.table-read-btn:hover {
  background-color: rgba(46, 160, 67, 0.15);
  border-color: #3fb950;
}

.table-delete-btn {
  background: transparent;
  border: none;
  color: #8b949e;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.table-delete-btn:hover {
  color: #f85149;
  background-color: rgba(248, 81, 73, 0.12);
}

@media (max-width: 768px) {
  .list-header-row {
    display: none;
  }
  .list-item-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  .col-actions-body {
    justify-content: flex-end;
  }
  .view-controls-toolbar {
    flex-direction: column;
    align-items: stretch;
  }
  .toolbar-search-box {
    max-width: 100%;
  }
  .toolbar-right-group {
    justify-content: space-between;
  }
}
</style>
