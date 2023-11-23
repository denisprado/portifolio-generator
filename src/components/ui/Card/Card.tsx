import * as React from 'react';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import Link from 'next/link';

type CardType = {
	title: string,
	description: string,
	imageSrc: string,
	id: string,
	cardActions: React.ReactNode
}

export default function Card({ id, title, description, imageSrc, cardActions }: CardType) {
	return (
		// <Link href={`/dashboard/portfolios/addForm/${id}`} className='btn'>
		<MuiCard sx={{ maxWidth: 345 }}>
			<CardActionArea>
				<CardMedia
					component="img"
					height="140"
					image={imageSrc}
					alt={title}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{description}
					</Typography>
				</CardContent>
				<CardActions disableSpacing>
					{cardActions}
				</CardActions>
			</CardActionArea>
		</MuiCard>
		// </Link>
	);
}