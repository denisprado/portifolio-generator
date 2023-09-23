'use client'
import { authProvider } from "@/utils/authProvider"
import dataProvider from '@/utils/dataProvider'
import polyglotI18nProvider from 'ra-i18n-polyglot'
import ptBrMessages from 'ra-language-pt-br'
import { LoginPage } from 'ra-supabase'
import { Admin, Resource, defaultTheme, defaultDarkTheme } from 'react-admin'
import dynamic from 'next/dynamic'
import { ThemeCreate, ThemeEdit, ThemeList } from "./react-admin/theme"

const WorkCreate = dynamic(() => import("./react-admin/work/create"))
const WorkList = dynamic(() => import("./react-admin/work/list"))
const WorkEdit = dynamic(() => import("./react-admin/work/edit"))

const PortifolioCreate = dynamic(() => import("./react-admin/portifolio/create"))
const PortifolioList = dynamic(() => import("./react-admin/portifolio/list"))
const PortifolioEdit = dynamic(() => import("./react-admin/portifolio/edit"))


const AdminApp: React.FC = () => {
	const messages: any = {
		'pt-br': ptBrMessages,
	}
	const lightTheme = defaultTheme;
	const darkTheme = defaultDarkTheme;

	const i18nProvider = polyglotI18nProvider(locale => messages[locale], 'pt-br', { allowMissing: true })
	return (
		<Admin basename='/admin' dataProvider={dataProvider} loginPage={LoginPage} authProvider={authProvider} i18nProvider={i18nProvider} lightTheme={lightTheme}
			darkTheme={darkTheme}>
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
			<Resource name="theme" list={ThemeList} edit={ThemeEdit} create={ThemeCreate} recordRepresentation="title" />
		</Admin>
	)
}

export default AdminApp