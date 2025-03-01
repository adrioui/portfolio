
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectDetail from '@/components/ProjectDetail';
import CatScrollIndicator from '@/components/CatScrollIndicator';
import { projectDetails } from '@/data/projectDetails';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState(id ? projectDetails[id] : null);

  useEffect(() => {
    if (id && !projectDetails[id]) {
      navigate('/');
    }
  }, [id, navigate]);

  if (!project) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-2xl font-mono mb-4">Project Not Found</h1>
        <p className="mb-6">This project may have disappeared under the couch.</p>
        <button 
          onClick={() => navigate('/')}
          className="font-mono bg-highlight text-primary px-4 py-2 rounded-sm"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => navigate('/')}
          className="font-mono text-sm mb-8 hover:text-highlight transition-colors"
        >
          ← Back to Projects
        </button>
        
        <ProjectDetail
          title={project.title}
          overview={project.overview}
          techStack={project.techStack}
          challenges={project.challenges}
          demoLink={project.demoLink}
          asciiArt={project.asciiArt}
          stressLevel={project.stressLevel}
        />
      </div>
      <CatScrollIndicator />
    </div>
  );
};

export default ProjectDetailPage;
