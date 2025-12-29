import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allProjects } from 'contentlayer/generated';
import { Mdx } from '@/components/mdx/MdxContent';
import { Github, ExternalLink, FileText, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getProjectFromParams(params: { slug: string }) {
  const project = allProjects.find((p) => p.slug === params.slug);

  if (!project) {
    return null;
  }

  return project;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await getProjectFromParams(resolvedParams);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return allProjects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = await getProjectFromParams(resolvedParams);

  if (!project) {
    notFound();
  }

  return (
    <article className="container-narrow py-16">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1 text-sm text-foreground/50 transition-colors hover:text-accent mb-8"
      >
        <ChevronLeft size={16} />
        Back to projects
      </Link>

      <div className="space-y-4 mb-12">
        <div className="flex items-center justify-between">
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
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {project.title}
        </h1>
        
        <p className="text-xl text-foreground/70">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-surface-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-secondary/80"
            >
              <Github size={18} />
              GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
            >
              <ExternalLink size={18} />
              Live Demo
            </a>
          )}
          {project.paper && (
            <a
              href={project.paper}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-surface-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-secondary/80"
            >
              <FileText size={18} />
              Read Paper
            </a>
          )}
        </div>
      </div>

      {project.image && (
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-border/40 mb-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      <div className="grid gap-12 md:grid-cols-[1fr_250px]">
        <div>
          <Mdx code={project.body.code} />
        </div>
        
        <aside className="space-y-8">
          {project.stack && project.stack.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/40 mb-4">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg bg-surface-secondary px-3 py-1 text-sm font-medium text-foreground/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/40 mb-4">
              Project Timeline
            </h3>
            <div className="text-sm text-foreground/70">
              <div className="flex justify-between py-2 border-b border-border/10">
                <span>Started</span>
                <span>{new Date(project.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
              </div>
              {project.endDate && (
                <div className="flex justify-between py-2 border-b border-border/10">
                  <span>Completed</span>
                  <span>{new Date(project.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}

