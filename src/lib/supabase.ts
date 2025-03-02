
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

// These environment variables are set by Vite at build time
// They should be prefixed with VITE_ to be exposed to the client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Initialize the Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Create a type helper for our database tables
export type Tables = Database;
