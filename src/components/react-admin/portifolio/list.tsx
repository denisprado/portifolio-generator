
import { Datagrid, EditButton, ImageField, List as ReactAdminList, ReferenceArrayField, TextField } from 'react-admin'
import MyImageField from '../common/MyImageField'


export const PortifolioList = () => {

	return (
		<ReactAdminList>
			<Datagrid>
				<ImageField source="image_1_src" />
				<TextField source="title" />
				<ReferenceArrayField label="Trabalhos" reference="work" source="work_id" />
				<EditButton label='Editar' />
			</Datagrid>
		</ReactAdminList>
	)
}