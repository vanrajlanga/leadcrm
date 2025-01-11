const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

// Define the Template model
const Template = sequelize.define(
	"Template",
	{
		id: {
			type: DataTypes.BIGINT,
			autoIncrement: true,
			primaryKey: true,
		},
		type: {
			type: DataTypes.ENUM("email", "sms"),
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		subject: {
			type: DataTypes.STRING,
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
		const indexes = await queryInterface.showIndex("Templates");

		// Check and add index for `type`
		if (!indexes.some((index) => index.name === "type_index")) {
			await queryInterface.addIndex("Templates", ["type"], {
				name: "type_index",
			});
			console.log("Index type_index added for Templates.");
		} else {
			console.log("Index type_index already exists for Templates.");
		}

		// Check and add unique index for `name`
		if (!indexes.some((index) => index.name === "name_unique_index")) {
			await queryInterface.addIndex("Templates", ["name"], {
				name: "name_unique_index",
				unique: true,
			});
			console.log("Unique index name_unique_index added for Templates.");
		} else {
			console.log(
				"Unique index name_unique_index already exists for Templates."
			);
		}
	} catch (error) {
		console.error("Error managing indexes for Template:", error);
	}
};

// Call the function to manage indexes when the model is loaded
manageIndexes();

module.exports = Template;
