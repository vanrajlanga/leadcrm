import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { MdOutlinePhone, MdOutlineEmail } from "react-icons/md";
import { IoMdCalendar, IoIosMore } from "react-icons/io";
import "./LeadsList.css";
import AddQuotation from "../../components/Quotation/addQuotation";
import NewAgent from "../../components/Quotation/NewAgent";
import AddFollowup from "../../components/Leads/AddFollowup";
import Shipment from "../../components/Leads/Shipment";
import AddTicket from "../../components/Leads/AddTicket";
import axios from "axios";
import { PiUserSwitchBold } from "react-icons/pi";
import { toast } from "react-toastify";

const LeadsList = ({
	leads,
	vendors = [],
	onSaveCostPrice,
	onAddVendor,
	refreshLeads,
}) => {
	const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [newAgentModal, setNewAgentModal] = useState(false);
	const [followupModal, setFollowupModal] = useState(false);
	const [shipmentModal, setShipmentModal] = useState(false);
	const [ticketModal, setTicketModal] = useState(false);
	const [selectedLead, setSelectedLead] = useState(null);
	const [newVendor, setNewVendor] = useState(false);
	const [vendorData, setVendorData] = useState({
		name: "",
		phone: "",
		email: "",
		address: "",
	});
	const [actions, setActions] = useState([
		{ id: 1, name: "Reject" },
		{ id: 2, name: "Shipped" },
		{ id: 3, name: "Ticket Raised" },
	]);
	const [selectedVendorId, setSelectedVendorId] = useState(null);
	const [costPrice, setCostPrice] = useState("");

	const API_URL = import.meta.env.VITE_API_URL;
	const token = localStorage.getItem("token");

	// Open the modal to add cost price
	const openVendorModal = (lead) => {
		setSelectedLead(lead);
		setIsVendorModalOpen(true);
	};

	const openQuotationModal = (lead) => {
		if (lead.cost_price === null || lead.cost_price === "") {
			toast.error("Please add cost price first.");
			return;
		}
		setSelectedLead(lead);
		setOpenModal(true);
	};

	const openNewAgentModal = (lead) => {
		setSelectedLead(lead);
		setNewAgentModal(true);
	};

	const openFollowupModal = (lead) => {
		setSelectedLead(lead);
		setFollowupModal(true);
	};

	// Close the vendor modal
	const closeVendorModal = () => {
		setSelectedLead(null);
		setIsVendorModalOpen(false);
		setNewVendor(false);
		setVendorData({
			name: "",
			phone: "",
			email: "",
			address: "",
		});
		setSelectedVendorId(null);
		setCostPrice("");
	};

	// Handle adding a new vendor
	const handleAddVendor = () => {
		if (
			!vendorData.name ||
			!vendorData.phone ||
			!vendorData.email ||
			!vendorData.address
		) {
			alert("Please fill out all vendor details.");
			return;
		}
		onAddVendor(vendorData); // Save vendor
		setNewVendor(false);
		setSelectedVendorId(vendorData.name); // Simulate selecting the new vendor
		setVendorData({
			name: "",
			phone: "",
			email: "",
			address: "",
		});
	};

	// Save cost price
	const handleSaveCostPrice = async () => {
		if (!selectedVendorId || !costPrice) {
			alert("Please select a vendor and enter a cost price.");
			return;
		}
		try {
			await axios.post(
				`${API_URL}/update-lead`,
				{
					id: selectedLead.id,
					vendor_id: selectedVendorId,
					cost_price: costPrice,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			onSaveCostPrice(selectedLead.id, selectedVendorId, costPrice);
			closeVendorModal();
		} catch (error) {
			console.error("Error saving cost price:", error);
			alert("Failed to save cost price. Please try again.");
		}
	};

	// Trigger Acefone API to initiate a call
	const handleCall = async (lead) => {
		try {
			const response = await axios.post(
				`${API_URL}/click-to-call`,
				{
					lead_id: lead.id,
					agent_id: "050297960001", // Replace if necessary
					destination_number: 19706947211,
					caller_id: 15859029632, // Replace with your caller ID
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			if (response.data.success) {
				alert("Call successfully initiated.");
			} else {
				alert(`Failed to initiate call: ${response.data.message}`);
			}
		} catch (error) {
			console.error("Error initiating call:", error);
			alert("Error initiating call. Please try again.");
		}
	};

	// Utility function to get color based on status
	const getStatusColor = (status) => {
		switch (status) {
			case "New":
				return "#007bff"; // Blue for new (represents a fresh start)
			case "Inprogress":
				return "#ffc107"; // Amber for in-progress (denotes activity)
			case "Follow Up":
				return "#333"; // Dark gray for follow-up (already defined)
			case "Quotation Sent":
				return "#17a2b8"; // Teal for quotation sent (stands out but isn't final)
			case "Converted":
				return "#3EBA00"; // Dark green for converted (already defined)
			case "Delivered":
				return "#28a745"; // Green for delivered (successful completion)
			case "Rejected":
				return "#D90000"; // Dark red for rejected (already defined)
			case "Forwarded":
				return "#6610f2"; // Purple for forwarded (represents movement)
			case "Cancelled":
				return "#6c757d"; // Gray for cancelled (neutral, inactive status)
			case "Triage":
				return "#fd7e14"; // Orange for triage (urgent or prioritization phase)
			default:
				return "black"; // Default color if none of the statuses match
		}
	};

	// Utility function to get status class names
	const getStatusClassName = (status) => {
		return status?.toLowerCase().replace(/\s+/g, "-");
	};

	const [showActions, setShowActions] = useState(null);

	const toggleActions = (leadId) => {
		setShowActions(showActions === leadId ? null : leadId);
	};

	const performAction = async (action, lead) => {
		if(action == "Reject"){
			performReject(lead);
		}else if(action == "Shipped"){
			openShipmentModal(lead);
		}else if(action == "Ticket Raised"){
			openTicketModal(lead);
		}
	};

	const openShipmentModal = (lead) => {
		setSelectedLead(lead);
		setShipmentModal(true);
		setShowActions(null);
	};

	const openTicketModal = (lead) => {
		setSelectedLead(lead);
		setTicketModal(true);
		setShowActions(null);
	};

	const performReject = async (lead) => {
		try {
			if (window.confirm("Are you sure you want to reject this lead?")) {
				const response = await axios.post(
					`${API_URL}/reject-lead`,
					{ lead_id: lead.id },
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				refreshLeads();
		
				toast.success("Lead rejected successfully!");
			}
			setShowActions(null);
		} catch (error) {
			console.error("Error rejecting lead:", error);
			toast.error('Failed to reject lead');
		}
	};

	return (
		<div className="table-container" style={{ maxWidth: "calc(300px * 7)" }}>
			<table className="custom-table">
				<thead>
					<tr>
						<th>ID</th>
						<th>C NAME</th>
						<th>C NUMBER</th>
						<th>C EMAIL</th>
						<th>CATEGORY</th>
						<th>C.P</th>
						<th>S.P</th>
						<th>Source</th>
						<th>Agent</th>
						<th>Follow Up Date</th>
						<th>Status</th>
						<th>View</th>
						<th>Quotation</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{leads.map((lead) => (
						<tr key={lead.id}>
							<td>{lead.id}</td>
							<td>{lead.name}</td>
							<td>
								<MdOutlinePhone
									className="phone-btn"
									onClick={() => handleCall(lead)}
								/>{" "}
								{lead.phone}
							</td>
							<td>
								<MdOutlineEmail className="email-btn" /> {lead.email}
							</td>
							<td>{lead.parts}</td>
							<td
								className="cp-cell"
								style={{
									cursor: lead.cost_price === null ? "pointer" : "default",
								}}
								onClick={() =>
									lead.cost_price === null && openVendorModal(lead)
								}
							>
								{lead.cost_price || "---"}
							</td>
							<td>{lead.selling_price || "---"}</td>
							<td>{lead.source}</td>
							<td>{lead.agent}</td>
							<td style={{ color: getStatusColor(lead.status) }}>
								{lead.followup_date
									? new Date(lead.followup_date).toLocaleDateString("en-GB")
									: "---"}
							</td>
							<td className="status-cell">
								<div className={`status ${getStatusClassName(lead.status)}`}>
									{lead.status}
								</div>
							</td>
							<td>
								<button className="view-btn">
									<AiOutlineEye />
								</button>
							</td>
							<td>
							{lead.status !== "Rejected" && lead.status !== "Forwarded" && (

								<button
									className="quotation-btn"
									onClick={() => openQuotationModal(lead)}
								>
									Quotation
								</button>
							)}
							</td>
							<td className="action-cell">
								{lead.status !== "Forwarded" && lead.status !== "Rejected" && (
									<button
										className="action-btn"
										onClick={() => openNewAgentModal(lead)}
									>
										<PiUserSwitchBold />
									</button>
								)}
								{lead.status !== "Forwarded" && lead.status !== "Rejected" && (
									<button
										className="action-btn"
										onClick={() => openFollowupModal(lead)}
									>
										<IoMdCalendar />
									</button>
								)}
								{lead.status !== "Rejected" && lead.status !== "Forwarded" && (
									<button 
										className="action-btn"
										onClick={() => toggleActions(lead.id)}
									>
										<IoIosMore />
									</button>
								)}
								{showActions === lead.id && (
									<div className="actions-list">
										{actions
											.filter((action) =>
												(action.name.toLowerCase() !== "reject" || lead.status !== "Rejected") && (action.name.toLowerCase() !== "reject" || lead.status !== "Forwarded")
											)
											.map((action) => (
												<div
													key={action.id}
													className="agent-item"
													onClick={() => performAction(action.name, lead)}
												>
													{action.name}
												</div>
											))}
									</div>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{openModal && (
				<AddQuotation
					closeModal={() => setOpenModal(false)}
					lead={selectedLead}
				/>
			)}
			{newAgentModal && (
				<NewAgent
					closeModal={() => setNewAgentModal(false)}
					lead={selectedLead}
					refreshLeads={() => refreshLeads()}
				/>
			)}

			{followupModal && (
				<AddFollowup
					closeModal={() => setFollowupModal(false)}
					lead={selectedLead}
					refreshLeads={() => refreshLeads()}
				/>
			)}

			{shipmentModal && (
				<Shipment
					closeModal={() => setShipmentModal(false)}
					lead={selectedLead}
					refreshLeads={() => refreshLeads()}
				/>
			)}

			{ticketModal && (
				<AddTicket
					closeModal={() => setTicketModal(false)}
					lead={selectedLead}
					refreshLeads={() => refreshLeads()}
				/>
			)}

			{isVendorModalOpen && selectedLead && (
				<div className="custom-modal-overlay">
					<div className="custom-modal">
						<h2>Add Cost Price</h2>
						<div className="modal-content">
							{/* Vendor Selection */}
							<label>
								Select Vendor:
								<select
									value={selectedVendorId || ""}
									onChange={(e) => setSelectedVendorId(e.target.value)}
									disabled={newVendor}
									className="form-select"
								>
									<option value="">-- Select Vendor --</option>
									{vendors.map((vendor) => (
										<option key={vendor.id} value={vendor.id}>
											{vendor.name}
										</option>
									))}
								</select>
							</label>
							{!newVendor && (
								<button onClick={() => setNewVendor(true)}>
									Add New Vendor
								</button>
							)}
							{newVendor && (
								<div className="new-vendor-form">
									<label>
										Name:
										<input
											type="text"
											value={vendorData.name}
											onChange={(e) =>
												setVendorData({ ...vendorData, name: e.target.value })
											}
										/>
									</label>
									<label>
										Phone:
										<input
											type="tel"
											value={vendorData.phone}
											onChange={(e) =>
												setVendorData({ ...vendorData, phone: e.target.value })
											}
										/>
									</label>
									<label>
										Email:
										<input
											type="email"
											value={vendorData.email}
											onChange={(e) =>
												setVendorData({ ...vendorData, email: e.target.value })
											}
										/>
									</label>
									<label>
										Address:
										<input
											type="text"
											value={vendorData.address}
											onChange={(e) =>
												setVendorData({
													...vendorData,
													address: e.target.value,
												})
											}
										/>
									</label>
									<button onClick={handleAddVendor} style={{ float: "right" }}>
										Save Vendor
									</button>
								</div>
							)}
							<label>
								Cost Price:
								<input
									type="number"
									value={costPrice}
									onChange={(e) => setCostPrice(e.target.value)}
								/>
							</label>
							<div className="modal-actions">
								<button onClick={closeVendorModal}>Cancel</button>
								<button onClick={handleSaveCostPrice}>Save</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default LeadsList;
