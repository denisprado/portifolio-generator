import { Text, Document, Image, PDFViewer, Page, View } from '@react-pdf/renderer';
import { Orientation } from './portifolio';
import { useThemeStyles } from './styles';
import { useGetOne } from 'react-admin';
import { Section } from './components/section';
import { Column } from './components/column';
import { useRegisterReactPDFFont } from '../fonts/hooks';
import { ContainerColumn } from './components/columnSection';
import { WorkPageContent } from './components/workPageContent';


const WorkPDF = ({ params, page_layout, theme }: any) => {

	useRegisterReactPDFFont()

	const orientation = page_layout !== undefined ? page_layout as Orientation : params?.page_layout as Orientation

	const { data: workColorTheme } = useGetOne('color_theme', { id: params?.color_theme_id });
	const { data: workTypographyTheme } = useGetOne('typography_theme', { id: params?.typography_theme_id });
	const { data: workSpacingTheme } = useGetOne('spacing_theme', { id: params?.spacing_theme_id });

	const [styles] = useThemeStyles({ orientation: orientation, color_theme: workColorTheme, typography_theme: workTypographyTheme, spacing_theme: workSpacingTheme });

	return (
		<PDFViewer style={styles?.viewer}>
			<Document style={{ margin: 0 }}>
				<WorkPagePdf params={params} page_layout={page_layout} colorTheme={workColorTheme} typographyTheme={workTypographyTheme} />
			</Document>
		</PDFViewer >
	)
};

export const WorkPagePdf = ({ params, page_layout, colorTheme, typographyTheme, spacingTheme }: any) => {

	const title = params?.title
	const image_1_src = params?.image_1_src
	const image_2_src = params?.image_2_src

	const description_1 = params?.description_1
	const description_2 = params?.description_2

	const tech_description_1 = params?.tech_description_1
	const tech_description_2 = params?.tech_description_2

	const image_1_orientation = params && params?.image_1_orientation ? params?.image_1_orientation : 'portrait'
	const image_2_orientation = params?.image_2_orientation

	const image_1_order_image = params?.image_1_order_image ?? 'inicial'
	const image_2_order_image = params?.image_2_order_image ?? 'inicial'

	const text_1_vertical_align = params?.text_1_vertical_align
	const text_1_horizontal_align = params?.text_2_horizontal_align

	const text_2_vertical_align = params?.text_2_vertical_align
	const text_2_horizontal_align = params?.text_2_horizontal_align

	const description_1_order = params?.description_1_order
	const description_2_order = params?.description_2_order

	const orientation = page_layout !== undefined ? page_layout as Orientation : params?.page_layout as Orientation
	const [styles] = useThemeStyles({ orientation: orientation, color_theme: colorTheme, typography_theme: typographyTheme, spacing_theme: spacingTheme })


	const pages = [
		{
			image: image_1_src,
			description: description_1,
			tech_description: tech_description_1,
			image_order: image_1_order_image,
			image_orientation: image_1_orientation,
			text_vertical_align: text_1_vertical_align,
			text_horizontal_align: text_1_horizontal_align,
			description_order: description_1_order
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
			text_horizontal_align: text_2_horizontal_align,
			description_order: description_2_order
		})
	}

	return (
		<>
			{pages.map((page, i) =>
				<Page size={"A4"} style={styles?.page} orientation={orientation}>
					<WorkPageContent style={styles} imageOrder={page?.image_order}>

						<Section style={styles}>
							<Image src={page.image} style={styles?.image} />
						</Section>

						<Section style={styles}>
							<ContainerColumn style={styles} descriptionOrder={page.description_order}>
								<Column style={styles}>
									{i === 0 &&
										<Text style={styles?.h2}>{title}</Text>
									}

									<Text style={styles?.p}>
										{page?.description}
									</Text>
								</Column>
								<Column style={styles}>
									<Text style={styles?.p}>
										{page?.tech_description}
									</Text>
								</Column>
							</ContainerColumn>

						</Section>

					</WorkPageContent>
				</Page>
			)}
		</>
	)
}

export default WorkPDF