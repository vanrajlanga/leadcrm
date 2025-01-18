const paypal = require("@paypal/checkout-server-sdk");
require("dotenv").config();

// Configure PayPal environment
const environment = new paypal.core.SandboxEnvironment(
	process.env.PAYPAL_CLIENT_ID,
	process.env.PAYPAL_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);

// Create PayPal Order
const createOrder = async (req, res) => {
	const { amount, currency = "USD" } = req.body;

	const request = new paypal.orders.OrdersCreateRequest();
	request.prefer("return=representation");
	request.requestBody({
		intent: "CAPTURE",
		purchase_units: [
			{
				amount: {
					currency_code: currency,
					value: amount,
				},
			},
		],
	});

	try {
		const order = await client.execute(request);
		res.status(200).json({ id: order.result.id });
	} catch (err) {
		console.error("Error creating PayPal order:", err);
		res.status(500).json({ error: "Error creating PayPal order" });
	}
};

// Capture PayPal Order
const captureOrder = async (req, res) => {
	const { orderID } = req.body;

	const request = new paypal.orders.OrdersCaptureRequest(orderID);
	request.requestBody({});

	try {
		const capture = await client.execute(request);
		res.status(200).json(capture.result);
	} catch (err) {
		console.error("Error capturing PayPal order:", err);
		res.status(500).json({ error: "Error capturing PayPal order" });
	}
};

module.exports = { createOrder, captureOrder };
