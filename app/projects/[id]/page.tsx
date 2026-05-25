import { notFound } from 'next/navigation';
import { projects } from '@/lib/content/projects';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { StatusBadge } from '@/components/ui/status-badge';
import Image from 'next/image';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await props.params;
  const project = projects.find((p) => p.id === params.id);
  if (!project) return { title: 'Project Not Found' };
  
  return {
    title: `${project.codename} · Operations Log`,
    description: project.tagline,
  };
}

export default async function ProjectPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const project = projects.find((p) => p.id === params.id);
  
  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <Link 
        href="/projects"
        className="inline-flex items-center gap-2 text-xs font-mono text-muted-custom hover:text-emerald transition-colors mb-12"
      >
        <ArrowLeft className="w-3 h-3" />
        Back to Operations Log
      </Link>

      <header className="mb-12">
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md bg-surface-2 border border-border-subtle text-secondary-custom text-xs font-mono uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-xs font-mono text-muted-custom uppercase tracking-wider">
              Phase: {project.phase}
            </span>
          </div>
          <StatusBadge status={project.status} />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary font-mono-custom mb-4">
          {project.codename}
        </h1>
        <h2 className="text-xl md:text-2xl text-emerald font-mono-custom mb-6">
          {project.title}
        </h2>
        <p className="text-base text-secondary-custom leading-relaxed max-w-2xl">
          {project.tagline}
        </p>
      </header>

      {/* Architecture Diagram */}
      {project.visuals && project.visuals.length > 0 && (
        <div className="w-full aspect-video md:aspect-[21/9] rounded-xl border border-border-subtle bg-[#09090b] overflow-hidden mb-12 relative flex items-center justify-center p-8">
          <Image
            src={project.visuals[0].src}
            alt={project.visuals[0].alt || `${project.codename} architecture diagram`}
            fill
            className="object-contain"
          />
          <span className="absolute bottom-3 right-3 text-[9px] font-mono text-muted-custom/50 uppercase tracking-wider">
            {project.visuals[0].type}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div className="md:col-span-2 space-y-10">
          {project.problem && (
            <section>
              <h3 className="text-lg font-mono-custom text-primary mb-4 flex items-center gap-2 before:content-['//'] before:text-emerald">
                The Problem
              </h3>
              <p className="text-secondary-custom leading-relaxed text-sm">
                {project.problem}
              </p>
            </section>
          )}

          {project.solution && (
            <section>
              <h3 className="text-lg font-mono-custom text-primary mb-4 flex items-center gap-2 before:content-['//'] before:text-emerald">
                The Solution
              </h3>
              <p className="text-secondary-custom leading-relaxed text-sm">
                {project.solution}
              </p>
            </section>
          )}

          {project.impact && (
            <section className="p-6 rounded-xl border border-emerald-500/20 bg-emerald-950/10">
              <h3 className="text-lg font-mono-custom text-emerald mb-4">
                Impact & Results
              </h3>
              <p className="text-emerald-300/90 leading-relaxed text-sm">
                {project.impact}
              </p>
            </section>
          )}
        </div>

        <div className="space-y-8">
          <section>
            <p className="label-mono mb-4 text-primary">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-md border border-border-subtle bg-surface-2 text-xs font-mono text-secondary-custom"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section>
            <p className="label-mono mb-4 text-primary">Metadata</p>
            <ul className="space-y-3 text-sm font-mono text-muted-custom">
              <li className="flex justify-between">
                <span>Date:</span>
                <span className="text-secondary-custom">{project.date}</span>
              </li>
              <li className="flex justify-between">
                <span>Status:</span>
                <span className="text-secondary-custom">{project.status}</span>
              </li>
              <li className="flex justify-between">
                <span>Phase:</span>
                <span className="text-secondary-custom">{project.phase}</span>
              </li>
            </ul>
          </section>

          {(project.links?.github || project.links?.live) && (
            <section className="pt-6 border-t border-border-subtle">
              <p className="label-mono mb-4 text-primary">External Links</p>
              <div className="flex flex-col gap-3">
                {project.links.github && (
                  <Link
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-mono text-secondary-custom hover:text-emerald transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </Link>
                )}
                {project.links.live && (
                  <Link
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-mono text-secondary-custom hover:text-emerald transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Deployment
                  </Link>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
