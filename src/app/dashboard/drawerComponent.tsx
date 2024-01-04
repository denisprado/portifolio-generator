import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

export const Drawer = ({ items, children }: { items: { label: string, href: string }[], children: ReactNode }) => {
	const path = usePathname()


	return (
		<div className="drawer lg:drawer-open">
			<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col px-4">
				{children}
				<label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
			</div>
			<div className="drawer-side">
				<label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
				<ul className="menu menu-lg p-4 w-80 min-h-full bg-base-200 text-base-content">
					{/* Sidebar content here */}
					{items.map((item) =>
						<li key={item.href}><Link href={item.href}>{item.label}</Link></li>
					)
					}
				</ul>
			</div>
		</div >
	)
}
