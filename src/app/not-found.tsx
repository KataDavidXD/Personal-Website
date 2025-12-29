'use client';

import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-8">
        <h1 className="text-9xl font-black text-accent/10">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
            Lost in latent space?
          </p>
        </div>
      </div>
      
      <p className="mb-12 max-w-md text-foreground/50">
        The page you're looking for doesn't exist or has been moved to another dimension.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
        >
          <Home className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center justify-center rounded-full border border-border/40 bg-background px-8 py-3 text-sm font-medium transition-colors hover:bg-accent/5"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </button>
      </div>
    </div>
  );
}
