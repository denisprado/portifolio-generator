

import { supabaseClient } from '@/utils/supabase'

import { notFound } from 'next/navigation'
import { AddForm } from './add-form'

export async function generateStaticParams() {
	const { data: portfolios } = await supabaseClient.from('portfolio').select('id')

	return portfolios ? portfolios.map(({ id }) => ({
		id,
	})) : []
}

export default async function Portfolio({ params, children }: {
	params: { id: string },
	children: React.ReactNode
}) {
	const { id } = params

	const { data: portfolio } = await supabaseClient.from('portfolio').select().match({ id }).single()

	if (!portfolio) {
		notFound()
	}

	return (

		<div className='w-full col-span-7'>
			<AddForm />
		</div>

	)
}