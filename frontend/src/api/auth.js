import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

// Login API call
export const login = async (email, password, role) => {
    const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
        role,
    });
    return response.data; // Expects token and user info
};
