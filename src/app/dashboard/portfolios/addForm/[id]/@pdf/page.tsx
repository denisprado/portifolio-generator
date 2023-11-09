'use client'

import { getSession } from "@/app/supabase-server";
import { WorkPagePdf } from "@/components/pdf/WorkPagePdf";
import { Column } from "@/components/pdf/components/column";
import { ContainerColumn } from "@/components/pdf/components/columnSection";
import { Section } from "@/components/pdf/components/section";
import { Orientation } from "@/components/pdf/portifolio";
import { useThemeStyles } from "@/components/pdf/styles";
import { supabaseClient } from "@/utils/supabase";
import { Document, Image, PDFViewer, Page, Text, View } from '@react-pdf/renderer';
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";


// const PortifolioPDF = dynamic(() => import("@/components/pdf/portifolio"), {
// 	loading: () => <p>Loading...</p>,
// 	ssr: false
// });

export default function PdfView({ params, }: {
	params: { id: string },
}) {
	const { id } = params

	if (!id) {
		return null
	}

	const [works, setWorks] = useState<any>([])
	const [portfolio, setPortfolio] = useState<any>([])
	const [user, setUser] = useState<any>([])
	const [styles, setStyles] = useState<any>()

	useEffect(() => {
		const fetchWorks = async () => {
			const { data: portfolio } = await supabaseClient.from('portfolio').select().match({ id }).single()
			setPortfolio(portfolio)
		}
		fetchWorks()
	}, [])

	if (!portfolio) {
		notFound()
	}

	useEffect(() => {
		const fetchStyles = async () => {
			const portStyles = await useThemeStyles({ portfolio: portfolio });
			setStyles(portStyles)
		}
		fetchStyles()
	}, [])

	if (!portfolio) {
		notFound()
	}



	const image_1 = portfolio?.image_1
	const image_2_src = portfolio?.image_2_src
	const title = portfolio?.title
	const description = portfolio?.description
	const bio = portfolio?.bio
	const cv = portfolio?.cv
	const contact = portfolio?.contact
	const orientation = portfolio?.page_layout as Orientation

	const { work_id } = portfolio

	if (!works) {
		return null
	}

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
		const fetchWorks = async () => {
			const { data: workData } = await supabaseClient.from('portfolio').select().match({ work_id }).single()

			if (!workData) {
				return null
			}
			setWorks(workData)
		}
		fetchWorks()
	}, [])


	if (!styles) {
		return
	}

	return (
		<PDFViewer>
			<Document style={{ margin: 0, width: "210mm", height: '297mm' }} >

				{/* Página 1 - Capa */}

				<Page size={"A4"} style={styles?.pageLoaded} orientation={orientation}>
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

				{works?.map((work: { id: any; }) =>
					<WorkPagePdf key={work?.id} portfolio={work} styles={styles} page_layout_from_portifolio={orientation} />
				)}

				{/* 2ª Contra Capa */}

				<Page size={"A4"} style={styles?.pageLoaded} orientation={orientation}>
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

				<Page size={"A4"} style={styles?.pageLoaded} orientation={orientation}>
					<View style={styles?.pageContent}>
						<Section style={styles}>
							<Image src={image_2_src} style={styles?.image} />
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
	)
}