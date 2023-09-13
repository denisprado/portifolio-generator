import { WorkPDF } from '@/components/pdf/work';
import { Create, Loading, useRecordContext } from 'react-admin';
import { PageTitle } from '../portifolio/edit';
import { WorkFields } from './WorkFields';
import { Suspense } from 'react';
import { styles } from '@/components/pdf/styles';
const Aside = async () => {
	const record = useRecordContext();

	return (
		<div style={styles.viewer}>
			<Suspense fallback={<Loading />}>
				{/* @ts-expect-error */}
				<WorkPDF params={record} />
			</Suspense>
		</div>
	)
}
export const WorkCreate = () => (
	/* @ts-expect-error */
	<Create aside={<Aside />} title={<PageTitle />}>
		<WorkFields />
	</Create>
);

export type PageFieldsProps = {
	n: string
}

