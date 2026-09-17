<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { withBase } from "vitepress";
import { useBookmarks, detectArticleCategory } from "../composables/useBookmarks";
import type { BookmarkedArticle } from "../types/bookmark";

const { bookmarks, totalBookmarks, isDrawerOpen, closeDrawer, removeBookmark, clearAllBookmarks } = useBookmarks();

const searchQuery = ref("");
const showClearConfirm = ref(false);
const activeCategory = ref<string>("all");

const drawerCategories = [
  { id: "all", label: "All" },
  { id: "my", label: "MY 🇲🇾", match: ["local-resources", "malaysian", "malaysia", "compliance", "communities", "careers"] },
  { id: "system-design", label: "System Design", match: ["system-design", "system design", "tooling", "architecture"] },
  { id: "ai", label: "AI", match: ["ai", "artificial intelligence", "ml"] },
  { id: "devops", label: "DevOps", match: ["devops", "infrastructure", "sre", "docker", "ops"] },
  { id: "cyber", label: "Cyber", match: ["cybersecurity", "security", "rmit", "owasp", "sec"] },
  { id: "swe", label: "SWE", match: ["software engineering", "swe", "clean code"] },
  { id: "data", label: "Data", match: ["data engineering", "data", "sql", "etl"] }
];

function getCategoryCount(catId: string): number {
  if (catId === "all") return bookmarks.value.length;
  const catObj = drawerCategories.find(c => c.id === catId);
  if (!catObj || !catObj.match) return 0;
  return bookmarks.value.filter(item => {
    const text = ((item.category || "") + " " + (item.path || "")).toLowerCase();
    return catObj.match.some(m => text.includes(m));
  }).length;
}

const filteredBookmarks = computed(() => {
  let list = bookmarks.value;
  if (activeCategory.value !== "all") {
    const catObj = drawerCategories.find(c => c.id === activeCategory.value);
    if (catObj && catObj.match) {
      list = list.filter(item => {
        const text = ((item.category || "") + " " + (item.path || "")).toLowerCase();
        return catObj.match.some(m => text.includes(m));
      });
    }
  }
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return list;
  return list.filter((item) => {
    return (
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.path.toLowerCase().includes(query)
    );
  });
});

function handleKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && isDrawerOpen.value) {
    closeDrawer();
  }
}

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

function handleArticleClick() {
  closeDrawer();
}

onMounted(() => {
  if (typeof window !== "undefined") {
    window.addEventListener("keydown", handleKeydown);
  }
});

onUnmounted(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("keydown", handleKeydown);
  }
});

// Watch drawer opening to reset search and confirmation
watch(isDrawerOpen, (open) => {
  if (open) {
    showClearConfirm.value = false;
    searchQuery.value = "";
    activeCategory.value = "all";
  }
});
</script>

