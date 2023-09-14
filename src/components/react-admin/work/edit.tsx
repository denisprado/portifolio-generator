import { WorkPDF } from '@/components/pdf/work';
import { Edit, Loading, TabbedForm, TextInput, required, useRecordContext } from 'react-admin';
import { PageTitle } from '../portifolio/edit';
import { PageInputs } from './PageInputs';
import { Suspense } from 'react';
import { styles as optionStyles } from '@/components/pdf/styles';
import { Orientation } from '@/components/pdf/portifolio';

const Aside = async () => {
	const record = useRecordContext();
	const styles = optionStyles[record?.page_layout as Orientation]
	return (
		<div style={styles.viewer}>
			<Suspense fallback={<Loading />}>
				{/* @ts-expect-error */}
				<WorkPDF params={record} />
			</Suspense>
		</div>
	)
}

export const WorkEdit = () => (
	/* @ts-expect-error */
	<Edit aside={<Aside />} title={<PageTitle />}>
		<TabbedForm>
			<TabbedForm.Tab label="Informações da Obra">
				{/* <TextInput source="id" hidden disabled /> */}
				<TextInput source="title" fullWidth label={"Titulo"} validate={[required()]} />
			</TabbedForm.Tab>

			<TabbedForm.Tab label="Página 1">
				<PageInputs n={"1"} />
			</TabbedForm.Tab>
			<TabbedForm.Tab label="Página 2">
				<PageInputs n={"2"} />
			</TabbedForm.Tab>
		</TabbedForm>
	</Edit >
);