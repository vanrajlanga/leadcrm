import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AgentForm from "../../components/Agents/AgentForm";
import AgentsList from "../../components/Agents/AgentsList";

const API_URL = import.meta.env.VITE_API_URL;

const Agents = () => {
	const [isFormVisible, setIsFormVisible] = useState(false);
	const [agents, setAgents] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [isEditMode, setIsEditMode] = useState(false);
	const [editingAgentId, setEditingAgentId] = useState(null);
	const [roles, setRoles] = useState([]);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		gender: "",
		dob: "",
		email: "",
		phone: "",
		city: "",
		state: "",
		country: "",
		address: "",
		pincode: "",
		joiningDate: "",
		experience: "",
		aadharCard: null,
		panCard: null,
		bankPassbook: null,
		monthly_target: "",
		quarterly_target: "",
		yearly_target: "",
		bankName: "",
		branchName: "",
		name: "",
		accountNumber: "",
		reEnterAccountNumber: "",
		ifscCode: "",
		bankAddress: "",
		role_id: "",
	});

	useEffect(() => {
		fetchRoles();
		fetchAgents();
	}, []);

	const fetchRoles = async () => {
		try {
			const response = await axios.get(`${API_URL}/roles`);
			setRoles(response.data);
		} catch {
			toast.error("Failed to load roles!");
		}
	};

	const fetchAgents = async () => {
		try {
			const token = localStorage.getItem("token");
			const response = await axios.post(
				`${API_URL}/get-agents`,
				{},
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			setAgents(response.data);
		} catch {
			toast.error("Failed to load agents!");
		}
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
		try {
			const token = localStorage.getItem("token");
			if (isEditMode) {
				await axios.post(
					`${API_URL}/update-agent`,
					{ ...formData, id: editingAgentId },
					{ headers: { Authorization: `Bearer ${token}` } }
				);
				toast.success("Agent updated successfully!");
			} else {
				const formDataToSend = new FormData();
				Object.keys(formData).forEach((key) => {
					formDataToSend.append(key, formData[key]);
				});
				await axios.post(`${API_URL}/create-agent`, formDataToSend, {
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${token}`,
					},
				});
				toast.success("Agent created successfully!");
			}
			fetchAgents();
			setIsFormVisible(false);
		} catch (error) {
			toast.error("Failed to save agent details!");
		}
	};

	const handleEditAgent = async (id) => {
		try {
			const token = localStorage.getItem("token");
			const response = await axios.post(
				`${API_URL}/get-agent`,
				{ id },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			setFormData(response.data);
			setIsEditMode(true);
			setEditingAgentId(id);
			setIsFormVisible(true);
		} catch {
			toast.error("Failed to fetch agent details!");
		}
	};

	const handleDeleteAgent = async (id) => {
		try {
			const token = localStorage.getItem("token");
			await axios.post(
				`${API_URL}/delete-agent`,
				{ id },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			toast.success("Agent deleted successfully!");
			fetchAgents();
		} catch {
			toast.error("Failed to delete agent!");
		}
	};

	const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div className="agents-container">
			{isFormVisible ? (
				<AgentForm
					formData={formData}
					roles={roles}
					isEditMode={isEditMode}
					handleInputChange={handleInputChange}
					handleFileChange={handleFileChange}
					handleFormSubmit={handleFormSubmit}
					resetForm={() => setFormData({})}
					setIsFormVisible={setIsFormVisible}
				/>
			) : (
				<AgentsList
					agents={agents}
					currentPage={currentPage}
					totalPages={Math.ceil(agents.length / 5)}
					handlePageChange={handlePageChange}
					handleEditAgent={handleEditAgent}
					handleDeleteAgent={handleDeleteAgent}
					setIsFormVisible={setIsFormVisible}
					setIsEditMode={setIsEditMode}
				/>
			)}
		</div>
	);
};

export default Agents;
