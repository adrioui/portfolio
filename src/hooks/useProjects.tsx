
import { useQuery } from '@tanstack/react-query';
import { getProjects } from '@/utils/db-helpers';
import { toast } from 'sonner';

export function useProjects() {
  return useQuery({
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
  });
}
