import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineUpload } from "react-icons/ai"; // Importing icons
import { FaUserPlus, FaEye, FaTrash } from "react-icons/fa"; // Icons for listing actions
import "./Agents.css";

const Agents = () => {
	const [isFormVisible, setIsFormVisible] = useState(false);

	// Dummy data for listing
	const agentsData = [
		{
			id: "#34567",
			name: "Rathore",
			number: "+91 9234345698",
			email: "Demo@gmail.com",
			experience: "Fresher",
			gender: "male",
			age: 20,
		},
		{
			id: "#34567",
			name: "Sanjeev",
			number: "+91 9876345698",
			email: "Demo@gmail.com",
			experience: "2 year Exp",
			gender: "male",
			age: 25,
		},
		{
			id: "#34567",
			name: "Kalia",
			number: "+91 7234345698",
			email: "Demo@gmail.com",
			experience: "Fresher",
			gender: "male",
			age: 21,
		},
		{
			id: "#34567",
			name: "Kolina",
			number: "+91 6234345698",
			email: "Demo@gmail.com",
			experience: "6+ year Exp",
			gender: "Female",
			age: 27,
		},
		{
			id: "#34567",
			name: "Sumit",
			number: "+91 9876345698",
			email: "Demo@gmail.com",
			experience: "6+ year Exp",
			gender: "male",
			age: 27,
		},
	];

	return (
		<div className="agents-container">
			{isFormVisible ? (
				// Form View
				<>
					<div className="d-flex align-items-center mb-4">
						<button
							className="btn btn-outline-secondary back-btn me-2"
							onClick={() => setIsFormVisible(false)}
						>
							<AiOutlineArrowLeft /> {/* Back Arrow Icon */}
						</button>
						<h3 className="title">Add Agent Details</h3>
					</div>

					<form>
						{/* Add Agent Details Section */}
						<div className="card mb-4">
							<div className="card-body">
								<h3 className="section-title">Agent Details</h3>
								<div className="row g-3">
									<div className="col-lg-4 col-md-6">
										<label htmlFor="firstName" className="form-label">
											First Name
										</label>
										<input
											type="text"
											className="form-control"
											id="firstName"
										/>
									</div>
									<div className="col-lg-4 col-md-6">
										<label htmlFor="lastName" className="form-label">
											Last Name
										</label>
										<input type="text" className="form-control" id="lastName" />
									</div>
									<div className="col-lg-4 col-md-6">
										<label htmlFor="gender" className="form-label">
											Gender
										</label>
										<input type="text" className="form-control" id="gender" />
									</div>
									<div className="col-lg-4 col-md-6">
										<label htmlFor="dob" className="form-label">
											Date of Birth
										</label>
										<input type="date" className="form-control" id="dob" />
									</div>
									<div className="col-lg-4 col-md-6">
										<label htmlFor="email" className="form-label">
											Email Id
										</label>
										<input type="email" className="form-control" id="email" />
									</div>
									<div className="col-lg-4 col-md-6">
										<label htmlFor="phone" className="form-label">
											Phone no
										</label>
										<div className="input-group">
											<span className="input-group-text">+91</span>
											<input type="tel" className="form-control" id="phone" />
										</div>
									</div>
									<div className="col-12">
										<label htmlFor="address" className="form-label">
											Address
										</label>
										<textarea
											className="form-control"
											id="address"
											rows="3"
										></textarea>
									</div>
								</div>
							</div>
						</div>

						{/* Add Document Details Section */}
						<div className="card mb-4">
							<div className="card-body">
								<h3 className="section-title">Document Details</h3>
								<div className="row g-3">
									<div className="col-md-4">
										<div className="document-card">
											<p className="document-name">Aadhar Card</p>
											<button className="btn attach-btn">
												Attach Here <AiOutlineUpload />
											</button>
										</div>
									</div>
									<div className="col-md-4">
										<div className="document-card">
											<p className="document-name">Pan Card</p>
											<button className="btn attach-btn">
												Attach Here <AiOutlineUpload />
											</button>
										</div>
									</div>
									<div className="col-md-4">
										<div className="document-card">
											<p className="document-name">Bank Pass Book</p>
											<button className="btn attach-btn">
												Attach Here <AiOutlineUpload />
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Add Account Details Section */}
						<div className="card mb-4">
							<div className="card-body">
								<h3 className="section-title">Account Details</h3>
								<div className="row g-3">
									<div className="col-md-4">
										<label htmlFor="bankName" className="form-label">
											Bank Name
										</label>
										<input type="text" className="form-control" id="bankName" />
									</div>
									<div className="col-md-4">
										<label htmlFor="branchName" className="form-label">
											Branch Name
										</label>
										<input
											type="text"
											className="form-control"
											id="branchName"
										/>
									</div>
									<div className="col-md-4">
										<label htmlFor="name" className="form-label">
											Name
										</label>
										<input type="text" className="form-control" id="name" />
									</div>
									<div className="col-md-4">
										<label htmlFor="accountNumber" className="form-label">
											Account Number
										</label>
										<input
											type="text"
											className="form-control"
											id="accountNumber"
										/>
									</div>
									<div className="col-md-4">
										<label
											htmlFor="reEnterAccountNumber"
											className="form-label"
										>
											Re-Enter Account Number
										</label>
										<input
											type="text"
											className="form-control"
											id="reEnterAccountNumber"
										/>
									</div>
									<div className="col-md-4">
										<label htmlFor="ifscCode" className="form-label">
											IFSC CODE
										</label>
										<input type="text" className="form-control" id="ifscCode" />
									</div>
									<div className="col-12">
										<label htmlFor="bankAddress" className="form-label">
											Bank Address
										</label>
										<textarea
											className="form-control"
											id="bankAddress"
											rows="3"
										></textarea>
									</div>
								</div>
							</div>
						</div>

						{/* Submit Button */}
						<div className="text-end">
							<button type="submit" className="btn btn-dark">
								Submit
							</button>
						</div>
					</form>
				</>
			) : (
				// Listing View
				<>
					<div className="d-flex justify-content-between align-items-center mb-4">
						<h3 className="title">Agents Listing</h3>
						<button
							className="btn btn-dark"
							onClick={() => setIsFormVisible(true)}
						>
							<FaUserPlus className="me-2" /> Add Agents
						</button>
					</div>

					<div className="card">
						<div className="card-body table-responsive">
							<table className="table table-hover">
								<thead>
									<tr>
										<th>ID</th>
										<th>A Name</th>
										<th>A Number</th>
										<th>A Email</th>
										<th>Experience</th>
										<th>Gender</th>
										<th>Age</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{agentsData.map((agent, index) => (
										<tr key={index}>
											<td>{agent.id}</td>
											<td>{agent.name}</td>
											<td>{agent.number}</td>
											<td>{agent.email}</td>
											<td>{agent.experience}</td>
											<td>{agent.gender}</td>
											<td>{agent.age}</td>
											<td>
												<button className="btn btn-dark btn-sm me-2">
													<FaEye />
												</button>
												<button className="btn btn-danger btn-sm">
													<FaTrash />
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Agents;
