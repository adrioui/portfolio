
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface QuirkyPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const QuirkyPagination: React.FC<QuirkyPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  const [audio] = useState(() => typeof window !== 'undefined' ? new Audio() : null);
  const [isRewinding, setIsRewinding] = useState(false);
  const [leftClickCount, setLeftClickCount] = useState(0);
  const [leftClickTimer, setLeftClickTimer] = useState<number | null>(null);

  // Progress percentage
  const progressPercentage = ((currentPage - 1) / (totalPages - 1)) * 100 || 0;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentPage > 1) {
        playPopSound();
        onPageChange(currentPage - 1);
      } else if (e.key === 'ArrowRight' && currentPage < totalPages) {
        playPopSound();
        onPageChange(currentPage + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages, onPageChange]);

  // Update URL hash
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.hash = `page=${currentPage}`;
    }
  }, [currentPage]);

  // Handle URL hash on load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const pageMatch = hash.match(/#page=(\d+)/);
      if (pageMatch && pageMatch[1]) {
        const page = parseInt(pageMatch[1], 10);
        if (page >= 1 && page <= totalPages && page !== currentPage) {
          onPageChange(page);
        }
      }
    }
  }, []);

  // Play pop sound
  const playPopSound = () => {
    if (audio) {
      try {
        audio.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAQB8AAAAAAAAAAAAAAAAAAAABAAgAZGF0YQQAAAB/f39/';
        audio.volume = 0.2;
        audio.play();
      } catch (error) {
        console.log('Audio playback failed', error);
      }
    }
  };

  // Handle left arrow click with rewind easter egg
  const handleLeftClick = () => {
    if (currentPage > 1) {
      playPopSound();
      onPageChange(currentPage - 1);
      
      // Handle rewind easter egg
      setLeftClickCount(prev => prev + 1);
      
      if (leftClickTimer) {
        window.clearTimeout(leftClickTimer);
      }
      
      const timerId = window.setTimeout(() => {
        setLeftClickCount(0);
      }, 1000);
      
      setLeftClickTimer(timerId as unknown as number);
      
      if (leftClickCount === 2) { // This will be the third click
        setIsRewinding(prev => !prev);
        setLeftClickCount(0);
        if (leftClickTimer) window.clearTimeout(leftClickTimer);
      }
    }
  };

  // Handle right arrow click
  const handleRightClick = () => {
    if (currentPage < totalPages) {
      playPopSound();
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div 
      className={cn(
        "fixed bottom-8 right-8 md:right-12 flex flex-col items-center", 
        isRewinding && "rewind-mode",
        className
      )}
    >
      {/* Progress bar */}
      <div className="w-32 h-[3px] bg-muted/30 mb-4 overflow-hidden">
        <div 
          className="h-full bg-highlight transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      {/* Navigation controls */}
      <div className="flex items-center space-x-6">
        <button
          onClick={handleLeftClick}
          disabled={currentPage <= 1}
          aria-label="Previous project batch"
          className={cn(
            "text-xl transition-all duration-300 transform hover:scale-110 hover:text-highlight",
            "hover:shadow-glow focus:shadow-glow focus:outline-none focus:text-highlight",
            currentPage <= 1 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
          )}
        >
          <span className="transform transition-transform duration-300 hover:rotate-12 inline-block">◀</span>
        </button>
        
        <button
          onClick={handleRightClick}
          disabled={currentPage >= totalPages}
          aria-label="Next project batch"
          className={cn(
            "text-xl transition-all duration-300 transform hover:scale-110 hover:text-highlight",
            "hover:shadow-glow focus:shadow-glow focus:outline-none focus:text-highlight",
            currentPage >= totalPages ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
          )}
        >
          <span className="transform transition-transform duration-300 hover:rotate-12 inline-block">▶</span>
        </button>
      </div>

      {/* VHS static overlay for rewind mode */}
      {isRewinding && (
        <div className="fixed inset-0 pointer-events-none z-10 opacity-10 bg-noise animate-noise" />
      )}
      
      {/* No projects fallback */}
      {totalPages === 0 && (
        <div className="fixed inset-0 flex items-center justify-center flex-col">
          <div className="text-3xl mb-3 animate-float">(╯°□°)╯︵ ┻━┻</div>
          <div className="opacity-0 hover:opacity-100 transition-opacity duration-500">
            Sorry, no projects found. They might be hiding.
          </div>
        </div>
      )}
    </div>
  );
};

export default QuirkyPagination;
