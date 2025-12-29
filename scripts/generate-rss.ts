import fs from 'fs';
import path from 'path';
import { Feed } from 'feed';
import { allBlogPosts } from 'contentlayer/generated';
import { siteConfig } from '../src/lib/constants';

async function generateRss() {
  const baseUrl = siteConfig.url;
  
  const feed = new Feed({
    title: siteConfig.title,
    description: siteConfig.description,
    id: baseUrl,
    link: baseUrl,
    language: 'en',
    favicon: `${baseUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.author.name}`,
    updated: new Date(),
    feedLinks: {
      rss2: `${baseUrl}/rss.xml`,
      json: `${baseUrl}/feed.json`,
      atom: `${baseUrl}/atom.xml`,
    },
    author: {
      name: siteConfig.author.name,
      email: siteConfig.author.email,
      link: siteConfig.links.twitter,
    },
  });

  allBlogPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .forEach((post) => {
      feed.addItem({
        title: post.title,
        id: `${baseUrl}${post.url}`,
        link: `${baseUrl}${post.url}`,
        description: post.description,
        content: post.body.raw,
        author: [
          {
            name: siteConfig.author.name,
            email: siteConfig.author.email,
            link: siteConfig.links.twitter,
          },
        ],
        date: new Date(post.date),
      });
    });

  const publicPath = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath);
  }

  fs.writeFileSync(path.join(publicPath, 'rss.xml'), feed.rss2());
  fs.writeFileSync(path.join(publicPath, 'atom.xml'), feed.atom1());
  fs.writeFileSync(path.join(publicPath, 'feed.json'), feed.json1());
  
  console.log('✅ RSS feeds generated successfully!');
}

generateRss().catch((err) => {
  console.error('❌ Error generating RSS feed:', err);
  process.exit(1);
});
