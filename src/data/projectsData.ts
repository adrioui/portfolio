
export interface Project {
  id: string;
  title: string;
  emojis: string[];
  description: string;
  catReview: string;
  stressLevel: number; // 0-5
  purpose: string;
  techStack: { name: string; level: number; humorousLabel: string }[];
  challenges: { id: number; title: string; status: 'CLOSED' | 'OPEN' | 'WONTFIX' | 'PATCHED' }[];
  demoLink?: { emoji: string; url: string; warning?: string };
}

export const projectsData: Project[] = [
  {
    id: 'cat-treats',
    title: 'Cat Treat Dispenser',
    emojis: ['🐱', '🍜', '🤖'],
    description: 'IoT-enabled treat dispenser for spoiled felines',
    catReview: 'Not enough treats. Obviously broken.',
    stressLevel: 3,
    purpose: 'Automate cat treat dispenser using Raspberry Pi + IoT',
    techStack: [
      { name: 'Python', level: 4, humorousLabel: 'I speak fluent list comprehensions' },
      { name: 'Raspberry Pi', level: 3, humorousLabel: 'My GPIO pins are tired' },
      { name: 'AWS', level: 2, humorousLabel: 'I can break S3 buckets' }
    ],
    challenges: [
      { id: 42, title: 'GPIO pins hated my cat\'s paw conductivity', status: 'CLOSED' },
      { id: 69, title: 'Treat catapult velocity calculations → fur on keyboard', status: 'WONTFIX' },
      { id: 101, title: 'Cat learned to hack the system with meows', status: 'OPEN' }
    ],
    demoLink: { emoji: '🔗', url: 'https://meow.cafe', warning: 'May cause excessive purring' }
  },
  {
    id: 'bad-ideas',
    title: 'Bad Ideas Library',
    emojis: ['💡', '🔥', '🤦‍♂️'],
    description: 'A React hook library for questionable life choices',
    catReview: 'Human spends too much time typing nonsense',
    stressLevel: 4,
    purpose: 'Create React hooks nobody asked for but everyone needs',
    techStack: [
      { name: 'JavaScript', level: 5, humorousLabel: 'I\'ve seen things' },
      { name: 'React', level: 4, humorousLabel: 'Hooks, not crooks' },
      { name: 'TypeScript', level: 3, humorousLabel: 'Types are just suggestions' }
    ],
    challenges: [
      { id: 1, title: 'Context API overuse caused existential crises', status: 'PATCHED' },
      { id: 2, title: 'TypeScript types argued with my life choices', status: 'WONTFIX' },
      { id: 3, title: 'useEffect dependencies array: a modern tragedy', status: 'OPEN' }
    ],
    demoLink: { emoji: '🔗', url: 'https://bad-ideas.dev', warning: 'Bring coffee' }
  },
  {
    id: 'quantum-blog',
    title: 'Quantum Blog Engine',
    emojis: ['📝', '🔮', '⚛️'],
    description: 'Blog posts that both exist and don\'t exist until observed',
    catReview: 'Keyboard makes nice napping spot',
    stressLevel: 5,
    purpose: 'Create blog posts in superposition until reader collapses wavefunction',
    techStack: [
      { name: 'Next.js', level: 4, humorousLabel: 'Server components or client? Yes.' },
      { name: 'GraphQL', level: 3, humorousLabel: 'Query complexity: O(n²+wtf)' },
      { name: 'CSS', level: 5, humorousLabel: 'Flexbox is my therapy' }
    ],
    challenges: [
      { id: 7, title: 'Content simultaneously everywhere and nowhere', status: 'WONTFIX' },
      { id: 13, title: 'Schrödinger\'s blog post refuses to resolve', status: 'CLOSED' },
      { id: 42, title: 'CSS animations broke laws of physics', status: 'PATCHED' }
    ],
    demoLink: { emoji: '🔮', url: 'https://quantum-blog.dev', warning: 'May cause paradoxes' }
  }
];
