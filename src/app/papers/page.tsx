import { Metadata } from 'next';
import Link from 'next/link';
import { allPapers } from 'contentlayer/generated';

export const metadata: Metadata = {
  title: 'Papers',
  description: 'Academic publications and research papers.',
};

export default function PapersPage() {
  const papers = allPapers.sort((a, b) => b.year - a.year);

  return (
    <div className="container-narrow py-24">
      {/* Header */}
      <div className="mb-16">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Research
        </h1>
        <p className="mt-4 text-lg text-foreground/70 max-w-2xl">
          Academic publications and research papers.
        </p>
      </div>

      {/* Papers List */}
      <div className="flex flex-col gap-12">
        {papers.length > 0 ? (
          papers.map((paper) => (
            <article key={paper.slug} className="group">
              <Link href={paper.url} className="block">
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between">
                    <h2 className="text-lg font-medium text-foreground group-hover:underline decoration-1 underline-offset-4 max-w-xl">
                      {paper.title}
                    </h2>
                    <span className="shrink-0 text-sm text-foreground/40 font-mono">
                      {paper.year}
                    </span>
                  </div>
                  
                  <p className="text-sm text-foreground/60">
                    {paper.authors.join(', ')}
                  </p>
                  
                  <p className="text-sm text-foreground/40">
                    {paper.venue}
                  </p>
                </div>
              </Link>
            </article>
          ))
        ) : (
          <p className="text-foreground/50">No papers found.</p>
        )}
      </div>
    </div>
  );
}
