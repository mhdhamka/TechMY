<script setup lang="ts">
import { computed } from "vue";
import { useData, useRoute } from "vitepress";
import { useBookmarks, normalizeArticlePath, detectArticleCategory } from "../composables/useBookmarks";

const { page, frontmatter } = useData();
const route = useRoute();
const { isBookmarked, toggleBookmark, openDrawer } = useBookmarks();

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
  <div v-if="isDocArticle" id="article-footer-bookmark-box" class="footer-bookmark-banner">
    <div class="footer-bookmark-content">
      <div class="footer-bookmark-info">
        <span class="footer-bookmark-heading">
          {{ bookmarked ? "Article Saved in Your Bookmarks" : "Found this guide valuable?" }}
        </span>
        <p class="footer-bookmark-subtext">
          {{
            bookmarked
              ? "Access this and all your favorited guides anytime from the Bookmarks menu."
              : "Bookmark it to your browser's local storage for offline reference and interview prep."
          }}
        </p>
      </div>

      <div class="footer-bookmark-actions">
        <button
          id="article-bottom-bookmark-btn"
          type="button"
          class="bottom-bookmark-btn"
          :class="{ 'is-saved': bookmarked }"
          :aria-pressed="bookmarked"
          :aria-label="bookmarked ? 'Remove article from bookmarks' : 'Bookmark this article'"
          @click="handleBookmarkToggle"
        >
          <svg
            v-if="bookmarked"
            class="bookmark-svg active"
            viewBox="0 0 24 24"
            width="17"
            height="17"
            fill="currentColor"
          >
            <path d="M5 2h14a1 1 0 0 1 1 1v19.143a.5.5 0 0 1-.766.424L12 18.01l-7.234 4.557A.5.5 0 0 1 4 22.143V3a1 1 0 0 1 1-1z" />
          </svg>
          <svg
            v-else
            class="bookmark-svg"
            viewBox="0 0 24 24"
            width="17"
            height="17"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
          <span>{{ bookmarked ? "Bookmarked (Saved)" : "Bookmark Guide" }}</span>
        </button>

        <button
          id="open-drawer-from-footer-btn"
          type="button"
          class="view-all-drawer-btn"
          title="Open saved bookmarks list"
          aria-label="Open saved bookmarks list"
          @click="openDrawer"
        >
          View Saved List
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer-bookmark-banner {
  margin-top: 36px;
  margin-bottom: 24px;
  padding: 16px 20px;
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 10px;
  transition: border-color 0.2s ease;
}

.footer-bookmark-banner:hover {
  border-color: rgba(63, 185, 80, 0.4);
}

.footer-bookmark-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.footer-bookmark-heading {
  display: block;
  font-size: 0.95rem;
  font-weight: 700;
  color: #f0f6fc;
}

.footer-bookmark-subtext {
  margin: 4px 0 0;
  font-size: 0.8rem;
  color: #8b949e;
  max-width: 500px;
  line-height: 1.4;
}

.footer-bookmark-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.bottom-bookmark-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  min-height: 38px;
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

.bottom-bookmark-btn:hover {
  background-color: #30363d;
  border-color: #3fb950;
  color: #3fb950;
  transform: translateY(-1px);
}

.bottom-bookmark-btn.is-saved {
  background-color: rgba(46, 160, 67, 0.15);
  border-color: rgba(63, 185, 80, 0.5);
  color: #3fb950;
}

.bottom-bookmark-btn.is-saved:hover {
  background-color: rgba(46, 160, 67, 0.25);
  border-color: #3fb950;
}

.bookmark-svg {
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.bottom-bookmark-btn:hover .bookmark-svg {
  transform: scale(1.15);
}

.bookmark-svg.active {
  color: #3fb950;
}

.view-all-drawer-btn {
  display: inline-flex;
  align-items: center;
  padding: 8px 14px;
  min-height: 38px;
  background-color: transparent;
  border: 1px solid #30363d;
  border-radius: 8px;
  color: #8b949e;
  font-size: 0.82rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.view-all-drawer-btn:hover {
  border-color: #8b949e;
  color: #f0f6fc;
  background-color: #21262d;
}

@media (max-width: 640px) {
  .footer-bookmark-content {
    flex-direction: column;
    align-items: flex-start;
  }
  .footer-bookmark-actions {
    width: 100%;
  }
  .bottom-bookmark-btn,
  .view-all-drawer-btn {
    flex: 1;
    justify-content: center;
  }
}
</style>
