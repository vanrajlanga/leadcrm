const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

// Define the Sale model
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

// Manage Indexes Function
const manageIndexes = async () => {
	const queryInterface = sequelize.getQueryInterface();

	try {
		// Fetch existing indexes
		const indexes = await queryInterface.showIndex("Sales");

		// Check and add index for `agent_id`
		if (!indexes.some((index) => index.name === "agent_id_index")) {
			await queryInterface.addIndex("Sales", ["agent_id"], {
				name: "agent_id_index",
			});
			console.log("Index agent_id_index added for Sales.");
		} else {
			console.log("Index agent_id_index already exists for Sales.");
		}

		// Check and add index for `lead_id`
		if (!indexes.some((index) => index.name === "lead_id_index")) {
			await queryInterface.addIndex("Sales", ["lead_id"], {
				name: "lead_id_index",
			});
			console.log("Index lead_id_index added for Sales.");
		} else {
			console.log("Index lead_id_index already exists for Sales.");
		}

		// Check and add index for `sale_date`
		if (!indexes.some((index) => index.name === "sale_date_index")) {
			await queryInterface.addIndex("Sales", ["sale_date"], {
				name: "sale_date_index",
			});
			console.log("Index sale_date_index added for Sales.");
		} else {
			console.log("Index sale_date_index already exists for Sales.");
		}
	} catch (error) {
		console.error("Error managing indexes for Sale:", error);
	}
};

// Call the function to manage indexes when the model is loaded
manageIndexes();

module.exports = Sale;
