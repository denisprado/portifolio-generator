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

		<div className="h-full border-2">
			<div className="flex flex-col gap-2 h-full p-4">
				<div className={'p-5'}>
					<h1 className='text-lg'><strong>Portfolio</strong><em>Art</em></h1>
				</div>
				<Drawer items={[{ label: 'Portfolios', href: '/dashboard/portfolios' },
				{ label: 'Trabalhos', href: '/dashboard/works' }]} >
					{children}
				</Drawer>

			</div>
		</div>
	);
}
