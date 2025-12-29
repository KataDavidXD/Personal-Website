/**
 * Content type definitions
 */

export type Category = 'agent-infra' | 'game-engine' | 'thinking';
export type Language = 'en' | 'zh' | 'bilingual';
export type ProjectStatus = 'active' | 'completed' | 'archived';

export interface ReadingTime {
  text: string;
  minutes: number;
  time: number;
  words: number;
}

export interface BlogPost {
  title: string;
  slug: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  category: Category;
  language: Language;
  published: boolean;
  featured: boolean;
  image?: string;
  canonicalUrl?: string;
  readingTime: ReadingTime;
  url: string;
  body: {
    raw: string;
    code: string;
  };
}

export interface Project {
  title: string;
  slug: string;
  description: string;
  status: ProjectStatus;
  startDate: string;
  endDate?: string;
  stack: string[];
  github?: string;
  demo?: string;
  paper?: string;
  featured: boolean;
  image?: string;
  order: number;
  url: string;
  body: {
    raw: string;
    code: string;
  };
}

export interface Paper {
  title: string;
  slug: string;
  authors: string[];
  venue: string;
  year: number;
  abstract: string;
  pdf?: string;
  bibtex?: string;
  arxiv?: string;
  code?: string;
  slides?: string;
  featured: boolean;
  url: string;
  body: {
    raw: string;
    code: string;
  };
}

export interface Page {
  title: string;
  slug: string;
  description?: string;
  body: {
    raw: string;
    code: string;
  };
}






