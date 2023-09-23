
import { Create } from 'react-admin';
import { ThemeInputs } from './ThemeInputs';
import { PageTitle } from './edit';

export const ThemeCreate = () => (
	<Create title={<PageTitle />}>
		<ThemeInputs />
	</Create >
);

export default ThemeCreate