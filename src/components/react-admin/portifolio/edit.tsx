import { PortifolioPDF } from '@/components/pdf/portifolio';
import { Edit, Loading, useRecordContext } from 'react-admin';
import { PortifolioInputs } from './PortifolioInputs';
import dynamic from 'next/dynamic'
import { Suspense } from 'react';



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
		<Suspense fallback={<Loading />}>
			<div style={{ minWidth: 684 }}>
				{/* @ts-expect-error */}
				<PortifolioPDF params={record} />
			</div>
		</Suspense>
	)
}

export const PortifolioEdit = () => (
	/* @ts-expect-error */
	<Edit aside={<Aside />} title={<PageTitle />}>
		<PortifolioInputs />
	</Edit>
);