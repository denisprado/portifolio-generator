import { useRecordContext } from 'react-admin';

import { PortifolioType } from '../portifolio/Aside';

import { useThemeStyles } from '@/components/pdf/styles';
// const WorkPDF = dynamic(() => import("@/components/pdf/work"), {
// 	loading: () => <p>Loading...</p>,
// });

export const Aside = async () => {
	const record = useRecordContext() as PortifolioType;
	const styles = useThemeStyles({ orientation: record?.page_layout ? record?.page_layout : 'portrait', portfolio: record });

	return (
		<div style={(await styles)?.viewer}>
			{/*
			<WorkPDF record={record} styles={styles} /> */}
		</div>
	);
};