<template>
  <div v-if="isDrawerOpen" id="bookmarks-drawer-container" class="bookmarks-drawer-overlay" @click.self="closeDrawer">
    <div
      id="bookmarks-drawer"
      class="bookmarks-drawer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bookmarks-drawer-title"
    >
      <!-- Header -->
      <div class="drawer-header">
        <div class="header-title-group">
          <div class="header-icon-box">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" class="header-bookmark-icon">
              <path d="M5 2h14a1 1 0 0 1 1 1v19.143a.5.5 0 0 1-.766.424L12 18.01l-7.234 4.557A.5.5 0 0 1 4 22.143V3a1 1 0 0 1 1-1z" />
            </svg>
          </div>
          <div>
            <h3 id="bookmarks-drawer-title" class="drawer-title">Favorited Articles</h3>
            <p class="drawer-subtitle">{{ totalBookmarks }} saved in browser storage</p>
          </div>
        </div>

        <div class="header-actions">
          <button
            v-if="totalBookmarks > 0 && !showClearConfirm"
            id="clear-all-bookmarks-btn"
            type="button"
            class="action-text-btn danger"
            title="Clear all bookmarks"
            @click="showClearConfirm = true"
          >
            Clear All
          </button>

          <button
            id="close-bookmarks-drawer-btn"
            type="button"
            class="close-drawer-btn"
            aria-label="Close saved articles drawer"
            @click="closeDrawer"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Confirmation Banner for Clear All -->
      <div v-if="showClearConfirm" id="clear-confirm-banner" class="clear-confirm-box">
        <span class="confirm-text">Remove all {{ totalBookmarks }} saved articles?</span>
        <div class="confirm-btns">
          <button
            id="confirm-clear-yes"
            type="button"
            class="confirm-btn danger"
            @click="handleConfirmClear"
          >
            Yes, Clear
          </button>
          <button
            id="confirm-clear-cancel"
            type="button"
            class="confirm-btn cancel"
            @click="showClearConfirm = false"
          >
            Cancel
          </button>
        </div>
      </div>

      <!-- Category Filter Pills in Drawer -->
      <div v-if="bookmarks.length > 1" class="drawer-category-bar" role="toolbar" aria-label="Filter saved bookmarks by category">
        <button
          v-for="cat in drawerCategories"
          :key="cat.id"
          :id="`drawer-cat-${cat.id}`"
          type="button"
          class="drawer-cat-btn"
          :class="{ active: activeCategory === cat.id }"
          @click="activeCategory = cat.id"
        >
          <span>{{ cat.label }}</span>
          <span class="drawer-cat-badge">{{ getCategoryCount(cat.id) }}</span>
        </button>
      </div>

      <!-- Search Input if Multiple Items -->
      <div v-if="bookmarks.length > 2" class="drawer-search-bar">
        <div class="search-input-wrapper">
          <svg class="search-svg" viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
          <input
            id="bookmarks-search-input"
            v-model="searchQuery"
            type="text"
            placeholder="Filter saved articles..."
            aria-label="Filter saved articles"
            class="search-input"
          />
          <button
            v-if="searchQuery"
            type="button"
            class="search-clear-btn"
            aria-label="Clear filter"
            @click="searchQuery = ''"
          >
            ×
          </button>
        </div>
      </div>

      <!-- Content Body -->
      <div class="drawer-body">
        <!-- Empty State -->
        <div v-if="bookmarks.length === 0" id="bookmarks-empty-state" class="empty-state">
          <div class="empty-icon-circle">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <h4 class="empty-title">No Saved Articles Yet</h4>
          <p class="empty-desc">
            Click the <strong>Bookmark Article</strong> button at the top of any tech guide to save it here for quick reference anytime.
          </p>

          <div class="quick-explore-links">
            <span class="explore-label">Explore Curricula Tracks:</span>
            <div class="explore-chips">
              <a :href="withBase('/software-engineering/clean-code')" class="explore-chip" @click="handleArticleClick">
                Foundations & Clean Code
              </a>
              <a :href="withBase('/cybersecurity/secure-coding')" class="explore-chip" @click="handleArticleClick">
                OWASP Secure Coding
              </a>
              <a :href="withBase('/data-engineering/pipelines-etl')" class="explore-chip" @click="handleArticleClick">
                ETL Pipelines
              </a>
              <a :href="withBase('/devops-infrastructure/container-docker')" class="explore-chip" @click="handleArticleClick">
                Docker & Containers
              </a>
            </div>
          </div>
        </div>

        <!-- Filtered results empty -->
        <div v-else-if="filteredBookmarks.length === 0" class="no-filter-results">
          <p>No saved articles matching "{{ searchQuery }}".</p>
        </div>

        <!-- Bookmarks List -->
        <div v-else id="bookmarks-list" class="bookmarks-list">
          <div
            v-for="(item, idx) in filteredBookmarks"
            :key="item.id || item.path"
            :id="`bookmarked-item-${idx}`"
            class="bookmark-card"
          >
            <div class="card-main">
              <div class="card-meta-line">
                <span
                  class="card-track-badge"
                  :style="{
                    borderColor: `${detectArticleCategory(item.path).color}40`,
                    color: detectArticleCategory(item.path).color,
                    backgroundColor: `${detectArticleCategory(item.path).color}15`
                  }"
                >
                  {{ item.category || detectArticleCategory(item.path).name }}
                </span>
                <span class="card-saved-time">{{ formatSavedDate(item.bookmarkedAt) }}</span>
              </div>

              <a
                :href="withBase(item.path)"
                class="card-title-link"
                :title="item.title"
                @click="handleArticleClick"
              >
                {{ item.title }}
              </a>

              <p v-if="item.description" class="card-desc">
                {{ item.description }}
              </p>
            </div>

            <div class="card-actions">
              <a
                :href="withBase(item.path)"
                class="read-link-btn"
                aria-label="Read article"
                @click="handleArticleClick"
              >
                <span>Read</span>
                <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
                  <path fill-rule="evenodd" d="M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06l2.97-2.97H3.75a.75.75 0 0 1 0-1.5h7.44L8.22 4.03a.75.75 0 0 1 0-1.06z" clip-rule="evenodd" />
                </svg>
              </a>

              <button
                :id="`remove-bookmark-btn-${idx}`"
                type="button"
                class="remove-item-btn"
                title="Remove from bookmarks"
                :aria-label="`Remove ${item.title} from bookmarks`"
                @click="handleRemove(item)"
              >
                <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                  <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Info -->
      <div class="drawer-footer">
        <a
          id="drawer-open-full-page-link"
          :href="withBase('/bookmarks')"
          class="full-page-link"
          @click="handleArticleClick"
        >
          <span>Open Full Bookmarks Page</span>
          <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
            <path fill-rule="evenodd" d="M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06l2.97-2.97H3.75a.75.75 0 0 1 0-1.5h7.44L8.22 4.03a.75.75 0 0 1 0-1.06z" clip-rule="evenodd" />
          </svg>
        </a>
        <span class="storage-note">
          <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" style="display: inline-block; vertical-align: -1px; margin-right: 4px;">
            <path d="M0 3.75C0 2.784.784 2 1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5zm1.75-.25a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25v-8.5a.25.25 0 0 0-.25-.25H1.75zM3.5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
          </svg>
          Persisted securely in localStorage
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bookmarks-drawer-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.bookmarks-drawer {
  width: 100%;
  max-width: 440px;
  height: 100%;
  background-color: #0d1117;
  border-left: 1px solid #30363d;
  display: flex;
  flex-direction: column;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
  animation: slideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  border-bottom: 1px solid #21262d;
  background-color: #161b22;
}

