import { ref, computed, onMounted } from "vue";
import type { BookmarkedArticle } from "../types/bookmark";

const STORAGE_KEY = "techmy_favorited_articles";

// Shared reactive state across components
const bookmarks = ref<BookmarkedArticle[]>([]);
const isInitialized = ref(false);
const isDrawerOpen = ref(false);
const toastState = ref<{
  show: boolean;
  message: string;
  type: "success" | "info" | "remove";
}>({
  show: false,
  message: "",
  type: "info",
});

let toastTimer: ReturnType<typeof setTimeout> | null = null;

function showToast(message: string, type: "success" | "info" | "remove" = "info") {
  if (toastTimer) clearTimeout(toastTimer);
  toastState.value = { show: true, message, type };
  toastTimer = setTimeout(() => {
    toastState.value.show = false;
  }, 2600);
}

function loadBookmarksFromStorage(): BookmarkedArticle[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (err) {
    console.error("Failed to load bookmarks from localStorage:", err);
  }
  return [];
}

function saveBookmarksToStorage(items: BookmarkedArticle[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("techmy:bookmarks-sync", { detail: items }));
  } catch (err) {
    console.error("Failed to save bookmarks to localStorage:", err);
  }
}

export function normalizeArticlePath(rawPath: string): string {
  if (!rawPath) return "/";
  // Strip trailing slash, .html, .md, index
  let p = rawPath.replace(/\.md$/, "").replace(/\.html$/, "");
  if (p.endsWith("/index")) {
    p = p.slice(0, -6);
  }
  if (!p.startsWith("/")) {
    p = "/" + p;
  }
  return p === "" ? "/" : p;
}

export function detectArticleCategory(path: string): { name: string; color: string; tag: string } {
  const norm = path.toLowerCase();
  if (norm.includes("system-design") || norm.includes("tooling")) {
    return { name: "System Design & Tooling", color: "#388bfd", tag: "SYS" };
  }
  if (norm.includes("software-engineering")) {
    return { name: "Software Engineering", color: "#3fb950", tag: "SWE" };
  }
  if (norm.includes("cybersecurity")) {
    return { name: "Cybersecurity", color: "#f0883e", tag: "SEC" };
  }
  if (norm.includes("data-engineering")) {
    return { name: "Data Engineering", color: "#58a6ff", tag: "DATA" };
  }
  if (norm.includes("devops-infrastructure")) {
    return { name: "DevOps & Infrastructure", color: "#d29922", tag: "OPS" };
  }
  if (norm.includes("ai-ml")) {
    return { name: "Artificial Intelligence", color: "#bc8cff", tag: "AI" };
  }
  if (norm.includes("local-resources")) {
    return { name: "Malaysian Tech Ecosystem", color: "#f778ba", tag: "MY" };
  }
  if (norm.includes("roadmap")) {
    return { name: "Interactive Roadmap", color: "#2ea043", tag: "MAP" };
  }
  if (norm.includes("github-student-pack")) {
    return { name: "Developer Perks", color: "#388bfd", tag: "PERKS" };
  }
  return { name: "Tech Article", color: "#8b949e", tag: "DOC" };
}

export function useBookmarks() {
  function initBookmarks() {
    if (typeof window === "undefined" || isInitialized.value) return;
    bookmarks.value = loadBookmarksFromStorage();
    isInitialized.value = true;

    // Listen for storage events from other tabs
    window.addEventListener("storage", (e) => {
      if (e.key === STORAGE_KEY) {
        bookmarks.value = loadBookmarksFromStorage();
      }
    });

    // Listen for custom in-tab sync
    window.addEventListener("techmy:bookmarks-sync", (e: any) => {
      if (e.detail && Array.isArray(e.detail)) {
        bookmarks.value = e.detail;
      }
    });
  }

  onMounted(() => {
    initBookmarks();
  });

  const totalBookmarks = computed(() => bookmarks.value.length);

  function isBookmarked(rawPath: string): boolean {
    const id = normalizeArticlePath(rawPath);
    return bookmarks.value.some((b) => b.id === id || b.path === id);
  }

  function addBookmark(article: {
    path: string;
    title: string;
    description?: string;
    category?: string;
  }) {
    initBookmarks();
    const id = normalizeArticlePath(article.path);
    if (isBookmarked(id)) return;

    const cat = article.category || detectArticleCategory(id).name;
    const newEntry: BookmarkedArticle = {
      id,
      path: id,
      title: article.title.trim() || "Untitled Tech Article",
      description: article.description?.trim() || "",
      category: cat,
      bookmarkedAt: Date.now(),
    };

    const updated = [newEntry, ...bookmarks.value];
    bookmarks.value = updated;
    saveBookmarksToStorage(updated);
    showToast(`Bookmarked "${newEntry.title}"`, "success");
  }

  function removeBookmark(rawPath: string) {
    initBookmarks();
    const id = normalizeArticlePath(rawPath);
    const existing = bookmarks.value.find((b) => b.id === id || b.path === id);
    const updated = bookmarks.value.filter((b) => b.id !== id && b.path !== id);
    bookmarks.value = updated;
    saveBookmarksToStorage(updated);
    const title = existing ? `"${existing.title}"` : "Article";
    showToast(`Removed ${title} from bookmarks`, "remove");
  }

  function toggleBookmark(article: {
    path: string;
    title: string;
    description?: string;
    category?: string;
  }): boolean {
    const id = normalizeArticlePath(article.path);
    if (isBookmarked(id)) {
      removeBookmark(id);
      return false;
    } else {
      addBookmark(article);
      return true;
    }
  }

  function clearAllBookmarks() {
    bookmarks.value = [];
    saveBookmarksToStorage([]);
    showToast("Cleared all bookmarks", "info");
  }

  function openDrawer() {
    isDrawerOpen.value = true;
  }

  function closeDrawer() {
    isDrawerOpen.value = false;
  }

  function toggleDrawer() {
    isDrawerOpen.value = !isDrawerOpen.value;
  }

  return {
    bookmarks,
    totalBookmarks,
    isDrawerOpen,
    toastState,
    initBookmarks,
    isBookmarked,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    clearAllBookmarks,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    showToast,
  };
}
