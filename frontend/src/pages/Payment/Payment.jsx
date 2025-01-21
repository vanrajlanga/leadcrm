import React, { useState, useEffect } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
	Elements,
	CardElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";
import { useParams } from "react-router-dom";
import "./Payment.css";

// Load Stripe
const stripePromise = loadStripe(
	"pk_test_51QiWfwGhoHV44LJXCKFxDubJBAO1yseyVTz4Lvu0flAYyBA9BEoy9Mv38ft2InhB2ndXEkXEpFUlBmguZ05z8r1000DtCkxtvx"
);

// API Base URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

const PaymentPage = () => {
	const [paymentMethod, setPaymentMethod] = useState("stripe");
	const [checkoutDetails, setCheckoutDetails] = useState(null);
	const [message, setMessage] = useState("");
	const { payment_token } = useParams();

	useEffect(() => {
		const fetchCheckoutDetails = async () => {
			if (payment_token) {
				try {
					const response = await axios.post(`${API_URL}/get-payment-amount`, {
						payment_token,
					});
					setCheckoutDetails(response.data);
				} catch (error) {
					console.error("Error fetching checkout details:", error);
					setMessage("Failed to fetch checkout details.");
				}
			} else {
				setMessage("Payment token is missing.");
			}
		};
		fetchCheckoutDetails();
	}, [payment_token]);

	if (!checkoutDetails) {
		return <div className="payment-container">Loading...</div>;
	}

	const {
		product_name,
		quote_details,
		product_price,
		discount,
		tax,
		shipping,
		selling_price,
	} = checkoutDetails;

	// Stripe Payment Component
	const StripePayment = () => {
		const stripe = useStripe();
		const elements = useElements();
		const [loading, setLoading] = useState(false);

		const handleStripePayment = async (e) => {
			e.preventDefault();
			if (!stripe || !elements) return;

			const card = elements.getElement(CardElement);

			try {
				setLoading(true);

				const response = await axios.post(
					`${API_URL}/create-stripe-payment-intent`,
					{ amount: selling_price }
				);

				const clientSecret = response.data.clientSecret;

				const { error } = await stripe.confirmCardPayment(clientSecret, {
					payment_method: { card },
				});

				if (error) throw error;

				setMessage("Stripe Payment Successful!");
			} catch (err) {
				console.error(err);
				setMessage("Stripe Payment Failed!");
			} finally {
				setLoading(false);
			}
		};

		return (
			<form onSubmit={handleStripePayment} className="payment-form">
				<CardElement className="card-element" />
				<button
					type="submit"
					disabled={!stripe || loading}
					className="payment-button mt-5"
				>
					{loading ? "Processing..." : "Pay with Stripe"}
				</button>
			</form>
		);
	};

	// PayPal Payment Component
	const PayPalPayment = () => {
		const createOrder = async () => {
			try {
				const response = await axios.post(`${API_URL}/paypal-create-order`, {
					amount: selling_price,
				});
				return response.data.id;
			} catch (err) {
				console.error("Error creating PayPal order:", err);
				setMessage("Failed to create PayPal order.");
				return null;
			}
		};

		const onApprove = async (data) => {
			try {
				const response = await axios.post(`${API_URL}/paypal-capture-order`, {
					orderID: data.orderID,
				});
				setMessage("PayPal Payment Successful!");
			} catch (err) {
				console.error("Error capturing PayPal order:", err);
				setMessage("Failed to capture PayPal payment.");
			}
		};

		return (
			<PayPalScriptProvider
				options={{
					"client-id":
						"AZwg2Xa4qMqXRKQSMxkROq-UTqy-Bw8olq59DVQ12SCjBHTdthvgWTC5maSNJTDZ0-We8CS_hQtRxgyw",
				}}
			>
				<PayPalButtons
					style={{ layout: "vertical" }}
					createOrder={createOrder}
					onApprove={onApprove}
					onError={(err) => {
						console.error("PayPal Error:", err);
						setMessage("PayPal Payment Failed!");
					}}
				/>
			</PayPalScriptProvider>
		);
	};

	// Square Payment Component
	const SquarePayment = () => {
		return (
			<PaymentForm
				applicationId="sandbox-sq0idb-V8zH7qs0V4r1urwSsoqeCg"
				locationId="LTDR108RDSD0Y"
				cardTokenizeResponseReceived={async (token) => {
					try {
						const response = await axios.post(
							`${API_URL}/square/create-payment`,
							{
								sourceId: token.token,
								amount: selling_price,
							}
						);

						if (response.data.success) {
							setMessage("Square Payment Successful!");
						} else {
							setMessage("Square Payment Failed!");
						}
					} catch (error) {
						console.error("Square Payment Error:", error);
						setMessage("Square Payment Failed!");
					}
				}}
				createPaymentRequest={() => ({
					countryCode: "US",
					currencyCode: "USD",
					total: {
						amount: selling_price,
						label: "Total",
					},
				})}
			>
				<CreditCard />
			</PaymentForm>
		);
	};

	return (
		<div className="payment-container">
			<div className="payment-header">
				<img
					src="https://www.autopartsvroom.com/logo/AUTO%20PARTS%20VROOM%20final.png"
					alt="Company Logo"
					className="company-logo"
				/>
			</div>

			<h2 className="payment-title">Checkout</h2>

			<div className="checkout-summary">
				<h3>Order Summary</h3>
				<p>
					<strong>Product:</strong> {product_name}
				</p>
				<p>
					<strong>Details:</strong> {quote_details}
				</p>
				<p>
					<strong>Price:</strong> ${product_price}
				</p>
				<p>
					<strong>Discount:</strong> -${discount}
				</p>
				<p>
					<strong>Tax:</strong> +${tax}
				</p>
				<p>
					<strong>Shipping:</strong> +${shipping}
				</p>
				<hr />
				<p className="total-price">
					<strong>Total:</strong> ${selling_price}
				</p>
			</div>

			<div className="payment-methods">
				<label className="payment-option">
					<input
						type="radio"
						name="paymentMethod"
						value="stripe"
						checked={paymentMethod === "stripe"}
						onChange={(e) => setPaymentMethod(e.target.value)}
					/>
					Stripe
				</label>
				<label className="payment-option">
					<input
						type="radio"
						name="paymentMethod"
						value="paypal"
						checked={paymentMethod === "paypal"}
						onChange={(e) => setPaymentMethod(e.target.value)}
					/>
					PayPal
				</label>
				<label className="payment-option">
					<input
						type="radio"
						name="paymentMethod"
						value="square"
						checked={paymentMethod === "square"}
						onChange={(e) => setPaymentMethod(e.target.value)}
					/>
					Square
				</label>
			</div>

			<div className="payment-content">
				{paymentMethod === "stripe" && (
					<Elements stripe={stripePromise}>
						<StripePayment />
					</Elements>
				)}

				{paymentMethod === "paypal" && <PayPalPayment />}

				{paymentMethod === "square" && <SquarePayment />}
			</div>

			{message && (
				<div
					className={`payment-message ${
						message.includes("Successful") ? "success" : "error"
					}`}
				>
					{message}
				</div>
			)}
		</div>
	);
};

export default PaymentPage;
