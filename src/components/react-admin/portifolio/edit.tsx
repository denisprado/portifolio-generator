import { Orientation } from '@/components/pdf/portifolio';
import { styles as optionStyles } from '@/components/pdf/styles';
import { Suspense } from 'react';
import { Edit, Loading, useRecordContext } from 'react-admin';
import { PortifolioInputs } from './PortifolioInputs';
import dynamic from "next/dynamic";
const PortifolioPDF = dynamic(() => import("@/components/pdf/portifolio"));

export const PageTitle = () => {
	const record = useRecordContext();
	return <span>{record ? `"${record.title}"` : ''}</span>;
};

const Aside = async () => {
	const record = useRecordContext();
	const styles = optionStyles[record?.page_layout as Orientation]
	return (
		<div style={styles?.viewer}>
			{/* @ts-expect-error */}
			<PortifolioPDF params={record} />
		</div>
	)
}

const PortifolioEdit = () => (
	/* @ts-expect-error */
	<Edit aside={<Aside />} title={<PageTitle />}>
		<PortifolioInputs />
	</Edit>
);

export default PortifolioEdit