
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '@/components/ProjectCard';
import { projectDetails } from '@/data/projectDetails';

const Index = () => {
  const navigate = useNavigate();

  const handleProjectClick = (id: string) => {
    navigate(`/project/${id}`);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="section-heading">Projects</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard
          title="AI Powered Cat Toy Tracker"
          emojis={['🐱', '🤖', '🧶']}
          description="Using computer vision to track cat toys that mysteriously disappear under furniture."
          catReview="Finally, I can find my toys without waiting for the human to move the couch."
          stressLevel={3}
          onClick={() => handleProjectClick('project1')}
        />
        
        <ProjectCard
          title="npm install bad-ideas"
          emojis={['📦', '😱', '💻']}
          description="A React hook library for questionable life choices."
          catReview="I sat on the keyboard and somehow improved the code."
          stressLevel={5}
          onClick={() => handleProjectClick('project2')}
        />
        
        <ProjectCard
          title="Cat-as-a-Service (CaaS)"
          emojis={['🐱', '☁️', '🔄']}
          description="Containerized microservices architecture but every container has a digital cat inside."
          catReview="Purr-formance issues but great interface."
          stressLevel={4}
          onClick={() => handleProjectClick('project3')}
        />
      </div>
    </div>
  );
};

export default Index;
