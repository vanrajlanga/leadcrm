import React, { useState } from "react";
import axios from "axios";
import "./AddTicket.css";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

const AddTicket = ({ closeModal, lead }) => {
	const [formData, setFormData] = useState({
        lead_id: lead?.id,
        agent_id: lead?.agent_id,
        c_name: lead?.name,
        c_number: lead?.phone,
        p_category: lead?.parts,
        cp: lead?.cost_price,
        sp: lead?.selling_price,
        issue: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => {
            const updatedFormData = { ...prevState, [name]: value };
            return updatedFormData;
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post(`${API_URL}/add-tickets`, formData, {
				headers: { Authorization: `Bearer ${token}` },
			});

            closeModal(false);
			toast.success("Ticket added successfully!");
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	return (
		<div className="modal-overlay">
			<div className="modal-container">
				<div className="modal-header">
					<h3>Ticket Raised</h3>
					<button className="close-button" onClick={() => closeModal(false)}>
						&times;
					</button>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="modal-body">
						<div className="form-group-container">
							<div className="form-group c-id">
								<label>C Id</label>
								<input
									type="text"
									name="c_id"
									value={formData.lead_id}
									onChange={handleChange}
									required
									readOnly
								/>
							</div>
                            
                            <div className="form-group c-name">
								<label>C Name</label>
								<input
									type="text"
									name="c_name"
									value={formData.c_name}
									onChange={handleChange}
									required
									readOnly
								/>
							</div>
                            
							<div className="form-group c-number">
								<label>C Number</label>
								<input
									type="text"
									name="c_number"
									value={formData.c_number}
									onChange={handleChange}
									required
									readOnly
								/>
							</div>
						</div>

						<div className="form-group-container">
							<div className="form-group product-category">
								<label>Product Category</label>
								<input
									type="text"
									name="p_category"
									value={formData.p_category}
									onChange={handleChange}
									required
                                    readOnly
								/>
							</div>
							<div className="form-group cp">
								<label>C.P</label>
								<input
									type="text"
									name="cp"
									value={formData.cp}
									onChange={handleChange}
									required
									readOnly
								/>
							</div>
							<div className="form-group sp">
								<label>S.P</label>
								<input
									type="text"
									name="sp"
									value={formData.sp}
									onChange={handleChange}
									required
                                    readOnly
								/>
							</div>
						</div>

						<div className="form-group">
							<label>Issue</label>
							<textarea
								name="issue"
								value={formData.issue}
								onChange={handleChange}
								placeholder="Describe the issue"
								required
							/>
						</div>
					</div>
					<div className="modal-footer">
						<button type="submit" className="send-button">
							Send
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddTicket;
