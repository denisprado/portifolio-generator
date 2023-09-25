import { View } from "@react-pdf/renderer";
import { ReactNode } from "react";
import { ThemeStyles } from "../styles";

type SectionProps = {
	children: ReactNode
	style: any
	imageOrder: string
}

export const WorkPageContent = ({ style, imageOrder = 'initial', children }: SectionProps) => {

	let { pageContent: { flexDirection: newDirection }, } = style

	newDirection = imageOrder === 'initial' ? newDirection : newDirection + '-reverse'

	return (
		<View style={[style?.pageContent, { flexDirection: newDirection }]}>
			{children}
		</View>
	)
}