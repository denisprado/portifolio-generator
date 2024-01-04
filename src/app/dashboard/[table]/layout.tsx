'use client'

export default function Layout({
	children // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {

	return (
		<div className='grid grid-cols-12 gap-4 '>
			<div className='col-span-12'>
				{children}
			</div>
		</div>
	)
}