const express = require("express");
const { sequelize } = require("./models");
const authRoutes = require("./routes/auth.routes");

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Test Database Connection
sequelize
	.authenticate()
	.then(() => console.log("Database connected successfully."))
	.catch((err) => console.error("Database connection failed:", err));

// Routes
app.use("/api/auth", authRoutes);

const protectedRoutes = require("./routes/protected.routes");
app.use("/api/protected", protectedRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
