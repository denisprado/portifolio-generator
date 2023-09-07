import { PortifolioPDF } from '@/components/pdf/portifolio';
import * as React from "react";
import { CreateButton, Datagrid, EditButton, ImageField, ReferenceArrayField, RichTextField, Show, ShowButton, SimpleForm, SimpleShowLayout, TextField, Toolbar, ToolbarProps, required, useRecordContext } from 'react-admin';


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
			<PortifolioPDF params={record} />

		</div>
	)
}

export const PortifolioShow = (props: any) => (
	/* @ts-expect-error */
	<Show {...props} aside={<Aside />}>
		<SimpleShowLayout>
			<TextField source="title" validate={[required()]} fullWidth />
			<RichTextField source="description" label={"Descrição"} />


		</SimpleShowLayout>
	</Show>
);