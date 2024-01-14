'use client'
import { useSearchParams } from 'next/navigation'

export default function Layout(props: {
	view: React.ReactNode
	form: React.ReactNode
	pdf: React.ReactNode
}) {
	const searchParams = useSearchParams()

	const type = searchParams.get('type')

	return (
		<div className='grid grid-cols-12'>
			{type === 'view' ? <div className='col-span-6'>
				{props.view}
			</div> : <div className='col-span-6'>
				{props.form}
			</div>}
			<div className="col-span-6 bg-white relative ">
				<div className="fixed ">
					{props.pdf}
				</div>
			</div>
		</div>
	)
}