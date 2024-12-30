import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
	return (
		<div className="dashboard-container">
			<section className="stats-cards">
				<div className="card">
					Overall Revenue: <strong>$80,000</strong>
				</div>
				<div className="card">
					Total Lead This Month: <strong>10,000</strong>
				</div>
				<div className="card">
					Total Converted This Month: <strong>9,000</strong>
				</div>
				<div className="card">
					Total Rejected This Month: <strong>100</strong>
				</div>
			</section>

			<section className="chart-section">
				<h3>Revenue Updates</h3>
				<div>[Chart goes here]</div>
			</section>

			<section className="recent-sales">
				<h3>Recent Sales</h3>
				<ul>
					<li>Mr. Alenex Maruns - Agent: Kalim - $50,000</li>
					<li>Mr. Alenex Maruns - Agent: Kalim - $40,000</li>
				</ul>
			</section>
		</div>
	);
};

export default Dashboard;
