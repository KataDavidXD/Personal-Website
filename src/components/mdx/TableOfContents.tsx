'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Find all h2 and h3 headings with IDs
    const elements = Array.from(document.querySelectorAll('h2[id], h3[id]'))
      .map((elem) => ({
        id: elem.id,
        text: elem.textContent || '',
        level: Number(elem.tagName.charAt(1)),
      }));
    
    setHeadings(elements);

    // Intersection Observer to track active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0% -80% 0%' }
    );

    elements.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-2">
      <p className="text-xs font-bold uppercase tracking-wider text-foreground/30">
        Table of Contents
      </p>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
          >
            <a
              href={`#${heading.id}`}
              className={cn(
                'block transition-colors hover:text-accent',
                activeId === heading.id
                  ? 'font-medium text-accent'
                  : 'text-foreground/50'
              )}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: 'smooth',
                });
                window.history.pushState(null, '', `#${heading.id}`);
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

