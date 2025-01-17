const { Vendor } = require("../models");

// Create a new vendor
const createVendor = async (req, res) => {
	try {
		// Create the vendor
		req.body.added_by = req.user.id;
		const newVendor = await Vendor.create({
			...req.body,
		});

		res.status(201).json({
			message: "Vendor created successfully.",
			data: newVendor,
		});
	} catch (error) {
		console.error("Error creating vendor:", error);
		res.status(500).json({
			message: "Failed to create vendor.",
			error: error.message,
		});
	}
};

// Get all vendors
const getAllVendors = async (req, res) => {
	try {
		const vendors = await Vendor.findAll();
		res.status(200).json(vendors);
	} catch (error) {
		res.status(500).json({
			message: "Failed to fetch vendors.",
			error: error.message,
		});
	}
};

// Get a single vendor by ID
const getVendorById = async (req, res) => {
	const { id } = req.body;

	try {
		const vendor = await Vendor.findByPk(id);

		if (!vendor) {
			return res.status(404).json({
				message: "Vendor not found.",
			});
		}

		res.status(200).json({
			message: "Vendor fetched successfully.",
			data: vendor,
		});
	} catch (error) {
		console.error("Error fetching vendor:", error);
		res.status(500).json({
			message: "Failed to fetch vendor.",
			error: error.message,
		});
	}
};

// Update a vendor by ID
const updateVendor = async (req, res) => {
	const { id } = req.body;

	try {
		// Update the vendor
		const [updatedRowsCount] = await Vendor.update(
			{ ...req.body },
			{ where: { id } }
		);

		if (updatedRowsCount === 0) {
			return res.status(404).json({
				message: "Vendor not found or no changes made.",
			});
		}

		const updatedVendor = await Vendor.findByPk(id);
		res.status(200).json({
			message: "Vendor updated successfully.",
			data: updatedVendor,
		});
	} catch (error) {
		console.error("Error updating vendor:", error);
		res.status(500).json({
			message: "Failed to update vendor.",
			error: error.message,
		});
	}
};

// Delete a vendor by ID
const deleteVendor = async (req, res) => {
	const { id } = req.body;

	try {
		const deletedRowsCount = await Vendor.destroy({ where: { id } });

		if (deletedRowsCount === 0) {
			return res.status(404).json({
				message: "Vendor not found.",
			});
		}

		res.status(200).json({
			message: "Vendor deleted successfully.",
		});
	} catch (error) {
		console.error("Error deleting vendor:", error);
		res.status(500).json({
			message: "Failed to delete vendor.",
			error: error.message,
		});
	}
};

module.exports = {
	createVendor,
	getAllVendors,
	getVendorById,
	updateVendor,
	deleteVendor,
};
