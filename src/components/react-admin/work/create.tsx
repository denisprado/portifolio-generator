import dynamic from "next/dynamic";
import { Create } from 'react-admin';
import { PageTitle } from "../common/PageTitle";
import { Aside } from './Aside';

const WorkFields = dynamic(() => import("./WorkFields"), {
	loading: () => <p>Loading...</p>,
});

export const WorkCreate = () => (
	/* @ts-expect-error */
	<Create aside={<Aside />} title={<PageTitle />} redirect={false}>
		<WorkFields />
	</Create>
);


export default WorkCreate