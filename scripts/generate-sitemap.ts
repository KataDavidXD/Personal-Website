import { writeFileSync } from 'fs';
import { siteConfig } from '../src/lib/constants';
import { allBlogPosts, allProjects, allPapers, allPages } from 'contentlayer/generated';

function generateSitemap() {
  const baseUrl = siteConfig.url;

  const staticPages = [
    '',
    '/blog',
    '/projects',
    '/papers',
    '/about',
    '/now',
  ];

  const blogPages = allBlogPosts
    .filter((post) => post.published)
    .map((post) => post.url);

  const projectPages = allProjects.map((project) => project.url);
  const paperPages = allPapers.map((paper) => paper.url);
  
  // Pages from content/pages (like about, now)
  const contentPages = allPages.map((page) => `/${page.slug}`);

  const allPagesUrls = [...new Set([...staticPages, ...blogPages, ...projectPages, ...paperPages, ...contentPages])];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPagesUrls
    .map((url) => {
      return `
    <url>
      <loc>${baseUrl}${url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>${url === '' ? '1.0' : '0.8'}</priority>
    </url>`;
    })
    .join('')}
</urlset>`;

  writeFileSync('./public/sitemap.xml', sitemap);
  console.log('✅ Sitemap generated at ./public/sitemap.xml');
}

generateSitemap();

