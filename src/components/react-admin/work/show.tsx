import * as React from "react";
import { Show, SimpleShowLayout, TextField, DateField, RichTextField, ReferenceArrayField, Datagrid, EditButton, NumberField, CreateButton, ShowButton, Button, Link, DeleteButton, SaveButton, Toolbar, ToolbarProps, useRecordContext, SimpleForm, ImageField } from 'react-admin';


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

export const WorkShow = (props: any) => (
	<Show {...props}>
		<SimpleShowLayout>
			<TextField source="title" />
			<TextField source="description" />

			<ImageField source="image_1" />
			<TextField source="description_1" />
			<TextField source="tech_description_1" />

			<ImageField source="image_1" />
			<TextField source="description_1" />
			<TextField source="tech_description_1" />

		</SimpleShowLayout>
	</Show >
);