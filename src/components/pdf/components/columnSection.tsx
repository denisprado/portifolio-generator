import { View } from "@react-pdf/renderer";
import { ReactNode } from "react";
import { ThemeStyles } from "../styles";

type SectionProps = {
	children: ReactNode
	style: any
	descriptionOrder: string
}

export const ContainerColumn = ({ style, descriptionOrder = 'initial', children }: SectionProps) => {

	let { containerColumn: { flexDirection: newDirection }, } = style

	newDirection = descriptionOrder === 'initial' ? newDirection : newDirection + '-reverse'

	return (
		<View style={[style?.containerColumn, { flexDirection: newDirection }]}>
			{children}
		</View>
	)
}