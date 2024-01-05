import { useThemeStyles } from '@/components/pdf/styles';
import { PortfolioType } from '@/app/dashboard/types';

import { useEffect, useState } from 'react';

export type RecordType = {
	record: PortfolioType
}
const useStyles = async ({ record }: RecordType) => {
	const [styles, setStyles] = useState({})
	useEffect(() => {
		function getStyles() {
			const styles = useThemeStyles(record);
			setStyles(styles)
		}
		getStyles()

	}, []);

	return styles;
}

export default useStyles;