const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const axios = require("axios");
const CallLog = require("../models");
const cron = require("node-cron");
const { Sequelize, Op, fn, col } = require("sequelize");

// S3 Client Configuration
const s3Client = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

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
				const fileName = `recordings/${id}_${Date.now()}.mp3`;
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
					{
						recording_url: `s3://${process.env.AWS_S3_BUCKET_NAME}/${fileName}`,
					},
					{
						where: {
							destination_number: destination,
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

// Acefone Token Management
let acefoneToken = null;
let tokenExpiryTime = null;

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
		tokenExpiryTime = Date.now() + response.data.expires_in * 1000;
	} catch (error) {
		console.error("Error generating Acefone token:", error.message);
		throw new Error("Failed to generate token");
	}
};

const getAcefoneToken = async () => {
	if (!acefoneToken || Date.now() > tokenExpiryTime) {
		await generateToken();
	}
	return acefoneToken;
};

// Schedule the Cron Job
// This example runs the cron job every day at 1 AM (server time).
cron.schedule("0 1 * * *", async () => {
	await fetchCallRecordings();
	console.log("Cron job executed at", new Date());
});

console.log("Cron job scheduled to run daily at 1 AM.");
