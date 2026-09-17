<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from "vue";

export interface CoWorkingDetails {
  hours: string;
  pricing: {
    dayPass?: string;
    hotDesk?: string;
    dedicatedDesk?: string;
    privateOffice?: string;
  };
  amenities: string[];
  hostedCommunities: string[];
  transitInfo: string;
  perksNote?: string;
}

export interface TechLandmark {
  id: string;
  name: string;
  category: "hub" | "coworking" | "university";
  categoryLabel: string;
  region: "central" | "northern" | "southern" | "east-coast" | "borneo";
  regionLabel: string;
  city: string;
  state: string;
  coordinates: [number, number]; // [lat, lng]
  description: string;
  highlights: string[];
  techTags: string[];
  notableEntities: string[];
  websiteUrl: string;
  coworkingDetails?: CoWorkingDetails;
}

// Filters & State
const activeCategory = ref<string>("all");
const activeRegion = ref<string>("all");
const searchQuery = ref<string>("");
const selectedLandmarkId = ref<string>("worq-kl-gateway");
const viewMode = ref<"map" | "grid">("map");
const mapTheme = ref<"dark" | "light">("dark");
const isMapReady = ref<boolean>(false);

const mapContainerRef = ref<HTMLElement | null>(null);
let mapInstance: any = null;
let leafletModule: any = null;
let markerLayerGroup: any = null;
const markerMap = new Map<string, any>();

// Preset Region Camera Targets
const presetViews: Record<string, { center: [number, number]; zoom: number; label: string }> = {
  all: { center: [4.15, 108.85], zoom: 6, label: "All Malaysia" },
  kl: { center: [3.1412, 101.6869], zoom: 13, label: "Kuala Lumpur" },
  cyberjaya: { center: [2.9213, 101.6559], zoom: 14, label: "Cyberjaya" },
  penang: { center: [5.3620, 100.3120], zoom: 13, label: "Penang" },
  johor: { center: [1.5300, 103.6500], zoom: 11, label: "Johor" },
  borneo: { center: [2.8000, 113.2000], zoom: 7, label: "Borneo" }
};

const categories = [
  { id: "all", label: "All Locations", count: 24 },
  { id: "coworking", label: "Co-Working Spaces", color: "#f59e0b" },
  { id: "hub", label: "Tech Hubs & Parks", color: "#10b981" },
  { id: "university", label: "University Labs", color: "#a855f7" }
];

