import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import { allBlogPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on AI, game development, and the philosophy of technology.',
};

export default function BlogPage() {
  const posts = allBlogPosts
    .filter((post) => post.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <div className="container-narrow py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
        <p className="mt-4 text-lg text-foreground/70">
          Thoughts on AI, game development, and the philosophy of technology.
        </p>
      </div>

      {/* Filters - to be implemented */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button className="rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
          All
        </button>
        <button className="rounded-full bg-surface-secondary px-4 py-1.5 text-sm font-medium text-foreground/70 hover:bg-surface-secondary/80">
          Agent Infra
        </button>
        <button className="rounded-full bg-surface-secondary px-4 py-1.5 text-sm font-medium text-foreground/70 hover:bg-surface-secondary/80">
          Game Engine
        </button>
        <button className="rounded-full bg-surface-secondary px-4 py-1.5 text-sm font-medium text-foreground/70 hover:bg-surface-secondary/80">
          Thinking
        </button>
      </div>

      {/* Posts List */}
      <div className="space-y-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article key={post.slug} className="group">
              <Link
                href={post.url}
                className="block rounded-xl border border-border/40 bg-surface p-6 transition-all hover:border-accent/40 hover:shadow-lg"
              >
                {/* Category */}
                <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                  {post.category.replace('-', ' ')}
                </span>

                {/* Title */}
                <h2 className="mt-4 text-2xl font-semibold transition-colors group-hover:text-accent">
                  {post.title}
                </h2>

                {/* Description */}
                <p className="mt-2 text-foreground/70">{post.description}</p>

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
                    {post.tags.map((tag) => (
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
            </article>
          ))
        ) : (
          <p className="text-center text-foreground/50 py-12">
            No posts found. Check back later!
          </p>
        )}
      </div>
    </div>
  );
}






