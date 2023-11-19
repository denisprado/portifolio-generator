'use client'

import { WorkPagePdf } from "@/components/pdf/WorkPagePdf";
import { Column } from "@/components/pdf/components/column";
import { ContainerColumn } from "@/components/pdf/components/columnSection";
import { Section } from "@/components/pdf/components/section";
import { Orientation } from "@/components/pdf/portifolio";
import { PortifolioType, useThemeStyles } from "@/components/pdf/styles";
import { supabaseClient } from "@/utils/supabase";
import { Document, Image, PDFViewer, Page, Text, View } from '@react-pdf/renderer';
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function PdfView({ params: { id } }: { params: { id: string } }) {

	if (!id) {
		return null
	}

	const [works, setWorks] = useState<any>([])
	const [portfolio, setPortfolio] = useState<any>([])
	const [user, setUser] = useState<any>([])
	const [styles, setStyles] = useState<any>()



	useEffect(() => {
		const fetchPortfolios = async () => {
			if (id) {
				const channels = supabaseClient.channel('room1')
					.on('postgres_changes', { event: '*', schema: '*' }, (payload) => {
						setPortfolio(payload.new as PortifolioType);
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
			const portStyles = await useThemeStyles({ portfolio: portfolio });

			setStyles(portStyles)
		}
		fetchStyles()
	}, [portfolio])

	if (!portfolio) {
		notFound()
	}

	const { work_id, image_1,
		image_2,
		title,
		description,
		bio,
		cv,
		contact,
		page_layout } = portfolio

	useEffect(() => {
		const fetchUserId = async () => {
			const { data: userDetails } = await supabaseClient
				.from('users')
				.select('*')
				.single();
			if (!userDetails) {
				return null
			}
			setUser(userDetails)
		}
		fetchUserId()
	}, [])

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

	if (id === 'new') {
		return null
	}

	return (
		<div className="w-full fixed">

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
								<Image src={image_1} style={styles?.imageCover} />
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

					{works && works?.map((work: { id: any; }) =>
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
								<Image src={image_2} style={styles?.image} />
							</Section>
							<Section style={styles}>
								<Column style={styles}>
									<Text style={styles?.h3}>Contato</Text>
									<Text style={styles?.p}>{contact}</Text>
								</Column>
								<Column style={styles}>
								</Column>
							</Section>
						</View>
					</Page>
				</Document>
			</PDFViewer>
		</div>
	)
}