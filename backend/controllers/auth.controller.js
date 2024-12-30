const { User, Role } = require("../models");

const login = async (req, res) => {
	const { email, password, role } = req.body;

	try {
		// Find user by email and include roles
		const user = await User.findOne({
			where: { email },
			include: [
				{
					model: Role,
					as: "roles", // Ensure this alias matches the one defined in Sequelize associations
					attributes: ["id", "name"], // Include only necessary fields
				},
			],
		});

		// Check if user exists
		if (!user) {
			return res.status(404).json({ message: "User not found." });
		}

		// Validate password
		const isPasswordValid = await user.validatePassword(password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: "Invalid credentials." });
		}

		// Check if the selected role matches one of the user's roles
		const hasRole = user.roles.some((r) => r.name === role);
		if (!hasRole) {
			return res
				.status(403)
				.json({ message: "Access denied for the selected role." });
		}

		// Generate JWT
		const token = user.generateAuthToken();

		// Send response
		res.status(200).json({
			message: "Login successful.",
			token,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				roles: user.roles.map((role) => role.name),
			},
		});
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({ message: "Login failed.", error: error.message });
	}
};

module.exports = { login };
