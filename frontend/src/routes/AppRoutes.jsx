import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";
import MainLayout from "../layouts/MainLayout";
import { hasRole } from "../utils/auth";

const ProtectedRoute = ({ children, requiredRoles }) => {
	const token = localStorage.getItem("token");

	if (!token) {
		// Redirect to /login if no token
		return <Navigate to="/login" replace />;
	}

	const roles = JSON.parse(localStorage.getItem("roles")) || [];
	if (requiredRoles && !roles.some((role) => requiredRoles.includes(role))) {
		// Redirect to /login if roles don't match
		return <Navigate to="/login" replace />;
	}

	return children;
};

const AppRoutes = () => {
	const token = localStorage.getItem("token");

	return (
		<Router>
			<Routes>
				{/* Root Route: Redirect to /login or /dashboard */}
				<Route
					path="/"
					element={
						token ? (
							<Navigate to="/dashboard" replace />
						) : (
							<Navigate to="/login" replace />
						)
					}
				/>

				{/* Auth Route */}
				<Route
					path="/login"
					element={token ? <Navigate to="/dashboard" replace /> : <LoginPage />}
				/>

				{/* Protected Routes */}
				<Route element={<MainLayout />}>
					<Route
						path="/dashboard"
						element={
							<ProtectedRoute requiredRoles={["Admin", "Super Admin"]}>
								<DashboardPage />
							</ProtectedRoute>
						}
					/>
				</Route>

				{/* Catch-All Route */}
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</Router>
	);
};

export default AppRoutes;
