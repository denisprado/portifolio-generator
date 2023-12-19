'use client'

import { NEW } from '@/app/constants'
import { WorkPagePdf } from "@/components/pdf/WorkPagePdf"
import { Column } from "@/components/pdf/components/column"
import { ContainerColumn } from "@/components/pdf/components/columnSection"
import { Section } from "@/components/pdf/components/section"
import { useThemeStyles } from "@/components/pdf/styles"
import { supabaseClient } from "@/utils/supabase"
import { Document, Image, PDFViewer, Page, Text, View } from '@react-pdf/renderer'
import { notFound } from "next/navigation"
import { useEffect, useState } from "react"
import { PortifolioType } from '../../types'

export default function PdfView({ params: { id } }: { params: { id: string } }) {

	if (!id) {
		console.log(id)
		return null
	}

	const [works, setWorks] = useState<any>([])
	const [portfolio, setPortfolio] = useState<any>([])
	const [styles, setStyles] = useState<any>()



	useEffect(() => {
		const fetchPortfolios = async () => {
			if (id) {
				supabaseClient.channel('room1')
					.on('postgres_changes', { event: '*', schema: '*' }, (payload) => {
						setPortfolio(payload.new as PortifolioType)
					})
					.subscribe()
			}
		}
		fetchPortfolios()

	}, [portfolio])

	useEffect(() => {
		const fetchPortfolios = async () => {
			if (id !== 'new') {
				const { data: portfolio } = await supabaseClient.from('portfolio').select().match({ id: id }).single()
				setPortfolio(portfolio)
			}
		}
		fetchPortfolios()
	}, [id])

	useEffect(() => {
		const fetchStyles = async () => {
			const portStyles = await useThemeStyles({ portfolio: portfolio })

			setStyles(portStyles)
		}
		fetchStyles()
	}, [portfolio])

	if (!portfolio) {
		notFound()
	}

	const { work_id, image_1_src,
		image_2_src,
		title,
		description,
		bio,
		cv,
		contact,
		page_layout } = portfolio

	useEffect(() => {

		if (work_id) {

			const fetchWorks = async () => {
				const { data: workData } = await supabaseClient.from('work').select().in('id', work_id)
				if (!workData) {
					return null
				}

				setWorks(workData)
			}
			fetchWorks()
		}
	}, [work_id])

	if (!styles) {
		return null
	}


	if (!works) {
		return null
	}

	if (id === NEW) {
		return null
	}

	return (
		<div className="fixed w-full">

			<PDFViewer style={styles?.viewer}>

				<Document style={{ margin: 0, width: "210mm", height: '297mm' }}>

					{/* Página 1 - Capa */}

					<Page size={"A4"} style={styles?.pageLoaded} orientation={page_layout}>
						<View style={styles?.pageContent}>
							<Section style={styles}>
								<View style={{ padding: '10mm', paddingBottom: '0' }}>
									<Text style={styles?.h1}>{title}</Text>
								</View>
							</Section>
							<Section style={styles}>
								{image_1_src && <Image src={image_1_src} style={styles?.imageCover} />}
							</Section>
							<Section style={styles}>
								<ContainerColumn style={styles} descriptionOrder={'initial'}>
									<Column style={styles}>
										<Text style={styles?.p}>{description}</Text>
									</Column>
								</ContainerColumn>
							</Section>
						</View>
					</Page>

					{/* Obras */}

					{works && works?.map((work: { id: any }) =>
						<WorkPagePdf key={work?.id} record={work} styles={styles} page_layout_from_portifolio={page_layout} />
					)}

					{/* 2ª Contra Capa */}

					<Page size={"A4"} style={styles?.pageLoaded} orientation={page_layout}>
						<View style={styles?.pageContent}>
							<Section style={styles}>
								<Column style={styles}>
									<Text style={styles?.h3}>Biografia</Text>
									<Text style={styles?.p}>{bio}</Text>
								</Column>
								<Column style={styles}>
									<Text style={styles?.h3}>Curriculum Vitae</Text>
									<Text style={styles?.p}>{cv}</Text>
								</Column>
							</Section>
						</View>
					</Page>

					{/* Contra Capa */}

					<Page size={"A4"} style={styles?.pageLoaded} orientation={page_layout}>
						<View style={styles?.pageContent}>
							<Section style={styles}>
								{image_2_src && <Image src={image_2_src} style={styles?.image} />}
							</Section>
							<Section style={styles}>
								<Column style={styles}>
									<Text style={styles?.h3}>Contato</Text>
									<Text style={styles?.p}>{contact}</Text>
								</Column>
							</Section>
						</View>
					</Page>
				</Document>
			</PDFViewer>
		</div>
	)
}