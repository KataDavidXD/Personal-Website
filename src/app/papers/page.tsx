import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Code, ExternalLink } from 'lucide-react';
import { allPapers } from 'contentlayer/generated';

export const metadata: Metadata = {
  title: 'Papers',
  description: 'Academic publications and research papers.',
};

export default function PapersPage() {
  const papers = allPapers.sort((a, b) => b.year - a.year);

  return (
    <div className="container-narrow py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Papers</h1>
        <p className="mt-4 text-lg text-foreground/70">
          Academic publications and research papers.
        </p>
      </div>

      {/* Papers List */}
      <div className="space-y-8">
        {papers.length > 0 ? (
          papers.map((paper) => (
            <article
              key={paper.slug}
              className="rounded-xl border border-border/40 bg-surface p-6"
            >
              {/* Year Badge */}
              <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                {paper.year}
              </span>

              {/* Title */}
              <Link href={paper.url}>
                <h2 className="mt-4 text-xl font-semibold hover:text-accent">
                  {paper.title}
                </h2>
              </Link>

              {/* Authors */}
              <p className="mt-2 text-sm text-foreground/70">
                {paper.authors.join(', ')}
              </p>

              {/* Venue */}
              <p className="mt-1 text-sm font-medium text-foreground/50">
                {paper.venue}
              </p>

              {/* Abstract */}
              <p className="mt-4 text-foreground/70">{paper.abstract}</p>

              {/* Links */}
              <div className="mt-6 flex flex-wrap gap-3">
                {paper.pdf && (
                  <a
                    href={paper.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-lg bg-surface-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <FileText size={16} className="mr-2" />
                    PDF
                  </a>
                )}
                {paper.arxiv && (
                  <a
                    href={paper.arxiv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-lg bg-surface-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    arXiv
                  </a>
                )}
                {paper.code && (
                  <a
                    href={paper.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-lg bg-surface-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <Code size={16} className="mr-2" />
                    Code
                  </a>
                )}
              </div>
            </article>
          ))
        ) : (
          <p className="text-center text-foreground/50 py-12">
            No papers found.
          </p>
        )}
      </div>
    </div>
  );
}






