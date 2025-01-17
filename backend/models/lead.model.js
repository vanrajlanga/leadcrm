const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

// Define the Lead model
const Lead = sequelize.define(
	"Lead",
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
			type: DataTypes.STRING(15),
		},
		email: {
			type: DataTypes.STRING,
		},
		comments: {
			type: DataTypes.TEXT,
		},
		parts: {
			type: DataTypes.STRING,
			comment: "Category In Frontend",
		},
		makeModels: {
			type: DataTypes.STRING,
		},
		years: {
			type: DataTypes.STRING(50),
		},
		states: {
			type: DataTypes.STRING,
		},
		subscription: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		trackingId: {
			type: DataTypes.STRING,
		},
		eventTimestamp: {
			type: DataTypes.DATE,
		},
		recordAudio: {
			type: DataTypes.STRING, // Stores the S3 URL of the uploaded audio file
			allowNull: true,
		},
		cost_price: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: true,
		},
		selling_price: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: true,
		},
		reference: {
			type: DataTypes.ENUM("website", "manual"),
			allowNull: true,
		},
		agent_id: {
			// Foreign Key
			type: DataTypes.BIGINT,
			allowNull: true,
		},
		vandor_id: {
			type: DataTypes.BIGINT,
			allowNull: true,
		},
		followup_date: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		status: {
			type: DataTypes.ENUM("Pending", "Follow Up", "Converted", "Rejected"),
			defaultValue: "Pending",
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
		const indexes = await queryInterface.showIndex("Leads");

		// Check and add index for `email`
		if (!indexes.some((index) => index.name === "email_index")) {
			await queryInterface.addIndex("Leads", ["email"], {
				name: "email_index",
			});
			console.log("Index email_index added for Leads.");
		} else {
			console.log("Index email_index already exists for Leads.");
		}

		// Check and add index for `phone`
		if (!indexes.some((index) => index.name === "phone_index")) {
			await queryInterface.addIndex("Leads", ["phone"], {
				name: "phone_index",
			});
			console.log("Index phone_index added for Leads.");
		} else {
			console.log("Index phone_index already exists for Leads.");
		}

		// Check and add index for `trackingId`
		if (!indexes.some((index) => index.name === "tracking_id_index")) {
			await queryInterface.addIndex("Leads", ["trackingId"], {
				name: "tracking_id_index",
			});
			console.log("Index tracking_id_index added for Leads.");
		} else {
			console.log("Index tracking_id_index already exists for Leads.");
		}
	} catch (error) {
		console.error("Error managing indexes for Lead:", error);
	}
};

// Call the function to manage indexes when the model is loaded
manageIndexes();

module.exports = Lead;
