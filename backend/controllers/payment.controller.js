const puppeteer = require("puppeteer");
const nodemailer = require("nodemailer");
const fs = require("fs");
const { PaymentHistory } = require("../models");

// Generate HTML for the invoice
const generateInvoiceHTML = (invoiceData) => {
	return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Invoice</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          color: #333;
        }
        .invoice-container {
          max-width: 800px;
          margin: auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        .header {
          text-align: right;
        }
        .header h1 {
          margin: 0;
          color: #003366;
        }
        .company-details, .bill-to {
          margin-bottom: 20px;
        }
        .company-details {
          text-align: right;
        }
        .invoice-details {
          background-color: #f9f9f9;
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 20px;
        }
        .invoice-details span {
          display: block;
        }
        .bill-to h4 {
          margin: 0 0 5px 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        th, td {
          padding: 10px;
          border: 1px solid #ddd;
          text-align: left;
        }
        .total-section {
          text-align: right;
        }
        .total-section span {
          display: block;
        }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <div class="header">
          <h1>INVOICE</h1>
          <div class="company-details">
            <p>SevenD Mobility Solutions</p>
            <p>1700 W Plum Street, 56F</p>
            <p>Fort Collins, CO 80521, USA</p>
            <p>Email: digvijay.singh@autopartsvroom.com</p>
          </div>
        </div>
        <div class="invoice-details">
          <span><strong>Invoice No:</strong> ${invoiceData.invoice_id}</span>
          <span><strong>Invoice Date:</strong> ${invoiceData.payment_date}</span>
        </div>
        <div class="bill-to">
          <h4>BILL TO</h4>
          <p>Lead ID: ${invoiceData.lead_id}</p>
          <p>Quote ID: ${invoiceData.quote_id}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Items & Description</th>
              <th>Amount ($)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Payment</td>
              <td>${invoiceData.amount}</td>
            </tr>
          </tbody>
        </table>
        <div class="total-section">
          <span><strong>Total:</strong> $${invoiceData.amount}</span>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Generate PDF from HTML
const generatePDF = async (html, filePath) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setContent(html, { waitUntil: "load" });
	await page.pdf({ path: filePath, format: "A4" });
	await browser.close();
};

// Create invoice and send email
const createInvoice = async (req, res) => {
	try {
		const {
			lead_id,
			quote_id,
			amount,
			payment_date,
			payment_method,
			payment_response,
		} = req.body;

		const generateInvoiceId = async () => {
			const lastPayment = await PaymentHistory.findOne({
				order: [["id", "DESC"]],
			});
			console.log("lastPayment", lastPayment);
			if (lastPayment && lastPayment.invoice_id) {
				const lastInvoiceNumber = parseInt(lastPayment.invoice_id, 10);
				return (lastInvoiceNumber + 1).toString().padStart(3, "0");
			} else {
				return "001";
			}
		};

		// Generate Invoice ID
		const invoice_id = await generateInvoiceId();
		console.log("invoiceId", invoice_id);
		// Save Payment History in DB
		const newPaymentHistory = new PaymentHistory({
			lead_id,
			quote_id,
			invoice_id,
			amount,
			payment_date,
			payment_method,
			payment_response,
		});
		const savedPaymentHistory = await newPaymentHistory.save();

		// Generate HTML and PDF
		const invoiceData = {
			invoice_id,
			lead_id,
			quote_id,
			amount,
			payment_date,
			payment_method,
		};
		const htmlContent = generateInvoiceHTML(invoiceData);
		const pdfPath = `./invoices/invoice_${invoice_id}.pdf`;

		// Ensure invoices directory exists
		if (!fs.existsSync("./invoices")) {
			fs.mkdirSync("./invoices");
		}

		await generatePDF(htmlContent, pdfPath);

		// Send Email with PDF Attachment
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
			subject: "Your Invoice",
			text: `Hello,\n\nPlease find your invoice attached.\n\nThank you!`,
			attachments: [
				{
					filename: `invoice_${invoice_id}.pdf`,
					path: pdfPath,
				},
			],
		};

		// await transporter.sendMail(mailOptions);

		res.status(201).json({
			message: "Invoice created and sent via email successfully",
			data: savedPaymentHistory,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Error creating invoice or sending email",
			error: error.message,
		});
	}
};

module.exports = {
	createInvoice,
};
