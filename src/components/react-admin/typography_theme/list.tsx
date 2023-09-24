
import { Datagrid, EditButton, List as ReactAdminList, TextField } from 'react-admin'
import { ColorField } from 'react-admin-color-picker'


export const TypographyThemeList = () =>
	<ReactAdminList>
		<Datagrid>
			<TextField source="title" />
			<ColorField source="title_font_family"></ColorField>
			<ColorField source="paragraph_font_family"></ColorField>
			<ColorField source="title_text_size"></ColorField>
			<ColorField source="paragraph_text_size"></ColorField>
			<EditButton label='Editar' />
		</Datagrid>
	</ReactAdminList>


export default TypographyThemeList