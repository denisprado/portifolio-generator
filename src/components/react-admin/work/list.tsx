
import { Datagrid, EditButton, ImageField, List as ReactAdminList, RichTextField, TextField } from 'react-admin'

export const WorkList = () => {
	return (
		<ReactAdminList>
			<Datagrid>

				<TextField source="title" />

				<ImageField source="image_1_src" />
				<RichTextField source="description_1" />
				<RichTextField source="tech_description_1" />

				<EditButton label='Editar' />

			</Datagrid>
		</ReactAdminList>
	)
}

export default WorkList