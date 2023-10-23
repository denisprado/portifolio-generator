import dynamic from "next/dynamic";
import { Edit, useRecordContext } from 'react-admin';
import { Aside } from './Aside';
import { PageTitle } from "../common/PageTitle";

const PortifolioInputs = dynamic(() => import("@/components/react-admin/portifolio/PortifolioInputs"), {
	loading: () => <p>Loading...</p>,
});

export const PortifolioEdit = () => {
	return (
		/* @ts-expect-error */
		<Edit aside={<Aside />} title={<PageTitle />} redirect={false}>
			<PortifolioInputs />
		</Edit>
	)
};

export default PortifolioEdit