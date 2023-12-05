'use client';

import { getURL } from '@/utils/helpers';
import { supabaseClient as supabase } from '@/utils/supabase/client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function AuthUI() {
  return (
    <div className="flex flex-col space-y-4">
      <Auth
        supabaseClient={supabase}
        providers={['github']}
        redirectTo={`${getURL()}/auth/callback`}
        magicLink={true}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#52525b'
              }
            }
          }
        }}
        theme="dark"
      />
    </div>
  );
}
