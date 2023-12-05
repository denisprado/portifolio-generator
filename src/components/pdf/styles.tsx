import { ThemeStyles, PageLayoutType } from '@/app/dashboard/portfolios/types';
import { supabaseClient } from '@/utils/supabase';
import { StyleSheet } from '@react-pdf/renderer';

export async function useThemeStyles({ portfolio }: ThemeStyles) {

	const { color_theme_id, typography_theme_id, spacing_theme_id, page_layout } = portfolio
	if (!color_theme_id || !typography_theme_id || !spacing_theme_id || !page_layout) {
		return
	}
	const { data: color_theme } = await supabaseClient.from('color_theme').select().match({ id: color_theme_id }).single()
	const { data: typography_theme } = await supabaseClient.from('typography_theme').select().match({ id: typography_theme_id }).single()
	const { data: spacing_theme } = await supabaseClient.from('spacing_theme').select().match({ id: spacing_theme_id }).single()

	const margin: number = spacing_theme?.margin ? Number(spacing_theme?.margin) : 0;
	const padding: number = spacing_theme?.padding ? Number(spacing_theme?.padding) : 0;
	const imageMargin: number = spacing_theme?.image_margin ? Number(spacing_theme?.image_margin) : 0

	const pageLayout: PageLayoutType = page_layout as PageLayoutType

	const pageSetup = {
		landscape: {
			height: 210,
			width: 297,
		},
		portrait: {
			height: 297,
			width: 210,
		}
	}

	const imageSetup = {
		landscape: {
			height: 160,
			width: "100%"
		},
		portrait: {
			height: 220,
			width: "100%"
		}
	}

	const columnSetup = {
		height: pageSetup[pageLayout].height - imageSetup[pageLayout].height - (2 * imageMargin)
	}

	const page = StyleSheet.create({
		viewer: {
			margin: 0,
			height: `${pageSetup[pageLayout].height}mm`,
			display: 'flex',
			width: `${pageSetup[pageLayout].width}mm`,
			marginHorizontal: margin,
			marginVertical: margin
		},
		page: {
			flexDirection: `column`,
			backgroundColor: color_theme?.background_primary_color ?? '',
			flexGrow: 1,
			margin: 0,
			display: 'none'
		},
		pageLoaded: {
			flexDirection: `column`,
			backgroundColor: color_theme?.background_primary_color ?? '',
			flexGrow: 1,
			margin: 0,
			display: 'flex'
		},
		pageContent: {
			display: 'flex',
			flexDirection: `column`,
		},
	});

	const textStyles = StyleSheet.create({
		p: {
			margin: 0,
			fontSize: typography_theme?.paragraph_text_size ?? '',
			fontFamily: typography_theme?.paragraph_font_family ?? '',
			color: color_theme?.text_primary_color ?? ''
		},
		h1: {
			fontFamily: typography_theme?.title_font_family ?? '',
			fontSize: typography_theme?.title_text_size ?? '',
			color: color_theme?.text_secondary_color ?? ''
		},
		h2: {
			fontSize: +typography_theme?.title_text_size! - 8,
			fontFamily: typography_theme?.title_font_family ?? '',
			marginBottom: '3mm',
			color: color_theme?.text_secondary_color ?? ''
		},
		h3: {
			fontFamily: 'Helvetica-Bold',
			fontSize: +typography_theme?.paragraph_text_size! * 1.1,
			marginBottom: '5mm',
			color: color_theme?.text_primary_color ?? ''
		},
	})

	const image = StyleSheet.create({
		image: {
			width: `${imageSetup[pageLayout].width}`,
			height: `${imageSetup[pageLayout].height}mm`,
			margin: `${imageMargin}mm`,
			objectFit: 'cover',
		},
		imageCover: {
			width: `${imageSetup[pageLayout].width}`,
			// height: `${imageSetup[pageLayout].height}mm`,
			height: `${imageSetup[pageLayout].height - ((20) + ((+textStyles.h1 ? +textStyles.h1 : 10) / 2.83465)) + 2}mm`,
			margin: `${imageMargin}mm`,
			objectFit: 'cover',
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
			flexDirection: 'row',
			marginTop: 0,

		},
		column: {
			margin: `${margin}mm`,
			display: 'flex',
			width: "50%",
			flexGrow: 1,
			backgroundColor: color_theme?.background_secondary_color!,
		},
		innerColumn: {
			padding: `${padding}mm`,
			width: "100%",
			display: 'flex',
			height: `${columnSetup.height}mm`,
			flexGrow: 1,
			// border: '1px solid blue',
		},
	})

	const styles = { ...page, ...image, ...textStyles, ...section, ...column }

	return styles
}