import { View } from "@react-pdf/renderer";
import { ReactNode } from "react";
import { ThemeStyles } from "../styles";

type SectionProps = {
	children: ReactNode
	style: any
	descriptionOrder: string
}

export const ContainerColumn = ({ style, descriptionOrder = 'initial', children }: SectionProps) => {

	let cColumn = style && style.containerColumn ? style.containerColumn : { flexDirection: 'row' }
	let fDirection = cColumn && cColumn?.flexDirection ? cColumn?.flexDirection : 'row'
	let newDirection = fDirection
	newDirection = descriptionOrder === 'initial' ? newDirection : newDirection + '-reverse'

	return (
		<View style={[style?.containerColumn, { flexDirection: newDirection }]}>
			{children}
		</View>
	)
}