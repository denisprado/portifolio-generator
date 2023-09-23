import { Text, Document, Image, PDFViewer, Page, View } from '@react-pdf/renderer';
import { Orientation } from './portifolio';
import { useThemeStyles } from './styles';
import { useGetOne } from 'react-admin';


const WorkPDF = ({ params, page_layout, theme }: any) => {
	const orientation = page_layout !== undefined ? page_layout as Orientation : params?.page_layout as Orientation

	const { data: workTheme } = useGetOne('theme', { id: params?.theme_id });

	const [styles] = useThemeStyles({ orientation: orientation, theme: workTheme });

	return (
		<PDFViewer style={styles?.viewer}>
			<Document style={{ margin: 0 }}>
				<WorkPagePdf params={params} page_layout={page_layout} theme={workTheme} />
			</Document>
		</PDFViewer >
	)
};

export const WorkPagePdf = ({ params, page_layout, theme }: any) => {

	const title = params?.title
	const image_1_src = params?.image_1_src
	const image_2_src = params?.image_2_src
	const description_1 = params?.description_1
	const description_2 = params?.description_2
	const tech_description_1 = params?.tech_description_1
	const tech_description_2 = params?.tech_description_2
	const image_1_orientation = params && params?.image_1_orientation ? params?.image_1_orientation : 'portrait'
	const image_1_order_image = params?.image_1_order_image ?? 'inicial'
	const text_1_vertical_align = params?.text_1_vertical_align
	const image_2_orientation = params?.image_2_orientation
	const image_2_order_image = params?.image_2_order_image ?? 'inicial'
	const text_2_vertical_align = params?.text_2_vertical_align
	const text_1_horizontal_align = params?.text_2_horizontal_align
	const text_2_horizontal_align = params?.text_2_horizontal_align
	const orientation = page_layout !== undefined ? page_layout as Orientation : params?.page_layout as Orientation
	const [styles] = useThemeStyles({ orientation: orientation, theme: theme })


	const pages = [
		{
			image: image_1_src,
			description: description_1,
			tech_description: tech_description_1,
			image_order: image_1_order_image,
			image_orientation: image_1_orientation,
			text_vertical_align: text_1_vertical_align,
			text_horizontal_align: text_1_horizontal_align
		}

	]

	if (image_2_src) {
		pages.push({
			image: image_2_src,
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
				<Page size={"A4"} style={styles?.page} orientation={orientation}>
					<View style={styles?.pageContent}>

						<View style={styles?.section}>
							<Image src={page.image} style={styles?.image} />
							<Text style={styles?.p}>
								{page?.tech_description}
							</Text>
						</View>

						<View style={styles?.section}>
							{i === 0 &&
								<Text style={styles?.h2}>{title}</Text>
							}

							<View style={styles?.columnSection}>
								<View style={styles?.column}>
									<Text style={styles?.p}>
										{page?.description}
									</Text>
								</View>
							</View>
						</View>

					</View>
				</Page>
			)}
		</>
	)
}

export default WorkPDF