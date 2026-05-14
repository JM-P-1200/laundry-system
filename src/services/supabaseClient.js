import { createClient } from '@supabase/supabase-js';

/**
 * SERVICE: Supabase Client Initialization
 * Rationale: Using Vite's import.meta.env for secure credential injection.
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('MISSING CORE CREDENTIALS: Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);