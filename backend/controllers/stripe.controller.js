const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createStripePaymentIntent = async (req, res) => {
	try {
		const { amount, currency = "usd" } = req.body;

		if (!amount) {
			return res.status(400).json({ error: "Amount is required." });
		}

		const paymentIntent = await stripe.paymentIntents.create({
			amount: Math.round(amount * 100), // Convert to smallest unit
			currency,
		});

		res.status(200).json({
			success: true,
			clientSecret: paymentIntent.client_secret,
		});
	} catch (error) {
		console.error("Error creating payment intent:", error);
		res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

module.exports = {
	createStripePaymentIntent,
};
