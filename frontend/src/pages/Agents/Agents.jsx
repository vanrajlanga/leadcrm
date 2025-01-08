import React, { useState } from "react";
import axios from "axios";
import { AiOutlineArrowLeft, AiOutlineUpload } from "react-icons/ai"; // Importing icons
import { FaUserPlus, FaEye, FaTrash } from "react-icons/fa"; // Icons for listing actions
import "./Agents.css";

const API_URL = import.meta.env.VITE_API_URL;

const Agents = () => {
	const [isFormVisible, setIsFormVisible] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		gender: "",
		dob: "",
		email: "",
		phone: "",
		address: "",
		aadharCard: null,
		panCard: null,
		bankPassbook: null,
		bankName: "",
		branchName: "",
		name: "",
		accountNumber: "",
		reEnterAccountNumber: "",
		ifscCode: "",
		bankAddress: "",
	});

	const agentsPerPage = 5;

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
		// Add more agents here...
	];

	const indexOfLastAgent = currentPage * agentsPerPage;
	const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
	const currentAgents = agentsData.slice(indexOfFirstAgent, indexOfLastAgent);
	const totalPages = Math.ceil(agentsData.length / agentsPerPage);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		setFormData({ ...formData, [id]: value });
	};

	const handleFileChange = (e, key) => {
		setFormData({ ...formData, [key]: e.target.files[0] });
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		if (formData.accountNumber !== formData.reEnterAccountNumber) {
			toast.error("Account numbers do not match!");
			return;
		}

		const formDataToSend = new FormData();
		Object.keys(formData).forEach((key) => {
			formDataToSend.append(key, formData[key]);
		});

		try {
			const token = localStorage.getItem("token");
			const response = await axios.post(
				`${API_URL}/create-agents`,
				formDataToSend,
				{
					headers: { "Content-Type": "multipart/form-data" },
					Authorization: `Bearer ${token}`,
				}
			);
			toast.success("Agent added successfully!");
			console.log("Response:", response.data);

			setFormData({
				firstName: "",
				lastName: "",
				gender: "",
				dob: "",
				email: "",
				phone: "",
				address: "",
				aadharCard: null,
				panCard: null,
				bankPassbook: null,
				bankName: "",
				branchName: "",
				name: "",
				accountNumber: "",
				reEnterAccountNumber: "",
				ifscCode: "",
				bankAddress: "",
			});

			setIsFormVisible(false);
		} catch (error) {
			toast.error(
				error.response?.data?.message ||
					"Failed to add agent. Please try again!"
			);
		}
	};

	return (
		<div className="agents-container">
			{isFormVisible ? (
				<>
					<div className="d-flex align-items-center mb-4">
						<button
							className="btn btn-outline-secondary back-btn me-2"
							onClick={() => setIsFormVisible(false)}
						>
							<AiOutlineArrowLeft />
						</button>
						<h3 className="title">Add Agent Details</h3>
					</div>

					{/* Form Content */}
					<form onSubmit={handleFormSubmit}>
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
											value={formData.firstName}
											onChange={handleInputChange}
										/>
									</div>
									<div className="col-lg-4 col-md-6">
										<label htmlFor="lastName" className="form-label">
											Last Name
										</label>
										<input
											type="text"
											className="form-control"
											id="lastName"
											value={formData.lastName}
											onChange={handleInputChange}
										/>
									</div>
									<div className="col-lg-4 col-md-6">
										<label htmlFor="gender" className="form-label">
											Gender
										</label>
										<input
											type="text"
											className="form-control"
											id="gender"
											value={formData.gender}
											onChange={handleInputChange}
										/>
									</div>
									<div className="col-lg-4 col-md-6">
										<label htmlFor="dob" className="form-label">
											Date of Birth
										</label>
										<input
											type="date"
											className="form-control"
											id="dob"
											value={formData.dob}
											onChange={handleInputChange}
										/>
									</div>
									<div className="col-lg-4 col-md-6">
										<label htmlFor="email" className="form-label">
											Email Id
										</label>
										<input
											type="email"
											className="form-control"
											id="email"
											value={formData.email}
											onChange={handleInputChange}
										/>
									</div>
									<div className="col-lg-4 col-md-6">
										<label htmlFor="phone" className="form-label">
											Phone no
										</label>
										<div className="input-group">
											<span className="input-group-text">+91</span>
											<input
												type="tel"
												className="form-control"
												id="phone"
												value={formData.phone}
												onChange={handleInputChange}
											/>
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
											value={formData.address}
											onChange={handleInputChange}
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
											<input
												type="file"
												className="form-control"
												onChange={(e) => handleFileChange(e, "aadharCard")}
											/>
										</div>
									</div>
									<div className="col-md-4">
										<div className="document-card">
											<p className="document-name">Pan Card</p>
											<input
												type="file"
												className="form-control"
												onChange={(e) => handleFileChange(e, "panCard")}
											/>
										</div>
									</div>
									<div className="col-md-4">
										<div className="document-card">
											<p className="document-name">Bank Pass Book</p>
											<input
												type="file"
												className="form-control"
												onChange={(e) => handleFileChange(e, "bankPassbook")}
											/>
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
										<input
											type="text"
											className="form-control"
											id="bankName"
											value={formData.bankName}
											onChange={handleInputChange}
										/>
									</div>
									<div className="col-md-4">
										<label htmlFor="branchName" className="form-label">
											Branch Name
										</label>
										<input
											type="text"
											className="form-control"
											id="branchName"
											value={formData.branchName}
											onChange={handleInputChange}
										/>
									</div>
									<div className="col-md-4">
										<label htmlFor="name" className="form-label">
											Name
										</label>
										<input
											type="text"
											className="form-control"
											id="name"
											value={formData.name}
											onChange={handleInputChange}
										/>
									</div>
									<div className="col-md-4">
										<label htmlFor="accountNumber" className="form-label">
											Account Number
										</label>
										<input
											type="text"
											className="form-control"
											id="accountNumber"
											value={formData.accountNumber}
											onChange={handleInputChange}
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
											value={formData.reEnterAccountNumber}
											onChange={handleInputChange}
										/>
									</div>
									<div className="col-md-4">
										<label htmlFor="ifscCode" className="form-label">
											IFSC CODE
										</label>
										<input
											type="text"
											className="form-control"
											id="ifscCode"
											value={formData.ifscCode}
											onChange={handleInputChange}
										/>
									</div>
									<div className="col-12">
										<label htmlFor="bankAddress" className="form-label">
											Bank Address
										</label>
										<textarea
											className="form-control"
											id="bankAddress"
											rows="3"
											value={formData.bankAddress}
											onChange={handleInputChange}
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
							<nav className="pagination-container mt-3">
								<ul className="pagination justify-content-center">
									<li
										className={`page-item ${
											currentPage === 1 ? "disabled" : ""
										}`}
									>
										<button
											className="page-link custom-pagination-arrow"
											onClick={() => handlePageChange(currentPage - 1)}
										>
											&lsaquo;
										</button>
									</li>
									{Array.from({ length: totalPages }, (_, index) => (
										<li
											className={`page-item custom-pagination-item ${
												currentPage === index + 1 ? "active" : ""
											}`}
											key={index + 1}
										>
											<button
												className="page-link custom-pagination-link"
												onClick={() => handlePageChange(index + 1)}
											>
												{index + 1}
											</button>
										</li>
									))}
									<li
										className={`page-item ${
											currentPage === totalPages ? "disabled" : ""
										}`}
									>
										<button
											className="page-link custom-pagination-arrow"
											onClick={() => handlePageChange(currentPage + 1)}
										>
											&rsaquo;
										</button>
									</li>
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
