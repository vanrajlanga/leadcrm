const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const SystemAnalytics = sequelize.define(
	"SystemAnalytics",
	{
		id: {
			type: DataTypes.BIGINT,
			autoIncrement: true,
			primaryKey: true,
		},
		metric_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		metric_value: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		recorded_at: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	},
	{
		timestamps: false, // No createdAt or updatedAt for this table
	}
);

module.exports = SystemAnalytics;
