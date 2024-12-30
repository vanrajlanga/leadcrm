import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Leads from "../pages/Leads/Leads";

const AppRoutes = () => {
	const isAuthenticated = !!localStorage.getItem("token"); // Check if user is logged in

	return (
		<Router>
			<Routes>
				{/* Authentication Routes */}
				{!isAuthenticated && (
					<Route
						path="/"
						element={
							<AuthLayout>
								<Login />
							</AuthLayout>
						}
					/>
				)}

				{/* Protected Routes */}
				{isAuthenticated && (
					<Route
						path="/dashboard"
						element={
							<MainLayout>
								<Dashboard />
							</MainLayout>
						}
					/>
				)}
				{isAuthenticated && (
					<Route
						path="/leads"
						element={
							<MainLayout>
								<Leads />
							</MainLayout>
						}
					/>
				)}

				{/* Redirect for unmatched routes */}
				<Route
					path="*"
					element={
						isAuthenticated ? (
							<MainLayout>
								<Dashboard />
							</MainLayout>
						) : (
							<AuthLayout>
								<Login />
							</AuthLayout>
						)
					}
				/>
			</Routes>
		</Router>
	);
};

export default AppRoutes;
