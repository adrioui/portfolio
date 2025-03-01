
import { useState, useEffect } from 'react';

const useScrollProgress = (elementRef: React.RefObject<HTMLElement>): number => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = element;
      
      // Calculate how far we've scrolled
      const scrolled = scrollTop / (scrollHeight - clientHeight) * 100;
      setProgress(Math.min(scrolled, 100));
    };

    // Add scroll event listener
    element.addEventListener('scroll', handleScroll);
    
    // Initialize progress
    handleScroll();

    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, [elementRef]);

  return progress;
};

export default useScrollProgress;
