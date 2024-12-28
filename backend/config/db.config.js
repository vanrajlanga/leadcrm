const { Sequelize } = require("sequelize");
require("dotenv").config(); // Load environment variables

const sequelize = new Sequelize(
	process.env.DB_NAME, // Database name
	process.env.DB_USER, // Database user
	process.env.DB_PASSWORD, // Database password
	{
		host: process.env.DB_HOST, // Database host
		dialect: "mysql", // Using MySQL
	}
);

module.exports = sequelize;
