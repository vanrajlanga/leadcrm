import React from "react";
import Header from "./Header/Header";
import SecondaryHeader from "./SecondaryHeader/SecondaryHeader";
import Card from "./Card/Card";

const Dashboard = ({ user, onLogout }) => {
	return (
		<>
			<Header role={user.role} onLogout={onLogout} />
			<SecondaryHeader />
			{/* <h1>Welcome, {user.email}!</h1> */}
			<div className="card-container">
				<Card
					title="Overall Revenue"
					value="$80,000"
					graphImage="/path-to-your-graph-image.png"
				/>
				<Card
					title="Total Leads This Month"
					value="10,000"
					graphImage="/path-to-your-graph-image.png"
				/>
				<Card
					title="Total Converted This Month"
					value="9,000"
					graphImage="/path-to-your-graph-image.png"
				/>
				<Card
					title="Total Rejected This Month"
					value="100"
					graphImage="/path-to-your-graph-image.png"
				/>
			</div>
		</>
	);
};

export default Dashboard;
