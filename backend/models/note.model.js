const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

// Define the Note model
const Note = sequelize.define(
	"Note",
	{
		id: {
			type: DataTypes.BIGINT,
			autoIncrement: true,
			primaryKey: true,
		},
		user_id: {
			type: DataTypes.BIGINT,
		},
		lead_id: {
			type: DataTypes.BIGINT,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
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
		const indexes = await queryInterface.showIndex("Notes");

		// Check and add index for `user_id`
		if (!indexes.some((index) => index.name === "user_id_index")) {
			await queryInterface.addIndex("Notes", ["user_id"], {
				name: "user_id_index",
			});
			console.log("Index user_id_index added for Notes.");
		} else {
			console.log("Index user_id_index already exists for Notes.");
		}

		// Check and add index for `lead_id`
		if (!indexes.some((index) => index.name === "lead_id_index")) {
			await queryInterface.addIndex("Notes", ["lead_id"], {
				name: "lead_id_index",
			});
			console.log("Index lead_id_index added for Notes.");
		} else {
			console.log("Index lead_id_index already exists for Notes.");
		}
	} catch (error) {
		console.error("Error managing indexes for Note:", error);
	}
};

// Call the function to manage indexes when the model is loaded
manageIndexes();

module.exports = Note;
