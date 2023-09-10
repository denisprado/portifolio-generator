import React from 'react';
import { Document, Page, Text, View, Image, PDFViewer } from '@react-pdf/renderer';
import { Html } from 'react-pdf-html';
import { styles } from './styles';


export const WorkPDF = async ({ params }: any) => {

	return (
		<PDFViewer style={styles.viewer}>
			<Document style={{ margin: 0 }}>
				<WorkPagePdf params={params} />
			</Document>
		</PDFViewer >
	)
};

export const WorkPagePdf = ({ params }: any) => {
	const title = params?.title
	const image_1 = params?.image_1?.url
	const image_2 = params?.image_2?.url
	const description_1 = params?.description_1
	const description_2 = params?.description_2
	const tech_description_1 = params?.tech_description_1
	const tech_description_2 = params?.tech_description_2
	const image_1_orientation = params?.image_1_orientation
	const image_1_order_image = params?.image_1_order_image ?? 'inicial'
	const text_1_vertical_align = params?.text_1_vertical_align
	const image_2_orientation = params?.image_2_orientation
	const image_2_order_image = params?.image_2_order_image ?? 'inicial'
	const text_2_vertical_align = params?.text_2_vertical_align
	const text_1_horizontal_align = params?.text_2_horizontal_align
	const text_2_horizontal_align = params?.text_2_horizontal_align

	const pages = [
		{
			image: image_1,
			description: description_1,
			tech_description: tech_description_1,
			image_order: image_1_order_image,
			image_orientation: image_1_orientation,
			text_vertical_align: text_1_vertical_align,
			text_horizontal_align: text_1_horizontal_align
		}

	]

	if (image_2) {
		pages.push({
			image: image_2,
			description: description_2,
			tech_description: tech_description_2,
			image_order: image_2_order_image,
			image_orientation: image_2_orientation,
			text_vertical_align: text_2_vertical_align,
			text_horizontal_align: text_2_horizontal_align
		})
	}

	return (
		<>
			{pages.map((page, i) =>
				<Page size={"A4"} style={styles.page}>
					<View style={styles.pageContent}>

						<View style={styles.section}>
							<Image src={page.image} style={styles.image} />
							<Html style={styles.text}>
								{page?.tech_description}
							</Html>
						</View>

						<View style={styles.section}>
							{i === 0 &&
								<Html style={styles.h2}>{title}</Html>
							}

							<View style={styles.columnSection}>
								<View style={styles.column}>
									<Html style={styles.text}>
										{page?.description}
									</Html>
								</View>
							</View>
						</View>

					</View>
				</Page>
			)}
		</>
	)
}
