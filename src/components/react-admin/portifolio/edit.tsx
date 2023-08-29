import { RichTextInput } from 'ra-input-rich-text';
import { Edit, ReferenceArrayField, SimpleForm, SimpleFormIterator, TextInput, required } from 'react-admin';

export const PortifolioEdit = () => (
	<Edit>
		<SimpleForm>
			<TextInput source="title" validate={[required()]} fullWidth />
			<RichTextInput source="description" />
			<ReferenceArrayField reference="work" source="work_id">
				<SimpleFormIterator inline>
					<TextInput source="title" />
				</SimpleFormIterator>
			</ReferenceArrayField>

		</SimpleForm>
	</Edit>
);