import { useThemeStyles } from '@/components/pdf/styles';
import dynamic from "next/dynamic";
import { Edit, useGetOne, useRecordContext } from 'react-admin';
import { PageTitle } from '../portifolio/edit';

const WorkPDF = dynamic(() => import("@/components/pdf/work"));
const WorkFields = dynamic(() => import("./WorkFields"));

const Aside = async () => {
	const record = useRecordContext();

	const { data: color_theme } = useGetOne('color_theme', { id: record?.color_theme_id });
	const { data: typography_theme } = useGetOne('typography_theme', { id: record?.typography_theme_id });
	const { data: spacing_theme } = useGetOne('spacing_theme', { id: record?.spacing_theme_id });

	const [styles] = useThemeStyles({ orientation: record?.page_layout ? record?.page_layout : 'portrait', color_theme: color_theme, typography_theme: typography_theme, spacing_theme: spacing_theme })
	return (
		<div style={styles?.viewer}>

			<WorkPDF params={record} />
		</div>
	)
}

export const WorkEdit = () => (
	/* @ts-expect-error */
	<Edit aside={<Aside />} title={<PageTitle />}>
		<WorkFields />
	</Edit >
);

export default WorkEdit