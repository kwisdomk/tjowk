import type { Metadata } from 'next';
import { IdentityBlock } from '@/components/home/IdentityBlock';
import { CurrentOps } from '@/components/home/CurrentOps';
import { projects } from '@/lib/content/projects';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { StatusBadge } from '@/components/ui/status-badge';

export const metadata: Metadata = {
  title: 'System',
  description: 'The Journey — Wisdom Kinoti. Junior Cybersecurity Analyst, CS Student, IBM i3 Intern. Nairobi, Kenya.',
};

const featuredProjects = projects.filter((p) => p.featured);

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-20">

      {/* ── Identity ─────────────────────────────── */}
      <section>
        <IdentityBlock />
      </section>

      {/* ── Current Operations ───────────────────── */}
      <section>
        <p className="label-mono mb-6">CURRENT_OPERATIONS</p>
        <CurrentOps />
      </section>

      {/* ── Active Systems (compact preview) ─────── */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <p className="label-mono">ACTIVE_SYSTEMS</p>
          <Link
            href="/projects"
            className="flex items-center gap-1.5 text-xs font-mono text-neutral-600 hover:text-emerald-400 transition-colors"
          >
            Full operations log
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredProjects.slice(0, 3).map((project) => (
            <Link key={project.id} href="/projects" className="block group">
              <div className="h-full p-5 rounded-2xl border border-white/[0.06] bg-black/30 backdrop-blur-xl
                              hover:border-white/15 hover:bg-black/50 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="label-mono mb-1">{project.category.toUpperCase()}</p>
                    <h3 className="text-base font-bold font-mono-custom text-white">{project.codename}</h3>
                  </div>
                  <StatusBadge status={project.status} />
                </div>
                <p className="text-xs text-neutral-500 mb-3 leading-relaxed line-clamp-2">{project.tagline}</p>
                <div className="flex flex-wrap gap-1">
                  {project.stack.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-0.5 text-[9px] font-mono text-neutral-600 border border-white/[0.06] rounded-md">
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 3 && (
                    <span className="px-2 py-0.5 text-[9px] font-mono text-neutral-700 border border-white/[0.04] rounded-md">
                      +{project.stack.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Navigation grid ──────────────────────── */}
      <section>
        <p className="label-mono mb-6">NAVIGATE</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { href: '/projects', label: 'Operations Log',    sub: 'All builds, all phases' },
            { href: '/certs',    label: 'Credentials',       sub: 'Acquired capabilities' },
            { href: '/about',    label: 'The Operator',      sub: 'Context, not biography' },
            { href: '/contact',  label: 'Signal',            sub: 'How to reach me' },
          ].map(({ href, label, sub }) => (
            <Link key={href} href={href} className="group">
              <div className="p-4 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]
                              transition-all duration-200">
                <p className="text-sm font-mono font-medium text-neutral-300 group-hover:text-white transition-colors mb-1">
                  {label}
                </p>
                <p className="text-[10px] font-mono text-neutral-600">{sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
