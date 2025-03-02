
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

// Sample project data for seeding the database
const sampleProjects = [
  {
    id: 'bad-ideas-01',
    title: "Bad Ideas",
    subtitle: "A collection of terrible project ideas",
    description: "A showcase of project ideas that should never be implemented",
    overview: "This is a humorous collection of the worst project ideas I've ever had. Each idea comes with an explanation of why it would be terrible to actually build.",
    ascii_art: "  _____  \n |_   _| \n   | |   \n   | |   \n  _| |_  \n |_____| \n",
    demo_link: "https://example.com/bad-ideas",
    stress_level: 5,
    user_id: "system", // This will be replaced with the actual user_id when auth is implemented
    project_emojis: [
      { icon: "💩", meaning: "Bad Ideas" },
      { icon: "🙈", meaning: "Don't Look" },
      { icon: "🔥", meaning: "Dumpster Fire" }
    ],
    project_metrics: [
      { label: "Comedy Value", value: "High", is_component: false },
      { label: "Development Time", value: "Never", is_component: false }
    ],
    project_tech_stack: [
      { name: "Satire", level: 5, comment: "Heavily reliant on sarcasm and irony", snippet: null },
      { name: "Comedy Writing", level: 4, comment: "Used to create humorous descriptions", snippet: 'console.log("Why did the programmer quit his job? He didn\'t get arrays!");' }
    ],
    project_problems: [
      { issue: "Too many terrible ideas", solution: "Created a ranking system for badness" },
      { issue: "People trying to implement the ideas", solution: "Added very clear warnings" }
    ],
    project_challenges: [
      { title: "Ideas too believable", status: "CLOSED", description: "Made ideas more obviously terrible" },
      { title: "Too many venture capitalists interested", status: "OPEN", description: "Need to add more disclaimers" }
    ]
  },
  {
    id: 'cat-web-03',
    title: "CatWeb",
    subtitle: "A website for cats, by cats",
    description: "A social network exclusively for feline users",
    overview: "CatWeb is a parody project exploring what a social network designed exclusively for cats might look like. It features paw-friendly navigation, purr-based authentication, and content organized around napping spots and treat locations.",
    ascii_art: "  /\\_/\\ \n ( o.o ) \n  > ^ < \n",
    demo_link: "https://example.com/catweb",
    stress_level: 1,
    user_id: "system",
    project_emojis: [
      { icon: "🐱", meaning: "Cats" },
      { icon: "🧶", meaning: "Yarn" },
      { icon: "🐟", meaning: "Fish" }
    ],
    project_metrics: [
      { label: "Purrs Generated", value: "9832", is_component: false },
      { label: "Yarn Balls Used", value: "583", is_component: false }
    ],
    project_tech_stack: [
      { name: "React", level: 4, comment: "Used for component-based UI", snippet: "const CatApp = () => <div>Meow World</div>;" },
      { name: "Tailwind CSS", level: 3, comment: "Used for styling", snippet: null },
      { name: "Node.js", level: 4, comment: "Backend services", snippet: null }
    ],
    project_problems: [
      { issue: "Cats can't type", solution: "Developed paw-friendly interface" },
      { issue: "Content moderation", solution: "Implemented anti-laser pointer detection" }
    ],
    project_challenges: [
      { title: "Keeping cats interested", status: "CLOSED", description: "Added random movement animations" },
      { title: "Dog infiltration attempts", status: "WONTFIX", description: "Decided to be inclusive after all" }
    ]
  },
  {
    id: 'code-dreams-02',
    title: "Code Dreams",
    subtitle: "What if your code could dream?",
    description: "An AI experiment that generates visual representations of code",
    overview: "This art project uses machine learning to analyze codebases and generate dreamlike visualizations representing the structure and patterns found in the code. It explores the intersection of programming and creativity.",
    ascii_art: "  _____  \n |     | \n |_____| \n |     | \n |_____| \n",
    demo_link: "https://example.com/code-dreams",
    stress_level: 3,
    user_id: "system",
    project_emojis: [
      { icon: "✨", meaning: "Magic" },
      { icon: "🧠", meaning: "Neural Networks" },
      { icon: "🎨", meaning: "Art" }
    ],
    project_metrics: [
      { label: "Computation Time", value: "72 hours", is_component: false },
      { label: "Dataset Size", value: "250GB", is_component: false }
    ],
    project_tech_stack: [
      { name: "TensorFlow", level: 5, comment: "Core ML framework", snippet: "model.fit(x_train, y_train, epochs=50)" },
      { name: "WebGL", level: 3, comment: "Rendering visualizations", snippet: null },
      { name: "Python", level: 4, comment: "Data processing", snippet: null }
    ],
    project_problems: [
      { issue: "GPU performance", solution: "Optimized shaders and reduced complexity" },
      { issue: "Memory usage", solution: "Implemented progressive loading and streaming" }
    ],
    project_challenges: [
      { title: "Visualization clarity", status: "CLOSED", description: "Improved the color mapping algorithm" },
      { title: "Handling large codebases", status: "PATCHED", description: "Added sampling technique to process only representative code sections" }
    ]
  }
];

