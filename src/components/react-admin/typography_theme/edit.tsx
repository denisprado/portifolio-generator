import { Edit, useRecordContext } from 'react-admin';
import TypographyThemeInputs from './TypographyThemeInputs';

export const PageTitle = () => {
	const record = useRecordContext();
	return <span>{record ? `"${record?.title}"` : ''}</span>;
};

export const TypographyThemeEdit = () => (
	<Edit title={<PageTitle />}>
		<TypographyThemeInputs />
	</Edit>
);

export default TypographyThemeEdit