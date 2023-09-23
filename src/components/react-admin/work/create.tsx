import { useThemeStyles } from '@/components/pdf/styles';
import dynamic from "next/dynamic";
import { Create, useGetOne, useRecordContext } from 'react-admin';
import { PageTitle } from '../portifolio/edit';

const WorkPDF = dynamic(() => import("@/components/pdf/work"));
const WorkFields = dynamic(() => import("./WorkFields"));

const Aside = async () => {
	const record = useRecordContext();
	const { data: theme, isLoading, error } = useGetOne('theme', { id: record?.theme_id });
	const [styles] = useThemeStyles({ orientation: record?.page_layout ? record?.page_layout : 'portrait', theme: theme })
	return (
		<div style={styles?.viewer}>

			<WorkPDF params={record} />
		</div>
	)
}
export const WorkCreate = () => (
	/* @ts-expect-error */
	<Create aside={<Aside />} title={<PageTitle />} >
		<WorkFields />
	</Create>
);

export type PageFieldsProps = {
	n: string
}

export default WorkCreate