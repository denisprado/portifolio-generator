import { Document, Image, PDFViewer, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { Loading, useGetMany } from 'react-admin';
import Html from 'react-pdf-html';
import { WorkPagePdf } from './work';

const styles = StyleSheet.create({
	page: {
		flexDirection: `row`,
		flexGrow: 1,
		margin: 0
	},
	section: {
		marginTop: "10mm",
		marginLeft: "10mm",
		marginRight: "10mm",
	},

	column: {
		padding: "0",
		width: 260,
		border: '1px solid red',
		margin: 0,
		flexGrow: 1,
		height: "60mm"
	},
	columnSection: {
		display: 'flex',
		gap: "10mm",
		flex: 1,
	}
});

export const PortifolioPDF = async ({ params }: any) => {

	const title = params?.title
	const description = params?.description
	const image_1 = params?.image_1
	const image_2 = params?.image_2
	const bio = params?.bio
	const cv = params?.cv
	const contact = params?.contact

	if (!params || !params.work_id) {
		return
	}

	const { data, isLoading, error } = useGetMany(
		'work',
		{ ids: params?.work_id }
	);
	if (isLoading) { return <Loading />; }
	if (error) { return <p>ERROR</p>; }

	return (

		<PDFViewer style={{ margin: 0, height: '297mm', display: 'flex', width: '210mm' }}>
			<Document style={{ margin: 0 }}>
				<Page size={"A4"} style={styles.page}>
					<View style={{ display: 'flex' }}>

						<View>
							<View style={styles.section}>
								<Text style={{ fontWeight: 900 }}><Html style={{ fontSize: 24 }}>{title}</Html></Text>
							</View>
						</View>

						<View>
							<View style={styles.section}>
								<Image src={image_1} style={{ width: '190mm', height: '190mm', objectFit: 'cover' }} />
							</View>
						</View>

						<View>
							<View style={styles.section}>
								<Text><Html style={{ fontSize: 10 }}>{description}</Html></Text>
							</View>
						</View>


					</View>
				</Page>
				{/*Obras */}
				{data?.map(work => <WorkPagePdf key={work?.id} params={work} />)}

				<Page size={"A4"} style={styles.page}>

					<View style={styles.section}>
						<View style={{ display: 'flex' }}>
							<Text><Html style={{ fontSize: 10 }}>{bio}</Html></Text>
						</View>
						<View style={{ display: 'flex' }}>
							<Text><Html style={{ fontSize: 10 }}>{cv}</Html></Text>
						</View>
					</View>
				</Page>
				<Page size={"A4"} style={styles.page}>
					<View>
						<View style={{ display: 'flex' }}>
							<Text><Html style={{ fontSize: 10 }}>{contact}</Html></Text>
						</View>
						<View style={styles.section}>
							<Image src={image_2} style={{ width: '190mm', height: '190mm', objectFit: 'cover' }} />
						</View>
					</View>
				</Page>
			</Document>
		</PDFViewer >
	)
};