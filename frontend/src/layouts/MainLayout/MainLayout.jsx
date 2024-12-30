import React from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import "./MainLayout.css";

const MainLayout = ({ children }) => {
	const handleLogout = () => {
		localStorage.clear();
		window.location.href = "/login";
	};

	const userName = localStorage.getItem("userName") || "User";
	const userRole = localStorage.getItem("roles") || "Guest";

	return (
		<div className="main-layout">
			<Header userName={userName} userRole={userRole} onLogout={handleLogout} />
			<Navbar />
			<div className="main-content">{children}</div>
		</div>
	);
};

export default MainLayout;
