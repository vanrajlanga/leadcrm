const { Client, Environment } = require("square");
require("dotenv").config();

// Configure Square client
const squareClient = new Client({
	environment: Environment.Sandbox, // Use `Environment.Production` for live
	accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

// Create a payment
const createPayment = async (req, res) => {
	const { amount } = req.body;

	try {
		const idempotencyKey = `${Date.now()}-${Math.random()}`;
		const paymentsApi = squareClient.paymentsApi;

		const paymentResponse = await paymentsApi.createPayment({
			sourceId: "cnon:card-nonce-ok", // Replace with the card nonce generated on the frontend
			idempotencyKey,
			amountMoney: {
				amount: amount, // Convert to smallest currency unit
				currency: "USD",
			},
		});

		res
			.status(200)
			.json({ success: true, payment: paymentResponse.result.payment });
	} catch (error) {
		console.error("Error creating Square payment:", error);
		res.status(500).json({ success: false, error: error.message });
	}
};

module.exports = { createPayment };
