import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import RoadmapVisualization from "./components/RoadmapVisualization.vue";
import "./custom.css";

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("RoadmapVisualization", RoadmapVisualization);
  },
};

export default theme;