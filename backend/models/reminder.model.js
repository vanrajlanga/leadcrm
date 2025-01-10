const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

// Define the Reminder model
const Reminder = sequelize.define(
	"Reminder",
	{
		id: {
			type: DataTypes.BIGINT,
			autoIncrement: true,
			primaryKey: true,
		},
		user_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		due_date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		priority: {
			type: DataTypes.ENUM("low", "medium", "high"),
			defaultValue: "medium",
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
		const indexes = await queryInterface.showIndex("Reminders");

		// Check and add index for `user_id`
		if (!indexes.some((index) => index.name === "user_id_index")) {
			await queryInterface.addIndex("Reminders", ["user_id"], {
				name: "user_id_index",
			});
			console.log("Index user_id_index added for Reminders.");
		} else {
			console.log("Index user_id_index already exists for Reminders.");
		}

		// Check and add index for `due_date`
		if (!indexes.some((index) => index.name === "due_date_index")) {
			await queryInterface.addIndex("Reminders", ["due_date"], {
				name: "due_date_index",
			});
			console.log("Index due_date_index added for Reminders.");
		} else {
			console.log("Index due_date_index already exists for Reminders.");
		}

		// Check and add index for `priority`
		if (!indexes.some((index) => index.name === "priority_index")) {
			await queryInterface.addIndex("Reminders", ["priority"], {
				name: "priority_index",
			});
			console.log("Index priority_index added for Reminders.");
		} else {
			console.log("Index priority_index already exists for Reminders.");
		}
	} catch (error) {
		console.error("Error managing indexes for Reminder:", error);
	}
};

// Call the function to manage indexes when the model is loaded
manageIndexes();

module.exports = Reminder;
