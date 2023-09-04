import * as React from 'react';
import { Create, SimpleForm, TextInput, DateInput, required, ReferenceArrayField, SelectInput, SimpleFormIterator, useRecordContext, } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';
import { PortifolioPDF } from '@/components/pdf/portifolio';

const Aside = async () => {
	const record = useRecordContext();
	return (
		<div style={{ minWidth: 684, margin: '1em', border: '1px solid red' }}>
			{/* @ts-expect-error */}
			{/* <PortifolioPDF params={record} /> */}

		</div>
	)
}

export const PortifolioCreate = () => (
	<Create >
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