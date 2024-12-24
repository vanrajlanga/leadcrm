import React, { useState, useEffect } from 'react';
import { createLead, updateLead } from '../api/leads';

const LeadForm = ({ token, lead, onSave }) => {
    const [name, setName] = useState(lead ? lead.name : '');
    const [email, setEmail] = useState(lead ? lead.email : '');
    const [phone, setPhone] = useState(lead ? lead.phone : '');
    const [status, setStatus] = useState(lead ? lead.status : 'open');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const leadData = { name, email, phone, status };
            if (lead) {
                // Update existing lead
                await updateLead(lead.id, leadData, token);
            } else {
                // Create new lead
                await createLead(leadData, token);
            }
            onSave(); // Callback to refresh the leads list
        } catch (err) {
            setError('Failed to save lead. Please try again.');
        }
    };

    return (
        <div>
            <h2>{lead ? 'Update Lead' : 'Create Lead'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="open">Open</option>
                        <option value="pending">Pending</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">{lead ? 'Update' : 'Create'} Lead</button>
            </form>
        </div>
    );
};

export default LeadForm;
