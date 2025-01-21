import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const LeadForm = ({
	formData,
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
				<h3 className="title">Add Lead Details</h3>
			</div>
			<form onSubmit={handleFormSubmit} encType="multipart/form-data">
				{/* Lead Details Section */}
				<div className="card mb-4">
					<div className="card-body">
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
									Make & Model
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
								<label htmlFor="recordAudio" className="form-label">
									Record Audio
								</label>
								<input
									type="file"
									className="form-control"
									id="recordAudio"
									accept="audio/*"
									onChange={handleFileChange}
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
							{/* Submit Button */}
							<div className="text-end">
								<button type="submit" className="btn btn-dark">
									Submit
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};

export default LeadForm;
