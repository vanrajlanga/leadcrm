const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

// Define the PaymentGatewayTransaction model
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
			allowNull: false,
		},
		gateway: {
			type: DataTypes.ENUM("stripe", "paypal", "sqaure"),
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

// Manage Indexes Function
const manageIndexes = async () => {
	const queryInterface = sequelize.getQueryInterface();

	try {
		// Fetch existing indexes
		const indexes = await queryInterface.showIndex(
			"PaymentGatewayTransactions"
		);

		// Check and add index for `gateway`
		if (!indexes.some((index) => index.name === "gateway_index")) {
			await queryInterface.addIndex("PaymentGatewayTransactions", ["gateway"], {
				name: "gateway_index",
			});
			console.log("Index gateway_index added for PaymentGatewayTransactions.");
		} else {
			console.log(
				"Index gateway_index already exists for PaymentGatewayTransactions."
			);
		}

		// Check and add index for `status`
		if (!indexes.some((index) => index.name === "status_index")) {
			await queryInterface.addIndex("PaymentGatewayTransactions", ["status"], {
				name: "status_index",
			});
			console.log("Index status_index added for PaymentGatewayTransactions.");
		} else {
			console.log(
				"Index status_index already exists for PaymentGatewayTransactions."
			);
		}
	} catch (error) {
		console.error(
			"Error managing indexes for PaymentGatewayTransaction:",
			error
		);
	}
};

// Call the function to manage indexes when the model is loaded
manageIndexes();

module.exports = PaymentGatewayTransaction;
