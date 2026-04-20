'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import { type Project } from '@/lib/content/projects';
import { StatusBadge } from '@/components/ui/status-badge';
import { ScreenshotGallery } from '@/components/projects/ScreenshotGallery';

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
      className="glass relative group overflow-hidden transition-all duration-300 hover:-translate-y-1"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      <div className="p-6 md:p-8">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <p className="label-mono mb-2">{project.category} // {project.phase}</p>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-2xl font-bold text-primary font-mono-custom tracking-tight">
                {project.codename}
              </span>
              <StatusBadge status={project.status} />
            </div>
            <div className="mb-4">
              <p className="mt-1.5 text-sm text-secondary-custom font-mono">{project.date}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {/* Title + tagline */}
          <h2 className="text-lg font-semibold text-primary mb-2">{project.title}</h2>
          <p className="text-sm text-secondary-custom mb-4 leading-relaxed">{project.tagline}</p>

          {/* Screenshot gallery strip */}
          {project.screenshots && project.screenshots.length > 0 && (
            <ScreenshotGallery
              screenshots={project.screenshots}
              projectName={project.codename}
            />
          )}

          {/* P/S/I grid */}
          {(project.problem || project.solution || project.impact) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {project.problem && (
                <div className="rounded-xl border border-border-subtle bg-surface/30 p-4">
                  <p className="label-mono mb-1 text-emerald">The Problem</p>
                  <p className="text-xs text-muted-custom leading-relaxed">{project.problem}</p>
                </div>
              )}
              {project.solution && (
                <div className="rounded-xl border border-border-subtle bg-surface/30 p-4">
                  <p className="label-mono mb-1 text-blue-500">The Solution</p>
                  <p className="text-xs text-muted-custom leading-relaxed">{project.solution}</p>
                </div>
              )}
              {project.impact && (
                <div className="rounded-xl border border-emerald-500/10 bg-emerald-950/20 p-4">
                  <p className="label-mono mb-1 text-emerald">Result</p>
                  <p className="text-xs text-emerald-300/80 leading-relaxed">{project.impact}</p>
                </div>
              )}
            </div>
          )}

          {/* Stack + links */}
          <div className="flex items-end justify-between gap-4 flex-wrap mt-auto">
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded-md border border-border-subtle bg-surface/30 text-[10px] font-mono text-secondary-custom"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border-subtle">
              {project.links?.github && (
                <Link
                  href={project.links.github}
                  target="_blank"
                  className="flex items-center gap-1.5 text-xs font-mono text-muted-custom hover:text-emerald transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>source</span>
                </Link>
              )}
              {project.links?.live && (
                <Link
                  href={project.links.live}
                  target="_blank"
                  className="flex items-center gap-1.5 text-xs font-mono text-muted-custom hover:text-emerald transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>live</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
