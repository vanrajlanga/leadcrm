const { Agent, User, UserRole } = require("../models");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const moment = require("moment");
const multer = require("multer");
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

// Create a new agent
const createAgents = async (req, res) => {
	upload.fields([
		{ name: "aadharCard", maxCount: 1 },
		{ name: "panCard", maxCount: 1 },
		{ name: "bankPassbook", maxCount: 1 },
	])(req, res, async (err) => {
		if (err) {
			return res
				.status(400)
				.send({ error: "File upload failed", details: err });
		}

		try {
			// Initialize file URLs
			let aadharCardUrl = null;
			let panCardUrl = null;
			let bankPassbookUrl = null;

			// Check if AWS S3 configuration is present
			if (s3Client && process.env.AWS_BUCKET_NAME) {
				const uploadToS3 = async (fileBuffer, filename) => {
					const datetime = moment().format("MM-DD-YYYY-hh-mm-a");
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

				// Upload files to S3
				if (req.files.aadharCard) {
					aadharCardUrl = await uploadToS3(
						req.files.aadharCard[0].buffer,
						"aadharCard"
					);
				}
				if (req.files.panCard) {
					panCardUrl = await uploadToS3(req.files.panCard[0].buffer, "panCard");
				}
				if (req.files.bankPassbook) {
					bankPassbookUrl = await uploadToS3(
						req.files.bankPassbook[0].buffer,
						"bankPassbook"
					);
				}
			}

			// Generate a random password for the user
			const password = crypto.randomBytes(8).toString("hex");
			const hashedPassword = await bcrypt.hash(password, 10);

			// Create the user
			const user = await User.create({
				name: req.body.firstName + " " + req.body.lastName,
				email: req.body.email,
				password: hashedPassword,
			});

			// Assign the role to the user
			await UserRole.create({
				user_id: user.id,
				role_id: req.body.role_id,
			});

			// Create the agent with the user ID
			const agentData = {
				...req.body,
				user_id: user.id,
				aadharCard: aadharCardUrl,
				panCard: panCardUrl,
				bankPassbook: bankPassbookUrl,
			};

			const agent = await Agent.create(agentData);

			// Send an email to the user
			const transporter = nodemailer.createTransport({
				host: "smtp-relay.brevo.com",
				port: 587,
				secure: false,
				auth: {
					user: process.env.SMTP_USER,
					pass: process.env.SMTP_PASS,
				},
			});

			const mailOptions = {
				from: process.env.SMTP_FROM_USER,
				to: user.email,
				subject: "Your Account Password",
				text: `Hello ${user.name},\n\nYour account has been created. Your password is: ${password}\n\nPlease change your password after logging in.`,
			};

			await transporter.sendMail(mailOptions);

			// Send a response to the client
			res.status(201).send(agent);
		} catch (error) {
			console.error("Error creating agent:", error);
			res.status(400).send({ error: "Agent creation failed", details: error });
		}
	});
};

// Read all agents
const getAgents = async (req, res) => {
	try {
		// res.status(200).send({ message: "Hello from the agent controller" });
		// Ensure the alias matches the one defined in your model association
		const agents = await Agent.findAll({
			include: [
				{
					model: User,
					as: "user", // Replace "user" with the alias defined in your association
				},
			],
		});
		res.status(200).send(agents);
	} catch (error) {
		console.error("Error fetching agents:", error);
		res.status(500).send({ error: "Failed to fetch agents" });
	}
};

// Read a single agent
const getAgentById = async (req, res) => {
	try {
		const agent = await Agent.findByPk(req.body.id, {
			include: [
				{
					model: User,
					as: "user", // Specify the alias defined in the association
				},
			],
		});

		if (!agent) {
			return res.status(404).send({ error: "Agent not found" });
		}

		res.status(200).send(agent);
	} catch (error) {
		console.error("Error fetching agent:", error);
		res.status(500).send({ error: "Failed to fetch agent" });
	}
};

// Update an agent
const updateAgent = async (req, res) => {
	try {
		const agent = await Agent.findByPk(req.body.id);
		if (!agent) {
			return res.status(404).send({ error: "Agent not found" });
		}

		await agent.update(req.body);
		res.status(200).send(agent);
	} catch (error) {
		console.error("Error updating agent:", error);
		res.status(500).send({ error: "Failed to update agent" });
	}
};

// Delete an agent
const deleteAgent = async (req, res) => {
	try {
		const agent = await Agent.findByPk(req.body.id);

		if (!agent) {
			return res.status(404).send({ error: "Agent not found" });
		}

		// Delete files from S3 if they exist
		if (s3Client && process.env.AWS_BUCKET_NAME) {
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

			if (agent.aadharCard) await deleteFromS3(agent.aadharCard);
			if (agent.panCard) await deleteFromS3(agent.panCard);
			if (agent.bankPassbook) await deleteFromS3(agent.bankPassbook);
		}

		// Delete the agent
		await agent.destroy();

		// Delete the user and user role
		await UserRole.destroy({ where: { user_id: agent.user_id } });
		await User.destroy({ where: { id: agent.user_id } });

		res.status(200).send({ message: "Agent deleted successfully" });
	} catch (error) {
		console.error("Error deleting agent:", error);
		res.status(500).send({ error: "Failed to delete agent" });
	}
};

module.exports = {
	createAgents,
	getAgents,
	getAgentById,
	updateAgent,
	deleteAgent,
};
