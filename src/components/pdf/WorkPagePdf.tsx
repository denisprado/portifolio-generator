'use client'
import { Image, Page, Text } from '@react-pdf/renderer';
import { Column } from './components/column';
import { ContainerColumn } from './components/columnSection';
import { Section } from './components/section';
import { WorkPageContent } from './components/workPageContent';
import { Orientation } from 'types';
import { documentWidthAbsolute, documentHeightAbsolute } from './styles';


export const WorkPagePdf = ({ record, page_layout_from_portifolio, styles }: any): any => {
	console.log("🚀 ~ file: WorkPagePdf.tsx:12 ~ WorkPagePdf ~ record, page_layout_from_portifolio, styles:", record, page_layout_from_portifolio, styles)

	if (!styles) {
		return <></>
	}

	if (!record) {
		return <></>
	}

	const orientation = page_layout_from_portifolio !== undefined ? page_layout_from_portifolio as Orientation : record?.page_layout as Orientation;
	console.log("🚀 ~ file: WorkPagePdf.tsx:22 ~ WorkPagePdf ~ orientation:", orientation)

	const { title, image_1, image_2, image_1_order_image, image_1_orientation, text_1_vertical_align, description_1_order, image_1_src, image_2_src, description_1, description_2, tech_description_1, tech_description_2, image_2_orientation, image_2_order_image, text_1_horizontal_align, text_2_horizontal_align, description_2_order, text_2_vertical_align } = record;

	let pages = [
		{
			image: image_1_src,
			description: description_1,
			tech_description: tech_description_1,
			image_order: image_1_order_image,
			image_orientation: image_1_orientation,
			text_vertical_align: text_1_vertical_align,
			text_horizontal_align: text_1_horizontal_align,
			description_order: description_1_order
		},
		{
			image: image_2_src,
			description: description_2,
			tech_description: tech_description_2,
			image_order: image_2_order_image,
			image_orientation: image_2_orientation,
			text_vertical_align: text_2_vertical_align,
			text_horizontal_align: text_2_horizontal_align,
			description_order: description_2_order
		}
	];
	console.log("🚀 ~ file: WorkPagePdf.tsx:49 ~ WorkPagePdf ~ pages:", pages)

	if (!pages) return <></>

	return pages.map((page, i) =>

		<Page style={styles.pageLoaded} orientation={orientation} key={i} >
			<WorkPageContent style={styles} imageOrder={page?.image_order}>

				{page.image && <Section style={styles}>
					<Image src={page.image} style={styles.image} />
				</Section>}

				<Section style={styles}>
					<ContainerColumn style={styles} descriptionOrder={page.description_order}>
						<Column style={styles}>
							{i === 0 && title &&
								<Text style={styles.h2}>{title}</Text>
							}
							<Text style={styles.p}>
								{page?.description}
							</Text>
						</Column>
						<Column style={styles}>
							<Text style={styles.p}>
								{page?.tech_description}
							</Text>
						</Column>
					</ContainerColumn>
				</Section>

			</WorkPageContent>
		</Page>
	)


};
