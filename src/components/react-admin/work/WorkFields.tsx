import { TabbedForm, TextInput, required, useGetIdentity } from 'react-admin';
import { PageInputs } from './PageInputs';

export const WorkFields = () => {
	const { data } = useGetIdentity();

	return (
		<TabbedForm>
			<TextInput source="user_id" sx={{ display: 'none' }} value={data?.id} defaultValue={data?.id} />
			<TabbedForm.Tab label="Informações da Obra">
				{/* <TextInput source="id" hidden disabled /> */}
				<TextInput source="title" fullWidth label={"Titulo"} validate={[required()]} />
			</TabbedForm.Tab>
			<TabbedForm.Tab label="Página 1">
				<PageInputs n={"1"} />
			</TabbedForm.Tab>
			<TabbedForm.Tab label="Página 2">
				<PageInputs n={"2"} />
			</TabbedForm.Tab>
		</TabbedForm>
	)
};
