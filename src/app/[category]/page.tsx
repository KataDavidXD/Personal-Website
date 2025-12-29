import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allBlogPosts, allProjects } from 'contentlayer/generated';
import { categories } from '@/lib/constants';
import Link from 'next/link';
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

  if (!category) {
    notFound();
  }

  const posts = allBlogPosts
    .filter((post) => post.published && post.category === categoryId)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  const projects = allProjects
    .filter((project) => project.stack?.some(s => s.toLowerCase().includes(categoryId.toLowerCase())) || 
                       project.description.toLowerCase().includes(categoryId.toLowerCase()));

  return (
    <div className="container-narrow py-24">
      {/* Header */}
      <div className="mb-16">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {category.name}
        </h1>
        <p className="mt-4 text-lg text-foreground/70 max-w-2xl">
          {category.description}
        </p>
      </div>

      {/* Posts List */}
      {posts.length > 0 && (
        <section className="mb-16">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground/40">
              Articles
            </h2>
            <Link href="/blog" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
              All posts
            </Link>
          </div>
          
          <div className="flex flex-col gap-12">
            {posts.map((post) => (
              <article key={post.slug} className="group">
                <Link href={post.url} className="block">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-lg font-medium text-foreground group-hover:underline decoration-1 underline-offset-4">
                        {post.title}
                      </h3>
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
            ))}
          </div>
        </section>
      )}

      {/* Projects List */}
      {projects.length > 0 && (
        <section>
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground/40">
              Related Projects
            </h2>
            <Link href="/projects" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
              All projects
            </Link>
          </div>
          
          <div className="flex flex-col gap-12">
            {projects.map((project) => (
              <article key={project.slug} className="group">
                <Link href={project.url} className="block">
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-lg font-medium text-foreground group-hover:underline decoration-1 underline-offset-4">
                      {project.title}
                    </h3>
                    <p className="text-base leading-relaxed text-foreground/70 max-w-2xl">
                      {project.description}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {posts.length === 0 && projects.length === 0 && (
        <p className="text-foreground/50">No content found in this category yet.</p>
      )}
    </div>
  );
}
