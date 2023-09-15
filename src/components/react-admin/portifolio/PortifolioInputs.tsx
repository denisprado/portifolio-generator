import { RichTextInput } from 'ra-input-rich-text';
import { ImageField, ImageInput, ReferenceArrayInput, SelectArrayInput, SelectInput, TabbedForm, TextInput, required, useGetIdentity, useRecordContext } from 'react-admin';

export const PortifolioInputs = () => {
	const { data } = useGetIdentity();

	return (
		<TabbedForm>
			<TabbedForm.Tab label="Capa">
				<TextInput source="user_id" disabled defaultValue={data?.id} value={data?.id} sx={{ display: 'none' }} />
				<TextInput source="title" validate={[required()]} fullWidth />
				<ImageInput accept={'image/png,image/jpg,image/jpeg'} source={`image_1`} label="Imagem">
					<ImageField source={`src`} />
				</ImageInput>
				<ImageField source={`image_1_src`} />
				<RichTextInput source="description" label={"Descrição"} />
			</TabbedForm.Tab>
			<TabbedForm.Tab label="Obras">
				<ReferenceArrayInput reference="work" source="work_id" label={"Obras"} validate={[required()]}>
					<SelectArrayInput optionText="title" />
				</ReferenceArrayInput>
			</TabbedForm.Tab>
			<TabbedForm.Tab label="3ª Capa">
				<RichTextInput source="bio" label={"Biografia"} />
				<RichTextInput source="cv" label={"Curriculum Vitae"} />
			</TabbedForm.Tab>
			<TabbedForm.Tab label="4ª Capa">
				<ImageInput accept={'image/png,image/jpg,image/jpeg'} source={`image_2`} label="Imagem">
					<ImageField source={`src`} />
				</ImageInput>
				<ImageField source={`image_2_src`} />
				<RichTextInput source="contact" label={"Contato"} />
			</TabbedForm.Tab>
			<TabbedForm.Tab label="Opções">

				<SelectInput source="page_layout" label={"Layout"} choices={[
					{ id: 'portrait', name: 'Retrato' },
					{ id: 'landscape', name: 'Paisagem' },
				]} />

			</TabbedForm.Tab>
		</TabbedForm>
	);
};