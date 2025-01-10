import React from "react";
import { FaUserPlus, FaTrash, FaEdit, FaEye } from "react-icons/fa";

const AgentsList = ({
	agents,
	currentPage,
	totalPages,
	handlePageChange,
	handleEditAgent,
	handleDeleteAgent,
	setIsFormVisible,
}) => {
	const agentsPerPage = 5;
	const indexOfLastAgent = currentPage * agentsPerPage;
	const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
	const currentAgents = agents.slice(indexOfFirstAgent, indexOfLastAgent);

	return (
		<>
			<div className="d-flex justify-content-between align-items-center mb-4">
				<h3 className="title">Agents Listing</h3>
				<button className="btn btn-dark" onClick={() => setIsFormVisible(true)}>
					<FaUserPlus className="me-2" /> Add Agents
				</button>
			</div>

			<div className="card">
				{agents ? JSON.stringify(agents) : "No agents available"}
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
							{currentAgents.map((agent) => (
								<tr key={agent.id}>
									<td>{agent.id}</td>
									<td>{agent.user.name}</td>
									<td>{agent.phone}</td>
									<td>{agent.email}</td>
									<td>{agent.experience}</td>
									<td>{agent.gender}</td>
									<td>{agent.age}</td>
									<td>
										<button
											className="btn btn-dark btn-sm me-2"
											onClick={() => handleEditAgent(agent.id)}
										>
											<FaEdit />
										</button>
										<button
											className="btn btn-danger btn-sm"
											onClick={() => handleDeleteAgent(agent.id)}
										>
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
								className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
							>
								<button
									className="page-link custom-pagination-arrow"
									onClick={() => handlePageChange(currentPage - 1)}
									disabled={currentPage === 1}
								>
									&lsaquo;
								</button>
							</li>
							{Array.from({ length: totalPages }, (_, index) => (
								<li
									key={index}
									className={`page-item custom-pagination-item ${
										currentPage === index + 1 ? "active" : ""
									}`}
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
									disabled={currentPage === totalPages}
								>
									&rsaquo;
								</button>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</>
	);
};

export default AgentsList;
