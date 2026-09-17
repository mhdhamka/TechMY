<script setup lang="ts">
import { computed } from "vue";
import { useData, useRoute } from "vitepress";
import { useBookmarks, normalizeArticlePath, detectArticleCategory } from "../composables/useBookmarks";

const { page, frontmatter } = useData();
const route = useRoute();
const { isBookmarked, toggleBookmark, openDrawer, totalBookmarks } = useBookmarks();

// Only display on documentation/article pages, not home or bookmarks page
const isDocArticle = computed(() => {
  if (frontmatter.value.layout === "home") return false;
  if (!page.value || !page.value.relativePath) return false;
  if (page.value.relativePath === "index.md") return false;
  if (page.value.relativePath === "bookmarks.md" || page.value.relativePath.startsWith("bookmarks")) return false;
  return true;
});

const currentPath = computed(() => {
  return normalizeArticlePath(page.value.relativePath || route.path);
});

const articleTitle = computed(() => {
  return frontmatter.value.title || page.value.title || "Tech Article";
});

const articleDesc = computed(() => {
  return frontmatter.value.description || "";
});

const categoryInfo = computed(() => {
  return detectArticleCategory(currentPath.value);
});

const bookmarked = computed(() => {
  return isBookmarked(currentPath.value);
});

function handleBookmarkToggle() {
  toggleBookmark({
    path: currentPath.value,
    title: articleTitle.value,
    description: articleDesc.value,
    category: categoryInfo.value.name,
  });
}
</script>

<template>
  <div v-if="isDocArticle" id="tech-article-bookmark-bar" class="tech-article-meta-bar">
    <div class="article-meta-left">
      <div
        id="article-category-badge"
        class="article-track-pill"
        :style="{ borderColor: `${categoryInfo.color}40`, color: categoryInfo.color, backgroundColor: `${categoryInfo.color}15` }"
      >
        <span class="track-tag">{{ categoryInfo.tag }}</span>
        <span class="track-name">{{ categoryInfo.name }}</span>
      </div>
    </div>

    <div class="article-meta-right">
      <button
        id="article-bookmark-btn"
        type="button"
        class="bookmark-action-btn"
        :class="{ 'is-saved': bookmarked }"
        :aria-pressed="bookmarked"
        :aria-label="bookmarked ? 'Remove article from favorites' : 'Bookmark this article'"
        @click="handleBookmarkToggle"
      >
        <svg
          v-if="bookmarked"
          class="bookmark-icon active"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="currentColor"
        >
          <path d="M5 2h14a1 1 0 0 1 1 1v19.143a.5.5 0 0 1-.766.424L12 18.01l-7.234 4.557A.5.5 0 0 1 4 22.143V3a1 1 0 0 1 1-1z" />
        </svg>
        <svg
          v-else
          class="bookmark-icon"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
        <span class="btn-label">{{ bookmarked ? "Bookmarked" : "Bookmark Article" }}</span>
        <span v-if="bookmarked" class="saved-pill">Saved</span>
      </button>

      <button
        v-if="totalBookmarks > 0"
        id="quick-view-bookmarks-btn"
        type="button"
        class="view-all-saved-btn"
        title="View your saved articles"
        aria-label="View all saved articles"
        @click="openDrawer"
      >
        <span class="saved-count-pill">{{ totalBookmarks }} saved</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.tech-article-meta-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px 16px;
  margin-bottom: 24px;
  background-color: var(--vp-c-bg-alt, #161b22);
  border: 1px solid #30363d;
  border-radius: 10px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.tech-article-meta-bar:hover {
  border-color: #3fb950;
  box-shadow: 0 4px 16px rgba(46, 160, 67, 0.08);
}

.article-meta-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.article-track-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.track-tag {
  font-size: 0.7rem;
  opacity: 0.85;
  text-transform: uppercase;
  font-weight: 800;
}

.article-meta-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.bookmark-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  min-height: 36px;
  background-color: #21262d;
  border: 1px solid #30363d;
  border-radius: 8px;
  color: #c9d1d9;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;
}

.bookmark-action-btn:hover {
  background-color: #30363d;
  border-color: #3fb950;
  color: #3fb950;
  transform: translateY(-1px);
}

.bookmark-action-btn:focus-visible {
  outline: 2px solid #3fb950;
  outline-offset: 2px;
}

.bookmark-action-btn.is-saved {
  background-color: rgba(46, 160, 67, 0.15);
  border-color: rgba(63, 185, 80, 0.5);
  color: #3fb950;
}

.bookmark-action-btn.is-saved:hover {
  background-color: rgba(46, 160, 67, 0.25);
  border-color: #3fb950;
}

.bookmark-icon {
  flex-shrink: 0;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.bookmark-action-btn:hover .bookmark-icon {
  transform: scale(1.15);
}

.bookmark-icon.active {
  color: #3fb950;
}

.saved-pill {
  font-size: 0.68rem;
  padding: 1px 6px;
  border-radius: 12px;
  background-color: rgba(63, 185, 80, 0.25);
  color: #3fb950;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.view-all-saved-btn {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  min-height: 36px;
  background: transparent;
  border: 1px dashed #30363d;
  border-radius: 8px;
  color: #8b949e;
  font-size: 0.78rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-all-saved-btn:hover {
  border-color: #3fb950;
  color: #3fb950;
  background-color: rgba(46, 160, 67, 0.08);
}

.saved-count-pill {
  white-space: nowrap;
}

@media (max-width: 640px) {
  .tech-article-meta-bar {
    padding: 10px 12px;
  }
  .bookmark-action-btn {
    padding: 6px 10px;
    font-size: 0.8rem;
  }
}
</style>
