import { useThemeStyles } from '@/components/pdf/styles';
import dynamic from "next/dynamic";
import { Create, useGetOne, useRecordContext } from 'react-admin';
import { PortifolioInputs } from './PortifolioInputs';
import { PageTitle } from './edit';

const PortifolioPDF = dynamic(() => import("@/components/pdf/portifolio"), {
	ssr: false,
});

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

export const PortifolioCreate = () => (
	/* @ts-expect-error */
	<Create aside={<Aside />} title={<PageTitle />}>
		<PortifolioInputs />
	</Create >
);

export default PortifolioCreate