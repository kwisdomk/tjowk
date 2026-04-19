import type { Metadata } from 'next';
import { profile } from '@/lib/content/profile';
import { ContactForm } from '@/components/contact/ContactForm';
import { Github, Linkedin, Mail, Copy } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Signal',
  description: 'How to reach Wisdom Kinoti.',
};

const LINKS = [
  {
    id: 'github-primary',
    icon: Github,
    label: 'GitHub (primary)',
    value: `github.com/${profile.handles.github_primary}`,
    href: `https://github.com/${profile.handles.github_primary}`,
  },
  {
    id: 'github-secondary',
    icon: Github,
    label: 'GitHub (secondary)',
    value: `github.com/${profile.handles.github_secondary}`,
    href: `https://github.com/${profile.handles.github_secondary}`,
  },
  {
    id: 'linkedin',
    icon: Linkedin,
    label: 'LinkedIn',
    value: `linkedin.com/in/${profile.handles.linkedin}`,
    href: `https://linkedin.com/in/${profile.handles.linkedin}`,
  },
];

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 space-y-16">

      {/* ── Header ──────────────────────────────── */}
      <header>
        <p className="label-mono mb-3">SIGNAL_LAYER</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          Contact.
        </h1>
        <p className="mt-4 text-sm text-neutral-500 font-mono max-w-lg leading-relaxed">
          {profile.openTo}
        </p>
      </header>

      {/* ── Direct links ────────────────────────── */}
      <section>
        <p className="label-mono mb-4">DIRECT_CHANNELS</p>
        <div className="space-y-2">
          {/* Email */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-white/[0.07] bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-neutral-600 flex-shrink-0" />
              <div>
                <p className="label-mono mb-0.5">EMAIL</p>
                <p className="text-sm font-mono text-neutral-300">{profile.handles.email}</p>
              </div>
            </div>
            <Link
              href={`mailto:${profile.handles.email}`}
              className="flex items-center gap-1.5 text-xs font-mono text-neutral-600 hover:text-emerald-400 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              Send
            </Link>
          </div>

          {/* Social links */}
          {LINKS.map(({ id, icon: Icon, label, value, href }) => (
            <Link
              key={id}
              href={href}
              target="_blank"
              className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.01]
                         hover:border-white/15 hover:bg-white/[0.03] transition-all duration-200 group"
            >
              <Icon className="w-4 h-4 text-neutral-600 flex-shrink-0 group-hover:text-emerald-400 transition-colors" />
              <div className="flex-1 min-w-0">
                <p className="label-mono mb-0.5">{label.toUpperCase()}</p>
                <p className="text-sm font-mono text-neutral-400 truncate">{value}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Form ────────────────────────────────── */}
      <section>
        <p className="label-mono mb-4">DIRECT_MESSAGE</p>
        <p className="text-xs font-mono text-neutral-600 mb-6">
          Powered by Resend. Goes directly to my inbox.
          Setup RESEND_API_KEY in .env.local to activate.
        </p>
        <div className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
          <ContactForm />
        </div>
      </section>

    </div>
  );
}
