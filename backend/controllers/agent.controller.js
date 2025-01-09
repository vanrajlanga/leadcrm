const { Agent, User, UserRole } = require("../models");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const moment = require("moment");
const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

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
				user_id: user.id, // Include the user ID in the agent record
				aadharCard: aadharCardUrl,
				panCard: panCardUrl,
				bankPassbook: bankPassbookUrl,
			};

			const agent = await Agent.create(agentData);

			// Send an email to the user
			const transporter = nodemailer.createTransport({
				host: "smtp-relay.brevo.com",
				port: 587,
				secure: false, // true for 465, false for other ports
				auth: {
					user: process.env.SMTP_USER,
					pass: process.env.SMTP_PASS,
				},
			});

			const mailOptions = {
				from: process.env.SMTP_USER,
				to: user.email,
				subject: "Your Account Password",
				text: `Hello ${user.firstName},\n\nYour account has been created. Your password is: ${password}\n\nPlease change your password after logging in.`,
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

module.exports = {
	createAgents,
};
