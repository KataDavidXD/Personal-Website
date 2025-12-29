import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allPapers } from 'contentlayer/generated';
import { Mdx } from '@/components/mdx/MdxContent';
import { FileText, Code, Presentation, ExternalLink, ChevronLeft, Quote } from 'lucide-react';
import Link from 'next/link';

interface PaperPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getPaperFromParams(params: { slug: string }) {
  const paper = allPapers.find((p) => p.slug === params.slug);

  if (!paper) {
    return null;
  }

  return paper;
}

export async function generateMetadata({
  params,
}: PaperPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const paper = await getPaperFromParams(resolvedParams);

  if (!paper) {
    return {};
  }

  return {
    title: paper.title,
    description: paper.abstract,
  };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return allPapers.map((paper) => ({
    slug: paper.slug,
  }));
}

export default async function PaperPage({ params }: PaperPageProps) {
  const resolvedParams = await params;
  const paper = await getPaperFromParams(resolvedParams);

  if (!paper) {
    notFound();
  }

  return (
    <article className="container-narrow py-16">
      <Link
        href="/papers"
        className="inline-flex items-center gap-1 text-sm text-foreground/50 transition-colors hover:text-accent mb-8"
      >
        <ChevronLeft size={16} />
        Back to papers
      </Link>

      <div className="space-y-4 mb-12">
        <div className="flex items-center gap-2">
          <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            {paper.year}
          </span>
          <span className="text-sm text-foreground/40">•</span>
          <span className="text-sm font-medium text-foreground/60">{paper.venue}</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          {paper.title}
        </h1>
        
        <p className="text-lg text-foreground/80 font-medium">
          {paper.authors.join(', ')}
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          {paper.pdf && (
            <a
              href={paper.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
            >
              <FileText size={18} />
              Download PDF
            </a>
          )}
          {paper.arxiv && (
            <a
              href={paper.arxiv}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-surface-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-secondary/80"
            >
              <ExternalLink size={18} />
              arXiv
            </a>
          )}
          {paper.code && (
            <a
              href={paper.code}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-surface-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-secondary/80"
            >
              <Code size={18} />
              Code
            </a>
          )}
          {paper.slides && (
            <a
              href={paper.slides}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-surface-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-secondary/80"
            >
              <Presentation size={18} />
              Slides
            </a>
          )}
        </div>
      </div>

      <div className="mb-12 rounded-2xl border border-border/40 bg-surface-secondary/30 p-8">
        <h2 className="text-sm font-bold uppercase tracking-wider text-foreground/40 mb-4 flex items-center gap-2">
          <FileText size={16} />
          Abstract
        </h2>
        <p className="text-foreground/80 leading-relaxed italic">
          {paper.abstract}
        </p>
      </div>

      <Mdx code={paper.body.code} />

      {paper.bibtex && (
        <div className="mt-16">
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground/40 mb-4 flex items-center gap-2">
            <Quote size={16} />
            Cite this work
          </h2>
          <div className="relative">
            <pre className="overflow-x-auto rounded-lg border border-border/40 bg-surface-secondary p-4 text-xs font-mono text-foreground/70">
              {paper.bibtex}
            </pre>
          </div>
        </div>
      )}
    </article>
  );
}

