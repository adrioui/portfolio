import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Terminal from '@/components/Terminal';
import { ProjectSkillBar } from '@/components/ProjectSkillBar';
import { GlitchingTitle } from '@/components/GlitchingTitle';
import { ChallengeItem } from '@/components/ChallengeItem';
import { CatScrollIndicator } from '@/components/CatScrollIndicator';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ProjectData, PROJECTS } from '@/data/projectDetail';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [retro, setRetro] = useState(false);
  const [catTaxVisible, setCatTaxVisible] = useState(false);
  const [expandedChallenges, setExpandedChallenges] = useState<Record<string, boolean>>({});
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (id && PROJECTS[id]) {
      setProject(PROJECTS[id]);
      
      const initialExpandedState: Record<string, boolean> = {};
      PROJECTS[id].challenges.forEach(challenge => {
        initialExpandedState[challenge.id] = false;
      });
      setExpandedChallenges(initialExpandedState);
    }
    
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

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.shiftKey && e.target instanceof HTMLElement) {
        const element = e.target.closest('[data-caffeine]');
        if (element) {
          const caffeineLevel = element.getAttribute('data-caffeine');
          toast({
            title: "☕ Caffeine converted!",
            description: `That's approximately ${Number(caffeineLevel) * 2.5} hours of sleep lost.`,
          });
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleKeyPress);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleKeyPress);
    };
  }, [id, toast]);

  const toggleChallenge = (challengeId: string) => {
    setExpandedChallenges(prev => ({
      ...prev,
      [challengeId]: !prev[challengeId]
    }));
  };

  const copySnippet = (name: string, snippet: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedSnippet(name);
    toast({
      title: "📋 Copied to clipboard!",
      description: `${name} snippet is ready to paste.`,
    });
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const handleTitleDoubleClick = () => {
    toast({
      title: "🖼��� ASCII art revealed!",
      description: "Behold, the architectural masterpiece!",
    });
  };

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
      
      <div className="container max-w-[70%] mx-auto py-16 px-4 md:max-w-[60%] lg:max-w-[50%]" ref={contentRef}>
        <Link to="/" className="link-hover block mb-8">
          <span className="font-mono">cd ..</span>
        </Link>
        
        <div onDoubleClick={handleTitleDoubleClick}>
          <GlitchingTitle 
            title={project.title} 
            toggleRetro={() => setRetro(!retro)} 
          />
        </div>
        
        <p className="text-softgray text-lg md:text-xl mb-6 font-mono">
          {project.subtitle}
        </p>
        
        <div className="flex flex-wrap gap-3 mb-8">
          {project.emojis.map((emoji, index) => (
            <div 
              key={index} 
              className="relative group cursor-help"
              aria-label={`${emoji.icon} - ${emoji.meaning}`}
            >
              <span className="text-2xl">{emoji.icon}</span>
              <div className="absolute bottom-full mb-2 bg-background border border-border px-3 py-1 rounded-sm text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {emoji.meaning}
              </div>
            </div>
          ))}
        </div>
        
        <div className="my-8 p-4 bg-background/5 border border-border rounded-sm">
          <h3 className="text-sm font-mono text-softgray mb-3">Key Metrics:</h3>
          <div className="flex flex-wrap gap-6">
            {project.metrics.map((metric, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-xs font-mono text-softgray">{metric.label}</span>
                <div className="text-lg font-mono cursor-help">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        </div>
        
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
          <h3 className="section-heading" data-section="problems-solutions">Problems & Solutions</h3>
          <div className="space-y-4 mt-6">
            {project.problems.map((item, index) => (
              <div key={index} className="grid grid-cols-[auto_1fr] gap-4 p-3 border-l-2 border-border hover:border-highlight transition-colors">
                <div className="text-softgray">❗</div>
                <div className="font-mono text-sm">{item.issue}</div>
                <div className="text-highlight">✔️</div>
                <div className="font-mono text-sm">{item.solution}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="wave-divider"></div>
        
        <div className="my-12">
          <h3 className="section-heading" data-section="tech-stack">Tech Stack</h3>
          <div className="space-y-4 mt-6">
            {project.techStack.map((tech, index) => (
              <div key={index} className="relative">
                <ProjectSkillBar 
                  name={tech.name}
                  level={tech.level}
                  comment={tech.comment}
                />
                {tech.snippet && (
                  <div 
                    className={`mt-2 p-2 bg-background/10 border border-border rounded-sm font-mono text-xs cursor-pointer transition-transform hover:scale-[1.01] hover:border-highlight ${
                      copiedSnippet === tech.name ? 'border-highlight' : ''
                    }`}
                    onClick={() => copySnippet(tech.name, tech.snippet || '')}
                    aria-label={`Copy ${tech.name} snippet`}
                  >
                    <div className="flex justify-between items-start">
                      <code className="block pr-6">{tech.snippet}</code>
                      <span className="text-xs flex-shrink-0">
                        {copiedSnippet === tech.name ? '✓' : '📋'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="wave-divider"></div>
        
        <div className="my-12">
          <h3 className="section-heading" data-section="challenges">Challenges</h3>
          <div className="space-y-4 mt-6">
            {project.challenges.map((challenge) => (
              <div key={challenge.id} className="space-y-2">
                <div 
                  onClick={() => toggleChallenge(challenge.id)}
                  className="cursor-pointer"
                >
                  <ChallengeItem 
                    id={challenge.id}
                    title={challenge.title}
                    status={challenge.status}
                  />
                </div>
                {expandedChallenges[challenge.id] && challenge.description && (
                  <div className="ml-5 pl-3 border-l border-border py-2 font-mono text-xs text-softgray animate-fade-in">
                    {challenge.description}
                  </div>
                )}
              </div>
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
        
        {/* <div className="my-12">
          <h3 className="section-heading" data-section="demo">Live Demo</h3>
          <a 
            href={project.demoLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="link-hover font-mono inline-flex items-center group relative"
            aria-label={`Live demo at ${new URL(project.demoLink).hostname}`}
          >
            <span className="mr-2 transition-all duration-300 group-hover:scale-0 group-hover:opacity-0">🔗</span>
            <span className="group-hover:ml-4 transition-all duration-300">
              Try it 
              <span className="inline-block transition-all duration-300 group-hover:translate-x-1">→</span> 
              {new URL(project.demoLink).hostname}
            </span>
            <span className="absolute left-0 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
              🎬
            </span>
            <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
              (⚠️ Bring coffee)
            </span>
          </a>
        </div> */}
        
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
