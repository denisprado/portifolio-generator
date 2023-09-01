import { Create, ImageInput, SimpleForm, TextInput, required } from 'react-admin';

export const WorkCreate = () => (
	<Create>
		<SimpleForm>
			{/* <TextInput source="id" hidden disabled /> */}
			<TextInput source="title" validate={[required()]} />
			<ImageInput source="image_1" label="Imagem 1" />
			<TextInput source="description_1" validate={[required()]} />
			<TextInput source="tech_description_1" validate={[required()]} />
			<ImageInput source="image_2" label="Imagem 2" />
			<TextInput source="description_2" validate={[required()]} />
			<TextInput source="tech_description_2" validate={[required()]} />
		</SimpleForm>
	</Create>
);