import { PortifolioType, useThemeStyles } from '@/components/pdf/styles';

import { useEffect, useState } from 'react';

export type RecordType = {
	record: PortifolioType
}
const useStyles = async ({ record }: RecordType) => {
	const [styles, setStyles] = useState({})
	useEffect(() => {
		function getStyles() {
			const styles = useThemeStyles({ portfolio: record });
			setStyles(styles)
		}
		getStyles()

	}, []);

	return styles;
}

export default useStyles;