.header-title-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-icon-box {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: rgba(46, 160, 67, 0.15);
  border: 1px solid rgba(63, 185, 80, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3fb950;
}

.drawer-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #f0f6fc;
}

.drawer-subtitle {
  margin: 2px 0 0;
  font-size: 0.75rem;
  color: #8b949e;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-text-btn {
  background: none;
  border: none;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.action-text-btn.danger {
  color: #f85149;
}

.action-text-btn.danger:hover {
  background-color: rgba(248, 81, 73, 0.15);
}

.close-drawer-btn {
  background: transparent;
  border: 1px solid #30363d;
  color: #8b949e;
  border-radius: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-drawer-btn:hover {
  border-color: #8b949e;
  color: #f0f6fc;
  background-color: #21262d;
}

.clear-confirm-box {
  background-color: rgba(248, 81, 73, 0.12);
  border-bottom: 1px solid rgba(248, 81, 73, 0.3);
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.confirm-text {
  font-size: 0.82rem;
  color: #f85149;
  font-weight: 500;
}

.confirm-btns {
  display: flex;
  gap: 6px;
}

.confirm-btn {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid;
}

.confirm-btn.danger {
  background-color: #da3633;
  border-color: #f85149;
  color: #ffffff;
}

.confirm-btn.cancel {
  background-color: transparent;
  border-color: #30363d;
  color: #c9d1d9;
}

.drawer-category-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 20px 0;
  overflow-x: auto;
  scrollbar-width: none;
}

.drawer-category-bar::-webkit-scrollbar {
  display: none;
}

.drawer-cat-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 6px;
  background-color: #161b22;
  border: 1px solid #30363d;
  color: #8b949e;
  font-size: 0.74rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;
}

.drawer-cat-btn:hover {
  background-color: #21262d;
  color: #c9d1d9;
  border-color: #8b949e;
}

.drawer-cat-btn.active {
  background-color: rgba(63, 185, 80, 0.15);
  border-color: #3fb950;
  color: #3fb950;
}

.drawer-cat-badge {
  font-size: 0.68rem;
  padding: 0 4px;
  border-radius: 8px;
  background-color: #0d1117;
  color: inherit;
  border: 1px solid #30363d;
}

.drawer-cat-btn.active .drawer-cat-badge {
  border-color: rgba(63, 185, 80, 0.4);
}

.drawer-search-bar {
  padding: 12px 20px 0;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-svg {
  position: absolute;
  left: 10px;
  color: #8b949e;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 8px 30px 8px 32px;
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 6px;
  color: #f0f6fc;
  font-size: 0.85rem;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3fb950;
  box-shadow: 0 0 0 2px rgba(63, 185, 80, 0.2);
}

.search-clear-btn {
  position: absolute;
  right: 8px;
  background: none;
  border: none;
  color: #8b949e;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 2px 6px;
}

.drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
}

.empty-state {
  text-align: center;
  padding: 40px 10px;
}

.empty-icon-circle {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  border-radius: 50%;
  background-color: #161b22;
  border: 1px dashed #30363d;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b949e;
}

.empty-title {
  margin: 0 0 8px;
  font-size: 1rem;
  color: #f0f6fc;
  font-weight: 600;
}

.empty-desc {
  margin: 0 0 24px;
  font-size: 0.85rem;
  color: #8b949e;
  line-height: 1.5;
}

.quick-explore-links {
  text-align: left;
  background-color: #161b22;
  border: 1px solid #21262d;
  border-radius: 8px;
  padding: 14px;
}

.explore-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #8b949e;
  margin-bottom: 8px;
}

