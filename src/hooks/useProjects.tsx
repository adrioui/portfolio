
import { useQuery } from '@tanstack/react-query';
import { getProjects } from '@/utils/db-helpers';
import { seedProjects, hasProjects } from '@/utils/seed-data';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';

export function useProjects() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [needsSeed, setNeedsSeed] = useState<boolean | null>(null);

  // Check if we need to seed the database
  useEffect(() => {
    const checkForProjects = async () => {
      const projectsExist = await hasProjects();
      setNeedsSeed(!projectsExist);
    };
    
    checkForProjects();
  }, []);

  // Function to seed the database
  const seedProjectsData = async () => {
    setIsSeeding(true);
    try {
      await seedProjects();
      setNeedsSeed(false);
      // Invalidate the query to refetch data
      return true;
    } catch (error) {
      console.error('Error seeding projects:', error);
      toast.error('Failed to seed projects');
      return false;
    } finally {
      setIsSeeding(false);
    }
  };

  // The main query to fetch projects
  const projectsQuery = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      try {
        const projects = await getProjects();
        return projects;
      } catch (error) {
        toast.error('Failed to load projects');
        console.error('Error fetching projects:', error);
        return [];
      }
    },
    enabled: !isSeeding, // Don't run the query while seeding
  });

  return {
    ...projectsQuery,
    isSeeding,
    needsSeed,
    seedProjects: seedProjectsData
  };
}
