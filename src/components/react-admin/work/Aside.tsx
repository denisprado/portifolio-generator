import { useThemeStyles } from '@/components/pdf/styles';
import { PortfolioType } from '@/app/dashboard/types';
import { useRecordContext } from 'react-admin';
// const WorkPDF = dynamic(() => import("@/components/pdf/work"), {
// 	loading: () => <p>Loading...</p>,
// });

export const Aside = async () => {
	const record = useRecordContext() as PortfolioType;
	const styles = useThemeStyles(record);

	return (
		<div style={(await styles)?.viewer}>
			{/*
			<WorkPDF record={record} styles={styles} /> */}
		</div>
	);
};
