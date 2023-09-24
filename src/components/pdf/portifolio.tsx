import { useRegisterReactPDFFont } from '@/components/fonts/hooks';
import { Document, Image, PDFViewer, Page, Text, View } from '@react-pdf/renderer';
import { useState } from 'react';
import { Loading, useGetMany, useGetOne } from 'react-admin';
import { useThemeStyles } from './styles';
import { WorkPagePdf } from './work';

export type Orientation = 'landscape' | 'portrait';

const PortifolioPDF = ({ params }: any) => {
	useRegisterReactPDFFont()
	const { data: color_theme } = useGetOne('color_theme', { id: params?.color_theme_id });
	const { data: typography_theme } = useGetOne('color_theme', { id: params?.color_theme_id });




	const image_1_src = params?.image_1_src
	const image_2_src = params?.image_2_src

	const title = params?.title
	const description = params?.description

	const bio = params?.bio
	const cv = params?.cv
	const contact = params?.contact
	const orientation = params?.page_layout as Orientation

	const [loading, setLoading] = useState(true)

	const { data, isLoading, error } = useGetMany(
		'work',
		{ ids: params?.work_id }
	);
	if (isLoading) { return <Loading />; }
	if (error) { return <p>ERROR</p>; }

	const [styles] = useThemeStyles({ orientation: params?.page_layout ? params?.page_layout : 'portrait', color_theme: color_theme, typography_theme: typography_theme })
	return (

		<PDFViewer style={styles?.viewer} >
			<Document style={{ margin: 0 }} onRender={() => setLoading(false)}>

				{/* Página 1 - Capa */}

				<Page size={"A4"} style={loading ? styles?.page : styles?.pageLoaded} orientation={orientation}>
					<View style={styles?.pageContent}>
						<View style={styles?.section}>
							<Text style={styles?.h1}>{title}</Text>
						</View>
						<View style={styles?.section}>
							<Image src={image_1_src} style={styles?.image} />
						</View>
						<View style={styles?.section}>
							<View style={styles?.columnSection}>
								<View style={styles?.column}>
									<Text style={styles?.p}>{description}</Text>
								</View>
							</View>
						</View>
					</View>
				</Page>

				{/* Obras */}

				{data && data?.map(work =>
					<WorkPagePdf key={work?.id} params={work} page_layout={orientation} colorTheme={color_theme} typographyTheme={typography_theme} />
				)}

				{/* 2ª Contra Capa */}

				<Page size={"A4"} style={loading ? styles?.page : styles?.pageLoaded} orientation={orientation}>
					<View style={styles?.pageContent}>
						<View style={styles?.section}>
							<View style={styles?.columnSection}>
								<View style={styles?.column}>
									<Text style={styles?.h3}>Biografia</Text>
									<Text style={styles?.p}>{bio}</Text>
								</View>

								<View style={styles?.column}>
									<Text style={styles?.h3}>Curriculum Vitae</Text>
									<Text style={styles?.p}>{cv}</Text>
								</View>
							</View>
						</View>
					</View>
				</Page>

				{/* Contra Capa */}

				<Page size={"A4"} style={loading ? styles?.page : styles?.pageLoaded} orientation={orientation}>
					<View style={styles?.pageContent}>

						<View style={styles?.section}>
							<Image src={image_2_src} style={styles?.image} />
						</View>
						<View style={styles?.section}>
							<View style={styles?.column}>
								<Text style={styles?.h3}>Contato</Text>
								<Text style={styles?.p}>{contact}</Text>
							</View>
						</View>
					</View>
				</Page>
			</Document>
		</PDFViewer >
	)
};

export default PortifolioPDF