import PortifolioPDF, { Orientation } from "@/components/pdf/portifolio"
import { supabaseClient } from "@/utils/supabase"
import { notFound } from "next/navigation"
import { Document, Image, PDFViewer, Page, Text, View } from '@react-pdf/renderer';
import { ResumeIframeCSR } from "@/components/pdf/components/Frama";
import dynamic from "next/dynamic";
import { Column } from "@/components/pdf/components/column";
import { ContainerColumn } from "@/components/pdf/components/columnSection";
import { Section } from "@/components/pdf/components/section";
import { SuppressResumePDFErrorMessage } from "@/components/react-admin/common/SuppressResumePDFErrorMessage";
import { title } from "process";
import { useThemeStyles } from "@/components/pdf/styles";
import { useGetIdentity } from "react-admin";
import { getSession } from "@/app/supabase-server";
import { WorkPagePdf } from "@/components/pdf/WorkPagePdf";


// const PortifolioPDF = dynamic(() => import("@/components/pdf/portifolio"), {
// 	loading: () => <p>Loading...</p>,
// 	ssr: false
// });

export default async function PdfView({ params, }: {
	params: { id: string },
}) {
	const { id } = params
	const { data: portfolio } = await supabaseClient.from('portfolio').select().match({ id }).single()

	if (!portfolio) {
		notFound()
	}

	const styles = await useThemeStyles({ portfolio: portfolio });

	const image_1 = portfolio?.image_1
	const image_2_src = portfolio?.image_2_src

	const title = portfolio?.title
	const description = portfolio?.description

	const bio = portfolio?.bio
	const cv = portfolio?.cv
	const contact = portfolio?.contact
	const orientation = portfolio?.page_layout as Orientation
	const [session] = await Promise.all([getSession()]);
	const user = session?.user;
	const { work_id } = portfolio
	const { data: workData } = await supabaseClient.from('portfolio').select().match({ work_id }).single()


	if (!styles) {
		return
	}

	return (

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
							<Column style={styles}>
								<Text style={styles?.p}>{user?.email}</Text>
							</Column>
						</ContainerColumn>
					</Section>
				</View>
			</Page>

			{/* Obras */}

			{workData && workData?.map((work: { id: any; }) =>
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
	)
}