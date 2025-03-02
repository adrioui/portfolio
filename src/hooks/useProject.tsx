
import { useQuery } from '@tanstack/react-query';
import { getProjectById } from '@/utils/db-helpers';
import { toast } from 'sonner';

export function useProject(id: string | undefined) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      if (!id) return null;
      
      try {
        const project = await getProjectById(id);
        return project;
      } catch (error) {
        toast.error('Failed to load project details');
        console.error('Error fetching project:', error);
        return null;
      }
    },
    enabled: !!id, // Only run the query if we have an ID
  });
}
