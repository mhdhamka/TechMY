<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import ArticleBookmarkBar from "./components/ArticleBookmarkBar.vue";
import ArticleFooterBookmark from "./components/ArticleFooterBookmark.vue";
import BookmarksNavButton from "./components/BookmarksNavButton.vue";
import BookmarksDrawer from "./components/BookmarksDrawer.vue";
import BookmarksToast from "./components/BookmarksToast.vue";

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #doc-before>
      <ArticleBookmarkBar />
    </template>

    <template #doc-after>
      <ArticleFooterBookmark />
    </template>

    <template #nav-bar-content-after>
      <BookmarksNavButton />
    </template>

    <template #nav-screen-content-after>
      <BookmarksNavButton :is-mobile="true" />
    </template>

    <template #layout-bottom>
      <BookmarksDrawer />
      <BookmarksToast />
    </template>
  </Layout>
</template>
