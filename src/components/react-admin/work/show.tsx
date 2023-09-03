import { MyDocument } from "@/components/pdf/work";
import { supabaseClient } from "@/utils/supabase";
import ReactPDF, { PDFViewer } from "@react-pdf/renderer";
import * as React from "react";
import { Show, SimpleShowLayout, TextField, DateField, RichTextField, ReferenceArrayField, Datagrid, EditButton, NumberField, CreateButton, ShowButton, Button, Link, DeleteButton, SaveButton, Toolbar, ToolbarProps, useRecordContext, SimpleForm, ImageField } from 'react-admin';


const CommentFormToolbar: React.VFC<ToolbarProps> = (props) => {
	return (
		<Toolbar {...props}>
			<ShowButton resource={`work`} />
			<EditButton />
			<ShowButton />
			<CreateButton resource="work" />
		</Toolbar>
	);
};

const Aside = async () => {
	const record = useRecordContext();



	return (
		<div style={{ minWidth: 684, margin: '1em', border: '1px solid red' }}>
			{/* @ts-expect-error */}
			<MyDocument params={record} />

		</div>
	)
}

export const WorkShow = (props: any) => (
	/* @ts-expect-error */
	<Show {...props} aside={<Aside />}>
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