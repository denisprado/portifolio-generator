'use client'

import Card from '@/components/ui/Card/Card';
import { supabaseClient } from '@/utils/supabase';
import { DeleteForever } from '@mui/icons-material';
import { CardActions, IconButton } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { deletePortfolio } from './actions';

export const revalidate = 0

export default function portfolios() {
	const initialState = {
		message: '',
	}
	const [state, formAction] = useFormState(deletePortfolio, initialState)
	const [formData, setFormData] = useState({
		id: '',
	});

	const [portfolios, setPortfolios] = useState<any>()

	useEffect(() => {
		const fetchPortfolios = async () => {
			const { data: portfolios } = await supabaseClient.from('portfolio').select('*')

			setPortfolios(portfolios)
		}
		fetchPortfolios()
	}, [])

	if (!portfolios) {
		return null
	}

	return (
		<Grid container spacing={2} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
			{portfolios.map((portfolio: any) => (
				<Grid key={portfolio.id} xs={2} md={2}>
					<Card key={portfolio.id} id={portfolio.id} title={portfolio.title} description={portfolio.description} imageSrc={portfolio.image_1} />
					<CardActions disableSpacing>
						<form action={formAction}>
							<input type='hidden' value={portfolio.id} name={'id'} id={'id'} />
							<IconButton aria-label="delete portfolio" type='submit' >
								<DeleteForever />
							</IconButton>
						</form>
					</CardActions>
				</Grid>
			))}
		</Grid>
	)
}