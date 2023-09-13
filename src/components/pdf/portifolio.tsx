import { Document, Image, PDFDownloadLink, PDFViewer, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { Loading, useGetMany } from 'react-admin';
import { Html } from 'react-pdf-html';
import { WorkPagePdf } from './work';
import { styles } from './styles';
import { useState } from 'react';

export const PortifolioPDF = async ({ params }: any) => {
	console.log(params)
	const image_1_src = params?.image_1_src
	const image_2_src = params?.image_2_src

	const title = params?.title
	const description = params?.description

	const bio = params?.bio
	const cv = params?.cv
	const contact = params?.contact

	const [loading, setLoading] = useState(true)

	const { data, isLoading, error } = useGetMany(
		'work',
		{ ids: params?.work_id }
	);
	if (isLoading) { return <Loading />; }
	if (error) { return <p>ERROR</p>; }

	return (

		<PDFViewer style={styles.viewer} showToolbar={false}  >
			<Document style={{ margin: 0 }} onRender={() => setLoading(false)}>

				{/* Página 1 - Capa */}

				<Page size={"A4"} style={loading ? styles.page : styles.pageLoaded}>
					<View style={styles.pageContent}>
						<View style={styles.section}>

							<Html style={styles.h1}>{title}</Html>

						</View>
						<View style={styles.section}>
							<Image src={image_1_src} style={styles.image} />
						</View>
						<View style={styles.section}>
							<View style={styles.columnSection}>
								<View style={styles.column}>
									<Html style={styles.text}>{description}</Html>
								</View>
							</View>
						</View>
					</View>
				</Page>

				{/* Obras */}

				{data && data?.map(work =>
					<WorkPagePdf key={work?.id} params={work} />
				)}

				{/* 2ª Contra Capa */}

				<Page size={"A4"} style={loading ? styles.page : styles.pageLoaded}>
					<View style={styles.pageContent}>
						<View style={styles.section}>
							<View style={styles.columnSection}>
								<View style={styles.column}>
									<Html style={styles.h3}>Biografia</Html>
									<Html style={styles.text}>{bio}</Html>
								</View>
							</View>
						</View>
						<View style={styles.section}>
							<View style={styles.columnSection}>
								<View style={styles.column}>
									<Html style={styles.h3}>Curriculum Vitae</Html>
									<Html style={styles.text}>{cv}</Html>
								</View>
							</View>
						</View>
					</View>
				</Page>

				{/* Contra Capa */}

				<Page size={"A4"} style={loading ? styles.page : styles.pageLoaded}>

					<View style={styles.section}>
						<Image src={image_2_src} style={styles.image} />
					</View>
					<View style={styles.section}>
						<View style={styles.column}>
							<Html style={styles.h3}>Contato</Html>
							<Html style={styles.text}>{contact}</Html>
						</View>
					</View>
				</Page>
			</Document>
		</PDFViewer >
	)
};