// Profile — identity layer. Edit here to update all places that render your identity.

export type Profile = {
  name: string;
  alias: string;              // greek handle
  handles: {
    github_primary: string;
    github_secondary: string;
    linkedin: string;
    email: string;
  };
  role: string;               // primary role shown on landing
  subRoles: string[];         // secondary labels
  location: string;
  timezone: string;
  tagline: string;
  philosophy: string;         // short version for footer/about
  machine: {
    name: string;
    specs: string;
  };
  openTo: string;             // shown on /contact
};

export const profile: Profile = {
  name: 'Wisdom Kinoti',
  alias: 'φιλόσοφος',
  handles: {
    github_primary: 'kwisdomk',
    github_secondary: '6ofHertz',
    linkedin: 'kwisdomk',
    email: 'wisdomkinoti@proton.me',
  },
  role: 'Junior Cybersecurity Analyst',
  subRoles: ['CS Student', 'IBM i3 Intern', 'Systems Builder'],
  location: 'Nairobi, Kenya',
  timezone: 'UTC+3',
  tagline: 'I blueprint things before they escape. Most of them turn into something real.',
  philosophy:
    'I operate at the intersection of technical mastery and philosophical inquiry. Whether hardening a RHEL kernel or orchestrating multi-agent AI, the approach is the same — deep system understanding over surface-level completion.',
  machine: {
    name: 'Athena',
    specs: 'HP Victus 15 · i5-13420H · RTX 3050 6GB · 8GB DDR4',
  },
  openTo:
    'Collaborations that are technically serious and contextually relevant — East African health tech, security tooling, AI infrastructure, or open-source with a point.',
};
