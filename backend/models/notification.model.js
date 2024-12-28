const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Notification = sequelize.define(
	"Notification",
	{
		id: {
			type: DataTypes.BIGINT,
			autoIncrement: true,
			primaryKey: true,
		},
		user_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		message: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		type: {
			type: DataTypes.ENUM("info", "warning", "error"),
			defaultValue: "info",
		},
		status: {
			type: DataTypes.ENUM("unread", "read"),
			defaultValue: "unread",
		},
	},
	{
		timestamps: true,
		createdAt: "createdAt",
	}
);

module.exports = Notification;
