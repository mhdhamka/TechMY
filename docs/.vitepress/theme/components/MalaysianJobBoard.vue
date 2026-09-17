<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

export interface TechJob {
  id: string;
  title: string;
  company: string;
  companyInitials: string;
  companyLogoBg: string;
  companyType: "Scale-Up" | "Unicorn" | "FinTech Switch" | "GovTech / Agency" | "Global Engineering Center" | "MNC / Semiconductor";
  category: "ai" | "cybersecurity" | "software" | "system-design" | "devops" | "data";
  categoryLabel: string;
  categoryIcon: string;
  city: string;
  state: string;
  locationDisplay: string;
  transitStation?: string;
  workArrangement: "Hybrid" | "Remote (Malaysia)" | "On-site";
  experienceLevel: "Junior (0-2 Yrs)" | "Mid-Level (3-5 Yrs)" | "Senior (5-8 Yrs)" | "Lead / Staff (8+ Yrs)";
  levelKey: "junior" | "mid" | "senior" | "lead";
  salaryMin: number;
  salaryMax: number;
  currency: "MYR";
  epfPerk?: string;
  postedDate: string;
  featured?: boolean;
  urgent?: boolean;
  shortSummary: string;
  fullDescription: string;
  responsibilities: string[];
  requirements: string[];
  techStack: string[];
  perks: string[];
  regulatoryContext?: string;
  applicationUrl: string;
  contactEmail?: string;
}

