import { Metadata } from 'next';
import { allBlogPosts } from 'contentlayer/generated';
import Link from 'next/link';
import { Calendar, Clock, ChevronLeft, Tag } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { compareDesc } from 'date-fns';

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tag = decodeURIComponent(resolvedParams.tag);

  return {
    title: `Posts tagged with #${tag}`,
    description: `Browse all articles tagged with ${tag}.`,
  };
}

export async function generateStaticParams() {
  const tags = new Set<string>();
  allBlogPosts.forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

export default async function TagPage({ params }: TagPageProps) {
  const resolvedParams = await params;
  const tag = decodeURIComponent(resolvedParams.tag);
  
  const posts = allBlogPosts
    .filter((post) => post.published && post.tags?.includes(tag))
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <div className="container-narrow py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-foreground/50 transition-colors hover:text-accent mb-8"
      >
        <ChevronLeft size={16} />
        Back to blog
      </Link>

      <div className="mb-12 flex items-center gap-4">
        <div className="rounded-xl bg-accent/10 p-3 text-accent">
          <Tag size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Posts tagged with <span className="text-accent">#{tag}</span>
          </h1>
          <p className="mt-2 text-foreground/70">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'} found
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="group">
            <Link
              href={post.url}
              className="block rounded-xl border border-border/40 bg-surface p-6 transition-all hover:border-accent/40 hover:shadow-lg"
            >
              <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                {post.category.replace('-', ' ')}
              </span>
              <h2 className="mt-4 text-2xl font-semibold transition-colors group-hover:text-accent">
                {post.title}
              </h2>
              <p className="mt-2 text-foreground/70">{post.description}</p>
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
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

