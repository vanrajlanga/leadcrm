const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const User = require("./user.model"); // Import User model

const Role = sequelize.define(
	"Role",
	{
		id: {
			type: DataTypes.BIGINT,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
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
		const indexes = await queryInterface.showIndex("Roles");

		// Check and add index for `name`
		if (!indexes.some((index) => index.name === "name_index")) {
			await queryInterface.addIndex("Roles", ["name"], {
				name: "name_index",
				unique: true,
			});
			console.log("Index name_index added for Roles.");
		} else {
			console.log("Index name_index already exists for Roles.");
		}
	} catch (error) {
		console.error("Error managing indexes for Role:", error);
	}
};

// Call the function to manage indexes when the model is loaded
manageIndexes();

module.exports = Role;
