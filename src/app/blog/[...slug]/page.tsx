import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allBlogPosts } from 'contentlayer/generated';
import { Mdx } from '@/components/mdx/MdxContent';
import { TableOfContents } from '@/components/mdx/TableOfContents';
import { Comments } from '@/components/mdx/Comments';
import { ShareButtons } from '@/components/layout/ShareButtons';
import { ReadingProgress } from '@/components/layout/ReadingProgress';
import { formatDate } from '@/lib/utils';
import { siteConfig } from '@/lib/constants';
import { Calendar, Clock, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface PostPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

async function getPostFromParams(params: { slug: string[] }) {
  const slug = params.slug.join('/');
  const post = allBlogPosts.find((post) => post.slug === slug);

  if (!post) {
    return null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostFromParams(resolvedParams);

  if (!post) {
    return {};
  }

  // Since we moved it to API to avoid catch-all conflict
  const dynamicOgUrl = `/api/og/blog/${resolvedParams.slug.join('/')}`;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: post.url,
      images: [{ url: dynamicOgUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [dynamicOgUrl],
    },
  };
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return allBlogPosts.map((post) => ({
    slug: post.slug.split('/'),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const post = await getPostFromParams(resolvedParams);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <>
      <ReadingProgress />
      <article className="container-wide py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_250px]">
          <div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm text-foreground/50 transition-colors hover:text-accent mb-8"
            >
              <ChevronLeft size={16} />
              Back to blog
            </Link>

            <div className="space-y-4 mb-12">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                    {post.category.replace('-', ' ')}
                  </span>
                </div>
                <ShareButtons url={post.url} title={post.title} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                {post.title}
              </h1>
              <p className="text-xl text-foreground/70 italic border-l-2 border-border/40 pl-4 py-1">
                {post.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-foreground/50 border-t border-border/10">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{post.readingTime?.text || '3 min read'}</span>
                </div>
              </div>
            </div>

            {post.image && (
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-border/40 mb-12">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}

            <Mdx code={post.body.code} />

            <hr className="my-16 border-border/10" />

            <div className="flex items-center justify-between mb-12">
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-surface-secondary px-3 py-1 text-sm text-foreground/60"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <ShareButtons url={post.url} title={post.title} />
            </div>

            <Comments />
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents />
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}

