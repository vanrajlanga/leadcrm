import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LoginPage.css";

const API_URL = import.meta.env.VITE_API_URL;

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			window.location.href = "/dashboard";
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(`${API_URL}/auth/login`, {
				email,
				password,
			});

			localStorage.setItem("token", response.data.token); // Save token
			localStorage.setItem("roles", JSON.stringify(response.data.user.roles)); // Save roles

			window.location.href = "/dashboard"; // Redirect to dashboard
		} catch (error) {
			setMessage(error.response?.data?.message || "Login Failed");
		}
	};

	return (
		<div className="login-page">
			{/* Left Image Section */}
			<div className="login-image">
				<div className="image-overlay">
					<h1>CRM</h1>
					<p>Company Name</p>
				</div>
			</div>

			{/* Right Form Section */}
			<div className="login-form">
				<h3 className="form-title">Login</h3>
				<p className="form-subtitle">Login In To Your Account</p>
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label htmlFor="email" className="form-label">
							Email Address
						</label>
						<input
							type="email"
							className="form-control"
							id="email"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="password" className="form-label">
							Password
						</label>
						<input
							type="password"
							className="form-control"
							id="password"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<div className="mb-3">
						<label className="form-label">Login As</label>
						<select className="form-select">
							<option value="Admin">Admin</option>
							<option value="Super Admin">Super Admin</option>
							<option value="Sales Team">Sales Team</option>
							<option value="Customer Support">Customer Support</option>
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
					<button type="submit" className="btn btn-primary w-100">
						Continue
					</button>
				</form>
				<p className="text-center mt-4">
					Can't Login?{" "}
					<a href="#" className="text-decoration-none">
						Reset Password
					</a>
				</p>
				{message && <p className="text-danger text-center mt-3">{message}</p>}
			</div>
		</div>
	);
};

export default LoginPage;
