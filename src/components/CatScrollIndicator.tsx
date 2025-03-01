
import React, { useState, useEffect } from 'react';

export const CatScrollIndicator: React.FC = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [isCatChasing, setIsCatChasing] = useState(false);
  const [catPosition, setCatPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const newScrollPercent = scrollTop / docHeight;
      setScrollPercent(newScrollPercent);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const newMouseX = (e.clientX / window.innerWidth) * 100;
      setMouseX(newMouseX);
      
      // Only chase the cursor when it's more than 10% away from the cat
      if (Math.abs(newMouseX - catPosition.x) > 10) {
        setIsCatChasing(true);
      } else {
        setIsCatChasing(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [catPosition.x]);

  // Update cat position to follow mouse with delay
  useEffect(() => {
    if (isCatChasing) {
      const chaseInterval = setInterval(() => {
        setCatPosition(prev => {
          const direction = prev.x < mouseX ? 1 : -1;
          return { 
            x: prev.x + direction * 2,
            y: scrollPercent * 100
          };
        });
      }, 50);

      return () => clearInterval(chaseInterval);
    }
  }, [isCatChasing, mouseX, scrollPercent]);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-border z-50">
      <div 
        className="h-full bg-highlight"
        style={{ width: `${scrollPercent * 100}%` }}
      >
        <div
          className="absolute font-mono text-xs transition-all duration-300"
          style={{ 
            left: `${catPosition.x}%`,
            top: '0px',
            transform: `translateX(-50%) ${isCatChasing ? 'scale(1.2)' : 'scale(1)'}`,
            animation: isCatChasing ? 'wiggle 0.5s infinite' : 'none'
          }}
        >
          🐈
        </div>
      </div>
    </div>
  );
};
