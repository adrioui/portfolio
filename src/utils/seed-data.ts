
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

// Sample project data for seeding the database
const sampleProjects = [
  {
    title: "Personal Portfolio",
    subtitle: "A showcase of my web development skills",
    description: "A responsive portfolio website built with React and Tailwind CSS",
    overview: "This project showcases my frontend development skills and highlights various projects I've worked on. It features a clean, modern design with smooth animations and responsive layouts.",
    ascii_art: "  _____ \n |     | \n |_____| \n |     | \n |_____| \n",
    demo_link: "https://example.com/portfolio",
    stress_level: 2,
    user_id: "system", // This will be replaced with the actual user_id when auth is implemented
    project_emojis: [
      { icon: "⚛️", meaning: "React" },
      { icon: "🎨", meaning: "CSS" },
      { icon: "📱", meaning: "Responsive" }
    ],
    project_metrics: [
      { label: "Development Time", value: "2 weeks", is_component: false },
      { label: "Code Quality", value: "High", is_component: false }
    ],
    project_tech_stack: [
      { name: "React", level: 4, comment: "Used for component-based UI", snippet: "const App = () => <div>Hello World</div>;" },
      { name: "Tailwind CSS", level: 3, comment: "Used for styling", snippet: null }
    ],
    project_problems: [
      { issue: "Mobile responsiveness", solution: "Used media queries and flex layouts" },
      { issue: "Performance", solution: "Implemented code splitting and lazy loading" }
    ],
    project_challenges: [
      { title: "Dark mode implementation", status: "CLOSED", description: "Implemented using CSS variables and context API" },
      { title: "Animation performance", status: "OPEN", description: "Some animations are causing performance issues on mobile" }
    ]
  },
  {
    title: "E-commerce Platform",
    subtitle: "A full-stack online shopping experience",
    description: "A modern e-commerce website with cart functionality and payment integration",
    overview: "This project is a full-featured e-commerce platform that allows users to browse products, add them to a cart, and complete purchases. It includes user authentication, product management, and order tracking.",
    ascii_art: "  _____  \n |_   _| \n   | |   \n   | |   \n  _|_|_  \n |_____| \n",
    demo_link: "https://example.com/ecommerce",
    stress_level: 4,
    user_id: "system",
    project_emojis: [
      { icon: "🛒", meaning: "Shopping" },
      { icon: "💳", meaning: "Payments" },
      { icon: "🔒", meaning: "Security" }
    ],
    project_metrics: [
      { label: "Development Time", value: "3 months", is_component: false },
      { label: "Team Size", value: "3 developers", is_component: false }
    ],
    project_tech_stack: [
      { name: "Next.js", level: 5, comment: "Used for SSR and routing", snippet: "export async function getServerSideProps() { /* ... */ }" },
      { name: "Stripe", level: 3, comment: "Used for payment processing", snippet: null },
      { name: "MongoDB", level: 4, comment: "Used for database", snippet: null }
    ],
    project_problems: [
      { issue: "Cart synchronization", solution: "Implemented Redux with local storage" },
      { issue: "Payment security", solution: "Used Stripe Elements and followed best practices" }
    ],
    project_challenges: [
      { title: "Inventory management", status: "CLOSED", description: "Implemented real-time inventory tracking" },
      { title: "International shipping", status: "WONTFIX", description: "Decided to focus on domestic market first" }
    ]
  },
  {
    title: "Weather Dashboard",
    subtitle: "Real-time weather information",
    description: "A weather application that provides current and forecast data",
    overview: "This dashboard displays weather information from multiple sources, allowing users to view current conditions, forecasts, and historical data. It features interactive maps and data visualizations.",
    ascii_art: "    _    \n   | |   \n __|_|__ \n|_     _|\n  |___|  \n",
    demo_link: "https://example.com/weather",
    stress_level: 3,
    user_id: "system",
    project_emojis: [
      { icon: "🌤️", meaning: "Weather" },
      { icon: "📊", meaning: "Data" },
      { icon: "🗺️", meaning: "Maps" }
    ],
    project_metrics: [
      { label: "Development Time", value: "1 month", is_component: false },
      { label: "API Calls", value: "~5000/day", is_component: false }
    ],
    project_tech_stack: [
      { name: "Vue.js", level: 4, comment: "Used for reactive UI", snippet: null },
      { name: "D3.js", level: 3, comment: "Used for data visualization", snippet: null },
      { name: "OpenWeatherMap API", level: 4, comment: "Used for weather data", snippet: null }
    ],
    project_problems: [
      { issue: "API rate limiting", solution: "Implemented caching and request throttling" },
      { issue: "Data accuracy", solution: "Combined multiple weather APIs for verification" }
    ],
    project_challenges: [
      { title: "Location detection", status: "CLOSED", description: "Used browser geolocation API with fallbacks" },
      { title: "Offline support", status: "PATCHED", description: "Implemented service workers for basic offline functionality" }
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
