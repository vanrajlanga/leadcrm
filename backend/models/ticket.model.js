const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

// Define the Ticket model
const Ticket = sequelize.define(
	"Ticket",
	{
		id: {
			type: DataTypes.BIGINT,
			autoIncrement: true,
			primaryKey: true,
		},
		lead_id: {
			type: DataTypes.BIGINT,
		},
		agent_id: {
			type: DataTypes.BIGINT,
		},
		subject: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
		},
		status: {
			type: DataTypes.ENUM("open", "in-progress", "closed"),
			defaultValue: "open",
		},
		priority: {
			type: DataTypes.ENUM("low", "medium", "high"),
			defaultValue: "medium",
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
		const indexes = await queryInterface.showIndex("Tickets");

		// Check and add index for `lead_id`
		if (!indexes.some((index) => index.name === "lead_id_index")) {
			await queryInterface.addIndex("Tickets", ["lead_id"], {
				name: "lead_id_index",
			});
			console.log("Index lead_id_index added for Tickets.");
		} else {
			console.log("Index lead_id_index already exists for Tickets.");
		}

		// Check and add index for `agent_id`
		if (!indexes.some((index) => index.name === "agent_id_index")) {
			await queryInterface.addIndex("Tickets", ["agent_id"], {
				name: "agent_id_index",
			});
			console.log("Index agent_id_index added for Tickets.");
		} else {
			console.log("Index agent_id_index already exists for Tickets.");
		}

		// Check and add index for `status`
		if (!indexes.some((index) => index.name === "status_index")) {
			await queryInterface.addIndex("Tickets", ["status"], {
				name: "status_index",
			});
			console.log("Index status_index added for Tickets.");
		} else {
			console.log("Index status_index already exists for Tickets.");
		}

		// Check and add index for `priority`
		if (!indexes.some((index) => index.name === "priority_index")) {
			await queryInterface.addIndex("Tickets", ["priority"], {
				name: "priority_index",
			});
			console.log("Index priority_index added for Tickets.");
		} else {
			console.log("Index priority_index already exists for Tickets.");
		}
	} catch (error) {
		console.error("Error managing indexes for Ticket:", error);
	}
};

// Call the function to manage indexes when the model is loaded
manageIndexes();

module.exports = Ticket;
