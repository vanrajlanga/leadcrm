const express = require("express");
const { login } = require("../controllers/auth.controller");
const { roles } = require("../controllers/role.controller");
const {
	createAgents,
	getAgents,
	getAgentsByName,
	getAgentById,
	updateAgent,
	deleteAgent,
	assignNewAgent,
} = require("../controllers/agent.controller");

const {
	createLead,
	getAllLeads,
	getLeadById,
	getLeadByTrackingId,
	rejectLead,
	updateLead,
	deleteLead,
	addFollowup,
	addShippingDetails,
	addTickets,
	getAllTickets,
	getTicketDetails,
} = require("../controllers/lead.controller");

const {
	createVendor,
	getAllVendors,
	getVendorById,
	updateVendor,
	deleteVendor,
} = require("../controllers/vendor.controller");

const {
	createQuotation,
	getQuotations,
	getQuotationsHistory,
} = require("../controllers/quotation.controller");

const {
	initiateCall,
	fetchCallRecordings,
	getPaymentAmount,
	authDocumentUpload,
} = require("../controllers/master.controller");

const {
	createStripePaymentIntent,
} = require("../controllers/stripe.controller");

const {
	createOrder,
	captureOrder,
} = require("../controllers/paypal.controller");

const { createPayment } = require("../controllers/square.controller");

const { createInvoice } = require("../controllers/payment.controller");

const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

// Open Routes
router.post("/auth/login", login);
router.get("/roles", roles);

// Protected Routes

// Agent Routes
router.post("/create-agent", authenticate, createAgents);
router.post("/get-agents", authenticate, getAgents);
router.post("/get-agents-by-name", authenticate, getAgentsByName);
router.post("/get-agent", authenticate, getAgentById);
router.post("/update-agent", authenticate, updateAgent);
router.post("/delete-agent", authenticate, deleteAgent);
router.post("/asign-new-agent", authenticate, assignNewAgent);

// Lead Routes
router.post("/create-lead", authenticate, createLead);
router.post("/get-leads", authenticate, getAllLeads);
router.post("/get-lead", authenticate, getLeadById);
router.post(
	"/get-leads-history-by-trackingId",
	authenticate,
	getLeadByTrackingId
);
router.post("/update-lead", authenticate, updateLead);
router.post("/delete-lead", authenticate, deleteLead);
router.post("/reject-lead", authenticate, rejectLead);
router.post("/add-followup", authenticate, addFollowup);
router.post("/add-shipment", authenticate, addShippingDetails);
router.post("/add-tickets", authenticate, addTickets);
router.post("/get-tickets", authenticate, getAllTickets);
router.post("/get-ticket-details", authenticate, getTicketDetails);

// Vendor Routes
router.post("/create-vendor", authenticate, createVendor);
router.post("/get-vendors", authenticate, getAllVendors);
router.post("/get-vendor", authenticate, getVendorById);
router.post("/update-vendor", authenticate, updateVendor);
router.post("/delete-vendor", authenticate, deleteVendor);

// Master Routes
router.post("/click-to-call", authenticate, initiateCall);
router.get("/fetch-call-recording", fetchCallRecordings);
router.post("/get-payment-amount", getPaymentAmount);

// Quotation Routes
router.post("/create-quotations", authenticate, createQuotation);
router.post("/get-quotations", authenticate, getQuotations);
router.post("/get-quotations-history", authenticate, getQuotationsHistory);

// Stripe Routes
router.post("/create-stripe-payment-intent", createStripePaymentIntent);

// Paypal Routes
router.post("/paypal-create-order", createOrder);
router.post("/paypal-capture-order", captureOrder);

// Square Routes
router.post("/square-create-payment", createPayment);

// Invoice Routes
router.post("/create-invoice", createInvoice);

router.post("/auth-document-upload", authDocumentUpload);

module.exports = router;
