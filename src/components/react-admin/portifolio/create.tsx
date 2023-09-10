import { PortifolioPDF } from '@/components/pdf/portifolio';
import { Suspense } from 'react';
import { Create, Loading, useRecordContext } from 'react-admin';
import { PortifolioInputs } from './PortifolioInputs';
import { PageTitle } from './edit';
import { styles } from '@/components/pdf/styles';

const Aside = async () => {
	const record = useRecordContext();
	console.log(record)
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
	<Create aside={< Aside />} title={< PageTitle />}>
		<PortifolioInputs />
	</Create >
);


