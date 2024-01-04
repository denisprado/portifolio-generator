import { Document, PDFViewer } from '@react-pdf/renderer';
import { WorkPagePdf } from './WorkPagePdf';
import { Orientation } from 'types';

const WorkPDF = ({ record, styles, page_layout }: any) => {
	const orientation = page_layout !== undefined ? page_layout as Orientation : record?.page_layout as Orientation

	return (
		<PDFViewer style={styles?.viewer}>
			<Document style={{ margin: 0 }}>
				<WorkPagePdf record={record} page_layout={orientation} styles={styles} />
			</Document>
		</PDFViewer >
	)
};

export default WorkPDF