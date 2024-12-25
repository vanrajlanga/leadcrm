import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users/login';

export const login = async (email, password, role) => {
    const response = await axios.post(API_URL, {
        email,
        password,
        role,
    });

    // Ensure the correct structure is returned
    const { token, role_id, email: userEmail } = response.data;
    return { token, role_id, email: userEmail };
};
