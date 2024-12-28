const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Quote = sequelize.define(
	"Quote",
	{
		id: {
			type: DataTypes.BIGINT,
			autoIncrement: true,
			primaryKey: true,
		},
		lead_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		agent_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		quote_details: {
			type: DataTypes.JSON,
			allowNull: false,
		},
		total_price: {
			type: DataTypes.DECIMAL(10, 2),
			defaultValue: 0.0,
		},
		discount: {
			type: DataTypes.DECIMAL(10, 2),
			defaultValue: 0.0,
		},
		status: {
			type: DataTypes.ENUM("pending", "accepted", "declined"),
			defaultValue: "pending",
		},
	},
	{
		timestamps: true,
		createdAt: "createdAt",
		updatedAt: "updatedAt",
	}
);

module.exports = Quote;
