import { MyDocument } from '@/components/pdf/work';
import ReactPDF from '@react-pdf/renderer';
import { Button, Edit, ImageField, ImageInput, SimpleForm, TextInput, required, useRecordContext } from 'react-admin';


const Aside = async () => {
	const record = useRecordContext();

	async function print() {
		await ReactPDF.render(
			<MyDocument params={record} />, `${"download/example.pdf"}`
		)
	}

	return (
		<div style={{ minWidth: 684, margin: '1em', border: '1px solid red' }}>

			<MyDocument params={record} />
			<Button onClick={() => print()} label="Print"></Button>
		</div>
	)
}

export const WorkEdit = () => (
	<Edit aside={<Aside />}>
		<SimpleForm>
			<TextInput source="title" validate={[required()]} fullWidth />
			<ImageInput source="image_1" label="Imagem - página 1">
				<ImageField source="image_1" title="title" />
			</ImageInput>
			<TextInput source="description_1" validate={[required()]} fullWidth />
			<TextInput source="tech_description_1" validate={[required()]} fullWidth />
			<ImageInput source="image_2" label="Imagem - página 1">
				<ImageField source="image_2" title="title" />
			</ImageInput>
			<TextInput source="description_2" validate={[required()]} fullWidth />
			<TextInput source="tech_description_2" validate={[required()]} fullWidth />
		</SimpleForm>
	</Edit>
);