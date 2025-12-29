'use client';

import Link from 'next/link';
import type { Project } from 'contentlayer/generated';

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section className="py-16">
      <div className="container-narrow">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground/40">
            Selected Projects
          </h2>
          <Link href="/projects" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
            All projects
          </Link>
        </div>

        <div className="flex flex-col gap-12">
          {projects.map((project) => (
            <article key={project.slug} className="group">
              <Link href={project.url} className="block">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-medium text-foreground group-hover:underline decoration-1 underline-offset-4">
                      {project.title}
                    </h3>
                    <span className="text-sm text-foreground/40 font-mono hidden sm:block">
                      {project.stack?.slice(0, 3).join(', ')}
                    </span>
                  </div>
                  
                  {/* Mobile Stack Display */}
                  <div className="text-xs text-foreground/40 font-mono sm:hidden">
                    {project.stack?.slice(0, 3).join(', ')}
                  </div>

                  <p className="text-base leading-relaxed text-foreground/70 max-w-2xl">
                    {project.description}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
