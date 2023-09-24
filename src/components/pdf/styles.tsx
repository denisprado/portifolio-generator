import { StyleSheet } from '@react-pdf/renderer';

export type ThemeStyles = {
	orientation: 'landscape' | 'portrait'
	color_theme: ColorTheme
	typography_theme: TypographyTheme
}

export type ColorTheme = {
	title: string
	background_primary_color: string
	background_secondary_color: string
	text_primary_color: string
	text_secondary_color: string
	created_at: string
	updated_at: string
}

export type TypographyTheme = {
	title: string
	title_text_size: string,
	title_font_family: string
	paragraph_font_family: string
	paragraph_text_size: string
	created_at: string
	updated_at: string
}



export function useThemeStyles({ orientation, color_theme, typography_theme }: ThemeStyles) {

	const textStyles = StyleSheet.create({
		p: {
			margin: 0,
			fontSize: typography_theme?.paragraph_text_size,
			fontFamily: typography_theme?.paragraph_font_family,
			color: color_theme?.text_primary_color
		},
		h1: {
			fontFamily: typography_theme?.title_font_family,
			fontSize: typography_theme?.title_text_size,
			color: color_theme?.text_secondary_color
		},
		h2: {
			fontSize: +typography_theme?.title_text_size - 8,
			marginBottom: '3mm',
			color: color_theme?.text_secondary_color
		},
		h3: {
			fontFamily: 'Helvetica-Bold',
			fontSize: +typography_theme?.paragraph_text_size * 1.1,
			marginBottom: '5mm',
			color: color_theme?.text_primary_color
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
			backgroundColor: color_theme?.background_primary_color,
			flexGrow: 1,
			margin: 0,
			display: 'none'
		},
		pageLoaded: {
			flexDirection: `column`,
			backgroundColor: color_theme?.background_primary_color,
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
			backgroundColor: color_theme?.background_secondary_color,
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
			backgroundColor: color_theme?.background_primary_color,
			flexGrow: 1,
			margin: 0,
			display: 'none'
		},
		pageLoaded: {
			flexDirection: `row`,
			backgroundColor: color_theme?.background_primary_color,
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

	const finalPortrait = { ...portrait, ...textStyles }
	const finalLandscape = { ...landscape, ...textStyles }
	const styles = orientation === 'landscape' ? finalLandscape : finalPortrait;
	return [styles]
}