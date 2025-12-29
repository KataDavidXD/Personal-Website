import { writeFileSync } from 'fs';
import { Feed } from 'feed';
import { allBlogPosts } from '../.contentlayer/generated';
import { siteConfig } from '../src/lib/constants';

function generateRss() {
  const feed = new Feed({
    title: siteConfig.title,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: 'en',
    image: `${siteConfig.url}/og-default.png`,
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.author.name}`,
    author: {
      name: siteConfig.author.name,
      email: siteConfig.author.email,
      link: siteConfig.url,
    },
  });

  const sortedPosts = allBlogPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  sortedPosts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${siteConfig.url}${post.url}`,
      link: `${siteConfig.url}${post.url}`,
      description: post.description,
      content: post.body.raw,
      author: [
        {
          name: siteConfig.author.name,
          email: siteConfig.author.email,
          link: siteConfig.url,
        },
      ],
      date: new Date(post.date),
      category: [{ name: post.category }],
    });
  });

  writeFileSync('./public/rss.xml', feed.rss2());
  console.log('✅ RSS feed generated at ./public/rss.xml');
}

generateRss();

