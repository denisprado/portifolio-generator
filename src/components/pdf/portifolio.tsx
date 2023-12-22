import { Document, Image, Page, Text, View } from '@react-pdf/renderer';
import { useRegisterReactPDFFont } from '../fonts/hooks';
import { SuppressResumePDFErrorMessage } from '../react-admin/common/SuppressResumePDFErrorMessage';
import { RecordType } from '../react-admin/common/useStyles';
import { ResumeIframeCSR } from './components/Frama';
import { Column } from './components/column';
import { ContainerColumn } from './components/columnSection';
import { Section } from './components/section';
import { useThemeStyles } from './styles';

export type Orientation = 'landscape' | 'portrait';

const PortifolioPDF = async ({ record }: RecordType) => {
	//useRegisterReactPDFFont()
	if (!record) {
		return
	}
	const styles = await useThemeStyles(record);

	const image_1_src = record?.image_1_src
	const image_2_src = record?.image_2_src

	const title = record?.title
	const description = record?.description

	const bio = record?.bio
	const cv = record?.cv
	const contact = record?.contact
	const orientation = record?.page_layout as Orientation

	const { work_id } = record
	// const { data: workData } = await supabaseClient.from('portfolio').select().match({ work_id }).single()
	// const { data: user } = useGetIdentity();

	if (!styles) {
		return
	}

	return (
		<ResumeIframeCSR documentSize={'A4'} scale={1} enablePDFViewer={true}>
			<Document style={{ margin: 0 }} >

				{/* Página 1 - Capa */}

				<Page size={"A4"} style={styles?.pageLoaded} orientation={orientation}>
					<View style={styles?.pageContent}>
						<Section style={styles}>
							<View style={{ padding: '10mm', paddingBottom: '0' }}>
								<Text style={styles?.h1}>{title}</Text>
							</View>
						</Section>
						{/* <Section style={styles}>
							<Image src={image_1_src} style={styles?.imageCover} />
						</Section> */}
						<Section style={styles}>
							<ContainerColumn style={styles} descriptionOrder={'initial'}>
								<Column style={styles}>
									<Text style={styles?.p}>{description}</Text>
								</Column>
								{/* <Column style={styles}>
									<Text style={styles?.p}>{user?.fullName}</Text>
								</Column> */}
							</ContainerColumn>
						</Section>
					</View>
				</Page>

				{/* Obras */}

				{/* {workData && workData?.map((work: { id: any; }) =>
					<WorkPagePdf key={work?.id} record={work} styles={styles} page_layout_from_portifolio={orientation} />
				)} */}

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
						{/* <Section style={styles}>
							<Image src={image_2_src && image_2_src} style={styles?.image} />
						</Section> */}
						<Section style={styles}>
							<Column style={styles}>
								<Text style={styles?.h3}>Contato</Text>
								<Text style={styles?.p}>{contact}</Text>
							</Column>

						</Section>
					</View>
				</Page>
			</Document>
			<SuppressResumePDFErrorMessage />
		</ResumeIframeCSR >
	)
};

export default PortifolioPDF