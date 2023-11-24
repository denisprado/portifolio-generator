import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const cookieStore = cookies();

export const supabaseServer = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      }
    }
  }
);