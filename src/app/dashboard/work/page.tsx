import { WorkType } from '../portfolios/types';
import { supabaseClient as supabase } from '@/utils/supabase/client';
import Link from 'next/link';

export const revalidate = 0;

export default async function works() {
  const { data: works } = await supabase.from('work').select('*');
  if (!works) {
    return <p>No works found.</p>;
  }

  return works.map((work: WorkType) => (
    <p key={work.id}>
      <Link href={`/${work.id}`} className="btn">
        {work.title}
      </Link>
    </p>
  ));
}
