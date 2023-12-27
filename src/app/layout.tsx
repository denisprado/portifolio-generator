import { PropsWithChildren } from 'react';
import 'styles/global.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const meta = {
	title: 'PortfolioArt',
	description: 'Brought to you by Vercel, Stripe, and Supabase.',
	cardImage: '/og.png',
	robots: 'follow, index',
	favicon: '/favicon.ico',
	url: 'https://portfolio-generator.vercel.com',
	type: 'website'
};

export const metadata = {
	title: meta.title,
	description: meta.description,
	cardImage: meta.cardImage,
	robots: meta.robots,
	favicon: meta.favicon,
	url: meta.url,
	type: meta.type
	// openGraph: {
	// 	url: meta.url,
	// 	title: meta.title,
	// 	description: meta.description,
	// 	cardImage: meta.cardImage,
	// 	type: meta.type,
	// 	site_name: meta.title
	// },
	// twitter: {
	// 	card: 'summary_large_image',
	// 	site: '@vercel',
	// 	title: meta.title,
	// 	description: meta.description,
	// 	cardImage: meta.cardImage
	// }
};

export default function RootLayout({
	// Layouts must accept a children prop.
	// This will be populated with nested layouts or pages
	children
}: PropsWithChildren) {
	return (
		<html lang="en" className='h-full'>
			<body className={`h-full ${inter.className}`}>
				<main className='h-full relative'>{children}</main>
			</body>
		</html>
	);
}
