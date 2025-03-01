import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import Terminal from './Terminal';
import useScrollProgress from '@/hooks/useScrollProgress';

interface ProjectDetailProps {
  title: string;
  purpose: string;
  techStack: { name: string; level: number; humorousLabel: string }[];
  challenges: { id: number; title: string; status: 'CLOSED' | 'OPEN' | 'WONTFIX' | 'PATCHED' }[];
  demoLink?: { emoji: string; url: string; warning?: string };
  className?: string;
  onClose: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({
  title,
  purpose,
  techStack,
  challenges,
  demoLink,
  className,
  onClose,
}) => {
  const [glitchTitle, setGlitchTitle] = useState(title);
  const [isGlitching, setIsGlitching] = useState(false);
  const [retroMode, setRetroMode] = useState(false);
  const [bugEmojis, setBugEmojis] = useState<{[key: string]: number}>(() => {
    try {
      const saved = localStorage.getItem('bugEmojis');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [showCursor, setShowCursor] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [annotation, setAnnotation] = useState('');
  const [catMode, setCatMode] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Get scroll progress
  const scrollProgress = useScrollProgress(containerRef);
  
  // Toggle cat mode for the progress bar every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCatMode(prev => !prev);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Generate ASCII art
  const asciiArt = `
    +---------------+
    |               |
    |  ${title.substring(0, 13).padEnd(13, ' ')}  |
    |               |     +----------+
    +-------+-------+     |          |
            |             | Backend  |
            v             |          |
    +---------------+     +-----+----+
    |               |           |
    |  Frontend     |<----------+
    |               |
    +---------------+
  `;

  // Handle title glitch effect
  const glitchTitleEffect = () => {
    if (isGlitching) return;
    
    setIsGlitching(true);
    
    // Run glitch animation for 500ms
    let iterations = 0;
    const maxIterations = 5;
    const interval = setInterval(() => {
      const chars = title.split('');
      
      // Randomly swap some characters
      for (let i = 0; i < Math.floor(title.length / 3); i++) {
        const idx1 = Math.floor(Math.random() * title.length);
        const idx2 = Math.floor(Math.random() * title.length);
        
        [chars[idx1], chars[idx2]] = [chars[idx2], chars[idx1]];
      }
      
      setGlitchTitle(chars.join(''));
      
      iterations++;
      if (iterations >= maxIterations) {
        clearInterval(interval);
        setGlitchTitle(title);
        setIsGlitching(false);
      }
    }, 100);
  };

  // Handle triple click on title
  useEffect(() => {
    const titleElement = titleRef.current;
    if (!titleElement) return;
    
    let clickCount = 0;
    let clickTimer: number | null = null;
    
    const handleClick = () => {
      clickCount++;
      
      if (clickTimer) {
        window.clearTimeout(clickTimer);
      }
      
      if (clickCount === 3) {
        setRetroMode(prev => !prev);
        clickCount = 0;
      } else {
        // Reset click count after 500ms
        clickTimer = window.setTimeout(() => {
          clickCount = 0;
        }, 500);
      }
    };
    
    titleElement.addEventListener('click', handleClick);
    
    return () => {
      titleElement.removeEventListener('click', handleClick);
      if (clickTimer) window.clearTimeout(clickTimer);
    };
  }, []);
  
  // Handle Alt+click for bug emojis
  useEffect(() => {
    const handleAltClick = (e: MouseEvent) => {
      if (e.altKey && e.target instanceof HTMLElement) {
        const isHeader = e.target.tagName.match(/^H[1-6]$/i) || 
                          e.target.closest('h1, h2, h3, h4, h5, h6');
        
        if (isHeader) {
          const headerId = (e.target.id || e.target.innerText).substring(0, 10);
          setBugEmojis(prev => {
            const newBugs = { 
              ...prev, 
              [headerId]: (prev[headerId] || 0) + 1 
            };
            
            // Save to localStorage
            localStorage.setItem('bugEmojis', JSON.stringify(newBugs));
            return newBugs;
          });
        }
      }
    };
    
    document.addEventListener('click', handleAltClick);
    
    return () => {
      document.removeEventListener('click', handleAltClick);
    };
  }, []);
  
  // Handle cursor for code snippets
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const codeBlocks = container.querySelectorAll('pre, code, .tech-bar');
    
    const handleMouseEnter = (e: MouseEvent) => {
      setShowCursor(true);
      
      const target = e.currentTarget as HTMLElement;
      const annotations = [
        "/* This took 3 days */",
        "// Don't touch this",
        "/* It works but I don't know why */",
        "// Magic happens here",
        "/* Refactor someday™ */",
        "// Here be dragons"
      ];
      
      setAnnotation(annotations[Math.floor(Math.random() * annotations.length)]);
    };
    
    const handleMouseLeave = () => {
      setShowCursor(false);
      setAnnotation('');
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setCursorPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };
    
    codeBlocks.forEach(block => {
      block.addEventListener('mouseenter', handleMouseEnter as EventListener);
      block.addEventListener('mouseleave', handleMouseLeave);
      block.addEventListener('mousemove', handleMouseMove as EventListener);
    });
    
    return () => {
      codeBlocks.forEach(block => {
        block.removeEventListener('mouseenter', handleMouseEnter as EventListener);
        block.removeEventListener('mouseleave', handleMouseLeave);
        block.removeEventListener('mousemove', handleMouseMove as EventListener);
      });
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  // Handle hidden cat tax flag
  const [showCatTax, setShowCatTax] = useState(false);
  
  useEffect(() => {
    let keysPressed: {[key: string]: boolean} = {};
    
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed[e.key] = true;
      
      // Check for "--cat-tax" sequence
      if (keysPressed['-'] && 
          keysPressed['c'] && 
          keysPressed['a'] && 
          keysPressed['t'] && 
          keysPressed['t'] && 
          keysPressed['a'] && 
          keysPressed['x']) {
        setShowCatTax(true);
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      delete keysPressed[e.key];
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
        className
      )}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Scroll Progress Indicator */}
      <div 
        className={cn(
          "project-detail-progress", 
          catMode && "cat-mode"
        )}
        style={{ width: `${scrollProgress}%` }}
      />
      
      <div 
        ref={containerRef}
        className={cn(
          "project-detail w-[90%] h-[90vh] mx-auto overflow-y-auto p-6 md:p-10 relative",
          "border border-border rounded-sm",
          "animate-fade-in",
          retroMode && "bg-black text-green-500"
        )}
        style={{ 
          maxWidth: "calc(100% - 60%)", 
          marginLeft: "30%", 
          marginRight: "30%" 
        }}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 hover:opacity-70"
          aria-label="Close project details"
        >
          <span className="font-mono text-lg">[ x ]</span>
        </button>
        
        {/* Project Title */}
        <div className="mb-8 relative">
          <h2 
            ref={titleRef}
            className={cn(
              "font-mono text-2xl md:text-3xl font-bold relative cursor-pointer",
              isGlitching && "animate-pulse-soft",
              retroMode && "text-green-500"
            )}
            onMouseEnter={glitchTitleEffect}
            onMouseLeave={() => {
              if (isGlitching) {
                setIsGlitching(false);
                setGlitchTitle(title);
              }
            }}
          >
            {glitchTitle}
          </h2>
          {Object.entries(bugEmojis).map(([key, count]) => (
            title.includes(key) && (
              <span key={key} className="ml-2 text-sm">
                {"🐛".repeat(count)}
              </span>
            )
          ))}
          {retroMode && (
            <span className="absolute -left-6 top-0 text-green-500 opacity-70">
              &gt;
            </span>
          )}
        </div>
        
        {/* Purpose */}
        <div className="mb-8">
          <Terminal 
            commands={[
              `./launch --project --purpose="${purpose}"`,
            ]}
            className={cn(
              "w-full rounded-sm",
              retroMode && "bg-black text-green-500"
            )}
          />
        </div>
        
        {/* ASCII Architecture */}
        <div className="mb-8">
          <h3 className={cn(
            "font-mono text-lg mb-4",
            retroMode && "text-green-500"
          )}>
            Architecture
          </h3>
          <pre className={cn(
            "bg-black/5 p-4 rounded-sm text-sm overflow-x-auto whitespace-pre font-mono",
            retroMode && "bg-black text-green-500 border border-green-500/30"
          )}>
            {asciiArt}
          </pre>
        </div>
        
        {/* Tech Stack */}
        <div className="mb-8">
          <h3 className={cn(
            "font-mono text-lg mb-4",
            retroMode && "text-green-500"
          )}>
            Tech Stack
          </h3>
          <div className="space-y-3">
            {techStack.map((tech, index) => (
              <div key={index} className="tech-bar relative">
                <div className="flex justify-between items-center mb-1">
                  <span className={cn(
                    "font-mono text-sm",
                    retroMode && "text-green-500"
                  )}>
                    {tech.name + ':'}
                  </span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span 
                        key={i} 
                        className={cn(
                          "inline-block h-3 w-3 mx-0.5 text-xs", 
                          i < tech.level ? 
                            (retroMode ? "text-green-500" : "text-foreground") : 
                            (retroMode ? "text-green-900/30" : "text-softgray/30")
                        )}
                      >
                        ■
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className={cn(
                  "h-2 bg-muted/50 w-full relative overflow-hidden rounded-sm",
                  retroMode && "bg-green-900/20"
                )}>
                  <div 
                    className={cn(
                      "h-full absolute left-0 top-0",
                      retroMode ? "bg-green-500" : "bg-highlight"
                    )}
                    style={{ width: `${(tech.level / 5) * 100}%` }}
                  />
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "w-1/5 h-full absolute border-r",
                        retroMode ? "border-black" : "border-background"
                      )}
                      style={{ left: `${(i + 1) * 20}%` }}
                    />
                  ))}
                </div>
                
                <div className="mt-1">
                  <p className={cn(
                    "text-xs italic",
                    retroMode ? "text-green-500/70" : "text-softgray"
                  )}>
                    {`(${(tech.level / 5) * 100}% "${tech.humorousLabel}")`}
                  </p>
                </div>
                
                {showCursor && (
                  <div 
                    className="absolute font-mono text-xs text-highlight animate-blink"
                    style={{ 
                      left: `${cursorPosition.x + 10}px`, 
                      top: `${cursorPosition.y}px`,
                      color: retroMode ? '#22c55e' : ''
                    }}
                  >
                    |<span className="ml-1 opacity-80">{annotation}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Challenges */}
        <div className="mb-8">
          <h3 className={cn(
            "font-mono text-lg mb-4",
            retroMode && "text-green-500"
          )}>
            Challenges
          </h3>
          <ul className="space-y-2">
            {challenges.map((challenge) => (
              <li 
                key={challenge.id}
                className={cn(
                  "font-mono text-sm p-2 border-l-2",
                  retroMode ? "border-green-500 bg-black" : "border-highlight bg-black/5"
                )}
              >
                <span className={retroMode ? "text-green-500/80" : "text-softgray"}>
                  #{challenge.id}:
                </span>{" "}
                <span className={retroMode ? "text-green-500" : ""}>
                  "{challenge.title}"
                </span>{" "}
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded ml-2 inline-block",
                  challenge.status === 'CLOSED' && (retroMode ? "bg-green-900/30 text-green-500" : "bg-green-100 text-green-800"),
                  challenge.status === 'OPEN' && (retroMode ? "bg-yellow-900/30 text-yellow-500" : "bg-yellow-100 text-yellow-800"),
                  challenge.status === 'WONTFIX' && (retroMode ? "bg-blue-900/30 text-blue-500" : "bg-blue-100 text-blue-800"),
                  challenge.status === 'PATCHED' && (retroMode ? "bg-purple-900/30 text-purple-500" : "bg-purple-100 text-purple-800")
                )}>
                  [{challenge.status}]
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Demo Link */}
        {demoLink && (
          <div className="mb-8">
            <a 
              href={demoLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "font-mono text-lg group flex items-center",
                retroMode ? "text-green-500 hover:text-green-400" : "text-highlight hover:opacity-80"
              )}
            >
              <span className="underline underline-offset-4 mr-2">
                {demoLink.emoji} Demo
              </span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
              {demoLink.warning && (
                <span className={cn(
                  "ml-2 text-xs",
                  retroMode ? "text-green-500/70" : "text-softgray"
                )}>
                  ({demoLink.warning})
                </span>
              )}
            </a>
          </div>
        )}
        
        {/* Hidden Cat Tax */}
        {showCatTax && (
          <div className="fixed bottom-10 right-10 animate-fade-in bg-white p-2 border border-highlight rounded-sm">
            <p className="text-xs mb-1 font-mono">--cat-tax flag activated!</p>
            <pre className="text-xs font-mono">
              {`
  /\\_/\\
 ( o.o )
  > ^ <
              `}
            </pre>
            <button 
              onClick={() => setShowCatTax(false)}
              className="text-xs underline mt-1"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
