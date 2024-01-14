'use client'

import { useParams } from 'next/navigation'
import * as React from 'react';

type CardType = {
	title: string,
	description: string,
	imageSrc: string,
	id: string,
	cardActions: React.ReactNode
}

export default function Card({ id, title, description, imageSrc, cardActions }: CardType) {
	const params = useParams<{ id: string }>()
	const { id: actualId } = params
	return (

		<div className="card w-full col-span-4 bg-base-100 shadow-xl">
			<figure><img src={imageSrc} alt={title} className={actualId === id ? 'grayscale-0' : 'grayscale'} /></figure>
			<div className="card-body">
				<h2 className="card-title">{title}</h2>
				<p>{description}</p>
				<div className="card-actions justify-end">
					{cardActions}
				</div>
			</div>
		</div>

		// </Link>
	);
}