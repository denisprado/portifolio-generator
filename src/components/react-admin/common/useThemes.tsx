import { PortifolioType } from '@/app/dashboard/portfolios/types';
import { Identifier, RaRecord, useGetOne } from 'react-admin';


// import { Container } from './styles';
type RecordType = {
	record: PortifolioType
}

const useThemes = ({ record }: RecordType) => {

	const { data: color_theme } = useGetOne('color_theme', { id: record?.color_theme_id });
	const { data: typography_theme } = useGetOne('typography_theme', { id: record?.typography_theme_id });
	const { data: spacing_theme } = useGetOne('spacing_theme', { id: record?.spacing_theme_id });

	return { color_theme: color_theme, typography_theme: typography_theme, spacing_theme: spacing_theme };
}

export default useThemes;