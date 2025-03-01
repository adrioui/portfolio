
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SkillBarProps {
  name: string;
  level: number; // 0-5
  humorousLabel: string;
  className?: string;
  animateOnView?: boolean;
}

const SkillBar: React.FC<SkillBarProps> = ({
  name,
  level,
  humorousLabel,
  className,
  animateOnView = true,
}) => {
  const [isVisible, setIsVisible] = useState(!animateOnView);
  const [showLabel, setShowLabel] = useState(false);
  const skillRef = useRef<HTMLDivElement>(null);
  
  const percentage = (level / 5) * 100;

  useEffect(() => {
    if (!animateOnView) return;
    
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
  }, [animateOnView]);

  return (
    <div 
      ref={skillRef}
      className={cn("mb-4 mx-auto max-w-md", className)}
      onMouseEnter={() => setShowLabel(true)}
      onMouseLeave={() => setShowLabel(false)}
    >
      <div className="flex justify-between items-center mb-2">
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
        showLabel ? "max-h-8 opacity-100" : "max-h-0 opacity-0"
      )}>
        <p className="text-xs italic text-softgray">{humorousLabel}</p>
      </div>
    </div>
  );
};

export default SkillBar;
