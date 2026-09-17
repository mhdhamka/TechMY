<script setup lang="ts">
import { useBookmarks } from "../composables/useBookmarks";

const props = defineProps<{
  isMobile?: boolean;
}>();

const { totalBookmarks, toggleDrawer } = useBookmarks();
</script>

<template>
  <div :id="props.isMobile ? 'mobile-nav-bookmarks-wrapper' : 'nav-bookmarks-wrapper'" class="nav-bookmarks-wrapper" :class="{ mobile: props.isMobile }">
    <button
      :id="props.isMobile ? 'mobile-nav-bookmarks-btn' : 'nav-bookmarks-btn'"
      type="button"
      class="nav-bookmarks-trigger"
      :class="{ 'has-items': totalBookmarks > 0 }"
      aria-label="View saved tech articles"
      title="Saved bookmarks"
      @click="toggleDrawer"
    >
      <div class="icon-container">
        <svg
          class="nav-bookmark-svg"
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
        <span v-if="totalBookmarks > 0" class="badge-dot"></span>
      </div>

      <span class="nav-bookmarks-text">Bookmarks</span>

      <span v-if="totalBookmarks > 0" class="badge-counter" :id="props.isMobile ? 'mobile-bookmarks-badge' : 'desktop-bookmarks-badge'">
        {{ totalBookmarks }}
      </span>
    </button>
  </div>
</template>

<style scoped>
.nav-bookmarks-wrapper {
  display: flex;
  align-items: center;
  margin-left: 8px;
}

.nav-bookmarks-wrapper.mobile {
  margin: 12px 16px;
  width: 100%;
}

.nav-bookmarks-trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  min-height: 34px;
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 8px;
  color: #c9d1d9;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;
}

.mobile .nav-bookmarks-trigger {
  width: 100%;
  justify-content: center;
  padding: 10px 16px;
  font-size: 0.95rem;
}

.nav-bookmarks-trigger:hover {
  border-color: #3fb950;
  color: #3fb950;
  background-color: #21262d;
}

.nav-bookmarks-trigger:focus-visible {
  outline: 2px solid #3fb950;
  outline-offset: 2px;
}

.nav-bookmarks-trigger.has-items {
  border-color: rgba(63, 185, 80, 0.4);
}

.icon-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-bookmark-svg {
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.nav-bookmarks-trigger:hover .nav-bookmark-svg {
  transform: scale(1.1);
  color: #3fb950;
}

.badge-dot {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #3fb950;
  box-shadow: 0 0 6px rgba(63, 185, 80, 0.6);
}

.nav-bookmarks-text {
  font-size: 0.82rem;
  line-height: 1;
}

.badge-counter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  background-color: #2ea043;
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 700;
  line-height: 1;
}
</style>