const JOBS_DATA: TechJob[] = [
  // =========================================================================
  // CATEGORY: AI & MACHINE LEARNING
  // =========================================================================
  {
    id: "mesolitica-llm-engineer",
    title: "Senior Bahasa Melayu LLM & NLP Research Engineer",
    company: "Mesolitica (Malaya Project)",
    companyInitials: "MSO",
    companyLogoBg: "#4f46e5",
    companyType: "Scale-Up",
    category: "ai",
    categoryLabel: "AI & Machine Learning",
    categoryIcon: "🤖",
    city: "Kuala Lumpur",
    state: "WP Kuala Lumpur",
    locationDisplay: "Kuala Lumpur / Remote (Malaysia)",
    transitStation: "LRT KL Gateway-Universiti / Remote",
    workArrangement: "Remote (Malaysia)",
    experienceLevel: "Senior (5-8 Yrs)",
    levelKey: "senior",
    salaryMin: 14000,
    salaryMax: 22000,
    currency: "MYR",
    epfPerk: "15% Statutory EPF Employer Top-up",
    postedDate: "1 day ago",
    featured: true,
    urgent: true,
    shortSummary: "Train, fine-tune, and optimize sovereign Bahasa Melayu LLMs, tokenizers, and instruction-tuned open weights for Malaysian enterprise & GovTech adoption.",
    fullDescription: "Join the engineering team behind the renowned Malaya and Mesolitica sovereign open-source AI models. You will spearhead multi-GPU pre-training, parameter-efficient fine-tuning (LoRA/QLoRA), and high-throughput vLLM inference serving customized for Bahasa Melayu, Malaysian dialects, and local code-switching slang.",
    responsibilities: [
      "Curate, clean, and deduplicate multi-billion token Malaysian multilingual datasets (Bahasa Melayu, Manglish, English, Chinese).",
      "Lead distributed pre-training and fine-tuning on multi-node NVIDIA H100 / Grace Blackwell GB200 GPU clusters using PyTorch, DeepSpeed, and Megatron-LM.",
      "Deploy low-latency, high-throughput inference endpoints utilizing vLLM, TensorRT-LLM, and quantization (AWQ / GPTQ).",
      "Collaborate with public sector and enterprise partners across ASEAN for localized domain adaptation."
    ],
    requirements: [
      "Strong hands-on experience with PyTorch, Hugging Face Transformers, and distributed GPU training frameworks.",
      "Demonstrated track record of training or fine-tuning transformer architectures (LLaMA, Mistral, Gemma).",
      "Deep understanding of tokenization nuances, context-window extensions, and attention mechanisms.",
      "Proficiency with Linux GPU drivers, CUDA programming basics, and containerized MLOps workflows."
    ],
    techStack: ["PyTorch", "Hugging Face", "vLLM", "DeepSpeed", "CUDA", "Python", "Docker", "Triton"],
    perks: [
      "100% remote work anywhere in Malaysia",
      "RM 5,000 annual personal compute and learning budget",
      "15% voluntary EPF employer contribution",
      "High-spec workstation with dual RTX 4090 / Cloud GPU quota"
    ],
    regulatoryContext: "Aligned with the Malaysian National AI Office (NAIO) Sovereign AI Framework.",
    applicationUrl: "https://mesolitica.com",
    contactEmail: "careers@mesolitica.com"
  },
  {
    id: "aerodyne-computer-vision-lead",
    title: "Lead Computer Vision & Edge AI Architect",
    company: "Aerodyne Group",
    companyInitials: "AER",
    companyLogoBg: "#0284c7",
    companyType: "Unicorn",
    category: "ai",
    categoryLabel: "AI & Machine Learning",
    categoryIcon: "🤖",
    city: "Cyberjaya",
    state: "Selangor",
    locationDisplay: "Cyberjaya (Living Lab Campus)",
    transitStation: "MRT Cyberjaya City Centre (Feeder Bus)",
    workArrangement: "Hybrid",
    experienceLevel: "Lead / Staff (8+ Yrs)",
    levelKey: "lead",
    salaryMin: 22000,
    salaryMax: 32000,
    currency: "MYR",
    epfPerk: "16% Employer EPF + Stock Options",
    postedDate: "3 days ago",
    featured: true,
    shortSummary: "Architect real-time computer vision models on edge compute hardware for global drone infrastructure inspection operating across 35 countries.",
    fullDescription: "Aerodyne is the world's #1 drone-as-a-service (DaaS) operator, headquartered in Cyberjaya. We are seeking a Lead Computer Vision Engineer to steer our automated defect detection, point-cloud LiDAR reconstruction, and real-time aerial edge telemetry platform.",
    responsibilities: [
      "Design and deploy lightweight deep learning models (YOLO, Segment Anything, RT-DETR) onto NVIDIA Jetson edge compute modules mounted on industrial drones.",
      "Build automated data pipelines ingesting petabytes of 4K aerial photography, thermal scans, and LiDAR point clouds.",
      "Guide a team of 8 computer vision engineers in model quantization, pruning, and ONNX Runtime / TensorRT acceleration.",
      "Benchmark model precision and recall against real-world telecommunication towers, wind turbines, and power grid corridors."
    ],
    requirements: [
      "Master's or Ph.D. in Computer Science, Robotics, or equivalent industrial track record (8+ years).",
      "Mastery of PyTorch, OpenCV, C++, and edge inferencing (NVIDIA Jetson / TensorRT).",
      "Proven production deployments of real-time semantic segmentation or object detection models.",
      "Strong leadership and mentoring experience in agile AI development teams."
    ],
    techStack: ["PyTorch", "C++", "OpenCV", "NVIDIA Jetson", "TensorRT", "YOLOv10", "ROS 2", "AWS"],
    perks: [
      "Competitive base + employee stock equity program",
      "Flexible hybrid model (2 days WFH / 3 days on campus)",
      "Comprehensive family health, dental, and optical insurance",
      "Access to Aerodyne drone flight school & certification"
    ],
    applicationUrl: "https://aerodyne.group/careers",
    contactEmail: "talent@aerodyne.group"
  },
  {
    id: "ytl-nvidia-hpc-sre",
    title: "AI Supercomputing Systems Engineer (NVIDIA GB200 Cluster)",
    company: "YTL Power & NVIDIA AI Cloud",
    companyInitials: "YTL",
    companyLogoBg: "#15803d",
    companyType: "MNC / Semiconductor",
    category: "ai",
    categoryLabel: "AI & Machine Learning",
    categoryIcon: "🤖",
    city: "Kulai / Sedenak",
    state: "Johor",
    locationDisplay: "Kulai, Johor / Kuala Lumpur",
    transitStation: "Sedenak Tech Park Shuttle / KL Sentral Office",
    workArrangement: "Hybrid",
    experienceLevel: "Senior (5-8 Yrs)",
    levelKey: "senior",
    salaryMin: 15000,
    salaryMax: 24000,
    currency: "MYR",
    epfPerk: "14% EPF + Housing Relocation Allowance",
    postedDate: "Just now",
    featured: true,
    shortSummary: "Operate and optimize Southeast Asia's premier 500MW green AI data center supercomputer, scaling InfiniBand fabrics and Slurm clusters for LLM workloads.",
    fullDescription: "Be part of Malaysia's landmark sovereign AI supercomputing partnership between YTL and NVIDIA. You will maintain and fine-tune large-scale GPU clusters deploying liquid-cooled NVIDIA Grace Blackwell GB200 servers, Quantum-2 InfiniBand networking, and high-performance Lustre storage arrays.",
    responsibilities: [
      "Manage job scheduling, node provisioning, and hardware telemetry across thousands of enterprise GPUs using Slurm and Kubernetes (NVIDIA GPU Operator).",
      "Diagnose complex MPI, InfiniBand fabric, and NCCL communication bottlenecks during multi-node LLM pre-training runs.",
      "Automate cluster health checks, thermal monitoring, and predictive GPU hardware failure detection.",
      "Collaborate directly with NVIDIA solutions architects and regional enterprise AI research teams."
    ],
    requirements: [
      "5+ years of experience in High-Performance Computing (HPC), Linux kernel tuning, or hyperscale cloud infrastructure.",
      "Deep understanding of RoCE / InfiniBand, GPUDirect RDMA, and distributed training topology.",
      "Proficiency with Python, Bash, Ansible, Terraform, and containerized orchestration (Docker/K8s).",
      "Familiarity with Slurm, Bright Cluster Manager, or Prometheus GPU metrics."
    ],
    techStack: ["NVIDIA GB200", "InfiniBand", "Slurm", "Kubernetes", "NCCL", "Linux HPC", "Prometheus", "Python"],
    perks: [
      "Direct technical training and certification with NVIDIA engineers",
      "Relocation allowance for engineers based in Johor or KL",
      "Generous medical cover with outpatient specialist coverage",
      "Annual performance bonus tied to supercomputing availability"
    ],
    regulatoryContext: "Key pillar of Malaysia's National AI Infrastructure initiative.",
    applicationUrl: "https://ytlpowerinternational.com/careers"
  },
  {
    id: "mindvalley-genai-product-engineer",
    title: "Generative AI Full-Stack Engineer (Agentic Workflows)",
    company: "Mindvalley",
    companyInitials: "MVY",
    companyLogoBg: "#7c3aed",
    companyType: "Scale-Up",
    category: "ai",
    categoryLabel: "AI & Machine Learning",
    categoryIcon: "🤖",
    city: "Kuala Lumpur",
    state: "WP Kuala Lumpur",
    locationDisplay: "Bangsar, Kuala Lumpur",
    transitStation: "LRT Bangsar (5-min walk)",
    workArrangement: "Hybrid",
    experienceLevel: "Mid-Level (3-5 Yrs)",
    levelKey: "mid",
    salaryMin: 8500,
    salaryMax: 14000,
    currency: "MYR",
    epfPerk: "12% EPF + DE Rantau Support",
    postedDate: "4 days ago",
    shortSummary: "Build personalized AI mentors, LLM agents, and real-time voice synthesis systems powering a global education platform with over 20M users.",
    fullDescription: "Mindvalley's Kuala Lumpur innovation hub is building the future of automated personal growth. You will architect generative AI microservices, RAG architectures with pgvector, and multi-modal AI agents directly interfacing with our web and mobile applications.",
    responsibilities: [
      "Implement multi-agent cognitive workflows with LangGraph, LlamaIndex, and function calling.",
      "Optimize semantic search and retrieval systems with PostgreSQL pgvector and hybrid BM25 search.",
      "Develop responsive user interfaces in Next.js, React, and Tailwind CSS with real-time streaming tokens.",
      "Conduct prompt evaluations, safety red-teaming, and model cost-latency trade-off optimizations."
    ],
    requirements: [
      "3+ years of full-stack engineering with TypeScript/Node.js or Python.",
      "Hands-on experience deploying LLM applications into production (OpenAI, Anthropic, Gemini, or open weights).",
      "Solid understanding of vector embeddings, chunking strategies, and retrieval evaluation metrics.",
      "Passion for user experience, clean UI design, and fast token streaming."
    ],
    techStack: ["TypeScript", "Next.js", "Python", "LangChain", "pgvector", "FastAPI", "Tailwind CSS"],
    perks: [
      "Award-winning Bangsar temple office with gym, sauna, and nap rooms",
      "Flexible hybrid working with work-from-anywhere seasonal months",
      "Unlimited access to all Mindvalley programs and author workshops",
      "Comprehensive international health and wellness insurance"
    ],
    applicationUrl: "https://mindvalley.com/careers"
  },

  // =========================================================================
  // CATEGORY: CYBERSECURITY & SECOPS
  // =========================================================================
  {
    id: "paynet-lead-appsec",
    title: "Lead Application Security (AppSec) Engineer",
    company: "PayNet (Payments Network Malaysia)",
    companyInitials: "PAY",
    companyLogoBg: "#b91c1c",
    companyType: "FinTech Switch",
    category: "cybersecurity",
    categoryLabel: "Cybersecurity & SecOps",
    categoryIcon: "🛡️",
    city: "Kuala Lumpur",
    state: "WP Kuala Lumpur",
    locationDisplay: "Bangsar South, Kuala Lumpur",
    transitStation: "LRT KL Gateway-Universiti",
    workArrangement: "Hybrid",
    experienceLevel: "Lead / Staff (8+ Yrs)",
    levelKey: "lead",
    salaryMin: 20000,
    salaryMax: 30000,
    currency: "MYR",
    epfPerk: "16% Statutory EPF Employer Contribution",
    postedDate: "2 days ago",
    featured: true,
    urgent: true,
    shortSummary: "Secure the backbone of Malaysia's financial system (DuitNow, JomPAY, FPX), embedding threat modeling, SAST/DAST, and Bank Negara RMiT compliance.",
    fullDescription: "PayNet processes billions of Ringgit in real-time interbank switches every day. As the Lead AppSec Engineer, you will establish DevSecOps guardrails across all payment switch microservices, lead red-team reviews, and ensure full compliance with Bank Negara Malaysia (BNM) RMiT and the Cyber Security Act 2024.",
    responsibilities: [
      "Embed automated security testing (SAST, DAST, SCA) into Git-based CI/CD pipelines across 50+ banking microservices.",
      "Conduct threat modeling and architectural security reviews for ISO 20022 real-time financial switch APIs.",
      "Lead external red-team engagements, penetration tests, and manage the responsible disclosure bug bounty program.",
      "Audit cryptographic key management systems (HSMs) and API tokenization protocols."
    ],
    requirements: [
      "8+ years of experience in AppSec, Penetration Testing, or Secure Software Engineering in banking/fintech.",
      "Deep mastery of OWASP Top 10, API Security, OAuth2, mTLS, and hardware security modules (HSMs).",
      "Thorough working knowledge of BNM RMiT (Risk Management in Technology) guidelines and PCI-DSS Level 1.",
      "Certifications such as CISSP, OSCP, or CISM are highly regarded."
    ],
    techStack: ["Burp Suite", "Snyk", "SonarQube", "HashiCorp Vault", "Kubernetes", "Go", "Java", "AWS"],
    perks: [
      "16% employer EPF contribution (highest tier in Malaysia)",
      "Executive medical, dental, and optical plan for family",
      "Guaranteed contractual 13th month salary + performance bonus",
      "Generous parental leave and educational assistance"
    ],
    regulatoryContext: "Governed strictly by Bank Negara Malaysia (BNM) RMiT & Cyber Security Act 2024 (NCII sector).",
    applicationUrl: "https://paynet.my/careers",
    contactEmail: "talent@paynet.my"
  },
  {
    id: "gxbank-cloud-security-specialist",
    title: "Senior Cloud Infrastructure Security Specialist",
    company: "GXBank (Grab-Singtel Digital Bank)",
    companyInitials: "GXB",
    companyLogoBg: "#0f766e",
    companyType: "Scale-Up",
    category: "cybersecurity",
    categoryLabel: "Cybersecurity & SecOps",
    categoryIcon: "🛡️",
    city: "Kuala Lumpur",
    state: "WP Kuala Lumpur",
    locationDisplay: "Kuala Lumpur (Mid Valley / Eco City)",
    transitStation: "LRT Abdullah Hukum / KTM Mid Valley",
    workArrangement: "Hybrid",
    experienceLevel: "Senior (5-8 Yrs)",
    levelKey: "senior",
    salaryMin: 14000,
    salaryMax: 21000,
    currency: "MYR",
    epfPerk: "15% Employer EPF + Grab Employee Discounts",
    postedDate: "1 day ago",
    featured: true,
    shortSummary: "Harden and defend Malaysia's premier digital bank across multi-account AWS cloud architectures, Kubernetes clusters, and Zero Trust networks.",
    fullDescription: "GXBank is Malaysia's first operational digital bank. We run 100% cloud-native architectures on AWS with zero legacy on-premises servers. As a Cloud Security Specialist, you will architect our Zero Trust security posture, automate security compliance posture management, and protect millions of Malaysian deposit accounts.",
    responsibilities: [
      "Architect AWS IAM identity perimeters, least-privilege policies, and SCPs across 40+ cloud accounts.",
      "Implement runtime security defense (Falco, Aqua, AWS GuardDuty) across Amazon EKS microservices.",
      "Enforce Infrastructure as Code (Terraform) security scanning using tfsec, Checkov, and Conftest.",
      "Collaborate with engineering squads to ensure compliance with BNM RMiT 2-hour RTO requirements."
    ],
    requirements: [
      "5+ years focusing on AWS cloud security, container security, and DevSecOps in regulated industries.",
      "Hands-on expertise with AWS Organizations, KMS, GuardDuty, Security Hub, and CloudTrail.",
      "Deep understanding of container escape vectors, network micro-segmentation, and Calico network policies.",
      "Experience with incident response playbooks and cloud forensics."
    ],
    techStack: ["AWS Security", "Terraform", "EKS", "Falco", "HashiCorp Vault", "Wazuh", "Python"],
    perks: [
      "15% voluntary EPF contribution",
      "GrabFood and GrabCar employee monthly corporate allowances",
      "Comprehensive inpatient and outpatient medical coverage",
      "Flexible hybrid model with 2 remote days weekly"
    ],
    regulatoryContext: "Subject to BNM Digital Banking Framework and Cyber Security Act 2024 compliance.",
    applicationUrl: "https://gxbank.my/careers"
  },
  {
    id: "nacsa-partner-threat-hunter",
    title: "Senior Cyber Threat Intelligence & Incident Responder",
    company: "LGMS / Critical Infrastructure Defense Hub",
    companyInitials: "LGM",
    companyLogoBg: "#c2410c",
    companyType: "Scale-Up",
    category: "cybersecurity",
    categoryLabel: "Cybersecurity & SecOps",
    categoryIcon: "🛡️",
    city: "Cyberjaya",
    state: "Selangor",
    locationDisplay: "Cyberjaya / Kuala Lumpur",
    transitStation: "MRT Cyberjaya City Centre",
    workArrangement: "Hybrid",
    experienceLevel: "Senior (5-8 Yrs)",
    levelKey: "senior",
    salaryMin: 13000,
    salaryMax: 19500,
    currency: "MYR",
    epfPerk: "12% EPF + On-call Incident Bonuses",
    postedDate: "5 days ago",
    shortSummary: "Investigate advanced persistent threats (APTs), ransomware outbreaks, and coordinate emergency responses across Malaysia's 11 Critical National Infrastructure sectors.",
    fullDescription: "Defend Malaysian critical infrastructure under the newly enacted Cyber Security Act 2024. You will conduct memory forensics, reverse-engineer malware payloads, track nation-state threat actor campaigns targeting ASEAN, and coordinate emergency remediations.",
    responsibilities: [
      "Analyze malicious binaries, memory dumps, and packet captures to reconstruct adversary attack vectors.",
      "Author threat intelligence reports mapping adversary TTPs to the MITRE ATT&CK framework.",
      "Coordinate with the National Cyber Coordination and Command Centre (NC4) during high-severity ransomware crises.",
      "Develop custom detection rules (YARA, Sigma, Suricata) for national detection telemetry."
    ],
    requirements: [
      "5+ years in digital forensics, incident response (DFIR), or cyber threat intelligence.",
      "Proficiency with disassemblers (Ghidra, IDA Pro) and dynamic sandboxing tools.",
      "Familiarity with Malaysian regulatory mandates under Act 854 (mandatory 6-hour incident disclosure).",
      "Certifications like GCFA, GCIH, OSCP, or equivalent practical CTF achievements."
    ],
    techStack: ["Ghidra", "Wireshark", "Volatility", "YARA", "Splunk", "Velociraptor", "Python"],
    perks: [
      "Competitive emergency response bonus structure",
      "Full sponsorship for SANS / GIAC advanced certifications",
      "Access to cutting-edge threat intelligence feeds and dark-web monitors",
      "Hybrid working flexibility"
    ],
    regulatoryContext: "Directly operationalizes mandates from the Cyber Security Act 2024 (Act 854).",
    applicationUrl: "https://lgms.global/careers"
  },
  {
    id: "boost-bank-secops-engineer",
    title: "SecOps & Vulnerability Management Engineer",
    company: "Boost Bank (Axiata & RHB)",
    companyInitials: "BST",
    companyLogoBg: "#e11d48",
    companyType: "FinTech Switch",
    category: "cybersecurity",
    categoryLabel: "Cybersecurity & SecOps",
    categoryIcon: "🛡️",
    city: "Kuala Lumpur",
    state: "WP Kuala Lumpur",
    locationDisplay: "KL Eco City, Bangsar South",
    transitStation: "LRT Abdullah Hukum (Direct Mall Bridge)",
    workArrangement: "Hybrid",
    experienceLevel: "Mid-Level (3-5 Yrs)",
    levelKey: "mid",
    salaryMin: 7500,
    salaryMax: 12500,
    currency: "MYR",
    epfPerk: "14% Employer EPF Contribution",
    postedDate: "3 days ago",
    shortSummary: "Manage vulnerability lifecycle, API gateway defenses, and continuous penetration testing for an embedded digital bank serving micro-SMEs.",
    fullDescription: "Boost Bank is unlocking financial inclusion for underserved Malaysians. Join our security operations team to oversee web and mobile vulnerability triage, automated patch management, and continuous API security monitoring.",
    responsibilities: [
      "Triaging daily vulnerability scan findings from Tenable, Snyk, and mobile app shielding solutions.",
      "Enforce API gateway rate limiting, mutual TLS (mTLS), and Bot protection rules at Cloudflare WAF.",
      "Participate in weekly security sprints with mobile iOS/Android engineers.",
      "Maintain audit logs and evidence for Bank Negara Malaysia regulatory examinations."
    ],
    requirements: [
      "3+ years in security operations, vulnerability management, or SOC analysis.",
      "Hands-on experience with Nessus, Qualys, or Tenable vulnerability scanners.",
      "Good understanding of mobile app security (OWASP MASVS) and banking malware detection.",
      "Strong communication skills with developer squads."
    ],
    techStack: ["Tenable", "Cloudflare WAF", "Qualys", "Jira SecOps", "Docker", "Python", "OWASP MASVS"],
    perks: [
      "14% employer EPF contribution",
      "Direct transit bridge from LRT Abdullah Hukum",
      "Flexible wellness allowance (gym, medical checkup, books)",
      "Clear engineering progression track"
    ],
    applicationUrl: "https://myboostbank.co"
  },

  // =========================================================================
  // CATEGORY: SOFTWARE ENGINEERING (FULL-STACK & MOBILE)
  // =========================================================================
  {
    id: "carsome-senior-fullstack",
    title: "Senior Full-Stack Engineer (TypeScript & Microservices)",
    company: "Carsome",
    companyInitials: "CSM",
    companyLogoBg: "#f59e0b",
    companyType: "Unicorn",
    category: "software",
    categoryLabel: "Software Engineering",
    categoryIcon: "💻",
    city: "Petaling Jaya",
    state: "Selangor",
    locationDisplay: "Petaling Jaya (Damansara Uptown)",
    transitStation: "MRT TTDI (Shuttle Bus)",
    workArrangement: "Hybrid",
    experienceLevel: "Senior (5-8 Yrs)",
    levelKey: "senior",
    salaryMin: 12000,
    salaryMax: 18500,
    currency: "MYR",
    epfPerk: "14% Employer EPF + Stock Options",
    postedDate: "2 days ago",
    featured: true,
    shortSummary: "Scale Southeast Asia's premier auto e-commerce platform, building high-conversion checkout flows, dealer inspection portals, and real-time pricing microservices.",
    fullDescription: "Carsome is Malaysia's first tech unicorn. As a Senior Full-Stack Engineer in our core consumer platform team, you will engineer fluid React frontends, robust Node.js/Go backend services, and integrate automated AI vehicle valuation models.",
    responsibilities: [
      "Build high-performance web applications using React, Next.js, and TypeScript, maintaining Web Vitals score > 90.",
      "Design clean, testable REST and gRPC microservices backed by PostgreSQL and Redis.",
      "Collaborate with product designers to establish accessible, reusable design systems.",
      "Mentor junior and mid-level engineers through detailed code reviews and architectural RFCs."
    ],
    requirements: [
      "5+ years building full-stack web systems at scale.",
      "Mastery of modern JavaScript/TypeScript, React, Node.js, and SQL.",
      "Proven experience with event-driven architectures and message queues (Kafka, RabbitMQ).",
      "Strong testing habits (Jest, Playwright, integration testing)."
    ],
    techStack: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Kafka", "Docker", "Tailwind CSS"],
    perks: [
      "Flexible hybrid policy (2 days office, 3 days remote)",
      "Car purchase discount schemes for employees",
      "Comprehensive inpatient, outpatient, and optical coverage",
      "Dedicated quarterly engineering hackathons"
    ],
    applicationUrl: "https://carsome.com/careers"
  },
  {
    id: "storehub-mobile-engineer",
    title: "Staff Flutter / Mobile Systems Engineer",
    company: "StoreHub",
    companyInitials: "STH",
    companyLogoBg: "#3b82f6",
    companyType: "Scale-Up",
    category: "software",
    categoryLabel: "Software Engineering",
    categoryIcon: "💻",
    city: "Petaling Jaya",
    state: "Selangor",
    locationDisplay: "Petaling Jaya, Selangor",
    transitStation: "LRT Taman Jaya",
    workArrangement: "Hybrid",
    experienceLevel: "Lead / Staff (8+ Yrs)",
    levelKey: "lead",
    salaryMin: 18000,
    salaryMax: 26000,
    currency: "MYR",
    epfPerk: "15% Employer EPF",
    postedDate: "1 week ago",
    shortSummary: "Architect offline-first point-of-sale mobile apps powering tens of thousands of restaurants and retail stores across Southeast Asia.",
    fullDescription: "StoreHub processes hundreds of millions in transactions for local retail and F&B operators. We need a Staff Mobile Engineer to lead our cross-platform POS application architecture, focusing on bulletproof offline synchronization, low-latency receipt printing, and hardware peripheral integrations.",
    responsibilities: [
      "Lead the architectural evolution of our multi-platform Flutter POS app across iOS, Android, and dedicated POS terminals.",
      "Design reliable local SQLite persistence and bidirectional conflict-resolution sync with cloud servers.",
      "Interface with hardware peripherals via Bluetooth, USB, and serial ports (cash drawers, barcode scanners, thermal printers).",
      "Benchmark frame rendering times to guarantee constant 60 FPS under peak lunch-hour restaurant rushes."
    ],
    requirements: [
      "8+ years of mobile software engineering with deep expertise in Flutter, Dart, or native iOS/Android.",
      "Demonstrated experience with offline-first synchronization protocols and local database state management.",
      "Proficiency in CI/CD mobile build automation (Fastlane, GitHub Actions).",
      "Strong architectural background in Clean Architecture and domain-driven design."
    ],
    techStack: ["Flutter", "Dart", "SQLite", "Kotlin", "Swift", "Offline Sync", "Fastlane", "GCP"],
    perks: [
      "15% employer EPF contribution",
      "Pet-friendly modern office with games room and catered team lunches",
      "Generous hardware budget (MacBook Pro M3 Max + test devices)",
      "Health and wellness reimbursement"
    ],
    applicationUrl: "https://storehub.com/careers"
  },
  {
    id: "policystreet-fullstack-dev",
    title: "Mid-Level Software Engineer (InsurTech Platform)",
    company: "PolicyStreet",
    companyInitials: "POL",
    companyLogoBg: "#059669",
    companyType: "Scale-Up",
    category: "software",
    categoryLabel: "Software Engineering",
    categoryIcon: "💻",
    city: "Kuala Lumpur",
    state: "WP Kuala Lumpur",
    locationDisplay: "Kuala Lumpur (Jalan Tun Razak)",
    transitStation: "MRT Ampang Park",
    workArrangement: "Hybrid",
    experienceLevel: "Mid-Level (3-5 Yrs)",
    levelKey: "mid",
    salaryMin: 6800,
    salaryMax: 11000,
    currency: "MYR",
    epfPerk: "13% Employer EPF",
    postedDate: "4 days ago",
    shortSummary: "Develop digital insurance APIs, road-tax renewal integrations, and partner SDKs for Southeast Asian gig workers and enterprises.",
    fullDescription: "PolicyStreet is an award-winning Malaysian InsurTech company approved by Bank Negara Malaysia. You will build customer-facing quote comparison engines, embed micro-insurance SDKs into gig economy apps, and automate policy issuance workflows.",
    responsibilities: [
      "Build maintainable web features using React, Node.js, and TypeScript.",
      "Integrate insurance underwriter SOAP/REST APIs and normalize unstructured data feeds.",
      "Write comprehensive automated unit and integration test suites.",
      "Collaborate with UX designers to simplify complicated insurance jargon into intuitive user flows."
    ],
    requirements: [
      "3+ years of professional web development experience.",
      "Solid foundation in TypeScript, React, and Node.js or Python backend frameworks.",
      "Familiarity with relational database design (PostgreSQL/MySQL) and indexed queries.",
      "Understanding of asynchronous job processing with BullMQ or Celery."
    ],
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS"],
    perks: [
      "Full medical coverage including mental health therapy sessions",
      "Hybrid setup with 2 days working from home",
      "Subsidized car insurance and road tax benefit",
      "Fast-track career growth in a high-growth fintech"
    ],
    applicationUrl: "https://policystreet.com/careers"
  },

  // =========================================================================
  // CATEGORY: SYSTEM DESIGN & FINTECH BACKEND
  // =========================================================================
  {
    id: "paynet-switch-architect",
    title: "Senior Distributed Systems Backend Engineer (Go & ISO 20022)",
    company: "PayNet (Payments Network Malaysia)",
    companyInitials: "PAY",
    companyLogoBg: "#b91c1c",
    companyType: "FinTech Switch",
    category: "system-design",
    categoryLabel: "System Design & FinTech",
    categoryIcon: "⚡",
    city: "Kuala Lumpur",
    state: "WP Kuala Lumpur",
    locationDisplay: "Bangsar South, Kuala Lumpur",
    transitStation: "LRT KL Gateway-Universiti",
    workArrangement: "Hybrid",
    experienceLevel: "Senior (5-8 Yrs)",
    levelKey: "senior",
    salaryMin: 13500,
    salaryMax: 20000,
    currency: "MYR",
    epfPerk: "16% Employer EPF Contribution",
    postedDate: "3 days ago",
    featured: true,
    shortSummary: "Build and scale high-concurrency payment switches routing millions of DuitNow QR and real-time interbank transactions under sub-50ms latency.",
    fullDescription: "Be the engineer powering national financial transactions for 33 million Malaysians. You will write low-latency Go microservices translating ISO 20022 and ISO 8583 financial messages, handling thousands of transactions per second during festive payday and 11.11 shopping spikes.",
    responsibilities: [
      "Design distributed transaction processing engines with idempotency guarantees and zero double-spend risks.",
      "Optimize message queue routing over Kafka, gRPC, and high-throughput Redis clusters.",
      "Guarantee 99.999% switch uptime in adherence with Bank Negara Malaysia RMiT standards.",
      "Conduct chaos engineering drills to validate instant failover across geo-replicated data centers."
    ],
    requirements: [
      "5+ years developing high-throughput backend services in Go, Java, or Rust.",
      "Deep understanding of distributed consensus, ACID transactions, and optimistic locking.",
      "Experience with financial messaging protocols (ISO 20022 / ISO 8583) is a huge plus.",
      "Familiarity with Linux networking tuning (epoll, TCP buffer sizes, connection pooling)."
    ],
    techStack: ["Go", "Kafka", "PostgreSQL", "Redis", "gRPC", "ISO 20022", "Kubernetes", "Docker"],
    perks: [
      "16% statutory employer EPF contribution",
      "Prestigious national infrastructure mission",
      "Top-tier hospital inpatient coverage for self and dependents",
      "Subsidized parking in Bangsar South"
    ],
    regulatoryContext: "Governed by BNM RMiT mandates (Recovery Time Objective RTO <= 2 hours).",
    applicationUrl: "https://paynet.my"
  },
  {
    id: "airasia-move-backend-lead",
    title: "Principal Backend Architect (High-Concurrency Travel Platform)",
    company: "AirAsia MOVE (Capital A Tech)",
    companyInitials: "AAM",
    companyLogoBg: "#e11d48",
    companyType: "Scale-Up",
    category: "system-design",
    categoryLabel: "System Design & FinTech",
    categoryIcon: "⚡",
    city: "Kuala Lumpur",
    state: "WP Kuala Lumpur",
    locationDisplay: "KL Sentral / RedStation",
    transitStation: "LRT/MRT/Monorail KL Sentral",
    workArrangement: "Hybrid",
    experienceLevel: "Lead / Staff (8+ Yrs)",
    levelKey: "lead",
    salaryMin: 20000,
    salaryMax: 29000,
    currency: "MYR",
    epfPerk: "14% EPF + Free Airline Flights Perk",
    postedDate: "2 days ago",
    shortSummary: "Lead the distributed booking engine handling flash sale inventory contention, dynamic pricing, and cross-airline flight integration.",
    fullDescription: "AirAsia MOVE is ASEAN's premier travel superapp. You will architect high-scale distributed backend systems capable of absorbing 100x traffic surges during 0-fare promotions while preserving inventory consistency.",
    responsibilities: [
      "Architect distributed caching and inventory reservation systems handling hundreds of thousands of simultaneous seat locks.",
      "Refactor legacy monolithic services into modular, event-driven Golang microservices.",
      "Establish cross-team system design guidelines, database sharding strategies, and rate limiting policies.",
      "Collaborate with SRE teams to conduct load testing simulations with k6 and Locust."
    ],
    requirements: [
      "8+ years architecting distributed systems handling millions of daily active users.",
      "Mastery of Golang, Java, or C++, and relational/NoSQL datastores at scale.",
      "Solid grasp of CAP theorem trade-offs, distributed locks (Redlock), and eventual consistency.",
      "Excellent communication and technical leadership skills across cross-functional pods."
    ],
    techStack: ["Go", "Kubernetes", "Kafka", "PostgreSQL", "Redis Cluster", "GCP", "gRPC", "Prometheus"],
    perks: [
      "Heavily discounted and free airline flight tickets across the AirAsia network",
      "14% employer EPF contribution",
      "KL Sentral headquarters with direct access to all MRT/LRT lines",
      "Annual wellness bonus and flexible working arrangement"
    ],
    applicationUrl: "https://airasiamove.com/careers"
  },

  // =========================================================================
  // CATEGORY: DEVOPS, CLOUD & SRE
  // =========================================================================
  {
    id: "aws-malaysia-cloud-architect",
    title: "Senior Cloud Infrastructure & SRE Architect (AWS Region)",
    company: "AWS Malaysia Partner Ecosystem",
    companyInitials: "AWS",
    companyLogoBg: "#ea580c",
    companyType: "Global Engineering Center",
    category: "devops",
    categoryLabel: "DevOps & Cloud SRE",
    categoryIcon: "☁️",
    city: "Kuala Lumpur",
    state: "WP Kuala Lumpur",
    locationDisplay: "Kuala Lumpur (The Exchange TRX)",
    transitStation: "MRT Tun Razak Exchange (TRX)",
    workArrangement: "Hybrid",
    experienceLevel: "Senior (5-8 Yrs)",
    levelKey: "senior",
    salaryMin: 14000,
    salaryMax: 22000,
    currency: "MYR",
    epfPerk: "15% Employer EPF + AWS Certifications Bonus",
    postedDate: "3 days ago",
    featured: true,
    shortSummary: "Accelerate enterprise migrations to the newly launched AWS Malaysia Region (ap-southeast-5), architecting multi-AZ Kubernetes and resilient IaC.",
    fullDescription: "With the commercial launch of the AWS Malaysia Region (`ap-southeast-5`), enterprise banks and government agencies are repatriating workloads to local soil. You will design automated Terraform blueprints, multi-account Control Tower architectures, and Kubernetes platforms delivering single-digit millisecond latency.",
    responsibilities: [
      "Design multi-Availability Zone disaster recovery architectures compliant with BNM RMiT 2-hour RTO requirements.",
      "Automate multi-region CI/CD pipelines using GitLab CI, ArgoCD, and GitHub Actions.",
      "Implement Infrastructure as Code with Terraform and OpenTofu, enforcing policy-as-code via OPA.",
      "Optimize cloud cost allocation (FinOps) and build unified observability dashboards with Datadog and Grafana."
    ],
    requirements: [
      "5+ years in DevOps, Cloud Engineering, or SRE roles.",
      "AWS Certified Solutions Architect (Professional) or DevOps Engineer (Professional).",
      "Deep practical experience with Kubernetes (EKS), Terraform, and Helm charts.",
      "Proficient in Python or Go for infrastructure automation and custom Kubernetes operators."
    ],
    techStack: ["AWS (ap-southeast-5)", "Terraform", "Kubernetes", "ArgoCD", "Datadog", "Docker", "Python", "Prometheus"],
    perks: [
      "Direct work with tier-1 Malaysian enterprise and FinTech migrations",
      "15% employer EPF contribution",
      "TRX landmark office with direct access to MRT interchange",
      "Unlimited AWS certification test vouchers and cloud sandbox quota"
    ],
    regulatoryContext: "Enables compliance with Malaysian local data residency mandates.",
    applicationUrl: "https://aws.amazon.com/careers"
  },
  {
    id: "scb-gbs-sre-lead",
    title: "Lead Site Reliability Engineer (Global Banking Platforms)",
    company: "Standard Chartered Global Business Services (GBS)",
    companyInitials: "SCB",
    companyLogoBg: "#0284c7",
    companyType: "Global Engineering Center",
    category: "devops",
    categoryLabel: "DevOps & Cloud SRE",
    categoryIcon: "☁️",
    city: "Petaling Jaya",
    state: "Selangor",
    locationDisplay: "Technology Park Malaysia / Petaling Jaya",
    transitStation: "LRT Asia Jaya / RapidKL Bus",
    workArrangement: "Hybrid",
    experienceLevel: "Lead / Staff (8+ Yrs)",
    levelKey: "lead",
    salaryMin: 21000,
    salaryMax: 31000,
    currency: "MYR",
    epfPerk: "15% Statutory EPF Employer Contribution",
    postedDate: "5 days ago",
    shortSummary: "Oversee reliability, automated incident remediation, and observability for global transaction systems handling hundreds of billions daily.",
    fullDescription: "Standard Chartered GBS in Malaysia is one of the bank's core technology and operations hubs globally. We are seeking a Lead SRE to champion reliability engineering, error budget policies, and automated canary deployments across thousands of enterprise services.",
    responsibilities: [
      "Define and enforce Service Level Objectives (SLOs) and Error Budgets across retail and corporate banking squads.",
      "Conduct blameless post-mortems and automate self-healing mechanisms with Ansible and Kubernetes operators.",
      "Lead a team of 6 SREs in managing multi-cloud Kubernetes clusters across AWS and Azure.",
      "Drive chaos engineering experiments (Chaos Mesh, Gremlin) to identify cascading failure points."
    ],
    requirements: [
      "8+ years of software engineering or systems engineering experience with at least 4 years in SRE/DevOps.",
      "Deep understanding of the Linux networking stack, TCP/IP, distributed tracing, and eBPF.",
      "Extensive background in enterprise monitoring (Dynatrace, Prometheus, Splunk).",
      "Proven track record of managing high-severity incident bridges."
    ],
    techStack: ["Kubernetes", "Azure", "AWS", "Terraform", "Prometheus", "Dynatrace", "Python", "Go"],
    perks: [
      "15% employer EPF contribution",
      "Flexible hybrid model with great work-life balance culture",
      "Comprehensive global banking benefits including low-interest staff loan rates",
      "Annual performance bonus scheme"
    ],
    applicationUrl: "https://sc.com/careers"
  },

  // =========================================================================
  // CATEGORY: DATA ENGINEERING & PLATFORMS
  // =========================================================================
  {
    id: "opendosm-data-engineer",
    title: "Senior Data Platform Engineer (Open Government Data)",
    company: "GovTech Malaysia & OpenDOSM Initiatives",
    companyInitials: "GTM",
    companyLogoBg: "#0d9488",
    companyType: "GovTech / Agency",
    category: "data",
    categoryLabel: "Data Engineering",
    categoryIcon: "📊",
    city: "Putrajaya / Cyberjaya",
    state: "WP Putrajaya",
    locationDisplay: "Putrajaya / Cyberjaya (Hybrid)",
    transitStation: "MRT Putrajaya Sentral",
    workArrangement: "Hybrid",
    experienceLevel: "Senior (5-8 Yrs)",
    levelKey: "senior",
    salaryMin: 12500,
    salaryMax: 18000,
    currency: "MYR",
    epfPerk: "14% Employer EPF Contribution",
    postedDate: "4 days ago",
    shortSummary: "Build open data pipelines powering OpenDOSM and data.gov.my, turning raw national statistics into clean public REST APIs.",
    fullDescription: "OpenDOSM has modernized public sector data in Malaysia. Join the data engineering team building public pipelines for inflation, labor statistics, foreign trade, and demographic data consumed by researchers, journalists, and citizens across the globe.",
    responsibilities: [
      "Design automated ETL/ELT pipelines ingesting survey and administrative data into PostgreSQL and ClickHouse.",
      "Implement data quality checks, schema evolution validations, and dbt transformation workflows.",
      "Develop high-performance, cached public REST APIs using FastAPI and Next.js.",
      "Maintain open-source repositories and engage with the Malaysian civic tech community."
    ],
    requirements: [
      "5+ years of data engineering with Python, SQL, and modern data stack tools.",
      "Deep knowledge of Apache Airflow, Prefect, or Dagster orchestrators.",
      "Experience with analytical databases (ClickHouse, PostgreSQL, DuckDB).",
      "Commitment to open data principles, documentation, and clean reproducible code."
    ],
    techStack: ["Python", "dbt", "PostgreSQL", "ClickHouse", "Airflow", "FastAPI", "Docker", "Next.js"],
    perks: [
      "Meaningful civic impact helping shape national policies and public transparency",
      "Hybrid flexibility with 2-3 remote days weekly",
      "14% employer EPF contribution",
      "Close collaboration with academic and civic open-source contributors"
    ],
    regulatoryContext: "Follows Malaysian Open Data Guidelines and National Data Sharing Policy.",
    applicationUrl: "https://data.gov.my"
  },
  {
    id: "celcomdigi-streaming-data",
    title: "Lead Streaming Data Architect (Kafka & Spark)",
    company: "CelcomDigi Big Data Hub",
    companyInitials: "CDG",
    companyLogoBg: "#2563eb",
    companyType: "Scale-Up",
    category: "data",
    categoryLabel: "Data Engineering",
    categoryIcon: "📊",
    city: "Subang Jaya",
    state: "Selangor",
    locationDisplay: "Subang Jaya, Selangor",
    transitStation: "LRT Taipan / USJ 7",
    workArrangement: "Hybrid",
    experienceLevel: "Lead / Staff (8+ Yrs)",
    levelKey: "lead",
    salaryMin: 19000,
    salaryMax: 28000,
    currency: "MYR",
    epfPerk: "15% Employer EPF + Free Unlimited Telco Line",
    postedDate: "1 week ago",
    shortSummary: "Architect petabyte-scale real-time event streaming pipelines ingesting billions of network telemetrics, CDRs, and 5G network telemetry.",
    fullDescription: "CelcomDigi is Malaysia's largest telecommunications network. You will lead the data architecture handling billions of streaming events daily, powering real-time churn prevention, 5G cell tower load balancing, and fraud detection algorithms.",
    responsibilities: [
      "Architect multi-cluster Apache Kafka and Apache Flink topologies processing >500,000 events per second.",
      "Manage Lakehouse architectures on Databricks (Delta Lake) and cloud object stores.",
      "Enforce data governance, schema registries (Avro/Protobuf), and strict PDPA privacy masking.",
      "Mentor 10+ data engineers in distributed computing best practices and cost optimizations."
    ],
    requirements: [
      "8+ years in large-scale data engineering with at least 4 years in stream processing.",
      "Mastery of Apache Kafka, Apache Spark, Flink, and Scala or Python.",
      "Extensive experience with Lakehouse architectures (Delta Lake / Apache Iceberg).",
      "Solid understanding of telecommunications data models or high-volume IoT telemetry."
    ],
    techStack: ["Apache Kafka", "Apache Spark", "Flink", "Databricks", "Delta Lake", "Scala", "Python", "GCP"],
    perks: [
      "15% employer EPF contribution",
      "Subsidized high-speed home fiber and free unlimited mobile 5G lines",
      "Comprehensive medical insurance with optical and dental care",
      "Executive gym on-site at CelcomDigi hub"
    ],
    applicationUrl: "https://celcomdigi.com/careers"
  },

  // =========================================================================
  // CATEGORY: SEMICONDUCTOR & EMBEDDED SOFTWARE (PENANG SILICON ISLAND)
  // =========================================================================
  {
    id: "intel-penang-embedded-firmware",
    title: "Senior Linux Kernel & Embedded Firmware Engineer",
    company: "Intel Malaysia (Penang Silicon Island)",
    companyInitials: "INT",
    companyLogoBg: "#0369a1",
    companyType: "MNC / Semiconductor",
    category: "software",
    categoryLabel: "Software Engineering",
    categoryIcon: "💻",
    city: "Bayan Lepas",
    state: "Penang",
    locationDisplay: "Bayan Lepas FIZ, Penang",
    transitStation: "RapidPenang Weld Quay / Airport Link",
    workArrangement: "Hybrid",
    experienceLevel: "Senior (5-8 Yrs)",
    levelKey: "senior",
    salaryMin: 13000,
    salaryMax: 19500,
    currency: "MYR",
    epfPerk: "15% Employer EPF + Employee Stock Purchase Plan",
    postedDate: "2 days ago",
    shortSummary: "Write low-level C/C++ firmware, UEFI bootloaders, and device drivers validating next-generation AI silicon chips at Intel's premier packaging site.",
    fullDescription: "Intel Malaysia has anchored Penang's semiconductor corridor for over 50 years. You will write bare-metal firmware, Linux kernel modules, and power management software for state-of-the-art processors and AI accelerator packages.",
    responsibilities: [
      "Develop low-level device drivers and UEFI/BIOS firmware in C and Assembly.",
      "Perform hardware-software co-design and silicon validation using logic analyzers and oscilloscopes.",
      "Upstream kernel patches and security fixes to the open-source Linux kernel tree.",
      "Collaborate with silicon design teams in Oregon and Haifa on pre-silicon FPGA emulation."
    ],
    requirements: [
      "5+ years in embedded C/C++, Linux kernel driver development, or low-level systems programming.",
      "Deep understanding of x86 / ARM architecture, PCIe protocols, DMA, and memory controllers.",
      "Hands-on experience with hardware debuggers (JTAG) and protocol analyzers.",
      "Bachelor's or Master's in Computer Engineering, Electrical Engineering, or Computer Science."
    ],
    techStack: ["C", "C++", "Linux Kernel", "UEFI / BIOS", "PCIe", "JTAG", "Git", "Python"],
    perks: [
      "15% employer EPF contribution + discounted Intel stock purchase plan (ESPP)",
      "Comprehensive healthcare including full specialist and dental coverage",
      "Penang campus equipped with gym, squash courts, and subsidized cafeterias",
      "Generous annual sabbatical leave program"
    ],
    applicationUrl: "https://intel.com/jobs"
  }
];

