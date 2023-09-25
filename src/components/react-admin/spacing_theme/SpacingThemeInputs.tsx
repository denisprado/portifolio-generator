import { SimpleForm, TextInput } from 'react-admin';

const SpacingThemeInputs = () => {

	return (
		<SimpleForm>
			<TextInput source="title" label={"Título"} />
			<TextInput source="margin" defaultValue={"10"} label={"Margem"} />
			<TextInput source="spacing" defaultValue={"10"} label={"Spacing"} />
			<TextInput source="image_margin" defaultValue={"10"} label={"Margem da Imagem"} />
		</SimpleForm>
	);
};

export default SpacingThemeInputs