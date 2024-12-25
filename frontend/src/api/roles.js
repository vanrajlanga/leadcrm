import axios from 'axios';

const API_URL = 'http://localhost:5000/api/roles';

// Fetch all roles
export const fetchRoles = async (token = null) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.get(API_URL, { headers });
    return response.data;
};
