import { Edit, useRecordContext } from 'react-admin';
import ColorThemeInputs from './ColorThemeInputs';

export const PageTitle = () => {
	const record = useRecordContext();
	return <span>{record ? `"${record.title}"` : ''}</span>;
};

export const ColorThemeEdit = () => (

	<Edit title={<PageTitle />}>
		<ColorThemeInputs />
	</Edit>
);

export default ColorThemeEdit