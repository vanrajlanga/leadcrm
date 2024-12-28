const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Ticket = sequelize.define(
	"Ticket",
	{
		id: {
			type: DataTypes.BIGINT,
			autoIncrement: true,
			primaryKey: true,
		},
		lead_id: {
			type: DataTypes.BIGINT,
		},
		agent_id: {
			type: DataTypes.BIGINT,
		},
		subject: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
		},
		status: {
			type: DataTypes.ENUM("open", "in-progress", "closed"),
			defaultValue: "open",
		},
		priority: {
			type: DataTypes.ENUM("low", "medium", "high"),
			defaultValue: "medium",
		},
	},
	{
		timestamps: true,
		createdAt: "createdAt",
		updatedAt: "updatedAt",
	}
);

module.exports = Ticket;
