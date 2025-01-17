const { Quote } = require("../models");
const axios = require('axios');
const crypto = require('crypto');

// Create a new vendor
const createQuotation = async (req, res) => {
	try {
		// Create the vendor
		const newQuotation = await Quote.create({
			...req.body,
		});

        const generateRandomString = (length) => {
            return crypto.randomBytes(length).toString('hex').slice(0, length);
        };

        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI5Nzk2LCJpc3MiOiJodHRwczpcL1wvc2VydmljZS5hY2Vmb25lLmNvLnVrXC90b2tlblwvZ2VuZXJhdGUiLCJpYXQiOjE3MzcxMTkxMDEsImV4cCI6MjAzNzExOTEwMSwibmJmIjoxNzM3MTE5MTAxLCJqdGkiOiJBOGgwbWw0VU5vN3dCUnpEIn0.8n-b7apGIM_t7ZTbTSouRiafEAx26QdyK1nIN4qOkzo';

		const response = await axios.post('https://api.acefone.co.uk/v1/sms/send', {
			message: 'This is test message',
			from_number: '15859029632',
			to_number: req.body.to_number,
			reference: generateRandomString(16),
		}, { headers: { Authorization: `${token}`, "Content-Type": "application/json" } });

		if (response.status === 200) {
			res.status(201).json({
				message: "Quotation created successfully.",
				data: req.body,
			});
		} else {
			console.error("Error sending SMS:", response.data);
			res.status(422).json({
				message: "Failed to send SMS.",
				error: response.data,
			});
		}
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
