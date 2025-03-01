
import React, { useEffect, useRef } from 'react';
import Terminal from '@/components/Terminal';
import ProjectCard from '@/components/ProjectCard';
import ScrollIndicator from '@/components/ScrollIndicator';
import SkillBar from '@/components/SkillBar';
import { initAnimations } from '@/utils/animations';
import { initEasterEggs, triggerNameAnimation } from '@/utils/easterEggs';

const Index = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initialize animations and easter eggs after component mounts
    initAnimations();
    initEasterEggs();
  }, []);

  // Terminal commands for the hero section
  const terminalCommands = [
    "whoami",
    "[Max]",
    "Job: Building things that (sometimes) work",
    "Location: [redacted] • ☕ Infinite coffee mode"
  ];

  // Sections for the scroll indicator
  const sections = ['hero', 'projects', 'skills', 'contact'];

  const handleNameClick = () => {
    triggerNameAnimation();
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-background">
      <ScrollIndicator sections={sections} />

      {/* Main content with exaggerated margins */}
      <div className="mx-auto px-8 md:px-16 lg:px-32 xl:px-40 max-w-7xl">
        {/* Hero Section */}
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

        <div className="wave-divider"></div>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <h2 className="section-heading">$ projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCard
              title="Pixel Perfect"
              emojis={['🖼️', '⚡', '🪄']}
              description="A brutalist image editor that uses machine learning to predict what you're trying to draw."
              catReview="Paw-approved API design"
              stressLevel={4}
            />
            
            <ProjectCard
              title="Terminal Tunes"
              emojis={['🎵', '💻', '🎮']}
              description="CLI music player that visualizes audio as ASCII art patterns in your terminal."
              catReview="Makes weird noises while I'm napping"
              stressLevel={3}
            />
            
            <ProjectCard
              title="Recursive Recipes"
              emojis={['🍳', '🔄', '🤖']}
              description="Recipe generator that creates increasingly absurd cooking instructions the more you use it."
              catReview="Food descriptions made me hungry"
              stressLevel={2}
            />
            
            <ProjectCard
              title="Error Handler"
              emojis={['🐛', '🔍', '🧠']}
              description="Turns cryptic stack traces into sarcastic, but actually helpful explanations."
              catReview="Fixed my yarn hairball issue"
              stressLevel={5}
            />
          </div>
        </section>

        <div className="wave-divider"></div>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <h2 className="section-heading">$ skills</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-3xl">
            <div>
              <h3 className="font-mono mb-6 text-lg">Languages:</h3>
              <SkillBar 
                name="Python" 
                level={4}
                humorousLabel="Used to automate my coffee maker - still debugging"
              />
              <SkillBar 
                name="Rust" 
                level={3}
                humorousLabel="50% love, 50% frustration, 100% borrow checker anxiety"
              />
              <SkillBar 
                name="TypeScript" 
                level={5}
                humorousLabel="Typescript: because 'any' is a four-letter word"
              />
              <SkillBar 
                name="CSS" 
                level={3}
                humorousLabel="Can center a div... on good days"
              />
            </div>
            
            <div>
              <h3 className="font-mono mb-6 text-lg">Tools:</h3>
              <SkillBar 
                name="Git" 
                level={5}
                humorousLabel="Expert at git commit -m 'fixes'"
              />
              <SkillBar 
                name="Docker" 
                level={2}
                humorousLabel="Can restart containers without crying (usually)"
              />
              <SkillBar 
                name="Vim" 
                level={3}
                humorousLabel="Proficient at accidentally entering. :q! is muscle memory"
              />
              <SkillBar 
                name="AWS" 
                level={4}
                humorousLabel="Knows enough to be dangerous to my credit card"
              />
            </div>
          </div>
        </section>

        <div className="wave-divider"></div>

        {/* Contact Section */}
        <section id="contact" className="py-20 pb-32">
          <h2 className="section-heading">$ contact --method</h2>
          
          <Terminal 
            commands={[
              "contact --method",
              "[1] Carrier pigeon (Preferred)",
              "[2] Email (max@bonhomme.lol)",
              "[3] Fax (Seriously?)"
            ]} 
            className="mt-12 max-w-2xl" 
            typingSpeed={30}
          />
          
          <div className="mt-12 flex gap-6">
            <a 
              href="mailto:max@bonhomme.lol" 
              className="link-hover font-mono"
              data-quirk="link"
            >
              Send Email
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="link-hover font-mono"
              data-quirk="link"
            >
              Twitter
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="link-hover font-mono"
              data-quirk="link"
            >
              GitHub
            </a>
          </div>
        </section>
        
        <footer className="py-6 border-t border-border text-softgray text-sm">
          <p>Powered by caffeine and existential deadlines</p>
          <p className="text-xs mt-2">© {new Date().getFullYear()} Max – Hover here for 5 seconds...</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
