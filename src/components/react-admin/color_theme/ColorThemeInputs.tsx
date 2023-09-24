import { FormDataConsumer, SimpleForm, TextInput } from 'react-admin'
import { ColorField, ColorInput } from 'react-admin-color-picker'
import { useWatch } from 'react-hook-form'

export const ColorThemeInputs = () => {

	return (<SimpleForm>
		<TextInput source='title' />
		<ColorInput source="background_primary_color" label={"Primary Background Color"} picker="Sketch" />
		<ColorField source="background_primary_color"></ColorField>
		<ColorInput source="background_secondary_color" label={"Secondary Background Color"} picker="Sketch" />
		<ColorField source="background_secondary_color"></ColorField>
		<ColorInput source="text_primary_color" label={"Primary Text Color"} picker="Sketch" />
		<ColorField source="text_primary_color"></ColorField>
		<ColorInput source="text_secondary_color" label={"Secondary Text Color"} picker="Sketch" />
		<ColorField source="text_secondary_color"></ColorField>
	</SimpleForm>)
}

export default ColorThemeInputs