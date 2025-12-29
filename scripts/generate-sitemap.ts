import fs from 'fs';
import path from 'path';
import { allBlogPosts, allProjects, allPapers, allPages } from '../.contentlayer/generated/index.mjs';
import { siteConfig } from '../src/lib/constants';

async function generateSitemap() {
  const baseUrl = siteConfig.url;
  
  const staticPaths = [
    '',
    '/blog',
    '/projects',
    '/papers',
    '/about',
    '/now',
  ];

  const contentPaths = [
    ...allBlogPosts.filter((p) => p.published).map((p) => p.url),
    ...allProjects.map((p) => p.url),
    ...allPapers.map((p) => p.url),
    ...allPages.map((p) => p.url),
  ];

  const allPaths = [...new Set([...staticPaths, ...contentPaths])];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPaths
    .map((route) => {
      return `
    <url>
      <loc>${baseUrl}${route}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>${route === '' ? '1.0' : '0.8'}</priority>
    </url>`;
    })
    .join('')}
</urlset>`;

  const publicPath = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath);
  }

  fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), sitemap);
  
  console.log('✅ Sitemap generated successfully!');
}

generateSitemap().catch((err) => {
  console.error('❌ Error generating sitemap:', err);
  process.exit(1);
});
