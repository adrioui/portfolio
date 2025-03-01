
import React from 'react';
import Terminal from '@/components/Terminal';
import { triggerNameAnimation } from '@/utils/easterEggs';

const Hero = () => {
  // Terminal commands for the hero section
  const terminalCommands = [
    "whoami",
    "[Max]",
    "Job: Building things that (sometimes) work",
    "Location: [redacted] • ☕ Infinite coffee mode"
  ];

  const handleNameClick = () => {
    triggerNameAnimation();
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center py-20">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-16">
        {/* Left side with pixel art avatar */}
        <div className="w-48 h-48 relative animate-float">
          <div className="w-full h-full grid grid-cols-10 grid-rows-10 overflow-hidden">
            {/* Pixel art face - improved version */}
            {/* Hair */}
            <div className="col-span-10 row-span-2 bg-gray-900"></div>
            {/* Face */}
            <div className="col-span-8 col-start-2 row-span-4 row-start-2 bg-[#F4D6B0]"></div>
            {/* Eyes */}
            <div className="col-start-3 col-span-1 row-start-3 row-span-1 bg-gray-900"></div>
            <div className="col-start-6 col-span-1 row-start-3 row-span-1 bg-gray-900"></div>
            {/* Mouth */}
            <div className="col-start-4 col-span-2 row-start-5 row-span-1 bg-[#E35D6A]"></div>
            {/* Shirt/body */}
            <div className="col-span-6 col-start-3 row-span-3 row-start-7 bg-[#F3D371]"></div>
          </div>
        </div>

        {/* Right side with terminal and bio */}
        <div className="flex-1 flex flex-col gap-12">
          {/* Terminal with updated styling */}
          <Terminal 
            commands={terminalCommands} 
            className="w-full max-w-lg bg-black rounded-md overflow-hidden border border-gray-800" 
            typingSpeed={40}
          />

          {/* Bio text - longer version from the image */}
          <div className="max-w-xl text-softgray text-lg leading-relaxed">
            <p>
              I craft digital experiences with clean code and quirky interactions. When I'm not 
              debugging, you'll find me overanalyzing coffee brewing variables or collecting vintage 
              keyboards that I definitely don't need.
            </p>
            
            <div className="mt-10 flex items-center">
              <a href="#projects" className="link-hover text-foreground">See my work</a>
              <span className="text-softgray mx-4">•</span>
              <a href="#contact" className="link-hover text-foreground">Let's talk</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