// Reactive states
const selectedCategory = ref<string>("all");
const selectedRegion = ref<string>("all");
const selectedWorkType = ref<string>("all");
const selectedLevel = ref<string>("all");
const searchQuery = ref<string>("");
const sortBy = ref<"featured" | "salary-high" | "recent">("featured");
const showSavedOnly = ref<boolean>(false);

// Saved Jobs State (persisted to localStorage)
const savedJobIds = ref<string[]>([]);
const activeJobModal = ref<TechJob | null>(null);
const showPostJobModal = ref<boolean>(false);
const toastMessage = ref<string>("");
const toastVisible = ref<boolean>(false);

// Categories definitions with colors & counts
const categoriesList = [
  { id: "all", label: "All Opportunities", icon: "💼" },
  { id: "ai", label: "AI & Machine Learning", icon: "🤖", color: "#6366f1" },
  { id: "cybersecurity", label: "Cybersecurity & SecOps", icon: "🛡️", color: "#ef4444" },
  { id: "software", label: "Software Engineering", icon: "💻", color: "#3b82f6" },
  { id: "system-design", label: "System Design & FinTech", icon: "⚡", color: "#f59e0b" },
  { id: "devops", label: "DevOps & Cloud SRE", icon: "☁️", color: "#10b981" },
  { id: "data", label: "Data Engineering", icon: "📊", color: "#06b6d4" }
];

