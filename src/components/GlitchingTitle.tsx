
import React, { useState, useEffect, useRef } from 'react';

interface GlitchingTitleProps {
  title: string;
  toggleRetro: () => void;
}

export const GlitchingTitle: React.FC<GlitchingTitleProps> = ({ title, toggleRetro }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [displayTitle, setDisplayTitle] = useState(title);
  const [bugEmojis, setBugEmojis] = useState<{[key: string]: number}>({});
  const titleRef = useRef<HTMLHeadingElement>(null);
  const clickCount = useRef(0);
  const clickTimer = useRef<NodeJS.Timeout | null>(null);

  // Load bug emojis from localStorage
  useEffect(() => {
    const storedBugs = localStorage.getItem(`bugs-${title}`);
    if (storedBugs) {
      setBugEmojis(JSON.parse(storedBugs));
    }
  }, [title]);

  // Handle triple click
  useEffect(() => {
    const handleClick = () => {
      clickCount.current += 1;
      
      if (clickTimer.current) {
        clearTimeout(clickTimer.current);
      }
      
      clickTimer.current = setTimeout(() => {
        if (clickCount.current >= 3) {
          toggleRetro();
        }
        clickCount.current = 0;
      }, 500);
    };
    
    const titleElement = titleRef.current;
    if (titleElement) {
      titleElement.addEventListener('click', handleClick);
    }
    
    return () => {
      if (titleElement) {
        titleElement.removeEventListener('click', handleClick);
      }
      if (clickTimer.current) {
        clearTimeout(clickTimer.current);
      }
    };
  }, [toggleRetro]);

  // Alt + click handler for adding bug emojis
  useEffect(() => {
    const handleAltClick = (e: MouseEvent) => {
      if (e.altKey && titleRef.current?.contains(e.target as Node)) {
        e.preventDefault();
        
        const newBugs = { ...bugEmojis };
        const key = `bug-${Object.keys(bugEmojis).length}`;
        newBugs[key] = (newBugs[key] || 0) + 1;
        
        setBugEmojis(newBugs);
        localStorage.setItem(`bugs-${title}`, JSON.stringify(newBugs));
      }
    };
    
    document.addEventListener('click', handleAltClick);
    return () => document.removeEventListener('click', handleAltClick);
  }, [bugEmojis, title]);

  // Glitch effect
  const handleMouseEnter = () => {
    setIsGlitching(true);
    
    const glitchInterval = setInterval(() => {
      if (!isGlitching) {
        clearInterval(glitchInterval);
        setDisplayTitle(title);
        return;
      }
      
      // Create a glitched version of the title
      let glitchedTitle = '';
      const chars = title.split('');
      
      for (let i = 0; i < chars.length; i++) {
        // 30% chance to swap with adjacent character
        if (Math.random() < 0.3 && i < chars.length - 1) {
          const temp = chars[i];
          chars[i] = chars[i + 1];
          chars[i + 1] = temp;
        }
        
        // 10% chance to replace with a random character
        if (Math.random() < 0.1) {
          const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
          chars[i] = randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        
        glitchedTitle += chars[i];
      }
      
      setDisplayTitle(glitchedTitle);
    }, 50);
    
    // Stop glitching after 0.5 seconds
    setTimeout(() => {
      clearInterval(glitchInterval);
      setIsGlitching(false);
      setDisplayTitle(title);
    }, 500);
  };

  return (
    <div className="relative">
      <h1 
        ref={titleRef}
        className="font-mono text-3xl md:text-4xl font-bold cursor-pointer"
        onMouseEnter={handleMouseEnter}
        title="Triple-click for retro mode! Hold Alt+click to add bugs!"
      >
        {displayTitle}
      </h1>
      
      {/* Bug emojis */}
      <div className="absolute top-0 right-0 flex flex-wrap max-w-[50%] justify-end">
        {Object.keys(bugEmojis).map((key) => (
          <span key={key} className="text-lg animate-float ml-1">🐛</span>
        ))}
      </div>
    </div>
  );
};
