'use client';

import Cards from '@/components/ui/Cards/Cards';

export const revalidate = 0;

export default function works({
	params
}: {
	params: { table: 'work' | 'portfolio' };
}) {
	const { table } = params
	return <Cards table={table} />
}