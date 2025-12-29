'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/lib/constants';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/40">
      <div className="container-wide py-20 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Text Content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6 inline-flex items-center rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent">
                <span className="mr-2">🚀</span>
                Incoming PhD @ HKU AIBE Lab
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Yang Li — Agent <br />
                <span className="gradient-text">Infrastructure Architect</span>
              </h1>

              <div className="mt-8 space-y-4 text-lg text-foreground/70 sm:text-xl">
                <p>
                  Technical Lead / DRI for <strong>Agent Reliability & Infrastructure</strong>. 
                  Building the systems that make LLM workflows auditable, replayable, and production-ready.
                </p>
                
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>Working with <strong>Prof. Ye Luo</strong> at HKU AIBE Lab</span>
                    <a href="https://camo.hku.hk/research-labs/research-labs-lab-for-ai-agents-in-business-and-economics/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline inline-flex items-center">
                      <ExternalLink size={14} className="ml-1" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/blog"
                  className="group inline-flex items-center rounded-lg bg-accent px-6 py-3 font-medium text-accent-foreground transition-all hover:bg-accent/90"
                >
                  Reliability Insights
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <div className="flex items-center gap-2">
                  <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-border p-3 hover:bg-surface-secondary transition-colors" aria-label="GitHub">
                    <Github size={20} />
                  </a>
                  <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-border p-3 hover:bg-surface-secondary transition-colors" aria-label="LinkedIn">
                    <Linkedin size={20} />
                  </a>
                  <a href={`mailto:${siteConfig.author.email}`} className="rounded-lg border border-border p-3 hover:bg-surface-secondary transition-colors" aria-label="Email">
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Profile Image (Silicon Valley Headshot Style) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative h-[320px] w-[320px] sm:h-[400px] sm:w-[400px]">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/20 to-purple-500/20 blur-2xl" />
              <div className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-border/50 bg-surface shadow-2xl">
                <Image
                  src="/selfies/main.jpg"
                  alt="Yang Li"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
