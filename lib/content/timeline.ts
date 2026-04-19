// Timeline — the full chronological record. Everything goes here.
// project → experiment → milestone
// projectId links back to projects.ts if the entry maps to a project record.

export type TimelineEntryType = 'project' | 'experiment' | 'milestone';

export type TimelineEntry = {
  id: string;
  date: string;
  year: number;
  title: string;
  type: TimelineEntryType;
  summary: string;
  projectId?: string;   // links back to projects.ts if exists
  highlight?: boolean;  // true = major milestone, gets visual emphasis
};

export const timeline: TimelineEntry[] = [
  // ─── 2024 ──────────────────────────────────────
  {
    id: 'oop-labs-24',
    date: 'Jan 2024',
    year: 2024,
    title: 'OOP Labs (OOP-bcs)',
    type: 'project',
    summary: 'CS coursework. First real code. Object-oriented fundamentals in Java.',
    projectId: 'oop-labs',
  },
  {
    id: 'compsvision-24',
    date: 'Mar 2024',
    year: 2024,
    title: 'Computer Vision Experiments',
    type: 'experiment',
    summary: 'First ML experiments — image classification, object detection with OpenCV.',
    projectId: 'compsvision',
  },
  {
    id: 'ensp-24',
    date: 'May 2024',
    year: 2024,
    title: 'eNSP Networking Labs',
    type: 'experiment',
    summary: 'Networking fundamentals via Huawei eNSP. VLANs, routing, switching, subnetting.',
    projectId: 'ensp-labs',
  },
  {
    id: 'zetech-start',
    date: 'Sep 2024',
    year: 2024,
    title: 'Zetech University — BSc Computer Science',
    type: 'milestone',
    summary: 'Year 1 begins. CS fundamentals, mathematics, systems programming.',
    highlight: true,
  },

  // ─── 2025 ──────────────────────────────────────
  {
    id: 'zurvan-25',
    date: 'Apr 2025',
    year: 2025,
    title: 'zurvan-tracker',
    type: 'project',
    summary: 'Self-built learning tracker. First full Next.js + Supabase project.',
    projectId: 'zurvan-tracker',
  },
  {
    id: 'miniazon-25',
    date: 'Jun 2025',
    year: 2025,
    title: 'Miniazon',
    type: 'project',
    summary: 'DSA project — e-commerce simulation. Binary search, sorting, graph traversal applied.',
    projectId: 'miniazon',
  },
  {
    id: 'ibm-bootcamp-start',
    date: 'Sep 2025',
    year: 2025,
    title: 'IBM Cybersecurity Bootcamp begins',
    type: 'milestone',
    summary: 'i3 Technologies. QRadar SIEM, Guardium Data Protection, IAM, SOC operations.',
    highlight: true,
  },
  {
    id: 'eye-of-odin-25',
    date: 'Sep 2025',
    year: 2025,
    title: 'Eye-of-Odin',
    type: 'project',
    summary: 'MLH Google Gemini hackathon. AI vision system. First competitive hackathon.',
    projectId: 'eye-of-odin',
  },
  {
    id: 'genesis-25',
    date: 'Oct 2025',
    year: 2025,
    title: 'genesis',
    type: 'project',
    summary: 'GitLab AI hackathon. Developer workflow automation using GitLab API + LangChain.',
    projectId: 'genesis',
  },
  {
    id: 'ibm-technical-review',
    date: 'Dec 2025',
    year: 2025,
    title: 'IBM Technical Review — 9.0 / 10',
    type: 'milestone',
    summary: 'End-of-bootcamp technical assessment. 9.0/10. Internship offer extended.',
    highlight: true,
  },
  {
    id: 'cybersentinel-25',
    date: 'Nov 2025',
    year: 2025,
    title: 'CyberSentinel',
    type: 'experiment',
    summary: 'SIEM rule tuning experiments. QRadar custom use cases and threat modeling exercises.',
  },

  // ─── 2026 ──────────────────────────────────────
  {
    id: 'ibm-intern-start',
    date: 'Jan 2026',
    year: 2026,
    title: 'IBM Software Developer Intern — i3 Technologies',
    type: 'milestone',
    summary: 'Official internship starts. Agentic AI workflows using IBM Granite and watsonx Orchestrate.',
    highlight: true,
  },
  {
    id: 'haki-26',
    date: 'Jan 2026',
    year: 2026,
    title: 'HAKI',
    type: 'project',
    summary: 'IBM DevDay 2026. Agentic AI telemedicine orchestrator. Team Lead.',
    projectId: 'haki',
  },
  {
    id: 'wisevoido-26',
    date: 'Feb 2026',
    year: 2026,
    title: 'Wisevoido',
    type: 'project',
    summary: 'RAG document intelligence system. Supabase pgvector. Personal knowledge retrieval.',
    projectId: 'wisevoido',
  },
  {
    id: 'wisdomai-26',
    date: 'Feb 2026',
    year: 2026,
    title: 'WisdomAI',
    type: 'project',
    summary: '6-agent WhatsApp health triage system. LangGraph orchestration. 78 test cases.',
    projectId: 'wisdomai',
  },
  {
    id: 'otdt-26',
    date: 'Mar 2026',
    year: 2026,
    title: 'OTDT — OT Digital Twin',
    type: 'project',
    summary: 'Solo MAS 9.1 deployment on OpenShift ROKS. Presented at EAAAIW 2026.',
    projectId: 'otdt',
    highlight: true,
  },
  {
    id: 'vulai-26',
    date: 'Mar 2026',
    year: 2026,
    title: 'vulai',
    type: 'project',
    summary: 'AI-powered vulnerability intelligence CLI. Shipped on PyPI. Full release cycle.',
    projectId: 'vulai',
  },
  {
    id: 'aegis-26',
    date: 'Apr 2026',
    year: 2026,
    title: 'AEGIS',
    type: 'project',
    summary: 'Portable Windows diagnostics framework. Stateless. No install. v1.0 released.',
    projectId: 'aegis',
  },
  {
    id: 'ai-athena-26',
    date: 'Apr 2026',
    year: 2026,
    title: 'ai-athena',
    type: 'experiment',
    summary: 'Local AI stack on Athena. Ollama, LM Studio, CUDA inference experiments.',
    projectId: 'ai-athena',
  },
  {
    id: 'the-journey-26',
    date: 'Apr 2026',
    year: 2026,
    title: 'The Journey — this site',
    type: 'project',
    summary: 'Portfolio v2. Self-updating technical autobiography. Built from scratch.',
  },
];
