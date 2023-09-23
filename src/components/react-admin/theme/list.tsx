
import { Datagrid, EditButton, List as ReactAdminList, TextField } from 'react-admin'
import { ColorField } from 'react-admin-color-picker'


export const ThemeList = () => {

	return (
		<ReactAdminList>
			<Datagrid>
				<TextField source="title" />
				<ColorField source="background_primary_color"></ColorField>
				<ColorField source="background_secondary_color"></ColorField>
				<ColorField source="text_primary_color"></ColorField>
				<ColorField source="text_secondary_color"></ColorField>
				<EditButton label='Editar' />
			</Datagrid>
		</ReactAdminList>
	)
}

export default ThemeList