import { getAllFontFamiliesToLoad } from '@/components/fonts/lib';
import { SelectInput, SimpleForm, TextInput } from 'react-admin';

const TypographyThemeInputs = () => {
	const allFontFamilies = getAllFontFamiliesToLoad();
	const allFontFamiliesObjects = allFontFamilies?.map(font => {
		return (
			{ id: font, name: font }
		)
	})

	return (
		<SimpleForm>
			<SelectInput source="title_font_family" label={"Fonte dos Títulos"} defaultValue={'Montserrat'} emptyText={"Selecione uma fonte"} emptyValue={'Montserrat'} choices={allFontFamiliesObjects} />
			<SelectInput source="paragraph_font_family" label={"Fonte dos Títulos"} defaultValue={'Montserrat'} emptyText={"Selecione uma fonte"} emptyValue={'Montserrat'} choices={allFontFamiliesObjects} />
			<TextInput source="title_text_size" defaultValue={"24"} label={"Tamanho do Título"} />
			<TextInput source="paragraph_text_size" defaultValue={"10"} label={"Tamanho do Parágrafo"} />
		</SimpleForm>
	);
};

export default TypographyThemeInputs