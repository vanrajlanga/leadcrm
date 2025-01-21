const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const axios = require("axios");
const { CallLog, Quote } = require("../models");
const { Op } = require("sequelize");

// Acefone Token Variables
let acefoneToken = null;
let tokenExpiryTime = null;

// S3 Client Configuration
const s3Client = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

// Generate Acefone Token
const generateToken = async () => {
	const url = "https://api.acefone.co.uk/v1/auth/login";

	try {
		const response = await axios.post(
			url,
			{
				login_id: "digvijay.singh@autopartsvroom.com",
				password: "SAM@bittu1980",
			},
			{
				headers: { "Content-Type": "application/json" },
			}
		);

		acefoneToken = response.data.access_token;
		tokenExpiryTime = Date.now() + response.data.expires_in * 1000; // Set token expiry time
	} catch (error) {
		console.error("Error generating Acefone token:", error.message);
		throw new Error("Failed to generate token");
	}
};

// Retrieve a valid Acefone Token
const getAcefoneToken = async () => {
	if (!acefoneToken || Date.now() > tokenExpiryTime) {
		await generateToken();
	}
	return acefoneToken;
};

// Initiate Click-to-Call
const initiateCall = async (req, res) => {
	const { lead_id, agent_id, destination_number, caller_id } = req.body;

	if (!lead_id || !agent_id || !destination_number) {
		return res.status(400).json({
			success: false,
			message: "Missing required fields: lead_id, agent_id, destination_number",
		});
	}

	try {
		// Generate token and make API call
		const token = await getAcefoneToken();
		const response = await axios.post(
			"https://api.acefone.co.uk/v1/click_to_call",
			{
				agent_number: agent_id,
				destination_number,
				caller_id,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			}
		);

		// Log the call
		const newLog = await CallLog.create({
			lead_id,
			agent_id,
			destination_number,
		});

		res.status(200).json({
			success: true,
			message: "Call successfully initiated",
			log: newLog,
		});
	} catch (error) {
		console.error("Error initiating call:", error.message);
		res
			.status(500)
			.json({ success: false, message: "Failed to initiate call" });
	}
};

// Fetch Call Recordings and Upload to S3
const fetchCallRecordings = async () => {
	try {
		console.log("Starting cron job to fetch call recordings...");
		const token = await getAcefoneToken();

		// Fetch call report from Acefone
		const response = await axios.get(
			"https://api.acefone.co.uk/v1/call_report",
			{
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: "application/json",
				},
			}
		);

		const callData = response.data.data;
		if (!callData || callData.length === 0) {
			console.log("No call data found.");
			return;
		}

		for (const call of callData) {
			const { id, recording_file_link } = call;
			if (recording_file_link) {
				// Download the recording file
				const recordingResponse = await axios.get(recording_file_link, {
					responseType: "arraybuffer",
				});

				// Prepare the S3 upload command
				const fileName = `recordings/${call.source}_${Date.now()}.mp3`;
				console.log("fileName", fileName);
				console.log("AWS_ACCESS_KEY_ID", process.env.AWS_ACCESS_KEY_ID);
				const uploadParams = {
					Bucket: process.env.AWS_BUCKET_NAME,
					Key: fileName,
					Body: recordingResponse.data,
					ContentType: "audio/mpeg",
				};

				// Upload to S3
				const data = await s3Client.send(new PutObjectCommand(uploadParams));
				if (data.$metadata.httpStatusCode === 200) {
					console.log(`File uploaded successfully: ${fileName}`);
				} else {
					console.error(`Failed to upload file: ${fileName}`);
				}

				// Update CallLog with S3 URL
				await CallLog.update(
					{
						recording_url: `s3://${process.env.AWS_BUCKET_NAME}/${fileName}`,
					},
					{
						where: {
							destination_number: call.destination,
							[Op.and]: Sequelize.where(fn("DATE", col("createdAt")), date),
						},
					}
				);
				console.log(`Recording for call ID ${id} uploaded successfully.`);
			} else {
				console.log(`No recording available for call ID: ${id}`);
			}
		}

		console.log("Call recordings processed successfully.");
	} catch (error) {
		console.error("Error in fetching and uploading recordings:", error.message);
	}
};

const getPaymentAmount = async (req, res) => {
	const payment_token = req.body.payment_token;

	if (!payment_token) {
		return res.status(400).json({
			success: false,
			message: "Missing required field: payment_token",
		});
	}

	try {
		const quote = await Quote.findOne({
			where: { payment_token },
		});

		if (!quote) {
			return res.status(404).json({
				success: false,
				message: "Quote not found",
			});
		}

		res.status(200).json(quote);
	} catch (error) {
		console.error("Error fetching quote:", error.message);
		res.status(500).json({
			success: false,
			message: "Failed to fetch quote",
		});
	}
};

module.exports = {
	initiateCall,
	fetchCallRecordings,
	getPaymentAmount,
};
