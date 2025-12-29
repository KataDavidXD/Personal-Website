'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { siteConfig } from '@/lib/constants';

export function Hero() {
  return (
    <section className="relative pt-24 pb-16">
      <div className="container-narrow">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_200px] md:gap-16 items-start">
          
          {/* Left Column: Narrative */}
          <div className="flex flex-col space-y-8">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Yang Li
              </h1>
              <p className="text-xl font-medium text-foreground/60">
                Agent Infrastructure Architect
              </p>
            </div>

            <div className="space-y-4 text-base leading-relaxed text-foreground/80">
              <p>
                Building the <strong className="text-foreground">reliability layer</strong> for multi-agent systems. 
                My work bridges the gap between raw LLM capabilities and production-grade infrastructure.
              </p>
              
              <p className="text-foreground/60">
                I focus on making LLM workflows <span className="text-foreground">auditable</span>, <span className="text-foreground">replayable</span>, and <span className="text-foreground">production-ready</span>—through 
                state versioning, systematic testing, and agent-aware simulation environments.
              </p>
            </div>

            <div className="flex flex-col gap-2 py-2 text-sm text-foreground/70 border-l-2 border-foreground/10 pl-4">
              <p>
                Incoming PhD @ <strong className="font-medium text-foreground">HKU AIBE Lab</strong>
              </p>
              <p>
                Working with <a href="https://camo.hku.hk/research-labs/research-labs-lab-for-ai-agents-in-business-and-economics/" className="font-medium text-foreground hover:underline decoration-1 underline-offset-4">Prof. Ye Luo</a>
              </p>
            </div>

            <div className="pt-4 flex items-center gap-6">
              <Link href="/blog" className="group flex items-center gap-1 text-sm font-medium text-foreground hover:text-accent transition-colors">
                <span>Read my notes</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link href="/projects" className="group flex items-center gap-1 text-sm font-medium text-foreground hover:text-accent transition-colors">
                <span>View projects</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              
              <div className="h-4 w-[1px] bg-border/60" />
              
              <div className="flex items-center gap-3">
                <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="text-foreground/40 hover:text-foreground transition-colors" aria-label="GitHub">
                  <Github size={18} />
                </a>
                <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-foreground/40 hover:text-foreground transition-colors" aria-label="LinkedIn">
                  <Linkedin size={18} />
                </a>
                <a href={`mailto:${siteConfig.author.email}`} className="text-foreground/40 hover:text-foreground transition-colors" aria-label="Email">
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Avatar */}
          <div className="flex flex-col gap-6 md:items-end">
            <div className="relative h-36 w-36 overflow-hidden rounded-2xl border border-border/50 shadow-sm md:h-44 md:w-44">
              <Image
                src="/selfies/main.jpg"
                alt="Yang Li"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 144px, 176px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
