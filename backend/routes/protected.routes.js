const express = require("express");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

// Example: Route accessible only to "Super Admin" and "Admin"
router.get(
	"/protected",
	authenticate,
	authorize(["Super Admin", "Admin"]),
	(req, res) => {
		res.json({ message: "Welcome to the protected route!", user: req.user });
	}
);

module.exports = router;
