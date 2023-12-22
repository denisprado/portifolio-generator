'use client'

import { NEW } from '@/app/constants'
import { useThemeStyles } from "@/components/pdf/styles"
import WorkPDF from '@/components/pdf/work'
import { supabaseClient } from "@/utils/supabase"
import { notFound } from "next/navigation"
import { useEffect, useState } from "react"
import { WorkType } from '../../../types'

export default function PdfView({ params: { id } }: { params: { id: string } }) {

	if (!id) {
		return null
	}

	const [work, setWork] = useState<any>([])
	const [styles, setStyles] = useState<any>()

	useEffect(() => {
		const fetchWorks = async () => {
			if (id) {
				supabaseClient.channel('room1')
					.on('postgres_changes', { event: '*', schema: '*', table: 'work' }, (payload) => {
						setWork(payload.new as WorkType)
					})
					.subscribe()
			}
		}
		fetchWorks()
	}, [work])

	useEffect(() => {
		const fetchWorks = async () => {
			if (id !== 'new') {
				const { data: work } = await supabaseClient.from('work').select().match({ id: id }).single()
				setWork(work)
			}
		}
		fetchWorks()
	}, [id])

	useEffect(() => {
		const fetchStyles = async () => {
			const workStyles = await useThemeStyles(work)
			setStyles(workStyles)
			console.log(workStyles)
		}
		fetchStyles()
	}, [work, id])

	if (!work) {
		notFound()
	}

	if (!work) {
		return null
	}

	if (id === NEW) {
		return null
	}

	return (
		<WorkPDF record={work} styles={styles} page_layout={work.page_layout} />
	)
}