import { WorkPDF } from '@/components/pdf/work';
import ReactPDF from '@react-pdf/renderer';
import { Button, Edit, ImageField, ImageInput, SimpleForm, TabbedForm, TextInput, required, useRecordContext } from 'react-admin';
import { PageFields } from './create';
import { PageTitle } from '../portifolio/edit';

const Aside = async () => {
	const record = useRecordContext();

	return (
		<div style={{ minWidth: 684, margin: '1em', border: '1px solid red' }}>
			{/* @ts-expect-error */}
			<WorkPDF params={record} />
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
				<PageFields n={"1"} />
			</TabbedForm.Tab>
			<TabbedForm.Tab label="Página 2">
				<PageFields n={"2"} />
			</TabbedForm.Tab>
		</TabbedForm>
	</Edit >
);