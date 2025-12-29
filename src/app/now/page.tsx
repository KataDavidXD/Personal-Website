import { Metadata } from 'next';
import { allPages } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { Mdx } from '@/components/mdx/MdxContent';

export const metadata: Metadata = {
  title: 'Now',
  description: "What I'm currently focused on and working towards.",
};

export default function NowPage() {
  const page = allPages.find((page) => page.slug === 'now');

  if (!page) {
    notFound();
  }

  return (
    <div className="container-narrow py-16">
      <Mdx code={page.body.code} />
    </div>
  );
}
