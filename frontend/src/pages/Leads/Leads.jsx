import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LeadsList from "../../components/Leads/LeadsList";
import "./Leads.css";

const API_URL = import.meta.env.VITE_API_URL;

const Leads = () => {
	const [leads, setLeads] = useState([]);
	const [vendors, setVendors] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

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
	const onAddVendor = async (vendorData) => {
		try {
			const response = await axios.post(`${API_URL}/add-vendor`, vendorData, {
				headers: { Authorization: `Bearer ${token}` },
			});
			toast.success("Vendor added successfully");
			fetchVendors();
		} catch (err) {
			toast.error("Failed to add vendor");
		}
	};

	useEffect(() => {
		fetchLeads();
		fetchVendors();
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	return (
		<div className="leads-page">
			<LeadsList leads={leads} vendors={vendors} onAddVendor={onAddVendor} />
		</div>
	);
};

export default Leads;
