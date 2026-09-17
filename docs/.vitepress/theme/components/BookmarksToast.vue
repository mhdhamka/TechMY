<script setup lang="ts">
import { useBookmarks } from "../composables/useBookmarks";

const { toastState } = useBookmarks();
</script>

<template>
  <Transition name="toast-fade">
    <div
      v-if="toastState.show"
      id="bookmarks-toast"
      class="bookmarks-toast"
      :class="toastState.type"
      role="status"
      aria-live="polite"
    >
      <div class="toast-icon">
        <svg v-if="toastState.type === 'success'" viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        <svg v-else-if="toastState.type === 'remove'" viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
          <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
        </svg>
        <svg v-else viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
        </svg>
      </div>
      <span class="toast-message">{{ toastState.message }}</span>
    </div>
  </Transition>
</template>

<style scoped>
.bookmarks-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1100;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 8px;
  color: #f0f6fc;
  font-size: 0.85rem;
  font-weight: 500;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  pointer-events: none;
}

.bookmarks-toast.success {
  border-color: rgba(63, 185, 80, 0.6);
  background-color: #0d1a10;
}

.bookmarks-toast.success .toast-icon {
  color: #3fb950;
}

.bookmarks-toast.remove {
  border-color: rgba(248, 81, 73, 0.4);
  background-color: #1c1012;
}

.bookmarks-toast.remove .toast-icon {
  color: #f85149;
}

.toast-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #58a6ff;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.95);
}

@media (max-width: 640px) {
  .bookmarks-toast {
    bottom: 16px;
    right: 16px;
    left: 16px;
    justify-content: center;
  }
}
</style>
