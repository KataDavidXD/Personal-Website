'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { pillars } from '@/lib/constants';

export function PillarCards() {
  return (
    <section className="border-t border-border/40 bg-surface-secondary/30 py-24">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What I Write About
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-foreground/70">
            Three pillars of exploration: building intelligent systems, creating immersive 
            experiences, and reflecting on what it all means.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={pillar.href}
                className="group relative block h-full overflow-hidden rounded-2xl border border-border/40 bg-surface p-8 transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
              >
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 transition-opacity group-hover:opacity-5`}
                />

                {/* Icon */}
                <div className="mb-4 text-4xl">{pillar.icon}</div>

                {/* Content */}
                <h3 className="text-xl font-semibold">{pillar.title}</h3>
                <p className="mt-2 text-foreground/70">{pillar.description}</p>

                {/* Arrow */}
                <div className="mt-6 flex items-center text-sm font-medium text-accent">
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}






