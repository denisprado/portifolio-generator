'use client'
import { authProvider } from "@/utils/authProvider"
import dataProvider from '@/utils/dataProvider'
import dynamic from 'next/dynamic'
import polyglotI18nProvider from 'ra-i18n-polyglot'
import ptBrMessages from 'ra-language-pt-br'
import { LoginPage } from 'ra-supabase'
import { Admin, Resource, defaultDarkTheme, defaultTheme } from 'react-admin'

const WorkCreate = dynamic(() => import("./react-admin/work/create"))
const WorkList = dynamic(() => import("./react-admin/work/list"))
const WorkEdit = dynamic(() => import("./react-admin/work/edit"))

const PortifolioCreate = dynamic(() => import("./react-admin/portifolio/create"))
const PortifolioList = dynamic(() => import("./react-admin/portifolio/list"))
const PortifolioEdit = dynamic(() => import("./react-admin/portifolio/edit"))

const TypographyThemeCreate = dynamic(() => import("./react-admin/typography_theme/create"))
const TypographyThemeList = dynamic(() => import("./react-admin/typography_theme/list"))
const TypographyThemeEdit = dynamic(() => import("./react-admin/typography_theme/edit"))

const ColorThemeCreate = dynamic(() => import("./react-admin/color_theme/create"))
const ColorThemeList = dynamic(() => import("./react-admin/color_theme/list"))
const ColorThemeEdit = dynamic(() => import("./react-admin/color_theme/edit"))

const SpacingThemeCreate = dynamic(() => import("./react-admin/spacing_theme/create"))
const SpacingThemeList = dynamic(() => import("./react-admin/spacing_theme/list"))
const SpacingThemeEdit = dynamic(() => import("./react-admin/spacing_theme/edit"))


const AdminApp: React.FC = () => {
	const messages: any = {
		'pt-br': ptBrMessages,
	}
	const lightTheme = defaultTheme;
	const darkTheme = defaultDarkTheme;
	const i18nProvider = polyglotI18nProvider(locale => messages[locale], 'pt-br', { allowMissing: true })

	return (
		<Admin basename='/admin' dataProvider={dataProvider} loginPage={LoginPage} authProvider={authProvider} i18nProvider={i18nProvider} lightTheme={lightTheme} darkTheme={darkTheme}>

			<Resource name="portfolio" list={PortifolioList} edit={PortifolioEdit} create={PortifolioCreate} recordRepresentation="title" />
			<Resource name="work" list={WorkList} edit={WorkEdit} create={WorkCreate} recordRepresentation="title" />
			<Resource name="typography_theme" list={TypographyThemeList} edit={TypographyThemeEdit} create={TypographyThemeCreate} recordRepresentation="title" />
			<Resource name="color_theme" list={ColorThemeList} edit={ColorThemeEdit} create={ColorThemeCreate} recordRepresentation="title" />
			<Resource name="spacing_theme" list={SpacingThemeList} edit={SpacingThemeEdit} create={SpacingThemeCreate} recordRepresentation="title" />
		</Admin>
	)
}

export default AdminApp