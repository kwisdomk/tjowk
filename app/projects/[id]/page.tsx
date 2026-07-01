import { notFound } from 'next/navigation';
import { getProjects, getProjectById } from '@/lib/content/loaders';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { StatusBadge } from '@/components/ui/status-badge';
import Image from 'next/image';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getProjects().map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await props.params;
  const project = getProjectById(params.id);
  if (!project) return { title: 'Project Not Found' };
  
  return {
    title: `${project.codename} | Wisdom's Projects`,
    description: project.tagline,
  };
}

export default async function ProjectPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const project = getProjectById(params.id);
  
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

        {/* Platform Status Badges */}
        {project.platforms && project.platforms.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-5">
            {project.platforms.map((platform) => (
              <span
                key={platform.name}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono font-medium tracking-wider uppercase ${
                  platform.status === 'stable'
                    ? 'border-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
                    : platform.status === 'beta'
                    ? 'border-amber-500/20 text-amber-600 dark:text-amber-400 bg-amber-500/10'
                    : 'border-border-subtle text-muted-custom bg-surface-2/50'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  platform.status === 'stable'
                    ? 'bg-emerald-500 dark:bg-emerald-400'
                    : platform.status === 'beta'
                    ? 'bg-amber-500 dark:bg-amber-400'
                    : 'bg-border-subtle'
                }`} />
                {platform.name} {platform.status}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Project Visuals */}
      {project.visuals && project.visuals.length > 0 && (
        <figure className="mb-12">
          <div className={`w-full rounded-xl border border-border-subtle bg-[#09090b] overflow-hidden relative ${
            project.visuals[0].type === 'screenshot'
              ? 'max-w-2xl mx-auto'
              : 'aspect-video md:aspect-[21/9] flex items-center justify-center p-8'
          }`}>
            {project.visuals[0].type === 'screenshot' ? (
              <Image
                src={project.visuals[0].src}
                alt={project.visuals[0].alt || `${project.codename} screenshot`}
                width={800}
                height={800}
                className="w-full h-auto object-contain"
              />
            ) : (
              <>
                <Image
                  src={project.visuals[0].src}
                  alt={project.visuals[0].alt || `${project.codename} architecture diagram`}
                  fill
                  className="object-contain"
                />
                <span className="absolute bottom-3 right-3 text-[9px] font-mono text-muted-custom/50 uppercase tracking-wider">
                  {project.visuals[0].type}
                </span>
              </>
            )}
          </div>
          {project.visuals[0].alt && (
            <figcaption className="mt-3 text-[11px] font-mono text-muted-custom text-center">
              {project.visuals[0].alt}
            </figcaption>
          )}
        </figure>
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
              <p className="text-secondary-custom leading-relaxed text-sm whitespace-pre-line">
                {project.solution}
              </p>
            </section>
          )}

          {project.workflow && (
            <section>
              <h3 className="text-lg font-mono-custom text-primary mb-4 flex items-center gap-2 before:content-['//'] before:text-emerald">
                AI-Assisted Development Workflow
              </h3>
              <p className="text-secondary-custom leading-relaxed text-sm whitespace-pre-line">
                {project.workflow}
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

          {(project.links?.github || project.links?.live || project.links?.windowsScript || project.links?.linuxScript) && (
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
                    Repository
                  </Link>
                )}
                {project.links.windowsScript && (
                  <Link
                    href={project.links.windowsScript}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-mono text-secondary-custom hover:text-emerald transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Windows script
                  </Link>
                )}
                {project.links.linuxScript && (
                  <Link
                    href={project.links.linuxScript}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-mono text-secondary-custom hover:text-emerald transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Linux script
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
