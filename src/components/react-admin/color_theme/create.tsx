import { Create } from 'react-admin';
import ColorThemeInputs from './ColorThemeInputs';
import { PageTitle } from './edit';

export const ColorThemeCreate = () => (

	<Create title={<PageTitle />}>
		<ColorThemeInputs />
	</Create >
);

export default ColorThemeCreate