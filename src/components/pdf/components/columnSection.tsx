import { View } from "@react-pdf/renderer";
import { ReactNode } from "react";

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

	const styles = { ...style?.containerColumn, flexDirection: newDirection }

	return (
		<View style={styles}>
			{children}
		</View>
	)
}