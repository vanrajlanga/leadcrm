const { Agent } = require("../models");
const { User } = require("../models");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const createAgents = async (req, res) => {
	try {
		const agent = new Agent(req.body);
		await agent.save();
		await createUser(agent);
		res.status(201).send(agent);
	} catch (error) {
		res.status(400).send(error);
	}
};

const createUser = async (agent) => {
	const password = crypto.randomBytes(8).toString("hex");
	const hashedPassword = await bcrypt.hash(password, 10);

	const user = new User({
		firstName: agent.firstName,
		lastName: agent.lastName,
		email: agent.email,
		password: hashedPassword,
	});

	await user.save();

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "your-email@gmail.com",
			pass: "your-email-password",
		},
	});

	const mailOptions = {
		from: "your-email@gmail.com",
		to: agent.email,
		subject: "Your Account Password",
		text: `Hello ${agent.firstName},\n\nYour account has been created. Your password is: ${password}\n\nPlease change your password after logging in.`,
	};

	await transporter.sendMail(mailOptions);
};

module.exports = {
	createAgents,
};
