import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, PDFViewer } from '@react-pdf/renderer';
import { supabaseClient } from '@/utils/supabase';
import { Loading, useGetMany } from 'react-admin';
import { WorkPDF, WorkPagePdf } from './work';


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


export const PortifolioPDF = async ({ params }: any) => {


	const title = params?.title


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

		<PDFViewer style={{ margin: 0, height: '297mm', display: 'flex', width: '210mm' }
		}>
			<Document style={{ margin: 0 }}>
				<Page size={"A4"} style={styles.page}>
					<View style={{ display: 'flex' }}>

						<View>
							<View style={styles.section}>
								<Text style={{ fontWeight: 900 }}>Título:{title}</Text>
							</View>
						</View>


					</View>
				</Page>
				{data?.map(work => <WorkPagePdf params={work} />)}
			</Document>
		</PDFViewer >
	)
};