import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, PDFViewer } from '@react-pdf/renderer';


// Create styles
const styles = StyleSheet.create({
	page: {
		flexDirection: 'row',
		backgroundColor: '#E4E4E4',
		border: '1px solid #ddd'
	},
	section: {
		margin: 10,
		padding: 10,
		flexGrow: 1
	}
});


export const MyDocument = async ({ params }: any) => {

	const styles = StyleSheet.create({
		page: {
			flexDirection: 'row',
			backgroundColor: '#fff',

			flexGrow: 1,
			margin: 0
		},
		section: {
			margin: 10,
			padding: 10,
			flexGrow: 1
		}
	});

	const title = params?.title

	// const { title, image_1 } = data
	return (

		<PDFViewer style={{ margin: 0, height: '297mm', border: '1px solid blue', display: 'flex', width: '210mm' }
		}>
			<Document style={{ margin: 0 }}>
				<Page size={"A4"} style={styles.page}>
					<View style={styles.section}>
						<Text>{title}</Text>
					</View>
					<View style={styles.section}>
						<Image src={params?.image_1} style={{ width: '105mm', height: '105mm' }} />
					</View>
				</Page>
			</Document>
		</PDFViewer>
	)
};