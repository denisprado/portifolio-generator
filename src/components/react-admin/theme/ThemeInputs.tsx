import { getAllFontFamiliesToLoad } from '@/components/fonts/lib';
import { SelectInput, TabbedForm, TextInput, required, useGetIdentity } from 'react-admin';
import { ColorInput, ColorField } from 'react-admin-color-picker';

export const ThemeInputs = () => {
	const { data } = useGetIdentity();
	const allFontFamilies = getAllFontFamiliesToLoad();

	const allFontFamiliesObjects = allFontFamilies.map(font => {
		return (
			{ id: font, name: font }
		)
	})

	return (
		<TabbedForm>
			<TabbedForm.Tab label="Tema">
				<TextInput source="title" validate={[required()]} fullWidth />
			</TabbedForm.Tab>
			<TabbedForm.Tab label="Tipografia">
				<SelectInput source="title_font_family" label={"Fonte dos Títulos"} defaultValue={'Montserrat'} emptyText={"Selecione uma fonte"} emptyValue={'Montserrat'} choices={allFontFamiliesObjects} />

				<SelectInput source="paragraph_font_family" label={"Fonte dos Títulos"} defaultValue={'Montserrat'} emptyText={"Selecione uma fonte"} emptyValue={'Montserrat'} choices={allFontFamiliesObjects} />

				<TextInput source="title_text_size" defaultValue={"24"} label={"Tamanho do Título"} />

				<TextInput source="paragraph_text_size" defaultValue={"10"} label={"Tamanho do Parágrafo"} />
			</TabbedForm.Tab>
			<TabbedForm.Tab label="Cores">
				<ColorInput source="background_primary_color" label={"Primary Background Color"} picker="Sketch" />
				<ColorField source="background_primary_color"></ColorField>
				<ColorInput source="background_secondary_color" label={"Secondary Background Color"} picker="Sketch" />
				<ColorField source="background_secondary_color"></ColorField>
				<ColorInput source="text_primary_color" label={"Primary Text Color"} picker="Sketch" />
				<ColorField source="text_primary_color"></ColorField>
				<ColorInput source="text_secondary_color" label={"Secondary Text Color"} picker="Sketch" />
				<ColorField source="text_secondary_color"></ColorField>
			</TabbedForm.Tab>
		</TabbedForm>
	);
};
