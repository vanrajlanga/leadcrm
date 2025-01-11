const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

// Define the SystemAnalytics model
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

// Manage Indexes Function
const manageIndexes = async () => {
	const queryInterface = sequelize.getQueryInterface();

	try {
		// Fetch existing indexes
		const indexes = await queryInterface.showIndex("SystemAnalytics");

		// Check and add index for `metric_name`
		if (!indexes.some((index) => index.name === "metric_name_index")) {
			await queryInterface.addIndex("SystemAnalytics", ["metric_name"], {
				name: "metric_name_index",
			});
			console.log("Index metric_name_index added for SystemAnalytics.");
		} else {
			console.log(
				"Index metric_name_index already exists for SystemAnalytics."
			);
		}

		// Check and add index for `recorded_at`
		if (!indexes.some((index) => index.name === "recorded_at_index")) {
			await queryInterface.addIndex("SystemAnalytics", ["recorded_at"], {
				name: "recorded_at_index",
			});
			console.log("Index recorded_at_index added for SystemAnalytics.");
		} else {
			console.log(
				"Index recorded_at_index already exists for SystemAnalytics."
			);
		}
	} catch (error) {
		console.error("Error managing indexes for SystemAnalytics:", error);
	}
};

// Call the function to manage indexes when the model is loaded
manageIndexes();

module.exports = SystemAnalytics;
