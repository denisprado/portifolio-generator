import { RichTextInput } from 'ra-input-rich-text';
import { ImageField, ImageInput, ReferenceArrayInput, SelectArrayInput, TabbedForm, TextInput, WithRecord, required } from 'react-admin';

export const PortifolioInputs = () => {
	return <TabbedForm>
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
			<WithRecord label="Trabalhos" render={record => <div className='flex gap-16 flex-row'><span>{record.title}</span><img src={record.image_1} width={64} height={64} /></div>} />
		</TabbedForm.Tab>
		<TabbedForm.Tab label="3ª Capa">
			<RichTextInput source="bio" label={"Biografia"} />
			<RichTextInput source="cv" label={"Curriculum Vitae"} />
		</TabbedForm.Tab>
		<TabbedForm.Tab label="4ª Capa">
			<ImageInput accept={'image/png,image/jpg,image/jpeg'} source={`image_2`} label="Imagem">
				<ImageField source="src" title="title" />
			</ImageInput>
			<RichTextInput source="contact" label={"Contato"} />
		</TabbedForm.Tab>
	</TabbedForm>;
};
