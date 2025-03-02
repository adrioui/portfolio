
import React from 'react';
import { useProjects } from '@/hooks/useProjects';
import ProjectCard from '@/components/ProjectCard';
import SeedDatabaseButton from '@/components/SeedDatabaseButton';
import { Skeleton } from '@/components/ui/skeleton';

const ProjectsList = () => {
  const { data: projects, isLoading, error } = useProjects();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(3).fill(0).map((_, index) => (
          <div key={index} className="p-6 rounded-lg border border-border/40">
            <Skeleton className="h-8 w-3/4 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Failed to load projects</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SeedDatabaseButton />
      
      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              emojis={project.project_emojis || []}
              description={project.description}
              catReview={`This project was ${project.stress_level > 3 ? 'stressful' : 'purr-fect'} to work on!`}
              stressLevel={project.stress_level}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          No projects found.
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
