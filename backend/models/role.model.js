const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const User = require("./user.model"); // Import User model

const Role = sequelize.define(
	"Role",
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
		description: {
			type: DataTypes.TEXT,
		},
	},
	{
		timestamps: true,
		createdAt: "createdAt",
		updatedAt: "updatedAt",
	}
);

// Define associations
Role.associate = (models) => {
	Role.belongsToMany(models.User, {
		through: "UserRoles",
		as: "users", // Alias for users
		foreignKey: "role_id",
	});
};

module.exports = Role;
