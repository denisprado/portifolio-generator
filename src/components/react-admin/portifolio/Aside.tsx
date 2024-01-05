import { useThemeStyles } from '@/components/pdf/styles';
import { PortfolioType } from '@/app/dashboard/types';
import { useRecordContext } from 'react-admin';




export const Aside = async () => {
	const record = useRecordContext() as PortfolioType

	const styles = useThemeStyles(record);

	return (
		<div style={(await styles)?.viewer}>
			{/* <PortifolioPDF record={record} styles={styles} /> */}
		</div>
	);
};
