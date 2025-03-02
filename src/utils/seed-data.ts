
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

// Sample project data for seeding the database
const sampleProjects = [
  {
    title: "Portfolio Website",
    subtitle: "My personal developer showcase",
    description: "A responsive portfolio website built with React and Tailwind CSS",
    overview: "This portfolio website showcases my projects, skills, and experience as a developer. It features a modern, responsive design with dark mode support and animated transitions.",
    ascii_art: "╭━━━╮╱╱╱╱╱╱╱╱╱╭━━━━┳━━━┳━━━╮\n┃╭━╮┃╱╱╱╱╱╱╱╱╱┃╭╮╭╮┃╭━╮┃╭━╮┃\n┃╰━╯┣━━┳━┳━━┳━━╋╯┃┃╰┫┃╱┃┃╰━╯┃\n┃╭━━┫╭╮┃╭┫╭╮┃╭╮┃╱┃┃╱┃┃╱┃┃╭━━╯\n┃┃╱╱┃╰╯┃┃┃╰╯┃╰╯┃╱┃┃╱┃╰━╯┃┃\n╰╯╱╱╰━━┻╯╰━━┻━━╯╱╰╯╱╰━━━┻╯",
    demo_link: "https://example.com/portfolio",
    stress_level: 3,
    user_id: null, // This will be updated with the authenticated user's ID at runtime
    emojis: [
      { icon: "🌐", meaning: "Web Development" },
      { icon: "🎨", meaning: "Design" },
      { icon: "⚛️", meaning: "React" }
    ],
    metrics: [
      { label: "Development Time", value: "4 weeks", is_component: false },
      { label: "Code Size", value: "5.2K lines", is_component: false },
      { label: "Cups of Coffee", value: "37", is_component: false }
    ],
    tech_stack: [
      { name: "React", level: 4, comment: "Used for all UI components", snippet: "const Portfolio = () => <div>My awesome portfolio</div>;" },
      { name: "Tailwind CSS", level: 5, comment: "Styled everything with Tailwind", snippet: null },
      { name: "TypeScript", level: 3, comment: "Added type safety to the project", snippet: "interface Project { title: string; }" }
    ],
    problems: [
      { issue: "Responsive design for mobile", solution: "Used Tailwind's responsive utilities" },
      { issue: "Performance optimization", solution: "Implemented code splitting and lazy loading" }
    ],
    challenges: [
      { title: "Animations performance", status: "CLOSED", description: "Optimized animations to run at 60fps" },
      { title: "Accessibility improvements", status: "OPEN", description: "Need to add more ARIA attributes" }
    ]
  },
  {
    title: "Task Manager",
    subtitle: "A simple but powerful task tracking app",
    description: "A task management application with drag-and-drop functionality",
    overview: "This task manager application allows users to create, organize, and track their tasks. It features drag-and-drop functionality for easy task prioritization, along with filtering and sorting options.",
    ascii_art: "╭━━━━┳━━━┳━━━┳╭╮╱╭╮\n┃╭╮╭╮┃╭━╮┃╭━╮┃┃┃╱┃┃\n╰╯┃┃╰┫┃╱┃┃╰━━┫┃╰━╯┃\n╱╱┃┃╱┃╰━╯┣━━╮┃┃╭━╮┃\n╱╱┃┃╱┃╭━╮┃╰━╯┃┃┃╱┃┃\n╱╱╰╯╱╰╯╱╰┻━━━┻╯╰╱╰╯",
    demo_link: "https://example.com/task-manager",
    stress_level: 2,
    user_id: null,
    emojis: [
      { icon: "📝", meaning: "Task Management" },
      { icon: "🔄", meaning: "Drag & Drop" },
      { icon: "🎯", meaning: "Productivity" }
    ],
    metrics: [
      { label: "Tasks Managed", value: "1000+", is_component: false },
      { label: "Active Users", value: "250", is_component: false },
      { label: "Average Rating", value: "4.7/5", is_component: false }
    ],
    tech_stack: [
      { name: "React", level: 4, comment: "Core UI framework", snippet: null },
      { name: "Redux", level: 3, comment: "State management was tricky", snippet: "const tasksReducer = (state = [], action) => {...}" },
      { name: "React DnD", level: 4, comment: "For drag and drop functionality", snippet: null }
    ],
    problems: [
      { issue: "Complex state management", solution: "Implemented Redux with normalized state" },
      { issue: "Offline functionality", solution: "Used local storage and service workers" }
    ],
    challenges: [
      { title: "Real-time updates", status: "CLOSED", description: "Implemented websockets for instant updates" },
      { title: "Mobile touch support", status: "PATCHED", description: "Added mobile-friendly touch interactions" }
    ]
  },
  {
    title: "Weather App",
    subtitle: "Real-time weather forecasts",
    description: "A weather application that provides real-time forecasts and historical data",
    overview: "This weather application fetches real-time weather data from multiple APIs and presents it in an easy-to-understand format. It features location-based forecasts, historical weather data, and customizable alerts.",
    ascii_art: "╭╮╱╱╱╱╱╱╱╱╱╱╱╱╱╱╭━━━━┳━━━╮\n┃┃╱╱╱╱╱╱╱╱╱╱╱╱╱╱┃╭╮╭╮┃╭━╮┃\n┃┃╱╱╭┳━━┳━━┳━━┳━━╋╯┃┃╰┫╰━╯┃\n┃┃╱╭╋┫╭╮┃┃━┫┃━┫╭╮┃╱┃┃╱┃╭━━╯\n┃╰━╯┃┃╰╯┃┃━┫┃━┫╰╯┃╱┃┃╱┃┃\n╰━━━┻┻━━┻━━┻━━┻━━╯╱╰╯╱╰╯",
    demo_link: "https://example.com/weather-app",
    stress_level: 4,
    user_id: null,
    emojis: [
      { icon: "🌦️", meaning: "Weather" },
      { icon: "🌍", meaning: "Global Data" },
      { icon: "📱", meaning: "Mobile First" }
    ],
    metrics: [
      { label: "API Calls", value: "5M+ monthly", is_component: false },
      { label: "Locations", value: "10,000+", is_component: false },
      { label: "Accuracy Rate", value: "92%", is_component: false }
    ],
    tech_stack: [
      { name: "React Native", level: 5, comment: "Cross-platform mobile development", snippet: null },
      { name: "OpenWeatherMap API", level: 4, comment: "Primary data source", snippet: "const forecast = await fetch(`${API_URL}?lat=${lat}&lon=${lon}`);" },
      { name: "D3.js", level: 3, comment: "For data visualization", snippet: null }
    ],
    problems: [
      { issue: "API rate limiting", solution: "Implemented caching and request batching" },
      { issue: "Location accuracy", solution: "Combined GPS and IP-based geolocation" }
    ],
    challenges: [
      { title: "Data visualization performance", status: "CLOSED", description: "Optimized rendering for large datasets" },
      { title: "Offline support", status: "WONTFIX", description: "Too complex for current scope" }
    ]
  }
];

