import { Metadata } from 'next';
import Link from 'next/link';
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
    <div className="container-narrow py-24">
      {/* Header */}
      <div className="mb-16">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Writing
        </h1>
        <p className="mt-4 text-lg text-foreground/70 max-w-2xl">
          Explorations in agent infrastructure, game engines, and the future of software.
        </p>
      </div>

      {/* Posts List */}
      <div className="flex flex-col gap-12">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={post.url} className="block">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-baseline justify-between">
                    <h2 className="text-lg font-medium text-foreground group-hover:underline decoration-1 underline-offset-4">
                      {post.title}
                    </h2>
                    <time dateTime={post.date} className="shrink-0 text-sm text-foreground/40 font-mono">
                      {formatDate(post.date)}
                    </time>
                  </div>
                  <p className="text-base leading-relaxed text-foreground/70 max-w-2xl">
                    {post.description}
                  </p>
                </div>
              </Link>
            </article>
          ))
        ) : (
          <p className="text-foreground/50">No posts found.</p>
        )}
      </div>
    </div>
  );
}
