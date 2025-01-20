const { Quote } = require("../models");
const axios = require("axios");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Create a new vendor
const createQuotation = async (req, res) => {
	try {
		// Create the vendor
		const newQuotation = await Quote.create({
			...req.body,
		});

		const generateRandomString = (length) => {
			return crypto.randomBytes(length).toString("hex").slice(0, length);
		};

		// const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI5Nzk2LCJpc3MiOiJodHRwczpcL1wvc2VydmljZS5hY2Vmb25lLmNvLnVrXC90b2tlblwvZ2VuZXJhdGUiLCJpYXQiOjE3MzcxMTkxMDEsImV4cCI6MjAzNzExOTEwMSwibmJmIjoxNzM3MTE5MTAxLCJqdGkiOiJBOGgwbWw0VU5vN3dCUnpEIn0.8n-b7apGIM_t7ZTbTSouRiafEAx26QdyK1nIN4qOkzo';

		// const response = await axios.post('https://api.acefone.co.uk/v1/sms/send', {
		// 	message: 'This is test message',
		// 	from_number: '15859029632',
		// 	to_number: req.body.to_number,
		// 	reference: generateRandomString(16),
		// }, { headers: { Authorization: `${token}`, "Content-Type": "application/json" } });

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
			to: "echintangohil@gmail.com",
			subject: "Quotation Details",
			html: `
			<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
				<div style="text-align: center; background-color: #f8f9fa; padding: 20px; border-bottom: 2px solid #ddd;">
					<h1 style="margin: 0; color: #4CAF50;">Your Company</h1>
					<p style="margin: 0; font-size: 14px;">Quotation Details</p>
				</div>
				<div style="padding: 20px;">
					<p>Dear Customer,</p>
					<p>Thank you for your interest. Please find your quotation details below:</p>
					<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
						<tr style="background-color: #f2f2f2;">
							<th style="text-align: left; padding: 10px; border: 1px solid #ddd;">Lead ID</th>
							<td style="padding: 10px; border: 1px solid #ddd;">${req.body.lead_id}</td>
						</tr>
						<tr>
							<th style="text-align: left; padding: 10px; border: 1px solid #ddd;">Product Name</th>
							<td style="padding: 10px; border: 1px solid #ddd;">${req.body.product_name}</td>
						</tr>
						<tr style="background-color: #f2f2f2;">
							<th style="text-align: left; padding: 10px; border: 1px solid #ddd;">Product Price</th>
							<td style="padding: 10px; border: 1px solid #ddd;">$${req.body.product_price}</td>
						</tr>
						<tr>
							<th style="text-align: left; padding: 10px; border: 1px solid #ddd;">Quote Details</th>
							<td style="padding: 10px; border: 1px solid #ddd;">${req.body.quote_details}</td>
						</tr>
						<tr style="background-color: #f2f2f2;">
							<th style="text-align: left; padding: 10px; border: 1px solid #ddd;">Discount</th>
							<td style="padding: 10px; border: 1px solid #ddd;">${req.body.discount}%</td>
						</tr>
						<tr>
							<th style="text-align: left; padding: 10px; border: 1px solid #ddd;">Shipping</th>
							<td style="padding: 10px; border: 1px solid #ddd;">$${req.body.shipping}</td>
						</tr>
						<tr style="background-color: #f2f2f2;">
							<th style="text-align: left; padding: 10px; border: 1px solid #ddd;">Tax</th>
							<td style="padding: 10px; border: 1px solid #ddd;">$${req.body.tax}</td>
						</tr>
						<tr>
							<th style="text-align: left; padding: 10px; border: 1px solid #ddd;">Total Selling Price</th>
							<td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">$${req.body.selling_price}</td>
						</tr>
					</table>
					<p>You can make a payment using the following link:</p>
					<p style="text-align: center; margin: 20px 0;">
						<a href="https://payment.example.com/pay?quoteId=${req.body.quote_id}" 
						   style="background-color: #4CAF50; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px;">
						   Pay Now
						</a>
					</p>
					<p>Best regards,</p>
					<p>Your Company</p>
				</div>
				<div style="text-align: center; padding: 10px; background-color: #f8f9fa; border-top: 2px solid #ddd;">
					<p style="font-size: 12px; margin: 0;">Your Company Address | Phone: +123-456-7890 | Email: info@yourcompany.com</p>
				</div>
			</div>
			`,
		};

		const response = await transporter.sendMail(mailOptions);

		// if (response.status === 200) {
		// 	res.status(201).json({
		// 		message: "Quotation created successfully.",
		// 		data: req.body,
		// 	});
		// } else {
		// 	console.error("Error sending SMS:", response.data);
		// 	res.status(422).json({
		// 		message: "Failed to send SMS.",
		// 		error: response.data,
		// 	});
		// }
	} catch (error) {
		console.error("Error creating quotation:", error);
		res.status(500).json({
			message: "Failed to create quotation.",
			error: error,
		});
	}
};

module.exports = {
	createQuotation,
};
