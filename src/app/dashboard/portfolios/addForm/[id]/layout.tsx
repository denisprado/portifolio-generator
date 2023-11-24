export default function Layout(props: {
	form: React.ReactNode
	pdf: React.ReactNode

}) {

	return (
		<div className='grid w-full grid-cols-12 gap-4 p-4'>

			<div className='w-full col-span-6'>
				{props.form}
			</div>
			<div className="w-full h-full col-span-6 bg-white relative">
				{props.pdf}
			</div>
		</div>
	)
}