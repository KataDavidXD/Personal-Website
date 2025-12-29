'use client';

import { motion } from 'framer-motion';
import { pillars } from '@/lib/constants';
import { ExternalLink } from 'lucide-react';

export function PillarCards() {
  return (
    <section className="bg-surface-secondary/30 py-24">
      <div className="container-wide">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Core Infrastructure Focus
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Engineering the reliability layer between raw LLMs and production multi-agent systems.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="group relative block h-full overflow-hidden rounded-2xl border border-border/60 bg-surface p-8 transition-all hover:border-accent/40 hover:shadow-xl">
                <div className="mb-4 text-4xl">{pillar.icon}</div>
                <h3 className="text-xl font-bold">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                  {pillar.description}
                </p>
                <div className="mt-6">
                  <a 
                    href={pillar.href} 
                    className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-accent hover:opacity-80"
                  >
                    Deep Dive <ExternalLink size={12} className="ml-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
