import { Create, ImageField, ImageInput, SimpleForm, TextInput, required } from 'react-admin';

export const WorkCreate = () => (
	<Create>
		<SimpleForm>
			<TextInput source="title" validate={[required()]} fullWidth />
			<ImageInput source="image_1" label="Imagem 1" />
			<TextInput source="description_1" validate={[required()]} fullWidth />
			<TextInput source="tech_description_1" validate={[required()]} fullWidth />
			<ImageInput source="image_2" label="Imagem 1" />
			<TextInput source="description_2" validate={[required()]} fullWidth />
			<TextInput source="tech_description_2" validate={[required()]} fullWidth />
		</SimpleForm>
	</Create>
);