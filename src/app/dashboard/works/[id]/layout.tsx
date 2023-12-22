export default function Layout(props: {
	form: React.ReactNode
	pdf: React.ReactNode

}) {

	return (
		<div className='grid grid-cols-12 gap-4 p-8'>

			<div className='col-span-6'>
				{props.form}
			</div>
			<div className="col-span-6 bg-white relative px-4 ">
				<div className="fixed ">
					{props.pdf}
				</div>
			</div>
		</div>
	)
}