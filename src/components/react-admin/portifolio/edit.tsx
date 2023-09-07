import { PortifolioPDF } from '@/components/pdf/portifolio';
import { CardContent, Card } from '@mui/material';
import { RichTextInput } from 'ra-input-rich-text';
import { Edit, ImageField, ImageInput, ReferenceArrayInput, SimpleForm, TabbedForm, TextInput, required, useRecordContext } from 'react-admin';

export const PageTitle = () => {
	const record = useRecordContext();
	return <span>{record ? `"${record.title}"` : ''}</span>;
};

const Aside = async () => {
	const record = useRecordContext();
	if (!record) {
		return
	}
	return (
		<div style={{ minWidth: 684 }}>
			{/* @ts-expect-error */}
			<PortifolioPDF params={record} />
		</div>
	)
}

export const PortifolioEdit = () => (
	/* @ts-expect-error */
	<Edit aside={<Aside />} title={<PageTitle />}>
		<TabbedForm>
			<TabbedForm.Tab label="Capa">
				<TextInput source="title" validate={[required()]} fullWidth />
				<ImageInput source={`image_1`} label="Imagem" >
					<ImageField source="src" title="title" />
				</ImageInput>
				<RichTextInput source="description" label={"Descrição"} />
			</TabbedForm.Tab>
			<TabbedForm.Tab label="Obras">
				<ReferenceArrayInput reference="work" source="work_id" label={"Obras"} />
			</TabbedForm.Tab>
			<TabbedForm.Tab label="3ª Capa">
				<RichTextInput source="bio" label={"Biografia"} />
				<RichTextInput source="cv" label={"Curriculum Vitae"} />
			</TabbedForm.Tab>
			<TabbedForm.Tab label="4ª Capa">
				<ImageInput source={`image_2`} label="Imagem" >
					<ImageField source="src" title="title" />
				</ImageInput>
				<RichTextInput source="contact" label={"Contato"} />
			</TabbedForm.Tab>
		</TabbedForm>


	</Edit>
);