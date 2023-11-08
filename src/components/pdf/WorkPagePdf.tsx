'use client'
import { Image, Page, Text } from '@react-pdf/renderer';
import { Html } from 'react-pdf-html';
import { Column } from './components/column';
import { ContainerColumn } from './components/columnSection';
import { Section } from './components/section';
import { WorkPageContent } from './components/workPageContent';
import { Orientation } from './portifolio';


export const WorkPagePdf = ({ record, page_layout_from_portifolio, styles }: any) => {

	const orientation = page_layout_from_portifolio !== undefined ? page_layout_from_portifolio as Orientation : record?.page_layout as Orientation;

	const title = record?.title;
	const image_1_src = record?.image_1_src;
	const image_2_src = record?.image_2_src;

	const description_1 = record?.description_1;
	const description_2 = record?.description_2;

	const tech_description_1 = record?.tech_description_1;
	const tech_description_2 = record?.tech_description_2;

	const image_1_orientation = record && record?.image_1_orientation ? record?.image_1_orientation : 'portrait';
	const image_2_orientation = record?.image_2_orientation;

	const image_1_order_image = record?.image_1_order_image ? record?.image_1_order_image : 'initial';
	const image_2_order_image = record?.image_2_order_image ? record?.image_2_order_image : 'initial';

	const text_1_vertical_align = record?.text_1_vertical_align;
	const text_1_horizontal_align = record?.text_2_horizontal_align;

	const text_2_vertical_align = record?.text_2_vertical_align;
	const text_2_horizontal_align = record?.text_2_horizontal_align;

	const description_1_order = record?.description_1_order;
	const description_2_order = record?.description_2_order;

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
	];

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
		});
	}

	return (
		<>
			{pages.map((page, i) => <Page size={"A4"} style={styles?.page} orientation={orientation}>
				<WorkPageContent style={styles} imageOrder={page?.image_order}>

					<Section style={styles}>
						<Image src={page.image} style={styles?.image} />
					</Section>

					<Section style={styles}>
						<ContainerColumn style={styles} descriptionOrder={page.description_order}>
							<Column style={styles}>
								{i === 0 &&
									<Text style={styles?.h2}>{title}</Text>}

								<Text style={styles?.p}>
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
			)}
		</>
	);
};
