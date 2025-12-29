# Personal Website

A modern, production-ready personal website built with Next.js 14, MDX, and Tailwind CSS.

## ✨ Features

- **📝 MDX Blog**: Write posts in Markdown with React components
- **🎨 Beautiful Design**: Modern UI with dark/light mode
- **🚀 Fast**: Static generation with edge caching
- **📊 SEO Optimized**: Meta tags, OG images, sitemap, RSS
- **📱 Responsive**: Mobile-first design
- **🔍 Search Ready**: Structure ready for Algolia/Pagefind
- **💬 Comments**: Giscus integration (GitHub Discussions)
- **📧 Newsletter**: Ready for Substack/Beehiiv integration

## 🏗️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content**: [Contentlayer](https://contentlayer.dev/) + MDX
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Deployment**: [Vercel](https://vercel.com/)
- **Icons**: [Lucide](https://lucide.dev/)

## 📁 Project Structure

```
├── content/                 # MDX content
│   ├── blog/               # Blog posts
│   ├── projects/           # Project pages
│   ├── papers/             # Academic papers
│   └── pages/              # Static pages (about, now)
├── public/                  # Static assets
├── src/
│   ├── app/                # Next.js App Router pages
│   ├── components/         # React components
│   ├── lib/                # Utility functions
│   └── types/              # TypeScript types
├── docs/
│   └── architecture.md     # Technical architecture
└── scripts/                # Build scripts
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/personal-website.git
cd personal-website

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

## 📝 Writing Content

### Create a New Blog Post

```bash
pnpm new-post
```

Or manually create a file in `content/blog/YYYY/your-post.mdx`:

```mdx
---
title: "Your Post Title"
description: "A brief description"
date: 2024-12-26
category: agent-infra  # agent-infra | game-engine | thinking
tags:
  - tag1
  - tag2
published: true
---

Your content here...
```

### Create a New Project

Create `content/projects/your-project.mdx`:

```mdx
---
title: "Project Name"
description: "Project description"
status: active  # active | completed | archived
startDate: 2024-01-01
stack:
  - Technology 1
  - Technology 2
github: https://github.com/...
featured: true
---

Project details...
```

## 🎨 Customization

### Site Configuration

Edit `src/lib/constants.ts` to update:

- Site name and description
- Author information
- Social links
- Content pillars

### Styling

- Colors: `tailwind.config.ts` and `src/app/globals.css`
- Typography: Tailwind Typography plugin
- Components: `src/components/`

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Configure environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Other Platforms

```bash
# Build for production
pnpm build

# Preview production build
pnpm start
```

## 📊 Analytics & Comments

### Analytics (Umami)

1. Set up [Umami](https://umami.is/)
2. Add `UMAMI_WEBSITE_ID` and `UMAMI_SCRIPT_URL` to env

### Comments (Giscus)

1. Enable GitHub Discussions on your repo
2. Configure at [giscus.app](https://giscus.app/)
3. Add env variables

## 🔧 Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm format       # Format with Prettier
pnpm new-post     # Create new blog post
```

## 📄 License

MIT License - feel free to use this as a template for your own site!

## 🙏 Acknowledgments

Inspired by many excellent personal websites and blogs in the developer community.






