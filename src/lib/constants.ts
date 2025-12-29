export const siteConfig = {
  name: 'Your Name',
  title: 'Your Name - Research & Engineering',
  description: 'Personal website for research, engineering projects, and thought leadership.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  author: {
    name: 'Your Name',
    email: 'your@email.com',
    twitter: '@yourhandle',
    github: 'yourusername',
    linkedin: 'yourprofile',
  },
  links: {
    github: 'https://github.com/yourusername',
    twitter: 'https://twitter.com/yourhandle',
    linkedin: 'https://linkedin.com/in/yourprofile',
  },
} as const;

export const pillars = [
  {
    id: 'agent-infra',
    title: 'Agent Infrastructure',
    description: 'Building the foundation for autonomous AI systems, multi-agent architectures, and intelligent automation.',
    href: '/agent-infra',
    icon: '🤖',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'game-engine',
    title: 'Game Engine',
    description: 'Exploring game development, rendering systems, physics engines, and real-time simulation.',
    href: '/game-engine',
    icon: '🎮',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'thinking',
    title: 'Thinking',
    description: 'Reflections on philosophy, strategy, decision-making, and the intersection of technology and humanity.',
    href: '/thinking',
    icon: '💭',
    color: 'from-amber-500 to-orange-500',
  },
] as const;

export const categories = {
  'agent-infra': {
    name: 'Agent Infrastructure',
    description: 'LLM systems, multi-agent architectures, and AI infrastructure',
  },
  'game-engine': {
    name: 'Game Engine',
    description: 'Game development, rendering, and real-time systems',
  },
  thinking: {
    name: 'Thinking',
    description: 'Philosophy, strategy, and reflections',
  },
} as const;






