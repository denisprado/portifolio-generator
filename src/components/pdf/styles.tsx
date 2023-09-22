import { Font, StyleSheet } from '@react-pdf/renderer';
import montserrat from 'next/font/local'

const oswald400 = "http://fonts.gstatic.com/s/oswald/v53/TK3_WkUHHAIjg75cFRf3bXL8LICs1_FvgUFoZAaRliE.ttf"
const oswald500 = "http://fonts.gstatic.com/s/oswald/v53/TK3_WkUHHAIjg75cFRf3bXL8LICs18NvgUFoZAaRliE.ttf"
const oswald600 = "http://fonts.gstatic.com/s/oswald/v53/TK3_WkUHHAIjg75cFRf3bXL8LICs1y9ogUFoZAaRliE.ttf"
const oswald700 = "http://fonts.gstatic.com/s/oswald/v53/TK3_WkUHHAIjg75cFRf3bXL8LICs1xZogUFoZAaRliE.ttf"



// Registre a fonte após o carregamento

// Font.register({
// 	family: 'Oswald',
// 	src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
// 	// fonts: [
// 	// 	{ src: oswald400 },
// 	// 	{ src: oswald500, fontWeight: 500 },
// 	// 	{ src: oswald600, fontWeight: 600 },
// 	// 	{ src: oswald700, fontWeight: 700 },
// 	// ],
// });


const textStyles = StyleSheet.create({
	p: {
		margin: 0,
		fontSize: 10,
		fontFamily: 'Montserrat',
	},
	h1: {
		fontFamily: 'Helvetica-Bold',
		fontSize: 24,

	},
	h2: {
		fontSize: 16,
		marginBottom: '3mm'
	},
	h3: {
		fontFamily: 'Helvetica-Bold',
		fontSize: 11,
		marginBottom: '5mm'
	},
})

export const portrait = StyleSheet.create({
	viewer: {
		margin: 0,
		height: '297mm',
		display: 'flex',
		width: '210mm',
		marginHorizontal: `10mm`,
		marginVertical: `10mm`
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
		width: "100mm",
		flexGrow: 1,
		flexDirection: "row",
		// border: '1px solid green',
	},
	column: {
		padding: "0",
		margin: 0,
		width: "100mm",
		display: 'flex',
		// border: '1px solid blue',
	},
	image: {
		width: "190mm",
		height: "220mm",
		objectFit: 'cover'
	},


});

export const landscape = StyleSheet.create({
	viewer: {
		margin: 0,
		width: '210mm',
		display: 'flex',
		height: '149mm',
		marginHorizontal: `10mm`,
		marginVertical: `10mm`
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
		width: "100mm",
		flexGrow: 1,
		flexDirection: "row",
		// border: '1px solid green',
	},
	column: {
		padding: "0",
		margin: 0,
		width: "100mm",
		display: 'flex',
		// border: '1px solid blue',
	},
	image: {
		width: "280mm",
		height: "140mm",
		objectFit: 'cover'
	},

});
export interface Styles {
	portrait: typeof portrait;
	landscape: typeof landscape;
}

export const styles = {
	portrait: { ...portrait, ...textStyles },
	landscape: { ...landscape, ...textStyles }
}