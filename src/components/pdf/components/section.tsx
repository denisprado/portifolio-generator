import { View } from "@react-pdf/renderer";
import { ReactNode } from "react";
import { ThemeStyles } from '@/app/dashboard/portfolios/types';

type SectionProps = {
	children: ReactNode
	style: any
}

export const Section = ({ style, children }: SectionProps) => {
	return (
		<View style={{ ...style?.section }}>
			<View style={{ ...style?.innerSection }}>
				{children}
			</View>
		</View>
	)
}