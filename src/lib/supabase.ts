import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder';

if (!import.meta.env.VITE_SUPABASE_URL) {
  console.error("VITE_SUPABASE_URL is missing! Please restart your Vite dev server if you just added it to .env.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
