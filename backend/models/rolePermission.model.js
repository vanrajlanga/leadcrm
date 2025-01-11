const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

// Define the RolePermission model
const RolePermission = sequelize.define(
	"RolePermission",
	{
		role_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true, // Part of composite primary key
		},
		permission_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true, // Part of composite primary key
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
		const indexes = await queryInterface.showIndex("RolePermissions");

		// Check and add index for `role_id`
		if (!indexes.some((index) => index.name === "role_id_index")) {
			await queryInterface.addIndex("RolePermissions", ["role_id"], {
				name: "role_id_index",
			});
			console.log("Index role_id_index added for RolePermissions.");
		} else {
			console.log("Index role_id_index already exists for RolePermissions.");
		}

		// Check and add index for `permission_id`
		if (!indexes.some((index) => index.name === "permission_id_index")) {
			await queryInterface.addIndex("RolePermissions", ["permission_id"], {
				name: "permission_id_index",
			});
			console.log("Index permission_id_index added for RolePermissions.");
		} else {
			console.log(
				"Index permission_id_index already exists for RolePermissions."
			);
		}
	} catch (error) {
		console.error("Error managing indexes for RolePermission:", error);
	}
};

// Call the function to manage indexes when the model is loaded
manageIndexes();

module.exports = RolePermission;
