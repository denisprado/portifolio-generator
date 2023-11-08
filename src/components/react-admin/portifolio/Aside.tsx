import { ThemeStyles, useThemeStyles } from '@/components/pdf/styles';
import { Identifier, RaRecord, useGetOne, useRecordContext } from 'react-admin';
import dynamic from 'next/dynamic';
import useStyles from '../common/useStyles';
import { useEffect, useState } from 'react';


export type PortifolioType = {
	id: string
	title: string
	description: string
	work_id?: string[]
	use_profile_info?: boolean
	download_count?: number
	created_at: string
	updated_at: string
	bio?: string
	cv?: string
	contact?: string
	user_id: string
	image_1?: string
	image_2?: string
	image_1_src?: string
	image_2_src?: string
	page_layout?: 'portrait' | 'landscape',
	typography_theme_id: string
	color_theme_id: string
	spacing_theme_id: string
}
import PortifolioPDF from '@/components/pdf/portifolio';
// const PortifolioPDF = dynamic(() => import("@/components/pdf/portifolio"), {
// 	loading: () => <p>Loading...</p>,
// });
export const Aside = async () => {
	const record = useRecordContext() as PortifolioType

	const styles = useThemeStyles({ portfolio: record });

	return (
		<div style={(await styles)?.viewer}>
			{/* <PortifolioPDF record={record} styles={styles} /> */}
		</div>
	);
};
