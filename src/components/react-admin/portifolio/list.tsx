
import { Datagrid, EditButton, ImageField, List as ReactAdminList, ReferenceArrayField, RichTextField, ShowButton, TextField, useListContext, useListController, useRecordContext } from 'react-admin'


export const PortifolioList = () => {

	const { data, resource } = useListController()

	console.log(data)
	return (
		<ReactAdminList>
			<Datagrid>
				<ImageField source="image_1.url" title={'title'} />
				<ImageField source="image_2.url" title={'title'} />
				<TextField source="title" />

				{/* <RichTextField source="bio" label={"Biografia"} />
				<RichTextField source="cv" label={"Curriculum Vitae"} /> */}
				<ReferenceArrayField label="Trabalhos" reference="work" source="work_id" />
				<EditButton label='Editar' />
			</Datagrid>
		</ReactAdminList>
	)
}