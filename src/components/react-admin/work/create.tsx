import { Create, ImageField, ImageInput, TabbedForm, TextInput, required, useRecordContext } from 'react-admin';
import { RadioButtonGroupInput } from 'react-admin';
import { WorkPDF } from '@/components/pdf/work';
import { RichTextInput } from 'ra-input-rich-text';
import { PageTitle } from '../portifolio/edit';
const Aside = async () => {
	const record = useRecordContext();

	return (
		<div style={{ minWidth: 684, margin: '1em' }}>
			{/* @ts-expect-error */}
			<WorkPDF params={record} />
		</div>
	)
}
export const WorkCreate = () => (
	/* @ts-expect-error */
	<Create aside={<Aside />} title={<PageTitle />}>
		<TabbedForm>
			<TabbedForm.Tab label="Informações da Obra">
				{/* <TextInput source="id" hidden disabled /> */}
				<TextInput source="title" fullWidth label={"Titulo"} validate={[required()]} />
			</TabbedForm.Tab>

			<TabbedForm.Tab label="Página 1">
				<PageFields n={"1"} />
			</TabbedForm.Tab>
			<TabbedForm.Tab label="Página 2">
				<PageFields n={"2"} />
			</TabbedForm.Tab>
		</TabbedForm>
	</Create>
);

type PageFieldsProps = {
	n: string
}

export const PageFields = ({ n }: PageFieldsProps) => {
	if (!n) {
		return <></>
	}

	const validate = n === "1" ? [required()] : [];
	return (
		<>
			<ImageInput accept={'image/png,image/jpg,image/jpeg'} source={`image_${n}`} label="Imagem" >
				<ImageField source={`src`} src={`image_${n}`} />
			</ImageInput>
			<ImageField source={`image_${n}`} title="title" />
			<RichTextInput label={"Descrição da Obra"} fullWidth source={`description_${n}`} validate={validate} />
			<RichTextInput label={"Informação Técnica"} fullWidth source={`tech_description_${n}`} validate={validate} />
			{/* <div className='flex flex-row justify-start items-start gap-16'>
				<div className='flex flex-col justify-start items-start'>

					<RadioButtonGroupInput label={"Orientação da imagem"} source={`image_${n}_orientation`} choices={[
						{ id: 'vertical', name: 'Vertical' },
						{ id: 'horizontal', name: 'Horizontal' },
					]} />
					<RadioButtonGroupInput label={"Ordem da imagem"} source={`image_${n}_order_image`} choices={[
						{ id: 'inicial', name: 'Inicial' },
						{ id: 'final', name: 'Final' },
					]} />
				</div>
				<div className='flex flex-col justify-start items-start'>

					<RadioButtonGroupInput label={"Orientação Vertical dos textos"} source={`image_${n}_order_image`} choices={[
						{ id: 'flex-start', name: 'Topo' },
						{ id: 'flex-end', name: 'Base' },
					]} />
					<RadioButtonGroupInput label={"Orientação horizontal dos textos"} source={`text_${n}_horizontal_align`} choices={[
						{ id: 'left', name: 'Esquerda' },
						{ id: 'right', name: 'Direita' },
					]} />
				</div>
			</div> */}

		</>
	)
}