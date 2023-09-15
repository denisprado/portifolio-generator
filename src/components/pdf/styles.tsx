import { Font, StyleSheet } from '@react-pdf/renderer';

export const portrait = StyleSheet.create({
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
		// border: '1px solid red',
		display: 'flex',
		marginTop: "10mm",
		marginLeft: "10mm",
		marginRight: "10mm",
		width: '50%'
	},
	columnSection: {
		display: 'flex',
		gap: "10mm",
		width: "100%",
		flexGrow: 1,
		flexDirection: "row",
		// border: '1px solid green',
	},
	column: {
		padding: "0",
		margin: 0,
		width: "100%",
		display: 'flex',
		// border: '1px solid blue',
	},
	image: {
		width: "190mm",
		height: "220mm",
		objectFit: 'cover'
	},
	text: {
		fontSize: 11,
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
		fontWeight: 'black'
	},

});


export const landscape = StyleSheet.create({
	viewer: {
		margin: 0,
		width: '210mm',
		display: 'flex',
		height: '149mm'
	},
	page: {
		flexDirection: `row`,
		backgroundColor: '#fff',
		flexGrow: 1,
		margin: 0,
		display: 'none'
	},
	pageLoaded: {
		flexDirection: `row`,
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
		// border: '1px solid red',
		display: 'flex',
		marginTop: "10mm",
		marginLeft: "10mm",
		marginRight: "10mm",
		width: '45%'
	},
	columnSection: {
		display: 'flex',
		gap: "10mm",
		width: "100%",
		flexGrow: 1,
		flexDirection: "row",
		// border: '1px solid green',
	},
	column: {
		padding: "0",
		margin: 0,
		width: "100%",
		display: 'flex',
		// border: '1px solid blue',
	},
	image: {
		width: "280mm",
		height: "140mm",
		objectFit: 'cover'
	},
	text: {
		fontSize: 11,
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
		fontWeight: 'black'
	},
});

const fontFamily = ['Helvética', 'Times-Roman']


const textStyles = StyleSheet.create({
	text: {
		fontSize: 11,
		fontFamily: fontFamily[1]
	},
	h1: {
		fontSize: 24,
		fontWeight: 900,
		fontFamily: fontFamily[1]
	},
	h2: {
		fontSize: 16,
		fontWeight: 'bold'
	},
	h3: {
		fontSize: 11,
		fontWeight: 'black',
		fontStyle: 'italic'
	},
})
export interface Styles {
	portrait: typeof portrait;
	landscape: typeof landscape;
}

export const styles: Styles = {
	portrait: { ...portrait, ...textStyles },
	landscape: { ...landscape, ...textStyles }
}