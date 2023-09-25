
import { Datagrid, EditButton, List as ReactAdminList, TextField } from 'react-admin'

export const SpacingThemeList = () =>
	<ReactAdminList>
		<Datagrid>
			<TextField source="title" />
			<TextField source="magin"></TextField>
			<TextField source="spacing"></TextField>
			<TextField source="margin_image"></TextField>

			<EditButton label='Editar' />
		</Datagrid>
	</ReactAdminList>


export default SpacingThemeList