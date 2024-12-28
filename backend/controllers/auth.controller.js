const { User, Role, UserRole } = require("../models");

const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		// Find user by email
		const user = await User.findOne({
			where: { email },
			include: {
				model: Role,
				through: UserRole,
				as: "roles",
			},
		});

		if (!user) {
			return res.status(404).json({ message: "User not found." });
		}

		// Validate password
		const isPasswordValid = await user.validatePassword(password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: "Invalid credentials." });
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
		res.status(500).json({ message: "Login failed.", error: error.message });
	}
};

module.exports = { login };
