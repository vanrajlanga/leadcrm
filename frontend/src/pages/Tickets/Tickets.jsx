import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Tickets.css";
import { FaUserPlus, FaTrash, FaEdit, FaEye } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";
import ShowTicket from "../../components/Tickets/ShowTicket";


const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

const Tickets = () => {
	const [Tickets, setTickets] = useState([]);
	const [ticketModal, setTicketModal] = useState(false);
	const [ticketDetails, setTicketDetails] = useState([]);

	useEffect(() => {
		fetchTickets();
	}, []);

	const fetchTickets = async () => {
		try {
			const response = await axios.post(
				`${API_URL}/get-tickets`,
				{},
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			setTickets(response.data);
		} catch (error) {
			console.log("Error fetching quotations: ", error);
			toast.error("Failed to load quotations!");
		}
	};

	const showTicketDetails = async (ticketId) => {
		const response = await axios.post(
			`${API_URL}/get-ticket-details`,
			{ticketId: ticketId},
			{ headers: { Authorization: `Bearer ${token}` } }
		);

		setTicketDetails(response.data);
		setTicketModal(true);
	};

	const refreshTickets = async () => {
		fetchTickets();
	};
	
	return (
		<div className="tickets-container">
			<div className="d-flex justify-content-between align-items-center mb-4">
				<h3 className="title">Tickets History</h3>
			</div>

			<div className="card">
				<div className="card-body table-responsive">
					<table className="table table-hover">
						<thead>
							<tr>
								<th>ID</th>
								<th>C Name</th>
								<th>C Number</th>
								<th>C Email</th>
								<th>Category</th>
								<th>Reference By</th>
								<th>Date</th>
								<th>T.Status</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{Tickets.map((ticket) => (
								<tr key={ticket.id}>
									<td>#{ticket.id}</td>
									<td>{ticket.lead.name}</td>
									<td>{ticket.lead.phone}</td>
									<td>{ticket.lead.email}</td>
									<td>{ticket.lead.parts}</td>
									<td>{ticket.agent}</td>
									<td>{ticket.createdAt}</td>
									<td>{ticket.status}</td>
									<td>
										<button
											className="btn btn-dark btn-sm me-2"
											onClick={() => showTicketDetails(ticket.id)}
										>
											<FaEye />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					{ticketModal && (
						<ShowTicket
							closeModal={() => setTicketModal(false)}
							ticketDetails={ticketDetails}
							refreshTickets={() => refreshTickets()}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Tickets;