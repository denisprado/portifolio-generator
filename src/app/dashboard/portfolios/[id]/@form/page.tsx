import { AddForm } from './AddForm';
import { supabaseServer as supabase } from '@/utils/supabase/server';

export async function generateStaticParams() {
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
