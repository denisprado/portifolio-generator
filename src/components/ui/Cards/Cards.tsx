'use client';

import { PORTFOLIO, WORK } from '@/app/constants';
import { deletePortfolio } from '@/app/dashboard/portfolios/actions';
import { deleteWork } from '@/app/dashboard/works/actions';
import Card from '@/components/ui/Card/Card';
import { supabaseClient as supabase } from '@/utils/supabase/client';
import { PencilIcon, TrashIcon, ViewColumnsIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useFormState } from 'react-dom';

export const revalidate = 0;

export default function Cards({ table }: { table: 'work' | 'portfolio' }) {


	const initialState = {
		message: ''
	};
	const [deteleState, deleteFormAction] = useFormState(
		table === PORTFOLIO ? deletePortfolio : deleteWork,
		initialState
	);

	const [shouldUpdateTables, setShouldUpdatePotfolios] = useState(true)
	const [items, setItems] = useState<any>();

	useEffect(() => {
		const fetchTables = async () => {
			const { data: items } = await supabase.from(table).select('*');

			setItems(items);
			setShouldUpdatePotfolios(false)
		};
		shouldUpdateTables && fetchTables();
	}, [shouldUpdateTables]);
	const router = useRouter();

	return (

		<div className='flex flex-col gap-4'>
			<button
				className="btn btn-primary btn-xs sm:btn-sm md:btn-md  max-w-56"
				aria-label="new"
				onClick={() => router.push(`/dashboard/${table}s/new`)}
			>
				Criar {table === WORK ? 'trabalho' : 'portfolio'}
			</button>
			<div className='flex flex-row gap-4 flex-wrap'>

				{items?.map((item: any) => (

					<Card
						key={item.id}
						id={item.id}
						title={item.title}
						description={item.description}
						imageSrc={item.image_1_src}
						cardActions={getCardCations(item)}
					/>

				))}
			</div>

		</div>

	);

	function getCardCations(item: any) {
		return (
			<div className="flex w-full flex-row flex-wrap gap-1">
				<button className='btn btn-sm hover:text-primary'
					aria-label={"view " + table}

					onClick={() => router.push(`/dashboard/${table}s/${item.id}?type=view`)}
				>Visualizar
					<ViewColumnsIcon className='h-6 w-6' />
				</button>
				<button className='btn btn-sm hover:text-primary'
					aria-label={"edit " + table}
					onClick={() => router.push(`/dashboard/${table}s/${item.id}/?type=edit`)}
				>Editar
					<PencilIcon className='h-6 w-6' />
				</button>

				<form action={deleteFormAction}>
					<input type="hidden" value={items.id} name={'id'} id={'id'} onClick={() => setShouldUpdatePotfolios(true)} />
					<button className='btn btn-sm btn-error btn-outline hover:text-white' aria-label={"delete" + table} type="submit" >
						Excluir <TrashIcon className='h-6 w-6' />
					</button>
				</form>
			</div>
		);
	}
}
