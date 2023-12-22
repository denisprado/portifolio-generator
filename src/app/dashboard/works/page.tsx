'use client';

import { deleteWork, editWork } from './actions';
import Card from '@/components/ui/Card/Card';
import { supabaseClient as supabase } from '@/utils/supabase/client';
import { Add, Delete } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { Fab, IconButton } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

export const revalidate = 0;

export default function works() {
	const initialState = {
		message: ''
	};
	const [deteleState, deleteFormAction] = useFormState(
		deleteWork,
		initialState
	);
	const [shouldUpdateWorks, setShouldUpdateWorks] = useState(true)
	const [works, setWorks] = useState<any>();

	useEffect(() => {
		const fetchWorks = async () => {
			const { data: works } = await supabase.from('work').select('*');

			setWorks(works);
			setShouldUpdateWorks(false)
		};
		shouldUpdateWorks && fetchWorks();
	}, [shouldUpdateWorks]);
	const router = useRouter();

	return (
		<div>
			<Grid
				container
				spacing={2}
				rowSpacing={1}
				columnSpacing={{ xs: 1, sm: 2, md: 3 }}
			>
				{works?.map((work: any) => (
					<Grid key={work.id} xs={12} md={4}>
						<Card
							id={work.id}
							title={work.title}
							description={work.description}
							imageSrc={work.image_1_src}
							cardActions={getCardCations(work)}
						/>
					</Grid>
				))}
				<Fab
					color="primary"
					aria-label="edit"
					onClick={() => router.push('works/new')}
				>
					<Add color="primary" />
				</Fab>
			</Grid>
		</div>
	);

	function getCardCations(work: any) {
		return (
			<div className="flex items-center justify-between flex-1 w-full">
				<IconButton
					aria-label="delete work"
					onClick={() => router.push(`/dashboard/works/${work.id}`)}
				>
					<EditIcon color={'primary'} />
				</IconButton>

				<form action={deleteFormAction}>
					<input type="hidden" value={work.id} name={'id'} id={'id'} onClick={() => setShouldUpdateWorks(true)} />
					<IconButton aria-label="delete work" type="submit" >
						<Delete color={'error'} />
					</IconButton>
				</form>
			</div>
		);
	}
}
