const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const PaymentGatewayTransaction = sequelize.define(
	"PaymentGatewayTransaction",
	{
		id: {
			type: DataTypes.BIGINT,
			autoIncrement: true,
			primaryKey: true,
		},
		transaction_id: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		gateway: {
			type: DataTypes.ENUM("stripe", "paypal"),
			allowNull: false,
		},
		amount: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		status: {
			type: DataTypes.ENUM("pending", "completed", "failed"),
			defaultValue: "pending",
		},
	},
	{
		timestamps: true,
		createdAt: "createdAt",
	}
);

module.exports = PaymentGatewayTransaction;
