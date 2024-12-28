const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = sequelize.define(
	"User",
	{
		id: {
			type: DataTypes.BIGINT,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		status: {
			type: DataTypes.ENUM("active", "inactive"),
			defaultValue: "active",
		},
	},
	{
		timestamps: true,
		createdAt: "createdAt",
		updatedAt: "updatedAt",
	}
);

// Instance method to validate password
User.prototype.validatePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

// Instance method to generate a JWT token
User.prototype.generateAuthToken = function () {
	const token = jwt.sign(
		{ id: this.id, email: this.email },
		process.env.JWT_SECRET, // Replace with your secret key
		{ expiresIn: "1h" }
	);
	return token;
};

module.exports = User;
