"use client"
import { PortifolioCreate, PortifolioEdit, PortifolioList, PortifolioShow } from '@/components/react-admin/portifolio';
import { authProvider } from "@/utils/authProvider";
import { dataProvider } from '@/utils/dataProvider';
import { ForgotPasswordPage, LoginPage, SetPasswordPage } from 'ra-supabase';
import { Admin, CustomRoutes, Resource } from 'react-admin';
import { BrowserRouter, Route } from 'react-router-dom';
import { WorkCreate, WorkEdit, WorkList, WorkShow } from "./react-admin/work";

const AdminApp = () => (

	<BrowserRouter>

		<Admin dataProvider={dataProvider} loginPage={LoginPage} authProvider={authProvider}
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
			<Resource name="portfolio" list={PortifolioList} edit={PortifolioEdit} show={PortifolioShow} create={PortifolioCreate} recordRepresentation="title" />
			<Resource name="work" list={WorkList} edit={WorkEdit} show={WorkShow} create={WorkCreate} recordRepresentation="title" />
		</Admin>
	</BrowserRouter>

);

export default AdminApp;