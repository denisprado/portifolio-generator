import { PortifolioPDF } from '@/components/pdf/portifolio';
import { RichTextInput } from 'ra-input-rich-text';
import { Create, ImageField, ImageInput, ReferenceArrayInput, SelectArrayInput, SimpleForm, TabbedForm, TextInput, required, useRecordContext } from 'react-admin';
import { PageTitle } from './edit';
import { Card, CardContent } from '@mui/material';

const Aside = async () => {
	const record = useRecordContext();

	return (
		<div style={{ minWidth: 684 }}>

			<PortifolioPDF params={record} />
		</div>
	)
}

export const PortifolioCreate = () => (

	<Create aside={<Aside />} title={<PageTitle />}>
		<TabbedForm>
			<TabbedForm.Tab label="Capa">
				<TextInput source="title" validate={[required()]} fullWidth />
				<ImageInput accept={'image/png,image/jpg,image/jpeg'} source={`image_1`} label="Imagem" validate={[required()]}>
					<ImageField source="src" title="title" />
				</ImageInput>
				<RichTextInput source="description" label={"Descrição"} />
			</TabbedForm.Tab>
			<TabbedForm.Tab label="Obras">
				<ReferenceArrayInput reference="work" source="work_id" label={"Obras"} validate={[required()]}>
					<SelectArrayInput optionText="title" />
				</ReferenceArrayInput>
			</TabbedForm.Tab>
			<TabbedForm.Tab label="3ª Capa">
				<RichTextInput source="cv" label={"Curriculum Vitae"} />
				<RichTextInput source="bio" label={"Biografia"} />
			</TabbedForm.Tab>
			<TabbedForm.Tab label="4ª Capa">
				<ImageInput accept={'image/png,image/jpg,image/jpeg'} source={`image_2`} label="Imagem" >
					<ImageField source="src" title="title" />
				</ImageInput>
				<RichTextInput source="contact" label={"Contato"} />
			</TabbedForm.Tab>
		</TabbedForm>
	</Create >
);