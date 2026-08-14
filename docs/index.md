---
layout: home
title: TechMY
description: The go-to resource to learn Software Engineering, AI, DevOps, Data, and Cybersecurity in Malaysia.

hero:
  text: '<span class="brand-green">TechMY</span>: Your Free, Open-Source Path to Tech Mastery in Malaysia'
  tagline: "Community-driven curricula taking you from absolute beginner to production-ready developer in tech."
  actions:
    - theme: brand
      text: View the Curricula
      link: /software-engineering/
    - theme: alt
      text: Malaysian Hub
      link: /local-resources/
---

## Your Learning Paths

Designed like an open curriculum, structured to take you from core fundamentals to production-ready mastery tailored specifically for the Malaysian tech landscape.

<div class="testing-stack">
  <div class="testing-card cc-card-1">
    <div class="card-header">
      <h3>Software Engineering</h3>
      <span class="tagline">Core Track</span>
    </div>
    <div class="card-body">
      <p><strong>Foundational Mastery:</strong> Master industry bibles like <em>Clean Code</em> and <em>The Pragmatic Programmer</em>.</p>
      <p><strong>System Design:</strong> Build maintainable, robust software applications following enterprise-grade architecture standards.</p>
    </div>
  </div>

  <div class="testing-card cc-card-2">
    <div class="card-header">
      <h3>AI & RAG Architectures</h3>
      <span class="tagline">Specialized Track</span>
    </div>
    <div class="card-body">
      <p><strong>LLM Pipelines:</strong> Build production-ready Retrieval-Augmented Generation (RAG) pipelines and vector search configurations.</p>
      <p><strong>AI Workflows:</strong> Seamlessly integrate artificial intelligence tools and automated workflows into modern software stacks.</p>
    </div>
  </div>

  <div class="testing-card cc-card-3">
    <div class="card-header">
      <h3>DevOps & CI/CD</h3>
      <span class="tagline">Infrastructure</span>
    </div>
    <div class="card-body">
      <p><strong>Automation & Containers:</strong> Automate testing pipelines, containerize applications with Docker, and manage environments.</p>
      <p><strong>Workflow Orchestration:</strong> Set up robust GitHub Actions to ensure seamless, zero-downtime deployment cycles.</p>
    </div>
  </div>

  <div class="testing-card cc-card-1">
    <div class="card-header">
      <h3>Malaysian Tech Hub</h3>
      <span class="tagline">Local Ecosystem</span>
    </div>
    <div class="card-body">
      <p><strong>Community & Career:</strong> Access curated connections to local tech communities, meetups, and regional career paths.</p>
      <p><strong>Regulatory Compliance:</strong> Navigate regional tech standards, data governance, and PDPA compliance requirements.</p>
    </div>
  </div>
</div>

<style>
.brand-green {
  color: #3fb950;
}

.testing-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
}

.testing-card {
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 12px;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}

.testing-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: #30363d;
  transition: background 0.3s ease;
}

.testing-card:hover {
  transform: translateX(4px);
  box-shadow: 0 10px 30px rgba(46, 160, 67, 0.15);
}

.cc-card-1:hover { border-color: #58a6ff; box-shadow: 0 10px 30px rgba(88, 166, 255, 0.15); }
.cc-card-1:hover::before { background: #58a6ff; }

.cc-card-2:hover { border-color: #3fb950; box-shadow: 0 10px 30px rgba(46, 160, 67, 0.15); }
.cc-card-2:hover::before { background: #3fb950; }

.cc-card-3:hover { border-color: #d29922; box-shadow: 0 10px 30px rgba(210, 153, 34, 0.15); }
.cc-card-3:hover::before { background: #d29922; }

.testing-card .card-header {
  flex: 0 0 240px;
}

.testing-card h3 {
  color: #f0f6fc;
  font-size: 1.1rem;
  margin: 0 0 4px 0;
}

.testing-card .tagline {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.cc-card-1 .tagline { color: #58a6ff; }
.cc-card-2 .tagline { color: #3fb950; }
.cc-card-3 .tagline { color: #d29922; }

.testing-card .card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-left: 1px solid #30363d;
  padding-left: 24px;
  margin-left: 20px;
}

.testing-card p {
  color: #8b949e;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.4;
}

.testing-card p strong {
  color: #c9d1d9;
}

@media (max-width: 768px) {
  .testing-card {
    flex-direction: column;
    align-items: flex-start;
  }
  .testing-card .card-header {
    flex: none;
  }
  .testing-card .card-body {
    border-left: none;
    border-top: 1px solid #30363d;
    padding-left: 0;
    padding-top: 12px;
    margin-left: 0;
    margin-top: 12px;
    width: 100%;
  }
  .testing-card:hover {
    transform: translateY(-4px);
  }
  .testing-card::before {
    width: 100%;
    height: 3px;
  }
}
</style>