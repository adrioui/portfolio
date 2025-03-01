
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ChallengeItemProps {
  id: string;
  title: string;
  status: 'OPEN' | 'CLOSED' | 'WONTFIX' | 'PATCHED';
  className?: string;
}

export const ChallengeItem: React.FC<ChallengeItemProps> = ({
  id,
  title,
  status,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getStatusColor = () => {
    switch (status) {
      case 'OPEN':
        return 'text-softgray';
      case 'CLOSED':
        return 'text-highlight';
      case 'WONTFIX':
        return 'text-destructive/70';
      case 'PATCHED':
        return 'text-green-500';
      default:
        return 'text-softgray';
    }
  };

  return (
    <div 
      className={cn(
        "font-mono text-sm border-l-2 pl-3 py-1 transition-all duration-300",
        isHovered ? "border-highlight" : "border-border",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-softgray">#{id}:</span>
        <span>"{title}"</span>
        <span className={cn("text-xs ml-auto px-2 py-0.5 rounded-sm border", getStatusColor())}>
          [{status}]
        </span>
      </div>
    </div>
  );
};
