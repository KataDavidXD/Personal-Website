export const siteConfig = {
  name: 'Yang Li',
  title: 'Yang Li — Agent Reliability & Infrastructure Architect',
  description: 'Designing system-level infrastructure for reliable, auditable, and testable multi-agent systems.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  author: {
    name: 'Yang Li',
    email: 'yli9919@hku.hk',
    twitter: '@yourhandle',
    github: 'KataDavidXD',
    linkedin: 'yangli9919',
  },
  links: {
    github: 'https://github.com/KataDavidXD',
    twitter: 'https://twitter.com/yourhandle',
    linkedin: 'https://linkedin.com/in/yangli9919',
  },
  giscus: {
    repo: 'KataDavidXD/Personal-Website', // Replace with your actual repo
    repoId: 'R_kgDOQwhAZw', // Replace with your actual repo ID
    category: 'Announcements',
    categoryId: 'DIC_kwDOQwhAZ84C0Wpr', // Replace with your actual category ID
    mapping: 'pathname',
    reactionsEnabled: '1',
    emitMetadata: '0',
    inputPosition: 'top',
    theme: 'preferred_color_scheme',
    lang: 'zh-CN',
  },
} as const;

export const pillars = [
  {
    id: 'agentgit',
    title: 'AgentGit',
    summary: 'Version control for LLM agents',
    description: 'State commit & revert, branching for parallel exploration, reduced runtime and token usage, and error recovery through checkpoint rollback.',
    href: 'https://github.com/KataDavidXD/Agent-Git',
  },
  {
    id: 'wtb',
    title: 'Workflow TestBench',
    summary: 'Production reliability for agents',
    description: 'Batch testing thousands of workflows in parallel, real-time monitoring, end-to-end production pipeline with quality gates, and expert knowledge extraction from agent traces.',
    href: '/projects/wtb-engine',
  },
  {
    id: 'mas',
    title: 'MAS Simulation',
    summary: 'High-performance multi-agent environments',
    description: 'Agent-centric design with persona resolution, parallel physical & narrative processing, hybrid OO+ECS architecture, and data-oriented design for LLM integration.',
    href: '/projects/mas-sim',
  },
] as const;

export const categories = {
  'agent-infra': {
    name: 'Agent Infrastructure',
    description: 'Reliability engineering, versioning, and state management for agents.',
  },
  'simulation': {
    name: 'Simulation',
    description: 'Large-scale multi-agent interaction and failure testing.',
  },
  'thinking': {
    name: 'Thinking',
    description: 'Strategic reflections on the Agentic Era.',
  },
} as const;
