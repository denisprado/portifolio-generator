import { View } from "@react-pdf/renderer";
import { ReactNode } from "react";

type SectionProps = {
	children: ReactNode
	style: any
	imageOrder: string
}

export const WorkPageContent = ({ style, imageOrder = 'initial', children }: SectionProps) => {

	let pageContent = style && style.containerColumn ? style.pageContent : { flexDirection: 'column' }
	let flexDirection = pageContent && pageContent?.flexDirection ? pageContent?.flexDirection : 'column'
	let newDirection = flexDirection

	newDirection = imageOrder === 'initial' ? newDirection : newDirection + '-reverse'

	return (
		<View style={[style?.pageContent, { flexDirection: newDirection }]}>
			{children}
		</View>
	)
}