'use client'
import { PortifolioCreate, PortifolioEdit, PortifolioList, PortifolioShow } from '@/components/react-admin/portifolio';
import { authProvider } from "@/utils/authProvider";
import dataProvider from '@/utils/dataProvider';
import { Card, CardContent, CardHeader } from '@mui/material';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import ptBrMessages from 'ra-language-pt-br';
import { ForgotPasswordPage, LoginPage, SetPasswordPage } from 'ra-supabase';
import { Admin, CustomRoutes, Resource } from 'react-admin';
import { Route } from 'react-router-dom';
import { WorkCreate, WorkEdit, WorkList, WorkShow } from "./react-admin/work";



const AdminApp: React.FC = () => {
	const messages: any = {
		'pt-br': ptBrMessages,
	};

	const i18nProvider = polyglotI18nProvider(locale => messages[locale], 'pt-br', { allowMissing: true });
	return (
		<Admin basename='/admin' dataProvider={dataProvider} loginPage={LoginPage} authProvider={authProvider} i18nProvider={i18nProvider}>
			{/* <CustomRoutes noLayout>
			<Route
				path={SetPasswordPage.path}
				element={<SetPasswordPage />}
			/>
			<Route
				path={ForgotPasswordPage.path}
				element={<ForgotPasswordPage />}
			/>
		</CustomRoutes> */}
			<Resource name="portfolio" list={PortifolioList} edit={PortifolioEdit} create={PortifolioCreate} recordRepresentation="title" />
			<Resource name="work" list={WorkList} edit={WorkEdit} create={WorkCreate} recordRepresentation="title" />
		</Admin>
	)
};

export default AdminApp;