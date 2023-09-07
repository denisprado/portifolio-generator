import { WorkPDF } from "@/components/pdf/work";
import * as React from "react";
import { CreateButton, EditButton, ImageField, Show, ShowButton, SimpleShowLayout, TextField, Toolbar, ToolbarProps, useRecordContext } from 'react-admin';


const CommentFormToolbar: React.VFC<ToolbarProps> = (props) => {
	return (
		<Toolbar {...props}>
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
			<WorkPDF params={record} />

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