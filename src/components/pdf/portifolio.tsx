import { useRegisterReactPDFFont } from '@/components/fonts/hooks';
import { Document, Image, PDFViewer, Page, Text, View } from '@react-pdf/renderer';
import { useState } from 'react';
import { Loading, useGetIdentity, useGetMany, useGetOne } from 'react-admin';
import { useThemeStyles } from './styles';
import { WorkPagePdf } from './work';
import { Section } from './components/section';
import { Column } from './components/column';
import { ContainerColumn } from './components/columnSection';

export type Orientation = 'landscape' | 'portrait';

const PortifolioPDF = ({ params }: any) => {

	useRegisterReactPDFFont()

	const image_1_src = params?.image_1_src
	const image_2_src = params?.image_2_src

	const title = params?.title
	const description = params?.description

	const bio = params?.bio
	const cv = params?.cv
	const contact = params?.contact
	const orientation = params?.page_layout as Orientation

	const { data: color_theme } = useGetOne('color_theme', { id: params?.color_theme_id });
	const { data: typography_theme } = useGetOne('typography_theme', { id: params?.typography_theme_id });
	const { data: spacing_theme } = useGetOne('spacing_theme', { id: params?.spacing_theme_id });

	const [styles] = useThemeStyles({ orientation: params?.page_layout ? params?.page_layout : 'portrait', color_theme: color_theme, typography_theme: typography_theme, spacing_theme: spacing_theme })

	const [loading, setLoading] = useState(true)

	const { data, isLoading, error } = useGetMany(
		'work',
		{ ids: params?.work_id }
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
					<WorkPagePdf key={work?.id} params={work} page_layout={orientation} colorTheme={color_theme} typographyTheme={typography_theme} spacingTheme={spacing_theme} />
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