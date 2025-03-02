
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

/**
 * Execute SQL scripts directly via the Supabase API
 * Note: This requires appropriate permissions in your Supabase project
 * @param sql The SQL script to execute
 * @returns Promise resolving to success status
 */
export async function executeSQL(sql: string): Promise<boolean> {
  try {
    // This requires the `supabase.rpc` function with appropriate permissions
    // You may need to create a stored procedure in Supabase that can execute arbitrary SQL
    // For security reasons, this should only be available to authenticated admins
    const { error } = await supabase.rpc('execute_sql', { sql_script: sql });
    
    if (error) {
      console.error('Error executing SQL:', error);
      toast.error('Failed to execute SQL script');
      return false;
    }
    
    toast.success('SQL script executed successfully');
    return true;
  } catch (error) {
    console.error('Error executing SQL script:', error);
    toast.error('Failed to execute SQL script');
    return false;
  }
}

/**
 * Run seed SQL from a file
 * @param filePath Path to the SQL file
 * @returns Promise resolving to success status
 */
export async function runSeedSQL(filePath: string): Promise<boolean> {
  try {
    // In a real application, you would fetch the SQL file
    // This is a simplified version that assumes the SQL is available
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch SQL file: ${response.statusText}`);
    }
    
    const sqlScript = await response.text();
    return executeSQL(sqlScript);
  } catch (error) {
    console.error('Error running seed SQL:', error);
    toast.error('Failed to run seed SQL');
    return false;
  }
}
