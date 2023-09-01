
import { Datagrid, EditButton, ImageField, List as ReactAdminList, ShowButton, TextField } from 'react-admin'


export const WorkList = () => {
	return (
		<ReactAdminList>
			<Datagrid>
				<TextField source="id" />
				<TextField source="title" />

				<ImageField source="image_1" src="image_1" />
				<TextField source="description_1" />
				<TextField source="tech_description_1" />

				<ImageField source="image_2" />
				<TextField source="description_2" />
				<TextField source="tech_description_2" />


				<EditButton label='Editar' />
				<ShowButton label='Visualizar' />
			</Datagrid>
		</ReactAdminList>
	)
}