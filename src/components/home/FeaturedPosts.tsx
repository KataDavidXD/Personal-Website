'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { BlogPost } from 'contentlayer/generated';

interface FeaturedPostsProps {
  posts: BlogPost[];
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  return (
    <section className="py-24">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between"
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Latest Writing
            </h2>
            <p className="mt-2 text-foreground/70">
              Recent thoughts and explorations
            </p>
          </div>
          <Link
            href="/blog"
            className="group hidden items-center text-sm font-medium text-accent sm:flex"
          >
            View all posts
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {posts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link
                href={post.url}
                className="block h-full rounded-2xl border border-border/40 bg-surface p-6 transition-all hover:border-accent/40 hover:shadow-lg"
              >
                {/* Category Badge */}
                <div className="mb-4">
                  <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                    {post.category.replace('-', ' ')}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold transition-colors group-hover:text-accent">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="mt-2 line-clamp-2 text-foreground/70">
                  {post.description}
                </p>

                {/* Meta */}
                <div className="mt-4 flex items-center gap-4 text-sm text-foreground/50">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {post.readingTime?.text || '3 min read'}
                  </span>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-surface-secondary px-2 py-1 text-xs text-foreground/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-accent"
          >
            View all posts
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}






