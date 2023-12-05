import { useThemeStyles } from '@/components/pdf/styles';
import { PortifolioType } from '@/app/dashboard/portfolios/types';
import { useRecordContext } from 'react-admin';




export const Aside = async () => {
	const record = useRecordContext() as PortifolioType

	const styles = useThemeStyles({ portfolio: record });

	return (
		<div style={(await styles)?.viewer}>
			{/* <PortifolioPDF record={record} styles={styles} /> */}
		</div>
	);
};
