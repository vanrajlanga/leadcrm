const express = require("express");
const { sequelize } = require("./models");
const routes = require("./routes");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
	cors({
		origin: process.env.FRONTEND_URL || "*", // Replace with your frontend URL
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Test Database Connection
sequelize
	.authenticate()
	.then(() => console.log("Database connected successfully."))
	.catch((err) => console.error("Database connection failed:", err));

// Routes
app.use("/api", routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
