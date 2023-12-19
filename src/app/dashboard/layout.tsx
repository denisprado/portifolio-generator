'use client';

import { useRegisterReactPDFFont } from '@/components/fonts/hooks';
// import { ArtTrack } from '@mui/icons-material';
// import MailIcon from '@mui/icons-material/Mail';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function DashboardLayout({
	children // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	useRegisterReactPDFFont();

	return (


		<div className="grid grid-cols-12 gap-2 border-red-500 border-2 p-4">
			<div className="col-span-2  flex flex-column w-full flex-wrap border-green-500 border-2">
				<div className='w-full'>
					<div className={' border-blue-500 border-2 p-5'}>
						<h1 className='text-lg'>Portfolio<em>Art</em></h1>
					</div>
					<List className='w-full'>
						{[
							{ label: 'Portfolios', href: '/dashboard/portfolios' },
							{ label: 'Trabalhos', href: '/dashboard/work' }
						].map((item, index) => (
							<ListItem
								key={item.label}
								disablePadding
								className='flex flex-column w-full flex-1'
							>
								<ListItemButton
									className='w-full'
									href={item.href}
								>
									{/* <ListItemIcon
                    sx={{
											minWidth: 0,
                      mr: 3,
                      justifyContent: 'center'
                    }}
                  >
                    {index % 2 === 0 ? <ArtTrack /> : <MailIcon />}
                  </ListItemIcon> */}
									<ListItemText primary={item.label} sx={{ opacity: 1 }} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</div>
			</div>
			<div className={'col-span-10'}>{children}</div>
		</div>

	);
}
