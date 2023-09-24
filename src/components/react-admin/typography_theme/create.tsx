
import { Create } from 'react-admin';

import { PageTitle } from './edit';
import dynamic from 'next/dynamic';

const TypographyThemeInputs = dynamic(() => import("@/components/react-admin/typography_theme/TypographyThemeInputs"));


export const TypographyThemeCreate = () => (

	<Create title={<PageTitle />}>
		<TypographyThemeInputs />
	</Create >
);

export default TypographyThemeCreate