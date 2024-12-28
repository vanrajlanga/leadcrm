const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Reminder = sequelize.define(
	"Reminder",
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
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		due_date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		priority: {
			type: DataTypes.ENUM("low", "medium", "high"),
			defaultValue: "medium",
		},
	},
	{
		timestamps: true,
		createdAt: "createdAt",
	}
);

module.exports = Reminder;
