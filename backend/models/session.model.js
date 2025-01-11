const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

// Define the Session model
const Session = sequelize.define(
	"Session",
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
		token: {
			type: DataTypes.STRING,
			allowNull: false, // Remove unique constraint here
		},
		expires_at: {
			type: DataTypes.DATE,
			allowNull: false,
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
		const indexes = await queryInterface.showIndex("Sessions");

		// Check and add unique index for `token`
		if (!indexes.some((index) => index.name === "token")) {
			await queryInterface.addIndex("Sessions", ["token"], {
				name: "token",
				unique: true,
			});
			console.log("Unique index token added for Sessions.");
		} else {
			console.log("Unique index token already exists for Sessions.");
		}

		// Check and add index for `user_id`
		if (!indexes.some((index) => index.name === "user_id_index")) {
			await queryInterface.addIndex("Sessions", ["user_id"], {
				name: "user_id_index",
			});
			console.log("Index user_id_index added for Sessions.");
		} else {
			console.log("Index user_id_index already exists for Sessions.");
		}

		// Check and add index for `expires_at`
		if (!indexes.some((index) => index.name === "expires_at_index")) {
			await queryInterface.addIndex("Sessions", ["expires_at"], {
				name: "expires_at_index",
			});
			console.log("Index expires_at_index added for Sessions.");
		} else {
			console.log("Index expires_at_index already exists for Sessions.");
		}
	} catch (error) {
		console.error("Error managing indexes for Session:", error);
	}
};

// Call the function to manage indexes when the model is loaded
manageIndexes();

module.exports = Session;
