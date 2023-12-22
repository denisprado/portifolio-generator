import { useThemeStyles } from '@/components/pdf/styles';
import { PortifolioType } from '@/app/dashboard/types';

import { useEffect, useState } from 'react';

export type RecordType = {
	record: PortifolioType
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