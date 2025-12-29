import { Metadata } from 'next';
import Link from 'next/link';
import { Github } from 'lucide-react';
import { allProjects } from 'contentlayer/generated';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Open source projects and experiments in AI, games, and software engineering.',
};

export default function ProjectsPage() {
  const projects = allProjects.sort((a, b) => (b.order || 0) - (a.order || 0));

  return (
    <div className="container-wide py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
        <p className="mt-4 text-lg text-foreground/70">
          Open source projects and experiments in AI, games, and software engineering.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {projects.length > 0 ? (
          projects.map((project) => (
            <article
              key={project.slug}
              className="group relative overflow-hidden rounded-2xl border border-border/40 bg-surface p-8 transition-all hover:border-accent/40 hover:shadow-lg"
            >
              {/* Status Badge */}
              <div className="mb-4 flex items-center justify-between">
                <span className={cn(
                  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
                  project.status === 'active' ? "bg-green-500/10 text-green-500" : 
                  project.status === 'completed' ? "bg-blue-500/10 text-blue-500" :
                  "bg-orange-500/10 text-orange-500"
                )}>
                  <span className={cn(
                    "mr-1.5 h-1.5 w-1.5 rounded-full",
                    project.status === 'active' ? "bg-green-500" : 
                    project.status === 'completed' ? "bg-blue-500" :
                    "bg-orange-500"
                  )} />
                  {project.status}
                </span>
                <div className="flex items-center gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-2 text-foreground/60 transition-colors hover:bg-surface-secondary hover:text-foreground"
                      aria-label="View on GitHub"
                    >
                      <Github size={20} />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <Link href={project.url}>
                <h2 className="text-2xl font-semibold transition-colors group-hover:text-accent">
                  {project.title}
                </h2>
                <p className="mt-2 text-foreground/70">{project.description}</p>
              </Link>

              {/* Stack */}
              {project.stack && project.stack.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg bg-surface-secondary px-3 py-1.5 text-sm font-medium text-foreground/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))
        ) : (
          <p className="text-center text-foreground/50 py-12 col-span-2">
            No projects found.
          </p>
        )}
      </div>
    </div>
  );
}

// Helper to use cn in this file if not already imported
import { cn } from '@/lib/utils';






