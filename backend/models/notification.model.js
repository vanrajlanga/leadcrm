const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

// Define the Notification model
const Notification = sequelize.define(
	"Notification",
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
		message: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		type: {
			type: DataTypes.ENUM("info", "warning", "error"),
			defaultValue: "info",
		},
		status: {
			type: DataTypes.ENUM("unread", "read"),
			defaultValue: "unread",
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
		const indexes = await queryInterface.showIndex("Notifications");

		// Check and add index for `user_id`
		if (!indexes.some((index) => index.name === "user_id_index")) {
			await queryInterface.addIndex("Notifications", ["user_id"], {
				name: "user_id_index",
			});
			console.log("Index user_id_index added for Notifications.");
		} else {
			console.log("Index user_id_index already exists for Notifications.");
		}

		// Check and add index for `status`
		if (!indexes.some((index) => index.name === "status_index")) {
			await queryInterface.addIndex("Notifications", ["status"], {
				name: "status_index",
			});
			console.log("Index status_index added for Notifications.");
		} else {
			console.log("Index status_index already exists for Notifications.");
		}

		// Check and add index for `type`
		if (!indexes.some((index) => index.name === "type_index")) {
			await queryInterface.addIndex("Notifications", ["type"], {
				name: "type_index",
			});
			console.log("Index type_index added for Notifications.");
		} else {
			console.log("Index type_index already exists for Notifications.");
		}
	} catch (error) {
		console.error("Error managing indexes for Notification:", error);
	}
};

// Call the function to manage indexes when the model is loaded
manageIndexes();

module.exports = Notification;
