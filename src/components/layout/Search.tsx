'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { Search as SearchIcon, FileText, Layout, BookOpen } from 'lucide-react';
import { allBlogPosts, allProjects, allPapers } from 'contentlayer/generated';
import { cn } from '@/lib/utils';

export function Search() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  // Toggle the menu when ⌘K or Ctrl+K is pressed
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-border/40 bg-muted/50 px-3 py-1.5 text-sm text-foreground/50 transition-colors hover:bg-accent/10 hover:text-accent md:w-40 lg:w-64"
      >
        <SearchIcon size={16} />
        <span className="hidden md:inline-flex">Search posts...</span>
        <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 md:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Global Search"
        className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[15vh] bg-background/80 backdrop-blur-sm"
      >
        <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-border/40 bg-background shadow-2xl">
          <div className="flex items-center border-b border-border/40 px-3">
            <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Command.Input
              placeholder="Type to search everything..."
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-foreground/50 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Command.List className="max-h-[300px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm">No results found.</Command.Empty>
            
            <Command.Group heading="Blog Posts" className="px-2 py-1.5 text-xs font-medium text-foreground/50">
              {allBlogPosts.map((post) => (
                <Command.Item
                  key={post.slug}
                  onSelect={() => runCommand(() => router.push(post.url))}
                  className="flex cursor-default select-none items-center rounded-sm px-2 py-3 text-sm outline-none aria-selected:bg-accent/10 aria-selected:text-accent"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  <span>{post.title}</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Projects" className="px-2 py-1.5 text-xs font-medium text-foreground/50">
              {allProjects.map((project) => (
                <Command.Item
                  key={project.slug}
                  onSelect={() => runCommand(() => router.push(project.url))}
                  className="flex cursor-default select-none items-center rounded-sm px-2 py-3 text-sm outline-none aria-selected:bg-accent/10 aria-selected:text-accent"
                >
                  <Layout className="mr-2 h-4 w-4" />
                  <span>{project.title}</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Papers" className="px-2 py-1.5 text-xs font-medium text-foreground/50">
              {allPapers.map((paper) => (
                <Command.Item
                  key={paper.slug}
                  onSelect={() => runCommand(() => router.push(paper.url))}
                  className="flex cursor-default select-none items-center rounded-sm px-2 py-3 text-sm outline-none aria-selected:bg-accent/10 aria-selected:text-accent"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>{paper.title}</span>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </div>
      </Command.Dialog>
    </>
  );
}

