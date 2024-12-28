const jwt = require("jsonwebtoken");
const { User, Role, UserRole } = require("../models");

const authenticate = async (req, res, next) => {
	const token = req.header("Authorization")?.replace("Bearer ", "");
	if (!token) {
		return res.status(401).json({ message: "No token provided." });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findOne({
			where: { id: decoded.id },
			include: { model: Role, through: UserRole, as: "roles" },
		});

		if (!user) {
			return res.status(404).json({ message: "User not found." });
		}

		req.user = user;
		next();
	} catch (error) {
		res.status(401).json({ message: "Invalid token.", error: error.message });
	}
};

const authorize = (roles) => (req, res, next) => {
	if (!req.user.roles.some((role) => roles.includes(role.name))) {
		return res.status(403).json({ message: "Access denied." });
	}
	next();
};

module.exports = { authenticate, authorize };
