import React, { useEffect, useState } from "react";
import axios from 'axios';
import './NewAgent.css';
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

const NewAgent = ({ closeModal, lead, refreshLeads }) => {
    const [formData, setFormData] = useState({
        previous_agent: lead?.name,
        previous_agent_id: lead?.agent_id,
        new_agent: "",
        new_agent_id: "",
        lead_id: lead?.id,
    });
    const [agents, setAgents] = useState([]);
    const [leadsHistory, setLeadsHistory] = useState([]);

    const handleChange = async (e) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
            new_agent_id: "",
        }));

        if (value) {
            const response = await axios.post(`${API_URL}/get-agents-by-name`, { name: value }, { headers: { Authorization: `Bearer ${token}` } });
            setAgents(response.data);
        } else {
            setAgents([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/asign-new-agent`, formData, { headers: { Authorization: `Bearer ${token}` } });

            toast.success("New agent assigned successfully!");
        
            setFormData({
                previous_agent: lead?.agent_name,
                previous_agent_id: lead?.agent_id,
                new_agent: "",
                new_agent_id: "",
            });

            setAgents([]);
            
            refreshLeads();
            closeModal(false);
        } catch (error) {
            toast.error("Error assigning new agent!");
        }
    };

    const selectAgent = (agent) => {
        setFormData((prevState) => ({
            ...prevState,
            new_agent: agent.name,
            new_agent_id: agent.id,
        }));
        setAgents([]);
    };

    const fetchLeads = async () => {
		try {
			const response = await axios.post(
				`${API_URL}/get-leads-history-by-trackingId`,
				{trackingId: lead.trackingId},
				{ headers: { Authorization: `Bearer ${token}` } }
			);
            
			setLeadsHistory(response.data);
		} catch (err) {
            toast.error("Failed to load leads history!");
		}
	};
    
    useEffect(() => {
        fetchLeads();
    }, []);

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h3>Assign New Agent</h3>
                    <button className="close-button" onClick={() => closeModal(false)}>
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Previous Agent</label>
                            <input
                                type="text"
                                name="previous_agent"
                                value={formData.previous_agent}
                                placeholder="Previous Agent"
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Search New Agent</label>
                            <input
                                type="text"
                                name="new_agent"
                                value={formData.new_agent}
                                placeholder="Search New Agent"
                                onChange={handleChange}
                            />
                            <div className="agent-list">
                                {agents
                                    .filter((agent) =>
                                        agent.name
                                            .toLowerCase()
                                            .includes(formData.new_agent.toLowerCase())
                                    )
                                    .map((agent) => (
                                        <div
                                            key={agent.id}
                                            className="agent-item"
                                            onClick={() => selectAgent(agent)}
                                        >
                                            {agent.name}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="send-button">
                            Submit
                        </button>
                    </div>
                </form>
                <div>
                    <h3>History</h3>
                    <div className="card">
                        <div className="card-body table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Agent Name</th>
                                        <th>Agent Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leadsHistory.map((lead, index) => (
                                        <tr key={lead.id}>
                                            <td>{index + 1}</td>
                                            <td>{lead.agent.firstName} {lead.agent.lastName}</td>
                                            <td>{lead.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewAgent;
