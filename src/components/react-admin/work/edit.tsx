import dynamic from "next/dynamic";
import { Edit } from 'react-admin';
import { PageTitle } from "../common/PageTitle";
import { Aside } from './Aside';

const WorkFields = dynamic(() => import("./WorkFields"));

export const WorkEdit = () => (
	/* @ts-expect-error */
	<Edit aside={<Aside />} title={<PageTitle />} redirect={false}>
		<WorkFields />
	</Edit >
);

export default WorkEdit