import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const formatDate = (date) => {
	if (!date) return ""; // Handle empty or undefined dates
	return new Date(date).toISOString().split("T")[0]; // Format to "yyyy-MM-dd"
};

const AgentForm = ({
	formData,
	roles,
	isEditMode,
	handleInputChange,
	handleFileChange,
	handleFormSubmit,
	resetForm,
	setIsFormVisible,
}) => {
	return (
		<>
			<div className="d-flex align-items-center mb-4">
				<button
					className="btn btn-outline-secondary back-btn me-2"
					onClick={() => {
						resetForm();
						setIsFormVisible(false);
					}}
				>
					<AiOutlineArrowLeft />
				</button>
				<h3 className="title">
					{isEditMode ? "Edit Agent Details" : "Add Agent Details"}
				</h3>
			</div>
			<form onSubmit={handleFormSubmit}>
				{/* Add Agent Details Section */}
				<div className="card mb-4">
					<div className="card-body">
						<h3 className="section-title">Agent Details</h3>
						<div className="row g-3">
							<div className="col-lg-4 col-md-6">
								<label htmlFor="firstName" className="form-label">
									First Name
								</label>
								<input
									type="text"
									className="form-control"
									id="firstName"
									value={formData.firstName || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-lg-4 col-md-6">
								<label htmlFor="lastName" className="form-label">
									Last Name
								</label>
								<input
									type="text"
									className="form-control"
									id="lastName"
									value={formData.lastName || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-lg-4 col-md-6">
								<label htmlFor="gender" className="form-label">
									Gender
								</label>
								<input
									type="text"
									className="form-control"
									id="gender"
									value={formData.gender || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-lg-4 col-md-6">
								<label htmlFor="dob" className="form-label">
									Date of Birth
								</label>
								<input
									type="date"
									className="form-control"
									id="dob"
									value={formatDate(formData.dob)}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-lg-4 col-md-6">
								<label htmlFor="email" className="form-label">
									Email Id
								</label>
								<input
									type="email"
									className="form-control"
									id="email"
									value={formData.email || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-lg-4 col-md-6">
								<label htmlFor="phone" className="form-label">
									Phone no
								</label>
								<div className="input-group">
									<span className="input-group-text">+91</span>
									<input
										type="tel"
										className="form-control"
										id="phone"
										value={formData.phone || ""}
										onChange={handleInputChange}
									/>
								</div>
							</div>
							<div className="col-lg-4 col-md-6">
								<label htmlFor="city" className="form-label">
									City
								</label>
								<input
									type="text"
									className="form-control"
									id="city"
									value={formData.city || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-lg-4 col-md-6">
								<label htmlFor="state" className="form-label">
									State
								</label>
								<input
									type="text"
									className="form-control"
									id="state"
									value={formData.state || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-lg-4 col-md-6">
								<label htmlFor="country" className="form-label">
									Country
								</label>
								<input
									type="text"
									className="form-control"
									id="country"
									value={formData.country || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-12">
								<label htmlFor="address" className="form-label">
									Address
								</label>
								<textarea
									className="form-control"
									id="address"
									rows="3"
									value={formData.address || ""}
									onChange={handleInputChange}
								></textarea>
							</div>
							<div className="col-lg-4 col-md-6">
								<label htmlFor="pincode" className="form-label">
									Pincode
								</label>
								<input
									type="text"
									className="form-control"
									id="pincode"
									value={formData.pincode || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-lg-4 col-md-6">
								<label htmlFor="joiningDate" className="form-label">
									Joining Date
								</label>
								<input
									type="date"
									className="form-control"
									id="joiningDate"
									value={formatDate(formData.joiningDate)}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-lg-4 col-md-6">
								<label htmlFor="experience" className="form-label">
									Experience
								</label>
								<input
									type="text"
									className="form-control"
									id="experience"
									value={formData.experience || ""}
									onChange={handleInputChange}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Document Details Section */}
				<div className="card mb-4">
					<div className="card-body">
						<h3 className="section-title">Document Details</h3>
						<div className="row g-3">
							<div className="col-md-4">
								<p className="document-name">Aadhar Card</p>
								<input
									type="file"
									className="form-control"
									onChange={(e) => handleFileChange(e, "aadharCard")}
								/>
							</div>
							<div className="col-md-4">
								<p className="document-name">Pan Card</p>
								<input
									type="file"
									className="form-control"
									onChange={(e) => handleFileChange(e, "panCard")}
								/>
							</div>
							<div className="col-md-4">
								<p className="document-name">Bank Pass Book</p>
								<input
									type="file"
									className="form-control"
									onChange={(e) => handleFileChange(e, "bankPassbook")}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Performance Section */}
				<div className="card mb-4">
					<div className="card-body">
						<h3 className="section-title">Performance</h3>
						<div className="row g-3">
							<div className="col-lg-4 col-md-6">
								<label htmlFor="monthly_target" className="form-label">
									Monthly Target
								</label>
								<input
									type="number"
									className="form-control"
									id="monthly_target"
									value={formData.monthly_target || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-lg-4 col-md-6">
								<label htmlFor="quarterly_target" className="form-label">
									Quarterly Target
								</label>
								<input
									type="number"
									className="form-control"
									id="quarterly_target"
									value={formData.quarterly_target || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-lg-4 col-md-6">
								<label htmlFor="yearly_target" className="form-label">
									Yearly Target
								</label>
								<input
									type="number"
									className="form-control"
									id="yearly_target"
									value={formData.yearly_target || ""}
									onChange={handleInputChange}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Account Details Section */}
				<div className="card mb-4">
					<div className="card-body">
						<h3 className="section-title">Account Details</h3>
						<div className="row g-3">
							<div className="col-md-4">
								<label htmlFor="bankName" className="form-label">
									Bank Name
								</label>
								<input
									type="text"
									className="form-control"
									id="bankName"
									value={formData.bankName || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-md-4">
								<label htmlFor="branchName" className="form-label">
									Branch Name
								</label>
								<input
									type="text"
									className="form-control"
									id="branchName"
									value={formData.branchName || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-md-4">
								<label htmlFor="name" className="form-label">
									Name
								</label>
								<input
									type="text"
									className="form-control"
									id="name"
									value={formData.name || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-md-4">
								<label htmlFor="accountNumber" className="form-label">
									Account Number
								</label>
								<input
									type="text"
									className="form-control"
									id="accountNumber"
									value={formData.accountNumber || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-md-4">
								<label htmlFor="reEnterAccountNumber" className="form-label">
									Re-Enter Account Number
								</label>
								<input
									type="text"
									className="form-control"
									id="reEnterAccountNumber"
									value={formData.reEnterAccountNumber || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-md-4">
								<label htmlFor="ifscCode" className="form-label">
									IFSC CODE
								</label>
								<input
									type="text"
									className="form-control"
									id="ifscCode"
									value={formData.ifscCode || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-12">
								<label htmlFor="bankAddress" className="form-label">
									Bank Address
								</label>
								<textarea
									className="form-control"
									id="bankAddress"
									rows="3"
									value={formData.bankAddress || ""}
									onChange={handleInputChange}
								></textarea>
							</div>
							<div className="col-md-4">
								<label htmlFor="role" className="form-label">
									Role:
								</label>
								<select
									id="role_id"
									name="role_id"
									className="form-control"
									value={formData.role_id || ""}
									onChange={handleInputChange}
								>
									{roles
										.filter(
											(role) =>
												role.name !== "Admin" && role.name !== "Super Admin"
										)
										.map((role) => (
											<option key={role.id} value={role.id}>
												{role.name}
											</option>
										))}
								</select>
							</div>
						</div>
					</div>
				</div>

				{/* Submit Button */}
				<div className="text-end">
					<button type="submit" className="btn btn-dark">
						Submit
					</button>
				</div>
			</form>
		</>
	);
};

export default AgentForm;
