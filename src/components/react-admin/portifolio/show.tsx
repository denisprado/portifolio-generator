import * as React from "react";
import { Show, SimpleShowLayout, TextField, DateField, RichTextField, ReferenceArrayField, Datagrid, EditButton, NumberField, CreateButton, ShowButton, Button, Link, DeleteButton, SaveButton, Toolbar, ToolbarProps, useRecordContext, SimpleForm } from 'react-admin';


const CommentFormToolbar: React.VFC<ToolbarProps> = (props) => {
	const { work_id } = useRecordContext();

	return (
		<Toolbar {...props}>
			<ShowButton resource={`work`} />
			<EditButton />
			<ShowButton />
			<CreateButton resource="work" />
		</Toolbar>
	);
};

export const PortifolioShow = (props: any) => (
	<Show {...props}>
		<SimpleShowLayout>
			<TextField source="title" />
			<TextField source="description" />
			<ReferenceArrayField label="Trabalhos" reference="work" source="work_id" >
				<Datagrid>
					<TextField source="title" />
					<TextField source="description" />

					<SimpleForm toolbar={<CommentFormToolbar />}>teste</SimpleForm>
				</Datagrid>
			</ReferenceArrayField>

		</SimpleShowLayout>
	</Show >
);