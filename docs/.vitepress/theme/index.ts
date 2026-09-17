import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import RoadmapVisualization from "./components/RoadmapVisualization.vue";
import ArticleBookmarkBar from "./components/ArticleBookmarkBar.vue";
import ArticleFooterBookmark from "./components/ArticleFooterBookmark.vue";
import BookmarksNavButton from "./components/BookmarksNavButton.vue";
import BookmarksDrawer from "./components/BookmarksDrawer.vue";
import BookmarksPageView from "./components/BookmarksPageView.vue";
import CurriculumBrowser from "./components/CurriculumBrowser.vue";
import MalaysiaTechMap from "./components/MalaysiaTechMap.vue";
import EcosystemBreakdown from "./components/EcosystemBreakdown.vue";
import MalaysianJobBoard from "./components/MalaysianJobBoard.vue";
import CareerProgressionRoadmap from "./components/CareerProgressionRoadmap.vue";
import Layout from "./Layout.vue";
import "leaflet/dist/leaflet.css";
import "./custom.css";

const theme: Theme = {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component("RoadmapVisualization", RoadmapVisualization);
    app.component("ArticleBookmarkBar", ArticleBookmarkBar);
    app.component("ArticleFooterBookmark", ArticleFooterBookmark);
    app.component("BookmarksNavButton", BookmarksNavButton);
    app.component("BookmarksDrawer", BookmarksDrawer);
    app.component("BookmarksPageView", BookmarksPageView);
    app.component("CurriculumBrowser", CurriculumBrowser);
    app.component("MalaysiaTechMap", MalaysiaTechMap);
    app.component("EcosystemBreakdown", EcosystemBreakdown);
    app.component("MalaysianJobBoard", MalaysianJobBoard);
    app.component("CareerProgressionRoadmap", CareerProgressionRoadmap);
  },
};

export default theme;
