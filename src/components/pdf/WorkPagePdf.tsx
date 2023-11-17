'use client'
import { Image, Page, Text } from '@react-pdf/renderer';
import { Html } from 'react-pdf-html';
import { Column } from './components/column';
import { ContainerColumn } from './components/columnSection';
import { Section } from './components/section';
import { WorkPageContent } from './components/workPageContent';
import { Orientation } from './portifolio';


export const WorkPagePdf = ({ record, page_layout_from_portifolio, styles }: any) => {
	if (!styles) {
		return null
	}

	if (!record) {
		return null
	}

	const orientation = page_layout_from_portifolio !== undefined ? page_layout_from_portifolio as Orientation : record?.page_layout as Orientation;

	const { title, image_1, image_2, image_1_order_image, image_1_orientation, text_1_vertical_align, description_1_order, image_1_src, image_2_src, description_1, description_2, tech_description_1, tech_description_2, image_2_orientation, image_2_order_image, text_1_horizontal_align, text_2_horizontal_align, description_2_order, text_2_vertical_align } = record;

	let pages = [
		{
			image: image_1,
			description: description_1,
			tech_description: tech_description_1,
			image_order: image_1_order_image,
			image_orientation: image_1_orientation,
			text_vertical_align: text_1_vertical_align,
			text_horizontal_align: text_1_horizontal_align,
			description_order: description_1_order
		},
		{
			image: image_2,
			description: description_2,
			tech_description: tech_description_2,
			image_order: image_2_order_image,
			image_orientation: image_2_orientation,
			text_vertical_align: text_2_vertical_align,
			text_horizontal_align: text_2_horizontal_align,
			description_order: description_2_order
		}
	];

	if (!pages) return null

	return <>{pages.map((page, i) =>
		<Page size={"A4"} style={styles.page} orientation={orientation} key={i}>
			<WorkPageContent style={styles} imageOrder={page?.image_order}>

				<Section style={styles}>
					<Image src={page.image} style={styles.image} />
				</Section>

				<Section style={styles}>
					<ContainerColumn style={styles} descriptionOrder={page.description_order}>
						<Column style={styles}>
							{i === 0 &&
								<Text style={styles.h2}>{title}</Text>}

							<Text style={styles.p}>
								{page?.description}
							</Text>
						</Column>
						<Column style={styles}>
							<Html stylesheet={styles}>
								{page?.tech_description}
							</Html>
						</Column>
					</ContainerColumn>
				</Section>

			</WorkPageContent>
		</Page>
	)
	}</>
};
