'use client'

import PortfolioPdfView from '@/components/pdf/portfolioPdfView'

export default function PdfView({ params: { id } }: { params: { id: string } }) {
	console.log(id)
	if (!id) {
		return null
	}

	return <PortfolioPdfView id={id} />
}