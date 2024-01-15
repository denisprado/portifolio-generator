export default function SessionLabel({ label }: { label: React.ReactNode }) {
	return (<div className="mt-10">
		<h2 className='text-lg font-extrabold'>{label}</h2>
	</div>);
}