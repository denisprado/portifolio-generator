import { ImageField, ImageInput, TextInput, required } from 'react-admin';
import { PageFieldsProps } from './create';


export const PageInputs = ({ n }: PageFieldsProps) => {
	if (!n) {
		return <></>;
	}

	const validate = n === "1" ? [required()] : [];
	return (
		<>
			<ImageInput accept={'image/png,image/jpg,image/jpeg'} source={`image_${n}`} label="Imagem">
				<ImageField source={`src`} src={`image_${n}`} />
			</ImageInput>
			<ImageField source={`image_${n}_src`} title="title" />
			<TextInput label={"Descrição da Obra"} fullWidth source={`description_${n}`} validate={validate} />
			<TextInput label={"Informação Técnica"} fullWidth source={`tech_description_${n}`} validate={validate} />
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
	);
};