/**
 * Seeds the database with sample project data
 * @returns {Promise<boolean>} Whether the seeding was successful
 */
export async function seedProjects() {
  try {
    // Insert each project one by one
    for (const project of sampleProjects) {
      // First insert the project
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .insert({
          id: project.id, // Use the predefined ID
          title: project.title,
          subtitle: project.subtitle,
          description: project.description,
          overview: project.overview,
          ascii_art: project.ascii_art,
          demo_link: project.demo_link,
          stress_level: project.stress_level,
          user_id: project.user_id
        })
        .select('id')
        .single();

      if (projectError) {
        console.error('Error inserting project:', projectError);
        toast.error(`Failed to insert project: ${project.title}`);
        continue;
      }

      const projectId = projectData.id;

      // Insert related project emojis
      if (project.project_emojis.length > 0) {
        const { error: emojisError } = await supabase
          .from('project_emojis')
          .insert(
            project.project_emojis.map(emoji => ({
              project_id: projectId,
              icon: emoji.icon,
              meaning: emoji.meaning
            }))
          );

        if (emojisError) {
          console.error('Error inserting project emojis:', emojisError);
        }
      }

      // Insert related project metrics
      if (project.project_metrics.length > 0) {
        const { error: metricsError } = await supabase
          .from('project_metrics')
          .insert(
            project.project_metrics.map(metric => ({
              project_id: projectId,
              label: metric.label,
              value: metric.value,
              is_component: metric.is_component
            }))
          );

        if (metricsError) {
          console.error('Error inserting project metrics:', metricsError);
        }
      }

      // Insert related project tech stack
      if (project.project_tech_stack.length > 0) {
        const { error: techStackError } = await supabase
          .from('project_tech_stack')
          .insert(
            project.project_tech_stack.map(tech => ({
              project_id: projectId,
              name: tech.name,
              level: tech.level,
              comment: tech.comment,
              snippet: tech.snippet
            }))
          );

        if (techStackError) {
          console.error('Error inserting project tech stack:', techStackError);
        }
      }

      // Insert related project problems
      if (project.project_problems.length > 0) {
        const { error: problemsError } = await supabase
          .from('project_problems')
          .insert(
            project.project_problems.map(problem => ({
              project_id: projectId,
              issue: problem.issue,
              solution: problem.solution
            }))
          );

        if (problemsError) {
          console.error('Error inserting project problems:', problemsError);
        }
      }

      // Insert related project challenges
      if (project.project_challenges.length > 0) {
        const { error: challengesError } = await supabase
          .from('project_challenges')
          .insert(
            project.project_challenges.map(challenge => ({
              project_id: projectId,
              title: challenge.title,
              status: challenge.status,
              description: challenge.description
            }))
          );

        if (challengesError) {
          console.error('Error inserting project challenges:', challengesError);
        }
      }

      toast.success(`Added project: ${project.title}`);
    }

    return true;
  } catch (error) {
    console.error('Error seeding projects:', error);
    toast.error('Failed to seed projects');
    return false;
  }
}

/**
 * Checks if there are any projects in the database
 * @returns {Promise<boolean>} Whether there are any projects
 */
export async function hasProjects() {
  const { count, error } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true });
  
  if (error) {
    console.error('Error checking for projects:', error);
    return false;
  }
  
  return count ? count > 0 : false;
}
