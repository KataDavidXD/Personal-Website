export const siteConfig = {
  name: 'Your Name',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
  description: 'Research, Engineering, and Thought Leadership in AI Agent Infrastructure, Game Development, and Philosophy.',
  keywords: [
    'Agent Infrastructure',
    'LLM',
    'Multi-Agent Systems',
    'Game Engine',
    'AI Research',
    'Software Engineering',
  ],
  author: {
    name: 'Your Name',
    email: 'hello@yourdomain.com',
    twitter: '@yourhandle',
    github: 'yourusername',
    linkedin: 'yourprofile',
  },
  links: {
    twitter: 'https://twitter.com/yourhandle',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourprofile',
  },
} as const;

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/papers', label: 'Papers' },
  { href: '/about', label: 'About' },
] as const;

export const pillars = [
  {
    id: 'agent-infra',
    title: 'Agent Infrastructure',
    description: 'Building the foundation for autonomous AI agents, LLM systems, and multi-agent orchestration.',
    href: '/blog?category=agent-infra',
    icon: 'Cpu',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'game-engine',
    title: 'Game Engine',
    description: 'Exploring game development, rendering pipelines, physics simulation, and interactive systems.',
    href: '/blog?category=game-engine',
    icon: 'Gamepad2',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'thinking',
    title: 'Thinking',
    description: 'Reflections on philosophy, strategy, decision-making, and the intersection of technology and humanity.',
    href: '/blog?category=thinking',
    icon: 'Brain',
    color: 'from-amber-500 to-orange-500',
  },
] as const;

