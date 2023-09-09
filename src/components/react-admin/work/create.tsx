import { WorkPDF } from '@/components/pdf/work';
import { Create, useRecordContext } from 'react-admin';
import { PageTitle } from '../portifolio/edit';
import { WorkFields } from './WorkFields';
const Aside = async () => {
	const record = useRecordContext();

	return (
		<div style={{ minWidth: 684, margin: '1em' }}>
			{/* @ts-expect-error */}
			<WorkPDF params={record} />
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

