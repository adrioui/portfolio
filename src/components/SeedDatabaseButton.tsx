
import React from 'react';
import { Button } from '@/components/ui/button';
import { useProjects } from '@/hooks/useProjects';
import { Loader2 } from 'lucide-react';

const SeedDatabaseButton = () => {
  const { isSeeding, needsSeed, seedProjects, refetch } = useProjects();

  const handleSeed = async () => {
    const success = await seedProjects();
    if (success) {
      refetch();
    }
  };

  if (needsSeed === null || needsSeed === false) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 mb-8 border rounded-md border-dashed border-border bg-background/50">
      <p className="mb-4 text-center text-muted-foreground">
        No projects found in the database. Would you like to add some sample projects?
      </p>
      <Button 
        onClick={handleSeed} 
        disabled={isSeeding}
        className="flex items-center gap-2"
      >
        {isSeeding && <Loader2 className="w-4 h-4 animate-spin" />}
        {isSeeding ? 'Adding Projects...' : 'Add Sample Projects'}
      </Button>
    </div>
  );
};

export default SeedDatabaseButton;
