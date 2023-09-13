import { RichTextInput } from 'ra-input-rich-text';
import { ImageField, ImageInput, ReferenceArrayInput, SelectArrayInput, TabbedForm, TextInput, required, useGetIdentity, useRecordContext } from 'react-admin';
import MyImageField from '../common/MyImageField';

export const PortifolioInputs = () => {
	const { data } = useGetIdentity();

	return (
		<TabbedForm>
			<TabbedForm.Tab label="Capa">
				<TextInput source="user_id" disabled defaultValue={data?.id} value={data?.id} />
				<TextInput source="title" validate={[required()]} fullWidth />
				<ImageInput accept={'image/png,image/jpg,image/jpeg'} source={`image_1`} label="Imagem">
					<ImageField source={`src`} />
				</ImageInput>
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
					<ImageField source={`image_2_src`} />
				</ImageInput>
				<ImageField source={`image_2`} />
				<RichTextInput source="contact" label={"Contato"} />
			</TabbedForm.Tab>
		</TabbedForm>
	);
};
