# Personal Website Architecture

> A production-ready personal website for research, engineering, and thought leadership.

---

## 1. Vision & Goals

### 1.1 Primary Objectives
| Role | Description |
|------|-------------|
| **Research Hub** | Papers, publications, and academic work (AgentGit, MAS, Infra) |
| **Technical Blog** | Long-form articles (EN/CN bilingual, citable, searchable) |
| **Portfolio** | Projects showcase for collaboration, funding, and career opportunities |
| **Newsletter** | Subscriber engagement with email distribution |

### 1.2 Content Pillars (URL Strategy)
```
Single Domain Strategy (SEO Authority Consolidation)
├── /agent-infra    → Agent infrastructure, LLM systems
├── /game-engine    → Game development, WTB engine
└── /thinking       → Philosophy, strategy, reflections
```

---

## 2. Technical Architecture

### 2.1 Stack Selection

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
├─────────────────────────────────────────────────────────────┤
│  Next.js 14 (App Router) + React 18 + TypeScript            │
│  MDX 3.0 (Content authoring with React components)          │
│  Tailwind CSS 3.4 (Utility-first styling)                   │
│  Framer Motion (Animations & transitions)                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      CONTENT LAYER                           │
├─────────────────────────────────────────────────────────────┤
│  Contentlayer (Type-safe MDX processing)                    │
│  gray-matter (Frontmatter parsing)                          │
│  rehype/remark plugins (Syntax highlighting, math, etc.)    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     INFRASTRUCTURE                           │
├─────────────────────────────────────────────────────────────┤
│  Vercel (Deployment, Edge Functions, Analytics)             │
│  Cloudflare (DNS, CDN, DDoS Protection)                     │
│  GitHub (Version Control, CI/CD trigger)                    │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Third-Party Integrations

| Category | Service | Purpose |
|----------|---------|---------|
| **Analytics** | Umami / Plausible | Privacy-friendly, GDPR-compliant |
| **Comments** | Giscus | GitHub Discussions-based, dev-friendly |
| **Newsletter** | Substack / Beehiiv | Email distribution, subscriber management |
| **Search** | Algolia / Pagefind | Full-text search across content |
| **OG Images** | @vercel/og | Dynamic social share cards |

---

## 3. Information Architecture

### 3.1 Site Map

```
/                           → Landing (Hero + 3 pillars entry)
│
├── /blog                   → All articles (filterable by tag/category)
│   ├── /blog/[slug]        → Individual article
│   └── /blog/tags/[tag]    → Tag-filtered list
│
├── /projects               → Project showcase
│   ├── /projects/agentgit  → Individual project page
│   ├── /projects/wtb       → Game engine project
│   └── /projects/[slug]    → Dynamic project pages
│
├── /papers                 → Academic publications
│   └── /papers/[slug]      → Paper detail + PDF + BibTeX
│
├── /agent-infra            → Pillar 1: Agent Infrastructure content
├── /game-engine            → Pillar 2: Game Development content  
├── /thinking               → Pillar 3: Philosophy & Strategy
│
├── /about                  → Bio, contact, social links
├── /now                    → Current focus (à la Derek Sivers)
├── /uses                   → Tools & setup (optional)
│
└── /api                    → API routes
    ├── /api/og             → Dynamic OG image generation
    ├── /api/rss            → RSS feed endpoint
    └── /api/newsletter     → Newsletter subscription
```

### 3.2 Content Types (MDX Frontmatter Schema)

