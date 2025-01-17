import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { MdPerson, MdOutlinePhone, MdOutlineEmail } from "react-icons/md";
import { IoMdCalendar, IoIosMore } from "react-icons/io";
import "./LeadsList.css";
import AddQuotation from "../../components/Quotation/addQuotation";

const LeadsList = ({ leads, vendors = [], onSaveCostPrice, onAddVendor }) => {
	const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [selectedLead, setSelectedLead] = useState(null);
	const [newVendor, setNewVendor] = useState(false);
	const [vendorData, setVendorData] = useState({
		name: "",
		phone: "",
		email: "",
		address: "",
		cost_price: "",
	});
	const [selectedVendorId, setSelectedVendorId] = useState(null);
	const [costPrice, setCostPrice] = useState("");

	// Open the modal to add cost price
	const openVendorModal = (lead) => {
		setSelectedLead(lead);
		setIsVendorModalOpen(true);
	};

	const openQuotationModal = (lead) => {
		setSelectedLead(lead);
		setOpenModal(true);
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
			cost_price: "",
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
			!vendorData.address ||
			!vendorData.cost_price
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
			cost_price: "",
		});
	};

	// Save cost price
	const handleSaveCostPrice = () => {
		if (!selectedVendorId || !costPrice) {
			alert("Please select a vendor and enter a cost price.");
			return;
		}
		onSaveCostPrice(selectedLead.id, selectedVendorId, costPrice);
		closeVendorModal();
	};

	// Utility function to get color based on status
	const getStatusColor = (status) => {
		switch (status) {
			case "Follow Up":
				return "#333"; // Dark gray for follow up
			case "Converted":
				return "#3EBA00"; // Dark green for converted
			case "Rejected":
				return "#D90000"; // Dark red for rejected
			default:
				return "black"; // Default color if none of the statuses match
		}
	};

	// Utility function to get status class names
	const getStatusClassName = (status) => {
		return status?.toLowerCase().replace(/\s+/g, "-");
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
						<th>Reference By</th>
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
								<MdOutlinePhone className="phone-btn" /> {lead.number}
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
							<td>{lead.reference}</td>
							<td>{lead.agent}</td>
							<td style={{ color: getStatusColor(lead.status) }}>
								{lead.followup_date}
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
								<button
									className="quotation-btn"
									onClick={() => openQuotationModal(lead)}
								>
									Quotation
								</button>
							</td>
							<td>
								<button className="action-btn">
									<MdPerson />
								</button>
								<button className="action-btn">
									<IoMdCalendar />
								</button>
								<button className="action-btn">
									<IoIosMore />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{openModal && <AddQuotation closeModal={() => setOpenModal(false)} lead={selectedLead} />}

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
											type="text"
											value={vendorData.phone}
											onChange={(e) =>
												setVendorData({ ...vendorData, phone: e.target.value })
											}
										/>
									</label>
									<label>
										Email:
										<input
											type="text"
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
									<button onClick={handleAddVendor}>Save Vendor</button>
								</div>
							)}
							<label>
								Cost Price:
								<input
									type="text"
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
