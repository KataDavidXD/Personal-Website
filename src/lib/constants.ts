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
} as const;

export const pillars = [
  {
    id: 'agent-git',
    title: 'AgentGit',
    description: 'The version control layer for LLM agents. Enabling State Commit, Rollback, and Branching for complex agentic workflows.',
    href: 'https://github.com/KataDavidXD/Agent-Git',
    icon: '🌳',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'wtb',
    title: 'WTB (Workflow Test Bench)',
    description: 'Failure-mode-driven evaluation and regression testing. Partnered with leading ToB HQs to ensure production reliability.',
    href: '/projects/wtb',
    icon: '🧪',
    color: 'from-blue-600 to-indigo-600',
  },
  {
    id: 'mas-sim',
    title: 'MAS Simulation',
    description: 'Controlled simulation environments for studying agent interaction, uncertainty, and system-level emergent behavior.',
    href: '/projects/mas-sim',
    icon: '🛰️',
    color: 'from-purple-600 to-pink-600',
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
