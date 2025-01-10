const express = require("express");
const { login } = require("../controllers/auth.controller");
const { roles } = require("../controllers/role.controller");
const {
	createAgents,
	getAgents,
	getAgentById,
	updateAgent,
	deleteAgent,
} = require("../controllers/agent.controller");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

// Open Routes
router.post("/auth/login", login);
router.get("/roles", roles);

// Protected Routes
router.post("/create-agent", authenticate, createAgents);
router.post("/get-agents", authenticate, getAgents);
router.post("/get-agent", authenticate, getAgentById);
router.post("/update-agent", authenticate, updateAgent);
router.post("/delete-agent", authenticate, deleteAgent);

module.exports = router;
