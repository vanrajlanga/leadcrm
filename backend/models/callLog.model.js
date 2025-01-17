const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

// Define the CallLog model
const CallLog = sequelize.define(
	"CallLog",
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
		call_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		call_status: {
			type: DataTypes.ENUM("initiated", "in-progress", "completed", "failed"),
			defaultValue: "initiated",
		},
		duration: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		caller_id: {
			type: DataTypes.STRING,
		},
		destination_number: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		start_time: {
			type: DataTypes.DATE,
		},
		end_time: {
			type: DataTypes.DATE,
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
		const indexes = await queryInterface.showIndex("CallLogs");

		// Check and add index for `lead_id`
		if (!indexes.some((index) => index.name === "lead_id_index")) {
			await queryInterface.addIndex("CallLogs", ["lead_id"], {
				name: "lead_id_index",
			});
			console.log("Index lead_id_index added for CallLogs.");
		} else {
			console.log("Index lead_id_index already exists for CallLogs.");
		}

		// Check and add index for `agent_id`
		if (!indexes.some((index) => index.name === "agent_id_index")) {
			await queryInterface.addIndex("CallLogs", ["agent_id"], {
				name: "agent_id_index",
			});
			console.log("Index agent_id_index added for CallLogs.");
		} else {
			console.log("Index agent_id_index already exists for CallLogs.");
		}

		// Check and add index for `call_status`
		if (!indexes.some((index) => index.name === "call_status_index")) {
			await queryInterface.addIndex("CallLogs", ["call_status"], {
				name: "call_status_index",
			});
			console.log("Index call_status_index added for CallLogs.");
		} else {
			console.log("Index call_status_index already exists for CallLogs.");
		}

		// Check and add index for `destination_number`
		if (!indexes.some((index) => index.name === "destination_number_index")) {
			await queryInterface.addIndex("CallLogs", ["destination_number"], {
				name: "destination_number_index",
			});
			console.log("Index destination_number_index added for CallLogs.");
		} else {
			console.log(
				"Index destination_number_index already exists for CallLogs."
			);
		}
	} catch (error) {
		console.error("Error managing indexes for CallLog:", error);
	}
};

// Call the function to manage indexes when the model is loaded
manageIndexes();

module.exports = CallLog;
