// LeadsTracker.js
import React from "react";
import "./LeadsTracker.css";

const LeadsTracker = () => {
	return (
		<div className="container-fluid leads-tracker-container">
			<div className="row">
				<div className="col-12">
					<h5 className="tracker-title">Leads Tracker</h5>
				</div>
			</div>
			<div className="row">
				<div className="col-md-8">
					<div className="message-box">
						<div className="message">
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Voluptatibus, corporis. Eius, hic fugiat! Natus fuga cumque
								soluta sapiente voluptate est magnam fugiat laborum dolorem
								animi earum consectetur, voluptatum id mollitia.
							</p>
							<span className="timestamp">30-11-24 | 13:32</span>
						</div>
						<div className="message-input">
							<input
								type="text"
								className="form-control"
								placeholder="Enter Here..."
							/>
							<button className="btn btn-primary send-btn">
								<i className="bi bi-arrow-up"></i>
							</button>
						</div>
					</div>
				</div>
				<div className="col-md-4">
					<div className="info-card">
						<div className="profile">
							<img
								src="https://via.placeholder.com/100"
								alt="profile"
								className="profile-img"
							/>
							<h6 className="profile-name">Rathore</h6>
							<button className="btn btn-warning follow-up-btn">
								Follow Up
							</button>
						</div>
						<div className="personal-info">
							<p>
								<strong>C Id:</strong> #34567
							</p>
							<p>
								<strong>C Name:</strong> Rathore
							</p>
							<p>
								<strong>Email:</strong> Sanjeevpat@gmail.com
							</p>
							<p>
								<strong>Contact us:</strong> +91 7487342323
							</p>
							<p>
								<strong>Reference By:</strong> Sumit
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LeadsTracker;
