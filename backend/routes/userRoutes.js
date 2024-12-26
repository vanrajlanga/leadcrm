const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login Route
router.post("/login", async (req, res) => {
	const { email, password, role } = req.body;

	try {
		// Find user by email
		const user = await User.findOne({ where: { email } });

		if (!user) {
			return res.status(401).json({ error: "Invalid email or password" });
		}

		const isRoleValid = role == user.role_id ? true : false;
		if (!isRoleValid) {
			return res.status(401).json({ error: "Invalid email or password" });
		}
		// Check password
		const isPasswordValid = await bcrypt.compare(password, user.password_hash);
		if (!isPasswordValid) {
			return res.status(401).json({ error: "Invalid email or password" });
		}

		// Generate JWT token
		const token = jwt.sign(
			{ id: user.id, role_id: user.role_id },
			process.env.JWT_SECRET,
			{
				expiresIn: "1h",
			}
		);

		// Respond with token and role_id
		res.status(200).json({
			token,
			role_id: user.role_id,
			email: user.email,
		});
	} catch (error) {
		console.error("Error during login:", error);
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
