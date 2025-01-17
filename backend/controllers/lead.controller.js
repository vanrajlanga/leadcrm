const { Lead, Agent } = require("../models");
const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const moment = require("moment");

// Configure AWS S3
const s3Client = process.env.AWS_ACCESS_KEY_ID
	? new S3Client({
			region: process.env.AWS_REGION || "us-east-1",
			credentials: {
				accessKeyId: process.env.AWS_ACCESS_KEY_ID,
				secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
			},
	  })
	: null;

// Configure Multer for audio uploads
const upload = multer({
	storage: multer.memoryStorage(),
});

// Helper function to upload file to S3
const uploadToS3 = async (fileBuffer, fileName) => {
	const key = `${fileName}-${moment().format("MM-DD-YYYY-hh-mm-ss")}`;
	const params = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: key,
		Body: fileBuffer,
		ACL: "public-read",
	};

	await s3Client.send(new PutObjectCommand(params));
	return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;
};

// Create a new lead
const createLead = async (req, res) => {
	upload.single("recordAudio")(req, res, async (err) => {
		if (err) {
			return res
				.status(400)
				.json({ message: "Audio upload failed", error: err });
		}

		try {
			let recordAudioUrl = null;

			// Upload audio to S3 if present
			if (req.file && s3Client) {
				recordAudioUrl = await uploadToS3(req.file.buffer, "record-audio");
			}

			// Create the lead
			const newLead = await Lead.create({
				...req.body,
				recordAudio: recordAudioUrl,
			});

			res.status(201).json({
				message: "Lead created successfully.",
				data: newLead,
			});
		} catch (error) {
			console.error("Error creating lead:", error);
			res.status(500).json({
				message: "Failed to create lead.",
				error: error.message,
			});
		}
	});
};

// Get all leads
const getAllLeads = async (req, res) => {
	try {
		const leadsWithAgents = await Lead.findAll({
			include: [
				{
					model: Agent,
					as: "agent", // Specify the alias here
					attributes: ["firstName", "lastName"],
				},
			],
		});
		const leads = leadsWithAgents.map((lead) => ({
			...lead.toJSON(),
			agent: lead.agent
				? `${lead.agent.firstName} ${lead.agent.lastName}`
				: null,
		}));

		res.status(200).json(leads);
	} catch (error) {
		res.status(500).json({
			message: "Failed to fetch leads.",
			error: error.message,
		});
	}
};
// Get a single lead by ID
const getLeadById = async (req, res) => {
	const { id } = req.params;

	try {
		const lead = await Lead.findByPk(id);

		if (!lead) {
			return res.status(404).json({
				message: "Lead not found.",
			});
		}

		res.status(200).json({
			message: "Lead fetched successfully.",
			data: lead,
		});
	} catch (error) {
		console.error("Error fetching lead:", error);
		res.status(500).json({
			message: "Failed to fetch lead.",
			error: error.message,
		});
	}
};

// Update a lead by ID
const updateLead = async (req, res) => {
	upload.single("recordAudio")(req, res, async (err) => {
		if (err) {
			return res
				.status(400)
				.json({ message: "Audio upload failed", error: err });
		}

		const { id } = req.params;

		try {
			let recordAudioUrl = req.body.recordAudio;

			// Upload new audio to S3 if present
			if (req.file && s3Client) {
				recordAudioUrl = await uploadToS3(req.file.buffer, "record-audio");
			}

			// Update the lead
			const [updatedRowsCount] = await Lead.update(
				{ ...req.body, recordAudio: recordAudioUrl },
				{ where: { id } }
			);

			if (updatedRowsCount === 0) {
				return res.status(404).json({
					message: "Lead not found or no changes made.",
				});
			}

			const updatedLead = await Lead.findByPk(id);
			res.status(200).json({
				message: "Lead updated successfully.",
				data: updatedLead,
			});
		} catch (error) {
			console.error("Error updating lead:", error);
			res.status(500).json({
				message: "Failed to update lead.",
				error: error.message,
			});
		}
	});
};

// Delete a lead by ID
const deleteLead = async (req, res) => {
	const { id } = req.params;

	try {
		const deletedRowsCount = await Lead.destroy({
			where: { id },
		});

		if (deletedRowsCount === 0) {
			return res.status(404).json({
				message: "Lead not found.",
			});
		}

		res.status(200).json({
			message: "Lead deleted successfully.",
		});
	} catch (error) {
		console.error("Error deleting lead:", error);
		res.status(500).json({
			message: "Failed to delete lead.",
			error: error.message,
		});
	}
};

module.exports = {
	createLead,
	getAllLeads,
	getLeadById,
	updateLead,
	deleteLead,
};
