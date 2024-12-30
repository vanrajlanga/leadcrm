import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
	return (
		<nav className="navbar">
			<ul className="navbar-menu">
				<li>
					<NavLink
						to="/dashboard"
						className={({ isActive }) => (isActive ? "active-link" : "")}
					>
						My Dashboard
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/leads"
						className={({ isActive }) => (isActive ? "active-link" : "")}
					>
						Leads
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/add-agents"
						className={({ isActive }) => (isActive ? "active-link" : "")}
					>
						Add Agents
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/quotations"
						className={({ isActive }) => (isActive ? "active-link" : "")}
					>
						Quotations History
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/tickets"
						className={({ isActive }) => (isActive ? "active-link" : "")}
					>
						Ticket History
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
