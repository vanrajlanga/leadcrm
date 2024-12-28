const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const RolePermission = sequelize.define(
	"RolePermission",
	{
		role_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		permission_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
	},
	{
		timestamps: false, // No createdAt or updatedAt for this table
	}
);

module.exports = RolePermission;
