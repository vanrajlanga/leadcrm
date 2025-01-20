const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const axios = require("axios");
const CallLog = require("../models/callLog.model");
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
			call_id: response.data.call_id,
			call_status: "initiated",
			destination_number,
			start_time: new Date(),
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

// Hangup Call
const hangupCall = async (req, res) => {
	const { call_id } = req.body;

	if (!call_id) {
		return res.status(400).json({
			success: false,
			message: "Missing required field: call_id",
		});
	}

	try {
		// Make API call to hang up
		const token = await getAcefoneToken();
		await axios.post(
			"https://api.acefone.co.uk/v1/call/hangup",
			{ call_id },
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			}
		);

		// Update log
		const log = await CallLog.findOne({ where: { call_id } });
		if (log) {
			log.call_status = "completed";
			log.end_time = new Date();
			log.duration = Math.floor((new Date() - log.start_time) / 1000); // Calculate duration in seconds
			await log.save();
		}

		res
			.status(200)
			.json({ success: true, message: "Call successfully hung up" });
	} catch (error) {
		console.error("Error hanging up the call:", error.message);
		res.status(500).json({ success: false, message: "Failed to hang up call" });
	}
};

// Fetch Call Recordings and Upload to S3
const fetchCallRecordings = async (req, res) => {
	try {
		// Generate token and make API call
		const token = await getAcefoneToken();

		// Fetch recordings from Acefone
		const response = await axios.get(
			"https://api.acefone.co.uk/v1/recordings",
			{
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: "application/json",
				},
			}
		);
		console.log("response", response);
		const recordings = response.data.recordings; // Adjust based on API response structure
		if (!recordings || recordings.length === 0) {
			return res.status(200).json({
				success: true,
				message: "No recordings found.",
			});
		}

		// Process each recording
		for (const recording of recordings) {
			// Download the recording file
			const recordingResponse = await axios.get(recording.url, {
				responseType: "arraybuffer",
			});

			// Prepare the S3 upload command
			const fileName = `recordings/${recording.call_id}_${Date.now()}.mp3`; // Customize file naming
			const uploadParams = {
				Bucket: process.env.AWS_S3_BUCKET_NAME,
				Key: fileName,
				Body: recordingResponse.data,
				ContentType: "audio/mpeg",
			};

			// Upload to S3
			await s3Client.send(new PutObjectCommand(uploadParams));

			// Update CallLog with S3 URL
			await CallLog.update(
				{ recording_url: `s3://${process.env.AWS_S3_BUCKET_NAME}/${fileName}` },
				{ where: { call_id: recording.call_id } }
			);
		}

		res.status(200).json({
			success: true,
			message: "Recordings fetched and uploaded to S3 successfully.",
		});
	} catch (error) {
		console.error("Error fetching and uploading recordings:", error.message);
		res.status(500).json({
			success: false,
			message: "Failed to fetch and upload recordings.",
		});
	}
};

module.exports = {
	initiateCall,
	hangupCall,
	fetchCallRecordings,
};
