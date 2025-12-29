import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allBlogPosts, allProjects } from 'contentlayer/generated';
import { categories, pillars } from '@/lib/constants';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { compareDesc } from 'date-fns';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const category = categories[resolvedParams.category as keyof typeof categories];

  if (!category) {
    return {};
  }

  return {
    title: category.name,
    description: category.description,
  };
}

export async function generateStaticParams() {
  return Object.keys(categories).map((category) => ({
    category,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const categoryId = resolvedParams.category;
  const category = categories[categoryId as keyof typeof categories];
  const pillar = pillars.find((p) => p.id === categoryId);

  if (!category || !pillar) {
    notFound();
  }

  const posts = allBlogPosts
    .filter((post) => post.published && post.category === categoryId)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  const projects = allProjects
    .filter((project) => project.stack?.some(s => s.toLowerCase().includes(categoryId.toLowerCase())) || 
                       // fallback for projects that might not have the category field but relate by description
                       project.description.toLowerCase().includes(categoryId.toLowerCase()));

  return (
    <div className="container-wide py-16">
      {/* Hero Header */}
      <div className="mb-16">
        <div className={`inline-flex rounded-2xl bg-gradient-to-br ${pillar.color} p-4 mb-6 text-4xl`}>
          {pillar.icon}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {category.name}
        </h1>
        <p className="mt-4 text-xl text-foreground/70 max-w-2xl">
          {category.description}
        </p>
      </div>

      <div className="grid gap-16 lg:grid-cols-[1fr_350px]">
        {/* Blog Posts Section */}
        <section>
          <div className="flex items-center justify-between mb-8 border-b border-border/10 pb-4">
            <h2 className="text-2xl font-bold">Related Articles</h2>
            <Link href="/blog" className="text-sm font-medium text-accent flex items-center gap-1 hover:underline">
              All posts <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="space-y-8">
            {posts.length > 0 ? (
              posts.map((post) => (
                <article key={post.slug} className="group">
                  <Link
                    href={post.url}
                    className="block rounded-xl border border-border/40 bg-surface p-6 transition-all hover:border-accent/40 hover:shadow-lg"
                  >
                    <h3 className="text-xl font-semibold transition-colors group-hover:text-accent">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-foreground/70 line-clamp-2">{post.description}</p>
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
              ))
            ) : (
              <p className="text-foreground/50 py-8">No articles found in this category.</p>
            )}
          </div>
        </section>

        {/* Projects & sidebar section */}
        <aside className="space-y-12">
          <section>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              Featured Projects
            </h2>
            <div className="space-y-4">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <Link
                    key={project.slug}
                    href={project.url}
                    className="block rounded-xl border border-border/40 bg-surface p-4 transition-all hover:border-accent/40 hover:shadow-md"
                  >
                    <h3 className="font-semibold group-hover:text-accent">{project.title}</h3>
                    <p className="text-sm text-foreground/60 mt-1 line-clamp-2">{project.description}</p>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-foreground/50">No featured projects for this category yet.</p>
              )}
            </div>
            {projects.length > 0 && (
              <Link href="/projects" className="mt-4 text-sm font-medium text-accent flex items-center gap-1 hover:underline">
                View all projects <ArrowRight size={14} />
              </Link>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}

