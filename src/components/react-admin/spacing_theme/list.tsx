
import { Datagrid, EditButton, List as ReactAdminList, TextField } from 'react-admin'

export const SpacingThemeList = () =>
	<ReactAdminList>
		<Datagrid>
			<TextField source="title" />
			<TextField source="margin"></TextField>
			<TextField source="spacing"></TextField>
			<TextField source="image_margin"></TextField>

			<EditButton label='Editar' />
		</Datagrid>
	</ReactAdminList>


export default SpacingThemeList