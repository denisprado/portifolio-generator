import { ThemeStyles, useThemeStyles } from '@/components/pdf/styles';
import { Identifier, RaRecord, useGetOne, useRecordContext } from 'react-admin';
import dynamic from 'next/dynamic';
import useStyles from '../common/useStyles';
import { useEffect, useState } from 'react';


export type PortifolioType = {
	id: string
	title: string
	description: string
	work_id: string[]
	use_profile_info?: boolean
	download_count?: number
	created_at: string
	updated_at: string
	bio: string
	cv: string
	contact: string
	user_id: string
	image_1: string
	image_2: string
	image_1_src: string
	image_2_src: string
	page_layout: 'portrait' | 'landscape',
	typography_theme_id: string
	color_theme_id: string
	spacing_theme_id: string
}
import PortifolioPDF from '@/components/pdf/portifolio';
// const PortifolioPDF = dynamic(() => import("@/components/pdf/portifolio"));
export const Aside = async () => {
	const record = useRecordContext() as PortifolioType
	const { data: color_theme } = useGetOne('color_theme', { id: record?.color_theme_id });
	const { data: typography_theme } = useGetOne('typography_theme', { id: record?.typography_theme_id });
	const { data: spacing_theme } = useGetOne('spacing_theme', { id: record?.spacing_theme_id });

	const [styles] = useThemeStyles({ orientation: record?.page_layout ? record?.page_layout : 'portrait', color_theme: color_theme, typography_theme: typography_theme, spacing_theme: spacing_theme });

	console.log(styles)

	return (
		<div style={(await styles)?.viewer}>
			{		/* @ts-expect-error */}
			<PortifolioPDF record={record} styles={styles} />
		</div>
	);
};
