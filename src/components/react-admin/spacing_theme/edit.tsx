import { Edit, useRecordContext } from 'react-admin';
import SpacingThemeInputs from './SpacingThemeInputs';

export const PageTitle = () => {
	const record = useRecordContext();
	return <span>{record ? `"${record?.title}"` : ''}</span>;
};

export const SpacingThemeEdit = () => (
	<Edit title={<PageTitle />}>
		<SpacingThemeInputs />
	</Edit>
);

export default SpacingThemeEdit