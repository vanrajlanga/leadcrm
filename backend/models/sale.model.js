const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Sale = sequelize.define(
	"Sale",
	{
		id: {
			type: DataTypes.BIGINT,
			autoIncrement: true,
			primaryKey: true,
		},
		agent_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		lead_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		amount: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		sale_date: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
	},
	{
		timestamps: false, // No createdAt or updatedAt for this table
	}
);

module.exports = Sale;
