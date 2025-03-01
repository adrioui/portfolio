
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  title: string;
  emojis: string[];
  description: string;
  catReview: string;
  stressLevel: number; // 0-5
  className?: string;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  emojis,
  description,
  catReview,
  stressLevel,
  className,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const stressEmojis = Array(5).fill('☁️').map((emoji, index) => index < stressLevel ? '🔥' : emoji);

  return (
    <div 
      className={cn("project-card group mx-auto cursor-pointer", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-mono text-lg font-medium">{title}</h3>
        <div className="flex space-x-1">
          {emojis.map((emoji, index) => (
            <span key={index} className="transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              {emoji}
            </span>
          ))}
        </div>
      </div>
      
      <p className="text-softgray text-sm mb-4">{description}</p>
      
      <div className={cn("transition-all duration-500 overflow-hidden", 
        isHovered ? "opacity-100 max-h-24" : "opacity-0 max-h-0")}>
        <div className="pt-3 border-t border-border/50">
          <p className="italic text-sm mb-2">"{catReview}" - Your cat</p>
          
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Stress Level:</span>
              <span className="font-mono">{stressLevel}/5</span>
            </div>
            <div className="flex space-x-px">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
