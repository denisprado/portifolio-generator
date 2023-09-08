import { Document, Image, PDFViewer, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { Loading, useGetMany } from 'react-admin';
import { Html } from 'react-pdf-html';
import { WorkPagePdf } from './work';
import { styles } from './work';


export const PortifolioPDF = async ({ params }: any) => {

	const title = params?.title
	const description = params?.description
	const image_1 = params?.image_1
	const image_2 = params?.image_2
	const bio = params?.bio
	const cv = params?.cv
	const contact = params?.contact

	const { data, isLoading, error } = useGetMany(
		'work',
		{ ids: params?.work_id }
	);
	if (isLoading) { return <Loading />; }
	if (error) { return <p>ERROR</p>; }

	return (

		<PDFViewer style={styles.viewer}>
			<Document style={{ margin: 0 }}>
				<Page size={"A4"} style={styles.page}>
					<View style={{ display: 'flex' }}>

						<View style={styles.section}>
							<Text>
								<Html style={styles.text}>{title}</Html>
							</Text>
						</View>

						<View style={styles.section}>
							<Image src={image_1} style={styles.image} />
						</View>

						<View style={styles.section}>
							<Text><Html style={styles.text}>{description}</Html></Text>
						</View>


					</View>
				</Page>
				{/*Obras */}
				{data && data?.map(work => work && <WorkPagePdf key={work?.id} params={work} />)}

				<Page size={"A4"} style={styles.page}>


					<View style={styles.section}>
						<Text style={styles.text}><Html>{bio}</Html></Text>
					</View>
					<View style={styles.section}>
						<Text style={styles.text}><Html>{cv}</Html></Text>
					</View>

				</Page>
				<Page size={"A4"} style={styles.page}>



					<View style={styles.section}>
						<Image src={image_2} style={styles.image} />
					</View>


					<View style={styles.section}>
						<Text style={styles.text}><Html >{contact}</Html></Text>
					</View>


				</Page>
			</Document>
		</PDFViewer >
	)
};