const landmarks: TechLandmark[] = [
  // ==========================================
  // 1. KUALA LUMPUR
  // ==========================================
  {
    id: "worq-kl-gateway",
    name: "WORQ Coworking (KL Gateway & Bangsar South)",
    category: "coworking",
    categoryLabel: "Co-Working Space",
    region: "central",
    regionLabel: "Kuala Lumpur",
    city: "Bangsar South",
    state: "Kuala Lumpur",
    coordinates: [3.1147, 101.6669],
    description: "The primary grassroots community hub for Kuala Lumpur tech meetups, hosting weekly developer hangouts, ReactJS MY, GDG study jams, and PyCon workshops.",
    highlights: ["Host of major developer meetups & hackathons", "24/7 biometric access with 1 Gbps redundant fiber", "Active tech community manager network"],
    techTags: ["Developer Community", "Tech Meetups", "Hackathons", "Startup Incubator"],
    notableEntities: ["ReactJS Malaysia", "GDG Kuala Lumpur", "DevOps Malaysia", "Python MY"],
    websiteUrl: "https://worq.space",
    coworkingDetails: {
      hours: "24/7 for Dedicated Members • Mon-Fri 9:00 AM - 6:00 PM for Day Passes",
      pricing: {
        dayPass: "RM 35 / day",
        hotDesk: "RM 350 / month",
        dedicatedDesk: "RM 650 / month",
        privateOffice: "From RM 700 / pax"
      },
      amenities: [
        "1 Gbps dual-ISP symmetric fiber",
        "150-pax tech event hall with projector & mic",
        "Soundproof private call booths",
        "Free-flow barista espresso & kombucha",
        "Nap pods & shower rooms",
        "Ergonomic mesh chairs"
      ],
      hostedCommunities: ["ReactJS MY", "GDG KL", "DevOps Malaysia", "PyCon MY", "Flutter KL"],
      transitInfo: "Direct linked pedestrian bridge to LRT KL Gateway-Universiti (Kelana Jaya Line).",
      perksNote: "Very active weekly Wednesday Developer Coffee Hours and hack-nights."
    }
  },
  {
    id: "common-ground-dh",
    name: "Common Ground (Damansara Heights)",
    category: "coworking",
    categoryLabel: "Co-Working Space",
    region: "central",
    regionLabel: "Kuala Lumpur",
    city: "Damansara Heights",
    state: "Kuala Lumpur",
    coordinates: [3.1537, 101.6617],
    description: "Premium venture and tech workspace housing regional venture capital funds, fintech scale-ups, and executive engineering squads.",
    highlights: ["Proximity to top Southeast Asian VC funds", "High-spec executive meeting suites", "Direct cross-border partner access across SEA"],
    techTags: ["Venture Capital", "Fintech Scale-Ups", "Executive Suites", "Angel Investors"],
    notableEntities: ["500 Global", "Regional Tech VCs", "FinTech Startups"],
    websiteUrl: "https://commonground.work",
    coworkingDetails: {
      hours: "24/7 Access for Members • Mon-Fri 9:00 AM - 6:00 PM (Visitor)",
      pricing: {
        dayPass: "RM 50 / day",
        hotDesk: "RM 499 / month",
        dedicatedDesk: "RM 799 / month",
        privateOffice: "From RM 1,100 / pax"
      },
      amenities: [
        "High-security encrypted Wi-Fi network",
        "Boardrooms with 4K video conferencing",
        "Artisan cafe & lounge",
        "Daily mail handling & business registration address",
        "Wellness and yoga corner"
      ],
      hostedCommunities: ["Southeast Asia VC Network", "FinTech Founders Forum", "Tech CFO Circle"],
      transitInfo: "3-minute walk to MRT Pusat Bandar Damansara (Kajang Line).",
      perksNote: "Ideal for startups fundraising and speaking with venture capitalists."
    }
  },
  {
    id: "common-ground-bb",
    name: "Common Ground (Bukit Bintang / KLCC)",
    category: "coworking",
    categoryLabel: "Co-Working Space",
    region: "central",
    regionLabel: "Kuala Lumpur",
    city: "Bukit Bintang",
    state: "Kuala Lumpur",
    coordinates: [3.1488, 101.7118],
    description: "Centrally located in Kuala Lumpur's golden triangle, attracting international remote engineers, digital nomads, and growth-stage web startups.",
    highlights: ["Walking distance to KLCC and Pavilion", "Panoramic city skyline views", "Regular community networking mixers"],
    techTags: ["Digital Nomad", "Remote Engineering", "Downtown KL", "Global Tech"],
    notableEntities: ["International Tech Expats", "SaaS Founders", "Digital Agencies"],
    websiteUrl: "https://commonground.work",
    coworkingDetails: {
      hours: "24/7 Member Access • Visitor Desk 9am - 6pm",
      pricing: {
        dayPass: "RM 50 / day",
        hotDesk: "RM 499 / month",
        dedicatedDesk: "RM 799 / month"
      },
      amenities: [
        "Gigabit internet connection",
        "Phone booths & breakout zones",
        "Complimentary micro-roastery coffee",
        "Locker rentals & printing services"
      ],
      hostedCommunities: ["Kuala Lumpur Digital Nomads", "Remote Tech Malaysia", "Crypto & Web3 MY"],
      transitInfo: "5-minute walk to MRT/Monorail Bukit Bintang interchange.",
      perksNote: "Certified under Malaysia's DE Rantau Digital Nomad Pass program."
    }
  },
  {
    id: "colabs-starling",
    name: "Co-labs Coworking (The Starling Mall, Damansara Uptown)",
    category: "coworking",
    categoryLabel: "Co-Working Space",
    region: "central",
    regionLabel: "Kuala Lumpur / PJ",
    city: "Petaling Jaya",
    state: "Selangor",
    coordinates: [3.1362, 101.6231],
    description: "Modern, sustainable coworking sanctuary equipped with a dedicated amphitheater for tech demos, panel discussions, and developer conferences.",
    highlights: ["200-pax auditorium amphitheater", "Acoustically treated podcasting studio", "Surrounded by popular Uptown dining & cafes"],
    techTags: ["Tech Talks", "Auditorium Demos", "Podcast Studio", "Agile Pods"],
    notableEntities: ["B2B SaaS Teams", "Design Systems Guild", "Mobile Dev Guild"],
    websiteUrl: "https://co-labs.asia",
    coworkingDetails: {
      hours: "24/7 Biometric Access for Dedicated Plans • 9am - 6pm Mon-Fri (Visitors)",
      pricing: {
        dayPass: "RM 39 / day",
        hotDesk: "RM 399 / month",
        dedicatedDesk: "RM 699 / month",
        privateOffice: "From RM 850 / pax"
      },
      amenities: [
        "200-person amphitheater with stage lighting",
        "Equipped podcast studio with Shure mics",
        "Recreational lounge with arcade & nap pods",
        "High-speed dual LAN ports for engineers",
        "Nursing and prayer rooms"
      ],
      hostedCommunities: ["Product Design MY", "UX Malaysia", "Agile Malaysia Meetup"],
      transitInfo: "Free Starling shuttle bus directly to MRT Taman Tun Dr Ismail (TTDI).",
      perksNote: "Direct sheltered parking and unlimited mall dining options."
    }
  },
  {
    id: "jerry-ttdi",
    name: "Jerry Coworking (TTDI)",
    category: "coworking",
    categoryLabel: "Co-Working Space",
    region: "central",
    regionLabel: "Kuala Lumpur",
    city: "TTDI",
    state: "Kuala Lumpur",
    coordinates: [3.1432, 101.6293],
    description: "Affordable, automated, no-frills developer micro-offices and individual focus pods, designed for deep solo coding sessions without unnecessary markups.",
    highlights: ["Ultra-affordable day rates from RM 20", "Fully automated mobile app door access", "Quiet environment optimized for deep work"],
    techTags: ["Deep Work", "Affordable", "Solo Engineers", "Focus Pods"],
    notableEntities: ["Freelance Developers", "Indie Hackers", "Remote Workers"],
    websiteUrl: "https://jerry.my",
    coworkingDetails: {
      hours: "24/7 App-Controlled Access",
      pricing: {
        dayPass: "From RM 20 / day",
        hotDesk: "RM 249 / month",
        privateOffice: "From RM 450 / month"
      },
      amenities: [
        "High-speed Wi-Fi 500 Mbps",
        "Private sound-insulated call booths",
        "Contactless smart lock check-in",
        "Chilled water dispenser & pantry"
      ],
      hostedCommunities: ["Indie Hackers KL", "Remote Coder Club"],
      transitInfo: "4-minute walk to MRT TTDI station.",
      perksNote: "No lock-in contracts; book immediately by the day or hour via web app."
    }
  },
  {
    id: "mranti-park",
    name: "MRANTI Park (Technology Park Malaysia)",
    category: "hub",
    categoryLabel: "Tech Hub & Innovation Park",
    region: "central",
    regionLabel: "Kuala Lumpur",
    city: "Bukit Jalil",
    state: "Kuala Lumpur",
    coordinates: [3.0482, 101.6917],
    description: "A 686-acre national innovation accelerator equipped with advanced prototyping facilities, drone flight corridors, 5G labs, and deep-tech commercialization programs.",
    highlights: ["National Drone Tech Zone (Area 57)", "5G Open Innovation Hub", "Deep-tech incubation & venture sandboxes"],
    techTags: ["Robotics", "Drones", "AI Prototyping", "5G Sandbox", "DeepTech"],
    notableEntities: ["MRANTI", "Ministry of Science, Tech & Innovation (MOSTI)", "Aerodyne Group", "DeepTech Startups"],
    websiteUrl: "https://mranti.my"
  },
  {
    id: "aims-datacenter-kl",
    name: "AIMS Data Centre & KL Internet Exchange (MyIX)",
    category: "hub",
    categoryLabel: "Tech Hub & Connectivity Nexus",
    region: "central",
    regionLabel: "Kuala Lumpur",
    city: "Kuala Lumpur",
    state: "Kuala Lumpur",
    coordinates: [3.1498, 101.7135],
    description: "The telecommunications nexus of Malaysia, housing the Malaysia Internet Exchange (MyIX) and direct cloud interconnects for AWS, Google Cloud, and Azure.",
    highlights: ["Routes >90% of Malaysian transit traffic", "AWS ap-southeast-5 Direct Connect landing", "Ultra-low cross-connect latency (<1ms)"],
    techTags: ["BGP Peering", "Internet Exchange", "Cloud Interconnect", "Fiber Backbone", "Carrier Neutral"],
    notableEntities: ["MyIX", "TIME dotCom", "AWS Direct Connect", "Equinix", "Google Cloud Interconnect"],
    websiteUrl: "https://aims.com.my"
  },
  {
    id: "bangsar-south-vertical",
    name: "Bangsar South Tech District (The Vertical & Sphere)",
    category: "hub",
    categoryLabel: "Tech Hub",
    region: "central",
    regionLabel: "Kuala Lumpur",
    city: "Bangsar South",
    state: "Kuala Lumpur",
    coordinates: [3.1165, 101.6655],
    description: "A premier MSC Cybercentre corridor housing multinational tech regional HQs, fintech payment gateways, and rapid scale-ups.",
    highlights: ["Designated MSC Malaysia Cybercentre", "Concentration of top FinTech and SaaS firms", "High density of tech talents and meetups"],
    techTags: ["FinTech", "MSC Malaysia", "SaaS Scale-ups", "Cloud Regional HQ"],
    notableEntities: ["Touch 'n Go Digital", "Fave", "Boost", "Alibaba Cloud Malaysia", "Honeywell Tech"],
    websiteUrl: "https://bangsarsouth.com"
  },
  {
    id: "uni-malaya",
    name: "Universiti Malaya (UM) - Faculty of Computer Science & IT",
    category: "university",
    categoryLabel: "University Tech Lab",
    region: "central",
    regionLabel: "Kuala Lumpur",
    city: "Kuala Lumpur",
    state: "Kuala Lumpur",
    coordinates: [3.1209, 101.6538],
    description: "Malaysia's top-ranked research university, leading advanced research in Artificial Intelligence, High-Performance Computing, and Bioinformatics.",
    highlights: ["Artificial Intelligence Research Centre (AIRC)", "High-Performance Computing cluster", "Ranked in global top 60 QS rankings"],
    techTags: ["AI / Deep Learning", "HPC", "Bioinformatics", "Algorithms", "Research"],
    notableEntities: ["UM CSIT", "Centre for Data Science", "Alumni at Google, Grab & Meta"],
    websiteUrl: "https://fsktm.um.edu.my"
  },
  {
    id: "apu-cyber-soc",
    name: "Asia Pacific University (APU) - Cybersecurity SOC",
    category: "university",
    categoryLabel: "University Tech Lab",
    region: "central",
    regionLabel: "Kuala Lumpur",
    city: "Bukit Jalil",
    state: "Kuala Lumpur",
    coordinates: [3.0558, 101.6997],
    description: "Renowned technology institution boasting a fully operational on-campus Security Operations Centre (SOC) simulating live enterprise cyber attacks.",
    highlights: ["Live Enterprise Security Operations Centre (SOC)", "Frequent National CTF champions", "Partnership with AWS, Microsoft, and Cisco"],
    techTags: ["Threat Hunting", "SOC Monitoring", "SIEM", "Penetration Testing", "Cloud"],
    notableEntities: ["APU Cyber Security Club", "Digital Forensics Lab", "FinTech Academy"],
    websiteUrl: "https://www.apu.edu.my"
  },

  // ==========================================
  // 2. CYBERJAYA
  // ==========================================
  {
    id: "cyberview-hub",
    name: "Cyberview Living Lab & Smart City Sandbox",
    category: "hub",
    categoryLabel: "Tech Hub & Living Lab",
    region: "central",
    regionLabel: "Cyberjaya",
    city: "Cyberjaya",
    state: "Selangor",
    coordinates: [2.9213, 101.6559],
    description: "Malaysia's smart city sandbox and global tech hub, fostering smart mobility, IoT, autonomous driving testbeds, and digital government infrastructure.",
    highlights: ["Autonomous vehicle testing corridors", "National Fintech regulatory sandbox", "5G Open Lab with major telcos"],
    techTags: ["IoT", "Autonomous Systems", "Smart City", "FinTech", "5G Testbed"],
    notableEntities: ["Aerodyne Group", "Cyberview", "MDEC", "Transport Authorities"],
    websiteUrl: "https://cyberview.com.my"
  },
  {
    id: "rekascape-cyberjaya",
    name: "RekaScape (Cyberview Innovation Hub)",
    category: "hub",
    categoryLabel: "Tech Hub & Maker Space",
    region: "central",
    regionLabel: "Cyberjaya",
    city: "Cyberjaya",
    state: "Selangor",
    coordinates: [2.9272, 101.6535],
    description: "Community-driven open tech hub with prototyping workshops, robotics testing spaces, community maker events, and drone demonstration plazas.",
    highlights: ["Maker labs with 3D printers & CNC equipment", "Outdoor drone flight cage", "Host of Maker Faire and IoT hackathons"],
    techTags: ["Hardware Makers", "Robotics", "Rapid Prototyping", "Drone Testing"],
    notableEntities: ["RekaScape Community", "Drone Pilots", "IoT Developers"],
    websiteUrl: "https://cyberview.com.my/rekascape"
  },
  {
    id: "mdec-hq",
    name: "MDEC Headquarters (Malaysia Digital Economy Corporation)",
    category: "hub",
    categoryLabel: "Tech Governance & Growth",
    region: "central",
    regionLabel: "Cyberjaya",
    city: "Cyberjaya",
    state: "Selangor",
    coordinates: [2.9250, 101.6580],
    description: "The apex agency driving Malaysia's digital transformation, overseeing Malaysia Digital (MD) status, DE Rantau nomad incentives, and national tech grants.",
    highlights: ["Malaysia Digital (MD) accreditation center", "National AI & Tech talent programs", "Venture capital matching & startup grants"],
    techTags: ["Malaysia Digital", "DE Rantau", "Grants & Policy", "Tech Ecosystem"],
    notableEntities: ["MDEC", "Ministry of Digital", "Malaysia Digital Nomads"],
    websiteUrl: "https://mdec.my"
  },
  {
    id: "ntt-datacenter-cyberjaya",
    name: "NTT Global Data Centers (Cyberjaya Campus CBJ1-6)",
    category: "hub",
    categoryLabel: "Data Center Campus",
    region: "central",
    regionLabel: "Cyberjaya",
    city: "Cyberjaya",
    state: "Selangor",
    coordinates: [2.9198, 101.6495],
    description: "One of Southeast Asia's largest dedicated data center campuses, housing hyperscale cloud workloads with ultra-high physical resilience and green cooling.",
    highlights: ["Direct submarine cable landing point (MIST)", "Tier IV certified design architectures", "Sovereign cloud compute facilities"],
    techTags: ["Hyperscale Cloud", "Submarine Cables", "Green Data Center", "High Availability"],
    notableEntities: ["NTT Global", "Global Hyperscalers", "Enterprise Banks"],
    websiteUrl: "https://datacenter.hello.global.ntt"
  },
  {
    id: "colabs-cyberjaya",
    name: "Co-labs Coworking Cyberjaya (D'Pulze)",
    category: "coworking",
    categoryLabel: "Co-Working Space",
    region: "central",
    regionLabel: "Cyberjaya",
    city: "Cyberjaya",
    state: "Selangor",
    coordinates: [2.9216, 101.6514],
    description: "A premier tech coworking sanctuary inside D'Pulze Mall, providing 24/7 dedicated engineering pods, fast redundant fiber, and direct transit access.",
    highlights: ["Direct access to D'Pulze shopping amenities", "Private phone booths & sprint pods", "Special rates for MSC-status tech founders"],
    techTags: ["MSC Startups", "Sprint Pods", "Cyberjaya Builders", "Remote Teams"],
    notableEntities: ["AI Scale-ups", "Robotics Engineers", "GovTech Contractors"],
    websiteUrl: "https://co-labs.asia/locations/dpulze-cyberjaya",
    coworkingDetails: {
      hours: "24/7 Access for Dedicated Members • Mon-Fri 9:00 AM - 6:00 PM for Day Passes",
      pricing: {
        dayPass: "RM 30 / day",
        hotDesk: "RM 299 / month",
        dedicatedDesk: "RM 550 / month",
        privateOffice: "From RM 650 / pax"
      },
      amenities: [
        "High-speed 1 Gbps redundant network",
        "Event stage with AV equipment",
        "Acoustically treated meeting rooms",
        "Free artisan espresso & teas",
        "Locker rentals & mail receipt"
      ],
      hostedCommunities: ["Cyberjaya Tech Builders", "Robotics Guild", "Python Cyberjaya"],
      transitInfo: "5-minute shuttle to MRT Cyberjaya City Centre (Putrajaya Line).",
      perksNote: "Connected directly to D'Pulze with hotel, food court, and grocery options."
    }
  },
  {
    id: "dashbox-launchpad-cyberjaya",
    name: "The Launchpad & Dash Box Workspace (Cyberjaya)",
    category: "coworking",
    categoryLabel: "Co-Working Space",
    region: "central",
    regionLabel: "Cyberjaya",
    city: "Cyberjaya",
    state: "Selangor",
    coordinates: [2.9250, 101.6420],
    description: "An eco-creative tech retreat space featuring open green gardens, shipping-container breakout offices, and collaborative hacker lounges.",
    highlights: ["Relaxed green campus atmosphere", "Outdoor presentation and campfire stages", "Popular with hardware hackers & indie devs"],
    techTags: ["Green Tech", "Indie Hackers", "Maker Community", "Open Air"],
    notableEntities: ["Hardware Startups", "Creative Technologists", "Drone Builders"],
    websiteUrl: "https://dashbox.com.my",
    coworkingDetails: {
      hours: "Mon-Sat 8:30 AM - 8:00 PM • 24/7 for resident teams",
      pricing: {
        dayPass: "RM 25 / day",
        hotDesk: "RM 250 / month",
        dedicatedDesk: "RM 480 / month"
      },
      amenities: [
        "Open-air shaded collaborative decks",
        "High-speed Wi-Fi with outdoor mesh coverage",
        "Swimming pool & fitness access",
        "Specialty coffee bar and grill restaurant"
      ],
      hostedCommunities: ["Cyberjaya Creative Tech", "Indie Maker Circle"],
      transitInfo: "Bus feeder direct from Putrajaya Sentral transport hub.",
      perksNote: "Great for weekend hackathons and team sprint retreats."
    }
  },
  {
    id: "mmu-cyberjaya",
    name: "Multimedia University (MMU) - Faculty of Computing & Informatics",
    category: "university",
    categoryLabel: "University Tech Lab",
    region: "central",
    regionLabel: "Cyberjaya",
    city: "Cyberjaya",
    state: "Selangor",
    coordinates: [2.9279, 101.6424],
    description: "The founding university of the Multimedia Super Corridor (MSC), training thousands of software engineers, game developers, and cloud architects.",
    highlights: ["Pioneering game dev and digital media program", "Cloud Computing & FinTech research labs", "Located directly inside Cyberjaya tech ecosystem"],
    techTags: ["Game Development", "Cloud Architecture", "FinTech", "Web Systems"],
    notableEntities: ["MMU FCI", "TM R&D", "Creative Multimedia Labs"],
    websiteUrl: "https://www.mmu.edu.my/fci"
  },

  // ==========================================
  // 3. PENANG
  // ==========================================
  {
    id: "penang-silicon-island",
    name: "Penang Silicon Island & Bayan Lepas FIZ",
    category: "hub",
    categoryLabel: "Tech Hub & Semiconductor Corridor",
    region: "northern",
    regionLabel: "Penang",
    city: "Bayan Lepas",
    state: "Penang",
    coordinates: [5.2974, 100.2868],
    description: "Known as the 'Silicon Valley of the East', this semiconductor corridor leads global IC packaging, testing, embedded firmware, and industrial automation.",
    highlights: ["Over 50 years of global chip manufacturing", "Advanced IC packaging & test clusters", "Vibrant hardware and automation ecosystem"],
    techTags: ["Semiconductors", "IC Design", "Embedded C/C++", "Industrial IoT", "Firmware"],
    notableEntities: ["Intel Malaysia", "Keysight Technologies", "Micron", "Western Digital", "ViTrox"],
    websiteUrl: "https://investpenang.gov.my"
  },
  {
    id: "gbs-mayang-penang",
    name: "GBS@Mayang & Digital Penang Hub",
    category: "hub",
    categoryLabel: "Tech Hub & GBS Corridor",
    region: "northern",
    regionLabel: "Penang",
    city: "Bayan Baru",
    state: "Penang",
    coordinates: [5.3270, 100.2835],
    description: "A dedicated Grade-A MSC digital tech hub in Penang accommodating global software development centres, digital R&D teams, and high-value tech services.",
    highlights: ["State-backed digital economy flagship", "Houses regional software engineering teams", "Proximity to Penang International Airport"],
    techTags: ["Software Engineering", "Global Business Services", "Enterprise Cloud", "R&D"],
    notableEntities: ["Digital Penang", "AMD Global Services", "Teleperformance", "Software Scale-ups"],
    websiteUrl: "https://digitalpenang.my"
  },
  {
    id: "cat-penang-library",
    name: "@CAT Penang (Creative Analytics & Technology Accelerator)",
    category: "coworking",
    categoryLabel: "Co-Working & Accelerator",
    region: "northern",
    regionLabel: "Penang",
    city: "George Town",
    state: "Penang",
    coordinates: [5.4146, 100.3424],
    description: "A premier tech accelerator and collaborative workspace located at the iconic waterfront Wisma Yeap Chor Ee, driving Northern Malaysian startups and maker hackathons.",
    highlights: ["Historic UNESCO heritage waterfront architecture", "Subsidized desk space for tech founders", "Regular tech hackathons and GDG George Town meetups"],
    techTags: ["Startups", "Maker Space", "Hardware Dev", "GDG George Town", "Open Source"],
    notableEntities: ["Digital Penang", "InvestPenang", "GDG George Town", "Northern Tech Builders"],
    websiteUrl: "https://digitalpenang.my/cat-penang",
    coworkingDetails: {
      hours: "Mon-Fri 9:00 AM - 6:00 PM • 24/7 for incubated startups",
      pricing: {
        dayPass: "RM 25 / day",
        hotDesk: "RM 200 / month",
        dedicatedDesk: "RM 400 / month"
      },
      amenities: [
        "Ultra-fast fiber broadband",
        "Hardware prototyping lab & 3D printers",
        "100-capacity event auditorium",
        "Meeting pods with whiteboard walls",
        "Free coffee and tea pantry"
      ],
      hostedCommunities: ["GDG George Town", "Penang Hardware Guild", "Penang Tech Founders"],
      transitInfo: "5-minute walk to Weld Quay RapidPenang bus terminal and Penang Ferry.",
      perksNote: "Direct pipeline to state startup grants and InvestPenang mentorship."
    }
  },
  {
    id: "pdl-penang-library",
    name: "Penang Digital Library (PDL)",
    category: "coworking",
    categoryLabel: "Co-Working & Digital Tech Library",
    region: "northern",
    regionLabel: "Penang",
    city: "George Town",
    state: "Penang",
    coordinates: [5.4018, 100.3033],
    description: "The first 24/7 digital tech library in Southeast Asia, providing round-the-clock ultra-fast fiber, quiet coding zones, and collaborative programming lounges in a park setting.",
    highlights: ["24/7 round-the-clock coding sanctuary", "Ultra-fast public gigabit fiber", "Surrounded by lush green parkland"],
    techTags: ["24/7 Coding", "Digital Library", "Study Jams", "Green Campus"],
    notableEntities: ["Student Developers", "Open Source Contributors", "Tech Researchers"],
    websiteUrl: "https://www.penangdigitallibrary.com",
    coworkingDetails: {
      hours: "24 Hours / 7 Days a week (Open All Year Round)",
      pricing: {
        dayPass: "Free / RM 10 for premium lounge",
        hotDesk: "From RM 60 / annual library pass"
      },
      amenities: [
        "1 Gbps high-speed public fiber",
        "Ergonomic silent study and coding booths",
        "On-site specialty coffee cafe (Cabin Cafe)",
        "Curated collection of 3,000+ digital e-books & IEEE journals",
        "Outdoor study pavilions"
      ],
      hostedCommunities: ["Penang Open Source Guild", "USM Coding Society", "PyData Penang"],
      transitInfo: "Located along Jalan Masjid Negeri with direct RapidPenang bus route 102/201.",
      perksNote: "The ultimate 24/7 haven for midnight coding sprints and exam preps."
    }
  },
  {
    id: "common-ground-penang",
    name: "Common Ground (George Town Beach Street)",
    category: "coworking",
    categoryLabel: "Co-Working Space",
    region: "northern",
    regionLabel: "Penang",
    city: "George Town",
    state: "Penang",
    coordinates: [5.4168, 100.3412],
    description: "Refurbished colonial shophouse tech workspace blending heritage elegance with enterprise networking, private video pods, and regional founder events.",
    highlights: ["Colonial shophouse aesthetic with high ceilings", "Heart of Penang's financial district", "DE Rantau Nomad accredited"],
    techTags: ["Colonial Heritage", "Digital Nomad", "DE Rantau", "Fintech"],
    notableEntities: ["Remote Software Engineers", "Global Nomad Founders", "Fintech Teams"],
    websiteUrl: "https://commonground.work",
    coworkingDetails: {
      hours: "24/7 for Dedicated Members • Mon-Fri 9am - 6pm (Visitor)",
      pricing: {
        dayPass: "RM 45 / day",
        hotDesk: "RM 399 / month",
        dedicatedDesk: "RM 699 / month"
      },
      amenities: [
        "Enterprise-grade Wi-Fi network",
        "Soundproof podcast and video conference booth",
        "Specialty drip coffee and tea bar",
        "Mail handling & company registration address"
      ],
      hostedCommunities: ["Penang Digital Nomads", "SEA Founders Collective"],
      transitInfo: "3-minute walk to Beach Street financial institutions and cafes.",
      perksNote: "Close to world-famous George Town street food and lifestyle venues."
    }
  },
  {
    id: "scoopoint-penang",
    name: "Scoopoint Coworking (George Town)",
    category: "coworking",
    categoryLabel: "Co-Working Space",
    region: "northern",
    regionLabel: "Penang",
    city: "George Town",
    state: "Penang",
    coordinates: [5.4121, 100.3340],
    description: "A cozy community-first workspace supporting independent developers, web creators, UX designers, and early-stage bootstrap founders.",
    highlights: ["Warm, inclusive creative environment", "Regular design and coding workshops", "Affordable flexible hot desk passes"],
    techTags: ["Design & Code", "Bootstrap Founders", "Creative Tech", "Community"],
    notableEntities: ["Frontend Guild", "UX Penang", "Bootstrap Coders"],
    websiteUrl: "https://scoopoint.com",
    coworkingDetails: {
      hours: "Mon-Sat 9:00 AM - 7:00 PM",
      pricing: {
        dayPass: "RM 25 / day",
        hotDesk: "RM 280 / month",
        dedicatedDesk: "RM 450 / month"
      },
      amenities: [
        "Reliable 300 Mbps fiber",
        "Relaxed lounge and book swap shelf",
        "Meeting room with smart TV display",
        "Kitchenette with complimentary coffee & biscuits"
      ],
      hostedCommunities: ["Penang Indie Hackers", "UX/UI Penang"],
      transitInfo: "Walking distance to Komtar transport hub.",
      perksNote: "Great for freelancers wanting a low-key, friendly environment."
    }
  },
  {
    id: "usm-penang-cs",
    name: "Universiti Sains Malaysia (USM) - School of Computer Sciences",
    category: "university",
    categoryLabel: "University Tech Lab",
    region: "northern",
    regionLabel: "Penang",
    city: "Gelugor",
    state: "Penang",
    coordinates: [5.3556, 100.3015],
    description: "Pioneering computer science faculty directly feeding talent into Penang's semiconductor corridor, specializing in parallel computing, NLP, and distributed systems.",
    highlights: ["National Advanced IPv6 Centre (NAv6)", "High-performance cluster computing lab", "Key partner to multinational chipmakers in Bayan Lepas"],
    techTags: ["Parallel Computing", "NLP", "Distributed Systems", "Software Engineering", "IPv6"],
    notableEntities: ["USM School of CS", "National Advanced IPv6 Centre (NAv6)", "Semiconductor Research Partners"],
    websiteUrl: "https://cs.usm.my"
  },

  // ==========================================
  // 4. OTHER STRATEGIC REGIONS (JOHOR & BORNEO)
  // ==========================================
  {
    id: "ytl-nvidia-johor",
    name: "YTL-NVIDIA Kulai AI Supercomputing Park",
    category: "hub",
    categoryLabel: "AI Supercomputing Park",
    region: "southern",
    regionLabel: "Johor",
    city: "Kulai / Sedenak",
    state: "Johor",
    coordinates: [1.6601, 103.5850],
    description: "Southeast Asia's premier 500MW AI supercomputing facility powered by solar energy, deploying NVIDIA Grace Blackwell GB200 systems for sovereign AI.",
    highlights: ["NVIDIA GB200 AI Supercomputer clusters", "Green-powered solar hyperscale infrastructure", "Cross-border low latency connectivity to Singapore"],
    techTags: ["AI Supercomputing", "LLM Training", "vLLM", "Green Data Centers", "HPC"],
    notableEntities: ["YTL PowerSeraya", "NVIDIA", "National AI Office (NAIO)", "Hyperscalers"],
    websiteUrl: "https://ytlpowerinternational.com"
  },
  {
    id: "iskandar-space-medini",
    name: "Iskandar Space & Medini Hub",
    category: "coworking",
    categoryLabel: "Co-Working Space",
    region: "southern",
    regionLabel: "Johor",
    city: "Iskandar Puteri",
    state: "Johor",
    coordinates: [1.4285, 103.6265],
    description: "Collaborative tech workspace facilitating cross-border Singapore-Malaysia startup collaboration, fintech prototyping, and digital nomad ventures.",
    highlights: ["Direct gateway to Singapore tech ecosystem", "Special economic zone regulatory perks", "Cross-strait developer collaboration"],
    techTags: ["Cross-Border", "Fintech", "Remote Work", "Digital Nomad"],
    notableEntities: ["Iskandar Investment Berhad", "SG-MY Joint Startups"],
    websiteUrl: "https://iskandarspace.com",
    coworkingDetails: {
      hours: "24/7 for Registered Members • Mon-Fri 9am - 6pm (Visitor)",
      pricing: {
        dayPass: "RM 30 / day",
        hotDesk: "RM 300 / month",
        dedicatedDesk: "RM 500 / month"
      },
      amenities: ["1 Gbps fiber", "Video meeting pods", "Event hall", "Complimentary refreshments"],
      hostedCommunities: ["Johor Tech Network", "Cross-Strait Tech Meetup"],
      transitInfo: "15 minutes from Tuas Second Link crossing into Singapore."
    }
  },
  {
    id: "utm-cairo-skudai",
    name: "Universiti Teknologi Malaysia (UTM) - CAIRO",
    category: "university",
    categoryLabel: "University Tech Lab",
    region: "southern",
    regionLabel: "Johor",
    city: "Skudai",
    state: "Johor",
    coordinates: [1.5588, 103.6375],
    description: "Renowned engineering institution housing the Centre for Artificial Intelligence & Robotics (CAIRO), driving autonomous systems, microelectronics, and AI vision.",
    highlights: ["Centre for AI & Robotics (CAIRO)", "Big Data Centre of Excellence", "Major robotics competition champions"],
    techTags: ["Robotics", "Computer Vision", "CAIRO", "Embedded Systems"],
    notableEntities: ["CAIRO UTM", "School of Computing", "Robotics Research Group"],
    websiteUrl: "https://comp.utm.my"
  },
  {
    id: "tegas-digital-hub-kuching",
    name: "TEGAS Digital Innovation Hub & Kuching Digital Village",
    category: "coworking",
    categoryLabel: "Co-Working & Innovation Hub",
    region: "borneo",
    regionLabel: "Sarawak",
    city: "Kuching",
    state: "Sarawak",
    coordinates: [1.5533, 110.3592],
    description: "Public-backed digital maker and co-working sanctuary providing subsidized workstations, 3D printing, and software bootcamps for Sarawakian talent.",
    highlights: ["Free maker facilities for students & creators", "Mentorship from experienced tech founders", "Yearly Borneo tech accelerator"],
    techTags: ["Inclusive Tech", "Makerspace", "Youth Bootcamps", "Borneo Startups"],
    notableEntities: ["TEGAS", "Sarawak Digital Economy Corp (SDEC)"],
    websiteUrl: "https://innovatesarawak.com",
    coworkingDetails: {
      hours: "Mon-Sat 8:30 AM - 6:00 PM",
      pricing: {
        dayPass: "RM 15 / day",
        hotDesk: "RM 150 / month",
        dedicatedDesk: "RM 300 / month"
      },
      amenities: ["Maker equipment & 3D printers", "High-speed broadband", "Presentation amphitheater", "Audio studio"],
      hostedCommunities: ["DevBorneo", "Sarawak Tech Startups"],
      transitInfo: "Located within Sama Jaya High Tech Park."
    }
  }
];

