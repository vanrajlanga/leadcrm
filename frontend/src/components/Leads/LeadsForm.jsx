import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const LeadForm = ({
	formData,
	handleInputChange,
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
				<h3 className="title">Add Lead Details</h3>
			</div>
			<form onSubmit={handleFormSubmit}>
				{/* Lead Details Section */}
				<div className="card mb-4">
					<div className="card-body">
						<h3 className="section-title">Lead Details</h3>
						<div className="row g-3">
							<div className="col-lg-6">
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
							<div className="col-lg-6">
								<label htmlFor="phone" className="form-label">
									Phone
								</label>
								<input
									type="tel"
									className="form-control"
									id="phone"
									value={formData.phone || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-lg-6">
								<label htmlFor="email" className="form-label">
									Email
								</label>
								<input
									type="email"
									className="form-control"
									id="email"
									value={formData.email || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-lg-6">
								<label htmlFor="comments" className="form-label">
									Comments
								</label>
								<textarea
									className="form-control"
									id="comments"
									rows="3"
									value={formData.comments || ""}
									onChange={handleInputChange}
								></textarea>
							</div>
							<div className="col-lg-6">
								<label htmlFor="parts" className="form-label">
									Parts (Category)
								</label>
								<input
									type="text"
									className="form-control"
									id="parts"
									value={formData.parts || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-lg-6">
								<label htmlFor="makeModels" className="form-label">
									Make Models
								</label>
								<input
									type="text"
									className="form-control"
									id="makeModels"
									value={formData.makeModels || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-lg-6">
								<label htmlFor="years" className="form-label">
									Years
								</label>
								<input
									type="text"
									className="form-control"
									id="years"
									value={formData.years || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-lg-6">
								<label htmlFor="states" className="form-label">
									States
								</label>
								<input
									type="text"
									className="form-control"
									id="states"
									value={formData.states || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-lg-6">
								<label htmlFor="subscription" className="form-label">
									Subscription
								</label>
								<select
									className="form-control"
									id="subscription"
									value={formData.subscription || false}
									onChange={handleInputChange}
								>
									<option value={true}>Yes</option>
									<option value={false}>No</option>
								</select>
							</div>
							<div className="col-lg-6">
								<label htmlFor="trackingId" className="form-label">
									Tracking ID
								</label>
								<input
									type="text"
									className="form-control"
									id="trackingId"
									value={formData.trackingId || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-lg-6">
								<label htmlFor="eventTimestamp" className="form-label">
									Event Timestamp
								</label>
								<input
									type="datetime-local"
									className="form-control"
									id="eventTimestamp"
									value={formData.eventTimestamp || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-lg-6">
								<label htmlFor="recordAudio" className="form-label">
									Record Audio (URL)
								</label>
								<input
									type="text"
									className="form-control"
									id="recordAudio"
									value={formData.recordAudio || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-lg-6">
								<label htmlFor="cost_price" className="form-label">
									Cost Price
								</label>
								<input
									type="number"
									className="form-control"
									id="cost_price"
									step="0.01"
									value={formData.cost_price || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-lg-6">
								<label htmlFor="selling_price" className="form-label">
									Selling Price
								</label>
								<input
									type="number"
									className="form-control"
									id="selling_price"
									step="0.01"
									value={formData.selling_price || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div className="col-lg-6">
								<label htmlFor="reference" className="form-label">
									Reference
								</label>
								<select
									className="form-control"
									id="reference"
									value={formData.reference || ""}
									onChange={handleInputChange}
								>
									<option value="website">Website</option>
									<option value="manual">Manual</option>
								</select>
							</div>
							<div className="col-lg-6">
								<label htmlFor="status" className="form-label">
									Status
								</label>
								<select
									className="form-control"
									id="status"
									value={formData.status || ""}
									onChange={handleInputChange}
								>
									<option value="Pending">Pending</option>
									<option value="Follow Up">Follow Up</option>
									<option value="Converted">Converted</option>
									<option value="Rejected">Rejected</option>
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

export default LeadForm;
