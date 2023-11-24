'use client';

import { createBrowserClient } from '@supabase/ssr';
import { GoTrueClient } from '@supabase/supabase-js';
import { Database } from 'types';

export const supabaseClient =
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ) ?? '';

export const auth = new GoTrueClient({
  persistSession: typeof window !== 'undefined'
});
