const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

// Define the PaymentHistory model
const PaymentHistory = sequelize.define(
	"PaymentHistory",
	{
		id: {
			type: DataTypes.BIGINT,
			autoIncrement: true,
			primaryKey: true,
		},
		lead_id: {
			type: DataTypes.BIGINT,
			allowNull: true,
		},
		quote_id: {
			type: DataTypes.BIGINT,
			allowNull: true,
		},
		invoice_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		amount: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: true,
		},
		payment_date: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		payment_method: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		json_response: {
			type: DataTypes.JSON,
			allowNull: true,
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
		const indexes = await queryInterface.showIndex("PaymentHistories");

		// Check and add index for `lead_id`
		if (!indexes.some((index) => index.name === "lead_id_index")) {
			await queryInterface.addIndex("PaymentHistories", ["lead_id"], {
				name: "lead_id_index",
			});
			console.log("Index lead_id_index added for PaymentHistories.");
		} else {
			console.log("Index lead_id_index already exists for PaymentHistories.");
		}

		// Check and add index for `payment_date`
		if (!indexes.some((index) => index.name === "payment_date_index")) {
			await queryInterface.addIndex("PaymentHistories", ["payment_date"], {
				name: "payment_date_index",
			});
			console.log("Index payment_date_index added for PaymentHistories.");
		} else {
			console.log(
				"Index payment_date_index already exists for PaymentHistories."
			);
		}
	} catch (error) {
		console.error("Error managing indexes for PaymentHistory:", error);
	}
};

// Call the function to manage indexes when the model is loaded
manageIndexes();

module.exports = PaymentHistory;