/**
 * Seeds the database with sample project data
 */
export const seedProjects = async () => {
  try {
    // Get the current user ID
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;

    if (!userId) {
      toast.error("You must be logged in to seed the database");
      return false;
    }

    // Insert projects
    for (const project of sampleProjects) {
      // Insert the main project
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .insert({
          title: project.title,
          subtitle: project.subtitle,
          description: project.description,
          overview: project.overview,
          ascii_art: project.ascii_art,
          demo_link: project.demo_link,
          stress_level: project.stress_level,
          user_id: userId
        })
        .select()
        .single();

      if (projectError) {
        console.error('Error inserting project:', projectError);
        toast.error(`Failed to seed project: ${project.title}`);
        continue;
      }

      const projectId = projectData.id;

      // Insert project emojis
      if (project.emojis && project.emojis.length > 0) {
        const { error: emojisError } = await supabase
          .from('project_emojis')
          .insert(
            project.emojis.map(emoji => ({
              project_id: projectId,
              icon: emoji.icon,
              meaning: emoji.meaning
            }))
          );

        if (emojisError) {
          console.error('Error inserting project emojis:', emojisError);
        }
      }

      // Insert project metrics
      if (project.metrics && project.metrics.length > 0) {
        const { error: metricsError } = await supabase
          .from('project_metrics')
          .insert(
            project.metrics.map(metric => ({
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

      // Insert project tech stack
      if (project.tech_stack && project.tech_stack.length > 0) {
        const { error: techStackError } = await supabase
          .from('project_tech_stack')
          .insert(
            project.tech_stack.map(tech => ({
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

      // Insert project problems
      if (project.problems && project.problems.length > 0) {
        const { error: problemsError } = await supabase
          .from('project_problems')
          .insert(
            project.problems.map(problem => ({
              project_id: projectId,
              issue: problem.issue,
              solution: problem.solution
            }))
          );

        if (problemsError) {
          console.error('Error inserting project problems:', problemsError);
        }
      }

      // Insert project challenges
      if (project.challenges && project.challenges.length > 0) {
        const { error: challengesError } = await supabase
          .from('project_challenges')
          .insert(
            project.challenges.map(challenge => ({
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
    }

    toast.success("Database seeded with sample projects!");
    return true;
  } catch (error) {
    console.error('Error seeding database:', error);
    toast.error("Failed to seed database. See console for details.");
    return false;
  }
};

/**
 * Checks if the projects table is empty
 */
export const checkIfProjectsExist = async () => {
  const { count, error } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true });
  
  if (error) {
    console.error('Error checking if projects exist:', error);
    return false;
  }
  
  return count !== null && count > 0;
};
