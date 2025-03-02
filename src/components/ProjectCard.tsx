
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { File, Folder } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  emojis: string[] | { icon: string; meaning: string }[];
  description: string;
  catReview: string;
  stressLevel: number; // 0-5
  className?: string;
  id: string; // Added project ID for routing
  subtitle?: string;
  techStack?: { name: string; level: number }[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  emojis,
  description,
  catReview,
  stressLevel,
  className,
  id,
  subtitle,
  techStack,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const stressEmojis = Array(5).fill('☁️').map((emoji, index) => index < stressLevel ? '🔥' : emoji);
  
  // Handle both simple emoji arrays and detailed emoji objects
  const formattedEmojis = emojis.map(emoji => 
    typeof emoji === 'string' ? { icon: emoji, meaning: '' } : emoji
  );

  return (
    <Link 
      to={`/project/${id}`}
      className={cn("project-card group block p-4 border border-border rounded-sm transition-all duration-300 hover:border-highlight", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <Folder className="w-4 h-4 mr-2 text-highlight" />
          <h3 className="font-mono text-lg font-medium">{title}</h3>
        </div>
        <div className="flex space-x-1">
          {formattedEmojis.map((emoji, index) => (
            <span 
              key={index} 
              className="transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 relative cursor-help"
              title={emoji.meaning}
            >
              {emoji.icon}
            </span>
          ))}
        </div>
      </div>
      
      {subtitle && (
        <p className="text-softgray text-xs mb-2 font-mono">{subtitle}</p>
      )}
      
      <p className="text-softgray text-sm mb-4">{description}</p>
      
      <div className={cn("transition-all duration-500 overflow-hidden", 
        isHovered ? "opacity-100 max-h-40" : "opacity-0 max-h-0")}>
        <div className="pt-3 border-t border-border/50">
          <p className="italic text-sm mb-2">"{catReview}" - Your cat</p>
          
          {techStack && techStack.length > 0 && (
            <div className="mt-2 mb-3">
              <div className="text-xs mb-1 font-mono">Tech Stack:</div>
              <div className="flex flex-wrap gap-1">
                {techStack.slice(0, 3).map((tech, index) => (
                  <span 
                    key={index}
                    className="text-xs bg-background/30 px-1.5 py-0.5 rounded-sm font-mono"
                  >
                    {tech.name}
                  </span>
                ))}
                {techStack.length > 3 && (
                  <span className="text-xs bg-background/30 px-1.5 py-0.5 rounded-sm font-mono">
                    +{techStack.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
          
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
    </Link>
  );
};

export default ProjectCard;
