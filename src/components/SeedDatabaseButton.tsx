
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { seedProjects } from '@/utils/seed-data';
import { Loader2 } from 'lucide-react';

interface SeedDatabaseButtonProps {
  onSuccess?: () => void;
}

const SeedDatabaseButton: React.FC<SeedDatabaseButtonProps> = ({ onSuccess }) => {
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    try {
      const success = await seedProjects();
      if (success && onSuccess) {
        onSuccess();
      }
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Button 
      onClick={handleSeedDatabase} 
      disabled={isSeeding}
      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
    >
      {isSeeding ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Seeding Database...
        </>
      ) : (
        "Seed Database with Projects"
      )}
    </Button>
  );
};

export default SeedDatabaseButton;
