import { Edit, ImageField, ImageInput, SimpleForm, TextInput, required } from 'react-admin';

export const WorkEdit = () => (
	<Edit>
		<SimpleForm>
			<TextInput source="title" validate={[required()]} fullWidth />
			<ImageInput source="image_1" label="Imagem - página 1">
				<ImageField source="image_1" title="title" />
			</ImageInput>
			<TextInput source="description_1" validate={[required()]} fullWidth />
			<TextInput source="tech_description_1" validate={[required()]} fullWidth />
			<ImageInput source="image_2" label="Imagem - página 1">
				<ImageField source="image_2" title="title" />
			</ImageInput>
			<TextInput source="description_2" validate={[required()]} fullWidth />
			<TextInput source="tech_description_2" validate={[required()]} fullWidth />
		</SimpleForm>
	</Edit>
);