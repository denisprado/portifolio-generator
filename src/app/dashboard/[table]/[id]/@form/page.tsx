import { PORTFOLIO, WORK } from '@/app/constants';
import { WorkForm } from './workForm';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { PortfolioForm } from './portfolioForm';


const formComponentMap = {
	'work': WorkForm,
	'portfolio': PortfolioForm,
};

export async function generateStaticParams() {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const { data: items } = await supabase.from('table').select('id');
	return items
		? items.map((item) => ({ id: String(item.id) })) // Garante que o id seja uma string
		: [];
}

export default async function Form({
	params
}: {
	params: { id: string, table: 'work' | 'portfolio' };
}) {
	const { id, table } = params;
	const SelectedForm = formComponentMap[table];

	if (!SelectedForm) {
		return null;
	}

	return (
		<div className="w-full col-span-6 p-8">
			<SelectedForm params={{ id: id }} />
		</div>
	);
}
