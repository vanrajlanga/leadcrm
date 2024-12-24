import React from 'react';
import './LoginPage.css'; // Custom styles for additional tweaks
import { FaUser } from 'react-icons/fa';

const LoginPage = () => {
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

                        <form>
                            <div className="mb-3">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="sample@gmail.com"
                                />
                            </div>

                            <div className="mb-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="********"
                                />
                            </div>

                            <div className="mb-3 d-flex align-items-center">
                                <FaUser className="me-2" />
                                <select className="form-select">
                                    <option>Login As</option>
                                    <option>Admin</option>
                                    <option>Manager</option>
                                    <option>User</option>
                                </select>
                            </div>

                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="rememberMe"
                                />
                                <label className="form-check-label" htmlFor="rememberMe">
                                    Remember me
                                </label>
                            </div>

                            <button type="submit" className="btn btn-dark w-100">
                                Continue
                            </button>
                        </form>

                        <div className="text-center mt-3">
                            <p>
                                Can't Login? <a href="#" className="text-decoration-none">Reset Password</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
