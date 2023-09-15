import { Orientation } from '@/components/pdf/portifolio';
import { styles as optionStyles } from '@/components/pdf/styles';
import dynamic from "next/dynamic";
import { Edit, useRecordContext } from 'react-admin';
import { PageTitle } from '../portifolio/edit';

const WorkPDF = dynamic(() => import("@/components/pdf/work"));
const WorkFields = dynamic(() => import("./WorkFields"));

const Aside = async () => {
	const record = useRecordContext();
	const styles = optionStyles[record?.page_layout as Orientation]
	return (
		<div style={styles?.viewer}>
			{/* @ts-expect-error */}
			<WorkPDF params={record} />
		</div>
	)
}

const WorkEdit = () => (
	/* @ts-expect-error */
	<Edit aside={<Aside />} title={<PageTitle />}>
		<WorkFields />
	</Edit >
);

export default WorkEdit