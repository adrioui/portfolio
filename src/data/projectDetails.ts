
export interface TechStack {
  name: string;
  level: number; // 1-5
  quote: string;
}

export interface Challenge {
  id: number;
  title: string;
  status: 'OPEN' | 'CLOSED' | 'WONTFIX' | 'PATCHED';
}

export interface ProjectDetail {
  id: string;
  title: string;
  overview: string;
  techStack: TechStack[];
  challenges: Challenge[];
  demoLink?: {
    url: string;
    label: string;
  };
  asciiArt: string;
  stressLevel: number; // 0-5
}

export const projectDetails: Record<string, ProjectDetail> = {
  "project1": {
    id: "project1",
    title: "AI Powered Cat Toy Tracker",
    overview: "$ ./launch --project --purpose=\"Track cat toy movements using computer vision and alert when they disappear under furniture\"",
    techStack: [
      { name: "Python", level: 4, quote: "I speak fluent list comprehensions" },
      { name: "TensorFlow", level: 3, quote: "My neural networks have anxiety too" },
      { name: "Raspberry Pi", level: 2, quote: "It's not overheating, it's a feature" }
    ],
    challenges: [
      { id: 42, title: "GPIO pins hated my cat's paw conductivity", status: 'CLOSED' },
      { id: 69, title: "Treat catapult velocity calculations → fur on keyboard", status: 'WONTFIX' },
      { id: 101, title: "CV model confused pom-pom with actual cat", status: 'PATCHED' }
    ],
    demoLink: {
      url: "https://meow.cafe",
      label: "Try it → meow.cafe"
    },
    asciiArt: `
    +----------------+      +----------------+
    |                |      |                |
    |  Raspberry Pi  |----->|  Pi Camera     |
    |                |      |                |
    +----------------+      +----------------+
            |                       |
            |                       |
            v                       v
    +----------------+      +----------------+
    |                |      |                |
    |  TensorFlow    |<-----|  Image Input   |
    |  Model         |      |                |
    +----------------+      +----------------+
            |
            |
            v
    +----------------+      +----------------+
    |                |      |                |
    |  Alert System  |----->|  Mobile App    |
    |                |      |                |
    +----------------+      +----------------+

    It's not advanced architecture, it's "minimalist design" 😼
    `,
    stressLevel: 3
  },
  "project2": {
    id: "project2",
    title: "npm install bad-ideas",
    overview: "$ ./explain --tldr=\"A React hook library for questionable life choices with a side of regret\"",
    techStack: [
      { name: "JavaScript", level: 5, quote: "I've seen things you wouldn't believe" },
      { name: "React", level: 4, quote: "Hooks, not crooks" },
      { name: "TypeScript", level: 3, quote: "My types are more complex than my relationships" }
    ],
    challenges: [
      { id: 1, title: "Context API overuse caused existential crises", status: 'PATCHED' },
      { id: 2, title: "TypeScript types argued with my life choices", status: 'WONTFIX' },
      { id: 3, title: "Package is 90% dependencies, 10% actual code", status: 'OPEN' }
    ],
    demoLink: {
      url: "https://bad-ideas.dev",
      label: "Demo → bad-ideas.dev (⚠️ Bring coffee)"
    },
    asciiArt: `
         +--------------------+
         |                    |
         |   bad-ideas.js     |
         |                    |
         +--------------------+
                   |
          +--------+---------+
          |                  |
    +-----v------+    +------v-----+
    |            |    |            |
    | useRegrets |    | useRewrite |
    |            |    |            |
    +-----+------+    +------+-----+
          |                  |
          |                  |
    +-----v------------------v-----+
    |                              |
    |      Developer Tears™        |
    |                              |
    +------------------------------+

    Documentation? I prefer ✨ *tribal knowledge* ✨
    `,
    stressLevel: 5
  },
  "project3": {
    id: "project3",
    title: "Cat-as-a-Service (CaaS)",
    overview: "$ ./deploy --project --purpose=\"Containerized microservices architecture but every container has a digital cat inside --cat-tax\" ",
    techStack: [
      { name: "Docker", level: 4, quote: "I containerize my issues too" },
      { name: "Kubernetes", level: 2, quote: "It's pronounced 'pain' in Greek" },
      { name: "AWS", level: 3, quote: "I can break S3 buckets in my sleep" }
    ],
    challenges: [
      { id: 7, title: "Docker containers randomly start meowing at 3 AM", status: 'CLOSED' },
      { id: 13, title: "Kubernetes pods playing cat and mouse with each other", status: 'WONTFIX' },
      { id: 42, title: "AWS bill exceeded cat food budget", status: 'OPEN' }
    ],
    demoLink: {
      url: "https://caas.meow",
      label: "Purr → caas.meow"
    },
    asciiArt: `
       +--------------+        +--------------+
       |  API Gateway |        |  Auth Service|
       |   (Meow)     |------->|  (Hiss)      |
       +--------------+        +--------------+
              |                        |
              v                        v
       +--------------+        +--------------+
       |  Cat Image   |<------>|  Cat Facts   |
       |  Service     |        |  Service     |
       +--------------+        +--------------+
              |                        |
              v                        v
       +--------------+        +--------------+
       |  PostgreSQL  |        |  Redis Cache |
       |  (Purrs)     |<------>|  (Treats)    |
       +--------------+        +--------------+

    /\\_/\\
   ( o.o )  < "All of this runs on purr-power"
    > ^ <
    `,
    stressLevel: 4
  }
};
