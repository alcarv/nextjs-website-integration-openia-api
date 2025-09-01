import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type User = {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'basic' | 'intermediate' | 'advanced' | 'professional';
  usage_count: number;
  characters_used: number;
  usage_reset_date: string;
  created_at: string;
};

export type UsageLog = {
  id: string;
  user_id: string;
  text_length: number;
  created_at: string;
};

export type Plan = {
  id: string;
  slug: string;
  name: string;
  price: number;
  humanizations_per_month: number | null;
  word_limit: number | null;
  character_quota: number | null;
};
