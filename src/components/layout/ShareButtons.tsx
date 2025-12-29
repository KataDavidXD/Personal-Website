'use client';

import { useState } from 'react';
import { Twitter, Linkedin, Link as LinkIcon, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url;

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-foreground/50 mr-2">Share:</span>
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg p-2 text-foreground/50 transition-colors hover:bg-accent/10 hover:text-accent"
          aria-label={`Share on ${link.name}`}
        >
          <link.icon size={18} />
        </a>
      ))}
      <button
        onClick={copyToClipboard}
        className="rounded-lg p-2 text-foreground/50 transition-colors hover:bg-accent/10 hover:text-accent"
        aria-label="Copy link"
      >
        {copied ? <Check size={18} className="text-green-500" /> : <LinkIcon size={18} />}
      </button>
    </div>
  );
}

