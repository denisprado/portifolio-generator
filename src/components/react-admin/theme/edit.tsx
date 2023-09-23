import { Edit, useRecordContext } from 'react-admin';
import { ThemeInputs } from './ThemeInputs';

export const PageTitle = () => {
	const record = useRecordContext();
	return <span>{record ? `"${record.title}"` : ''}</span>;
};

export const ThemeEdit = () => (
	<Edit title={<PageTitle />}>
		<ThemeInputs />
	</Edit>
);

export default ThemeEdit