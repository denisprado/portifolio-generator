import PortifolioPDF from "@/components/pdf/portifolio"
import { supabaseClient } from "@/utils/supabase"
import { notFound } from "next/navigation"
import { Document, Image, PDFViewer, Page, Text, View } from '@react-pdf/renderer';
import { ResumeIframeCSR } from "@/components/pdf/components/Frama";

export default async function PdfView({ params, }: {
	params: { id: string },
}) {
	const { id } = params

	const { data: portfolio } = await supabaseClient.from('portfolio').select().match({ id }).single()

	if (!portfolio) {
		notFound()
	}

	return (
		<div className="w-full h-full bg-white">
			<ResumeIframeCSR documentSize={'A4'} scale={1} enablePDFViewer={true}>
				<Document>
					<Page size={"A4"} orientation={'portrait'}>
						<View style={{ backgroundColor: '#c00', width: '100%' }}>
							<Text>{portfolio.title}</Text>
						</View>
					</Page>
				</Document>
			</ResumeIframeCSR>

		</div>)
}