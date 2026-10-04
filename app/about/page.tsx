import type { Metadata } from 'next';
import { getProfile } from '@/lib/content/loaders';
import { Briefcase, Building2, GraduationCap, Server } from 'lucide-react';
import { OperatorPortrait } from '@/components/about/OperatorPortrait';

export const metadata: Metadata = {
  title: 'About Wisdom Kinoti',
  description: 'About Wisdom Kinoti — Junior Cybersecurity Analyst in Nairobi, Kenya. Career arc, philosophy, and technical direction.',
  alternates: {
    canonical: '/about',
  },
};

const EXPERIENCE = [
  {
    org: 'i3 Technologies',
    role: 'Software Developer / Cybersecurity Intern',
    scope: 'Agentic AI workflows and cybersecurity tooling across the IBM technology ecosystem, including Granite, watsonx Orchestrate, and QRadar SIEM.',
    timing: 'Jan 2026 → Present',
    location: 'Nairobi, Kenya',
    icon: Building2,
  },
  {
    org: 'Infrastructure Operations',
    role: 'Systems & Hardware Foundation',
    scope: 'Hands-on operational systems, power, and hardware foundations across Kenya Power, RK Shah, and Close the Gap. Understanding how physical systems run before building software on top of them.',
    timing: 'Pre-2024',
    location: 'Nairobi, Kenya',
    icon: Server,
  },
  {
    org: 'Zetech University',
    role: 'BSc Computer Science',
    scope: 'CS fundamentals, systems programming, mathematics, algorithms, and networks.',
    timing: 'Sep 2024 → Present',
    location: 'Nairobi, Kenya',
    icon: GraduationCap,
  },
];

const CAREER_ARC = [
  {
    phase: 'Phase 1',
    label: 'Technical Depth',
    timing: 'Now',
    active: true,
    items: [
      'ISC2 CC — Certified in Cybersecurity',
      'CompTIA Security+',
      'CEH — Certified Ethical Hacker',
      'RHSA I / RHSA II',
      'First professional security analyst roles',
    ],
  },
  {
    phase: 'Phase 2',
    label: 'Growth & Specialization',
    timing: 'Next',
    active: false,
    items: [
      'OSCP',
      'CySA+ · CASP+',
      'Deeper analyst or pen testing experience',
      'Team-level responsibility',
      'GRC and compliance exposure',
    ],
  },
];

export default function AboutPage() {
  const profile = getProfile();
  return (
    <div className="site-shell py-20 space-y-20">

      {/* ── Header with Operator Portrait ────────── */}
      <header className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="md:col-span-7 space-y-4">
          <p className="label-mono">Identity // Operator</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary font-mono-custom">
            {profile.name}
          </h1>
          <p className="text-xl font-mono text-emerald">{profile.alias}</p>
          <p className="text-secondary-custom dark:text-zinc-300 leading-relaxed text-sm md:text-base pt-2">
            {profile.philosophy}
          </p>
        </div>

        <div className="md:col-span-5 flex justify-center md:justify-end">
          <OperatorPortrait
            avatar={profile.avatar}
            name={profile.name}
            location={profile.location}
            timezone={profile.timezone}
          />
        </div>
      </header>

      {/* ── Experience & Foundation (Scannable) ───── */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <p className="label-mono">Experience & Foundation</p>
          <div className="flex-1 h-px bg-border-subtle" />
          <span className="label-mono">Verified tracks</span>
        </div>

        <div className="space-y-4">
          {EXPERIENCE.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.org}
                className="p-5 rounded-2xl border border-border-subtle bg-surface-2/60 backdrop-blur-xl transition-all hover:border-border"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg border border-border-subtle bg-surface flex items-center justify-center text-emerald flex-shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h2 className="text-base font-mono-custom font-bold text-primary">{item.org}</h2>
                      <p className="text-xs font-mono text-emerald">{item.role}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-border-subtle bg-surface text-muted-custom">
                    {item.timing}
                  </span>
                </div>
                <p className="text-xs font-mono text-secondary-custom dark:text-zinc-300 leading-relaxed mt-3 pl-9">
                  {item.scope}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Narrative Background ────────────────── */}
      <section className="space-y-5">
        <p className="label-mono">Background</p>
        <div className="space-y-4 text-sm text-secondary-custom leading-relaxed max-w-2xl">
          <p>
            I&apos;m pursuing a Bachelor&apos;s in Computer Science while building a public
            record of work across cybersecurity, local AI, automation, and practical systems.
          </p>
          <p>
            Started in physical infrastructure, not code: Kenya Power, RK Shah, Close the Gap.
            Understanding how operational systems run before learning to build software on top of them.
            The shift happened naturally — operations to systems to intelligence.
          </p>
          <p>
            Located in Nairobi, Kenya.
          </p>
        </div>
      </section>

      {/* ── What φιλόσοφος means ────────────────── */}
      <section>
        <p className="label-mono mb-4">On φιλόσοφος</p>
        <div className="border-l-2 border-emerald-dim pl-6 space-y-3">
          <p className="text-sm text-secondary-custom leading-relaxed max-w-xl">
            φιλόσοφος — Greek for &ldquo;lover of wisdom.&rdquo; Not used performatively. It describes a
            disposition: the belief that understanding a system deeply is more valuable than
            using it quickly.
          </p>
          <p className="text-sm text-secondary-custom leading-relaxed max-w-xl">
            This shows up in the work. Every project starts with understanding the problem before
            touching a keyboard. Every tool is chosen for what it actually does, not what it
            signals.
          </p>
        </div>
      </section>

      {/* ── Career direction ─────────────────────── */}
      <section>
        <p className="label-mono mb-6">Career direction</p>
        <div className="space-y-4">
          {CAREER_ARC.map((phase) => (
            <div
              key={phase.phase}
              className={`p-5 rounded-2xl border transition-all ${
                phase.active
                  ? 'border-emerald-dim bg-emerald-glow'
                  : 'border-border-subtle bg-surface-2'
              }`}
            >
              <div className="flex items-start justify-between mb-3 gap-3">
                <div>
                  <p className="label-mono mb-1">{phase.phase}</p>
                  <p className={`font-mono font-semibold ${phase.active ? 'text-emerald' : 'text-secondary-custom'}`}>
                    {phase.label}
                  </p>
                </div>
                <span className={`text-[10px] font-mono px-2 py-1 rounded-full border ${
                  phase.active
                    ? 'border-emerald-dim text-emerald bg-emerald-glow'
                    : 'border-border-subtle text-muted-custom'
                }`}>
                  {phase.timing}
                </span>
              </div>
              <ul className="space-y-1">
                {phase.items.map((item) => (
                  <li key={item} className="text-xs font-mono text-secondary-custom flex items-center gap-2">
                    <span className={phase.active ? 'text-emerald' : 'text-muted-custom'}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
