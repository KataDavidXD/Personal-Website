'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';
import type { Project } from 'contentlayer/generated';
import { cn } from '@/lib/utils';

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section className="border-t border-border/40 bg-surface-secondary/30 py-24">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between"
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Featured Projects
            </h2>
            <p className="mt-2 text-foreground/70">
              Open source work and experiments
            </p>
          </div>
          <Link
            href="/projects"
            className="group hidden items-center text-sm font-medium text-accent sm:flex"
          >
            View all projects
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
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
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-2 text-foreground/60 transition-colors hover:bg-surface-secondary hover:text-foreground"
                      aria-label="View demo"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <Link href={project.url}>
                <h3 className="text-2xl font-semibold transition-colors group-hover:text-accent">
                  {project.title}
                </h3>
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
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center text-sm font-medium text-accent"
          >
            View all projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}






