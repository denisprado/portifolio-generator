import * as React from 'react';
import { Create, SimpleForm, TextInput, DateInput, required, ReferenceArrayField, SelectInput, SimpleFormIterator, } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';

export const PortifolioCreate = () => (
	<Create>
		<SimpleForm>
			<TextInput source="title" validate={[required()]} fullWidth />
			<RichTextInput source="description" />
			<ReferenceArrayField reference="work" source="work_id">
				<SimpleFormIterator inline>
					<TextInput source="title" />
				</SimpleFormIterator>
			</ReferenceArrayField>

		</SimpleForm>
	</Create>
);