.explore-chips {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.explore-chip {
  padding: 6px 10px;
  border-radius: 6px;
  background-color: #21262d;
  border: 1px solid #30363d;
  color: #c9d1d9;
  font-size: 0.8rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.explore-chip:hover {
  border-color: #3fb950;
  color: #3fb950;
  background-color: rgba(46, 160, 67, 0.1);
}

.no-filter-results {
  text-align: center;
  padding: 40px 10px;
  color: #8b949e;
  font-size: 0.88rem;
}

.bookmarks-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.bookmark-card {
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 10px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.bookmark-card:hover {
  border-color: rgba(63, 185, 80, 0.5);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  transform: translateY(-1px);
}

.card-main {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.card-meta-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.card-track-badge {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid;
  white-space: nowrap;
}

.card-saved-time {
  font-size: 0.7rem;
  color: #8b949e;
}

.card-title-link {
  font-size: 0.95rem;
  font-weight: 600;
  color: #f0f6fc;
  text-decoration: none;
  line-height: 1.4;
  transition: color 0.15s ease;
}

.card-title-link:hover {
  color: #3fb950;
}

.card-desc {
  margin: 0;
  font-size: 0.8rem;
  color: #8b949e;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 8px;
  border-top: 1px solid #21262d;
}

.read-link-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #3fb950;
  font-size: 0.78rem;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.15s ease;
}

.read-link-btn:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.remove-item-btn {
  background: transparent;
  border: none;
  color: #8b949e;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.remove-item-btn:hover {
  color: #f85149;
  background-color: rgba(248, 81, 73, 0.1);
}

.drawer-footer {
  padding: 14px 20px;
  background-color: #161b22;
  border-top: 1px solid #21262d;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.full-page-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #3fb950;
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  padding: 4px 10px;
  border-radius: 6px;
  background-color: rgba(46, 160, 67, 0.1);
  border: 1px solid rgba(63, 185, 80, 0.3);
  transition: all 0.2s ease;
}

.full-page-link:hover {
  background-color: rgba(46, 160, 67, 0.2);
  border-color: #3fb950;
}

.storage-note {
  font-size: 0.72rem;
  color: #8b949e;
}
</style>
