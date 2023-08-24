"use client"
import * as React from "react";
import { Admin, CustomRoutes, Resource, ListGuesser, EditGuesser } from 'react-admin';
import { dataProvider } from '@/utils/dataProvider';
import { authProvider } from "@/utils/authProvider";
import { LoginPage, SetPasswordPage, ForgotPasswordPage } from 'ra-supabase';
import { BrowserRouter, Route } from 'react-router-dom';

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
			<Resource name="portfolio" list={ListGuesser} edit={EditGuesser} recordRepresentation="title" />
			<Resource name="work" list={ListGuesser} edit={EditGuesser} recordRepresentation="title" />
		</Admin>
	</BrowserRouter>
);

export default AdminApp;