
import { Datagrid, EditButton, ImageField, List as ReactAdminList, ReferenceArrayField, RichTextField, ShowButton, TextField } from 'react-admin'


export const PortifolioList = () => {
	return (
		<ReactAdminList>
			<Datagrid>
				<TextField source="title" />
				{/* <RichTextField source="description" label={"Descrição"} /> */}
				<ImageField source="image_1" label={"Imagem"} />
				{/* <RichTextField source="bio" label={"Biografia"} />
				<RichTextField source="cv" label={"Curriculum Vitae"} /> */}
				<ReferenceArrayField label="Trabalhos" reference="work" source="work_id" />
				<EditButton label='Editar' />
				<ShowButton label='Visualizar' />
			</Datagrid>
		</ReactAdminList>
	)
}