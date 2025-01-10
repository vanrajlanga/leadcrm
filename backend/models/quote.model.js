const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

// Define the Quote model
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

// Manage Indexes Function
const manageIndexes = async () => {
	const queryInterface = sequelize.getQueryInterface();

	try {
		// Fetch existing indexes
		const indexes = await queryInterface.showIndex("Quotes");

		// Check and add index for `lead_id`
		if (!indexes.some((index) => index.name === "lead_id_index")) {
			await queryInterface.addIndex("Quotes", ["lead_id"], {
				name: "lead_id_index",
			});
			console.log("Index lead_id_index added for Quotes.");
		} else {
			console.log("Index lead_id_index already exists for Quotes.");
		}

		// Check and add index for `agent_id`
		if (!indexes.some((index) => index.name === "agent_id_index")) {
			await queryInterface.addIndex("Quotes", ["agent_id"], {
				name: "agent_id_index",
			});
			console.log("Index agent_id_index added for Quotes.");
		} else {
			console.log("Index agent_id_index already exists for Quotes.");
		}

		// Check and add index for `status`
		if (!indexes.some((index) => index.name === "status_index")) {
			await queryInterface.addIndex("Quotes", ["status"], {
				name: "status_index",
			});
			console.log("Index status_index added for Quotes.");
		} else {
			console.log("Index status_index already exists for Quotes.");
		}
	} catch (error) {
		console.error("Error managing indexes for Quote:", error);
	}
};

// Call the function to manage indexes when the model is loaded
manageIndexes();

module.exports = Quote;
