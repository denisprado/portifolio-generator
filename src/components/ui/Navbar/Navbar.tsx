import s from './Navbar.module.css';
import SignOutButton from './SignOutButton';
import Logo from '@/components/icons/Logo';
import { supabaseServer as supabase } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function Navbar() {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="max-w-6xl px-6 mx-auto">
        <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
          <div className="flex items-center flex-1">
            <Link href="/" className={s.logo} aria-label="Logo">
              <Logo />
            </Link>
            <nav className="hidden ml-6 space-x-2 lg:block">
              <Link href="/dashboard/portfolios" className={s.link}>
                Criar portfolio
              </Link>
              {user && (
                <Link href="/account" className={s.link}>
                  Conta
                </Link>
              )}
            </nav>
          </div>
          <div className="flex justify-end flex-1 space-x-8">
            {user ? (
              <SignOutButton />
            ) : (
              <Link href="/signin" className={s.link}>
                Entrar
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
