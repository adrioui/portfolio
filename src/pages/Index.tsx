
import React, { useState } from 'react';
import { projectsData, Project } from '@/data/projectsData';
import ProjectCard from '@/components/ProjectCard';
import ProjectDetail from '@/components/ProjectDetail';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    toast({
      title: "Project Selected",
      description: `Now viewing ${project.title}`,
      duration: 3000,
    });
  };
  
  const handleCloseProjectDetail = () => {
    setSelectedProject(null);
  };
  
  return (
    <div className="container-center py-8 min-h-screen">
      <h1 className="section-heading">Project Portfolio</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {projectsData.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            emojis={project.emojis}
            description={project.description}
            catReview={project.catReview}
            stressLevel={project.stressLevel}
            onClick={() => handleProjectClick(project)}
          />
        ))}
      </div>
      
      {selectedProject && (
        <ProjectDetail
          title={selectedProject.title}
          purpose={selectedProject.purpose}
          techStack={selectedProject.techStack}
          challenges={selectedProject.challenges}
          demoLink={selectedProject.demoLink}
          onClose={handleCloseProjectDetail}
        />
      )}
    </div>
  );
};

export default Index;
