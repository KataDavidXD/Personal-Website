'use client';

import { pillars } from '@/lib/constants';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export function PillarCards() {
  return (
    <section className="py-16 border-t border-border/40">
      <div className="container-narrow">
        <h2 className="mb-10 text-sm font-bold uppercase tracking-wider text-foreground/40">
          Core Focus
        </h2>

        <div className="flex flex-col gap-12">
          {pillars.map((pillar) => (
            <div key={pillar.id} className="group">
              <Link href={pillar.href} className="block">
                <div className="flex items-baseline justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium text-foreground group-hover:underline decoration-1 underline-offset-4">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-foreground/50">
                      {pillar.summary}
                    </p>
                  </div>
                  <ArrowUpRight size={16} className="shrink-0 text-foreground/20 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground/60" />
                </div>
                <p className="mt-3 text-base leading-relaxed text-foreground/70 max-w-2xl">
                  {pillar.description}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
