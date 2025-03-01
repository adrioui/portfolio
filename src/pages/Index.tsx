
import React, { useEffect, useRef } from 'react';
import ScrollIndicator from '@/components/ScrollIndicator';
import { initAnimations } from '@/utils/animations';
import { initEasterEggs } from '@/utils/easterEggs';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

const Index = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initialize animations and easter eggs after component mounts
    initAnimations();
    initEasterEggs();
  }, []);

  // Sections for the scroll indicator
  const sections = ['hero', 'projects', 'skills', 'contact'];

  return (
    <div ref={pageRef} className="min-h-screen bg-background">
      <ScrollIndicator sections={sections} />

      {/* Main content with exaggerated margins */}
      <div className="mx-auto px-8 md:px-16 lg:px-32 xl:px-40 max-w-7xl">
        <Hero />
        
        <div className="wave-divider"></div>
        
        <Projects />
        
        <div className="wave-divider"></div>
        
        <Skills />
        
        <div className="wave-divider"></div>
        
        <Contact />
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
