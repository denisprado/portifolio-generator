import { useThemeStyles } from '@/components/pdf/styles';
import dynamic from "next/dynamic";
import { Edit, useGetOne, useRecordContext } from 'react-admin';
import { PortifolioInputs } from './PortifolioInputs';
const PortifolioPDF = dynamic(() => import("@/components/pdf/portifolio"));

export const PageTitle = () => {
	const record = useRecordContext();
	return <span>{record ? `"${record.title}"` : ''}</span>;
};

const Aside = async () => {
	const record = useRecordContext();
	const { data: theme } = useGetOne('theme', { id: record?.theme_id });

	const [styles] = useThemeStyles({ orientation: record?.page_layout ? record?.page_layout : 'portrait', theme: theme })
	return (
		<div style={styles?.viewer}>

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

export default PortifolioEdit