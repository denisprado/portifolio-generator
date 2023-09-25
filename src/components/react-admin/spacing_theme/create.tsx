
import { Create } from 'react-admin';

import { PageTitle } from './edit';
import dynamic from 'next/dynamic';

const SpacingThemeInputs = dynamic(() => import("@/components/react-admin/spacing_theme/SpacingThemeInputs"));


export const SpacingThemeCreate = () => (

	<Create title={<PageTitle />}>
		<SpacingThemeInputs />
	</Create >
);

export default SpacingThemeCreate