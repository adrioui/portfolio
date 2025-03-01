
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ProjectSkillBarProps {
  name: string;
  level: number; // 1-5
  comment: string;
  className?: string;
}

export const ProjectSkillBar: React.FC<ProjectSkillBarProps> = ({
  name,
  level,
  comment,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const skillRef = useRef<HTMLDivElement>(null);
  
  const percentage = (level / 5) * 100;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (skillRef.current) {
      observer.observe(skillRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={skillRef}
      className={cn("group", className)}
      onMouseEnter={() => setShowComment(true)}
      onMouseLeave={() => setShowComment(false)}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="font-mono text-sm">{name}</span>
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <span 
              key={i} 
              className={cn(
                "inline-block h-3 w-3 mx-0.5 text-xs", 
                i < level ? "text-foreground" : "text-softgray/30"
              )}
            >
              ■
            </span>
          ))}
        </div>
      </div>
      
      <div className="skill-bar">
        <div 
          className="skill-bar-fill"
          style={{ 
            width: isVisible ? `${percentage}%` : '0%',
            transition: isVisible ? 'width 1s cubic-bezier(0.65, 0, 0.35, 1)' : 'none',
          }}
        />
        {Array.from({ length: 5 }).map((_, i) => (
          <div 
            key={i} 
            className="skill-segment" 
            style={{ left: `${(i + 1) * 20}%` }}
          />
        ))}
      </div>
      
      <div className={cn(
        "overflow-hidden transition-all duration-300 mt-1",
        showComment ? "max-h-8 opacity-100" : "max-h-0 opacity-0"
      )}>
        <p className="text-xs italic text-softgray">"{comment}"</p>
      </div>
    </div>
  );
};
