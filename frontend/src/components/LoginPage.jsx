import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { FaUser } from 'react-icons/fa';
import { login } from '../api/auth';

const LoginPage = ({ roles, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(email, password, role);
            const { token, role_id } = response;
            onLogin(token, role_id, email); // Pass token, role_id, and email to parent
            navigate('/dashboard'); // Redirect to dashboard
        } catch (err) {
            setError('Invalid email, password, or role');
        }
    };

    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
            <div className="row w-100">
                <div className="col-md-6 d-none d-md-block bg-image">
                    <div className="text-center text-white overlay-content">
                        <h1>CRM</h1>
                        <p>Company Name</p>
                    </div>
                </div>

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
                                    <option value="">Select Role</option>
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.id}>
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
