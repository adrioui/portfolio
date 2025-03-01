
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ScrollIndicatorProps {
  sections: string[];
  className?: string;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ sections, className }) => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(id => document.getElementById(id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sectionElements.forEach((section, index) => {
        if (!section) return;
        
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (index: number) => {
    const section = document.getElementById(sections[index]);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 40,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={cn("fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-4", className)}>
      {sections.map((_, index) => (
        <button
          key={index}
          onClick={() => scrollToSection(index)}
          className={cn(
            "w-2.5 h-2.5 rounded-full transition-all duration-300",
            index === activeSection 
              ? "bg-highlight scale-125" 
              : "bg-softgray/30 hover:bg-softgray/60"
          )}
          aria-label={`Scroll to ${sections[index]} section`}
        />
      ))}
    </div>
  );
};

export default ScrollIndicator;