```typescript
// Blog Post
interface BlogPost {
  title: string;
  slug: string;
  date: string;           // ISO 8601
  updated?: string;
  description: string;    // SEO meta description
  tags: string[];
  category: 'agent-infra' | 'game-engine' | 'thinking';
  language: 'en' | 'zh' | 'bilingual';
  published: boolean;
  featured?: boolean;
  readingTime?: number;   // Auto-calculated
  image?: string;         // Hero image
  canonicalUrl?: string;  // For syndicated content
}

// Project
interface Project {
  title: string;
  slug: string;
  description: string;
  status: 'active' | 'completed' | 'archived';
  startDate: string;
  endDate?: string;
  stack: string[];
  links: {
    github?: string;
    demo?: string;
    paper?: string;
  };
  featured?: boolean;
}

// Paper
interface Paper {
  title: string;
  slug: string;
  authors: string[];
  venue: string;          // Conference/Journal
  year: number;
  abstract: string;
  pdf?: string;
  bibtex: string;
  arxiv?: string;
  code?: string;
  slides?: string;
}
```

---

## 4. Directory Structure

```
personal-website/
├── public/
│   ├── images/
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml               # Auto-generated (planned)
│
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── page.tsx               # Homepage
│   │   ├── about/
│   │   ├── blog/
│   │   │   ├── page.tsx           # Blog list
│   │   │   └── [slug]/            # Individual post (planned)
│   │   ├── projects/
│   │   │   ├── page.tsx           # Projects list
│   │   │   └── [slug]/            # Individual project (planned)
│   │   ├── papers/
│   │   │   ├── page.tsx           # Papers list
│   │   │   └── [slug]/            # Individual paper (planned)
│   │   ├── now/
│   │   ├── layout.tsx             # Root layout
│   │   ├── not-found.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── PillarCards.tsx
│   │   │   ├── FeaturedPosts.tsx
│   │   │   ├── FeaturedProjects.tsx
│   │   │   └── NewsletterSection.tsx
│   │   └── providers/
│   │       └── ThemeProvider.tsx
│   │
│   ├── lib/
│   │   ├── seo.ts                # SEO utilities
│   │   ├── utils.ts              # General utilities
│   │   ├── constants.ts          # Site-wide constants
│   │   └── config.ts             # Additional config
│   │
│   └── types/
│       └── content.ts            # TypeScript interfaces
│
├── content/
│   ├── blog/
│   │   └── 2024/
│   ├── projects/
│   ├── papers/
│   └── pages/
│
├── scripts/
│   └── new-post.ts               # CLI for new posts
│
├── contentlayer.config.ts        # Contentlayer configuration
├── next.config.mjs               # Next.js configuration
├── package.json
└── README.md
```

---

## 5. SEO & Performance Strategy

### 5.1 Technical SEO Checklist

| Item | Implementation | Priority | Status |
|------|---------------|----------|--------|
| **Sitemap** | Auto-generated at `/sitemap.xml` | P0 | Planned |
| **Robots.txt** | Allow all, point to sitemap | P0 | Done |
| **Canonical URLs** | Set on all pages | P0 | Done |
| **Meta Tags** | Title, description, keywords | P0 | Done |
| **OG Tags** | Dynamic images for social sharing | P0 | Partial |
| **Structured Data** | JSON-LD for articles | P1 | Planned |
| **i18n** | `hreflang` tags for bilingual content | P1 | Planned |
| **Core Web Vitals** | LCP < 2.5s, FID < 100ms | P0 | In Progress |

### 5.2 Performance Targets

```
┌─────────────────────────────────────────┐
│         Lighthouse Score Targets         │
├─────────────────────────────────────────┤
│  Performance:     > 95                   │
│  Accessibility:   > 95                   │
│  Best Practices:  > 95                   │
│  SEO:             100                    │
└─────────────────────────────────────────┘
```

### 5.3 Optimization Techniques

- **Images**: Next.js Image component, WebP/AVIF, lazy loading
- **Fonts**: Self-hosted, `font-display: swap`, subset
- **CSS**: Tailwind purging, critical CSS inlining
- **JS**: Code splitting, dynamic imports, tree shaking
- **Caching**: Vercel Edge, immutable assets, stale-while-revalidate

---

## 6. Content Publishing Workflow

### 6.1 Writing → Publishing Pipeline

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   1. Write   │────▶│  2. Preview  │────▶│  3. Publish  │
│   (Local)    │     │  (Dev Mode)  │     │  (Git Push)  │
└──────────────┘     └──────────────┘     └──────────────┘
                                                 │
                                                 ▼