// Computed Filtered List
const filteredLandmarks = computed(() => {
  return landmarks.filter((item) => {
    // Category filter
    if (activeCategory.value !== "all" && item.category !== activeCategory.value) {
      return false;
    }
    // Region filter
    if (activeRegion.value !== "all" && item.region !== activeRegion.value) {
      return false;
    }
    // Search query
    if (searchQuery.value.trim() !== "") {
      const q = searchQuery.value.toLowerCase().trim();
      const matchName = item.name.toLowerCase().includes(q);
      const matchCity = item.city.toLowerCase().includes(q);
      const matchState = item.state.toLowerCase().includes(q);
      const matchTags = item.techTags.some(t => t.toLowerCase().includes(q));
      const matchEntities = item.notableEntities.some(e => e.toLowerCase().includes(q));
      if (!matchName && !matchCity && !matchState && !matchTags && !matchEntities) {
        return false;
      }
    }
    return true;
  });
});

const selectedLandmark = computed(() => {
  const found = landmarks.find((l) => l.id === selectedLandmarkId.value);
  return found || filteredLandmarks.value[0] || landmarks[0];
});

// Category metrics
const categoryStats = computed(() => {
  const counts = { all: landmarks.length, coworking: 0, hub: 0, university: 0 };
  landmarks.forEach(l => {
    if (counts[l.category] !== undefined) {
      counts[l.category]++;
    }
  });
  return counts;
});

