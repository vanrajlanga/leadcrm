import React, { useEffect, useState } from "react";
import "./Header.css";

const Header = ({ userName, onLogout }) => {
	const [userRole, setUserRole] = useState("");

	useEffect(() => {
		// Retrieve roles from localStorage dynamically
		const roles = JSON.parse(localStorage.getItem("roles"));
		if (roles && roles.length > 0) {
			setUserRole(roles[0]); // Assuming the first role is the primary one
		}
	}, []);

	return (
		<header className="header">
			<div className="header-left">
				<div className="logo">LOGO</div>
				<input
					type="text"
					className="search-bar"
					placeholder="Search here..."
				/>
			</div>
			<div className="header-right">
				<span className="user-role">Login As: {userRole || "User"}</span>
				<button className="logout-btn" onClick={onLogout}>
					Logout
				</button>
			</div>
		</header>
	);
};

export default Header;
