import React, { useEffect, useState } from "react";
import axios from 'axios';
import './AddFollowup.css';
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

const AddFollowup = ({ closeModal, lead, refreshLeads }) => {
    const [formData, setFormData] = useState({
        lead_id: lead?.id,
        followupDate: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/add-followup`, formData, { headers: { Authorization: `Bearer ${token}` } });

            toast.success("Follow-up added successfully!");

            refreshLeads();
            closeModal(false);
        } catch (error) {
            toast.error("Error adding followup date!");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h3>Follow Up</h3>
                    <button className="close-button" onClick={() => closeModal(false)}>
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Date</label>
                            <input
                                type="date"
                                value={formData.followupDate}
                                onChange={(e) => setFormData((prevState) => ({ ...prevState, followupDate: e.target.value }))} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="send-button">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFollowup;
