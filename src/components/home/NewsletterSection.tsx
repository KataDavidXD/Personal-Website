'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
    <section className="py-24">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-accent/5 via-surface to-purple-500/5 p-8 sm:p-12"
        >
          {/* Background decoration */}
          <div className="absolute right-0 top-0 -z-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 -z-10 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Stay Updated
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-foreground/70">
              Get notified when I publish new articles, release projects, or share thoughts 
              on AI, game development, and technology.
            </p>

            <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 rounded-lg border border-border bg-surface px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  disabled={status === 'loading' || status === 'success'}
                />
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 font-medium text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : status === 'success' ? (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Subscribe
                    </>
                  )}
                </button>
              </div>
            </form>

            <p className="mt-4 text-sm text-foreground/50">
              No spam, unsubscribe anytime. Usually 1-2 emails per month.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}






