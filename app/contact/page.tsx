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
        <p className="label-mono mb-3">Signal layer</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
          Contact.
        </h1>
        <p className="mt-4 text-sm text-muted-custom font-mono max-w-lg leading-relaxed">
          {profile.openTo}
        </p>
      </header>

      {/* ── Direct links ────────────────────────── */}
      <section>
        <p className="label-mono mb-4">Direct channels</p>
        <div className="space-y-2">
          {/* Email */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-border-subtle bg-surface-2">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-muted-custom flex-shrink-0" />
              <div>
                <p className="label-mono mb-0.5">Email</p>
                <p className="text-sm font-mono text-secondary-custom">{profile.handles.email}</p>
              </div>
            </div>
            <Link
              href={`mailto:${profile.handles.email}`}
              className="flex items-center gap-1.5 text-xs font-mono text-muted-custom hover:text-emerald transition-colors"
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
              className="flex items-center gap-3 p-4 rounded-xl border border-border-subtle bg-surface-2
                         hover:border-border-hover hover:bg-surface transition-all duration-200 group"
            >
              <Icon className="w-4 h-4 text-muted-custom flex-shrink-0 group-hover:text-emerald transition-colors" />
              <div className="flex-1 min-w-0">
                <p className="label-mono mb-0.5">{label}</p>
                <p className="text-sm font-mono text-secondary-custom truncate">{value}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Form ────────────────────────────────── */}
      <section>
        <p className="label-mono mb-4">Direct message</p>
        <p className="text-xs font-mono text-muted-custom mb-6">
          Powered by Resend. Goes directly to my inbox.
        </p>
        <div className="p-6 rounded-2xl border border-border-subtle bg-surface-2">
          <ContactForm />
        </div>
      </section>

    </div>
  );
}
