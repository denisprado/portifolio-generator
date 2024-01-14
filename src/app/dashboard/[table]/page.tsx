import Cards from '@/components/ui/Cards/Cards';
import Navbar from '@/components/ui/Navbar';

export const revalidate = 0;

export default function TableItems({
	params
}: {
	params: { table: 'work' | 'portfolio' };
}) {
	const { table } = params
	return <div className='w-full'>
		<Navbar />
		<div className='items-center justify-center flex border'>
			<Cards table={table} />
		</div>
	</div>
}