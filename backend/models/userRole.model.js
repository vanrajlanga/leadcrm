const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const UserRole = sequelize.define(
	"UserRole",
	{
		user_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		role_id: {
			type: DataTypes.BIGINT,
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
		const indexes = await queryInterface.showIndex("UserRoles");

		// Check and add composite index for `user_id` and `role_id`
		if (!indexes.some((index) => index.name === "user_role_index")) {
			await queryInterface.addIndex("UserRoles", ["user_id", "role_id"], {
				name: "user_role_index",
				unique: true, // Enforce unique combinations
			});
			console.log("Composite index user_role_index added for UserRoles.");
		} else {
			console.log(
				"Composite index user_role_index already exists for UserRoles."
			);
		}

		// Check and add index for `user_id`
		if (!indexes.some((index) => index.name === "user_id_index")) {
			await queryInterface.addIndex("UserRoles", ["user_id"], {
				name: "user_id_index",
			});
			console.log("Index user_id_index added for UserRoles.");
		} else {
			console.log("Index user_id_index already exists for UserRoles.");
		}

		// Check and add index for `role_id`
		if (!indexes.some((index) => index.name === "role_id_index")) {
			await queryInterface.addIndex("UserRoles", ["role_id"], {
				name: "role_id_index",
			});
			console.log("Index role_id_index added for UserRoles.");
		} else {
			console.log("Index role_id_index already exists for UserRoles.");
		}
	} catch (error) {
		console.error("Error managing indexes for UserRole:", error);
	}
};

// Call the function to manage indexes when the model is loaded
manageIndexes();

module.exports = UserRole;
