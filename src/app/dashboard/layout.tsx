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
    <>
      <div className="flex h-full">
        <CssBaseline />
        {/* <AppBar position="fixed" open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: 5,
							...(open && { display: 'none' }),
						}}
					>
						<MenuIcon />
					</IconButton>
					
				</Toolbar>
			</AppBar> */}
        <div className="flex flex-column border-0 border-r-2 border-gray-400 h-full">
          <List>
            {[
              { label: 'Portfolios', href: '/dashboard/portfolios' },
              { label: 'Trabalhos', href: '/dashboard/work' }
            ].map((item, index) => (
              <ListItem
                key={item.label}
                disablePadding
                sx={{ display: 'block' }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: 'initial',
                    px: 2.5
                  }}
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
        <div className={'flex-grow p-3'}>{children}</div>
      </div>
    </>
  );
}
