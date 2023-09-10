import { PortifolioPDF } from '@/components/pdf/portifolio';
import { Edit, Loading, useRecordContext } from 'react-admin';
import { PortifolioInputs } from './PortifolioInputs';
import dynamic from 'next/dynamic'
import { Suspense } from 'react';
import { styles } from '@/components/pdf/styles';



export const PageTitle = () => {
	const record = useRecordContext();
	return <span>{record ? `"${record.title}"` : ''}</span>;
};

const Aside = async () => {
	const record = useRecordContext();
	console.log(record)
	if (!record) {
		return
	}
	return (
		<div style={styles.viewer}>
			<Suspense fallback={<Loading />}>
				{/* @ts-expect-error */}
				<PortifolioPDF params={record} />
			</Suspense>
		</div>
	)
}

export const PortifolioEdit = () => (
	/* @ts-expect-error */
	<Edit aside={<Aside />} title={<PageTitle />}>
		<PortifolioInputs />
	</Edit>
);