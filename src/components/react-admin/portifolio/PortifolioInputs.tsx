import { ImageField, ImageInput, ReferenceArrayInput, ReferenceInput, SelectArrayInput, SelectInput, TabbedForm, TextInput, required, useGetIdentity } from 'react-admin';

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
				<TextInput source="description" label={"Descrição"} fullWidth />
			</TabbedForm.Tab>
			<TabbedForm.Tab label="Obras">
				<ReferenceArrayInput reference="work" source="work_id" label={"Obras"} validate={[required()]}>
					<SelectArrayInput optionText="title" />
				</ReferenceArrayInput>
			</TabbedForm.Tab>
			<TabbedForm.Tab label="3ª Capa">
				<TextInput fullWidth source="bio" label={"Biografia"} />
				<TextInput source="cv" fullWidth label={"Curriculum Vitae"} />
			</TabbedForm.Tab>
			<TabbedForm.Tab label="4ª Capa">
				<ImageInput accept={'image/png,image/jpg,image/jpeg'} source={`image_2`} label="Imagem">
					<ImageField source={`src`} />
				</ImageInput>
				<ImageField source={`image_2_src`} />
				<TextInput fullWidth source="contact" label={"Contato"} />
			</TabbedForm.Tab>
			<TabbedForm.Tab label="Opções">
				<SelectInput source="page_layout" label={"Layout"} defaultValue={'portrait'} emptyText={"Selecione um layout"} emptyValue={'portrait'} choices={[
					{ id: 'portrait', name: 'Retrato' },
					{ id: 'landscape', name: 'Paisagem' },
				]} />
				<ReferenceInput source="color_theme_id" reference="color_theme" />
				<ReferenceInput source="typography_theme_id" reference="typography_theme" />
				<ReferenceInput source="spacing_theme_id" reference="spacing_theme" />
			</TabbedForm.Tab>
		</TabbedForm>
	);
};

export default PortifolioInputs