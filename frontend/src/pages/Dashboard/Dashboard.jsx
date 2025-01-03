import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Card Container */}
      <div className="card-container">
        <div className="card">
          <div className="card-content">
            <div className="card-title">Overall Revenue</div>
            <div className="card-value">$80,000</div>
          </div>
          <div className="card-graph">
            {/* Placeholder for the graph */}
            <img src="/path-to-your-graph-image.png" alt="Graph" />
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="card-title">Total Leads This Month</div>
            <div className="card-value">10,000</div>
          </div>
          <div className="card-graph">
            {/* Placeholder for the graph */}
            <img src="/path-to-your-graph-image.png" alt="Graph" />
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="card-title">Total Converted This Month</div>
            <div className="card-value">9,000</div>
          </div>
          <div className="card-graph">
            {/* Placeholder for the graph */}
            <img src="/path-to-your-graph-image.png" alt="Graph" />
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="card-title">Total Rejected This Month</div>
            <div className="card-value">100</div>
          </div>
          <div className="card-graph">
            {/* Placeholder for the graph */}
            <img src="/path-to-your-graph-image.png" alt="Graph" />
          </div>
        </div>
      </div>
	  {/* New Section: Revenue Updates and Recent Sales */}
      <div className="revenue-sales-container">
			<div className="card large-card">
				<div className="card-header">
					<div className="card-title">Revenue Updates</div>
					<select className="dropdown">
					<option value="year">Year</option>
					<option value="month">Month</option>
					<option value="day">Day</option>
					</select>
				</div>
				<div className="card-graph">
					{/* Placeholder for the graph */}
					<img src="/path-to-your-revenue-graph.png" alt="Revenue Graph" />
				</div>
			</div>


			<div className="card small-card">
				<div className="card-header">
				<div className="card-title">Recent Sales</div>
				<button className="see-all-btn">See All</button> {/* "See All" Button */}
				</div>
			<div className="recent-sales-list">
				<ul>
				<li className="sale-item">
					<div className="sale-left">
					<img
						className="profile-pic"
						src="/path-to-profile-pic.png"
						alt="Profile"
					/>
					<div className="sale-details">
						<div className="name">Mr. Alenex Maruns</div>
						<div className="agent">Agent: Kalim</div>
					</div>
					</div>
					<div className="sale-right">
					<div className="amount">$50,000</div>
					</div>
				</li>
				<li className="sale-item">
					<div className="sale-left">
					<img
						className="profile-pic"
						src="/path-to-profile-pic.png"
						alt="Profile"
					/>
					<div className="sale-details">
						<div className="name">Mr. Alenex Maruns</div>
						<div className="agent">Agent: Kalim</div>
					</div>
					</div>
					<div className="sale-right">
					<div className="amount">$40,000</div>
					</div>
				</li>
				<li className="sale-item">
					<div className="sale-left">
					<img
						className="profile-pic"
						src="/path-to-profile-pic.png"
						alt="Profile"
					/>
					<div className="sale-details">
						<div className="name">Mr. Alenex Maruns</div>
						<div className="agent">Agent: Kalim</div>
					</div>
					</div>
					<div className="sale-right">
					<div className="amount">$35,000</div>
					</div>
				</li>
				<li className="sale-item">
					<div className="sale-left">
					<img
						className="profile-pic"
						src="/path-to-profile-pic.png"
						alt="Profile"
					/>
					<div className="sale-details">
						<div className="name">Mr. Alenex Maruns</div>
						<div className="agent">Agent: Kalim</div>
					</div>
					</div>
					<div className="sale-right">
					<div className="amount">$30,000</div>
					</div>
				</li>
				<li className="sale-item">
					<div className="sale-left">
					<img
						className="profile-pic"
						src="/path-to-profile-pic.png"
						alt="Profile"
					/>
					<div className="sale-details">
						<div className="name">Mr. Alenex Maruns</div>
						<div className="agent">Agent: Kalim</div>
					</div>
					</div>
					<div className="sale-right">
					<div className="amount">$30,000</div>
					</div>
				</li>
				</ul>
			</div>
			</div>

      </div>

	  <div className="client-data-card">
  <div className="client-data-table">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Client Name</th>
          <th>Client Number</th>
          <th>Client Email</th>
          <th>Category</th>
          <th>Reference By</th>
          <th>Agent</th>
          <th>C.P</th>
          <th>S.P</th>
          <th>Follow Up</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>#34567</td>
          <td>Sanjeev</td>
          <td>+91 9876345698</td>
          <td>Demo@gmail.com</td>
          <td>Air Pump</td>
          <td>Kalia</td>
          <td>Rathore</td>
          <td>₹2100</td>
          <td>—</td>
          <td>5-12-2024 | Mon</td>
        </tr>
        <tr>
          <td>#34567</td>
          <td>Rathore</td>
          <td>+91 6234567898</td>
          <td>Demo@gmail.com</td>
          <td>Air Pump</td>
          <td>Kalia</td>
          <td>Rathore</td>
          <td>₹2100</td>
          <td>—</td>
          <td>8-12-2024 | Wed</td>
        </tr>
		<tr>
          <td>#34567</td>
          <td>Rathore</td>
          <td>+91 6234567898</td>
          <td>Demo@gmail.com</td>
          <td>Air Pump</td>
          <td>Kalia</td>
          <td>Rathore</td>
          <td>₹2100</td>
          <td>—</td>
          <td>8-12-2024 | Wed</td>
        </tr>
		<tr>
          <td>#34567</td>
          <td>Rathore</td>
          <td>+91 6234567898</td>
          <td>Demo@gmail.com</td>
          <td>Air Pump</td>
          <td>Kalia</td>
          <td>Rathore</td>
          <td>₹2100</td>
          <td>—</td>
          <td>8-12-2024 | Wed</td>
        </tr>
		<tr>
          <td>#34567</td>
          <td>Rathore</td>
          <td>+91 6234567898</td>
          <td>Demo@gmail.com</td>
          <td>Air Pump</td>
          <td>Kalia</td>
          <td>Rathore</td>
          <td>₹2100</td>
          <td>—</td>
          <td>8-12-2024 | Wed</td>
        </tr>
        {/* Add more rows as needed */}
      </tbody>
    </table>
  </div>
</div>


    </div>
  );
};

export default Dashboard;
