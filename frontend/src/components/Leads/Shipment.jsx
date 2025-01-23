import React, { useEffect, useState } from "react";
import axios from 'axios';
import './Shipment.css';
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

const Shipment = ({ closeModal, lead, refreshLeads }) => {
    const [formData, setFormData] = useState({
        lead_id: lead?.id,
        tracking_link: "",
        notes: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/add-shipment`, formData, { headers: { Authorization: `Bearer ${token}` } });

            toast.success("Shipment details added successfully!");

            refreshLeads();
            closeModal(false);
        } catch (error) {
            toast.error("Error adding shipment details!");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h3>Shipment</h3>
                    <button className="close-button" onClick={() => closeModal(false)}>
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Tracking link</label>
                            <input
                                type="text"
                                name="tracking_link"
                                value={formData.tracking_link}
                                onChange={handleChange}
                                placeholder="https://..."
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Notes</label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                placeholder="Enter notes"
                            />
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

export default Shipment;
