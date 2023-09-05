import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, PDFViewer } from '@react-pdf/renderer';


const styles = StyleSheet.create({
	page: {
		flexDirection: `row`,
		backgroundColor: '#fff',
		flexGrow: 1,
		margin: 0
	},
	section: {
		marginTop: "10mm",
		marginLeft: "10mm",
		marginRight: "10mm",
	},
	text: {
		fontSize: 12,

		width: 180,
	},
	column: {
		padding: "0",
		width: 260,
		border: '1px solid red',
		margin: 0,
		flexGrow: 1,
		height: "60mm"
	},
	columnSection: {
		display: 'flex',
		gap: "10mm",
		width: "190mm",
		flex: 1,
		flexDirection: "row"
	}

});


export const WorkPDF = async ({ params }: any) => {

	return (

		<PDFViewer style={{ margin: 0, height: '297mm', display: 'flex', width: '210mm' }
		}>
			<Document style={{ margin: 0 }}>
				<WorkPagePdf params={params} />
			</Document>
		</PDFViewer >
	)
};

export const WorkPagePdf = ({ params }: any) => {
	const title = params?.title
	const image_1 = params?.image_1
	const image_2 = params?.image_2
	const description_1 = params?.description_1
	const description_2 = params?.description_2
	const tech_description_1 = params?.tech_description_1
	const image_1_orientation = params?.image_1_orientation
	const image_1_order_image = params?.image_1_order_image
	const text_1_vertical_align = params?.text_1_vertical_align
	const image_2_orientation = params?.image_2_orientation
	const image_2_order_image = params?.image_2_order_image
	const text_2_vertical_align = params?.text_2_vertical_align
	const text_1_horizontal_align = params?.text_2_horizontal_align

	const p = image_2 ? [1, 2] : [1]

	return (
		<>
			<Page size={"A4"} style={styles.page}>
				<View style={{ display: 'flex', flexDirection: `column${image_1_order_image === 'final' ? '-reverse' : ''}` }}>

					<View>
						<View style={styles.section}>
							<Image src={params?.image_1} style={{ width: '190mm', height: '190mm', objectFit: 'cover' }} />
						</View>
					</View>

					<View>
						<View style={styles.section}>
							<Text style={{ fontWeight: 900 }}>{title}</Text>
						</View>
						<View style={styles.section}>
							<View style={styles.columnSection}>
								<View style={styles.column}>
									<Text style={styles.text}>{description_1}</Text>
								</View>
								<View style={styles.column}>
									<Text style={styles.text}>{tech_description_1}</Text>
								</View>
							</View>
						</View>
					</View>

				</View>
			</Page>
		</>)
}