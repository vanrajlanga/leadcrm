const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

// Define the Vendor model
const Vendor = sequelize.define(
	"Vendor",
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
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: true,
			},
		},
		address: {
			type: DataTypes.TEXT,
		},
		added_by: {
			type: DataTypes.BIGINT,
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
		const indexes = await queryInterface.showIndex("Vendors");

		// Check and add index for `email`
		if (!indexes.some((index) => index.name === "email_index")) {
			await queryInterface.addIndex("Vendors", ["email"], {
				name: "email_index",
			});
			console.log("Index email_index added for Vendors.");
		} else {
			console.log("Index email_index already exists for Vendors.");
		}

		// Check and add index for `phone`
		if (!indexes.some((index) => index.name === "phone_index")) {
			await queryInterface.addIndex("Vendors", ["phone"], {
				name: "phone_index",
			});
			console.log("Index phone_index added for Vendors.");
		} else {
			console.log("Index phone_index already exists for Vendors.");
		}
	} catch (error) {
		console.error("Error managing indexes for Vendor:", error);
	}
};

// Call the function to manage indexes when the model is loaded
manageIndexes();

module.exports = Vendor;
