"use client"
import { PortifolioCreate, PortifolioEdit, PortifolioList, PortifolioShow } from '@/components/react-admin/portifolio';
import { authProvider } from "@/utils/authProvider";
import dataProvider from '@/utils/dataProvider';
import { ForgotPasswordPage, LoginPage, SetPasswordPage } from 'ra-supabase';
import { Admin, CustomRoutes, Resource, Layout, AppBar, ToggleThemeButton } from 'react-admin';
import { BrowserRouter, Route } from 'react-router-dom';
import { WorkCreate, WorkEdit, WorkList, WorkShow } from "./react-admin/work";
import ptBrMessages from 'ra-language-pt-br';
import polyglotI18nProvider from 'ra-i18n-polyglot';

export const MyAppBar = () => (
	<AppBar toolbar={<ToggleThemeButton />} />
);
const MyLayout = (props) => <Layout {...props} appBar={MyAppBar} />;
const messages = {
	'pt-br': ptBrMessages,
};
const i18nProvider = polyglotI18nProvider(locale => messages[locale], 'pt-br');

const AdminApp = () => (

	<BrowserRouter>

		<Admin layout={MyLayout} i18nProvider={i18nProvider}
			dataProvider={dataProvider} loginPage={LoginPage} authProvider={authProvider}
		>
			<CustomRoutes noLayout>
				<Route
					path={SetPasswordPage.path}
					element={<SetPasswordPage />}
				/>
				<Route
					path={ForgotPasswordPage.path}
					element={<ForgotPasswordPage />}
				/>
			</CustomRoutes>
			<Resource label={"Portifolios"} name="portfolio" list={PortifolioList} edit={PortifolioEdit} show={PortifolioShow} create={PortifolioCreate} recordRepresentation="title" />
			<Resource label={"Trabalhos"} name="work" list={WorkList} edit={WorkEdit} show={WorkShow} create={WorkCreate} recordRepresentation="title" />
		</Admin>
	</BrowserRouter>

);

export default AdminApp;