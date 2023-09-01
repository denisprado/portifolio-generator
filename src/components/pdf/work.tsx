import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { supabaseClient } from '@/utils/supabase';

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

type WorkPdf = {
	id: string
}
// Create Document Component
const MyDocument = async ({ id }: WorkPdf) => {

	const { data, error } = await supabaseClient.from('work').select().eq('id', id)

	if (error) {
		console.log(error);
		return
	}

	const { title, image_1 } = data
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.section}>
					<Text>{title}</Text>
				</View>
				<View style={styles.section}>
					<Image src={image_1} />
				</View>
			</Page>
		</Document>
	)
};