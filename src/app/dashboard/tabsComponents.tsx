'use client'

import { ReactNode } from 'react';
import { Accordion as DaisyAccordion, Tabs as DaisyTabs, type AccordionProps, type TabsProps } from 'react-daisyui';

const { Tab, RadioTab } = DaisyTabs

export function Tabs({
	tabs,
	tab,
	setTab,
	key,
	...props
}: {
	tabs?: { label: string, content: ReactNode }[]
	tab: number
	setTab(page: number): void
	key: string
} & TabsProps) {
	const tabName = Math.random().toString()
	return (
		<DaisyTabs {...props} key={key}>
			{(tabs ?? []).map((i, index) => (
				<RadioTab
					name={tabName}
					label={i.label}
					contentClassName="bg-base-100 border-base-300 rounded-box p-6"
					key={index}
					role="tab"
					defaultChecked={index === tab}
					onClick={() => setTab(index)}
				>
					{i.content}
				</RadioTab>
			))}
		</DaisyTabs>
	)
}


export function Accordion({
	items,
	...props
}: {
	items?: { label: string; content: React.ReactNode }[]
} & AccordionProps) {
	return (
		<div className="flex flex-col gap-4 h-full relative">
			{(items ?? []).map((i, index) => (
				<div className="bg-base-200">
					<DaisyAccordion key={index} data-index={index + Math.random()} {...props} >
						<DaisyAccordion.Title className="text-xl font-medium">
							{i.label}
						</DaisyAccordion.Title>
						<DaisyAccordion.Content>{i.content}</DaisyAccordion.Content>
					</DaisyAccordion>
				</div>
			))}
		</div>
	)
}