import { useThemeStyles } from '@/components/pdf/styles';
import dynamic from "next/dynamic";
import { Edit, useGetOne, useRecordContext } from 'react-admin';

const PortifolioPDF = dynamic(() => import("@/components/pdf/portifolio"));
const PortifolioInputs = dynamic(() => import("@/components/react-admin/portifolio/PortifolioInputs"));

export const PageTitle = () => {
	const record = useRecordContext();
	return <span>{record ? `"${record.title}"` : ''}</span>;
};

const Aside = async () => {
	const record = useRecordContext();

	const { data: color_theme } = useGetOne('color_theme', { id: record?.color_theme_id });
	const { data: typography_theme } = useGetOne('color_theme', { id: record?.color_theme_id });

	const [styles] = useThemeStyles({ orientation: record?.page_layout ? record?.page_layout : 'portrait', color_theme: color_theme, typography_theme: typography_theme })

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