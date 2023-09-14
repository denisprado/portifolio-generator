import { PortifolioPDF } from '@/components/pdf/portifolio';
import { styles } from '@/components/pdf/styles';
import * as React from "react";
import { CreateButton, Datagrid, EditButton, ImageField, Loading, ReferenceArrayField, RichTextField, Show, ShowButton, SimpleForm, SimpleShowLayout, TextField, Toolbar, ToolbarProps, required, useRecordContext } from 'react-admin';


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
		<div style={styles.viewer}>
			<React.Suspense fallback={<Loading />}>
				{/* @ts-expect-error */}
				<PortifolioPDF params={record} />
			</React.Suspense>
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