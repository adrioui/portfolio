import React, { useEffect, useRef, useState } from 'react';
import Terminal from '@/components/Terminal';
import ProjectCard from '@/components/ProjectCard';
import ScrollIndicator from '@/components/ScrollIndicator';
import SkillBar from '@/components/SkillBar';
import QuirkyPagination from '@/components/QuirkyPagination';
import { initAnimations } from '@/utils/animations';
import { initEasterEggs, triggerNameAnimation } from '@/utils/easterEggs';
import { useProjects } from '@/hooks/useProjects';
import { toast } from 'sonner';

const Index = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  
  // Fetch projects from Supabase
  const { data: projects = [], isLoading, isError } = useProjects();
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [isRewinding, setIsRewinding] = useState(false);
  const projectsPerPage = 4;
  
  // Calculate total pages
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  
  // Get current projects with rewind mode support
  const getCurrentProjects = () => {
    if (isLoading) return [];
    
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    
    // Display projects in reverse order if in rewind mode
    const sortedProjects = isRewinding 
      ? [...projects].reverse() 
      : projects;
      
    return sortedProjects.slice(indexOfFirstProject, indexOfLastProject);
  };
  
  // Get current visible projects
  const currentProjects = getCurrentProjects();
  
  // Handle page changes from the pagination component
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to projects section
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  useEffect(() => {
    // Initialize animations and easter eggs after component mounts
    initAnimations();
    initEasterEggs();
    
    // Show error toast if project fetch fails
    if (isError) {
      toast.error('Failed to load projects', {
        description: 'Please check your connection and try again'
      });
    }
  }, [isError]);

  // Terminal commands for the hero section
  const terminalCommands = [
    "whoami",
    "Max",
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
          <div className="mb-6">
            <span 
              onClick={handleNameClick}
              className="text-sm inline-block px-2 py-1 bg-highlight/20 text-foreground rounded-sm mb-2 cursor-pointer hover:bg-highlight/30 transition-colors"
            >
              Software Engineer
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold mb-4">
              Hi, I'm <span className="relative text-highlight cursor-pointer" onClick={handleNameClick}>Max</span>
            </h1>
            <p className="text-softgray text-lg md:text-xl max-w-2xl leading-relaxed">
              I build digital experiences with clean code and a touch of whimsy. Sometimes they even work.
            </p>
          </div>

          <Terminal 
            commands={terminalCommands} 
            className="mt-12 max-w-2xl" 
            typingSpeed={40}
          />

          <div className="mt-16 flex flex-col md:flex-row gap-6">
            <a href="#projects" className="link-hover">View Projects</a>
            <a href="#contact" className="link-hover">Get in Touch</a>
          </div>

          {/* Pixel art avatar */}
          <div className="mt-16 w-16 h-16 relative animate-float">
            <div className="w-full h-full bg-black/10 rounded-sm grid grid-cols-8 grid-rows-8 overflow-hidden">
              {/* Simple pixel art face */}
              <div className="col-start-3 col-span-1 row-start-3 row-span-1 bg-highlight"></div>
              <div className="col-start-6 col-span-1 row-start-3 row-span-1 bg-highlight"></div>
              <div className="col-start-3 col-span-4 row-start-5 row-span-1 bg-highlight"></div>
            </div>
          </div>
        </section>

        <div className="wave-divider"></div>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <h2 className="section-heading">$ projects</h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse bg-card/30 rounded-lg p-6 h-48"></div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12 text-softgray">
              <p className="mb-4">No projects found</p>
              <p className="text-sm">Check your Supabase connection or add some projects to the database</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  emojis={project.project_emojis?.map(e => e.icon) || []}
                  description={project.subtitle}
                  catReview={project.overview.substring(0, 40) + "..."}
                  stressLevel={project.stress_level}
                />
              ))}
            </div>
          )}
          
          {/* Only show pagination if we have more than one page */}
          {!isLoading && totalPages > 1 && (
            <QuirkyPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="mt-12"
            />
          )}
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
