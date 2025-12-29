'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { BlogPost } from 'contentlayer/generated';

interface FeaturedPostsProps {
  posts: BlogPost[];
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  return (
    <section className="py-16">
      <div className="container-narrow">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground/40">
            Latest Writing
          </h2>
          <Link href="/blog" className="text-sm font-medium text-foreground/60 hover:text-accent transition-colors">
            All posts
          </Link>
        </div>

        <div className="flex flex-col gap-10">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={post.url} className="block">
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <h3 className="text-lg font-medium text-foreground transition-colors group-hover:text-accent">
                    {post.title}
                  </h3>
                  <span className="shrink-0 text-sm text-foreground/40 tabular-nums">
                    {formatDate(post.date)}
                  </span>
                </div>
                <p className="mt-2 text-base leading-relaxed text-foreground/60 max-w-2xl">
                  {post.description}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
