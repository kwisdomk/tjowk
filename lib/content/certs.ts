// Certifications — complete + in-progress + planned.
// No fake scores. No inflated percentages.

export type CertStatus = 'complete' | 'in-progress' | 'planned';

export type Cert = {
  id: string;
  title: string;
  issuer: string;
  status: CertStatus;
  score?: string;       // only if real and verified
  date?: string;        // completion date
  deadline?: string;    // target date for in-progress
  credlyUrl?: string;
  notes?: string;
};

export const certs: Cert[] = [
  // ─── COMPLETE ──────────────────────────────────
  {
    id: 'qradar-l2',
    title: 'IBM QRadar SIEM L2',
    issuer: 'IBM',
    status: 'complete',
    score: '88%',
  },
  {
    id: 'qradar-l3',
    title: 'IBM QRadar SIEM L3 Tech Sales',
    issuer: 'IBM',
    status: 'complete',
    score: '100%',
  },
  {
    id: 'qradar-arch',
    title: 'IBM QRadar Architecture & Sizing',
    issuer: 'IBM',
    status: 'complete',
    score: '90%',
  },
  {
    id: 'ibm-agentic-ai',
    title: 'IBM Agentic AI Hands-On',
    issuer: 'CognitiveClass.ai',
    status: 'complete',
    date: 'Mar 2026',
  },
  {
    id: 'claude-101',
    title: 'Anthropic Claude 101',
    issuer: 'Anthropic',
    status: 'complete',
    score: '100%',
    date: 'Mar 2026',
  },
  {
    id: 'isc2-candidate',
    title: 'ISC2 Candidate',
    issuer: 'ISC2',
    status: 'complete',
    notes: 'Active candidate status. Exam prep ongoing.',
  },

  // ─── IN PROGRESS ───────────────────────────────
  {
    id: 'isc2-cc',
    title: 'ISC2 CC — Certified in Cybersecurity',
    issuer: 'ISC2',
    status: 'in-progress',
    deadline: 'Sep 2026',
  },
  {
    id: 'security-plus',
    title: 'CompTIA Security+',
    issuer: 'CompTIA',
    status: 'in-progress',
    deadline: '2026',
  },
  {
    id: 'ceh',
    title: 'CEH — Certified Ethical Hacker',
    issuer: 'EC-Council',
    status: 'in-progress',
    deadline: '2026',
  },
  {
    id: 'rhsa-i',
    title: 'RHSA I — RH124 Red Hat System Administration',
    issuer: 'Red Hat',
    status: 'in-progress',
    notes: '~46% complete · Chapter 9 I/O Redirection · 9 days lab remaining',
  },

  // ─── PLANNED ───────────────────────────────────
  {
    id: 'oscp',
    title: 'OSCP — Offensive Security Certified Professional',
    issuer: 'Offensive Security',
    status: 'planned',
    notes: 'Phase 2 target',
  },
  {
    id: 'cysa',
    title: 'CySA+ — CompTIA Cybersecurity Analyst',
    issuer: 'CompTIA',
    status: 'planned',
    notes: 'Phase 2 target',
  },
  {
    id: 'cissp',
    title: 'CISSP',
    issuer: 'ISC2',
    status: 'planned',
    notes: 'Phase 3 — executive track',
  },
];