// Helper functions
function getCategoryColor(cat: string): string {
  if (cat === "coworking") return "#f59e0b"; // Amber
  if (cat === "hub") return "#10b981"; // Emerald
  if (cat === "university") return "#a855f7"; // Purple
  return "#3b82f6";
}

// Map Controls & Interactions
async function initLeafletMap() {
  if (typeof window === "undefined" || !mapContainerRef.value) return;

  try {
    const L = await import("leaflet");
    leafletModule = L;

    // Detect if dark mode is active in VitePress
    const isDark = document.documentElement.classList.contains("dark");
    mapTheme.value = isDark ? "dark" : "light";

    // Create Map
    mapInstance = L.map(mapContainerRef.value, {
      center: [3.8, 108.0],
      zoom: 6,
      minZoom: 4,
      maxZoom: 18,
      scrollWheelZoom: false
    });

    // Add Tile Layer (OpenStreetMap Standard / Carto Dark for dark mode if preferred, using standard OSM with CSS filters or standard OSM tile URLs)
    updateTileLayer();

    // Layer group for markers
    markerLayerGroup = L.layerGroup().addTo(mapInstance);

    // Populate markers
    renderMarkers();

    isMapReady.value = true;

    // Invalidate size after layout renders
    setTimeout(() => {
      mapInstance?.invalidateSize();
    }, 200);

  } catch (err) {
    console.error("Failed to initialize Leaflet map:", err);
  }
}

