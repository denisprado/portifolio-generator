import dynamic from "next/dynamic";
import { Create, useRecordContext } from 'react-admin';
import { PageTitle } from "../common/PageTitle";
import { Aside } from './Aside';

const PortifolioInputs = dynamic(() => import("@/components/react-admin/portifolio/PortifolioInputs"), {
	loading: () => <p>Loading...</p>,
});

export const PortifolioCreate = () => {

	return (
		/* @ts-expect-error */
		<Create aside={<Aside />} title={<PageTitle />} redirect={false}>
			<PortifolioInputs />
		</Create >
	)
};

export default PortifolioCreate