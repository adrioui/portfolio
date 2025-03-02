
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProjects } from '@/utils/db-helpers';
import { toast } from 'sonner';
import { checkIfProjectsExist } from '@/utils/seed-data';
import { useState, useEffect } from 'react';

export function useProjects() {
  const [hasProjects, setHasProjects] = useState<boolean | null>(null);
  const queryClient = useQueryClient();

  // Check if projects exist
  useEffect(() => {
    const checkProjects = async () => {
      const exists = await checkIfProjectsExist();
      setHasProjects(exists);
    };
    
    checkProjects();
  }, []);

  // Handle project seeding success
  const handleSeedSuccess = () => {
    setHasProjects(true);
    queryClient.invalidateQueries({ queryKey: ['projects'] });
  };

  // Query for projects
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
    enabled: hasProjects !== null, // Only run query when we know if projects exist
  });

  return {
    ...projectsQuery,
    hasProjects,
    handleSeedSuccess,
  };
}
