'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Languages } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Search } from '@/components/layout/Search';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Blog', href: '/blog' },
  { name: 'Projects', href: '/projects' },
  { name: 'Papers', href: '/papers' },
  { name: 'About', href: '/about' },
];

export function Header() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = pathname === '/';

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <nav className="container-wide flex h-16 items-center justify-between">
        {/* Logo - Hide on home page to avoid redundancy with Hero H1 */}
        <div className={cn("transition-opacity duration-300", isHome ? "opacity-0 pointer-events-none" : "opacity-100")}>
        <Link href="/" className="flex items-center space-x-2">
            <span className="text-lg font-bold tracking-tight text-foreground">
              Yang Li
          </span>
        </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <div className="flex items-center gap-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                pathname.startsWith(item.href)
                    ? 'text-foreground bg-accent/5'
                    : 'text-foreground/60 hover:text-foreground hover:bg-accent/5'
              )}
            >
              {item.name}
            </Link>
          ))}
          </div>

          <div className="h-4 w-[1px] bg-border/60" />

          <div className="flex items-center gap-2">
            <Search />
          
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="rounded-md p-2 text-foreground/60 hover:bg-accent/5 hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
              {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Language Toggle (Mock for now, ready for implementation) */}
            <button
              className="rounded-md p-2 text-foreground/60 hover:bg-accent/5 hover:text-foreground transition-colors"
              aria-label="Switch language"
              title="Switch Language (Coming Soon)"
            >
              <Languages size={18} />
          </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-foreground/70 hover:bg-accent/5 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border/40 bg-background md:hidden"
          >
            <div className="container-wide space-y-1 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block rounded-lg px-4 py-3 text-base font-medium transition-colors',
                    pathname.startsWith(item.href)
                      ? 'bg-accent/10 text-accent'
                      : 'text-foreground/70 hover:bg-accent/5 hover:text-foreground'
                  )}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="mt-4 flex items-center gap-4 px-4 pt-4 border-t border-border/40">
              <button
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                  className="flex items-center gap-2 text-sm font-medium text-foreground/70"
              >
                  {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                  <span>Theme</span>
                </button>
                <button className="flex items-center gap-2 text-sm font-medium text-foreground/70">
                  <Languages size={18} />
                  <span>中文</span>
              </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
