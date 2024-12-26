import React from "react";
import "./SecondaryHeader.css";
import { Link } from "react-router-dom";
const SecondaryHeader = ({ user, onLogout }) => {
	return (
		<>
			{/* Secondary Navigation */}
			<div className="secondary-nav">
				{/* Left Section: Navigation Items */}
				<div className="secondary-nav-list-wrapper">
					<ul className="secondary-nav-list">
						<li>
							<button className="active-nav-button">My Dashboard</button>
						</li>
						<li>
							<Link to="/leads" className="secondary-nav-link">
								Leads
							</Link>
						</li>
						<li>
							<Link to="/add-agents" className="secondary-nav-link">
								Add Agents
							</Link>
						</li>
						<li>
							<Link to="/quotations-history" className="secondary-nav-link">
								Quotations History
							</Link>
						</li>
						<li>
							<Link to="/ticket-history" className="secondary-nav-link">
								Ticket History
							</Link>
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
		</>
	);
};

export default SecondaryHeader;
