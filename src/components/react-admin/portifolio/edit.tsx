import { PortifolioPDF } from '@/components/pdf/portifolio';
import { Edit, useRecordContext } from 'react-admin';
import { PortifolioInputs } from './PortifolioInputs';

export const PageTitle = () => {
	const record = useRecordContext();
	return <span>{record ? `"${record.title}"` : ''}</span>;
};

const Aside = async () => {
	const record = useRecordContext();
	if (!record) {
		return
	}
	return (
		<div style={{ minWidth: 684 }}>
			{/* @ts-expect-error */}
			<PortifolioPDF params={record} />
		</div>
	)
}

export const PortifolioEdit = () => (
	/* @ts-expect-error */
	<Edit aside={<Aside />} title={<PageTitle />}>
		<PortifolioInputs />
	</Edit>
);