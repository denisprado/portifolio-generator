import { StyleSheet } from '@react-pdf/renderer';

// const oswald400 = "http://fonts.gstatic.com/s/oswald/v53/TK3_WkUHHAIjg75cFRf3bXL8LICs1_FvgUFoZAaRliE.ttf"
// const oswald500 = "http://fonts.gstatic.com/s/oswald/v53/TK3_WkUHHAIjg75cFRf3bXL8LICs18NvgUFoZAaRliE.ttf"
// const oswald600 = "http://fonts.gstatic.com/s/oswald/v53/TK3_WkUHHAIjg75cFRf3bXL8LICs1y9ogUFoZAaRliE.ttf"
// const oswald700 = "http://fonts.gstatic.com/s/oswald/v53/TK3_WkUHHAIjg75cFRf3bXL8LICs1xZogUFoZAaRliE.ttf"



// // Registre a fonte após o carregamento

// // Font.register({
// // 	family: 'Oswald',
// // 	src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
// // 	// fonts: [
// // 	// 	{ src: oswald400 },
// // 	// 	{ src: oswald500, fontWeight: 500 },
// // 	// 	{ src: oswald600, fontWeight: 600 },
// // 	// 	{ src: oswald700, fontWeight: 700 },
// // 	// ],
// // });


export type ThemeStyles = {
	orientation: 'landscape' | 'portrait'
	theme: Theme
}

export type Theme = {
	title: string
	text_primary_color: string
	text_secondary_color: string
	title_text_size: string,
	background_primary_color: string
	background_secondary_color: string
	title_font_family: string
	paragraph_font_family: string
	created_at: string
	updated_at: string
	paragraph_text_size: string
}



export function useThemeStyles({ orientation, theme }: ThemeStyles) {

	const textStyles = StyleSheet.create({
		p: {
			margin: 0,
			fontSize: theme?.paragraph_text_size,
			fontFamily: theme?.paragraph_font_family,
			color: theme?.text_primary_color
		},
		h1: {
			fontFamily: theme?.title_font_family,
			fontSize: theme?.title_text_size,
			color: theme?.text_secondary_color
		},
		h2: {
			fontSize: +theme?.title_text_size - 8,
			marginBottom: '3mm',
			color: theme?.text_secondary_color
		},
		h3: {
			fontFamily: 'Helvetica-Bold',
			fontSize: +theme?.paragraph_text_size * 1.1,
			marginBottom: '5mm',
			color: theme?.text_primary_color
		},
	})

	const portrait = StyleSheet.create({
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
			backgroundColor: theme?.background_primary_color,
			flexGrow: 1,
			margin: 0,
			display: 'none'
		},
		pageLoaded: {
			flexDirection: `column`,
			backgroundColor: theme?.background_primary_color,
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
			width: '50%',
			backgroundColor: theme?.background_secondary_color,
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

	const landscape = StyleSheet.create({
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
			backgroundColor: theme?.background_primary_color,
			flexGrow: 1,
			margin: 0,
			display: 'none'
		},
		pageLoaded: {
			flexDirection: `row`,
			backgroundColor: theme?.background_primary_color,
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
	console.log("theme", theme)
	const finalPortrait = { ...portrait, ...textStyles }
	const finalLandscape = { ...landscape, ...textStyles }
	const styles = orientation === 'landscape' ? finalLandscape : finalPortrait;
	return [styles]
}