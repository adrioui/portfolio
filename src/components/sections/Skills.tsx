
import React from 'react';
import SkillBar from '@/components/SkillBar';

const Skills = () => {
  return (
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
  );
};

export default Skills;
