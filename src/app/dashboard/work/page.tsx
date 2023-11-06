import { supabaseClient } from '@/utils/supabase'
import Link from 'next/link'

export const revalidate = 0

export default async function works() {
	const { data: works } = await supabaseClient.from('work').select('*')
	if (!works) {
		return <p>No works found.</p>
	}

	return works.map((work) => (
		<p key={work.id}>
			<Link href={`/${work.id}`} className='btn'>{work.title}</Link>
		</p>
	))
}