'use client'

import { PORTFOLIO, WORK } from '@/app/constants'
import PortfolioPdfView from '@/components/pdf/portfolioPdfView'
import WorkPdfView from '@/components/pdf/workPdfView'

const componentMap = {
	[PORTFOLIO]: PortfolioPdfView,
	[WORK]: WorkPdfView,
};

export default function PdfView({ params }: { params: { table: 'work' | 'portfolio', id: string } }) {
	console.log(params)
	const { table, id } = params

	if (!table) {
		return null
	}

	const SelectedComponent = componentMap[table];

	if (!SelectedComponent) {
		return null;
	}

	return <SelectedComponent id={id} />;
}