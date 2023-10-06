import { ReferenceInput, SelectInput, TabbedForm, TextInput, required, useGetIdentity } from 'react-admin';
import { PageInputs } from './PageInputs';

const WorkFields = () => {
	const { data } = useGetIdentity();

	return (
		<TabbedForm>
			<TabbedForm.Tab label="Informações da Obra">
				<TextInput source="user_id" sx={{ display: 'none' }} value={data?.id} defaultValue={data?.id} />
				{/* <TextInput source="id" hidden disabled /> */}
				<TextInput source="title" fullWidth label={"Titulo"} validate={[required()]} />
			</TabbedForm.Tab>
			<TabbedForm.Tab label="Página 1">
				<PageInputs n={"1"} />
			</TabbedForm.Tab>
			<TabbedForm.Tab label="Página 2">
				<PageInputs n={"2"} />
			</TabbedForm.Tab>
			<TabbedForm.Tab label="Opções">
				<SelectInput source="page_layout" label={"Layout"} emptyText={"Selecione um layout"} defaultValue={'portrait'} emptyValue={'portrait'} choices={[
					{ id: 'portrait', name: 'Retrato' },
					{ id: 'landscape', name: 'Paisagem' },
				]} />
				<ReferenceInput source="color_theme_id" reference="color_theme" />
				<ReferenceInput source="typography_theme_id" reference="typography_theme" />
				<ReferenceInput source="spacing_theme_id" reference="spacing_theme" />
			</TabbedForm.Tab>
		</TabbedForm>
	)
};

export default WorkFields