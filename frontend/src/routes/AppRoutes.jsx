import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Leads from "../pages/Leads/Leads";
import Agents from "../pages/Agents/Agents";
import Quotations from "../pages/Quotations/Quotations";
import Tickets from "../pages/Tickets/Tickets";
import Payment from "../pages/Payment/Payment";

const AppRoutes = () => {
	const isAuthenticated = !!localStorage.getItem("token"); // Check if user is logged in

	return (
		<Router>
			<Routes>
				<Route path="/pay/:payment_token" element={<Payment />} />
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

				{isAuthenticated && (
					<Route
						path="/add-agents"
						element={
							<MainLayout>
								<Agents />
							</MainLayout>
						}
					/>
				)}

				{isAuthenticated && (
					<Route
						path="/quotations-history"
						element={
							<MainLayout>
								<Quotations />
							</MainLayout>
						}
					/>
				)}

				{isAuthenticated && (
					<Route
						path="/ticket-history"
						element={
							<MainLayout>
								<Tickets />
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
