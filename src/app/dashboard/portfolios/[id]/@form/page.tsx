import { AddForm } from './AddForm';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function generateStaticParams() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: portfolios } = await supabase.from('portfolio').select('id');
  return portfolios
    ? portfolios.map((id) => ({
        id
      }))
    : [];
}

export default async function Portfolio({
  params
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
    <div className="w-full col-span-7">
      <AddForm params={{ id: id }} />
    </div>
  );
}
