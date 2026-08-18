import { defineConfig } from "vitepress";

export default defineConfig({
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
    ["meta", { property: "og:url", content: "https://techmy.dev" }],
    ["meta", { property: "og:image", content: "https://techmy.dev/favicon.svg" }],
    ["meta", { name: "twitter:card", content: "summary" }],
    ["meta", { name: "twitter:title", content: "TechMY" }],
    ["meta", { name: "twitter:description", content: "The go-to resource to learn Software Engineering, AI, DevOps, Data, and Cybersecurity in Malaysia." }],
    ["meta", { name: "twitter:image", content: "https://techmy.dev/favicon.svg" }],
  ],
  base: "/TechMY/", // <-- FIXED: Added subpath for GitHub Pages repository
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: "/code.svg",
    siteTitle: "TechMY",
    search: {
      provider: "local",
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Software", link: "/software-engineering/" },
      { text: "System Design", link: "/system-design/" },
      { text: "Data", link: "/data-engineering/" },
      { text: "AI & ML", link: "/ai-ml/" },
      { text: "DevOps", link: "/devops-infrastructure/" },
      { text: "Security", link: "/cybersecurity/" },
      { text: "Local Hub", link: "/local-resources/" }
    ],
    sidebar: [
      {
        text: "Getting Started",
        items: [{ text: "Welcome & Roadmap", link: "/" }]
      },
      {
        text: "Software Engineering",
        collapsed: false,
        items: [
          { text: "Overview", link: "/software-engineering/" },
          { text: "Foundations & Quality", link: "/software-engineering/clean-code" },
          { text: "Developer Mindset", link: "/software-engineering/pragmatic-habits" },
          { text: "Engineering Construction", link: "/software-engineering/code-construction" },
          { text: "Career & Interview Prep", link: "/software-engineering/interview-prep" },
          { text: "Tech Stack Mastery", link: "/software-engineering/languages/" }
        ]
      },
      {
        text: "System Design & Tooling",
        collapsed: true,
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
        collapsed: true,
        items: [
          { text: "Local Hub Overview", link: "/local-resources/" },
          { text: "Communities & Meetups", link: "/local-resources/communities" },
          { text: "Careers & Hiring", link: "/local-resources/careers-hiring" },
          { text: "PDPA & Compliance", link: "/local-resources/compliance" }
        ]
      }
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/mhdhamka/TechMY" }],
    editLink: {
      pattern: "https://github.com/mhdhamka/TechMY/edit/main/docs/:path", // <-- FIXED: Matched repository casing TechMY
      text: "Suggest an edit on GitHub",
    },
    footer: {
      message: "Built with love by mhdhamka for Malaysian developers.",
      copyright: `Copyright © ${new Date().getFullYear()} TechMY`,
    },
  },
  sitemap: {
    hostname: "https://techmy.dev",
  },
});
