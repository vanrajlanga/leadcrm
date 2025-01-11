const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Define the User model
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
			allowNull: false,
			unique: {
				name: "unique_email",
				msg: "Email address must be unique",
			},
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
		process.env.JWT_SECRET,
		{ expiresIn: "12h" }
	);
	return token;
};

// Manage Indexes Function
const manageIndexes = async () => {
	const queryInterface = sequelize.getQueryInterface();

	try {
		// Fetch existing indexes
		const indexes = await queryInterface.showIndex("Users");

		// Check and add unique index for `email`
		if (!indexes.some((index) => index.name === "unique_email")) {
			await queryInterface.addIndex("Users", ["email"], {
				name: "unique_email",
				unique: true,
			});
			console.log("Unique index unique_email added for Users.");
		} else {
			console.log("Unique index unique_email already exists for Users.");
		}

		// Check and add index for `status`
		if (!indexes.some((index) => index.name === "status_index")) {
			await queryInterface.addIndex("Users", ["status"], {
				name: "status_index",
			});
			console.log("Index status_index added for Users.");
		} else {
			console.log("Index status_index already exists for Users.");
		}
	} catch (error) {
		console.error("Error managing indexes for User:", error);
	}
};

// Call the function to manage indexes when the model is loaded
manageIndexes();

module.exports = User;
