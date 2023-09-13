import { useRecordContext } from "react-admin";

const MyImageField = ({ source }: { source: string }) => {
	const record = useRecordContext();
	if (!record) return null;
	if (!record[source]) return null;
	const rec = record[source][0]
	if (!rec) return null
	const url = (JSON.parse(rec).url)

	return url ? <img src={url} width={250} height={250} /> : null;
};

export default MyImageField