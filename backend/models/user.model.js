const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Role = require("./role.model"); // Import Role model

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
			// Use `unique: true` only if the table is being created for the first time
			unique: {
				name: "unique_email", // Named constraint to avoid duplication
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
		process.env.JWT_SECRET, // Replace with your secret key
		{ expiresIn: "1h" }
	);
	return token;
};

// Define associations
User.associate = (models) => {
	User.belongsToMany(models.Role, {
		through: "UserRoles",
		as: "roles", // Alias for roles
		foreignKey: "user_id",
	});
};

module.exports = User;
