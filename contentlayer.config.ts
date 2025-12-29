import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import readingTime from 'reading-time';

// Blog Post document type
export const BlogPost = defineDocumentType(() => ({
  name: 'BlogPost',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
    updated: { type: 'date', required: false },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    category: { 
      type: 'enum', 
      options: ['agent-infra', 'game-engine', 'thinking'],
      required: true 
    },
    language: { 
      type: 'enum', 
      options: ['en', 'zh', 'bilingual'], 
      default: 'en' 
    },
    published: { type: 'boolean', default: true },
    featured: { type: 'boolean', default: false },
    image: { type: 'string', required: false },
    canonicalUrl: { type: 'string', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('blog/', ''),
    },
    url: {
      type: 'string',
      resolve: (doc) => `/blog/${doc._raw.flattenedPath.replace('blog/', '')}`,
    },
    readingTime: {
      type: 'json',
      resolve: (doc) => readingTime(doc.body.raw),
    },
  },
}));

// Project document type
export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'projects/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    status: { 
      type: 'enum', 
      options: ['active', 'completed', 'archived'],
      default: 'active'
    },
    startDate: { type: 'date', required: true },
    endDate: { type: 'date', required: false },
    stack: { type: 'list', of: { type: 'string' }, default: [] },
    github: { type: 'string', required: false },
    demo: { type: 'string', required: false },
    paper: { type: 'string', required: false },
    featured: { type: 'boolean', default: false },
    image: { type: 'string', required: false },
    order: { type: 'number', default: 0 },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('projects/', ''),
    },
    url: {
      type: 'string',
      resolve: (doc) => `/projects/${doc._raw.flattenedPath.replace('projects/', '')}`,
    },
  },
}));

// Paper document type
export const Paper = defineDocumentType(() => ({
  name: 'Paper',
  filePathPattern: 'papers/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    authors: { type: 'list', of: { type: 'string' }, required: true },
    venue: { type: 'string', required: true },
    year: { type: 'number', required: true },
    abstract: { type: 'string', required: true },
    pdf: { type: 'string', required: false },
    bibtex: { type: 'string', required: false },
    arxiv: { type: 'string', required: false },
    code: { type: 'string', required: false },
    slides: { type: 'string', required: false },
    featured: { type: 'boolean', default: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('papers/', ''),
    },
    url: {
      type: 'string',
      resolve: (doc) => `/papers/${doc._raw.flattenedPath.replace('papers/', '')}`,
    },
  },
}));

// Page document type (for about, now, etc.)
export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: 'pages/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('pages/', ''),
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [BlogPost, Project, Paper, Page],
  mdx: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeSlug,
      rehypeKatex,
      [
        rehypePrettyCode,
        {
          theme: 'github-dark',
          onVisitLine(node: any) {
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          onVisitHighlightedLine(node: any) {
            node.properties.className.push('line--highlighted');
          },
          onVisitHighlightedWord(node: any) {
            node.properties.className = ['word--highlighted'];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
            ariaLabel: 'Link to section',
          },
        },
      ],
    ],
  },
});






