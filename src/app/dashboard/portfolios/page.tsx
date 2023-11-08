import Card from '@/components/ui/Card/Card';
import { supabaseClient } from '@/utils/supabase';
import Grid from '@mui/material/Unstable_Grid2';

export const revalidate = 0

export default async function portfolios() {
	const { data: portfolios } = await supabaseClient.from('portfolio').select('*')
	if (!portfolios) {
		return <p>No portfolios found.</p>
	}

	return (
		<Grid container spacing={2} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
			{portfolios.map((portfolio) => (
				<Grid key={portfolio.id} xs={2} md={2}>
					<Card key={portfolio.id} id={portfolio.id} title={portfolio.title} description={portfolio.description} imageSrc={portfolio.image_1} />
				</Grid>
			))}
		</Grid>
	)
}