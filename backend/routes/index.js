const express = require("express");
const { login } = require("../controllers/auth.controller");
const { roles } = require("../controllers/role.controller");
const { createAgents } = require("../controllers/agent.controller");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

// Open Routes
router.post("/auth/login", login);
router.get("/roles", roles);

// Protected Routes
router.post("/create-agents", authenticate, createAgents);

module.exports = router;
