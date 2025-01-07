import React from "react";
import { NavLink, useLocation } from 'react-router-dom'; // Import useLocation
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation(); // Get the current location

  // Function to render dropdowns based on the active route
  const renderDropdowns = () => {
    switch (location.pathname) {
      case '/dashboard':
        return (
          <div className="secondary-nav-date-wrapper">
            <select className="date-filter">
              <option value="this-month">This Month</option>
              <option value="last-month">Last Month</option>
              <option value="custom">Custom</option>
            </select>
          </div>
        );
      case '/leads':
        return (
          <div className="secondary-nav-date-wrapper">
            <div>
              <select className="id-filter" defaultValue="">
			  <option value="" disabled>ID</option>
                <option value="id1">ID1</option>
                <option value="id2">ID2</option>
                <option value="id3">ID3</option>
              </select>
            </div>
            <div>
			<select className="status-filter" defaultValue="">
                <option value="" disabled>Status:</option>
                <option value="follow-up">Follow Up</option>
                <option value="convert">Convert</option>
                <option value="reject">Reject</option>
              </select>
            </div>
          </div>
        );
      default:
        return null; // Return null if no specific dropdown is needed for other routes
    }
  };

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

      {/* Conditionally render the right section based on the active tab */}
      {renderDropdowns()}
    </div>
  );
};

export default Navbar;
