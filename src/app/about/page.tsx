import { Metadata } from 'next';
import { allPages } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { Mdx } from '@/components/mdx/MdxContent';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { siteConfig } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description: 'Researcher and engineer building at the intersection of AI, games, and philosophy.',
};

export default function AboutPage() {
  const page = allPages.find((page) => page.slug === 'about');

  if (!page) {
    notFound();
  }

  const socialLinks = [
    { name: 'GitHub', href: siteConfig.links.github, icon: Github },
    { name: 'Twitter', href: siteConfig.links.twitter, icon: Twitter },
    { name: 'LinkedIn', href: siteConfig.links.linkedin, icon: Linkedin },
    { name: 'Email', href: `mailto:${siteConfig.author.email}`, icon: Mail },
  ];

  return (
    <div className="container-narrow py-16">
      <Mdx code={page.body.code} />
      
      <div className="mt-8 flex flex-wrap gap-4">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            <link.icon size={18} className="mr-2" />
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
}
