import React from "react";

const LeadsForm = ({
	formData,
	handleInputChange,
	handleFormSubmit,
	resetForm,
	setIsFormVisible,
	isEditMode,
}) => {
	const handleCancel = () => {
		resetForm();
		setIsFormVisible(false);
	};

	return (
		<form onSubmit={handleFormSubmit} className="leads-form">
			<h2>{isEditMode ? "Edit Lead" : "Add New Lead"}</h2>
			<div className="form-group">
				<label htmlFor="name">Name</label>
				<input
					id="name"
					type="text"
					value={formData.name}
					onChange={handleInputChange}
					required
				/>
			</div>
			<div className="form-group">
				<label htmlFor="number">Phone Number</label>
				<input
					id="number"
					type="text"
					value={formData.number}
					onChange={handleInputChange}
					required
				/>
			</div>
			<div className="form-group">
				<label htmlFor="email">Email</label>
				<input
					id="email"
					type="email"
					value={formData.email}
					onChange={handleInputChange}
					required
				/>
			</div>
			<div className="form-group">
				<label htmlFor="category">Category</label>
				<input
					id="category"
					type="text"
					value={formData.category}
					onChange={handleInputChange}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="cp">Cost Price (C.P)</label>
				<input
					id="cp"
					type="text"
					value={formData.cp}
					onChange={handleInputChange}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="sp">Selling Price (S.P)</label>
				<input
					id="sp"
					type="text"
					value={formData.sp}
					onChange={handleInputChange}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="reference">Reference By</label>
				<input
					id="reference"
					type="text"
					value={formData.reference}
					onChange={handleInputChange}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="agent">Agent</label>
				<input
					id="agent"
					type="text"
					value={formData.agent}
					onChange={handleInputChange}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="date">Follow-Up Date</label>
				<input
					id="date"
					type="date"
					value={formData.date}
					onChange={handleInputChange}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="status">Status</label>
				<select
					id="status"
					value={formData.status}
					onChange={handleInputChange}
					required
				>
					<option value="Follow Up">Follow Up</option>
					<option value="Converted">Converted</option>
					<option value="Rejected">Rejected</option>
				</select>
			</div>
			<div className="form-actions">
				<button type="submit" className="save-btn">
					{isEditMode ? "Update" : "Save"}
				</button>
				<button type="button" className="cancel-btn" onClick={handleCancel}>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default LeadsForm;
