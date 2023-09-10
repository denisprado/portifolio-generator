import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
	viewer: {
		margin: 0,
		height: '297mm',
		display: 'flex',
		width: '210mm'
	},
	page: {
		flexDirection: `column`,
		backgroundColor: '#fff',
		flexGrow: 1,
		margin: 0,
		display: 'none'
	},
	pageLoaded: {
		flexDirection: `column`,
		backgroundColor: '#fff',
		flexGrow: 1,
		margin: 0,
		display: 'flex'
	},
	pageContent: {
		display: 'flex',
		flexDirection: `column`,
	},
	section: {
		marginTop: "10mm",
		marginLeft: "10mm",
		marginRight: "10mm",
	},
	text: {
		fontSize: 11,
		width: 180,
	},
	h1: {
		fontSize: 24,
		fontWeight: 900
	},
	h2: {
		fontSize: 16,
		fontWeight: 'bold'
	},
	h3: {
		fontSize: 11,
		fontWeight: 'bold'
	},
	columnSection: {
		display: 'flex',
		gap: "10mm",
		width: "190mm",
		flex: 1,
		flexDirection: "row"
	},
	column: {
		padding: "0",
		margin: 0,
		width: "140mm",

	},
	image: {
		width: "190mm",
		height: "190mm",
		objectFit: 'cover'
	}
});