┌──────────────────────────────────────────────────────────┐
│                    4. Distribution                        │
├──────────────────────────────────────────────────────────┤
│  • X/Twitter: Thread summary + key visuals               │
│  • LinkedIn: Professional version                         │
│  • Substack: Email to subscribers                         │
│  • HN/Reddit: For engineering content                     │
└──────────────────────────────────────────────────────────┘
```

### 6.2 Git Workflow

```bash
main (production)
  │
  └── develop (staging)
        │
        └── feature/post-[slug]  # New content
        └── feature/[feature]    # New features
```

---

## 7. Analytics & Monitoring

### 7.1 Key Metrics

| Category | Metrics |
|----------|---------|
| **Traffic** | Unique visitors, page views, session duration |
| **Content** | Top articles, reading depth, bounce rate |
| **Acquisition** | Referral sources, search keywords, social |
| **Engagement** | Comments, shares, newsletter signups |

### 7.2 Tools Setup

```typescript
// Analytics Configuration
const analytics = {
  // Primary: Self-hosted Umami
  umami: {
    websiteId: process.env.UMAMI_WEBSITE_ID,
    scriptUrl: process.env.UMAMI_SCRIPT_URL,
  },
  // Backup: Vercel Analytics (built-in)
  vercel: {
    enabled: true,
  },
};
```

---

## 8. Cost Analysis

### 8.1 Monthly Costs (Estimated)

| Service | Free Tier | Growth Tier |
|---------|-----------|-------------|
| **Vercel** | $0 (Hobby) | $20/mo (Pro) |
| **Cloudflare** | $0 | $0 |
| **Domain** | - | $10-20/year |
| **Umami** | $0 (self-host) | $9/mo (cloud) |
| **Giscus** | $0 | $0 |
| **Substack** | $0 | 10% of paid subs |

**Total**: ~$10-20/year (minimal) to ~$30/month (growth)

---

## 9. Security Considerations

- **HTTPS**: Enforced via Vercel/Cloudflare
- **CSP**: Content Security Policy headers
- **API Keys**: Environment variables, never exposed
- **Rate Limiting**: Vercel Edge functions
- **Form Spam**: Honeypot + reCAPTCHA for contact forms

---

## 10. Future Roadmap

### Phase 1: MVP (Week 1-2)
- [ ] Core pages: Home, Blog, Projects, About
- [ ] Basic MDX setup with syntax highlighting
- [ ] SEO fundamentals (sitemap, meta, OG)
- [ ] Vercel deployment

### Phase 2: Enhancement (Week 3-4)
- [ ] Newsletter integration
- [ ] Giscus comments
- [ ] Analytics setup
- [ ] RSS feed
- [ ] Search functionality

### Phase 3: Growth (Month 2+)
- [ ] Bilingual support (EN/CN)
- [ ] Paper/publication pages
- [ ] Advanced MDX components
- [ ] Performance optimization
- [ ] A/B testing for CTAs

---

## Appendix A: Environment Variables

```bash
# .env.local

# Site
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Analytics
UMAMI_WEBSITE_ID=xxx
UMAMI_SCRIPT_URL=https://analytics.yourdomain.com/script.js

# Newsletter (Substack API or Beehiiv)
NEWSLETTER_API_KEY=xxx

# Comments (Giscus)
NEXT_PUBLIC_GISCUS_REPO=username/repo
NEXT_PUBLIC_GISCUS_REPO_ID=xxx
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=xxx

# Optional: Search (Algolia)
NEXT_PUBLIC_ALGOLIA_APP_ID=xxx
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=xxx
ALGOLIA_ADMIN_KEY=xxx
```

---

## Appendix B: Recommended VS Code Extensions

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "unifiedjs.vscode-mdx",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

---

*Last Updated: December 29, 2025*
*Author: AI Assistant*

