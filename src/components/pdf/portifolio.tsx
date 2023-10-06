import { useRegisterReactPDFFont } from '@/components/fonts/hooks';
import { Document, Image, PDFViewer, Page, Text, View } from '@react-pdf/renderer';
import { useState } from 'react';
import { Loading, useGetIdentity, useGetMany } from 'react-admin';
import { RecordType } from '../react-admin/common/useStyles';
import { WorkPagePdf } from './WorkPagePdf';
import { Column } from './components/column';
import { ContainerColumn } from './components/columnSection';
import { Section } from './components/section';

export type Orientation = 'landscape' | 'portrait';

const PortifolioPDF = ({ record, styles }: RecordType) => {
	console.log(styles)
	useRegisterReactPDFFont()

	const image_1_src = record?.image_1_src
	const image_2_src = record?.image_2_src

	const title = record?.title
	const description = record?.description

	const bio = record?.bio
	const cv = record?.cv
	const contact = record?.contact
	const orientation = record?.page_layout as Orientation


	const [loading, setLoading] = useState(true)

	const { data, isLoading, error } = useGetMany(
		'work',
		{ ids: record?.work_id }
	);
	if (isLoading) { return <Loading />; }
	if (error) { return <p>ERROR</p>; }

	const { data: user } = useGetIdentity();

	return (

		<PDFViewer style={styles?.viewer} >
			<Document style={{ margin: 0 }} onRender={() => setLoading(false)}>

				{/* Página 1 - Capa */}

				<Page size={"A4"} style={loading ? styles?.page : styles?.pageLoaded} orientation={orientation}>
					<View style={styles?.pageContent}>
						<Section style={styles}>
							<View style={{ padding: '10mm', paddingBottom: '0' }}>
								<Text style={styles?.h1}>{title}</Text>
							</View>
						</Section>
						<Section style={styles}>
							<Image src={image_1_src} style={styles?.imageCover} />
						</Section>
						<Section style={styles}>
							<ContainerColumn style={styles} descriptionOrder={'initial'}>
								<Column style={styles}>
									<Text style={styles?.p}>{description}</Text>
								</Column>
								<Column style={styles}>
									<Text style={styles?.p}>{user?.fullName}</Text>
								</Column>
							</ContainerColumn>
						</Section>
					</View>
				</Page>

				{/* Obras */}

				{data && data?.map(work =>
					<WorkPagePdf key={work?.id} record={work} styles={styles} page_layout_from_portifolio={orientation} />
				)}

				{/* 2ª Contra Capa */}

				<Page size={"A4"} style={loading ? styles?.page : styles?.pageLoaded} orientation={orientation}>
					<View style={styles?.pageContent}>
						<Section style={styles}>
							<Column style={styles}>
								<Text style={styles?.h3}>Biografia</Text>
								<Text style={styles?.p}>{bio}</Text>
							</Column>
							<Column style={styles}>
								<Text style={styles?.h3}>Curriculum Vitae</Text>
								<Text style={styles?.p}>{cv}</Text>
							</Column>

						</Section>
					</View>
				</Page>

				{/* Contra Capa */}

				<Page size={"A4"} style={loading ? styles?.page : styles?.pageLoaded} orientation={orientation}>
					<View style={styles?.pageContent}>

						<Section style={styles}>
							<Image src={image_2_src} style={styles?.image} />
						</Section>
						<Section style={styles}>
							<Column style={styles}>
								<Text style={styles?.h3}>Contato</Text>
								<Text style={styles?.p}>{contact}</Text>
							</Column>
							<Column style={styles}>
							</Column>
						</Section>
					</View>
				</Page>
			</Document>
		</PDFViewer >
	)
};

export default PortifolioPDF