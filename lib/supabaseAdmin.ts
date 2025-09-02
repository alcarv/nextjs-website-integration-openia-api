import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;
  if (!supabaseUrl) {
    throw new Error('SUPABASE url is required (NEXT_PUBLIC_SUPABASE_URL)');
  }
  if (!serviceRoleKey) {
    throw new Error('SUPABASE service role key is required (SUPABASE_SERVICE_ROLE_KEY)');
  }
  cached = createClient(supabaseUrl, serviceRoleKey);
  return cached;
}

