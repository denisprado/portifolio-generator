import { View } from "@react-pdf/renderer";
import { ReactNode } from "react";
import { ThemeStyles } from "../styles";

type SectionProps = {
	children: ReactNode
	style: any
}

export const Column = ({ style, children }: SectionProps) => {
	return (
		<View style={style?.column}>
			<View style={style?.innerColumn}>
				{children}
			</View>
		</View>
	)
}