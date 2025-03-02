
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

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
  const [isTerminalStyle, setIsTerminalStyle] = useState(false);
  const [showStartTooltip, setShowStartTooltip] = useState(false);
  const [showEndTooltip, setShowEndTooltip] = useState(false);
  const [isHoldingPrev, setIsHoldingPrev] = useState(false);
  const [isHoldingNext, setIsHoldingNext] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState<number | null>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  const projectEmojis = ['🚀', '💻', '🔧', '🎨', '📱', '🤖', '🔍', '🎮'];
  const randomEmoji = projectEmojis[Math.floor(Math.random() * projectEmojis.length)];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentPage > 1) {
        playPopSound();
        onPageChange(currentPage - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (e.key === 'ArrowRight' && currentPage < totalPages) {
        playPopSound();
        onPageChange(currentPage + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages, onPageChange]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.hash = `page=${currentPage}`;
    }
  }, [currentPage]);

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

  const playPopSound = () => {
    if (audio) {
      try {
        // Using a longer, valid base64 WAV data
        audio.src = 'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU9PT1AA';
        audio.volume = 0.2;
        audio.play().catch(error => {
          console.log('Audio playback failed', error);
        });
      } catch (error) {
        console.log('Audio playback failed', error);
      }
    }
  };

  const handleIndicatorClick = () => {
    setClickCount(prev => prev + 1);
    
    if (clickTimer) {
      window.clearTimeout(clickTimer);
    }
    
    const timerId = window.setTimeout(() => {
      if (clickCount >= 2) { // This will be the third click
        setIsTerminalStyle(prev => !prev);
        
        if (currentPage === totalPages && !isTerminalStyle) {
          showConfetti();
        }
      }
      setClickCount(0);
    }, 500);
    
    setClickTimer(timerId as unknown as number);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      playPopSound();
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      playPopSound();
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      if (currentPage === totalPages - 1) {
        showConfetti();
      }
    }
  };

  const handleMouseDown = (button: 'prev' | 'next') => {
    if (button === 'prev') {
      setIsHoldingPrev(true);
    } else {
      setIsHoldingNext(true);
    }
  };

  const handleMouseUp = () => {
    setIsHoldingPrev(false);
    setIsHoldingNext(false);
  };

  const showConfetti = () => {
    if (typeof document !== 'undefined') {
      const confettiCount = 50;
      const colors = ['#FFC700', '#FF0000', '#2E3191', '#41D3BD'];
      
      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.className = 'absolute z-50 pointer-events-none';
        confetti.style.backgroundColor = color;
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 10 + 5}px`;
        confetti.style.position = 'fixed';
        confetti.style.top = '-10px';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.opacity = '1';
        confetti.style.transform = 'rotate(0deg)';
        confetti.style.transition = `top 2s ease-out, left 2s ease-out, opacity 2s ease-out, transform 2s ease-out`;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
          confetti.style.top = `${Math.random() * 100 + 100}vh`;
          confetti.style.left = `${Math.random() * 100}vw`;
          confetti.style.opacity = '0';
          confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
          
          setTimeout(() => {
            if (document.body.contains(confetti)) {
              document.body.removeChild(confetti);
            }
          }, 2000);
        }, 100);
      }
    }
  };

  return (
    <div 
      className={cn(
        "fixed bottom-8 right-8 md:right-12 flex flex-col items-center", 
        className
      )}
    >
      <div 
        ref={indicatorRef}
        onClick={handleIndicatorClick}
        className={cn(
          "mb-4 px-2 py-1 text-xs font-mono cursor-pointer transition-all duration-300",
          isTerminalStyle ? "bg-black/10 text-green-500" : "text-softgray"
        )}
      >
        <div className="flex items-center gap-1.5">
          <span>
            {isTerminalStyle 
              ? `Page [${currentPage}/${totalPages}]` 
              : `${currentPage}/${totalPages}`}
          </span>
          <span className={cn(
            "inline-block w-1.5 h-1.5 rounded-full bg-highlight", 
            "animate-pulse-soft"
          )}></span>
        </div>
      </div>
      
      <div className="flex items-center space-x-8">
        <div className="relative">
          {showStartTooltip && currentPage === 1 && (
            <div className="absolute -top-8 whitespace-nowrap text-xs bg-background/80 px-2 py-1 rounded">
              You're at the beginning! 🎉
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "font-medium transition-all duration-300 relative overflow-hidden",
              currentPage <= 1 ? "opacity-30 cursor-not-allowed" : "hover:text-highlight",
              "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-highlight",
              "after:transform after:scale-x-0 after:transition-transform after:duration-300",
              "hover:after:scale-x-100 hover:after:origin-center",
            )}
            disabled={currentPage <= 1}
            aria-label="Previous project batch"
            onClick={handlePrevClick}
            onMouseDown={() => handleMouseDown('prev')}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseEnter={() => currentPage === 1 && setShowStartTooltip(true)}
            onMouseOut={() => setShowStartTooltip(false)}
          >
            {isHoldingPrev ? (
              <span className="animate-wiggle">{randomEmoji}</span>
            ) : isMobile ? (
              <ArrowLeft className="h-4 w-4" />
            ) : (
              <span className="flex items-center">
                <span className="transform transition-transform duration-300 group-hover:scale-150 mr-1 inline-block">←</span>
                <span>Newer</span>
              </span>
            )}
          </Button>
        </div>
        
        <div className="relative">
          {showEndTooltip && currentPage === totalPages && (
            <div className="absolute -top-8 whitespace-nowrap text-xs bg-background/80 px-2 py-1 rounded">
              Fin. (Or is it?) 🎊
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "font-medium transition-all duration-300 relative overflow-hidden", 
              currentPage >= totalPages ? "opacity-30 cursor-not-allowed" : "hover:text-highlight",
              "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-highlight",
              "after:transform after:scale-x-0 after:transition-transform after:duration-300",
              "hover:after:scale-x-100 hover:after:origin-center",
            )}
            disabled={currentPage >= totalPages}
            aria-label="Next project batch"
            onClick={handleNextClick}
            onMouseDown={() => handleMouseDown('next')}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseEnter={() => currentPage === totalPages && setShowEndTooltip(true)}
            onMouseOut={() => setShowEndTooltip(false)}
          >
            {isHoldingNext ? (
              <span className="animate-wiggle">{randomEmoji}</span>
            ) : isMobile ? (
              <ArrowRight className="h-4 w-4" />
            ) : (
              <span className="flex items-center">
                <span>Older</span>
                <span className="transform transition-transform duration-300 group-hover:scale-150 ml-1 inline-block">→</span>
              </span>
            )}
          </Button>
        </div>
      </div>
      
      <div 
        className={cn(
          "fixed bottom-0 right-0 w-24 h-24 pointer-events-none z-10 opacity-0 transition-opacity duration-300",
          "page-curl"
        )}
      />
      
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
