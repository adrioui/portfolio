import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import Terminal from '@/components/Terminal';

interface TechStack {
  name: string;
  level: number;
  quote: string;
}

interface Challenge {
  id: number;
  title: string;
  status: 'OPEN' | 'CLOSED' | 'WONTFIX' | 'PATCHED';
}

interface ProjectDetailProps {
  title: string;
  overview: string;
  techStack: TechStack[];
  challenges: Challenge[];
  demoLink?: {
    url: string;
    label: string;
  };
  asciiArt: string;
  className?: string;
  stressLevel: number;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({
  title,
  overview,
  techStack,
  challenges,
  demoLink,
  asciiArt,
  className,
  stressLevel,
}) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [displayTitle, setDisplayTitle] = useState(title);
  const [retro, setRetro] = useState(false);
  const [titleClicks, setTitleClicks] = useState(0);
  const [headerBugs, setHeaderBugs] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('header-bugs');
    return saved ? JSON.parse(saved) : {};
  });
  const [showCatTax, setShowCatTax] = useState(false);
  const [activeCursorIndex, setActiveCursorIndex] = useState<number | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!isGlitching) return;
    
    const originalTitle = title;
    const glitchInterval = setInterval(() => {
      const chars = originalTitle.split('');
      for (let i = 0; i < Math.min(3, chars.length / 3); i++) {
        const idx1 = Math.floor(Math.random() * chars.length);
        const idx2 = Math.floor(Math.random() * chars.length);
        [chars[idx1], chars[idx2]] = [chars[idx2], chars[idx1]];
      }
      setDisplayTitle(chars.join(''));
    }, 50);
    
    const timeout = setTimeout(() => {
      clearInterval(glitchInterval);
      setDisplayTitle(originalTitle);
      setIsGlitching(false);
    }, 500);
    
    return () => {
      clearInterval(glitchInterval);
      clearTimeout(timeout);
    };
  }, [isGlitching, title]);

  useEffect(() => {
    if (titleClicks === 3) {
      setRetro(prev => !prev);
      setTitleClicks(0);
    }
  }, [titleClicks]);

  useEffect(() => {
    localStorage.setItem('header-bugs', JSON.stringify(headerBugs));
  }, [headerBugs]);

  const handleTitleClick = () => {
    setTitleClicks(prev => prev + 1);
    
    setTimeout(() => {
      setTitleClicks(0);
    }, 500);
  };

  const handleHeaderAltClick = (headerId: string) => (e: React.MouseEvent) => {
    if (e.altKey) {
      setHeaderBugs(prev => ({
        ...prev,
        [headerId]: (prev[headerId] || 0) + 1
      }));
    }
  };

  const stressEmojis = Array(5).fill('☁️').map((emoji, index) => index < stressLevel ? '🔥' : emoji);

  useEffect(() => {
    if (overview.includes('--cat-tax')) {
      setShowCatTax(true);
    }
  }, [overview]);

  return (
    <div className={cn(
      "project-detail max-w-3xl mx-auto py-10 px-4 font-mono",
      retro && "bg-black text-green-400",
      className
    )}>
      <h1 
        ref={titleRef}
        className={cn(
          "text-3xl font-bold mb-8 inline-block cursor-pointer", 
          retro ? "text-green-400" : "text-highlight"
        )}
        onMouseEnter={() => setIsGlitching(true)}
        onClick={handleTitleClick}
      >
        {displayTitle}
      </h1>
      
      <div className="mb-10">
        <h2 
          className="text-xl mb-3 font-bold" 
          onClick={handleHeaderAltClick('overview')}
        >
          Overview {headerBugs['overview'] ? '🐛'.repeat(headerBugs['overview']) : ''}
        </h2>
        <Terminal
          commands={[overview]}
          className={cn(retro ? "bg-black border border-green-400" : "bg-black/5")}
        />
      </div>
      
      <div className="mb-10">
        <h2 
          className="text-xl mb-3 font-bold"
          onClick={handleHeaderAltClick('architecture')}
        >
          Architecture {headerBugs['architecture'] ? '🐛'.repeat(headerBugs['architecture']) : ''}
        </h2>
        <pre 
          className={cn(
            "text-xs sm:text-sm p-4 overflow-x-auto font-mono rounded-sm",
            retro ? "bg-black border border-green-400" : "bg-black/5"
          )}
        >
          {asciiArt}
        </pre>
      </div>
      
      <div className="mb-10">
        <h2 
          className="text-xl mb-3 font-bold"
          onClick={handleHeaderAltClick('tech')}
        >
          Tech Stack {headerBugs['tech'] ? '🐛'.repeat(headerBugs['tech']) : ''}
        </h2>
        <div className="space-y-4">
          {techStack.map((tech, index) => (
            <div key={index} className="pb-2">
              <div className="flex justify-between text-sm mb-1">
                <span>{tech.name}:</span>
                <span>{tech.level * 20}%</span>
              </div>
              <div 
                className="skill-bar"
                onMouseEnter={() => setActiveCursorIndex(index)}
                onMouseLeave={() => setActiveCursorIndex(null)}
              >
                <div 
                  className={cn("skill-bar-fill", retro ? "bg-green-400" : "bg-highlight")} 
                  style={{ width: `${tech.level * 20}%` }}
                >
                  {Array(5).fill(0).map((_, i) => (
                    <div key={i} className="skill-segment" style={{ left: `${i * 20}%` }}></div>
                  ))}
                </div>
              </div>
              <div className="mt-1 text-xs italic relative h-5">
                {activeCursorIndex === index ? (
                  <span className="animate-typing">
                    "{tech.quote}"<span className="animate-blink">|</span>
                  </span>
                ) : (
                  <span>"{tech.quote}"</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-10">
        <h2 
          className="text-xl mb-3 font-bold"
          onClick={handleHeaderAltClick('challenges')}
        >
          Challenges {headerBugs['challenges'] ? '🐛'.repeat(headerBugs['challenges']) : ''}
        </h2>
        <div className="space-y-3">
          {challenges.map((challenge) => (
            <div 
              key={challenge.id} 
              className={cn(
                "p-3 rounded-sm",
                retro 
                  ? "border border-green-400/50" 
                  : "bg-black/5 hover:bg-black/10 transition-colors"
              )}
            >
              <div className="flex justify-between items-start">
                <span className="text-sm">
                  #{challenge.id}: "{challenge.title}"
                </span>
                <span 
                  className={cn(
                    "text-xs px-2 py-0.5 rounded",
                    retro 
                      ? challenge.status === 'CLOSED' || challenge.status === 'PATCHED' 
                        ? "text-green-400" 
                        : "text-yellow-400"
                      : challenge.status === 'CLOSED' || challenge.status === 'PATCHED' 
                        ? "text-green-500" 
                        : "text-highlight"
                  )}
                >
                  [{challenge.status}]
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-10">
        <h2 
          className="text-xl mb-3 font-bold"
          onClick={handleHeaderAltClick('stress')}
        >
          Stress Level {headerBugs['stress'] ? '🐛'.repeat(headerBugs['stress']) : ''}
        </h2>
        <div className="flex space-x-px mb-2">
          {stressEmojis.map((emoji, index) => (
            <span 
              key={index} 
              className={cn(
                "inline-block text-center w-1/5", 
                index < stressLevel ? "animate-pulse-soft" : ""
              )}
            >
              {emoji}
            </span>
          ))}
        </div>
        <div className="text-xs italic">
          {stressLevel > 3 ? "Consider therapy." : "Still maintaining sanity."}
        </div>
      </div>
      
      {demoLink && (
        <div className="mb-10">
          <h2 
            className="text-xl mb-3 font-bold"
            onClick={handleHeaderAltClick('demo')}
          >
            Live Demo {headerBugs['demo'] ? '🐛'.repeat(headerBugs['demo']) : ''}
          </h2>
          <a 
            href={demoLink.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={cn(
              "text-lg link-hover inline-flex items-center", 
              retro ? "text-green-400" : "text-highlight"
            )}
          >
            🔗 {demoLink.label}
          </a>
        </div>
      )}
      
      {showCatTax && (
        <div className="mt-10 p-4 border border-dashed rounded-sm">
          <h2 className="text-lg mb-2">🐱 Cat Tax Unlocked!</h2>
          <div className="font-mono text-xs text-center">
            {`
              /\\_/\\
             ( o.o )
              > ^ <
            `}
          </div>
          <p className="text-xs text-center mt-2 italic">
            "You found the cat tax! Meow!"
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
