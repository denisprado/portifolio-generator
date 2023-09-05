import { RichTextInput } from 'ra-input-rich-text';
import { Edit, ReferenceArrayField, ReferenceArrayInput, SimpleForm, SimpleFormIterator, TextInput, required, useRecordContext } from 'react-admin';
import { PortifolioPDF } from '@/components/pdf/portifolio';


const Aside = async () => {
	const record = useRecordContext();
	return (
		<div style={{ minWidth: 684, margin: '1em', border: '1px solid red' }}>
			{/* @ts-expect-error */}
			<PortifolioPDF params={record} />

		</div>
	)
}

export const PortifolioEdit = () => (
	/* @ts-expect-error */
	<Edit aside={<Aside />}>
		<SimpleForm>

			<TextInput source="title" validate={[required()]} fullWidth label={"Título"} />
			<RichTextInput source="description" label={"Descrição"} />
			<ReferenceArrayInput reference="work" source="work_id" label={"Obras"} />
		</SimpleForm>


	</Edit>
);