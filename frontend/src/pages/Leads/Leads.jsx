import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LeadsList from "../../components/Leads/LeadsList";
import LeadsForm from "../../components/Leads/LeadsForm";
import "./Leads.css";

const API_URL = import.meta.env.VITE_API_URL;

const Leads = () => {
	const [leads, setLeads] = useState([]);
	const [vendors, setVendors] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isFormVisible, setIsFormVisible] = useState(false); // Manage form visibility
	const [formData, setFormData] = useState({}); // Form data state

	const token = localStorage.getItem("token");

	// Fetch all leads
	const fetchLeads = async () => {
		try {
			setLoading(true);
			const response = await axios.post(
				`${API_URL}/get-leads`,
				{},
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			setLeads(response.data);
		} catch (err) {
			setError("Failed to load leads");
		} finally {
			setLoading(false);
		}
	};

	// Fetch all vendors
	const fetchVendors = async () => {
		try {
			const response = await axios.post(
				`${API_URL}/get-vendors`,
				{},
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			setVendors(response.data);
		} catch (err) {
			toast.error("Failed to load vendors");
		}
	};

	// Add Lead function
	const onAddLead = async (leadData) => {
		try {
			await axios.post(`${API_URL}/create-lead`, leadData, {
				headers: { Authorization: `Bearer ${token}` },
			});
			toast.success("Lead added successfully");
			setIsFormVisible(false);
			fetchLeads(); // Refresh the list
		} catch (err) {
			toast.error("Failed to add lead");
		}
	};

	// Add Vendor function (unchanged)
	const onAddVendor = async (vendorData) => {
		try {
			await axios.post(`${API_URL}/create-vendor`, vendorData, {
				headers: { Authorization: `Bearer ${token}` },
			});
			toast.success("Vendor added successfully");
			fetchVendors();
		} catch (err) {
			toast.error("Failed to add vendor");
		}
	};

	// Save Cost Price function (unchanged)
	const onSaveCostPrice = async (id, vendor_id, cost_price) => {
		try {
			await axios.post(
				`${API_URL}/update-lead`,
				{ id, vendor_id, cost_price },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			toast.success("Cost price saved successfully");
			fetchLeads();
		} catch (err) {
			toast.error("Failed to save cost price");
		}
	};

	const refreshLeads = async () => {
		fetchLeads();
	};

	useEffect(() => {
		fetchLeads();
		fetchVendors();
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	return (
		<div className="leads-page">
			{/* Add Lead Button */}
			{!isFormVisible && (
				<div className="d-flex justify-content-end mb-3">
					<button
						className="btn btn-dark"
						onClick={() => {
							setFormData({});
							setIsFormVisible(true);
						}}
					>
						Add Lead
					</button>
				</div>
			)}

			{/* Conditional Rendering of LeadsForm */}
			{isFormVisible && (
				<LeadsForm
					formData={formData}
					handleInputChange={(e) => {
						const { id, value } = e.target;
						setFormData((prev) => ({ ...prev, [id]: value }));
					}}
					handleFormSubmit={(e) => {
						e.preventDefault();
						onAddLead(formData);
					}}
					resetForm={() => setFormData({})}
					setIsFormVisible={setIsFormVisible}
					handleFileChange={(event) => {
						const file = event.target.files[0]; // Get the first selected file
						setFormData((prevState) => ({
							...prevState,
							recordAudio: file,
						}));
					}}
				/>
			)}

			{/* Leads List */}
			{!isFormVisible && (
				<LeadsList
					leads={leads}
					vendors={vendors}
					onAddVendor={onAddVendor}
					onSaveCostPrice={onSaveCostPrice}
					refreshLeads={refreshLeads}
				/>
			)}
		</div>
	);
};

export default Leads;
