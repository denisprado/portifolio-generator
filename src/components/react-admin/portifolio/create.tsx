import { Orientation } from '@/components/pdf/portifolio';
import { styles as optionStyles } from '@/components/pdf/styles';
import dynamic from "next/dynamic";
import { Create, useRecordContext } from 'react-admin';
import { PortifolioInputs } from './PortifolioInputs';
import { PageTitle } from './edit';
const PortifolioPDF = dynamic(() => import("@/components/pdf/portifolio"));

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


const PortifolioCreate = () => (
	/* @ts-expect-error */
	<Create aside={<Aside />} title={<PageTitle />}>
		<PortifolioInputs />
	</Create >
);

export default PortifolioCreate
