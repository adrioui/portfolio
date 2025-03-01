
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Terminal from '@/components/Terminal';
import { ProjectSkillBar } from '@/components/ProjectSkillBar';
import { GlitchingTitle } from '@/components/GlitchingTitle';
import { ChallengeItem } from '@/components/ChallengeItem';
import { CatScrollIndicator } from '@/components/CatScrollIndicator';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface ProjectData {
  id: string;
  title: string;
  overview: string;
  asciiArt: string;
  demoLink: string;
  stressLevel: number;
  techStack: {
    name: string;
    level: number;
    comment: string;
  }[];
  challenges: {
    id: string;
    title: string;
    status: 'OPEN' | 'CLOSED' | 'WONTFIX' | 'PATCHED';
  }[];
}

// Sample project data
const PROJECTS: Record<string, ProjectData> = {
  'cat-treat-dispenser': {
    id: 'cat-treat-dispenser',
    title: 'Feline Snack Automaton 3000',
    overview: './launch --project --purpose="Automate cat treat dispenser using Raspberry Pi + IoT"',
    asciiArt: `
     /\\___/\\     +---------------------+
    ( =^.^= )----| Raspberry Pi        |
     >  Y  <     | +-----------------+ |
                 | | Cat Treat API   | |
                 | | GET /treats     | |
                 | +-----------------+ |
                 +----------+----------+
                            |
                 +----------v----------+
                 | Servo Motor Control |
                 | - Calibration      |
                 | - Treat Trajectory |
                 +----------+----------+
                            |
                 +----------v----------+
                 |                     |
          +------+  Treat Receptacle   +-----+
          |      |                     |     |
          |      +---------------------+     |
      \\   |                                  |   /
       \\  |             TREATS               |  /
        \\ |                                  | /
         \\|                                  |/
          *            Your Cat              *
    `,
    demoLink: 'https://meow.cafe',
    stressLevel: 3,
    techStack: [
      { name: 'Python', level: 4, comment: 'I speak fluent list comprehensions' },
      { name: 'AWS', level: 2, comment: 'I can break S3 buckets' },
      { name: 'Raspberry Pi', level: 3, comment: 'It\'s just Linux with more LEDs' },
      { name: 'IoT Protocols', level: 3, comment: 'MQTT or it didn\'t happen' }
    ],
    challenges: [
      { id: '42', title: 'GPIO pins hated my cat\'s paw conductivity', status: 'CLOSED' },
      { id: '69', title: 'Treat catapult velocity calculations → fur on keyboard', status: 'WONTFIX' },
      { id: '101', title: 'Cat learned to hack the system by meowing at 3am', status: 'OPEN' }
    ]
  },
  'bad-ideas': {
    id: 'bad-ideas',
    title: 'npm install bad-ideas',
    overview: 'A React hook library for questionable life choices.',
    asciiArt: `
    +---------------------+        +---------------------+
    |                     |        |                     |
    |    React App        +------->+    bad-ideas        |
    |                     |        |    Hooks Library    |
    +---------------------+        +---------+-----------+
                                            |
                                            v
    +---------------------+        +---------------------+
    |                     |        |                     |
    |    Failed Code      |<-------+  useRegret()        |
    |    Reviews          |        |  useOverengineering()|
    |                     |        |  useCaffeine()      |
    +---------------------+        +---------------------+
    `,
    demoLink: 'https://bad-ideas.dev',
    stressLevel: 4,
    techStack: [
      { name: 'JavaScript', level: 5, comment: 'I\'ve seen things' },
      { name: 'React', level: 4, comment: 'Hooks, not crooks' },
      { name: 'TypeScript', level: 3, comment: 'Types are just suggestions' },
      { name: 'npm', level: 4, comment: 'node_modules weighs more than my cat' }
    ],
    challenges: [
      { id: '1', title: 'Context API overuse caused existential crises', status: 'PATCHED' },
      { id: '2', title: 'TypeScript types argued with my life choices', status: 'WONTFIX' },
      { id: '3', title: 'Dependency hell opened an actual portal to hell', status: 'OPEN' }
    ]
  }
};

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [retro, setRetro] = useState(false);
  const [catTaxVisible, setCatTaxVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Simulating a data fetch
    if (id && PROJECTS[id]) {
      setProject(PROJECTS[id]);
    }
    
    // Listen for terminal command inputs
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
        const input = e.target.value.trim().toLowerCase();
        if (input.includes('--cat-tax')) {
          setCatTaxVisible(true);
          toast({
            title: "🐱 Cat tax revealed!",
            description: "As per regulations, all devs must pay the cat tax.",
          });
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [id, toast]);

  if (!project) {
    return (
      <div className="container py-20">
        <Terminal 
          commands={[
            "cd ~/projects",
            "ls -la",
            "ERROR: Project not found",
            "Please check your URL and try again..."
          ]}
        />
        <Link to="/" className="link-hover block mt-8">
          <span className="font-mono">cd ..</span>
        </Link>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen transition-colors duration-300 ${
        retro ? 'bg-black text-highlight' : ''
      }`}
    >
      <CatScrollIndicator />
      
      <div className="container max-w-[40%] mx-auto py-16" ref={contentRef}>
        <Link to="/" className="link-hover block mb-8">
          <span className="font-mono">cd ..</span>
        </Link>
        
        <GlitchingTitle 
          title={project.title} 
          toggleRetro={() => setRetro(!retro)} 
        />
        
        <div className="my-8">
          <Terminal 
            commands={[project.overview]} 
            typing={true} 
            glitchProbability={0.05}
          />
        </div>
        
        <div className="my-12 font-mono text-xs md:text-sm overflow-x-auto whitespace-pre relative group">
          <pre className="bg-background/10 p-4 rounded-sm border border-border">
            {project.asciiArt}
          </pre>
          <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-2 right-4 text-xs bg-highlight text-foreground px-2 py-1 rounded">
            <span className="cursor-typing" data-text="I swear this diagram makes sense after coffee">|</span>
          </div>
        </div>
        
        <div className="wave-divider"></div>
        
        <div className="my-12">
          <h3 className="section-heading" data-section="tech-stack">Tech Stack</h3>
          <div className="space-y-4 mt-6">
            {project.techStack.map((tech, index) => (
              <ProjectSkillBar 
                key={index}
                name={tech.name}
                level={tech.level}
                comment={tech.comment}
              />
            ))}
          </div>
        </div>
        
        <div className="wave-divider"></div>
        
        <div className="my-12">
          <h3 className="section-heading" data-section="challenges">Challenges</h3>
          <div className="space-y-4 mt-6">
            {project.challenges.map((challenge) => (
              <ChallengeItem 
                key={challenge.id}
                id={challenge.id}
                title={challenge.title}
                status={challenge.status}
              />
            ))}
          </div>
        </div>
        
        <div className="wave-divider"></div>
        
        <div className="my-12">
          <h3 className="section-heading" data-section="stress-level">Stress Level</h3>
          <div className="flex space-x-px mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <span 
                key={i} 
                className={`inline-block text-center w-10 text-xl ${
                  i < project.stressLevel ? "animate-pulse-soft" : ""
                }`}
              >
                {i < project.stressLevel ? '🔥' : '☁️'}
              </span>
            ))}
            <span className="ml-3 text-sm font-mono self-center">
              ({project.stressLevel}/5)
            </span>
          </div>
        </div>
        
        <div className="wave-divider"></div>
        
        <div className="my-12">
          <h3 className="section-heading" data-section="demo">Live Demo</h3>
          <a 
            href={project.demoLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="link-hover font-mono inline-flex items-center group"
          >
            <span className="mr-2">🔗</span>
            <span>Try it → {new URL(project.demoLink).hostname}</span>
            <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
              (⚠️ Bring coffee)
            </span>
          </a>
        </div>
        
        {catTaxVisible && (
          <div className="my-12 p-4 border border-dashed border-highlight animate-fade-in">
            <h3 className="section-heading text-highlight">Cat Tax Paid</h3>
            <div className="font-mono text-center my-4">
              <pre className="inline-block text-center">
{`
 /\\_/\\  
( o.o ) 
 > ^ <
`}
              </pre>
              <p className="mt-4 text-sm">Your cat approves of this code.</p>
            </div>
          </div>
        )}
        
        <div className="mt-16 mb-8 text-center">
          <p className="text-xs font-mono text-softgray mb-2">
            Documentation? I prefer ✨ <em>tribal knowledge</em> ✨
          </p>
          <p className="text-xs font-mono text-softgray">
            Built with ☕ and questionable life choices
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
