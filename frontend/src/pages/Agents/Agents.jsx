import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineUpload } from "react-icons/ai"; // Importing icons
import { FaUserPlus, FaEye, FaTrash } from "react-icons/fa"; // Icons for listing actions
import "./Agents.css";

const Agents = () => {
	const [isFormVisible, setIsFormVisible] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const agentsPerPage = 5;

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
			id: "#34568",
			name: "Sanjeev",
			number: "+91 9876345698",
			email: "Demo@gmail.com",
			experience: "2 year Exp",
			gender: "male",
			age: 25,
		},
		{
			id: "#34569",
			name: "Kalia",
			number: "+91 7234345698",
			email: "Demo@gmail.com",
			experience: "Fresher",
			gender: "male",
			age: 21,
		},
		{
			id: "#34570",
			name: "Kolina",
			number: "+91 6234345698",
			email: "Demo@gmail.com",
			experience: "6+ year Exp",
			gender: "female",
			age: 27,
		},
		{
			id: "#34571",
			name: "Sumit",
			number: "+91 9876345698",
			email: "Demo@gmail.com",
			experience: "6+ year Exp",
			gender: "male",
			age: 27,
		},
		{
			id: "#34572",
			name: "Ravi",
			number: "+91 9234345699",
			email: "Demo2@gmail.com",
			experience: "3 year Exp",
			gender: "male",
			age: 23,
		},
		{
			id: "#34573",
			name: "Neha",
			number: "+91 9876345600",
			email: "Demo3@gmail.com",
			experience: "2 year Exp",
			gender: "female",
			age: 26,
		},
		{
			id: "#34574",
			name: "Raj",
			number: "+91 9876345678",
			email: "Demo4@gmail.com",
			experience: "4 year Exp",
			gender: "male",
			age: 28,
		},
		{
			id: "#34575",
			name: "Pooja",
			number: "+91 9876345679",
			email: "Demo5@gmail.com",
			experience: "5 year Exp",
			gender: "female",
			age: 24,
		},
		{
			id: "#34576",
			name: "Amit",
			number: "+91 9876345680",
			email: "Demo6@gmail.com",
			experience: "6+ year Exp",
			gender: "male",
			age: 29,
		},
	];

	// Calculate the displayed agents for the current page
	const indexOfLastAgent = currentPage * agentsPerPage;
	const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
	const currentAgents = agentsData.slice(indexOfFirstAgent, indexOfLastAgent);

	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	// Generate pagination numbers
	const totalPages = Math.ceil(agentsData.length / agentsPerPage);

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
									{currentAgents.map((agent, index) => (
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
							{/* Pagination */}
							<nav className="mt-3">
								<ul className="pagination justify-content-center">
									{[...Array(totalPages)].map((_, index) => (
										<li
											key={index}
											className={`page-item ${
												currentPage === index + 1 ? "active" : ""
											}`}
										>
											<button
												className="page-link"
												onClick={() => paginate(index + 1)}
											>
												{index + 1}
											</button>
										</li>
									))}
								</ul>
							</nav>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Agents;
