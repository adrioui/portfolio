
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useProjects } from '@/hooks/useProjects';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { runSeedSQL } from '@/utils/run-sql';

const SeedDatabaseButton = () => {
  const { isSeeding, needsSeed, seedProjects, refetch } = useProjects();
  const [seedMethod, setSeedMethod] = useState<'js' | 'sql'>('js');
  const [isSeedingSQL, setIsSeedingSQL] = useState(false);

  const handleSeedJS = async () => {
    const success = await seedProjects();
    if (success) {
      refetch();
    }
  };

  const handleSeedSQL = async () => {
    setIsSeedingSQL(true);
    try {
      // Path to the SQL file - in production, this would be a proper path or API endpoint
      const sqlPath = '/src/migrations/seed-projects.sql';
      const success = await runSeedSQL(sqlPath);
      
      if (success) {
        toast.success('Database seeded successfully using SQL scripts');
        refetch();
      } else {
        toast.error('Failed to seed database with SQL');
      }
    } catch (error) {
      console.error('Error seeding with SQL:', error);
      toast.error('Failed to seed database with SQL');
    } finally {
      setIsSeedingSQL(false);
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
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={handleSeedJS} 
          disabled={isSeeding || isSeedingSQL}
          className="flex items-center gap-2"
          variant="default"
        >
          {isSeeding && <Loader2 className="w-4 h-4 animate-spin" />}
          {isSeeding ? 'Adding Projects...' : 'Add Sample Projects (JS)'}
        </Button>
        
        <Button 
          onClick={handleSeedSQL} 
          disabled={isSeeding || isSeedingSQL}
          className="flex items-center gap-2"
          variant="outline"
        >
          {isSeedingSQL && <Loader2 className="w-4 h-4 animate-spin" />}
          {isSeedingSQL ? 'Running SQL...' : 'Add Sample Projects (SQL)'}
        </Button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Note: SQL seeding requires appropriate database permissions.
      </p>
    </div>
  );
};

export default SeedDatabaseButton;
