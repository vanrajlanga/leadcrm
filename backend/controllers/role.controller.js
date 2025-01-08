const { Role } = require("../models");

const roles = async (req, res) => async (req, res) => {
	try {
		const roles = await Role.findAll({
			attributes: ["id", "name"], // Only return necessary fields
		});
		res.status(200).json(roles);
	} catch (error) {
		console.error("Error fetching roles:", error);
		res.status(500).json({ message: "Error fetching roles." });
	}
};

module.exports = { roles };
