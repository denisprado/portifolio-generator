import { View } from "@react-pdf/renderer";
import { ReactNode } from "react";
import { ThemeStyles } from "../styles";

type SectionProps = {
	children: ReactNode
	style: any
	imageOrder: string
}

export const WorkPageContent = ({ style, imageOrder = 'initial', children }: SectionProps) => {
	console.log("imageOrder", imageOrder)
	let pageContent = style && style.containerColumn ? style.pageContent : { flexDirection: 'column' }
	let flexDirection = pageContent && pageContent?.flexDirection ? pageContent?.flexDirection : 'column'
	let newDirection = flexDirection

	newDirection = imageOrder === 'initial' ? newDirection : newDirection + '-reverse'
	console.log("newDirection", newDirection)

	return (
		<View style={[style?.pageContent, { flexDirection: newDirection }]}>
			{children}
		</View>
	)
}