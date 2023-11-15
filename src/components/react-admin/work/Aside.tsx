import { PortifolioType, useThemeStyles } from '@/components/pdf/styles';
import { useRecordContext } from 'react-admin';
// const WorkPDF = dynamic(() => import("@/components/pdf/work"), {
// 	loading: () => <p>Loading...</p>,
// });

export const Aside = async () => {
	const record = useRecordContext() as PortifolioType;
	const styles = useThemeStyles({ portfolio: record });

	return (
		<div style={(await styles)?.viewer}>
			{/*
			<WorkPDF record={record} styles={styles} /> */}
		</div>
	);
};
