'use client';

import { PORTFOLIO } from '@/app/constants';
import Cards from '@/components/ui/Cards/Cards';

export const revalidate = 0;

export default function works() {
	return <Cards table={PORTFOLIO} />
}