const regionsList = [
  { id: "all", label: "All Locations" },
  { id: "kl", label: "Kuala Lumpur (Central)" },
  { id: "cyberjaya", label: "Cyberjaya Tech Hub" },
  { id: "penang", label: "Penang Silicon Island" },
  { id: "selangor", label: "Petaling Jaya / Selangor" },
  { id: "johor", label: "Johor (AI Data Centers)" },
  { id: "remote", label: "Remote (Malaysia-wide)" }
];

const workTypesList = [
  { id: "all", label: "All Work Types" },
  { id: "Hybrid", label: "Hybrid" },
  { id: "Remote (Malaysia)", label: "Remote" },
  { id: "On-site", label: "On-site" }
];

const experienceLevelsList = [
  { id: "all", label: "All Experience Levels" },
  { id: "junior", label: "Junior (0-2 Yrs)" },
  { id: "mid", label: "Mid-Level (3-5 Yrs)" },
  { id: "senior", label: "Senior (5-8 Yrs)" },
  { id: "lead", label: "Lead / Staff (8+ Yrs)" }
];

// Computed Filtered & Sorted Jobs
const filteredJobs = computed(() => {
  let list = JOBS_DATA.filter((job) => {
    // Category filter
    if (selectedCategory.value !== "all" && job.category !== selectedCategory.value) {
      return false;
    }

    // Region filter
    if (selectedRegion.value !== "all") {
      const match =
        (selectedRegion.value === "kl" && (job.city.includes("Kuala Lumpur") || job.state.includes("Kuala Lumpur"))) ||
        (selectedRegion.value === "cyberjaya" && job.city.includes("Cyberjaya")) ||
        (selectedRegion.value === "penang" && job.state.includes("Penang")) ||
        (selectedRegion.value === "selangor" && (job.state.includes("Selangor") || job.city.includes("Petaling Jaya") || job.city.includes("Subang"))) ||
        (selectedRegion.value === "johor" && job.state.includes("Johor")) ||
        (selectedRegion.value === "remote" && job.workArrangement === "Remote (Malaysia)");
      if (!match) return false;
    }

    // Work arrangement
    if (selectedWorkType.value !== "all" && job.workArrangement !== selectedWorkType.value) {
      return false;
    }

    // Level
    if (selectedLevel.value !== "all" && job.levelKey !== selectedLevel.value) {
      return false;
    }

    // Saved only filter
    if (showSavedOnly.value && !savedJobIds.value.includes(job.id)) {
      return false;
    }

    // Search query
    if (searchQuery.value.trim() !== "") {
      const q = searchQuery.value.toLowerCase().trim();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchCompany = job.company.toLowerCase().includes(q);
      const matchCity = job.city.toLowerCase().includes(q);
      const matchSummary = job.shortSummary.toLowerCase().includes(q);
      const matchStack = job.techStack.some((t) => t.toLowerCase().includes(q));
      const matchCategory = job.categoryLabel.toLowerCase().includes(q);

      if (!matchTitle && !matchCompany && !matchCity && !matchSummary && !matchStack && !matchCategory) {
        return false;
      }
    }

    return true;
  });

  // Sorting
  if (sortBy.value === "salary-high") {
    list = [...list].sort((a, b) => b.salaryMax - a.salaryMax);
  } else if (sortBy.value === "recent") {
    // Keep featured first, then natural order
    list = [...list].sort((a, b) => (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0));
  } else {
    // Featured first
    list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  return list;
});

// Stats
const totalCount = computed(() => JOBS_DATA.length);
const aiCount = computed(() => JOBS_DATA.filter((j) => j.category === "ai").length);
const secCount = computed(() => JOBS_DATA.filter((j) => j.category === "cybersecurity").length);
const softwareCount = computed(() => JOBS_DATA.filter((j) => j.category === "software").length);
const fintechCount = computed(() => JOBS_DATA.filter((j) => j.category === "system-design").length);
const devopsCount = computed(() => JOBS_DATA.filter((j) => j.category === "devops").length);
const dataCount = computed(() => JOBS_DATA.filter((j) => j.category === "data").length);

function getCategoryCount(catId: string): number {
  if (catId === "all") return totalCount.value;
  if (catId === "ai") return aiCount.value;
  if (catId === "cybersecurity") return secCount.value;
  if (catId === "software") return softwareCount.value;
  if (catId === "system-design") return fintechCount.value;
  if (catId === "devops") return devopsCount.value;
  if (catId === "data") return dataCount.value;
  return 0;
}

// Format Currency
function formatSalary(amount: number): string {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
    maximumFractionDigits: 0
  }).format(amount);
}

