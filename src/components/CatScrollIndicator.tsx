
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CatScrollIndicatorProps {
  className?: string;
}

const CatScrollIndicator: React.FC<CatScrollIndicatorProps> = ({ className }) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [catPosition, setCatPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = (scrollTop / scrollHeight) * 100;
      setScrollPercentage(percentage || 0);
      setCatPosition(percentage || 0);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: e.clientY,
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Make cat chase the mouse when close to progress bar
  useEffect(() => {
    const shouldChase = Math.abs(mousePosition.x - catPosition) < 20;
    
    if (shouldChase) {
      const timeout = setTimeout(() => {
        setCatPosition(prev => {
          const newPos = prev + (mousePosition.x > prev ? 2 : -2);
          return Math.max(0, Math.min(100, newPos));
        });
      }, 50);
      
      return () => clearTimeout(timeout);
    }
  }, [mousePosition, catPosition]);

  return (
    <div className={cn("fixed bottom-0 left-0 right-0 h-1 bg-border", className)}>
      <div 
        className="h-full bg-highlight relative" 
        style={{ width: `${scrollPercentage}%` }}
      >
        <div 
          className="absolute top-[-12px] text-sm transition-all duration-75"
          style={{ left: `${catPosition}%` }}
        >
          🐈
        </div>
      </div>
    </div>
  );
};

export default CatScrollIndicator;