function updateTileLayer() {
  if (!mapInstance || !leafletModule) return;

  // Clear existing tile layers
  mapInstance.eachLayer((layer: any) => {
    if (layer instanceof leafletModule.TileLayer) {
      mapInstance.removeLayer(layer);
    }
  });

  const L = leafletModule;
  // Using standard OpenStreetMap tiles. For dark mode compatibility, standard OpenStreetMap tiles are bright; standard OpenStreetMap doesn't have an official dark raster tile set like Carto, but we use standard OpenStreetMap.
  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  L.tileLayer(tileUrl, {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(mapInstance);
}

function createMarkerIcon(landmark: TechLandmark, isSelected: boolean) {
  const L = leafletModule;
  if (!L) return;

  const color = getCategoryColor(landmark.category);

  return L.divIcon({
    className: "leaflet-custom-marker-wrapper",
    html: `
      <div class="custom-marker-pin marker-${landmark.category} ${isSelected ? 'is-selected' : ''}" 
           style="--marker-color: ${color};"
           title="${landmark.name}">
        <div class="pin-pulse"></div>
        <div class="pin-body"></div>
        <div class="pin-pointer"></div>
      </div>
    `,
    iconSize: [36, 42],
    iconAnchor: [18, 42],
    popupAnchor: [0, -42]
  });
}

function createPopupContent(landmark: TechLandmark): string {
  const color = getCategoryColor(landmark.category);
  const isCoworking = landmark.category === "coworking" && landmark.coworkingDetails;
  const details = landmark.coworkingDetails;

  let coworkingHtml = "";
  if (isCoworking && details) {
    const amenitiesList = details.amenities.slice(0, 4).map(a => `<li>✓ ${a}</li>`).join("");
    const communitiesList = details.hostedCommunities.map(c => `<span class="comm-pill">${c}</span>`).join("");
    
    coworkingHtml = `
      <div class="popup-coworking-section">
        <div class="popup-rates-grid">
          ${details.pricing.dayPass ? `
            <div class="popup-rate-item">
              <span class="rate-label">Day Pass</span>
              <span class="rate-val">${details.pricing.dayPass}</span>
            </div>` : ''}
          ${details.pricing.hotDesk ? `
            <div class="popup-rate-item">
              <span class="rate-label">Hot Desk</span>
              <span class="rate-val">${details.pricing.hotDesk}</span>
            </div>` : ''}
          ${details.pricing.dedicatedDesk ? `
            <div class="popup-rate-item">
              <span class="rate-label">Dedicated</span>
              <span class="rate-val">${details.pricing.dedicatedDesk}</span>
            </div>` : ''}
        </div>

        <div class="popup-info-row">
          <span class="info-text"><strong>Hours:</strong> ${details.hours}</span>
        </div>

        <div class="popup-info-row">
          <span class="info-text"><strong>Transit:</strong> ${details.transitInfo}</span>
        </div>

        <div class="popup-amenities-box">
          <span class="popup-box-title">Key Work Amenities:</span>
          <ul class="popup-amenities-list">
            ${amenitiesList}
          </ul>
        </div>

        ${details.hostedCommunities.length > 0 ? `
          <div class="popup-comm-box">
            <span class="popup-box-title">Communities & Meetups Hosted:</span>
            <div class="popup-comm-pills">
              ${communitiesList}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  } else {
    // Standard Hub / University details
    const highlightsList = landmark.highlights.slice(0, 3).map(h => `<li>• ${h}</li>`).join("");
    coworkingHtml = `
      <div class="popup-hub-section">
        <p class="popup-description">${landmark.description}</p>
        <div class="popup-highlights-box">
          <span class="popup-box-title">Key Facilities & Strengths:</span>
          <ul class="popup-highlights-list">
            ${highlightsList}
          </ul>
        </div>
      </div>
    `;
  }

  const tagsPills = landmark.techTags.slice(0, 4).map(t => `<span class="tag-pill">${t}</span>`).join("");

  return `
    <div class="tech-map-leaflet-popup">
      <div class="popup-header" style="border-left: 4px solid ${color};">
        <div class="popup-category-badge" style="color: ${color};">
          <span>${landmark.categoryLabel}</span>
          <span class="popup-dot">•</span>
          <span>${landmark.city}, ${landmark.state}</span>
        </div>
        <h3 class="popup-title">${landmark.name}</h3>
      </div>

      <div class="popup-body">
        ${coworkingHtml}
        
        <div class="popup-tags-row">
          ${tagsPills}
        </div>
      </div>

      <div class="popup-actions">
        <a href="${landmark.websiteUrl}" target="_blank" rel="noopener noreferrer" class="popup-btn popup-btn-primary">
          <span>Visit Official Portal</span>
        </a>
      </div>
    </div>
  `;
}

function renderMarkers() {
  if (!leafletModule || !markerLayerGroup) return;

  const L = leafletModule;
  markerLayerGroup.clearLayers();
  markerMap.clear();

  filteredLandmarks.value.forEach((landmark) => {
    const isSelected = landmark.id === selectedLandmarkId.value;
    const icon = createMarkerIcon(landmark, isSelected);

    const marker = L.marker(landmark.coordinates, { icon });
    const popupHtml = createPopupContent(landmark);

    marker.bindPopup(popupHtml, {
      maxWidth: 360,
      className: "tech-leaflet-custom-popup",
      autoPanPadding: [20, 20]
    });

    marker.on("click", () => {
      selectLandmark(landmark.id, false);
    });

    markerLayerGroup.addLayer(marker);
    markerMap.set(landmark.id, marker);
  });
}

function selectLandmark(id: string, flyTo = true) {
  selectedLandmarkId.value = id;
  const item = landmarks.find(l => l.id === id);

  // Update marker icons to reflect active state
  if (leafletModule) {
    landmarks.forEach(l => {
      const marker = markerMap.get(l.id);
      if (marker) {
        marker.setIcon(createMarkerIcon(l, l.id === id));
      }
    });
  }

  if (item && mapInstance && flyTo) {
    mapInstance.flyTo(item.coordinates, Math.max(mapInstance.getZoom(), 14), {
      duration: 1.2,
      easeLinearity: 0.25
    });

    const marker = markerMap.get(id);
    if (marker) {
      setTimeout(() => {
        marker.openPopup();
      }, 500);
    }
  }
}

function jumpToPreset(presetKey: string) {
  const preset = presetViews[presetKey];
  if (!preset || !mapInstance) return;

  if (presetKey === "kl") {
    activeRegion.value = "central";
  } else if (presetKey === "cyberjaya") {
    activeRegion.value = "central";
  } else if (presetKey === "penang") {
    activeRegion.value = "northern";
  } else if (presetKey === "johor") {
    activeRegion.value = "southern";
  } else if (presetKey === "borneo") {
    activeRegion.value = "borneo";
  } else {
    activeRegion.value = "all";
  }

  mapInstance.flyTo(preset.center, preset.zoom, {
    duration: 1.4,
    easeLinearity: 0.2
  });
}

function toggleMapTheme() {
  mapTheme.value = mapTheme.value === "dark" ? "light" : "dark";
  updateTileLayer();
}

function selectCategory(catId: string) {
  activeCategory.value = catId;
}

function clearFilters() {
  activeCategory.value = "all";
  activeRegion.value = "all";
  searchQuery.value = "";
  if (mapInstance && presetViews.all) {
    mapInstance.flyTo(presetViews.all.center, presetViews.all.zoom, { duration: 1.2 });
  }
}

// Watch filters to re-render markers
watch([filteredLandmarks], () => {
  renderMarkers();
});

// Watch dark mode changes on document
onMounted(() => {
  initLeafletMap();

  // Observer for VitePress dark mode toggle
  const observer = new MutationObserver(() => {
    const isDark = document.documentElement.classList.contains("dark");
    if ((isDark && mapTheme.value !== "dark") || (!isDark && mapTheme.value !== "light")) {
      mapTheme.value = isDark ? "dark" : "light";
      updateTileLayer();
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"]
  });

  window.addEventListener("resize", onWindowResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onWindowResize);
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }
});

function onWindowResize() {
  if (mapInstance) {
    mapInstance.invalidateSize();
  }
}
</script>

<template>
  <div id="malaysia-tech-map-app" class="tech-map-container">
    <!-- Component Header -->
    <div class="map-header">
      <div class="map-header-top">
        <div class="map-title-group">
          <div class="map-badge">
            <span>Interactive Tech Geographic Map</span>
          </div>
          <h2 class="map-title">Malaysia Tech Ecosystem & Co-Working Atlas</h2>
          <p class="map-subtitle">
            Explore active tech parks, startup co-working spaces, AI computing clusters, and top university computing departments across Kuala Lumpur, Cyberjaya, Penang, Johor, and Borneo.
          </p>
        </div>

        <div class="map-header-actions">
          <!-- View Toggle -->
          <div class="view-toggle-group">
            <button
              id="view-mode-map-btn"
              type="button"
              class="view-toggle-btn"
              :class="{ 'is-active': viewMode === 'map' }"
              @click="viewMode = 'map'"
            >
              <span>Map View</span>
            </button>
            <button
              id="view-mode-grid-btn"
              type="button"
              class="view-toggle-btn"
              :class="{ 'is-active': viewMode === 'grid' }"
              @click="viewMode = 'grid'"
            >
              <span>Directory View</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Location Jump Bar -->
      <div class="quick-jump-bar">
        <span class="jump-label">Quick Zoom Focus:</span>
        <div class="jump-buttons">
          <button
            id="jump-btn-kl"
            type="button"
            class="jump-btn jump-btn-highlight"
            @click="jumpToPreset('kl')"
          >
            <span>Kuala Lumpur</span>
          </button>
          <button
            id="jump-btn-cyberjaya"
            type="button"
            class="jump-btn jump-btn-highlight"
            @click="jumpToPreset('cyberjaya')"
          >
            <span>Cyberjaya</span>
          </button>
          <button
            id="jump-btn-penang"
            type="button"
            class="jump-btn jump-btn-highlight"
            @click="jumpToPreset('penang')"
          >
            <span>Penang</span>
          </button>
          <button
            id="jump-btn-johor"
            type="button"
            class="jump-btn"
            @click="jumpToPreset('johor')"
          >
            <span>Johor AI</span>
          </button>
          <button
            id="jump-btn-borneo"
            type="button"
            class="jump-btn"
            @click="jumpToPreset('borneo')"
          >
            <span>Borneo</span>
          </button>
          <button
            id="jump-btn-all"
            type="button"
            class="jump-btn"
            @click="jumpToPreset('all')"
          >
            <span>All Malaysia</span>
          </button>
        </div>

        <button
          id="toggle-map-theme-btn"
          type="button"
          class="theme-toggle-map-btn"
          @click="toggleMapTheme"
        >
          <span>Toggle Tiles</span>
        </button>
      </div>

      <!-- Filters Row -->
      <div class="map-controls-row">
        <!-- Search Input -->
        <div class="map-search-wrapper">
          <input
            id="tech-landmark-search-input"
            v-model="searchQuery"
            type="text"
            placeholder="Search co-working spaces, tech parks, or tech tags (e.g. WORQ, Penang, AI)..."
            class="map-search-input"
          />
          <button
            v-if="searchQuery"
            id="clear-search-btn"
            type="button"
            class="search-clear-btn"
            @click="searchQuery = ''"
          >
            ✕
          </button>
        </div>

        <!-- Category Filters -->
        <div class="category-filters">
          <button
            v-for="cat in categories"
            :id="`category-filter-${cat.id}`"
            :key="cat.id"
            type="button"
            class="category-pill"
            :class="{ 'is-active': activeCategory === cat.id }"
            @click="selectCategory(cat.id)"
          >
            <span class="cat-label">{{ cat.label }}</span>
            <span class="cat-count">{{ categoryStats[cat.id as keyof typeof categoryStats] ?? 0 }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- MAIN MAP DISPLAY -->
    <div v-show="viewMode === 'map'" class="map-display-wrapper">
      <!-- Leaflet Map Container -->
      <div class="leaflet-frame-container">
        <div
          id="tech-malaysia-leaflet-map"
          ref="mapContainerRef"
          class="leaflet-map-element"
        ></div>

        <!-- Map Overlay Legend -->
        <div class="map-overlay-legend">
          <div class="legend-header">Landmark Categories</div>
          <div class="legend-items">
            <div class="legend-item">
              <span class="legend-dot" style="background-color: #f59e0b;"></span>
              <span>Co-Working Space</span>
            </div>
            <div class="legend-item">
              <span class="legend-dot" style="background-color: #10b981;"></span>
              <span>Tech Hub & Park</span>
            </div>
            <div class="legend-item">
              <span class="legend-dot" style="background-color: #a855f7;"></span>
              <span>University Tech Lab</span>
            </div>
          </div>
        </div>

        <!-- Co-Working Highlight Tip -->
        <div class="map-hint-pill">
          <span>Tip: Click any marker to view pass rates, transit directions, and community details</span>
        </div>
      </div>
    </div>

    <!-- DIRECTORY / GRID VIEW -->
    <div v-show="viewMode === 'grid'" class="grid-display-wrapper">
      <div class="directory-toolbar">
        <span class="directory-count">
          Showing <strong>{{ filteredLandmarks.length }}</strong> of {{ landmarks.length }} tech locations
        </span>
        <button
          v-if="activeCategory !== 'all' || activeRegion !== 'all' || searchQuery !== ''"
          id="clear-all-filters-btn"
          type="button"
          class="clear-filters-btn"
          @click="clearFilters"
        >
          Reset All Filters
        </button>
      </div>

      <div class="directory-cards-grid">
        <div
          v-for="item in filteredLandmarks"
          :id="`directory-card-${item.id}`"
          :key="item.id"
          class="directory-card"
          :class="{ 'is-selected': selectedLandmark.id === item.id }"
          @click="selectLandmark(item.id, true); viewMode = 'map'"
        >
          <div class="card-header">
            <div class="card-badge" :style="{ backgroundColor: getCategoryColor(item.category) + '20', color: getCategoryColor(item.category), borderColor: getCategoryColor(item.category) + '50' }">
              <span>{{ item.categoryLabel }}</span>
            </div>
            <span class="card-location">{{ item.city }}, {{ item.state }}</span>
          </div>

          <h3 class="card-title">{{ item.name }}</h3>
          <p class="card-desc">{{ item.description }}</p>

          <!-- Co-working specific highlights -->
          <div v-if="item.coworkingDetails" class="card-coworking-preview">
            <div class="preview-rate-chip">
              <span class="chip-label">Pass:</span>
              <span class="chip-val">{{ item.coworkingDetails.pricing.dayPass || 'Flexible' }}</span>
            </div>
            <div class="preview-transit">
              <span>Transit: {{ item.coworkingDetails.transitInfo }}</span>
            </div>
          </div>

          <div class="card-tags">
            <span v-for="tag in item.techTags.slice(0, 3)" :key="tag" class="tag-pill">
              {{ tag }}
            </span>
          </div>

          <div class="card-footer">
            <button type="button" class="inspect-btn">
              <span>View On Map & Popups</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- SELECTED LANDMARK INSPECTOR PANEL -->
    <div v-if="selectedLandmark" class="landmark-inspector-panel">
      <div class="inspector-card">
        <div class="inspector-header">
          <div class="inspector-badge-row">
            <span
              class="inspector-category-badge"
              :style="{ backgroundColor: getCategoryColor(selectedLandmark.category) + '25', color: getCategoryColor(selectedLandmark.category) }"
            >
              <span>{{ selectedLandmark.categoryLabel }}</span>
            </span>
            <span class="inspector-region-pill">
              {{ selectedLandmark.city }}, {{ selectedLandmark.state }}
            </span>
          </div>
          <h3 class="inspector-title">{{ selectedLandmark.name }}</h3>
          <p class="inspector-description">{{ selectedLandmark.description }}</p>
        </div>

        <!-- Co-Working Deep Details Panel -->
        <div v-if="selectedLandmark.coworkingDetails" class="inspector-coworking-box">
          <h4 class="box-heading">
            <span>Co-Working Workspace Specifications</span>
          </h4>

          <div class="specs-grid">
            <div class="spec-card">
              <span class="spec-label">Pass Rates & Memberships</span>
              <div class="rates-list">
                <div v-if="selectedLandmark.coworkingDetails.pricing.dayPass" class="rate-line">
                  <span>Day Pass:</span>
                  <strong>{{ selectedLandmark.coworkingDetails.pricing.dayPass }}</strong>
                </div>
                <div v-if="selectedLandmark.coworkingDetails.pricing.hotDesk" class="rate-line">
                  <span>Hot Desk:</span>
                  <strong>{{ selectedLandmark.coworkingDetails.pricing.hotDesk }}</strong>
                </div>
                <div v-if="selectedLandmark.coworkingDetails.pricing.dedicatedDesk" class="rate-line">
                  <span>Dedicated Desk:</span>
                  <strong>{{ selectedLandmark.coworkingDetails.pricing.dedicatedDesk }}</strong>
                </div>
              </div>
            </div>

            <div class="spec-card">
              <span class="spec-label">Operating Hours</span>
              <p class="spec-val">{{ selectedLandmark.coworkingDetails.hours }}</p>

              <span class="spec-label mt-2">Public Commute & Transit</span>
              <p class="spec-val">{{ selectedLandmark.coworkingDetails.transitInfo }}</p>
            </div>
          </div>

          <div class="specs-amenities">
            <span class="spec-label">Key Workspace Amenities</span>
            <div class="amenities-chips">
              <span
                v-for="amenity in selectedLandmark.coworkingDetails.amenities"
                :key="amenity"
                class="amenity-chip"
              >
                ✓ {{ amenity }}
              </span>
            </div>
          </div>

          <div v-if="selectedLandmark.coworkingDetails.hostedCommunities?.length" class="specs-communities">
            <span class="spec-label">Tech Communities & Meetups Hosted</span>
            <div class="comm-chips">
              <span
                v-for="comm in selectedLandmark.coworkingDetails.hostedCommunities"
                :key="comm"
                class="comm-chip"
              >
                {{ comm }}
              </span>
            </div>
          </div>
        </div>

        <!-- Non-Coworking / General Highlights -->
        <div v-else class="inspector-highlights-box">
          <h4 class="box-heading">
            <span>Key Facilities & Strategic Focus</span>
          </h4>
          <ul class="inspector-highlights-list">
            <li v-for="(highlight, idx) in selectedLandmark.highlights" :key="idx">
              <span class="bullet">✓</span>
              <span>{{ highlight }}</span>
            </li>
          </ul>
        </div>

        <!-- Notable Entities & Tech Tags -->
        <div class="inspector-entities-row">
          <div class="entities-col">
            <span class="meta-label">Notable Companies & Resident Orgs:</span>
            <div class="entities-pills">
              <span v-for="entity in selectedLandmark.notableEntities" :key="entity" class="entity-pill">
                {{ entity }}
              </span>
            </div>
          </div>
          <div class="tags-col">
            <span class="meta-label">Technical Domains:</span>
            <div class="tags-pills">
              <span v-for="tag in selectedLandmark.techTags" :key="tag" class="tag-pill">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="inspector-footer">
          <div class="coords-info">
            <span class="coord-label">GPS Coordinates:</span>
            <code class="coord-code">{{ selectedLandmark.coordinates[0].toFixed(4) }}° N, {{ selectedLandmark.coordinates[1].toFixed(4) }}° E</code>
          </div>

          <a
            id="inspector-website-link"
            :href="selectedLandmark.websiteUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inspector-portal-btn"
          >
            <span>Visit Official Portal</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tech-map-container {
  margin: 2rem 0 3.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-family: var(--vp-font-family-base, 'Plus Jakarta Sans', sans-serif);
}

/* Header */
.map-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background-color: var(--vp-c-bg-alt, #161b22);
  border: 1px solid var(--vp-c-divider, #30363d);
  border-radius: 12px;
}

.map-header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.map-title-group {
  flex: 1;
  min-width: 280px;
}

.map-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.2rem 0.65rem;
  border-radius: 9999px;
  background-color: rgba(46, 160, 67, 0.15);
  color: var(--vp-c-brand-3, #3fb950);
  border: 1px solid rgba(46, 160, 67, 0.3);
  margin-bottom: 0.6rem;
}

.map-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1, #f0f6fc);
  margin: 0 0 0.4rem 0;
  letter-spacing: -0.01em;
}

.map-subtitle {
  font-size: 0.92rem;
  color: var(--vp-c-text-2, #8b949e);
  line-height: 1.5;
  margin: 0;
  max-width: 720px;
}

/* View Toggle Buttons */
.view-toggle-group {
  display: flex;
  background-color: var(--vp-c-bg-soft, #21262d);
  padding: 3px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider, #30363d);
}

.view-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.9rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2, #8b949e);
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.view-toggle-btn:hover {
  color: var(--vp-c-text-1, #f0f6fc);
}

.view-toggle-btn.is-active {
  background-color: var(--vp-c-bg-alt, #161b22);
  color: var(--vp-c-brand-3, #3fb950);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

/* Quick Zoom Jump Bar */
.quick-jump-bar {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1rem;
  background-color: var(--vp-c-bg-soft, #21262d);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider, #30363d);
  flex-wrap: wrap;
}

.jump-label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--vp-c-text-2, #8b949e);
  white-space: nowrap;
}

.jump-buttons {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
  flex: 1;
}

.jump-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.7rem;
  font-size: 0.82rem;
  font-weight: 600;
  background-color: var(--vp-c-bg-alt, #161b22);
  color: var(--vp-c-text-1, #f0f6fc);
  border: 1px solid var(--vp-c-divider, #30363d);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.jump-btn:hover {
  border-color: var(--vp-c-brand-1, #2ea043);
  color: var(--vp-c-brand-3, #3fb950);
  transform: translateY(-1px);
}

.jump-btn-highlight {
  border-color: rgba(46, 160, 67, 0.4);
  background-color: rgba(46, 160, 67, 0.1);
}

.theme-toggle-map-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.7rem;
  font-size: 0.8rem;
  font-weight: 600;
  background-color: var(--vp-c-bg-alt, #161b22);
  color: var(--vp-c-text-2, #8b949e);
  border: 1px solid var(--vp-c-divider, #30363d);
  border-radius: 6px;
  cursor: pointer;
  margin-left: auto;
  transition: all 0.15s ease;
}

.theme-toggle-map-btn:hover {
  color: var(--vp-c-text-1, #f0f6fc);
  border-color: var(--vp-c-text-2, #8b949e);
}

/* Controls Row */
.map-controls-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.map-search-wrapper {
  position: relative;
  flex: 1;
  min-width: 260px;
}

.map-search-input {
  width: 100%;
  padding: 0.55rem 2.2rem 0.55rem 0.85rem;
  background-color: var(--vp-c-bg-soft, #21262d);
  border: 1px solid var(--vp-c-divider, #30363d);
  border-radius: 8px;
  color: var(--vp-c-text-1, #f0f6fc);
  font-size: 0.88rem;
  outline: none;
  transition: border-color 0.2s ease;
}

.map-search-input:focus {
  border-color: var(--vp-c-brand-1, #2ea043);
}

.search-clear-btn {
  position: absolute;
  right: 0.7rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: var(--vp-c-text-2, #8b949e);
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.2rem;
}

/* Category Filters */
.category-filters {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.category-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.8rem;
  border-radius: 9999px;
  font-size: 0.82rem;
  font-weight: 600;
  background-color: var(--vp-c-bg-soft, #21262d);
  color: var(--vp-c-text-2, #8b949e);
  border: 1px solid var(--vp-c-divider, #30363d);
  cursor: pointer;
  transition: all 0.15s ease;
}

.category-pill:hover {
  color: var(--vp-c-text-1, #f0f6fc);
  border-color: var(--vp-c-text-2, #8b949e);
}

.category-pill.is-active {
  background-color: var(--vp-c-brand-1, #2ea043);
  color: #ffffff;
  border-color: var(--vp-c-brand-1, #2ea043);
}

.cat-count {
  font-size: 0.72rem;
  padding: 0.1rem 0.4rem;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 9999px;
}

/* Map Display Wrapper */
.map-display-wrapper {
  position: relative;
  width: 100%;
}

.leaflet-frame-container {
  position: relative;
  width: 100%;
  height: 560px;
  background-color: #0d1117;
  border: 1px solid var(--vp-c-divider, #30363d);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.leaflet-map-element {
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* Overlay Legend */
.map-overlay-legend {
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 999;
  background-color: rgba(22, 27, 34, 0.92);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(48, 54, 61, 0.8);
  border-radius: 8px;
  padding: 0.65rem 0.9rem;
  pointer-events: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.legend-header {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #8b949e;
  margin-bottom: 0.4rem;
  letter-spacing: 0.04em;
}

.legend-items {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #f0f6fc;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

/* Hint Pill */
.map-hint-pill {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 999;
  background-color: rgba(22, 27, 34, 0.92);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(48, 54, 61, 0.8);
  border-radius: 9999px;
  padding: 0.4rem 0.85rem;
  font-size: 0.78rem;
  color: #8b949e;
  pointer-events: none;
}

/* Directory / Grid View */
.grid-display-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.directory-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.88rem;
  color: var(--vp-c-text-2, #8b949e);
}

.clear-filters-btn {
  background: transparent;
  border: 1px solid var(--vp-c-divider, #30363d);
  color: var(--vp-c-brand-3, #3fb950);
  border-radius: 6px;
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  cursor: pointer;
}

.directory-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1rem;
}

.directory-card {
  background-color: var(--vp-c-bg-alt, #161b22);
  border: 1px solid var(--vp-c-divider, #30363d);
  border-radius: 10px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.directory-card:hover {
  border-color: var(--vp-c-brand-1, #2ea043);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.directory-card.is-selected {
  border-color: var(--vp-c-brand-1, #2ea043);
  background-color: rgba(46, 160, 67, 0.05);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.card-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid transparent;
}

.card-location {
  font-size: 0.78rem;
  color: var(--vp-c-text-2, #8b949e);
}

.card-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--vp-c-text-1, #f0f6fc);
  margin: 0;
  line-height: 1.35;
}

.card-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2, #8b949e);
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-coworking-preview {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.5rem 0.65rem;
  background-color: var(--vp-c-bg-soft, #21262d);
  border-radius: 6px;
  font-size: 0.78rem;
}

.preview-rate-chip {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.preview-rate-chip .chip-label {
  color: var(--vp-c-text-2, #8b949e);
}

.preview-rate-chip .chip-val {
  color: #f59e0b;
  font-weight: 700;
}

.preview-transit {
  color: var(--vp-c-text-2, #8b949e);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.tag-pill {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  background-color: var(--vp-c-bg-soft, #21262d);
  color: var(--vp-c-text-2, #8b949e);
  border: 1px solid var(--vp-c-divider, #30363d);
}

.card-footer {
  margin-top: auto;
  padding-top: 0.5rem;
  border-top: 1px solid var(--vp-c-divider, #30363d);
}

.inspect-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: transparent;
  border: none;
  color: var(--vp-c-brand-3, #3fb950);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
}

/* SELECTED LANDMARK INSPECTOR PANEL */
.landmark-inspector-panel {
  display: flex;
  flex-direction: column;
}

.inspector-card {
  background-color: var(--vp-c-bg-alt, #161b22);
  border: 1px solid var(--vp-c-divider, #30363d);
  border-radius: 12px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.inspector-badge-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.6rem;
  flex-wrap: wrap;
}

.inspector-category-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
}

.inspector-region-pill {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--vp-c-text-2, #8b949e);
}

.inspector-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--vp-c-text-1, #f0f6fc);
  margin: 0 0 0.4rem 0;
  line-height: 1.3;
}

.inspector-description {
  font-size: 0.95rem;
  color: var(--vp-c-text-2, #8b949e);
  line-height: 1.6;
  margin: 0;
}

/* Co-working Specific Inspector Box */
.inspector-coworking-box {
  background-color: var(--vp-c-bg-soft, #21262d);
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-radius: 10px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.box-heading {
  font-size: 0.92rem;
  font-weight: 700;
  color: #f59e0b;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.spec-card {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.spec-label {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-2, #8b949e);
}

.rates-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  background-color: var(--vp-c-bg-alt, #161b22);
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider, #30363d);
}

.rate-line {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: var(--vp-c-text-1, #f0f6fc);
}

.rate-line strong {
  color: #f59e0b;
}

.spec-val {
  font-size: 0.88rem;
  color: var(--vp-c-text-1, #f0f6fc);
  margin: 0;
  line-height: 1.4;
}

.amenities-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.3rem;
}

.amenity-chip {
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.25rem 0.6rem;
  background-color: var(--vp-c-bg-alt, #161b22);
  color: var(--vp-c-text-1, #f0f6fc);
  border: 1px solid var(--vp-c-divider, #30363d);
  border-radius: 6px;
}

.comm-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.3rem;
}

.comm-chip {
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.25rem 0.6rem;
  background-color: rgba(46, 160, 67, 0.15);
  color: var(--vp-c-brand-3, #3fb950);
  border: 1px solid rgba(46, 160, 67, 0.3);
  border-radius: 6px;
}

/* Highlights Box */
.inspector-highlights-box {
  background-color: var(--vp-c-bg-soft, #21262d);
  border: 1px solid var(--vp-c-divider, #30363d);
  border-radius: 10px;
  padding: 1.25rem;
}

.inspector-highlights-list {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.inspector-highlights-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.88rem;
  color: var(--vp-c-text-1, #f0f6fc);
  line-height: 1.4;
}

.bullet {
  color: var(--vp-c-brand-3, #3fb950);
  font-weight: 700;
}

/* Entities & Tags */
.inspector-entities-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
  padding-top: 0.5rem;
}

.meta-label {
  display: block;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-2, #8b949e);
  margin-bottom: 0.4rem;
}

.entities-pills, .tags-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.entity-pill {
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft, #21262d);
  color: var(--vp-c-text-1, #f0f6fc);
  border: 1px solid var(--vp-c-divider, #30363d);
}

/* Inspector Footer */
.inspector-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider, #30363d);
  flex-wrap: wrap;
  gap: 1rem;
}

.coords-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.coord-label {
  font-size: 0.78rem;
  color: var(--vp-c-text-2, #8b949e);
}

.coord-code {
  font-size: 0.78rem;
  background-color: var(--vp-c-bg-soft, #21262d);
  padding: 0.2rem 0.45rem;
  border-radius: 4px;
  color: var(--vp-c-brand-3, #3fb950);
}

.inspector-portal-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 1.1rem;
  background-color: var(--vp-c-brand-1, #2ea043);
  color: #ffffff;
  font-size: 0.88rem;
  font-weight: 600;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.15s ease;
}

.inspector-portal-btn:hover {
  background-color: var(--vp-c-brand-2, #238636);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .leaflet-frame-container {
    height: 440px;
  }

  .map-overlay-legend {
    display: none;
  }

  .map-hint-pill {
    display: none;
  }
}
</style>

<!-- Global Styles for Leaflet Custom Markers & Popups -->
<style>
.leaflet-container {
  font-family: var(--vp-font-family-base, 'Plus Jakarta Sans', sans-serif) !important;
  background: #0d1117 !important;
}

.leaflet-custom-marker-wrapper {
  background: transparent;
  border: none;
}

.custom-marker-pin {
  position: relative;
  width: 36px;
  height: 42px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.custom-marker-pin:hover {
  transform: translateY(-4px) scale(1.08);
}

.custom-marker-pin.is-selected {
  transform: translateY(-4px) scale(1.15);
  z-index: 1000 !important;
}

.pin-body {
  width: 32px;
  height: 32px;
  background-color: var(--marker-color, #10b981);
  border: 2px solid #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.4);
  z-index: 2;
}

.pin-pointer {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid var(--marker-color, #10b981);
  margin-top: -2px;
  z-index: 1;
}

.pin-pulse {
  position: absolute;
  top: 0;
  left: 2px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--marker-color, #10b981);
  opacity: 0;
  z-index: 0;
}

.custom-marker-pin.is-selected .pin-pulse {
  animation: markerPulse 1.8s infinite cubic-bezier(0.25, 1, 0.5, 1);
}

@keyframes markerPulse {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  100% {
    transform: scale(2.2);
    opacity: 0;
  }
}

.tech-leaflet-custom-popup .leaflet-popup-content-wrapper {
  background-color: #161b22 !important;
  color: #f0f6fc !important;
  border: 1px solid #30363d !important;
  border-radius: 10px !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5) !important;
  padding: 0 !important;
  overflow: hidden;
}

.tech-leaflet-custom-popup .leaflet-popup-content {
  margin: 0 !important;
  line-height: 1.5 !important;
}

.tech-leaflet-custom-popup .leaflet-popup-tip {
  background-color: #161b22 !important;
  border: 1px solid #30363d !important;
}

.tech-leaflet-custom-popup .leaflet-popup-close-button {
  color: #8b949e !important;
  top: 10px !important;
  right: 10px !important;
  font-size: 18px !important;
}

.tech-leaflet-custom-popup .leaflet-popup-close-button:hover {
  color: #f0f6fc !important;
}

.tech-map-leaflet-popup {
  display: flex;
  flex-direction: column;
}

.popup-header {
  padding: 0.9rem 1.1rem 0.65rem 1.1rem;
  background-color: #0d1117;
}

.popup-category-badge {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.popup-dot {
  color: #8b949e;
}

.popup-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #f0f6fc;
  margin: 0;
  line-height: 1.35;
}

.popup-body {
  padding: 0.9rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.popup-description {
  font-size: 0.82rem;
  color: #8b949e;
  margin: 0;
  line-height: 1.45;
}

.popup-coworking-section {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.popup-rates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 0.4rem;
  background-color: #21262d;
  padding: 0.5rem 0.65rem;
  border-radius: 6px;
}

.popup-rate-item {
  display: flex;
  flex-direction: column;
  font-size: 0.72rem;
}

.popup-rate-item .rate-label {
  color: #8b949e;
  font-size: 0.68rem;
  text-transform: uppercase;
}

.popup-rate-item .rate-val {
  color: #f59e0b;
  font-weight: 700;
}

.popup-info-row {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  font-size: 0.78rem;
  color: #c9d1d9;
}

.popup-amenities-box, .popup-comm-box {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  background-color: #21262d;
  padding: 0.5rem 0.65rem;
  border-radius: 6px;
}

.popup-box-title {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #8b949e;
}

.popup-amenities-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.2rem 0.4rem;
  font-size: 0.74rem;
  color: #f0f6fc;
}

.popup-comm-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.comm-pill {
  font-size: 0.68rem;
  font-weight: 600;
  padding: 0.1rem 0.4rem;
  background-color: rgba(46, 160, 67, 0.2);
  color: #3fb950;
  border-radius: 4px;
}

.popup-highlights-box {
  background-color: #21262d;
  padding: 0.5rem 0.65rem;
  border-radius: 6px;
}

.popup-highlights-list {
  list-style: none;
  padding: 0;
  margin: 0.25rem 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: #c9d1d9;
}

.popup-tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: 0.2rem;
}

.popup-actions {
  padding: 0.65rem 1.1rem;
  background-color: #0d1117;
  border-top: 1px solid #30363d;
  display: flex;
  justify-content: flex-end;
}

.popup-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.15s ease;
}

.popup-btn-primary {
  background-color: #2ea043;
  color: #ffffff;
}

.popup-btn-primary:hover {
  background-color: #238636;
}
</style>