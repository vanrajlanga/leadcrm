import React, { useEffect, useState } from "react";
import axios from 'axios';
import './ShowTickets.css';
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

const ShowTickets = ({ closeModal, ticketDetails, refreshTickets }) => {
    const closeTicket = async () => {
        refreshTickets();
        closeModal(false);
    };
    
    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h3>Ticket Details</h3>
                    <button className="close-button" onClick={() => closeTicket()}>
                        &times;
                    </button>
                </div>
                <div className="form-group">
                    <pre>{JSON.stringify(ticketDetails, null, 2)}</pre>
                </div>
            </div>
        </div>
    );
};

export default ShowTickets;