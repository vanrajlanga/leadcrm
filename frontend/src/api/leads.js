import axios from 'axios';

const API_URL = 'http://localhost:5000/api/leads';

export const fetchLeads = async (token) => {
    const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const createLead = async (lead, token) => {
    const response = await axios.post(API_URL, lead, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const updateLead = async (id, lead, token) => {
    const response = await axios.put(`${API_URL}/${id}`, lead, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const deleteLead = async (id, token) => {
    await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
