import { useThemeStyles } from '@/components/pdf/styles';
import dynamic from "next/dynamic";
import { Create, useGetOne, useRecordContext } from 'react-admin';
import { PageTitle } from './edit';

const PortifolioInputs = dynamic(() => import("@/components/react-admin/portifolio/PortifolioInputs"));
const PortifolioPDF = dynamic(() => import("@/components/pdf/portifolio"), {
	ssr: false,
});

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

export const PortifolioCreate = () => (
	/* @ts-expect-error */
	<Create aside={<Aside />} title={<PageTitle />}>
		<PortifolioInputs />
	</Create >
);

export default PortifolioCreate