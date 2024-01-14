'use client';

import { useRegisterReactPDFFont } from '@/components/fonts/hooks';
// import { ArtTrack } from '@mui/icons-material';
// import MailIcon from '@mui/icons-material/Mail';
import { Drawer } from './drawerComponent';

export default function DashboardLayout({
	children // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	useRegisterReactPDFFont();

	return (

		<div className="h-full">
			<div className="flex flex-col h-full">
				{children}
			</div>
		</div>
	);
}
