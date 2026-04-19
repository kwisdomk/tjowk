'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import { type Project } from '@/lib/content/projects';
import { StatusBadge } from '@/components/ui/status-badge';

interface FeaturedCardProps {
  project: Project;
  index: number;
}

export function FeaturedCard({ project, index }: FeaturedCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative group overflow-hidden rounded-2xl border border-white/[0.06] bg-black/40 backdrop-blur-xl
                 hover:border-white/15 transition-all duration-300"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      <div className="p-6 md:p-8">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <p className="label-mono mb-2">{project.category.toUpperCase()} // {project.phase.toUpperCase()}</p>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-2xl font-bold text-white font-mono-custom tracking-tight">
                {project.codename}
              </span>
              <StatusBadge status={project.status} />
            </div>
            <p className="mt-1.5 text-sm text-neutral-400 font-mono">{project.date}</p>
          </div>
        </div>

        {/* Title + tagline */}
        <h2 className="text-lg font-semibold text-neutral-200 mb-2">{project.title}</h2>
        <p className="text-sm text-neutral-500 mb-6 leading-relaxed">{project.tagline}</p>

        {/* P/S/I grid */}
        {(project.problem || project.solution || project.impact) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {project.problem && (
              <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4">
                <p className="label-mono mb-2">PROBLEM</p>
                <p className="text-xs text-neutral-400 leading-relaxed">{project.problem}</p>
              </div>
            )}
            {project.solution && (
              <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4">
                <p className="label-mono mb-2">SOLUTION</p>
                <p className="text-xs text-neutral-400 leading-relaxed">{project.solution}</p>
              </div>
            )}
            {project.impact && (
              <div className="rounded-xl border border-emerald-500/10 bg-emerald-950/20 p-4">
                <p className="label-mono mb-2 text-emerald-600">RESULT</p>
                <p className="text-xs text-emerald-300/80 leading-relaxed">{project.impact}</p>
              </div>
            )}
          </div>
        )}

        {/* Stack + links */}
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md border border-white/[0.07] bg-white/[0.03] text-[10px] font-mono text-neutral-500"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {project.links?.github && (
              <Link
                href={project.links.github}
                target="_blank"
                className="flex items-center gap-1.5 text-xs font-mono text-neutral-600 hover:text-emerald-400 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </Link>
            )}
            {project.links?.live && (
              <Link
                href={project.links.live}
                target="_blank"
                className="flex items-center gap-1.5 text-xs font-mono text-neutral-600 hover:text-emerald-400 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