// Bookmark Handlers
function toggleSaveJob(jobId: string, event?: Event) {
  if (event) event.stopPropagation();

  if (savedJobIds.value.includes(jobId)) {
    savedJobIds.value = savedJobIds.value.filter((id) => id !== jobId);
    showToast("Role removed from saved bookmarks");
  } else {
    savedJobIds.value.push(jobId);
    showToast("Role saved to your TechMY bookmarks ⭐");
  }

  saveToStorage();
}

function isJobSaved(jobId: string): boolean {
  return savedJobIds.value.includes(jobId);
}

function saveToStorage() {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("techmy_saved_jobs", JSON.stringify(savedJobIds.value));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  }
}

function loadFromStorage() {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("techmy_saved_jobs");
      if (saved) {
        savedJobIds.value = JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to read saved jobs", e);
    }
  }
}

// Toast
function showToast(msg: string) {
  toastMessage.value = msg;
  toastVisible.value = true;
  setTimeout(() => {
    toastVisible.value = false;
  }, 2600);
}

// Modal controls
function openJobDetails(job: TechJob) {
  activeJobModal.value = job;
}

function closeJobDetails() {
  activeJobModal.value = null;
}

function copyJobLink(job: TechJob) {
  if (typeof window !== "undefined" && navigator.clipboard) {
    const url = `${window.location.origin}${window.location.pathname}#job-${job.id}`;
    navigator.clipboard.writeText(url);
    showToast("Direct job link copied to clipboard!");
  }
}

function clearAllFilters() {
  selectedCategory.value = "all";
  selectedRegion.value = "all";
  selectedWorkType.value = "all";
  selectedLevel.value = "all";
  searchQuery.value = "";
  showSavedOnly.value = false;
}

onMounted(() => {
  loadFromStorage();
});
</script>

