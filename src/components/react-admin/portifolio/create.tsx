import { PortifolioPDF } from '@/components/pdf/portifolio';
import { Create, SimpleForm, useRecordContext } from 'react-admin';
import { PageTitle } from './edit';
import { Card, CardContent } from '@mui/material';
import { PortifolioInputs } from './PortifolioInputs';
import { PDFDownloadLink } from '@react-pdf/renderer';

const Aside = async () => {
	const record = useRecordContext();

	return (
		<div style={{ minWidth: 684 }}>
			{/* @ts-expect-error */}
			<PortifolioPDF params={record} />
		</div>
	)
}

export const PortifolioCreate = () => (
	/* @ts-expect-error */
	<Create Create aside={< Aside />} title={< PageTitle />}>
		<PortifolioInputs />
	</Create >
);


