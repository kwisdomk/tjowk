// Projects — source of truth for all project data.
// Add a project here → it appears on the site. No other file to touch.
// Set featured: true for the 5 flagship projects shown at the top of /projects.

export type ProjectPhase = 'exploration' | 'systems' | 'production';
export type ProjectStatus = 'active' | 'paused' | 'archived';
export type ProjectCategory = 'ai' | 'security' | 'web' | 'infra' | 'tools';

export type Project = {
  id: string;
  codename: string;                   // ALL_CAPS short name
  title: string;                      // full descriptive title
  tagline: string;                    // one line
  phase: ProjectPhase;
  status: ProjectStatus;
  date: string;                       // "Mar 2026"
  featured: boolean;                  // true = shown in Featured section
  problem?: string;
  solution?: string;
  impact?: string;                    // only if real and measurable
  stack: string[];
  category: ProjectCategory;
  links?: {
    github?: string;
    live?: string;
  };
};

export const projects: Project[] = [
  // ─────────────────────────────────────────────
  // FEATURED — 5 flagship systems
  // ─────────────────────────────────────────────
  {
    id: 'otdt',
    codename: 'OTDT',
    title: 'OT Digital Twin',
    tagline: 'Real-time industrial digital twin for geothermal plant operations',
    phase: 'production',
    status: 'active',
    date: 'Mar 2026',
    featured: true,
    problem:
      'No affordable remote monitoring solution for industrial OT environments in East Africa. Engineers fly to sites to read meters.',
    solution:
      'Solo deployment of IBM Maximo Application Suite 9.1 on a 6-node OpenShift ROKS cluster (Frankfurt region). Monte Carlo failure prediction, LSTM anomaly detection, Unity XR visualisation layer.',
    impact:
      'Presented at EAAAIW 2026 (CUEA). Validated by an Oil & Gas engineer. 30% PoC pathway to IBM Research Africa identified.',
    stack: ['IBM MAS 9.1', 'OpenShift 4.19', 'IBM Cloud ROKS', 'watsonx.ai', 'Python', 'Unity XR'],
    category: 'infra',
    links: {
      github: 'https://github.com/kwisdomk/otdt',
    },
  },
  {
    id: 'wisdomai',
    codename: 'WisdomAI',
    title: 'Multi-Agent Health Intelligence System',
    tagline: '6-agent WhatsApp health triage system for low-resource clinical environments',
    phase: 'production',
    status: 'active',
    date: 'Feb 2026',
    featured: true,
    problem:
      'Patients in low-resource environments lack access to consistent medical triage, leading to delayed diagnoses and preventable deterioration.',
    solution:
      '6-agent AI architecture orchestrated via LangGraph. Triage, symptom analysis, prescription lookup, escalation, follow-up, and audit agents working in sequence. WhatsApp as the delivery layer — zero app install for patients.',
    impact:
      '78 test cases validated. Full HIPAA-aligned audit trail. Flagged for potential deployment through community health programs.',
    stack: ['LangGraph', 'Python', 'Twilio WhatsApp API', 'FastAPI', 'PostgreSQL', 'IBM Granite'],
    category: 'ai',
    links: {
      github: 'https://github.com/kwisdomk/wisdomai',
    },
  },
  {
    id: 'haki',
    codename: 'HAKI',
    title: 'Agentic Healthcare Orchestrator',
    tagline: 'IBM DevDay 2026 hackathon project — AI telemedicine for rural diagnostic gaps',
    phase: 'production',
    status: 'paused',
    date: 'Jan 2026',
    featured: true,
    problem:
      'Rural regions in East Africa suffer critical doctor shortages. Patients travel hours for basic triage that could be automated.',
    solution:
      'Agentic AI system using IBM Granite and watsonx Orchestrate to autonomously triage patients and allocate medical resources. Deployed on IBM Cloud.',
    impact:
      'Team Lead at IBM DevDay 2026. Scalable architecture reviewed by IBM engineers. Identified as a candidate for IBM Research Africa partnership.',
    stack: ['IBM Granite', 'watsonx Orchestrate', 'Next.js 14', 'IBM Maximo', 'IBM Cloud'],
    category: 'ai',
    links: {
      github: 'https://github.com/kwisdomk/haki',
    },
  },
  {
    id: 'vulai',
    codename: 'vulai',
    title: 'AI-Powered Vulnerability Intelligence CLI',
    tagline: 'Open-source NVD vulnerability scanner with LLM-generated remediation guides',
    phase: 'production',
    status: 'active',
    date: 'Mar 2026',
    featured: true,
    problem:
      'Security teams spend significant time contextualizing raw CVE data into actionable remediation steps. NVD data is dense and not operator-friendly.',
    solution:
      'CLI tool that queries NVD, enriches CVE data with LLM analysis, and outputs prioritized remediation guides in human-readable format. Full release cycle: versioned, documented, community distributed.',
    impact:
      'Shipped and distributed. Active community adoption. Covers the full security analyst workflow from detection to remediation brief.',
    stack: ['Python', 'NVD API', 'OpenAI API', 'Click', 'Rich', 'PyPI'],
    category: 'security',
    links: {
      github: 'https://github.com/kwisdomk/vulai',
      live: 'https://pypi.org/project/vulai',
    },
  },
  {
    id: 'aegis',
    codename: 'AEGIS',
    title: 'Portable Windows Diagnostic Framework',
    tagline: 'Stateless forensic system diagnostics — no install, no footprint, no trust',
    phase: 'production',
    status: 'active',
    date: 'Apr 2026',
    featured: true,
    problem:
      'Diagnosing Windows system health in field environments requires installing tools that may not be permitted, may not exist, or may themselves be compromised.',
    solution:
      'Stateless PowerShell diagnostic framework. Captures baseline snapshots, compares drift, flags anomalies. Single-file. No install. No registry writes. No external dependencies. Runs on any Windows system.',
    impact:
      'v1.0 released. Validated on external environments. Used as a real diagnostic tool during IBM internship.',
    stack: ['PowerShell 5.1+', 'Windows WMI', 'CIM', 'Baseline diffing'],
    category: 'tools',
    links: {
      github: 'https://github.com/kwisdomk/aegis',
    },
  },

  // ─────────────────────────────────────────────
  // TIMELINE ONLY — appear in chronological timeline, not featured section
  // ─────────────────────────────────────────────
  {
    id: 'oop-labs',
    codename: 'OOP-bcs',
    title: 'Object-Oriented Programming Labs',
    tagline: 'CS coursework — raw first code',
    phase: 'exploration',
    status: 'archived',
    date: '2024',
    featured: false,
    stack: ['Java'],
    category: 'web',
  },
  {
    id: 'compsvision',
    codename: 'compsvision',
    title: 'Computer Vision Experiments',
    tagline: 'First ML experiments — image classification and object detection',
    phase: 'exploration',
    status: 'archived',
    date: '2024',
    featured: false,
    stack: ['Python', 'OpenCV', 'TensorFlow'],
    category: 'ai',
  },
  {
    id: 'ensp-labs',
    codename: 'eNSP',
    title: 'eNSP Networking Labs',
    tagline: 'Networking fundamentals via Huawei Enterprise Network Simulation Platform',
    phase: 'exploration',
    status: 'archived',
    date: '2024',
    featured: false,
    stack: ['eNSP', 'Cisco IOS', 'Huawei VRP'],
    category: 'infra',
  },
  {
    id: 'zurvan-tracker',
    codename: 'zurvan-tracker',
    title: 'Personal Learning System',
    tagline: 'Self-built learning tracker with progress metrics',
    phase: 'exploration',
    status: 'archived',
    date: 'Mid 2025',
    featured: false,
    stack: ['Next.js', 'Supabase'],
    category: 'web',
  },
  {
    id: 'miniazon',
    codename: 'Miniazon',
    title: 'DSA Implementation Project',
    tagline: 'Data structures and algorithms applied to an e-commerce simulation',
    phase: 'exploration',
    status: 'archived',
    date: 'Mid 2025',
    featured: false,
    stack: ['Java', 'DSA'],
    category: 'web',
  },
  {
    id: 'eye-of-odin',
    codename: 'Eye-of-Odin',
    title: 'MLH Gemini Hackathon Entry',
    tagline: 'AI vision system built for the MLH Google Gemini hackathon',
    phase: 'systems',
    status: 'archived',
    date: 'Sep 2025',
    featured: false,
    stack: ['Google Gemini', 'Python', 'FastAPI'],
    category: 'ai',
  },
  {
    id: 'genesis',
    codename: 'genesis',
    title: 'GitLab AI Hackathon Entry',
    tagline: 'AI-powered developer workflow automation — GitLab hackathon submission',
    phase: 'systems',
    status: 'archived',
    date: 'Oct 2025',
    featured: false,
    stack: ['GitLab API', 'Python', 'LangChain'],
    category: 'ai',
  },
  {
    id: 'wisevoido',
    codename: 'Wisevoido',
    title: 'RAG Document Intelligence System',
    tagline: 'Personal RAG pipeline for document Q&A and knowledge retrieval',
    phase: 'systems',
    status: 'paused',
    date: 'Jan 2026',
    featured: false,
    stack: ['Python', 'LangChain', 'Supabase pgvector', 'Next.js'],
    category: 'ai',
  },
  {
    id: 'ai-athena',
    codename: 'ai-athena',
    title: 'Athena — Personal AI Infrastructure',
    tagline: 'Local AI stack running on Athena — inference, RAG, agent experiments',
    phase: 'systems',
    status: 'active',
    date: 'Apr 2026',
    featured: false,
    stack: ['Ollama', 'LM Studio', 'Python', 'CUDA', 'Open WebUI'],
    category: 'ai',
  },
];
