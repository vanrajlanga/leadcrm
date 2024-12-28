const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const UserRole = sequelize.define(
	"UserRole",
	{
		user_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		role_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
	},
	{
		timestamps: false, // No createdAt or updatedAt for this table
	}
);

module.exports = UserRole;
