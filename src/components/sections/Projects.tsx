
import React from 'react';
import ProjectCard from '@/components/ProjectCard';

const Projects = () => {
  return (
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
  );
};

export default Projects;
