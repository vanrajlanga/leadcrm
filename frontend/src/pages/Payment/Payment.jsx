import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
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

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const API_URL = import.meta.env.VITE_API_URL;

const PaymentPage = () => {
	const [paymentMethod, setPaymentMethod] = useState("stripe");
	const [checkoutDetails, setCheckoutDetails] = useState(null);
	const { payment_token } = useParams();
	const [paymentResponse, setPaymentResponse] = useState(null);
	const [step, setStep] = useState(1); // Step tracker
	const [documentName, setDocumentName] = useState("");
	const [documentFile, setDocumentFile] = useState(null);

	useEffect(() => {
		const fetchCheckoutDetails = async () => {
			try {
				const response = await axios.post(`${API_URL}/get-payment-amount`, {
					payment_token,
				});
				setCheckoutDetails(response.data);
			} catch (error) {
				console.error("Error fetching checkout details:", error);
				toast.error("Failed to fetch checkout details.");
			}
		};

		if (payment_token) fetchCheckoutDetails();
		else toast.error("Payment token is missing.");
	}, [payment_token]);

	if (!checkoutDetails) {
		return <div className="payment-container">Loading...</div>;
	}

	const {
		id,
		lead_id,
		product_name,
		quote_details,
		product_price,
		discount,
		tax,
		shipping,
		selling_price,
	} = checkoutDetails;

	const handleDocumentUpload = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("auth_document_type", documentName);
		formData.append("documentFile", documentFile);
		formData.append("payment_token", payment_token);
		formData.append("lead_id", lead_id);

		try {
			await axios.post(`${API_URL}/auth-document-upload`, formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			toast.success("Document uploaded successfully!");
			setStep(2); // Move to step 2
		} catch (error) {
			console.error("Error uploading document:", error);
			toast.error("Failed to upload document.");
		}
	};

	const generateInvoice = async () => {
		console.log("Generating invoice...", paymentResponse);
		await axios.post(`${API_URL}/create-invoice`, {
			leadId: lead_id,
			quoteId: id,
			amount: selling_price,
			paymentDate: new Date().toISOString(),
			paymentMethod: paymentMethod,
			paymentResponse: paymentResponse,
		});
	};

	const StripePayment = () => {
		const stripe = useStripe();
		const elements = useElements();
		const [loading, setLoading] = useState(false);

		const handleStripePayment = async (e) => {
			e.preventDefault();
			if (!stripe || !elements) return;

			const card = elements.getElement(CardElement);
			setLoading(true);

			try {
				const response = await axios.post(
					`${API_URL}/create-stripe-payment-intent`,
					{ amount: selling_price }
				);

				const clientSecret = response.data.clientSecret;
				const { error, paymentIntent } = await stripe.confirmCardPayment(
					clientSecret,
					{
						payment_method: { card },
					}
				);
				console.log("Payment Intent:", paymentIntent);
				if (paymentIntent.status === "succeeded") {
					setPaymentResponse(paymentIntent);
				}

				if (error) throw error;
				toast.success("Stripe Payment Successful!");
				await generateInvoice();
			} catch (err) {
				console.error(err);
				toast.error("Stripe Payment Failed!");
			} finally {
				setLoading(false);
			}
		};

		return (
			<form onSubmit={handleStripePayment} className="payment-form">
				<CardElement
					options={{
						hidePostalCode: true,
						style: {
							base: {
								fontSize: "16px",
								color: "#32325d",
								fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
								"::placeholder": {
									color: "#aab7c4",
								},
							},
							invalid: {
								color: "#fa755a",
								iconColor: "#fa755a",
							},
						},
					}}
					className="card-element"
				/>
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

	const PayPalPayment = () => {
		const createOrder = async () => {
			try {
				const response = await axios.post(`${API_URL}/paypal-create-order`, {
					amount: selling_price,
				});
				return response.data.id;
			} catch (err) {
				console.error(err);
				toast.error("Failed to create PayPal order.");
				return null;
			}
		};

		const onApprove = async (data) => {
			try {
				await axios.post(`${API_URL}/paypal-capture-order`, {
					orderID: data.orderID,
				});
				toast.success("PayPal Payment Successful!");
				generateInvoice();
			} catch (err) {
				console.error(err);
				toast.error("Failed to capture PayPal payment.");
			}
		};

		return (
			<PayPalScriptProvider
				options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}
			>
				<PayPalButtons
					style={{ layout: "vertical" }}
					createOrder={createOrder}
					onApprove={onApprove}
					onError={() => toast.error("PayPal Payment Failed!")}
				/>
			</PayPalScriptProvider>
		);
	};

	const SquarePayment = () => {
		return (
			<PaymentForm
				applicationId={import.meta.env.VITE_SQUARE_APPLICATION_ID}
				locationId={import.meta.env.VITE_SQUARE_LOCATIONID}
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
							toast.success("Square Payment Successful!");
							generateInvoice();
						} else {
							toast.error("Square Payment Failed!");
						}
					} catch (error) {
						console.error("Square Payment Error:", error);
						toast.error("Square Payment Failed!");
					}
				}}
				createPaymentRequest={() => ({
					countryCode: "US",
					currencyCode: "USD",
					total: { amount: selling_price, label: "Total" },
				})}
			>
				<CreditCard />
			</PaymentForm>
		);
	};

	return (
		<div className="payment-container">
			{step === 1 ? (
				<div className="upload-step">
					<h2 className="payment-title">Upload Authentication Document</h2>
					<form onSubmit={handleDocumentUpload} className="upload-form">
						<label>
							Document Name:
							<input
								type="text"
								value={documentName}
								onChange={(e) => setDocumentName(e.target.value)}
								required
							/>
						</label>
						<label>
							Upload Document (PDF, JPG, JPEG, PNG):
							<input
								type="file"
								accept=".pdf,.jpg,.jpeg,.png"
								onChange={(e) => setDocumentFile(e.target.files[0])}
								required
							/>
						</label>
						<div className="upload-actions">
							<button type="submit" className="payment-button">
								Upload
							</button>
							<button
								type="button"
								onClick={() => setStep(2)}
								className="payment-button"
							>
								Skip
							</button>
						</div>
					</form>
				</div>
			) : (
				<div className="payment-step">
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
						<table className="summary-table">
							<tbody>
								<tr>
									<td>
										<strong>Product:</strong>
									</td>
									<td>{product_name}</td>
								</tr>
								<tr>
									<td>
										<strong>Details:</strong>
									</td>
									<td>{quote_details}</td>
								</tr>
								<tr>
									<td>
										<strong>Price:</strong>
									</td>
									<td>${product_price}</td>
								</tr>
								<tr>
									<td>
										<strong>Discount:</strong>
									</td>
									<td>-${discount}</td>
								</tr>
								<tr>
									<td>
										<strong>Tax:</strong>
									</td>
									<td>+${tax}</td>
								</tr>
								<tr>
									<td>
										<strong>Shipping:</strong>
									</td>
									<td>+${shipping}</td>
								</tr>
								<tr>
									<td>
										<strong>Total:</strong>
									</td>
									<td>${selling_price}</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div className="payment-methods">
						<label>
							<input
								type="radio"
								name="paymentMethod"
								value="stripe"
								checked={paymentMethod === "stripe"}
								onChange={(e) => setPaymentMethod(e.target.value)}
							/>
							Stripe
						</label>
						<label>
							<input
								type="radio"
								name="paymentMethod"
								value="paypal"
								checked={paymentMethod === "paypal"}
								onChange={(e) => setPaymentMethod(e.target.value)}
							/>
							PayPal
						</label>
						<label>
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
				</div>
			)}
		</div>
	);
};

export default PaymentPage;
