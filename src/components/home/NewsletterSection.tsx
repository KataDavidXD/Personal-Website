'use client';

import { useState } from 'react';
import { Send, Check, Loader2 } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Simulate API call - replace with actual newsletter API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setStatus('success');
    setEmail('');
    
    // Reset after 3 seconds
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section className="py-24 border-t border-border/40">
      <div className="container-narrow">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between md:items-start">
          <div className="max-w-md">
            <h2 className="text-lg font-bold text-foreground">
              Stay Updated
            </h2>
            <p className="mt-2 text-base leading-relaxed text-foreground/60">
              Get notified when I publish new articles or release projects. 
              No spam, usually 1-2 emails per month.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground focus:outline-none"
                disabled={status === 'loading' || status === 'success'}
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="shrink-0 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : status === 'success' ? (
                  <Check size={16} />
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
