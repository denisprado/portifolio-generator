import { useThemeStyles } from '@/components/pdf/styles';
import { PortifolioType } from '../portifolio/Aside';
import useThemes from './useThemes';
import { useGetOne } from 'react-admin';
import { useEffect, useState } from 'react';

export type RecordType = {
	record: PortifolioType
	styles: any
}
const useStyles = async ({ record }: RecordType) => {
	const [styles, setStyles] = useState({})
	useEffect(() => {
		function getStyles() {

			const { data: color_theme } = useGetOne('color_theme', { id: record?.color_theme_id });
			const { data: typography_theme } = useGetOne('typography_theme', { id: record?.typography_theme_id });
			const { data: spacing_theme } = useGetOne('spacing_theme', { id: record?.spacing_theme_id });

			const [styles] = useThemeStyles({ orientation: record?.page_layout ? record?.page_layout : 'portrait', color_theme: color_theme, typography_theme: typography_theme, spacing_theme: spacing_theme });
			setStyles(styles)
		}
		getStyles()

	}, []);

	return styles;
}

export default useStyles;