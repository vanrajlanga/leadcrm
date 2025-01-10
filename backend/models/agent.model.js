const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

// Define the Agent model
const Agent = sequelize.define(
	"Agent",
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
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		gender: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		dob: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		state: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		country: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		city: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		pincode: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		joiningDate: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		experience: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		aadharCard: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		panCard: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		bankPassbook: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		bankName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		branchName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		accountNumber: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		reEnterAccountNumber: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		ifscCode: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		bankAddress: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		monthly_target: {
			type: DataTypes.DECIMAL(10, 2),
			defaultValue: 0.0,
		},
		quarterly_target: {
			type: DataTypes.DECIMAL(10, 2),
			defaultValue: 0.0,
		},
		yearly_target: {
			type: DataTypes.DECIMAL(10, 2),
			defaultValue: 0.0,
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
		// Check if the index for `user_id` exists
		const indexes = await queryInterface.showIndex("Agents");
		const userIdIndexExists = indexes.some(
			(index) => index.name === "user_id_index"
		);

		// Add the index if it doesn't exist
		if (!userIdIndexExists) {
			await queryInterface.addIndex("Agents", ["user_id"], {
				name: "user_id_index",
			});
			console.log("Index user_id_index added for Agents.");
		} else {
			console.log("Index user_id_index already exists for Agents.");
		}
	} catch (error) {
		console.error("Error managing indexes for Agent:", error);
	}
};

// Call the function to manage indexes when the model is loaded
manageIndexes();

module.exports = Agent;
