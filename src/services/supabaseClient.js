import { createClient } from '@supabase/supabase-js';

/**
 * SERVICE: Supabase Client Initialization
 * Rationale: Using Vite's import.meta.env for secure credential injection.
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jcjvumedsgslxgxmumsb.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjanZ1bWVkc2dzbHhneG11bXNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNDEyNDAsImV4cCI6MjA5MzYxNzI0MH0.5NnF2KJtVmhxHtoWE3XQSk_aEvuEHkJV3mEMKsy0BD8';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('MISSING CORE CREDENTIALS: Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);