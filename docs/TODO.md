# Personal Website - Development TODO

## Phase 1: MVP (Week 1-2) ✅

- [x] Project setup (Next.js 14, TypeScript, Tailwind)
- [x] Contentlayer configuration for MDX
- [x] Base layout (Header, Footer, Theme)
- [x] Homepage with Hero, Pillars, Featured sections
- [x] Blog list page
- [x] Projects list page
- [x] Papers list page
- [x] About page
- [x] Now page
- [x] Basic SEO setup (meta tags, OG images structure)
- [x] Sample content (blog posts, projects, papers)
- [x] CI/CD workflow (GitHub Actions)

## Phase 2: Core Features (Week 3-4) 🔄

- [x] Individual blog post page with MDX rendering ([slug] route)
- [x] Individual project page
- [x] Individual paper page
- [x] Tag filtering for blog
- [x] Category pages (/agent-infra, /game-engine, /thinking)
- [x] RSS feed generation (scripts/generate-rss.ts)
- [x] Sitemap generation (scripts/generate-sitemap.ts)
- [ ] Dynamic OG image generation (@vercel/og)
- [ ] Table of contents for long posts
- [x] Code syntax highlighting with line numbers (rehype-pretty-code)
- [ ] Mobile navigation improvements

## Phase 3: Engagement Features (Month 2) 📝

- [ ] Giscus comments integration
- [ ] Newsletter signup form
- [ ] Newsletter API integration (Substack/Beehiiv)
- [ ] Share buttons (Twitter, LinkedIn, Copy link)
- [ ] Reading progress indicator
- [ ] Related posts section
- [ ] Search functionality (Pagefind/Algolia)

## Phase 4: Analytics & Optimization (Month 2-3) 📊

- [ ] Umami analytics integration
- [ ] Core Web Vitals optimization
- [ ] Image optimization review
- [ ] Font loading optimization
- [ ] Lighthouse score > 95 across all categories
- [ ] Error boundary and 404 improvements
- [ ] Loading states and skeletons

## Phase 5: Advanced Features (Month 3+) 🚀

- [x] Initial Bilingual support (CN README, EN/CN content schema)
- [ ] Full Bilingual support (UI i18n)
- [ ] Content series/collections
- [ ] Custom MDX components library
- [ ] Interactive demos in posts
- [ ] PDF resume download
- [ ] Contact form with spam protection
- [ ] A/B testing for CTAs
- [ ] Weekly digest email automation

## Content Backlog 📚

### Blog Posts to Write
- [ ] "Introduction to Multi-Agent Systems"
- [ ] "Building a Vulkan Renderer from Scratch"
- [ ] "On the Nature of Intelligence"
- [ ] "State Management in AI Agents"
- [ ] "ECS Architecture Deep Dive"

### Projects to Document
- [x] AgentGit - basic documentation
- [x] WTB Engine - basic documentation
- [ ] Other projects...

### Papers to Add
- [x] Import sample paper
- [ ] Create proper BibTeX entries
- [ ] Add supplementary materials

## Technical Debt 🔧

- [ ] Add comprehensive TypeScript types
- [ ] Unit tests for utility functions
- [ ] E2E tests with Playwright
- [ ] Performance monitoring setup
- [ ] Error tracking (Sentry)
- [ ] Content validation scripts
- [ ] Broken link checker
- [ ] Accessibility audit

## Design Polish 🎨

- [ ] Custom 404 page illustration
- [ ] Loading animation/skeleton
- [ ] Scroll animations refinement
- [ ] Print stylesheet for articles
- [ ] Favicon set (all sizes)
- [ ] Social media profile assets

---

## Notes

### Quick Commands
```bash
pnpm dev          # Development
pnpm build        # Production build
pnpm new-post     # Create new post
```

### Priority Legend
- 🔴 Critical (blocks launch)
- 🟡 Important (needed soon)
- 🟢 Nice to have
- ⚪ Future consideration

### Resources
- [Next.js Docs](https://nextjs.org/docs)
- [Contentlayer Docs](https://contentlayer.dev/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)

*Last Updated: December 29, 2024*






