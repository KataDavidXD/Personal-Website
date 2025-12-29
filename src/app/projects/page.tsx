import { Metadata } from 'next';
import Link from 'next/link';
import { allProjects } from 'contentlayer/generated';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Open source projects and experiments in AI, games, and software engineering.',
};

export default function ProjectsPage() {
  const projects = allProjects.sort((a, b) => (b.order || 0) - (a.order || 0));

  return (
    <div className="container-narrow py-24">
      {/* Header */}
      <div className="mb-16">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Projects
        </h1>
        <p className="mt-4 text-lg text-foreground/70 max-w-2xl">
          Open source projects and experiments in AI, games, and software engineering.
        </p>
      </div>

      {/* Projects List */}
      <div className="flex flex-col gap-12">
        {projects.length > 0 ? (
          projects.map((project) => (
            <article key={project.slug} className="group">
              <Link href={project.url} className="block">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-baseline justify-between">
                    <h2 className="text-lg font-medium text-foreground group-hover:underline decoration-1 underline-offset-4">
                      {project.title}
                    </h2>
                    <div className="shrink-0 flex items-center gap-3 text-sm">
                      <span className={cn(
                        "inline-block w-2 h-2 rounded-full",
                        project.status === 'active' ? "bg-green-500/80" : 
                        project.status === 'completed' ? "bg-blue-500/80" :
                        "bg-orange-500/80"
                      )} />
                      <span className="text-foreground/40 font-mono hidden sm:inline-block">
                        {project.stack?.slice(0, 3).join(', ')}
                      </span>
                    </div>
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
          ))
        ) : (
          <p className="text-foreground/50">No projects found.</p>
        )}
      </div>
    </div>
  );
}
