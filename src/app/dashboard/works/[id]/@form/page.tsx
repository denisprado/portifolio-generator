import { AddForm } from './AddForm';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function generateStaticParams() {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const { data: works } = await supabase.from('work').select('id');
	return works
		? works.map((id) => ({
			id
		}))
		: [];
}

export default async function Work({
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
