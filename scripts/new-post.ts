#!/usr/bin/env tsx

/**
 * Script to create a new blog post
 * Usage: pnpm new-post
 */

import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

async function main() {
  console.log('\n📝 Create a new blog post\n');

  const title = await question('Title: ');
  const description = await question('Description: ');
  const category = await question('Category (agent-infra/game-engine/thinking): ');
  const tags = await question('Tags (comma-separated): ');

  const slug = slugify(title);
  const date = new Date().toISOString().split('T')[0];
  const year = new Date().getFullYear();

  const content = `---
title: "${title}"
description: "${description}"
date: ${date}
category: ${category || 'thinking'}
language: en
tags:
${tags
  .split(',')
  .map((t) => `  - ${t.trim()}`)
  .join('\n')}
published: false
featured: false
---

Write your content here...
`;

  const dir = path.join(process.cwd(), 'content', 'blog', String(year));
  const filePath = path.join(dir, `${slug}.mdx`);

  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Check if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`\n❌ File already exists: ${filePath}`);
    rl.close();
    process.exit(1);
  }

  // Write file
  fs.writeFileSync(filePath, content);

  console.log(`\n✅ Created: ${filePath}`);
  console.log('\nNext steps:');
  console.log(`  1. Edit the file: content/blog/${year}/${slug}.mdx`);
  console.log('  2. Set published: true when ready');
  console.log('  3. Run pnpm dev to preview\n');

  rl.close();
}

main().catch(console.error);