<template>
  <div id="malaysian-job-board-component" class="my-job-board-container">
    <!-- Top Header & Context -->
    <div class="job-board-header">
      <div class="header-top-row">
        <div class="badge-tag">
          <span class="badge-flag">🇲🇾</span>
          <span>Malaysian Tech Hiring Portal</span>
        </div>
        <div class="header-action-links">
          <button
            id="saved-jobs-toggle-btn"
            type="button"
            class="saved-toggle-btn"
            :class="{ 'is-active': showSavedOnly }"
            @click="showSavedOnly = !showSavedOnly"
            :title="showSavedOnly ? 'Show all listings' : 'View bookmarked roles'"
          >
            <span class="icon">⭐</span>
            <span>Saved Roles</span>
            <span v-if="savedJobIds.length > 0" class="saved-counter-pill">{{ savedJobIds.length }}</span>
          </button>
          <button
            id="post-job-header-btn"
            type="button"
            class="post-job-cta-btn"
            @click="showPostJobModal = true"
          >
            <span class="icon">+</span>
            <span>Post an Opportunity</span>
          </button>
        </div>
      </div>

      <h2 class="board-headline">Malaysian Tech Engineering Job Board</h2>
      <p class="board-description">
        Curated high-impact opportunities across premier Malaysian FinTech switches, AI research labs, cybersecurity operations, and tech scale-ups. All listings are benchmarked with transparent Ringgit Malaysia (MYR) compensation packages and statutory EPF/compliance insights.
      </p>

      <!-- Key Market Summary Strip -->
      <div class="market-summary-strip">
        <div class="summary-metric">
          <span class="metric-num">{{ totalCount }}</span>
          <span class="metric-lbl">Active MY Tech Roles</span>
        </div>
        <div class="metric-divider"></div>
        <div class="summary-metric">
          <span class="metric-num">RM 16,500</span>
          <span class="metric-lbl">Senior Median / Mo</span>
        </div>
        <div class="metric-divider"></div>
        <div class="summary-metric">
          <span class="metric-num">12% - 16%</span>
          <span class="metric-lbl">Statutory EPF Top-up</span>
        </div>
        <div class="metric-divider"></div>
        <div class="summary-metric">
          <span class="metric-num">100%</span>
          <span class="metric-lbl">Verified MY Employers</span>
        </div>
      </div>
    </div>

    <!-- Category Filter Tabs (Requested: Highlight AI, Cybersecurity, etc.) -->
    <div class="categories-tab-bar" role="tablist">
      <button
        v-for="cat in categoriesList"
        :key="cat.id"
        :id="`category-tab-${cat.id}`"
        type="button"
        role="tab"
        class="category-tab-btn"
        :class="{
          'is-active': selectedCategory === cat.id,
          'tab-ai': cat.id === 'ai',
          'tab-cybersecurity': cat.id === 'cybersecurity'
        }"
        :aria-selected="selectedCategory === cat.id"
        @click="selectedCategory = cat.id"
      >
        <span class="tab-icon">{{ cat.icon }}</span>
        <span class="tab-text">{{ cat.label }}</span>
        <span class="tab-count">{{ getCategoryCount(cat.id) }}</span>
      </button>
    </div>

    <!-- Search & Secondary Filter Toolbar -->
    <div class="board-filter-toolbar">
      <!-- Search Bar -->
      <div class="search-input-wrapper">
        <span class="search-icon">🔍</span>
        <input
          id="job-search-input"
          v-model="searchQuery"
          type="text"
          placeholder="Search by role title, company (PayNet, GXBank), skills (PyTorch, Go, Kafka)..."
          class="search-field"
        />
        <button
          v-if="searchQuery"
          type="button"
          class="clear-search-btn"
          @click="searchQuery = ''"
          title="Clear search input"
        >
          ✕
        </button>
      </div>

      <!-- Secondary Filters Grid -->
      <div class="secondary-filters-row">
        <!-- Location / Hub Dropdown -->
        <div class="filter-dropdown-group">
          <label for="filter-region-select" class="dropdown-label">Location:</label>
          <select id="filter-region-select" v-model="selectedRegion" class="filter-select">
            <option v-for="r in regionsList" :key="r.id" :value="r.id">
              {{ r.label }}
            </option>
          </select>
        </div>

        <!-- Work Arrangement -->
        <div class="filter-dropdown-group">
          <label for="filter-work-select" class="dropdown-label">Work Mode:</label>
          <select id="filter-work-select" v-model="selectedWorkType" class="filter-select">
            <option v-for="w in workTypesList" :key="w.id" :value="w.id">
              {{ w.label }}
            </option>
          </select>
        </div>

        <!-- Experience Level -->
        <div class="filter-dropdown-group">
          <label for="filter-level-select" class="dropdown-label">Experience:</label>
          <select id="filter-level-select" v-model="selectedLevel" class="filter-select">
            <option v-for="lvl in experienceLevelsList" :key="lvl.id" :value="lvl.id">
              {{ lvl.label }}
            </option>
          </select>
        </div>

        <!-- Sort By -->
        <div class="filter-dropdown-group sort-group">
          <label for="filter-sort-select" class="dropdown-label">Sort:</label>
          <select id="filter-sort-select" v-model="sortBy" class="filter-select">
            <option value="featured">Featured First</option>
            <option value="salary-high">Highest Salary (MYR)</option>
            <option value="recent">Recently Added / Urgent</option>
          </select>
        </div>

        <!-- Reset Button -->
        <button
          v-if="selectedCategory !== 'all' || selectedRegion !== 'all' || selectedWorkType !== 'all' || selectedLevel !== 'all' || searchQuery !== '' || showSavedOnly"
          type="button"
          class="reset-filters-btn"
          @click="clearAllFilters"
        >
          Reset Filters
        </button>
      </div>
    </div>

    <!-- Active Filters Feedback Bar -->
    <div class="active-status-bar">
      <div class="status-count">
        Showing <strong>{{ filteredJobs.length }}</strong> of {{ totalCount }} tech opportunities
        <span v-if="selectedCategory !== 'all'" class="filter-indicator-tag">
          Category: {{ categoriesList.find(c => c.id === selectedCategory)?.label }}
        </span>
        <span v-if="showSavedOnly" class="filter-indicator-tag saved-tag">
          ⭐ Bookmarked Roles Only
        </span>
      </div>
      <div class="compliance-note">
        <span>🇲🇾 All salaries in <strong>MYR/mo</strong> under Malaysian labor & EPF standards</span>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredJobs.length === 0" class="empty-state-card">
      <div class="empty-icon">🔎</div>
      <h3 class="empty-title">No listings match your filter criteria</h3>
      <p class="empty-text">
        Try clearing your search keyword or switching categories to explore open roles across other Malaysian tech hubs.
      </p>
      <button type="button" class="empty-reset-btn" @click="clearAllFilters">
        Show All Available Listings
      </button>
    </div>

    <!-- Jobs Grid -->
    <div v-else class="jobs-list-grid">
      <div
        v-for="job in filteredJobs"
        :key="job.id"
        :id="`job-card-${job.id}`"
        class="job-card"
        :class="{
          'is-featured': job.featured,
          'is-ai': job.category === 'ai',
          'is-cyber': job.category === 'cybersecurity'
        }"
        @click="openJobDetails(job)"
      >
        <!-- Card Header -->
        <div class="card-header-row">
          <div class="company-brand-badge" :style="{ backgroundColor: job.companyLogoBg }">
            {{ job.companyInitials }}
          </div>

          <div class="company-info-block">
            <div class="company-name-row">
              <span class="company-name">{{ job.company }}</span>
              <span class="company-type-pill">{{ job.companyType }}</span>
              <span v-if="job.featured" class="featured-badge">Featured</span>
              <span v-if="job.urgent" class="urgent-badge">Urgent Hire</span>
            </div>
            <h3 class="job-title">{{ job.title }}</h3>
          </div>

          <!-- Save Bookmark Button -->
          <button
            :id="`save-job-btn-${job.id}`"
            type="button"
            class="save-btn"
            :class="{ 'is-saved': isJobSaved(job.id) }"
            :title="isJobSaved(job.id) ? 'Remove from bookmarks' : 'Save this job'"
            @click.stop="toggleSaveJob(job.id, $event)"
          >
            <span class="star-icon">{{ isJobSaved(job.id) ? '★' : '☆' }}</span>
          </button>
        </div>

        <!-- Meta Indicators Row (Location, Level, Work Mode) -->
        <div class="card-meta-row">
          <div class="meta-item">
            <span class="meta-icon">📍</span>
            <span>{{ job.locationDisplay }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-icon">💼</span>
            <span class="work-mode-tag" :class="job.workArrangement.toLowerCase().includes('remote') ? 'mode-remote' : 'mode-hybrid'">
              {{ job.workArrangement }}
            </span>
          </div>
          <div class="meta-item">
            <span class="meta-icon">🎯</span>
            <span>{{ job.experienceLevel }}</span>
          </div>
        </div>

        <!-- Salary Highlight Strip -->
        <div class="card-salary-strip">
          <div class="salary-display">
            <span class="salary-figure">{{ formatSalary(job.salaryMin) }} – {{ formatSalary(job.salaryMax) }}</span>
            <span class="salary-period">/ month (MYR)</span>
          </div>
          <div v-if="job.epfPerk" class="epf-badge" :title="job.epfPerk">
            <span>🛡️ {{ job.epfPerk }}</span>
          </div>
        </div>

        <!-- Short Description -->
        <p class="card-summary">{{ job.shortSummary }}</p>

        <!-- Tech Stack Pills -->
        <div class="card-stack-row">
          <span
            v-for="tag in job.techStack.slice(0, 5)"
            :key="tag"
            class="tech-stack-pill"
          >
            {{ tag }}
          </span>
          <span v-if="job.techStack.length > 5" class="tech-more-pill">
            +{{ job.techStack.length - 5 }} more
          </span>
        </div>

        <!-- Card Footer (Posted date & Action CTA) -->
        <div class="card-footer-row">
          <div class="posted-time">
            <span class="posted-dot"></span>
            <span>Posted {{ job.postedDate }}</span>
          </div>

          <div class="card-actions">
            <button
              type="button"
              class="view-details-btn"
              @click.stop="openJobDetails(job)"
            >
              <span>View Full Spec</span>
              <span class="arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Comprehensive Job Details Modal / Drawer -->
    <div
      v-if="activeJobModal"
      class="job-modal-backdrop"
      @click.self="closeJobDetails"
      role="dialog"
      aria-modal="true"
    >
      <div class="job-modal-container">
        <!-- Modal Top Bar -->
        <div class="modal-top-bar">
          <div class="modal-category-indicator">
            <span class="modal-cat-icon">{{ activeJobModal.categoryIcon }}</span>
            <span class="modal-cat-title">{{ activeJobModal.categoryLabel }}</span>
            <span class="modal-cat-sep">•</span>
            <span class="modal-company-type">{{ activeJobModal.companyType }}</span>
          </div>

          <div class="modal-header-actions">
            <button
              type="button"
              class="modal-action-icon-btn"
              :class="{ 'is-saved': isJobSaved(activeJobModal.id) }"
              :title="isJobSaved(activeJobModal.id) ? 'Remove bookmark' : 'Bookmark this role'"
              @click="toggleSaveJob(activeJobModal.id)"
            >
              <span>{{ isJobSaved(activeJobModal.id) ? '★ Saved' : '☆ Save' }}</span>
            </button>
            <button
              type="button"
              class="modal-action-icon-btn"
              title="Copy job link"
              @click="copyJobLink(activeJobModal)"
            >
              <span>🔗 Share</span>
            </button>
            <button
              type="button"
              class="modal-close-btn"
              title="Close specification"
              @click="closeJobDetails"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- Modal Header Content -->
        <div class="modal-header-content">
          <div class="modal-company-row">
            <div class="modal-brand-badge" :style="{ backgroundColor: activeJobModal.companyLogoBg }">
              {{ activeJobModal.companyInitials }}
            </div>
            <div>
              <div class="modal-company-name">{{ activeJobModal.company }}</div>
              <h2 class="modal-job-title">{{ activeJobModal.title }}</h2>
            </div>
          </div>

          <!-- Key Metrics Grid -->
          <div class="modal-metrics-grid">
            <div class="modal-metric-card">
              <span class="metric-label">Base Compensation (MYR)</span>
              <span class="metric-val text-green">{{ formatSalary(activeJobModal.salaryMin) }} – {{ formatSalary(activeJobModal.salaryMax) }} / mo</span>
              <span class="metric-sub">Excludes annual bonuses</span>
            </div>

            <div class="modal-metric-card">
              <span class="metric-label">Location & Transit</span>
              <span class="metric-val">{{ activeJobModal.locationDisplay }}</span>
              <span v-if="activeJobModal.transitStation" class="metric-sub">🚇 {{ activeJobModal.transitStation }}</span>
            </div>

            <div class="modal-metric-card">
              <span class="metric-label">Work Model & Level</span>
              <span class="metric-val">{{ activeJobModal.workArrangement }}</span>
              <span class="metric-sub">{{ activeJobModal.experienceLevel }}</span>
            </div>

            <div class="modal-metric-card">
              <span class="metric-label">EPF & Statutory Benefits</span>
              <span class="metric-val text-blue">{{ activeJobModal.epfPerk || "12% - 13% Statutory EPF" }}</span>
              <span class="metric-sub">PCB/KWSP Compliant</span>
            </div>
          </div>
        </div>

        <!-- Modal Body Scrolling Content -->
        <div class="modal-scroll-body">
          <!-- Role Overview -->
          <div class="modal-section">
            <h4 class="section-heading">About the Role & Mission</h4>
            <p class="section-paragraph">{{ activeJobModal.fullDescription }}</p>
          </div>

          <!-- Regulatory / National Impact Note -->
          <div v-if="activeJobModal.regulatoryContext" class="regulatory-callout-box">
            <span class="callout-icon">🏛️</span>
            <div>
              <strong>Malaysian Regulatory & Ecosystem Context:</strong>
              <p>{{ activeJobModal.regulatoryContext }}</p>
            </div>
          </div>

          <!-- Key Responsibilities -->
          <div class="modal-section">
            <h4 class="section-heading">Key Technical Responsibilities</h4>
            <ul class="bullet-list">
              <li v-for="(resp, i) in activeJobModal.responsibilities" :key="i">
                {{ resp }}
              </li>
            </ul>
          </div>

          <!-- Requirements -->
          <div class="modal-section">
            <h4 class="section-heading">Qualifications & Engineering Background</h4>
            <ul class="bullet-list">
              <li v-for="(req, i) in activeJobModal.requirements" :key="i">
                {{ req }}
              </li>
            </ul>
          </div>

          <!-- Tech Stack -->
          <div class="modal-section">
            <h4 class="section-heading">Core Technology Stack</h4>
            <div class="modal-stack-tags">
              <span v-for="tech in activeJobModal.techStack" :key="tech" class="tech-tag-badge">
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Perks & Malaysian Statutory Benefits -->
          <div class="modal-section">
            <h4 class="section-heading">Benefits, Perks & Company Culture</h4>
            <div class="perks-grid">
              <div v-for="(perk, i) in activeJobModal.perks" :key="i" class="perk-item">
                <span class="perk-check">✓</span>
                <span class="perk-text">{{ perk }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer CTA -->
        <div class="modal-footer-cta">
          <div class="footer-note">
            <span>Posted {{ activeJobModal.postedDate }} • Verified Malaysian Engineering Team</span>
          </div>

          <div class="footer-actions">
            <a
              v-if="activeJobModal.contactEmail"
              :href="`mailto:${activeJobModal.contactEmail}?subject=Application for ${encodeURIComponent(activeJobModal.title)} via TechMY`"
              class="secondary-action-btn"
            >
              Email Recruiter
            </a>
            <a
              :href="activeJobModal.applicationUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="primary-apply-btn"
            >
              <span>Apply on Company Portal</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Post a Job Modal -->
    <div
      v-if="showPostJobModal"
      class="job-modal-backdrop"
      @click.self="showPostJobModal = false"
      role="dialog"
      aria-modal="true"
    >
      <div class="job-modal-container post-modal">
        <div class="modal-top-bar">
          <span class="modal-cat-title">🇲🇾 Post an Opportunity on TechMY</span>
          <button type="button" class="modal-close-btn" @click="showPostJobModal = false">✕</button>
        </div>

        <div class="post-modal-content">
          <div class="post-header-icon">🚀</div>
          <h3>Connect with Top Malaysian Tech Talent</h3>
          <p>
            TechMY is read by thousands of software engineers, AI researchers, and cybersecurity specialists in Malaysia. All listings are free for local startups and engineering hubs to foster the local ecosystem.
          </p>

          <div class="post-instruction-box">
            <h4>How to submit your job listing:</h4>
            <ol>
              <li>Ensure the role is located in Malaysia (or offers remote work for Malaysian residents).</li>
              <li>Provide transparent compensation in Ringgit Malaysia (MYR) with statutory EPF information.</li>
              <li>Submit your company careers page or GitHub repo job spec directly via email or GitHub pull request.</li>
            </ol>
          </div>

          <div class="post-modal-actions">
            <a
              href="mailto:careers@techmy.dev?subject=New Job Listing Submission - TechMY"
              class="primary-apply-btn"
              @click="showPostJobModal = false; showToast('Opening mail client...')"
            >
              Submit Opportunity via Email
            </a>
            <a
              href="https://github.com/mhdhamka/TechMY"
              target="_blank"
              rel="noopener noreferrer"
              class="secondary-action-btn"
            >
              Open GitHub PR
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Feedback Toast -->
    <div v-if="toastVisible" class="feedback-toast">
      {{ toastMessage }}
    </div>
  </div>
</template>

<style scoped>
/* Main Container */
.my-job-board-container {
  margin: 2rem 0;
  font-family: var(--vp-font-family-base, sans-serif);
}

/* Header */
.job-board-header {
  background: var(--vp-c-bg-alt, #161b22);
  border: 1px solid var(--vp-c-divider, #30363d);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.header-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.badge-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.75rem;
  background: rgba(46, 160, 67, 0.15);
  border: 1px solid rgba(46, 160, 67, 0.3);
  border-radius: 9999px;
  color: #3fb950;
  font-size: 0.82rem;
  font-weight: 600;
}

.header-action-links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.saved-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  background: var(--vp-c-bg-soft, #21262d);
  border: 1px solid var(--vp-c-divider, #30363d);
  color: var(--vp-c-text-1, #f0f6fc);
  cursor: pointer;
  transition: all 0.2s ease;
}

.saved-toggle-btn:hover {
  border-color: #f59e0b;
}

.saved-toggle-btn.is-active {
  background: rgba(245, 158, 11, 0.15);
  border-color: #f59e0b;
  color: #f59e0b;
}

.saved-counter-pill {
  padding: 0.1rem 0.45rem;
  border-radius: 9999px;
  background: #f59e0b;
  color: #000;
  font-size: 0.72rem;
  font-weight: 700;
}

.post-job-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.85rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  background: #2ea043;
  color: #ffffff;
  border: 1px solid #238636;
  cursor: pointer;
  transition: background 0.2s ease;
}

.post-job-cta-btn:hover {
  background: #238636;
}

.board-headline {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1, #f0f6fc);
  margin: 0.5rem 0;
  letter-spacing: -0.015em;
}

.board-description {
  color: var(--vp-c-text-2, #8b949e);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0 0 1.25rem 0;
}

/* Market Summary Strip */
.market-summary-strip {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
  align-items: center;
  background: var(--vp-c-bg, #0d1117);
  border: 1px solid var(--vp-c-divider, #30363d);
  border-radius: 8px;
  padding: 0.75rem 1rem;
}

.summary-metric {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.metric-num {
  font-size: 1.15rem;
  font-weight: 700;
  color: #3fb950;
}

.metric-lbl {
  font-size: 0.75rem;
  color: var(--vp-c-text-2, #8b949e);
  margin-top: 0.15rem;
}

.metric-divider {
  width: 1px;
  height: 28px;
  background: var(--vp-c-divider, #30363d);
}

/* Category Filter Tabs (Requested AI & Cybersecurity emphasis) */
.categories-tab-bar {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  margin-bottom: 1.25rem;
  scrollbar-width: thin;
}

.category-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1rem;
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 600;
  white-space: nowrap;
  background: var(--vp-c-bg-alt, #161b22);
  border: 1px solid var(--vp-c-divider, #30363d);
  color: var(--vp-c-text-2, #8b949e);
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-tab-btn:hover {
  border-color: var(--vp-c-text-1, #f0f6fc);
  color: var(--vp-c-text-1, #f0f6fc);
}

.category-tab-btn.is-active {
  background: #2ea043;
  border-color: #2ea043;
  color: #ffffff;
}

.category-tab-btn.tab-ai.is-active {
  background: #4f46e5;
  border-color: #4f46e5;
  color: #ffffff;
}

.category-tab-btn.tab-cybersecurity.is-active {
  background: #dc2626;
  border-color: #dc2626;
  color: #ffffff;
}

.tab-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.1rem 0.45rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.15);
  font-size: 0.75rem;
  font-weight: 700;
}

/* Filter Toolbar */
.board-filter-toolbar {
  background: var(--vp-c-bg-alt, #161b22);
  border: 1px solid var(--vp-c-divider, #30363d);
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
}

.search-icon {
  position: absolute;
  left: 0.85rem;
  pointer-events: none;
  font-size: 0.95rem;
}

.search-field {
  width: 100%;
  padding: 0.65rem 2.25rem 0.65rem 2.4rem;
  background: var(--vp-c-bg, #0d1117);
  border: 1px solid var(--vp-c-divider, #30363d);
  border-radius: 8px;
  color: var(--vp-c-text-1, #f0f6fc);
  font-size: 0.92rem;
  outline: none;
  transition: border-color 0.2s ease;
}

.search-field:focus {
  border-color: #2ea043;
}

.clear-search-btn {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  color: var(--vp-c-text-2, #8b949e);
  cursor: pointer;
  font-size: 0.85rem;
}

.secondary-filters-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.filter-dropdown-group {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.dropdown-label {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--vp-c-text-2, #8b949e);
  white-space: nowrap;
}

.filter-select {
  background: var(--vp-c-bg, #0d1117);
  border: 1px solid var(--vp-c-divider, #30363d);
  color: var(--vp-c-text-1, #f0f6fc);
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  font-size: 0.82rem;
  outline: none;
  cursor: pointer;
}

.reset-filters-btn {
  margin-left: auto;
  padding: 0.35rem 0.75rem;
  font-size: 0.78rem;
  font-weight: 600;
  background: none;
  border: 1px dashed var(--vp-c-divider, #30363d);
  color: var(--vp-c-text-2, #8b949e);
  border-radius: 6px;
  cursor: pointer;
}

.reset-filters-btn:hover {
  border-color: #ef4444;
  color: #ef4444;
}

/* Active Status Bar */
.active-status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  font-size: 0.82rem;
  color: var(--vp-c-text-2, #8b949e);
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-indicator-tag {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  background: rgba(46, 160, 67, 0.15);
  border-radius: 4px;
  color: #3fb950;
  font-weight: 600;
  margin-left: 0.4rem;
}

.filter-indicator-tag.saved-tag {
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
}

/* Empty State */
.empty-state-card {
  text-align: center;
  padding: 3rem 1.5rem;
  background: var(--vp-c-bg-alt, #161b22);
  border: 1px dashed var(--vp-c-divider, #30363d);
  border-radius: 12px;
  margin: 1.5rem 0;
}

.empty-icon {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
}

.empty-title {
  font-size: 1.2rem;
  color: var(--vp-c-text-1, #f0f6fc);
  margin-bottom: 0.5rem;
}

.empty-text {
  color: var(--vp-c-text-2, #8b949e);
  font-size: 0.9rem;
  max-width: 480px;
  margin: 0 auto 1.25rem auto;
}

.empty-reset-btn {
  background: #2ea043;
  color: #fff;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

/* Job Cards Grid */
.jobs-list-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.job-card {
  background: var(--vp-c-bg-alt, #161b22);
  border: 1px solid var(--vp-c-divider, #30363d);
  border-radius: 10px;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.job-card:hover {
  border-color: #3fb950;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

.job-card.is-ai:hover {
  border-color: #6366f1;
}

.job-card.is-cyber:hover {
  border-color: #ef4444;
}

.job-card.is-featured {
  border-left: 4px solid #2ea043;
}

.job-card.is-ai.is-featured {
  border-left: 4px solid #6366f1;
}

.job-card.is-cyber.is-featured {
  border-left: 4px solid #ef4444;
}

/* Card Header */
.card-header-row {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  margin-bottom: 0.75rem;
}

.company-brand-badge {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 800;
  font-size: 0.88rem;
  letter-spacing: 0.05em;
  flex-shrink: 0;
}

.company-info-block {
  flex: 1;
}

.company-name-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.2rem;
}

.company-name {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--vp-c-text-2, #8b949e);
}

.company-type-pill {
  font-size: 0.72rem;
  padding: 0.1rem 0.45rem;
  border-radius: 4px;
  background: var(--vp-c-bg-soft, #21262d);
  color: var(--vp-c-text-2, #8b949e);
  border: 1px solid var(--vp-c-divider, #30363d);
}

.featured-badge {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.1rem 0.45rem;
  border-radius: 4px;
  background: rgba(46, 160, 67, 0.15);
  color: #3fb950;
  border: 1px solid rgba(46, 160, 67, 0.3);
}

.urgent-badge {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.1rem 0.45rem;
  border-radius: 4px;
  background: rgba(220, 38, 38, 0.15);
  color: #f87171;
  border: 1px solid rgba(220, 38, 38, 0.3);
}

.job-title {
  font-size: 1.12rem;
  font-weight: 700;
  color: var(--vp-c-text-1, #f0f6fc);
  margin: 0;
  line-height: 1.35;
}

.save-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  font-size: 1.3rem;
  color: var(--vp-c-text-2, #8b949e);
  transition: color 0.15s ease;
}

.save-btn:hover,
.save-btn.is-saved {
  color: #f59e0b;
}

/* Card Meta */
.card-meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.82rem;
  color: var(--vp-c-text-2, #8b949e);
  margin-bottom: 0.75rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.work-mode-tag {
  font-weight: 600;
  padding: 0.05rem 0.45rem;
  border-radius: 4px;
}

.work-mode-tag.mode-remote {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
}

.work-mode-tag.mode-hybrid {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
}

/* Salary Strip */
.card-salary-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: var(--vp-c-bg, #0d1117);
  border: 1px solid var(--vp-c-divider, #30363d);
  border-radius: 6px;
  margin-bottom: 0.75rem;
}

.salary-figure {
  font-size: 1rem;
  font-weight: 700;
  color: #3fb950;
}

.salary-period {
  font-size: 0.78rem;
  color: var(--vp-c-text-2, #8b949e);
  margin-left: 0.3rem;
}

.epf-badge {
  font-size: 0.76rem;
  font-weight: 600;
  color: #60a5fa;
}

.card-summary {
  font-size: 0.88rem;
  color: var(--vp-c-text-1, #e6edf3);
  line-height: 1.5;
  margin: 0 0 0.75rem 0;
}

/* Tech Stack */
.card-stack-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.85rem;
}

.tech-stack-pill {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.15rem 0.55rem;
  border-radius: 4px;
  background: var(--vp-c-bg-soft, #21262d);
  border: 1px solid var(--vp-c-divider, #30363d);
  color: var(--vp-c-text-2, #8b949e);
}

.tech-more-pill {
  font-size: 0.72rem;
  padding: 0.15rem 0.45rem;
  color: var(--vp-c-text-2, #8b949e);
}

/* Card Footer */
.card-footer-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.65rem;
  border-top: 1px solid var(--vp-c-divider, #30363d);
  font-size: 0.8rem;
  color: var(--vp-c-text-2, #8b949e);
}

.posted-time {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.posted-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #3fb950;
}

.view-details-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: #3fb950;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.2rem 0;
}

.view-details-btn:hover {
  text-decoration: underline;
}

/* Modal / Drawer */
.job-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
}

.job-modal-container {
  background: var(--vp-c-bg-alt, #161b22);
  border: 1px solid var(--vp-c-divider, #30363d);
  border-radius: 14px;
  width: 100%;
  max-width: 820px;
  max-height: 88vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
}

.job-modal-container.post-modal {
  max-width: 580px;
}

/* Modal Top Bar */
.modal-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 1.25rem;
  background: var(--vp-c-bg, #0d1117);
  border-bottom: 1px solid var(--vp-c-divider, #30363d);
}

.modal-category-indicator {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: var(--vp-c-text-2, #8b949e);
  font-weight: 600;
}

.modal-header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.modal-action-icon-btn {
  background: var(--vp-c-bg-soft, #21262d);
  border: 1px solid var(--vp-c-divider, #30363d);
  color: var(--vp-c-text-1, #f0f6fc);
  padding: 0.3rem 0.65rem;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
}

.modal-action-icon-btn.is-saved {
  color: #f59e0b;
  border-color: #f59e0b;
}

.modal-close-btn {
  background: none;
  border: none;
  color: var(--vp-c-text-2, #8b949e);
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.2rem 0.4rem;
}

.modal-close-btn:hover {
  color: #ffffff;
}

/* Modal Header Content */
.modal-header-content {
  padding: 1.25rem;
  border-bottom: 1px solid var(--vp-c-divider, #30363d);
}

.modal-company-row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 1rem;
}

.modal-brand-badge {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1rem;
  font-weight: 800;
}

.modal-company-name {
  font-size: 0.88rem;
  color: var(--vp-c-text-2, #8b949e);
  font-weight: 600;
}

.modal-job-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--vp-c-text-1, #f0f6fc);
  margin: 0;
  line-height: 1.3;
}

/* Metrics Grid */
.modal-metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 0.75rem;
}

.modal-metric-card {
  background: var(--vp-c-bg, #0d1117);
  border: 1px solid var(--vp-c-divider, #30363d);
  border-radius: 8px;
  padding: 0.65rem 0.85rem;
  display: flex;
  flex-direction: column;
}

.modal-metric-card .metric-label {
  font-size: 0.72rem;
  color: var(--vp-c-text-2, #8b949e);
  font-weight: 600;
}

.modal-metric-card .metric-val {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--vp-c-text-1, #f0f6fc);
  margin: 0.2rem 0;
}

.modal-metric-card .metric-val.text-green {
  color: #3fb950;
}

.modal-metric-card .metric-val.text-blue {
  color: #60a5fa;
}

.modal-metric-card .metric-sub {
  font-size: 0.72rem;
  color: var(--vp-c-text-2, #8b949e);
}

/* Modal Scrolling Body */
.modal-scroll-body {
  padding: 1.25rem;
  overflow-y: auto;
  flex: 1;
}

.modal-section {
  margin-bottom: 1.5rem;
}

.section-heading {
  font-size: 1rem;
  font-weight: 700;
  color: var(--vp-c-text-1, #f0f6fc);
  margin: 0 0 0.65rem 0;
  border-bottom: 1px solid var(--vp-c-divider, #30363d);
  padding-bottom: 0.35rem;
}

.section-paragraph {
  font-size: 0.92rem;
  color: var(--vp-c-text-1, #e6edf3);
  line-height: 1.6;
  margin: 0;
}

.regulatory-callout-box {
  display: flex;
  gap: 0.75rem;
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin-bottom: 1.25rem;
  font-size: 0.85rem;
  color: #f59e0b;
}

.callout-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.bullet-list {
  margin: 0;
  padding-left: 1.25rem;
  color: var(--vp-c-text-1, #e6edf3);
  font-size: 0.9rem;
  line-height: 1.6;
}

.bullet-list li {
  margin-bottom: 0.4rem;
}

.modal-stack-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag-badge {
  background: var(--vp-c-bg, #0d1117);
  border: 1px solid var(--vp-c-divider, #30363d);
  color: #3fb950;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
}

.perks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.5rem;
}

.perk-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--vp-c-bg, #0d1117);
  border: 1px solid var(--vp-c-divider, #30363d);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
}

.perk-check {
  color: #3fb950;
  font-weight: bold;
}

/* Modal Footer */
.modal-footer-cta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background: var(--vp-c-bg, #0d1117);
  border-top: 1px solid var(--vp-c-divider, #30363d);
  flex-wrap: wrap;
  gap: 0.75rem;
}

.footer-note {
  font-size: 0.78rem;
  color: var(--vp-c-text-2, #8b949e);
}

.footer-actions {
  display: flex;
  gap: 0.65rem;
}

.secondary-action-btn {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  background: var(--vp-c-bg-soft, #21262d);
  border: 1px solid var(--vp-c-divider, #30363d);
  color: var(--vp-c-text-1, #f0f6fc);
  text-decoration: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}

.secondary-action-btn:hover {
  border-color: var(--vp-c-text-1, #f0f6fc);
}

.primary-apply-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  background: #2ea043;
  color: #ffffff !important;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s ease;
}

.primary-apply-btn:hover {
  background: #238636;
}

/* Post Modal Body */
.post-modal-content {
  padding: 1.5rem;
  text-align: center;
}

.post-header-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.post-modal-content h3 {
  font-size: 1.3rem;
  color: var(--vp-c-text-1, #f0f6fc);
  margin: 0 0 0.5rem 0;
}

.post-modal-content p {
  font-size: 0.9rem;
  color: var(--vp-c-text-2, #8b949e);
  line-height: 1.5;
  margin-bottom: 1.25rem;
}

.post-instruction-box {
  background: var(--vp-c-bg, #0d1117);
  border: 1px solid var(--vp-c-divider, #30363d);
  border-radius: 8px;
  padding: 1rem;
  text-align: left;
  margin-bottom: 1.5rem;
}

.post-instruction-box h4 {
  font-size: 0.88rem;
  color: #3fb950;
  margin: 0 0 0.5rem 0;
}

.post-instruction-box ol {
  margin: 0;
  padding-left: 1.2rem;
  font-size: 0.82rem;
  color: var(--vp-c-text-1, #e6edf3);
  line-height: 1.6;
}

.post-modal-actions {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
}

/* Toast */
.feedback-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: #238636;
  color: #ffffff;
  padding: 0.65rem 1.15rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  z-index: 100000;
  animation: fadeInToast 0.2s ease;
}

@keyframes fadeInToast {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .market-summary-strip {
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
  .metric-divider {
    display: none;
  }
  .card-salary-strip {
    flex-direction: column;
    align-items: flex-start;
  }
  .modal-metrics-grid {
    grid-template-columns: 1fr;
  }
  .modal-footer-cta {
    flex-direction: column;
    align-items: stretch;
  }
  .footer-actions {
    flex-direction: column;
  }
}
</style>
