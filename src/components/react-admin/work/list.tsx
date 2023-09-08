
import { Datagrid, EditButton, ImageField, List as ReactAdminList, RichTextField, ShowButton, TextField } from 'react-admin'


export const WorkList = () => {
	return (
		<ReactAdminList>
			<Datagrid>

				<TextField source="title" />

				<ImageField source="image_1" src="image_1.imageUrl" />
				<RichTextField source="description_1" />
				<RichTextField source="tech_description_1" />


				<ImageField source="image_2" />
				<RichTextField source="description_2" />
				<RichTextField source="tech_description_2" />

				<EditButton label='Editar' />
				<ShowButton label='Visualizar' />
			</Datagrid>
		</ReactAdminList>
	)
}