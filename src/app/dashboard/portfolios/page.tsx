'use client'

import Card from '@/components/ui/Card/Card';
import { supabaseClient } from '@/utils/supabase';
import { Add, Delete } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { Fab, IconButton } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { deletePortfolio, editPortfolio } from './actions';
import { useRouter } from 'next/navigation'


export const revalidate = 0

export default function portfolios() {
	const initialState = {
		message: '',
	}
	const [deteleState, deleteFormAction] = useFormState(deletePortfolio, initialState)
	const [portfolios, setPortfolios] = useState<any>()

	useEffect(() => {
		const fetchPortfolios = async () => {
			const { data: portfolios } = await supabaseClient.from('portfolio').select('*')

			setPortfolios(portfolios)
		}
		fetchPortfolios()
	}, [])
	const router = useRouter()

	if (!portfolios) {
		return null
	}

	return (
		<Grid container spacing={2} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
			{portfolios.map((portfolio: any) => (
				<Grid key={portfolio.id} xs={12} md={4} >
					<Card id={portfolio.id} title={portfolio.title} description={portfolio.description} imageSrc={portfolio.image_1} cardActions={getCardCations(portfolio)} />
				</Grid>
			))}
			<Fab color="primary" aria-label="edit" onClick={() => router.push('portfolios/new')}>
				<Add color="primary" />
			</Fab>
		</Grid>
	)


	function getCardCations(portfolio: any) {
		return (
			<div className='flex justify-between items-center w-full flex-1'>


				<IconButton aria-label="delete portfolio" onClick={() => router.push(`/dashboard/portfolios/${portfolio.id}`)}>
					<EditIcon color={'primary'} />
				</IconButton>

				<form action={deleteFormAction}>
					<input type='hidden' value={portfolio.id} name={'id'} id={'id'} />
					<IconButton aria-label="delete portfolio" type='submit'>
						<Delete color={'error'} />
					</IconButton>
				</form>
			</div>
		);
	}
}