
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TerminalProps {
  className?: string;
  commands?: string[];
  typing?: boolean;
  glitchProbability?: number;
  typingSpeed?: number;
  initialDelay?: number;
}

const Terminal: React.FC<TerminalProps> = ({
  className,
  commands = [],
  typing = true,
  glitchProbability = 0.03,
  typingSpeed = 30,
  initialDelay = 500,
}) => {
  const [displayedCommands, setDisplayedCommands] = useState<string[]>([]);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchedChar, setGlitchedChar] = useState("");

  useEffect(() => {
    // Blink cursor
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (!typing || commands.length === 0 || currentCommandIndex >= commands.length) return;

    const timer = setTimeout(() => {
      if (currentTextIndex === 0) {
        // Initialize with empty string when starting a new command
        setDisplayedCommands((prev) => {
          const newCommands = [...prev];
          newCommands[currentCommandIndex] = "";
          return newCommands;
        });
      }

      const currentCommand = commands[currentCommandIndex];
      
      // Check for glitch
      const shouldGlitch = Math.random() < glitchProbability && currentTextIndex > 0;
      
      if (shouldGlitch && !isGlitching) {
        setIsGlitching(true);
        
        // Generate a random wrong character
        const possibleChars = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";
        const randomChar = possibleChars[Math.floor(Math.random() * possibleChars.length)];
        setGlitchedChar(randomChar);
        
        // Add the wrong character temporarily
        setDisplayedCommands((prev) => {
          const newCommands = [...prev];
          newCommands[currentCommandIndex] = currentCommand.substring(0, currentTextIndex) + randomChar;
          return newCommands;
        });
        
        // Schedule deletion of wrong character
        setTimeout(() => {
          setDisplayedCommands((prev) => {
            const newCommands = [...prev];
            newCommands[currentCommandIndex] = currentCommand.substring(0, currentTextIndex);
            return newCommands;
          });
          
          // Wait a bit before continuing with the correct character
          setTimeout(() => {
            setIsGlitching(false);
          }, 100);
        }, 200);
        
        return;
      }
      
      if (isGlitching) return;

      if (currentTextIndex < currentCommand.length) {
        setDisplayedCommands((prev) => {
          const newCommands = [...prev];
          newCommands[currentCommandIndex] = currentCommand.substring(0, currentTextIndex + 1);
          return newCommands;
        });
        setCurrentTextIndex(currentTextIndex + 1);
      } else {
        // Move to next command after a pause
        setTimeout(() => {
          setCurrentCommandIndex(currentCommandIndex + 1);
          setCurrentTextIndex(0);
        }, 1000);
      }
    }, currentTextIndex === 0 ? initialDelay : typingSpeed);

    return () => clearTimeout(timer);
  }, [currentTextIndex, currentCommandIndex, commands, typing, glitchProbability, typingSpeed, initialDelay, isGlitching]);

  return (
    <div className={cn("bg-black rounded-md overflow-hidden", className)}>
      {/* Terminal top bar with colored dots */}
      <div className="bg-black px-4 py-2 border-b border-gray-800 flex items-center">
        <div className="flex gap-2 items-center">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-gray-500 text-sm ml-4 font-mono">terminal</div>
      </div>
      
      {/* Terminal content */}
      <div className="p-4 font-mono text-sm sm:text-base">
        {displayedCommands.map((command, index) => (
          <div key={index} className="mb-1 flex">
            <span className="text-[#84cc16] mr-2">$</span>
            <span className="text-[#84cc16]">{command}</span>
            {index === currentCommandIndex && showCursor && (
              <span className="animate-blink ml-px text-[#84cc16]">_</span>
            )}
          </div>
        ))}
        {currentCommandIndex < commands.length && displayedCommands.length <= currentCommandIndex && (
          <div className="flex">
            <span className="text-[#84cc16] mr-2">$</span>
            {showCursor && <span className="animate-blink text-[#84cc16]">_</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;
