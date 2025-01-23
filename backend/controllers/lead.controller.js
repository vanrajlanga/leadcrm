const { Lead, Agent, Note, Ticket } = require("../models");
const multer = require("multer");
const moment = require("moment");
const {
	S3Client,
	PutObjectCommand,
	DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

// Configure AWS S3 Client
const s3Client =
	process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
		? new S3Client({
				region: process.env.AWS_REGION || "us-east-1",
				credentials: {
					accessKeyId: process.env.AWS_ACCESS_KEY_ID,
					secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
				},
		  })
		: null;

// Configure Multer
const upload = multer({
	storage: multer.memoryStorage(),
});

// Assign agent according to round robin
const assignAgent = async () => {
	const agents = await Agent.findAll({ attributes: ["id"] });
	if (agents.length === 0) {
		throw new Error("No agents available");
	}

	const lastLead = await Lead.findOne({
		order: [["createdAt", "DESC"]],
		attributes: ["agent_id"],
	});

	let nextAgentIndex = 0;
	if (lastLead && lastLead.agent_id) {
		const lastAgentIndex = agents.findIndex(
			(agent) => agent.id === lastLead.agent_id
		);
		nextAgentIndex = (lastAgentIndex + 1) % agents.length;
	}

	return agents[nextAgentIndex].id;
};

// Create a new lead
const createLead = async (req, res) => {
	upload.single("recordAudio")(req, res, async (err) => {
		if (err) {
			return res
				.status(400)
				.send({ error: "File upload failed", details: err });
		}

		try {
			let recordAudioUrl = null;

			// Check if AWS S3 configuration is present
			if (s3Client && process.env.AWS_BUCKET_NAME) {
				const uploadToS3 = async (fileBuffer, filename) => {
					const datetime = moment().format("MM-DD-YYYY-hh-mm-ss");
					const key = `leadRecordAudio/${filename}-${datetime}`;
					const uploadParams = {
						Bucket: process.env.AWS_BUCKET_NAME,
						Key: key,
						Body: fileBuffer,
						ACL: "public-read",
					};
					await s3Client.send(new PutObjectCommand(uploadParams));
					return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;
				};

				// Upload the audio file to S3
				if (req.file) {
					recordAudioUrl = await uploadToS3(req.file.buffer, "record-audio");
				}
			}

			// Generate trackingId
			const generateTrackingId = async () => {
				const lastLead = await Lead.findOne({
					order: [["createdAt", "DESC"]],
					attributes: ["trackingId"],
				});

				if (!lastLead || !lastLead.trackingId) {
					return "TR000001";
				}

				const lastTrackingId = lastLead.trackingId;
				const numericPart = parseInt(lastTrackingId.slice(2), 10);
				const newTrackingId = `TR${String(numericPart + 1).padStart(6, "0")}`;

				return newTrackingId;
			};

			const agentId = await assignAgent();
			req.body.agent_id = agentId;

			const trackingId = await generateTrackingId();
			req.body.trackingId = trackingId;

			// Create the lead
			const newLead = await Lead.create({
				...req.body,
				recordAudio: recordAudioUrl,
			});

			res.status(201).send({
				message: "Lead created successfully.",
				data: newLead,
			});
		} catch (error) {
			console.error("Error creating lead:", error);
			res.status(400).send({ error: "Lead creation failed", details: error });
		}
	});
};

// Read all leads
const getAllLeads = async (req, res) => {
	try {
		const leads = await Lead.findAll({
			include: [
				{
					model: Agent,
					as: "agent",
					attributes: ["firstName", "lastName"],
				},
			],
		});

		const formattedLeads = leads.map((lead) => ({
			...lead.toJSON(),
			agent: lead.agent
				? `${lead.agent.firstName} ${lead.agent.lastName}`
				: null,
		}));

		res.status(200).send(formattedLeads);
	} catch (error) {
		console.error("Error fetching leads:", error);
		res.status(500).send({ error: "Failed to fetch leads" });
	}
};

// Read a single lead
const getLeadById = async (req, res) => {
	try {
		const lead = await Lead.findByPk(req.body.id);

		if (!lead) {
			return res.status(404).send({ error: "Lead not found" });
		}

		res.status(200).send(lead);
	} catch (error) {
		console.error("Error fetching lead:", error);
		res.status(500).send({ error: "Failed to fetch lead" });
	}
};

const getLeadByTrackingId = async (req, res) => {
	try {
		const lead = await Lead.findAll({
			include: [
				{
					model: Agent,
					as: "agent",
					attributes: ["firstName", "lastName"],
				},
			],
			where: {
				trackingId: req.body.trackingId,
			},
		});

		if (!lead) {
			return res.status(404).send({ error: "Lead not found" });
		}

		res.status(200).send(lead);
	} catch (error) {
		console.error("Error fetching lead:", error);
		res.status(500).send({ error: "Failed to fetch lead" });
	}
};

// Update a lead
const updateLead = async (req, res) => {
	upload.single("recordAudio")(req, res, async (err) => {
		if (err) {
			return res
				.status(400)
				.send({ error: "File upload failed", details: err });
		}

		try {
			console.log("req.body", req.body);
			const lead = await Lead.findByPk(req.body.id);
			if (!lead) {
				return res.status(404).send({ error: "Lead not found" });
			}

			let recordAudioUrl = req.body.recordAudio;

			// Check if AWS S3 configuration is present
			if (s3Client && process.env.AWS_BUCKET_NAME) {
				const uploadToS3 = async (fileBuffer, filename) => {
					const datetime = moment().format("MM-DD-YYYY-hh-mm-ss");
					const key = `${filename}-${datetime}`;
					const uploadParams = {
						Bucket: process.env.AWS_BUCKET_NAME,
						Key: key,
						Body: fileBuffer,
						ACL: "public-read",
					};
					await s3Client.send(new PutObjectCommand(uploadParams));
					return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;
				};

				// Upload the audio file to S3 if present
				if (req.file) {
					recordAudioUrl = await uploadToS3(req.file.buffer, "record-audio");
				}
			}

			// Update the lead
			await lead.update({ ...req.body, recordAudio: recordAudioUrl });

			res.status(200).send(lead);
		} catch (error) {
			console.error("Error updating lead:", error);
			res.status(400).send({ error: "Failed to update lead", details: error });
		}
	});
};

// Delete a lead
const deleteLead = async (req, res) => {
	try {
		const lead = await Lead.findByPk(req.body.id);

		if (!lead) {
			return res.status(404).send({ error: "Lead not found" });
		}

		// Delete audio file from S3 if it exists
		if (s3Client && process.env.AWS_BUCKET_NAME && lead.recordAudio) {
			const deleteFromS3 = async (fileUrl) => {
				const key = fileUrl.split(
					`${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/`
				)[1];
				const deleteParams = {
					Bucket: process.env.AWS_BUCKET_NAME,
					Key: key,
				};
				await s3Client.send(new DeleteObjectCommand(deleteParams));
			};

			await deleteFromS3(lead.recordAudio);
		}

		// Delete the lead
		await lead.destroy();

		res.status(200).send({ message: "Lead deleted successfully" });
	} catch (error) {
		console.error("Error deleting lead:", error);
		res.status(500).send({ error: "Failed to delete lead" });
	}
};

const rejectLead = async (req, res) => {
	try {
		const lead = await Lead.findByPk(req.body.lead_id);

		if (!lead) {
			return res.status(404).send({ error: "Lead not found" });
		}

		// Update the lead status to Rejected
		await lead.update({ status: "Rejected" });

		res.status(200).send({ message: "Lead rejected successfully" });
	} catch (error) {
		console.error("Error rejecting lead:", error);
		res.status(500).send({ error: "Failed to reject lead" });
	}
};

const addFollowup = async (req, res) => {
	try {
		const lead = await Lead.findByPk(req.body.lead_id);

		if (!lead) {
			return res.status(404).send({ error: "Lead not found" });
		}

		await lead.update({ followup_date: req.body.followupDate });

		res.status(200).send({ message: "Follow-up added successfully" });
	} catch (error) {
		console.error("Error adding follow-up:", error);
		res.status(500).send({ error: "Failed to add follow-up" });
	}
};

const addShippingDetails = async (req, res) => {
	try {
		const lead = await Lead.findByPk(req.body.lead_id);

		if (!lead) {
			return res.status(404).send({ error: "Lead not found" });
		}

		await lead.update({
			trackingLink: req.body.tracking_link,
			status: "Shipped",
		});

		if( req.body.notes != null) {
			await Note.create({
				lead_id: req.body.lead_id,
				content: req.body.notes,
			});
		}

		res.status(200).send({ message: "Shipping details added successfully" });
	} catch (error) {
		console.error("Error adding shipping details:", error);
		res.status(500).send({ error: "Failed to add shipping details" });
	}
};

const addTickets = async (req, res) => {
	try {
		const lead = await Lead.findByPk(req.body.lead_id);

		if (!lead) {
			return res.status(404).send({ error: "Lead not found" });
		}

		await Ticket.create({
			lead_id: req.body.lead_id,
			agent_id: req.body.agent_id,
			status: "Open",
			description: req.body.issue,
			priority: "medium",
		});

		res.status(200).send({ message: "Tickets added successfully" });
	} catch (error) {
		console.error("Error adding tickets:", error);
		res.status(500).send({ error: "Failed to add tickets" });
	}
};

const getAllTickets = async (req, res) => {
	try {
		const tickets = await Ticket.findAll({
			include: [
				{
					model: Agent,
					as: "agent",
					attributes: ["firstName", "lastName"],
				},
				{
					model: Lead,
					as: "lead",
					attributes: ["name", "phone", "email", "parts"],
				},
			],
			order: [["createdAt", "DESC"]],
		});

		const formattedTickets = tickets.map((ticket) => ({
			...ticket.toJSON(),
			agent: ticket.agent
				? `${ticket.agent.firstName} ${ticket.agent.lastName}`
				: null,
		}));

		res.status(200).send(formattedTickets);
	} catch (error) {
		console.error("Error getting tickets:", error);
		res.status(500).send({ error: "Failed to get tickets" });
	}
};

const getTicketDetails = async (req, res) => {
	try {
		const ticket = await Ticket.findByPk(req.body.ticketId);

		if (!ticket) {
			return res.status(404).send({ error: "Ticket not found" });
		}

		res.status(200).send(ticket.description);
	} catch (error) {
		console.error("Error getting ticket details:", error);
		res.status(500).send({ error: "Failed to get ticket details" });
	}
};

module.exports = {
	createLead,
	getAllLeads,
	getLeadById,
	getLeadByTrackingId,
	updateLead,
	deleteLead,
	rejectLead,
	addFollowup,
	addShippingDetails,
	addTickets,
	getAllTickets,
	getTicketDetails,
};
