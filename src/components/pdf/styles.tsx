import { StyleSheet } from '@react-pdf/renderer';

export type ThemeStyles = {
	orientation: 'landscape' | 'portrait'
	color_theme: ColorTheme
	typography_theme: TypographyTheme
	spacing_theme?: SpacingTheme
}

export type SpacingTheme = {
	magin: string
	spacing: string
	image_margin: string
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



export function useThemeStyles({ orientation, color_theme, typography_theme, spacing_theme }: ThemeStyles) {

	const margin = spacing_theme?.magin ? `${spacing_theme?.magin}mm` : '10mm';
	const spacing = spacing_theme?.spacing ? `${spacing_theme?.spacing}mm` : '10mm';
	const imageMargin = spacing_theme?.image_margin ? `${spacing_theme?.image_margin}mm` : '10mm';

	const portrait = StyleSheet.create({
		viewer: {
			margin: 0,
			height: '297mm',
			display: 'flex',
			width: '210mm',
			marginHorizontal: margin,
			marginVertical: margin
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

		image: {
			width: "100%",
			height: "220mm",
			objectFit: 'cover',
			margin: imageMargin,
		},


	});

	const landscape = StyleSheet.create({
		viewer: {
			margin: 0,
			width: '210mm',
			display: 'flex',
			height: '149mm',
			marginHorizontal: margin,
			marginVertical: margin
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
		image: {
			width: "280mm",
			height: "140mm",
			objectFit: 'cover',
			margin: imageMargin,
		},

	});

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

	const section = StyleSheet.create({
		section: {
			display: 'flex',
			width: '100%',
			flexGrow: 1,
		},
		innerSection: {
			width: '100%',
			display: 'flex',
			flexGrow: 1,
			flexDirection: 'row'
		},
	})

	const column = StyleSheet.create({
		containerColumn: {
			display: 'flex',
			flexDirection: 'row'
		},
		column: {
			display: 'flex',
			width: "50%",
			flexGrow: 1,
			backgroundColor: color_theme?.background_secondary_color,
		},
		innerColumn: {
			padding: "10mm",
			width: "100%",
			display: 'flex',
			height: '57mm',
			flexGrow: 1,
			// border: '1px solid blue',
		},
	})

	const finalPortrait = { ...portrait, ...textStyles, ...section, ...column }
	const finalLandscape = { ...landscape, ...textStyles, ...section, ...column }
	const styles = orientation === 'landscape' ? finalLandscape : finalPortrait;

	return [styles]
}