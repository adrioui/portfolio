
import React from 'react';
import { useProjects } from '@/hooks/useProjects';
import ProjectCard from '@/components/ProjectCard';
import SeedDatabaseButton from '@/components/SeedDatabaseButton';
import { Loader2 } from 'lucide-react';

const Projects = () => {
  const { data: projects, isLoading, hasProjects, handleSeedSuccess } = useProjects();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (hasProjects === false) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">No Projects Found</h1>
          <p className="text-gray-600 mb-6">
            Your database doesn't have any projects yet. You can seed the database with sample projects to get started.
          </p>
          <SeedDatabaseButton onSuccess={handleSeedSuccess} />
        </div>
      </div>
    );
  }

  // If we have projects, display them
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">My Projects</h1>
      
      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              emojis={project.project_emojis.map(emoji => emoji.icon)}
              description={project.description}
              catReview={`${project.title} is purrfect!`} // Just a placeholder cat review
              stressLevel={project.stress_level}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No projects available.</p>
        </div>
      )}
    </div>
  );
};

export default Projects;
