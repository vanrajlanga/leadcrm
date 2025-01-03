import React from "react";
import { NavLink } from 'react-router-dom'; // Use NavLink instead of Link
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="secondary-nav">
      {/* Left Section: Navigation Items */}
      <div className="secondary-nav-list-wrapper">
        <ul className="secondary-nav-list">
		<li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active-nav-button" : "secondary-nav-link")}
            >
              My Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/leads"
              className={({ isActive }) => (isActive ? "active-nav-button" : "secondary-nav-link")}
            >
              Leads
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-agents"
              className={({ isActive }) => (isActive ? "active-nav-button" : "secondary-nav-link")}
            >
              Add Agents
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/quotations-history"
              className={({ isActive }) => (isActive ? "active-nav-button" : "secondary-nav-link")}
            >
              Quotations History
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ticket-history"
              className={({ isActive }) => (isActive ? "active-nav-button" : "secondary-nav-link")}
            >
              Ticket History
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Right Section: Date Filter */}
      <div className="secondary-nav-date-wrapper">
        <select className="date-filter">
          <option value="this-month">This Month</option>
          <option value="last-month">Last Month</option>
          <option value="custom">Custom</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;
