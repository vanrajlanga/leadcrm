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

const {
	createLead,
	getAllLeads,
	getLeadById,
	updateLead,
	deleteLead,
} = require("../controllers/lead.controller");

const {
	createVendor,
	getAllVendors,
	getVendorById,
	updateVendor,
	deleteVendor,
} = require("../controllers/vendor.controller");

const { createQuotation } = require("../controllers/quotation.controller");

const {
	initiateCall,
	hangupCall,
} = require("../controllers/master.controller");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

// Open Routes
router.post("/auth/login", login);
router.get("/roles", roles);

// Protected Routes

// Agent Routes
router.post("/create-agent", authenticate, createAgents);
router.post("/get-agents", authenticate, getAgents);
router.post("/get-agent", authenticate, getAgentById);
router.post("/update-agent", authenticate, updateAgent);
router.post("/delete-agent", authenticate, deleteAgent);

// Lead Routes
router.post("/create-lead", authenticate, createLead);
router.post("/get-leads", authenticate, getAllLeads);
router.post("/get-lead", authenticate, getLeadById);
router.post("/update-lead", authenticate, updateLead);
router.post("/delete-lead", authenticate, deleteLead);

// Vendor Routes
router.post("/create-vendor", authenticate, createVendor);
router.post("/get-vendors", authenticate, getAllVendors);
router.post("/get-vendor", authenticate, getVendorById);
router.post("/update-vendor", authenticate, updateVendor);
router.post("/delete-vendor", authenticate, deleteVendor);

router.post("/click-to-call", authenticate, initiateCall);
router.post("/hangup-call", authenticate, hangupCall);

// Quotation Routes
router.post("/create-quotations", authenticate, createQuotation);

module.exports = router;
