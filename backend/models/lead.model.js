const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Lead = sequelize.define(
	"Lead",
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
		phone: {
			type: DataTypes.STRING(15),
		},
		email: {
			type: DataTypes.STRING,
		},
		comments: {
			type: DataTypes.TEXT,
		},
		parts: {
			type: DataTypes.STRING,
		},
		makeModels: {
			type: DataTypes.STRING,
		},
		years: {
			type: DataTypes.STRING(50),
		},
		states: {
			type: DataTypes.STRING,
		},
		subscription: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		trackingId: {
			type: DataTypes.STRING,
		},
		eventTimestamp: {
			type: DataTypes.DATE,
		},
	},
	{
		timestamps: true,
		createdAt: "createdAt",
		updatedAt: "updatedAt",
	}
);

module.exports = Lead;
