import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, Rss } from 'lucide-react';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/yourusername', icon: Github },
  { name: 'Twitter', href: 'https://twitter.com/yourhandle', icon: Twitter },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/yourprofile', icon: Linkedin },
  { name: 'Email', href: 'mailto:your@email.com', icon: Mail },
  { name: 'RSS', href: '/rss.xml', icon: Rss },
];

const footerLinks = [
  { name: 'Blog', href: '/blog' },
  { name: 'Projects', href: '/projects' },
  { name: 'Papers', href: '/papers' },
  { name: 'About', href: '/about' },
  { name: 'Now', href: '/now' },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/40 bg-surface-secondary/50">
      <div className="container-wide py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link href="/" className="text-xl font-bold tracking-tight">
              Yang<span className="text-accent">Li</span>
            </Link>
            <p className="mt-2 text-sm text-foreground/60">
              Research · Engineering · Thinking
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-foreground/60 transition-colors hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="rounded-lg p-2 text-foreground/60 transition-colors hover:bg-accent/10 hover:text-accent"
                aria-label={link.name}
              >
                <link.icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-border/40 pt-8 text-center">
          <p className="text-sm text-foreground/50">
            © {new Date().getFullYear()} Yang Li. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}






