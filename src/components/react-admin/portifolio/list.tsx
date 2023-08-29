
import { Datagrid, DateField, List as ReactAdminList, TextField, ReferenceField, ReferenceArrayField, EditButton, CreateButton, ShowButton } from 'react-admin'


export const PortifolioList = () => {
	return (
		<ReactAdminList>
			<Datagrid>
				<TextField source="id" />
				<TextField source="title" />
				<DateField source="published_at" />
				<ReferenceArrayField label="Trabalhos" reference="work" source="work_id" />
				<EditButton label='Editar' />
				<ShowButton label='Visualizar' />
			</Datagrid>
		</ReactAdminList>
	)
}