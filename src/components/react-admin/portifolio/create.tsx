import { PortifolioPDF } from '@/components/pdf/portifolio';
import { Suspense } from 'react';
import { Create, Loading, useRecordContext } from 'react-admin';
import { PortifolioInputs } from './PortifolioInputs';
import { PageTitle } from './edit';
import { styles as optionStyles } from '@/components/pdf/styles';
import { Orientation } from '@/components/pdf/portifolio';

const Aside = async () => {
	const record = useRecordContext();
	const styles = optionStyles[record?.page_layout as Orientation]
	return (
		<div style={styles.viewer}>
			<Suspense fallback={<Loading />}>
				{/* @ts-expect-error */}
				<PortifolioPDF params={record} />
			</Suspense>
		</div>
	)
}


export const PortifolioCreate = () => (
	/* @ts-expect-error */
	<Create aside={<Aside />} title={<PageTitle />}>
		<PortifolioInputs />
	</Create >
);


