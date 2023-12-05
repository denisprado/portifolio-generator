'use client';

import s from './Navbar.module.css';
import { supabaseClient as supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function SignOutButton() {
  const router = useRouter();

  return (
    <button
      className={s.link}
      onClick={async () => {
        await supabase.auth.signOut();
        router.push('/signin');
      }}
    >
      Sair
    </button>
  );
}
