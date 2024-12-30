import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState(""); // Track selected role
	const [roles, setRoles] = useState([]); // Dynamic roles from API
	const [message, setMessage] = useState("");

	// Fetch roles from API
	useEffect(() => {
		const fetchRoles = async () => {
			try {
				const response = await axios.get(`${API_URL}/roles`);
				setRoles(response.data);
				if (response.data.length > 0) {
					setRole(response.data[0].name); // Default to the first role
				}
			} catch (error) {
				console.error("Error fetching roles:", error);
			}
		};

		fetchRoles();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(`${API_URL}/auth/login`, {
				email,
				password,
				role, // Pass the selected role to the backend
			});

			localStorage.setItem("token", response.data.token);
			localStorage.setItem("roles", JSON.stringify(response.data.user.roles));

			window.location.href = "/dashboard";
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
						<select
							className="form-select"
							value={role}
							onChange={(e) => setRole(e.target.value)}
							required
						>
							{roles.map((r) => (
								<option key={r.id} value={r.name}>
									{r.name}
								</option>
							))}
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

export default Login;
