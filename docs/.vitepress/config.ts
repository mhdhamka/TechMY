import { defineConfig } from "vitepress";

export default defineConfig(({ command }: { command: string }) => {
  return {
    lang: "en-MY",
    title: "TechMY",
    description: "The go-to resource to learn Software Engineering, AI, DevOps, Data, and Cybersecurity in Malaysia.",
    head: [
      ["link", { rel: "icon", type: "image/svg+xml", href: "/code.svg" }],
      ["meta", { name: "keywords", content: "software engineering Malaysia, AI Malaysia, cybersecurity Malaysia, DevOps Malaysia, data engineering, techmy" }],
      ["meta", { name: "robots", content: "index, follow" }],
      ["meta", { property: "og:type", content: "website" }],
      ["meta", { property: "og:site_name", content: "TechMY" }],
      ["meta", { property: "og:title", content: "TechMY" }],
      ["meta", { property: "og:description", content: "The go-to resource to learn Software Engineering, AI, DevOps, Data, and Cybersecurity in Malaysia." }],
      ["meta", { property: "og:url", content: "https://mhdhamka.github.io/TechMY/" }],
      ["meta", { property: "og:image", content: "https://mhdhamka.github.io/TechMY/code.svg" }],
      ["meta", { name: "twitter:card", content: "summary_large_image" }],
      ["meta", { name: "twitter:title", content: "TechMY" }],
      ["meta", { name: "twitter:description", content: "The go-to resource to learn Software Engineering, AI, DevOps, Data, and Cybersecurity in Malaysia." }],
      ["meta", { name: "twitter:image", content: "https://mhdhamka.github.io/TechMY/code.svg" }],
    ],
    // Automatically uses root for dev server and repo subpath for production builds
    base: command === "build" ? "/TechMY/" : "/",
    cleanUrls: true,
    lastUpdated: true,
    vite: {
      server: {
        host: "0.0.0.0",
        port: 3000,
      },
    },
    themeConfig: {
      logo: "/code.svg",
      siteTitle: "TechMY",
      search: {
        provider: "local",
      },
      nav: [
        { text: "Home", link: "/" },
        { text: "Roadmap 🇲🇾", link: "/roadmap" },
        {
          text: "Disciplines",
          items: [
            { text: "Software Engineering", link: "/software-engineering/" },
            { text: "System Design & Tooling", link: "/system-design/" },
            { text: "AI & Machine Learning", link: "/ai-ml/" },
            { text: "Data Engineering", link: "/data-engineering/" },
            { text: "DevOps & Infrastructure", link: "/devops-infrastructure/" },
            { text: "Cybersecurity", link: "/cybersecurity/" }
          ]
        },
        {
          text: "Malaysia Hub 🇲🇾",
          items: [
            { text: "Ecosystem Overview & Map", link: "/local-resources/" },
            { text: "Tech Jobs & Careers", link: "/local-resources/careers-hiring" },
            { text: "Communities & Meetups", link: "/local-resources/communities" },
            { text: "PDPA & Cyber Compliance", link: "/local-resources/compliance" }
          ]
        },
        { text: "Bookmarks", link: "/bookmarks" }
      ],
      sidebar: [
        {
          text: "Getting Started",
          items: [
            { text: "Welcome & Overview", link: "/" },
            { text: "Interactive Roadmap 🇲🇾", link: "/roadmap" },
            { text: "My Saved Bookmarks", link: "/bookmarks" }
          ]
        },
        {
          text: "Software Engineering",
          collapsed: false,
          items: [
            { text: "Overview & Career Roadmaps", link: "/software-engineering/" },
            { text: "Foundations & Quality", link: "/software-engineering/clean-code" },
            { text: "Developer Mindset", link: "/software-engineering/pragmatic-habits" },
            { text: "Engineering Construction", link: "/software-engineering/code-construction" },
            { text: "Career & Interview Prep", link: "/software-engineering/interview-prep" },
            { text: "Tech Stack Mastery", link: "/software-engineering/languages/" }
          ]
        },
        {
          text: "System Design & Tooling",
          collapsed: false,
          items: [
            { text: "System Design Overview", link: "/system-design/" },
            { text: "Scalability & Load Balancers", link: "/system-design/scalability-basics" },
            { text: "Caching & Messaging", link: "/system-design/caching-messaging" },
            { text: "Developer Tooling & Shell", link: "/tooling/terminal-shell" },
            { text: "API Design & Testing", link: "/tooling/api-testing" }
          ]
        },
        {
          text: "Data",
          collapsed: false,
          items: [
            { text: "Data Architecture & Systems", link: "/data-engineering/" },
            { text: "ETL & Pipelines Orchestration", link: "/data-engineering/pipelines-etl" },
            { text: "Data Modelling & Warehouses", link: "/data-engineering/data-warehousing" },
            { text: "Advanced SQL & Analysis", link: "/data-engineering/sql-recipes" }
          ]
        },
        {
          text: "Artificial Intelligence",
          collapsed: false,
          items: [
            { text: "Overview", link: "/ai-ml/" },
            { text: "Deep Learning Basics", link: "/ai-ml/deep-learning-basics" },
            { text: "LLMs & RAG Architectures", link: "/ai-ml/llm-and-rag" },
            { text: "AI & DevOps Workflows", link: "/ai-ml/ai-devops" }
          ]
        },
        {
          text: "DevOps & Infrastructure",
          collapsed: false,
          items: [
            { text: "Overview", link: "/devops-infrastructure/" },
            { text: "Culture & Flow", link: "/devops-infrastructure/culture-flow" },
            { text: "Container & Docker", link: "/devops-infrastructure/container-docker" },
            { text: "CI/CD Workflows", link: "/devops-infrastructure/cicd-workflows" },
            { text: "Infrastructure & SRE", link: "/devops-infrastructure/infrastructure-sre" },
            { text: "AI & Operations", link: "/devops-infrastructure/ai-operations" },
            { text: "Cheatsheets", link: "/devops-infrastructure/cheatsheets/" }
          ]
        },
        {
          text: "Cybersecurity",
          collapsed: false,
          items: [
            { text: "Overview", link: "/cybersecurity/" },
            { text: "Secure Coding & OWASP", link: "/cybersecurity/secure-coding" },
            { text: "Security Fundamentals", link: "/cybersecurity/fundamentals" }
          ]
        },
        {
          text: "🇲🇾 Malaysian Ecosystem",
          collapsed: false,
          items: [
            { text: "Local Hub Overview", link: "/local-resources/" },
            { text: "Tech Jobs & Careers", link: "/local-resources/careers-hiring" },
            { text: "Communities & Meetups", link: "/local-resources/communities" },
            { text: "PDPA & Compliance", link: "/local-resources/compliance" }
          ]
        }
      ],
      socialLinks: [{ icon: "github", link: "https://github.com/mhdhamka/TechMY" }],
      editLink: {
        pattern: "https://github.com/mhdhamka/TechMY/edit/main/docs/:path",
        text: "Suggest an edit on GitHub",
      },
      footer: {
        message: "Built with love by mhdhamka for Malaysian developers.",
        copyright: `Copyright © ${new Date().getFullYear()} TechMY`,
      },
    },
    sitemap: {
      hostname: "https://mhdhamka.github.io/TechMY/",
    },
  };
});