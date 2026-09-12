import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
<<<<<<< HEAD
import RoadmapVisualization from "./components/RoadmapVisualization.vue";
=======
>>>>>>> 430d80b6ef0e58e2f5882701f27b6b6ccf9cb009
import "./custom.css";

const theme: Theme = {
  extends: DefaultTheme,
<<<<<<< HEAD
  enhanceApp({ app }) {
    app.component("RoadmapVisualization", RoadmapVisualization);
  },
=======
>>>>>>> 430d80b6ef0e58e2f5882701f27b6b6ccf9cb009
};

export default theme;