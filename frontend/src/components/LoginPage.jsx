import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import { FaUser } from 'react-icons/fa';
import { login } from '../api/auth';
import { fetchRoles } from '../api/roles';

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState('');

    // Fetch roles on component mount
    useEffect(() => {
        const getRoles = async () => {
            try {
                const data = await fetchRoles();
                setRoles(data);
            } catch (err) {
                console.error('Error fetching roles:', err);
            }
        };
        getRoles();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { token, role_id } = await login(email, password, role);
            onLogin(token, role_id); // Pass token and role to the parent
        } catch (err) {
            setError('Invalid email, password, or role');
        }
    };

    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
            <div className="row w-100">
                {/* Left Image Section */}
                <div className="col-md-6 d-none d-md-block bg-image">
                    <div className="text-center text-white overlay-content">
                        <h1>CRM</h1>
                        <p>Company Name</p>
                    </div>
                </div>

                {/* Right Login Form Section */}
                <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
                    <div className="login-form-container">
                        <h2 className="text-center">Login</h2>
                        <p className="text-center">Login In To Your Account</p>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="sample@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="********"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3 d-flex align-items-center">
                                <FaUser className="me-2" />
                                <select
                                    className="form-select"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                >
                                    <option value="">Login As</option>
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.name}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {error && <p style={{ color: 'red' }}>{error}</p>}

                            <button type="submit" className="btn btn-dark w-100">
                                Continue
                            </button>
                        </form>

                        <div className="text-center mt-3">
                            <p>
                                Can't Login?{' '}
                                <a href="#" className="text-decoration-none">
                                    Reset Password
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
